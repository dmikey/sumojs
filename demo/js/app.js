define(function(){
    //use require.js, return a sumo object
    return sumo.create({
        name: 'demoApp',
        foo: function(msg) {
            console.log(msg);
        }
    });
});