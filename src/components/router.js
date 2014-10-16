define(['../platform', 'haridashi/main'],function (platform, utility) {

    var route = function(scope, hash){
        scope.hash = hash;
        var cb = utility.bind(scope.routes[hash], scope);
        cb();
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
            if(hash.length > 0 && typeof hash == 'function') route(this, hash);
        }
    };

    return router;
});