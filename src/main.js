/*
* Start bolting things together
* MIT License, all that Jazz. Use it however.
* 2014 Derek M. Anderson
*/
(function(){
    var version = '0.0.1';

    //define sumojs
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
            bind: utility.bind,
            create: oop.create,
            extend: utility.extend,
            mixin: mixins.mix,
            platform: platform,
            ready: utility.ready,
            version: version
        };
    });
}())
