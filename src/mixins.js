define(['./utility'], function(utility) {

    var mixins = {};

    mixins.mix = function(ctor, obj) {
        var isFunc = !utility.isObject(ctor);

        var objA = isFunc ? ctor.prototype : ctor;
        var objB = obj;

        var objC = utility.extend(objA, objB);

        if(isFunc){
            ctor.prototype = objC;
            return ctor;
        }

        return objC;
    };

    return mixins;
});