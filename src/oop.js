define(['./platform',
        './utility',
        './mixins',
        './components/all',
        './messages',
        'require'],
function (platform,
          utility,
          mixins,
          components,
          messages,
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
              //mixins have a race condition
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

        //array with keys for loaded mixins
        var loadedMixins = [];

        //pop from _mixins and push to requiredMixins
        //a list used to load our async mixins in
        //correct order
        var requiredMixins = [];

        var mixed = function(_mixin_){
            loadedMixins[_mixin_.name] = _mixin_;

            //check if the arrays match length, and all mixins were loaded
            //then mixin according to proper order of precedence
            if(Object.keys(loadedMixins).length === requiredMixins.length) {
                //we have a full array of loaded mixins
                //lets load them accoeding to the required mixins order
                requiredMixins.map(function(mixin, index) {
                    //add mixin
                    def = mixins.mix(def, loadedMixins[mixin]);
                });
                //report the component is ready
                def.isReady = true;
            }
        }


        //apply mixins to a sumo, and then declare that sumo is ready
        while(_mixins.length > 0) {

            var _mixin = _mixins.pop();
            if(components[_mixin]){

                //load mixin from memory object
                def = mixins.mix(def, components[_mixin]);
            } else {
                //load modules dynamically from the app source if desired
                requiredMixins.push(_mixin);
                require(['./components/' + _mixin], function(_mixin_) {

                    //if the mixin isn't named, name it so we know what we are loading
                    if(!_mixin_.name) { _mixin_.name = _mixin};

                    //add to mixing que
                    mixed(_mixin_);

                });
            }
        }

        //if there are no requiredMixins we can resolve this component now
        if(requiredMixins.length == 0) {
            def.isReady = true;
        }

        //remove mixins property
        delete def.mixins;
        return def;
    };

    return oop;
});