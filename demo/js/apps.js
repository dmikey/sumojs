//include sumo in your requirejs module
define(['./componentDemo', './webComponentDemo'], function(componentDemo, webComponentDemo){

    //use require.js, return with sumo objects
    return {
        name: 'demoContainer',
        componentDemo: componentDemo,
        webComponentDemo: webComponentDemo
    };
});