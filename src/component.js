define(function(require) {

    var buildHTML = function(component) {
        if(component.components){

        }

        return component.content || '';
    }

    var component = {
        renderInto: function(target) {
            if(target) {
                var _component = this;
                var _tag = document.createElement(_component.tag);
                _tag.innerHTML = buildHTML(_component);
                target.innerHTML = _tag.outerHTML;
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