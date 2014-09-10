define(['./component', '../mixins'],function(component, mixins) {

    var webcomponent = {

    };

    //add support from components
    webcomponent = mixins.mix(component, webcomponent);

    return webcomponent;
});