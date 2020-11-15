(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"aurelia-framework":function(e,t,r){"use strict";r.d(t,"Aurelia",(function(){return h}));var n=r(15),o=r(18),i=r(30),u=r(5),s=r(3),a=r(23);r.d(t,"d",(function(){return o.a})),r.d(t,"h",(function(){return o.c})),r.d(t,"q",(function(){return o.d})),r.d(t,"y",(function(){return o.e}));var c=r(2);r.d(t,"b",(function(){return c.j})),r.d(t,"f",(function(){return c.n})),r.d(t,"g",(function(){return c.s})),r.d(t,"l",(function(){return c.v})),r.d(t,"s",(function(){return c.z})),r.d(t,"v",(function(){return c.B})),r.d(t,"B",(function(){return c.I}));r(4);r.d(t,"c",(function(){return u.g})),r.d(t,"i",(function(){return u.j})),r.d(t,"k",(function(){return u.m})),r.d(t,"m",(function(){return u.n})),r.d(t,"n",(function(){return u.p})),r.d(t,"o",(function(){return u.r})),r.d(t,"p",(function(){return u.s})),r.d(t,"r",(function(){return u.t})),r.d(t,"t",(function(){return u.u})),r.d(t,"u",(function(){return u.v})),r.d(t,"w",(function(){return u.w})),r.d(t,"x",(function(){return u.x})),r.d(t,"z",(function(){return u.y})),r.d(t,"A",(function(){return u.z})),r.d(t,"C",(function(){return u.A})),r.d(t,"D",(function(){return u.E})),r.d(t,"E",(function(){return u.F}));var l=r(26);r.d(t,"j",(function(){return l.a})),r.d(t,"e",(function(){return s.b}));var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var h=function(){function e(t,r,a){this.loader=t||new s.d.Loader,this.container=r||(new o.a).makeGlobal(),this.resources=a||new u.r,this.use=new T(this),this.logger=n.getLogger("aurelia"),this.hostConfigured=!1,this.host=null,this.use.instance(e,this),this.use.instance(i.a,this.loader),this.use.instance(u.r,this.resources)}return e.prototype.start=function(){var e=this;return this._started?this._started:(this.logger.info("Aurelia Starting"),this._started=this.use.apply().then((function(){if(s.b.addEventListener("submit",(function(e){var t=e.target,r=t.action;"form"!==t.tagName.toLowerCase()||r||e.preventDefault()})),!e.container.hasResolver(u.e)){var t="You must configure Aurelia with a BindingLanguage implementation.";throw e.logger.error(t),new Error(t)}e.logger.info("Aurelia Started");var r=s.b.createCustomEvent("aurelia-started",{bubbles:!0,cancelable:!0});return s.b.dispatchEvent(r),e})))},e.prototype.enhance=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._configureHost(r||s.b.querySelectorAll("body")[0]),new Promise((function(r){var n=e.container.get(u.m);e.root=n.enhance({container:e.container,element:e.host,resources:e.resources,bindingContext:t}),e.root.attached(),e._onAureliaComposed(),r(e)}))},e.prototype.setRoot=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n={};this.root&&this.root.viewModel&&this.root.viewModel.router&&(this.root.viewModel.router.deactivate(),this.root.viewModel.router.reset()),this._configureHost(r);var o=this.container.get(u.m),i=this.container.get(u.h);return delete i.initialComposition,t||(t=this.configModuleId?Object(a.d)("./app",this.configModuleId):"app"),n.viewModel=t,n.container=n.childContainer=this.container,n.viewSlot=this.hostSlot,n.host=this.host,o.compose(n).then((function(t){return e.root=t,n.viewSlot.attached(),e._onAureliaComposed(),e}))},e.prototype._configureHost=function(e){if(!this.hostConfigured){if(e=e||this.host,this.host=e&&"string"!=typeof e?e:s.b.getElementById(e||"applicationHost"),!this.host)throw new Error("No applicationHost was specified.");this.hostConfigured=!0,this.host.aurelia=this,this.hostSlot=new u.s(this.host,!0),this.hostSlot.transformChildNodesIntoView(),this.container.registerInstance(s.b.boundary,this.host)}},e.prototype._onAureliaComposed=function(){var e=s.b.createCustomEvent("aurelia-composed",{bubbles:!0,cancelable:!0});setTimeout((function(){return s.b.dispatchEvent(e)}),1)},e}(),f=n.getLogger("aurelia"),p=/\.[^/.]+$/;function g(e,t){var r=void 0;return function n(){return(r=t.shift())?Promise.resolve(r(e)).then(n):Promise.resolve()}()}function v(e,t,r){if(0===Object.keys(t).length)return Promise.resolve();var n=e.container.get(u.o);return Promise.all(Object.keys(t).map((function(r){return function(t){var r=t.moduleId,n=m(r);o(r)&&(r=i(r));return e.loader.normalize(r,t.relativeTo).then((function(e){return{name:t.moduleId,importId:o(t.moduleId)?s(e,n):e}}))}(t[r])}))).then((function(e){var t=[],o=[];return e.forEach((function(e){t.push(void 0),o.push(e.importId)})),n.importViewResources(o,t,r)}));function o(e){var t=m(e);return!!t&&(""!==t&&(".js"!==t&&".ts"!==t))}function i(e){return e.replace(p,"")}function s(e,t){return i(e)+"."+t}}function m(e){var t=e.match(p);if(t&&t.length>0)return t[0].split(".")[1]}function b(e){return Promise.all(e.behaviorsToLoad.map((function(t){return t.load(e.container,t.target)}))).then((function(){e.behaviorsToLoad=null}))}function y(e){if(e.processed)throw new Error("This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.")}function w(e,t){return"Invalid "+t+" ["+e+"], "+t+" must be specified as functions or relative module IDs."}var T=function(){function e(e){var t=this;this.aurelia=e,this.container=e.container,this.info=[],this.processed=!1,this.preTasks=[],this.postTasks=[],this.behaviorsToLoad=[],this.configuredPlugins=[],this.resourcesToLoad={},this.preTask((function(){return e.loader.normalize("aurelia-bootstrapper").then((function(e){return t.bootstrapperName=e}))})),this.postTask((function(){return v(e,t.resourcesToLoad,e.resources)}))}return e.prototype.instance=function(e,t){return this.container.registerInstance(e,t),this},e.prototype.singleton=function(e,t){return this.container.registerSingleton(e,t),this},e.prototype.transient=function(e,t){return this.container.registerTransient(e,t),this},e.prototype.preTask=function(e){return y(this),this.preTasks.push(e),this},e.prototype.postTask=function(e){return y(this),this.postTasks.push(e),this},e.prototype.feature=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(void 0===e?"undefined":d(e)){case"string":var r=/\/index$/i.test(e),n=r||m(e)?e:e+"/index",o=r?e.substr(0,e.length-6):e;this.info.push({moduleId:n,resourcesRelativeTo:[o,""],config:t});break;case"function":this.info.push({configure:e,config:t||{}});break;default:throw new Error(w(e,"feature"))}return this},e.prototype.globalResources=function(e){var t=this;y(this);for(var r=Array.isArray(e)?e:arguments,n=void 0,o=this.resourcesRelativeTo||["",""],i=0,s=r.length;i<s;++i)switch(void 0===(n=r[i])?"undefined":d(n)){case"string":var c=o[0],l=o[1],h=n;(n.startsWith("./")||n.startsWith("../"))&&""!==c&&(h=Object(a.b)(c,n)),this.resourcesToLoad[h]={moduleId:h,relativeTo:l};break;case"function":var f=this.aurelia.resources.autoRegister(this.container,n);f instanceof u.i&&null!==f.elementName&&1===this.behaviorsToLoad.push(f)&&this.postTask((function(){return b(t)}));break;default:throw new Error(w(n,"resource"))}return this},e.prototype.globalName=function(e,t){return y(this),this.resourcesToLoad[e]={moduleId:t,relativeTo:""},this},e.prototype.plugin=function(e,t){y(this);var r=void 0;switch(void 0===e?"undefined":d(e)){case"string":r={moduleId:e,resourcesRelativeTo:[e,""],config:t||{}};break;case"function":r={configure:e,config:t||{}};break;default:throw new Error(w(e,"plugin"))}return this.info.push(r),this},e.prototype._addNormalizedPlugin=function(e,t){var r=this,n={moduleId:e,resourcesRelativeTo:[e,""],config:t||{}};return this.info.push(n),this.preTask((function(){var t=[e,r.bootstrapperName];return n.moduleId=e,n.resourcesRelativeTo=t,Promise.resolve()})),this},e.prototype.defaultBindingLanguage=function(){return this._addNormalizedPlugin("aurelia-templating-binding")},e.prototype.router=function(){return this._addNormalizedPlugin("aurelia-templating-router")},e.prototype.history=function(){return this._addNormalizedPlugin("aurelia-history-browser")},e.prototype.defaultResources=function(){return this._addNormalizedPlugin("aurelia-templating-resources")},e.prototype.eventAggregator=function(){return this._addNormalizedPlugin("aurelia-event-aggregator")},e.prototype.basicConfiguration=function(){return this.defaultBindingLanguage().defaultResources().eventAggregator()},e.prototype.standardConfiguration=function(){return this.basicConfiguration().history().router()},e.prototype.developmentLogging=function(e){var t=this,r=e?n.logLevel[e]:void 0;return void 0===r&&(r=n.logLevel.debug),this.preTask((function(){return t.aurelia.loader.normalize("aurelia-logging-console",t.bootstrapperName).then((function(e){return t.aurelia.loader.loadModule(e).then((function(e){n.addAppender(new e.ConsoleAppender),n.setLevel(r)}))}))})),this},e.prototype.apply=function(){var e=this;return this.processed?Promise.resolve():g(this,this.preTasks).then((function(){var t=e.aurelia.loader,r=e.info,n=void 0;return function o(){return(n=r.shift())?function(e,t,r){if(f.debug("Loading plugin "+r.moduleId+"."),"string"==typeof r.moduleId){e.resourcesRelativeTo=r.resourcesRelativeTo;var n=r.moduleId;return r.resourcesRelativeTo.length>1?t.normalize(r.moduleId,r.resourcesRelativeTo[1]).then((function(e){return o(e)})):o(n)}if("function"==typeof r.configure)return-1!==e.configuredPlugins.indexOf(r.configure)?Promise.resolve():(e.configuredPlugins.push(r.configure),Promise.resolve(r.configure.call(null,e,r.config||{})));throw new Error(w(r.moduleId||r.configure,"plugin"));function o(n){return t.loadModule(n).then((function(t){if("configure"in t)return-1!==e.configuredPlugins.indexOf(t.configure)?Promise.resolve():Promise.resolve(t.configure(e,r.config||{})).then((function(){e.configuredPlugins.push(t.configure),e.resourcesRelativeTo=null,f.debug("Configured plugin "+r.moduleId+".")}));e.resourcesRelativeTo=null,f.debug("Loaded plugin "+r.moduleId+".")}))}}(e,t,n).then(o):(e.processed=!0,e.configuredPlugins=null,Promise.resolve())}().then((function(){return g(e,e.postTasks)}))}))},e}()}}]);
//# sourceMappingURL=npm.aurelia-framework.d11a106912cdedd7c9ee.js.map