//include sumo in your requirejs module
define(['./componentDemo'], function(componentDemo){

    var _componentDemo = new componentDemo();
    //use require.js, return a sumo object
    return sumo.create({
        name: 'demoContainer',
        componentDemo: _componentDemo
    });
});