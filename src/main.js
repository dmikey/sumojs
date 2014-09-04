requirejs(['oop'
          ,'platform'
          ,'utility'
          ,'mixins'],
  function (oop
           ,platform
           ,utility
           ,mixins) {

    //public api map
    var sumo = platform.scope.sumo = {
        version: '0.0.0',
        create: oop.create,
        extend: utility.extend,
        mixin: mixins.mix,
        platform: platform
    };
});