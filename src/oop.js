define(['./platform', './utility', './mixins', 'require'], function (platform, utility, mixins, require) {

    var oop = {};

    //create a sumo
    oop.create = function(def) {
        var ctor = function (extend){
              if(!(this instanceof ctor)) {
                    console.log('called without keyword new');
                    return;
              }

              //extend the defs passed to the constructor
              var extendedDef = utility.extend(def, extend);

              //apply mixins needed for runtime
              if(def.mixins){
                  extendedDef = oop.mixins(def, def.mixins);
              }

              return extendedDef;
        }


        ctor.prototype = def;
        //return the sumo
        return ctor;
    };

    oop.mixins = function(def, _mixins) {
        while(_mixins.length > 0) {
            var _mixin = _mixins.pop();

            require(['./' + _mixin], function(_mixin_) {
                def = mixins.mix(def, _mixin_);
            });

            //remove the mixins property
            delete def.mixins;
        }
        return def;
    };

    return oop;
});