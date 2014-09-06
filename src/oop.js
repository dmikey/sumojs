define(['./platform',
        './utility',
        './mixins',
        './components/all',
        'require'],
function (platform,
          utility,
          mixins,
          components,
          require) {

    var oop = {};

    //create a sumo
    oop.create = function(def) {

        var ctor = function (extend){
              if(!(this instanceof ctor)) {
                    console.log('called without keyword new');
                    return;
              }

              var extendedDef = {};

              //apply mixins needed for runtime
              if(def.mixins){
                  def.isReady = false;
                  extendedDef = oop.mixins(def, def.mixins);
              } else {

              }
              //extend the defs passed to the constructor
              extendedDef = utility.extend(def, extend);
              extendedDef = utility.extend(def, oop.extends);

              if(extendedDef.create) {
                  extendedDef.create();
              }

            console.log(extendedDef);
              return extendedDef;
        }

        ctor.prototype = def;
        //return the sumo
        return ctor;
    };

    oop.extends = {
        //collection of extends that will be applied to a sumo
        ready: function(fn) {
            var component = this;
            var boundFn = utility.bind(fn, component);
            var readyStateCheckInterval = window.setInterval(function () {
                if (component.isReady) {
                    window.clearInterval(readyStateCheckInterval);
                    boundFn();
                }
            }, 10);

        }
    };

    oop.mixins = function(def, _mixins) {


        //apply mixins to a sumo, and then declare that sumo is ready
        while(_mixins.length > 0) {

            var _mixin = _mixins.pop();
            if(components[_mixin]){

                //load mixin from memory object
                def = mixins.mix(def, components[_mixin]);
            } else {
                //load modules dynamically from the app source if desired
                require(['./' + _mixin], function(_mixin_) {
                    def = mixins.mix(def, _mixin_);
                    def.isReady = true;
                });
            }
        }

        //remove the mixins property
        def.isReady = true;
        delete def.mixins;
        return def;
    };

    return oop;
});