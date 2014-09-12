define(function (require) {

    var utility = {};

    utility.isObject = function(obj) {
            var type = typeof obj;
            return type === 'object' && !!obj;
    };

    utility.extend = function(obj) {
        if (!utility.isObject(obj)) return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];

            for (prop in source) {
                // if we are copying over functions lets extend the original function
                if(typeof obj[prop] == 'function' && typeof source[prop] == 'function') {

                    //closure ref
                    (function(_objFunc, _sourceFunc){
                         //set the obj function
                         obj[prop] = function(){
                            var thisFunc = utility.bind(_sourceFunc, this);
                            var inherited = utility.bind(_objFunc, this);

                            var _arguments = [inherited].concat(arguments);

                            thisFunc.inherited = inherited;
                            thisFunc.apply(this, _arguments);
                            //inherited.apply(this, arguments);
                         }

                    }(obj[prop],
                      source[prop]))

              } else {
                    obj[prop] = source[prop];
              }
            }
        }

        return obj;
    };

    utility.ready = function(func) {
        //checks to see if mixins have been loaded from require, and if the control is ready
        var readyStateCheckInterval = window.setInterval(function () {
            //attach a ready state listener to fire off our first updates when the dom is available
            if (document.readyState === 'complete') {
                window.clearInterval(readyStateCheckInterval);
                func();
            }
        }, 10);

    };

    utility.bind = function (func, context) {
            //return an error to the callee class when used
            if(!func) {return func};
            //bind function ripped from underscore, changes the scope of this inside func to context
            var ArrayProto = Array.prototype,
                FuncProto = Function.prototype,
                slice = ArrayProto.slice,
                nativeBind = FuncProto.bind;
            var args, bound;
            if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
            args = slice.call(arguments, 2);
            return bound = function () {
                if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
                ctor.prototype = func.prototype;
                var self = new ctor;
                ctor.prototype = null;
                var result = func.apply(self, args.concat(slice.call(arguments)));
                if (Object(result) === result) return result;
                return self;
            };
    }

    var templatecache = {};
    utility.template = function tmpl(str, data){
        // Simple JavaScript Templating
        // John Resig - http://ejohn.org/ - MIT Licensed
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
          templatecache[str] = templatecache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

          // Generate a reusable function that will serve as a template
          // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            str
              .replace(/[\r\t\n]/g, " ")
              .split("<%").join("\t")
              .replace(/((^|%>)[^\t]*)'/g, "$1\r")
              .replace(/\t=(.*?)%>/g, "',$1,'")
              .split("\t").join("');")
              .split("%>").join("p.push('")
              .split("\r").join("\\'")
          + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };

    return utility;
});