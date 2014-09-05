define(function(){
    return {
            pub: function (eventname, data) {
                //emit event
                //create unique eventname name
                var uniqueName = 'sumo.' + eventname;
                var CustomEvent = function (event, params) {
                    //a fill for IE9 and 10 proper operation
                    params = params || {
                        bubbles: false,
                        cancelable: false
                    };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };
                if (window.CustomEvent) {
                    //check if we can use native eventing
                    var event = new CustomEvent(uniqueName, {
                        'detail': data
                    });
                    var elem = document.getElementsByTagName('body')[0];
                    elem.dispatchEvent(event);
                } else {
                    //use a document property event for eventing
                    if (document.attachEvent) {
                        document.documentElement[uniqueName] = data;
                    }
                }
            },
            sub: function (eventname, callback) {
                // bind a callback to an event emitters
                if (document.createEvent) {
                    //bind an event to the body tag
                    var obj = document.getElementsByTagName('body')[0];
                    obj.addEventListener('sumo.' + eventname, callback);
                } else if (document.createEventObject) {
                    //attach a callback to the onpropertychange for eventing
                    document.documentElement.attachEvent('onpropertychange', callback);
                }
            },
            unsub: function (eventname, callback) {
                // remove bound event
                if (document.createEvent) {
                    //remove event from body tag
                    var obj = document.getElementsByTagName('body')[0];
                    obj.removeEventListener('sumo.' + eventname, callback);
                } else if (document.createEventObject) {
                    //detach event from onpropertychange event
                    document.documentElement.detachEvent('onpropertychange', callback);
                }
            }
        }

});