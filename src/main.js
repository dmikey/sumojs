requirejs(['oop', 'platform'], function (oop, platform) {

    //public api map
    var sumo = platform.scope.sumo = {
        version: '0.0.0',
        create: oop.create
    };
});