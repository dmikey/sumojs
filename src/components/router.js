define(['../platform', '../utility'],function (platform, utility) {

    var route = function(scope, hash){
        scope.routes[hash]();
    };

    var router = {
        //routes: [],
        hashchange: function() {
            var hash = window.location.hash;
            if(this.routes[hash]) {
                route(this, hash);
            }
        },
        create: function() {
            var hashChange = utility.bind(this.hashchange, this);
            var hash = window.location.hash;
            window.onhashchange = function () {
                hashChange();
            }
            route(this, hash);
        }
    };

    return router;
});