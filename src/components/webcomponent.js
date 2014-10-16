//todo: renderInto inherited from component, breaks webcomponent prototype

define(['./component', 'ichimon/main', 'yobidashi/main'], function(component, mixins, messages) {

    var webcomponent = mixins.mix(HTMLElement.prototype, component);


    //define a web component, it will mixin from component
    var extend = {
        //we'll be extended component.create
        //the inherited function is passed in as the first param
        create: function(sup) {

            if(!this.tag) { throw "need .tag property when using mixin webcomponent" };
            var _this = this;

            this.instance = document.registerElement(
              this.tag,
              {
                prototype: Object.create(
                  _this, {
                  createdCallback: {value: function() {
                    //run inherited create
                    sup.apply(this, arguments);
                    //fill the node with it's template
                    this.innerHTML += _this.generateInnerHTML();
                    messages.pub(this.channel + '/rendered');
                  }},

                  //other call backs that need to be attached somewhere
                  //todo add to messaging
                  attachedCallback: {value: function() {
                    console.log('live on DOM ;-) ');
                  }},
                  detachedCallback: {value: function() {
                    console.log('leaving the DOM :-( )');
                  }},
                  attributeChangedCallback: {value: function(
                    name, previousValue, value
                  ) {
                    if (previousValue == null) {
                      console.log(
                        'got a new attribute ', name,
                        ' with value ', value
                      );
                    } else if (value == null) {
                      console.log(
                        'somebody removed ', name,
                        ' its value was ', previousValue
                      );
                    } else {
                      console.log(
                        name,
                        ' changed from ', previousValue,
                        ' to ', value
                      );
                    }
                  }}
                })
              }
            );
        }
    };

    webcomponent = mixins.mix(webcomponent, extend);
    return webcomponent;
});