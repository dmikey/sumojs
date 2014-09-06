//include sumo in your requirejs module
define(['../../dist/sumo-min'], function(sumo){
    //use require.js, return a sumo object
    return sumo.create({
        name: 'webComponentDemo',
        tag: 'custom-tag',
        classes: 'demo',
        mixins: ['webcomponent'],
        content: 'I love JavaScript',
        create: function(){
            console.log(this);
        }
    });
});