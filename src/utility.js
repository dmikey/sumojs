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
                obj[prop] = source[prop];
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

    return utility;
});