/*
* Start bolting things together
* MIT License, all that Jazz. Use it however.
* 2014 Derek M. Anderson
*/
   define(['oop'
          ,'platform'
          ,'utility'
          ,'mixins'
          ,'messages'
          ,'meta'],
  function (oop
           ,platform
           ,utility
           ,mixins
           ,messages
           ,meta) {

    //public api map
    var sumo = platform.scope.sumo = {
        bind: utility.bind,
        create: oop.create,
        extend: utility.extend,
        mixin: mixins.mix,
        platform: platform,
        ready: utility.ready,
        version: meta.version,
        pub: messages.pub,
        sub: messages.sub,
        unsub: messages.unsub
    };

    return sumo;
});
