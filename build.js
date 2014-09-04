var requirejs = require('requirejs');

var config = {
    baseUrl: 'src',
    name: 'main',
    out: 'dist/sumo.js'
};

requirejs.optimize(config, function (buildResponse) {
    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    var contents = fs.readFileSync(config.out, 'utf8');
}, function(err) {
    //optimization err callback
});