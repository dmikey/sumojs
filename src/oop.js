define(['./platform'], function (platform) {

    var oop = {
        create: function(def) {
            var ctor = function (extend){
                  if(!(this instanceof ctor)) {
                        console.log('called without keyword new')
                        return;
                  }

                  return def;
            }

            return ctor;
        }
    };

    return oop;

});