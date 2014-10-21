define("basho/src/basho",["require"],function(e){var t=t||window,n=t,r={scope:n};return r}),define("basho/main",["./src/basho"],function(e){return e}),define("haridashi/src/haridashi",["require"],function(e){var t={};t.isObject=function(e){var t=typeof e;return t==="object"&&!!e},t.extend=function(e){if(!t.isObject(e))return e;var n,r;for(var i=1,s=arguments.length;i<s;i++){n=arguments[i];for(r in n)typeof e[r]=="function"&&typeof n[r]=="function"?function(n,i){e[r]=function(){var e=t.bind(i,this),r=n,s=[r].concat(arguments);e.apply(this,s)}}(e[r],n[r]):e[r]=typeof e[r]!="undefined"?e[r]:n[r]}return e},t.ready=function(e){var t=window.setInterval(function(){document.readyState==="complete"&&(window.clearInterval(t),e())},10)},t.bind=function(e,t){if(!e)return e;var n=Array.prototype,r=Function.prototype,i=n.slice,s=r.bind,o,u;return s&&e.bind===s?s.apply(e,i.call(arguments,1)):(o=i.call(arguments,2),u=function(){if(this instanceof u){ctor.prototype=e.prototype;var n=new ctor;ctor.prototype=null;var r=e.apply(n,o.concat(i.call(arguments)));return Object(r)===r?r:n}return e.apply(t,o.concat(i.call(arguments)))})},t.htmlDecode=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes.length===0?"":t.childNodes[0].nodeValue};var n={};return t.template=function r(e,t){var i=/\W/.test(e)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):n[e]=n[e]||r(document.getElementById(e).innerHTML);return t?i(t):i},t}),define("haridashi/main",["./src/haridashi"],function(e){return e}),define("ichimon/src/ichimon",["haridashi/main"],function(e){var t={};return t.mix=function(t,n){var r=!e.isObject(t),i=r?t.prototype:t,s=n,o=e.extend(i,s);return r?(t.prototype=o,t):o},t}),define("ichimon/main",["./src/ichimon"],function(e){return e}),define("yobidashi/src/yobidashi",[],function(){var e={pub:function(e,t){var n="yobidashi."+e,r=function(e,t){t=t||{bubbles:!1,cancelable:!1};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n};if(window.CustomEvent){var i=new r(n,{detail:t}),s=document.getElementsByTagName("body")[0];s.dispatchEvent(i)}else document.attachEvent&&(document.documentElement[n]=t)},sub:function(e,t){if(document.createEvent){var n=document.getElementsByTagName("body")[0];n.addEventListener("yobidashi."+e,t)}else document.createEventObject&&document.documentElement.attachEvent("onpropertychange",t)},unsub:function(e,t){if(document.createEvent){var n=document.getElementsByTagName("body")[0];n.removeEventListener("yobidashi."+e,t)}else document.createEventObject&&document.documentElement.detachEvent("onpropertychange",t)},bind:function(e,t){var n=Array.prototype,r=Function.prototype,i=n.slice,s=r.bind,o,u;return s&&e.bind===s?s.apply(e,i.call(arguments,1)):(o=i.call(arguments,2),u=function(){if(this instanceof u){ctor.prototype=e.prototype;var n=new ctor;ctor.prototype=null;var r=e.apply(n,o.concat(i.call(arguments)));return Object(r)===r?r:n}return e.apply(t,o.concat(i.call(arguments)))})}};return e}),define("yobidashi/main",["./src/yobidashi"],function(e){return e}),define("sumoji/src/component",["yobidashi/main","haridashi/main"],function(e,t){var n=function(e){return e.template?(console.log(e),t.template(e.template,e)):e.content||""},r={set:function(t,n){this[t]=n,e.pub(this.channel+"/"+t)},create:function(){this.channel="/"+this.name;var t=function(e,t){t.innerHTML=t.generateHTML()},n=this;for(var r in this)(function(r,i){e.sub(r+"/"+i,function(){t(i,n)})})(this.channel,r)},generateHTML:function(){var e=document.createElement(this.tag?this.tag:"div");return e.innerHTML=this.generateInnerHTML(),e.outerHTML},generateInnerHTML:function(){var e=this;return n(e)},renderInto:function(t,n){t&&(t.innerHTML=this.generateHTML(),e.pub(this.channel+"/rendered"))},appendTo:function(t){if(t){var r=this,i=document.createElement(r.tag);i.innerHTML=n(r),t.appendChild(i),e.pub(this.channel+"/appended")}}};return r}),define("sumoji/src/webcomponent",["./component","ichimon/main","yobidashi/main"],function(e,t,n){var r=t.mix(HTMLElement.prototype,e),i={create:function(e){if(!this.tag)throw"need .tag property when using mixin webcomponent";var t=this;this.instance=document.registerElement(this.tag,{prototype:Object.create(t,{createdCallback:{value:function(){e.apply(this,arguments),this.innerHTML+=t.generateInnerHTML(),n.pub(this.channel+"/rendered")}},attachedCallback:{value:function(){console.log("live on DOM ;-) ")}},detachedCallback:{value:function(){console.log("leaving the DOM :-( )")}},attributeChangedCallback:{value:function(e,t,n){t==null?console.log("got a new attribute ",e," with value ",n):n==null?console.log("somebody removed ",e," its value was ",t):console.log(e," changed from ",t," to ",n)}}})})}};return r=t.mix(r,i),r}),define("sumoji/src/sumoji",["./component","./webcomponent"],function(e,t){var n={component:e,webcomponent:t};return n}),define("sumoji/main",["./src/sumoji"],function(e){return e}),define("oyakata/src/oyakata",["basho/main","haridashi/main","ichimon/main","sumoji/main","yobidashi/main","require"],function(e,t,n,r,i,s){var o={};return o.create=function(e){var n=function(r){if(this instanceof n){var i={};return e.mixins&&(e.isReady=!1,i=o.mixins(e,e.mixins)),i=t.extend(e,r),i=t.extend(e,o.extends),i.create&&i.create(),i}console.log("called without keyword new");return};return n.prototype=e,n},o.extends={ready:function(e){var n=this,r=t.bind(e,n),i=window.setInterval(function(){n.isReady&&(window.clearInterval(i),r())},10)}},o.mixins=function(e,t){var i=[],o=[],u=function(t){i[t.name]=t,Object.keys(i).length===o.length&&(o.map(function(t,r){e=n.mix(e,i[t])}),e.isReady=!0)};while(t.length>0){var a=t.pop();r[a]?e=n.mix(e,r[a]):typeof a=="object"?e=n.mix(e,a):(o.push(a),s(["./components/"+a],function(e){e.name||(e.name=a),u(e)}))}return o.length==0&&(e.isReady=!0),delete e.mixins,e},o}),define("oyakata/main",["./src/oyakata"],function(e){return e}),define("henka/src/henka",[],function(){var e=function(e,t,n){var r={props:{nodes:[],lastWidth:0,body:{},currentBreak:"",originalHenka:e.henka||{}},init:function(){r.props.body=t.getElementsByTagName("body")[0],r.core.update(),r.tools.attach()},core:{set:function(e){var t=JSON.parse(e.getAttribute("data-henka")),i="",s=e.className.split(" ");if(t)for(var o=t.length-1;o>=0;o--){r.core.check(t[o])&&(i="bp"+t[o]);var u=r.tools.indexOf(s,"bp"+t[o]);u>=0&&s.splice(u,1)}i.length>0?(s.push(i),r.props.currentBreak=i):r.props.currentBreak=n,e.className!=s.join(" ")&&(e.className=s.join(" ").replace(/^\s+|\s+$/g,""),typeof yobidashi!="undefined"&&yobidashi.pub("/henka/updated"))},update:function(){r.core.set(r.props.body),typeof yobidashi!="undefined"&&yobidashi.pub("/henka/resized")},check:function(e){return r.tools.innerWidth()<=e}},tools:{indexOf:function(e,t){if(Array.prototype.indexOf)return Array.prototype.indexOf.call(e,t);for(var n=e.length-1;n>=0;n--)if(t===e[n])return n;return-1},innerWidth:function(){return e.innerWidth||t.documentElement.clientWidth},isMobileDevice:function(){var t=0,n=["iPad","iPhone","iPod","Android","webOS","BlackBerry","Windows Phone"];for(;t<n.length;t++)if(e.navigator.platform===n[t])return!0;return!1},attach:function(){var t=new Date("2000-01-01T12:00:00.000Z"),n=!1,i=100,s=!1,o=function(){s===!1&&(s=!0,e.setTimeout(function(){r.core.update()},0))},u=function(){new Date-t<i?e.setTimeout(u,0):(n=!1,s=!1,r.tools.isMobileDevice()||o())},a=function(){var s=r.tools.innerWidth();r.props.lastWidth!=s&&(r.tools.isMobileDevice()&&o(),t=new Date,n===!1&&(n=!0,e.setTimeout(u,i))),r.props.lastWidth=s};e.addEventListener?e.addEventListener("resize",a,!1):e.attachEvent("onresize",a)}}},i=e.setInterval(function(){t.readyState==="complete"&&(e.clearInterval(i),r.init())},10);return r.api=function(){return{noConflict:function(){return e.henka=r.props.originalHenka,r.api},currentBreak:function(){return r.props.currentBreak}}}(),r.api}(window,document);return window.henka=e,e}),define("henka/main",["./src/henka"],function(e){return e}),define("meta",[],function(){return{version:"0.0.2"}}),define("main",["./oyakata/main","./basho/main","./haridashi/main","./ichimon/main","./yobidashi/main","./henka/main","meta"],function(e,t,n,r,i,s,o){var u=t.scope.sumo={bind:n.bind,extend:n.extend,ready:n.ready,create:e.create,mixin:r.mix,platform:t,version:o.version,pub:i.pub,sub:i.sub,unsub:i.unsub};return u});define(["main"], function (main) { return main; });