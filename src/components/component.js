define(['../messages', '../utility'],function(messages, utility) {

    var buildHTML = function(component) {

        if(component.components){

        }

        return component.content || '';
    }

    var component = {
        tag: 'div',
        create: function(){
            this.channel = '/'+ this.name +'/rendered';
        },
        renderInto: function(target, cb) {

            if(target) {
                var _component = this;
                var _tag = document.createElement(_component.tag);
                _tag.innerHTML = buildHTML(_component);
                target.innerHTML = _tag.outerHTML;
                //subscribe to some channel

                cb = utility.bind(cb, _component);


                messages.sub(this.channel, cb);
            }
        },
        appendTo: function(target) {
            if(target) {
                var _component = this;
                var _tag = document.createElement(_component.tag);
                _tag.innerHTML = buildHTML(_component);
                target.appendChild(_tag);
            }
        }
    };

    return component;
});