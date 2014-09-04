//urls are relative for dev mode
requirejs(['../demo/js/app'], function (app) {

    //create a new version of the app
    //add some properties to the app when constructed
    var _app = new app({bar: 'baz'});

    //do some javascript when the app has loaded
    _app.ready(function(){
        console.log(this);

    });
});