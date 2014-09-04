//urls are relative for dev mode
requirejs(['../demo/js/app'], function (app) {
    //create a new version of the app
    var _app = new app({bar: 'baz'});
    console.log(_app);
});