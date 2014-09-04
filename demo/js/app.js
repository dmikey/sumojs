define(function(){
    //use require.js, return a sumo object
    return sumo.create({
        name: 'demoApp',
        mixins: ['component'],
        content: 'I rendered from JavaScript'
    });
});