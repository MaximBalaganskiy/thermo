(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"aurelia-event-aggregator":function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"configure",(function(){return c}));var i=t(15).getLogger("event-aggregator"),r=function(){function e(e,n){this.messageType=e,this.callback=n}return e.prototype.handle=function(e){e instanceof this.messageType&&this.callback.call(null,e)},e}();function s(e,n,t){try{e(n,t)}catch(e){i.error(e)}}function o(e,n){try{e.handle(n)}catch(e){i.error(e)}}var u=function(){function e(){this.eventLookup={},this.messageHandlers=[]}return e.prototype.publish=function(e,n){var t=void 0,i=void 0;if(!e)throw new Error("Event was invalid.");if("string"==typeof e){if(t=this.eventLookup[e])for(i=(t=t.slice()).length;i--;)s(t[i],n,e)}else for(i=(t=this.messageHandlers.slice()).length;i--;)o(t[i],e)},e.prototype.subscribe=function(e,n){var t=void 0,i=void 0;if(!e)throw new Error("Event channel/type was invalid.");return"string"==typeof e?(t=n,i=this.eventLookup[e]||(this.eventLookup[e]=[])):(t=new r(e,n),i=this.messageHandlers),i.push(t),{dispose:function(){var e=i.indexOf(t);-1!==e&&i.splice(e,1)}}},e.prototype.subscribeOnce=function(e,n){var t=this.subscribe(e,(function(e,i){return t.dispose(),n(e,i)}));return t},e}();function c(e){var n,t;e.instance(u,(n=e.aurelia,t=new u,n.subscribeOnce=function(e,n){return t.subscribeOnce(e,n)},n.subscribe=function(e,n){return t.subscribe(e,n)},n.publish=function(e,n){t.publish(e,n)},t))}}}]);
//# sourceMappingURL=npm.aurelia-event-aggregator.fc72f4d828e2f32227c7.js.map