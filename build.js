var fs = require('fs');
var requirejs = require('requirejs');


var config = {
    baseUrl: 'src',
    name: 'main',
    out: 'dist/sumo-min.js'
};

requirejs.optimize(config, function (buildResponse) {

    //buildResponse is just a text output of the modules
    //included. Load the built file for the contents.
    //Use config.out to get the optimized file contents.
    //var contents = fs.readFileSync(config.out, 'utf8');
    fs.appendFile(config.out, 'define(["main"], function (main) { return main; });', function (err) {
      if (err) throw err;
      console.log('sumo has been trained, wrestle now!');
    });
}, function(err) {
    //optimization err callback
});