//include sumo in your requirejs module
define(['../../dist/sumo-min'], function(sumo){
    //use require.js, return a sumo object
    return sumo.create({
        name: 'demoApp',
        classes: 'demo',
        mixins: ['component'],
        content: 'I love JavaScript',
        create: function(){
            console.log(this);
        }
    });
});