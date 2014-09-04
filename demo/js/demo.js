//urls are relative for dev mode
requirejs(['../demo/js/app'], function (app) {
    //create a new version of the app
    var _app = new app({bar: 'baz'});

    //ask the app for it's name attribute
    alert(_app.name);
    _app.foo('test');
    alert(_app.bar);
});