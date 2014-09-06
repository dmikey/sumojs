//urls are relative for dev mode
requirejs(['../demo/js/apps'], function (apps) {
console.log(apps);
    //create a new version of the app
    //add some properties to the app when constructed
    var componentDemo = new apps.componentDemo();

    //do some javascript when the app has loaded
    componentDemo.ready(function(){
        //this is bound to the instance of this new app!
        componentDemo.appendTo(document.body, function() {
            //providing a nice chain of callbacks
            //preserving the 'this' context
            console.log(this.name);
        });
    });


    var webComponentDemo = new apps.webComponentDemo();



    webComponentDemo.ready(function(){
        //this is bound to the instance of this new app!
        webComponentDemo.appendTo(document.body, function() {
            //providing a nice chain of callbacks
            //preserving the 'this' context
            console.log(this.name);
        });

    });

});