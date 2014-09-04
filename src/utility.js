define(function (require) {

    var utility = {};

    utility.isObject = function(obj) {
            var type = typeof obj;
            return type === 'object' && !!obj;
    };

    utility.extend = function(obj) {
        if (!utility.isObject(obj)) return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
                for (prop in source) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    };

    return utility;
});