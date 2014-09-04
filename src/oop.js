define(['./platform', './utility'], function (platform, utility) {

    var oop = {
        //create a sumo
        create: function(def) {
            var ctor = function (extend){
                  if(!(this instanceof ctor)) {
                        console.log('called without keyword new')
                        return;
                  }
                  //extend the defs passed to the constructor
                  var extendedDef = utility.extend(def, extend);
                  return extendedDef;
            }

            ctor.prototype = def;
            //return the sumo
            return ctor;
        }
    };

    return oop;
});