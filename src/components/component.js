define(['yobidashi/main', 'haridashi/main'], function(messages, utility) {

    var buildHTML = function(component) {

        if(component.template){
            return utility.template(component.template, component);
        } else {
            return component.content || '';
        }

    }

    var component = {
        set: function(prop, val) {
            this[prop] = val;
            messages.pub(this.channel + '/' + prop);
        },
        create: function(){

            this.channel = '/'+ this.name;

            var propertyUpdater = function(prop, instance) {
                instance.innerHTML = instance.generateHTML();
            };

            var _this = this;
            //setup property observers for binding
            for(var prop in this) {
               (function(channel, _prop){
                   messages.sub(channel + '/' + _prop, function(){
                        propertyUpdater(_prop, _this);
                   });
               }(this.channel, prop))
            }
        },
        generateHTML: function(){
            var _tag = document.createElement(this.tag);
            _tag.innerHTML = this.generateInnerHTML();
            return _tag.outerHTML;
        },
        generateInnerHTML: function(){
            var _component = this;
            return buildHTML(_component);
        },
        renderInto: function(target, cb) {
            if(target) {
                target.innerHTML = this.generateHTML();
                //publish that this has rendered
                messages.pub(this.channel + '/rendered');
            }
        },
        appendTo: function(target) {
            if(target) {
                var _component = this;
                var _tag = document.createElement(_component.tag);
                _tag.innerHTML = buildHTML(_component);
                target.appendChild(_tag);
                //publish that this was appended
                messages.pub(this.channel + '/appended');
            }
        }
    };

    return component;
});