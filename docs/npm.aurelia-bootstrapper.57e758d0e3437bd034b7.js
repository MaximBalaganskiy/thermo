(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{92:function(e,n,r){"use strict";(function(e){r(94);var n=r(3),t=("function"==typeof Symbol&&Symbol.iterator,[]),o=void 0,i=new Promise((function(e){return o=e})),a=n.d.global,u=void 0!==e&&!e.browser;function l(){return n.d.Loader?Promise.resolve(new n.d.Loader):Promise.reject("No PLATFORM.Loader is defined and there is neither a System API (ES6) or a Require API (AMD) globally available to load your app.")}function d(r){var t=function(e,n){return r.normalize(e,n).then((function(n){return r.map(e,n),n}))};return function(r){if(n.f)return Promise.resolve();var t=void 0,o=u&&("renderer"===e.type||e.versions["node-webkit"]);if(u&&!o)t="nodejs";else if("undefined"!=typeof window)t="browser";else{if("undefined"==typeof self)throw new Error("Could not determine platform implementation to load.");t="worker"}return r.loadModule("aurelia-pal-"+t).then((function(e){return"nodejs"===t&&!n.f&&e.globalize()||e.initialize()}))}(r).then((function(){return r.normalize("aurelia-bootstrapper")})).then((function(e){var n=t("aurelia-framework",e);return Promise.all([n,n.then((function(e){return t("aurelia-dependency-injection",e)})),t("aurelia-router",e),t("aurelia-logging-console",e)])})).then((function(e){var n=e[0];return r.loadModule(n)})).then((function(e){return o((function(){return new e.Aurelia(r)}))}))}function c(e,n,r){return r.host=e,r.configModuleId=n||null,n?r.loader.loadModule(n).then((function(e){if(!e.configure)throw new Error("Cannot initialize module '"+n+"' without a configure function.");return e.configure(r)})):(r.use.standardConfiguration().developmentLogging(),r.start().then((function(){return r.setRoot()})))}function f(e){var n=i.then((function(n){return e(n())}));return t&&t.push(n),n}(a.document&&"complete"!==a.document.readyState?new Promise((function(e){function n(){a.document.removeEventListener("DOMContentLoaded",n),a.removeEventListener("load",n),e()}a.document.addEventListener("DOMContentLoaded",n),a.addEventListener("load",n)})):Promise.resolve()).then(l).then(d).then((function(){for(var e=a.document.querySelectorAll("[aurelia-app],[data-aurelia-app]"),n=0,r=e.length;n<r;++n){var o=e[n],i=o.getAttribute("aurelia-app")||o.getAttribute("data-aurelia-app");f(c.bind(null,o,i))}var u=console.error.bind(console),l=t.map((function(e){return e.catch(u)}));return t=null,Promise.all(l)}))}).call(this,r(93))}}]);
//# sourceMappingURL=npm.aurelia-bootstrapper.57e758d0e3437bd034b7.js.map