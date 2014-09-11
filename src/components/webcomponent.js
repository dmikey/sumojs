define(['./component', '../mixins'],function(component, mixins) {

    var webcomponent = mixins.mix(HTMLElement.prototype, component);


    //define a web component, it will mixin from component
    var extend = {
        create: function() {
            if(!this.tag) { throw "need TAG property when using mixin webcomponent" };
            var _this = this;

            this.instance = document.registerElement(
              this.tag,
              {
                prototype: Object.create(
                  _this, {
                  createdCallback: {value: function() {
                    //fill the node with it's template
                    this.innerHTML += _this.generateInnerHTML();
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