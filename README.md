SumoJS
======

A minimalistic, responsive, javascript ui framework for building native quality apps with requirejs, and influenced by webcomponents.

Features

* modular - built with RequireJS in mind.
* messaging
* mixins
* helpers (ready, extend ..)
* routing
* two way data binding
* templating
* custom HTML element support


Create a Sumo
-------------

Creating a Sumo relies on the RequireJS scheme. Sumos are defined as Javascript files, and then loaded (or compiled) with RequireJS.

Here is an example of a file that might be called 'foo.js':


```javascript
define(['sumo'], function(sumo) {

    return sumo.create({
        //name our component, optional
        //if named, sumo.$ will provide reference
        //to instance
        name: 'foo',

        //determine what type of control, or value
        //added methods and properties are available
        //on this sumo's belt
        mixins: ['component'],

        //we used the component mixin, which can render
        //to the dom, lets set our 'Hello World'
        content: 'I love JavaScript'
    });
});
```

Great! You just created a Sumo! Now that foo.js is available, we can go ahead and load it as an App! To do this we create one more javascript file, with a requirejs reference, this will start our app, or multiple apps that you create.

```javascript
requirejs(['./foo'], function (foo) {

    //create a new version of foo
    //at create time, we can add or over-ride properties/methods
    var _foo = new foo({bar: 'baz'});

    //when a component is ready, is will fire it's own ready
    //besides being a great indicator of when the app is ready
    //for interaction, the component's own .ready callback also
    //allows for async module loading inside of mixins!
    _app.ready(function(){
        //this is bound to the instance of this new app!
        _app.appendTo(document.body);
    });
});
```

What, you don't like building things in JavaScript all the time? You want to use HTML5 webcomponent? Us too!

```javascript
define(['sumo'], function(sumo){
    //use require.js, return a sumo object
    return sumo.create({
        //make sure you tag your new element
        tag: 'my-element',
        //add the webcomponent mixin
        mixins: ['webcomponent'],
        content: 'I love JavaScript',
        //create a template, and bind values of this object to it
        template: '<div class="red"><%=content%></div>'
    });
});
```

SumoJS will prepare and register your new Custom Element, when that ha been done, the component will
trigger ready.

```javascript
requirejs(['./foo'], function (foo) {

    //create a new version of foo which is using our
    //webcomponent mixin
    var _foo = new foo();

    //when a component is ready
    _foo.ready(function(){
        //run some code if you need to when component is ready
        //this is not the same as component resolved
    });
});
```

Now use your component in the DOM as regular a HTML Element!
```html
<my-element id="myElementId"></my-element>
```

What about routing? Yeah, SumoJS can help you with routing hashes too!

```javascript
//create a Sumo router
define('router', ['sumo'], function(sumo){
    return sumo.create({
        mixins: ['router'],
        routes: {
            '#test': function(){
                alert('routed!');
            }
        }
    });
});
```