define("basho/src/basho",["require"],function(e){var t=t||window,n=t,r={scope:n};return r}),define("basho/main",["./src/basho"],function(e){return e}),define("haridashi/src/haridashi",["require"],function(e){var t={};t.isObject=function(e){var t=typeof e;return t==="object"&&!!e},t.extend=function(e){if(!t.isObject(e))return e;var n,r;for(var i=1,s=arguments.length;i<s;i++){n=arguments[i];for(r in n)typeof e[r]=="function"&&typeof n[r]=="function"?function(n,i){e[r]=function(){var e=t.bind(i,this),r=n,s=[r].concat(arguments);e.apply(this,s)}}(e[r],n[r]):e[r]=n[r]}return e},t.ready=function(e){var t=window.setInterval(function(){document.readyState==="complete"&&(window.clearInterval(t),e())},10)},t.bind=function(e,t){if(!e)return e;var n=Array.prototype,r=Function.prototype,i=n.slice,s=r.bind,o,u;return s&&e.bind===s?s.apply(e,i.call(arguments,1)):(o=i.call(arguments,2),u=function(){if(this instanceof u){ctor.prototype=e.prototype;var n=new ctor;ctor.prototype=null;var r=e.apply(n,o.concat(i.call(arguments)));return Object(r)===r?r:n}return e.apply(t,o.concat(i.call(arguments)))})};var n={};return t.template=function r(e,t){var i=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):n[e]=n[e]||r(document.getElementById(e).innerHTML);return t?i(t):i},t}),define("haridashi/main",["./src/haridashi"],function(e){return e}),define("ichimon/src/ichimon",["haridashi/main"],function(e){var t={};return t.mix=function(t,n){var r=!e.isObject(t),i=r?t.prototype:t,s=n,o=e.extend(i,s);return r?(t.prototype=o,t):o},t}),define("ichimon/main",["./src/ichimon"],function(e){return e}),define("yobidashi/src/yobidashi",[],function(){var e={pub:function(e,t){var n="yobidashi."+e,r=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n};if(window.CustomEvent){var i=new r(n,{detail:t}),s=document.getElementsByTagName("body")[0];s.dispatchEvent(i)}else document.attachEvent&&(document.documentElement[n]=t)},sub:function(e,t){if(document.createEvent){var n=document.getElementsByTagName("body")[0];n.addEventListener("yobidashi."+e,t)}else document.createEventObject&&document.documentElement.attachEvent("onpropertychange",t)},unsub:function(e,t){if(document.createEvent){var n=document.getElementsByTagName("body")[0];n.removeEventListener("yobidashi."+e,t)}else document.createEventObject&&document.documentElement.detachEvent("onpropertychange",t)},bind:function(e,t){var n=Array.prototype,r=Function.prototype,i=n.slice,s=r.bind,o,u;return s&&e.bind===s?s.apply(e,i.call(arguments,1)):(o=i.call(arguments,2),u=function(){if(this instanceof u){ctor.prototype=e.prototype;var n=new ctor;ctor.prototype=null;var r=e.apply(n,o.concat(i.call(arguments)));return Object(r)===r?r:n}return e.apply(t,o.concat(i.call(arguments)))})}};return e}),define("yobidashi/main",["./src/yobidashi"],function(e){return e}),define("sumoji/src/component",["yobidashi/main","haridashi/main"],function(e,t){var n=function(e){return e.template?t.template(e.template,e):e.content||""},r={set:function(t,n){this[t]=n,e.pub(this.channel+"/"+t)},create:function(){this.channel="/"+this.name;var t=function(e,t){t.innerHTML=t.generateHTML()},n=this;for(var r in this)(function(r,i){e.sub(r+"/"+i,function(){t(i,n)})})(this.channel,r)},generateHTML:function(){var e=document.createElement(this.tag);return e.innerHTML=this.generateInnerHTML(),e.outerHTML},generateInnerHTML:function(){var e=this;return n(e)},renderInto:function(t,n){t&&(t.innerHTML=this.generateHTML(),e.pub(this.channel+"/rendered"))},appendTo:function(t){if(t){var r=this,i=document.createElement(r.tag);i.innerHTML=n(r),t.appendChild(i),e.pub(this.channel+"/appended")}}};return r}),define("sumoji/src/webcomponent",["./component","ichimon/main","yobidashi/main"],function(e,t,n){var r=t.mix(HTMLElement.prototype,e),i={create:function(e){if(!this.tag)throw"need .tag property when using mixin webcomponent";var t=this;this.instance=document.registerElement(this.tag,{prototype:Object.create(t,{createdCallback:{value:function(){e.apply(this,arguments),this.innerHTML+=t.generateInnerHTML(),n.pub(this.channel+"/rendered")}},attachedCallback:{value:function(){console.log("live on DOM ;-) ")}},detachedCallback:{value:function(){console.log("leaving the DOM :-( )")}},attributeChangedCallback:{value:function(e,t,n){t==null?console.log("got a new attribute ",e," with value ",n):n==null?console.log("somebody removed ",e," its value was ",t):console.log(e," changed from ",t," to ",n)}}})})}};return r=t.mix(r,i),r}),define("sumoji/src/sumoji",["./component","./webcomponent"],function(e,t){var n={component:e,webcomponent:t};return n}),define(["./src/sumoji",function(e){return e}]),define("oyakata/src/oyakata",["basho/main","haridashi/main","ichimon/main","sumoji/main","yobidashi/main","require"],function(e,t,n,r,i,s){var o={};return o.create=function(e){var n=function(r){if(this instanceof n){var i={};return e.mixins&&(e.isReady=!1,i=o.mixins(e,e.mixins)),i=t.extend(e,r),i=t.extend(e,o.extends),i.create&&i.create(),i}console.log("called without keyword new");return};return n.prototype=e,n},o.extends={ready:function(e){var n=this,r=t.bind(e,n),i=window.setInterval(function(){n.isReady&&(window.clearInterval(i),r())},10)}},o.mixins=function(e,t){var i=[],o=[],u=function(t){i[t.name]=t,Object.keys(i).length===o.length&&(o.map(function(t,r){e=n.mix(e,i[t])}),e.isReady=!0)};while(t.length>0){var a=t.pop();r[a]?e=n.mix(e,r[a]):(o.push(a),s(["./components/"+a],function(e){e.name||(e.name=a),u(e)}))}return o.length==0&&(e.isReady=!0),delete e.mixins,e},o}),define("oyakata/main",["./src/oyakata"],function(e){return e}),define("meta",[],function(){return{version:"0.0.2"}}),define("main",["oyakata/main","basho/main","haridashi/main","ichimon/main","yobidashi/main","meta"],function(e,t,n,r,i,s){var o=t.scope.sumo={bind:n.bind,extend:n.extend,ready:n.ready,create:e.create,mixin:r.mix,platform:t,version:s.version,pub:i.pub,sub:i.sub,unsub:i.unsub};return o});define(["main"], function (main) { return main; });