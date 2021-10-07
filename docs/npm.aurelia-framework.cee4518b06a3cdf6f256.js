"use strict";(self.webpackChunkaquaweb=self.webpackChunkaquaweb||[]).push([[998],{"aurelia-framework":(e,t,o)=>{o.d(t,{Aurelia:()=>d,FrameworkConfiguration:()=>y,Container:()=>n.W2,Optional:()=>n.Fi,autoinject:()=>n.On,inject:()=>n.f3,CheckedObserver:()=>l.UR,EventSubscriber:()=>l.nb,ObserverLocator:()=>l.AF,ValueAttributeObserver:()=>l.JR,bindingMode:()=>l.mD,computedFrom:()=>l.g$,observable:()=>l.LO,CompositionEngine:()=>s.Zo,ShadowDOM:()=>s._P,TemplatingEngine:()=>s.F0,ViewCompiler:()=>s.Az,ViewFactory:()=>s.Pc,ViewResources:()=>s.wu,ViewSlot:()=>s.L3,bindable:()=>s.Ex,child:()=>s.iU,children:()=>s.pI,customAttribute:()=>s.OV,customElement:()=>s.Mo,inlineView:()=>s.Rs,noView:()=>s.N,processContent:()=>s.KN,useView:()=>s.Pl,viewEngineHooks:()=>s.i0,TaskQueue:()=>c.w,DOM:()=>u.SO,LogManager:()=>T});var r=o(8099),n=o(6158),i=o(209),s=o(1781),u=o(1015),a=o(8627),l=o(6778),c=(o(1383),o(8318)),h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=function(){function e(t,o,a){this.loader=t||new u.iw.Loader,this.container=o||(new n.W2).makeGlobal(),this.resources=a||new s.wu,this.use=new y(this),this.logger=r.jl("aurelia"),this.hostConfigured=!1,this.host=null,this.use.instance(e,this),this.use.instance(i.aN,this.loader),this.use.instance(s.wu,this.resources)}return e.prototype.start=function(){var e=this;return this._started?this._started:(this.logger.info("Aurelia Starting"),this._started=this.use.apply().then((function(){if(u.SO.addEventListener("submit",(function(e){var t=e.target,o=t.action;"form"!==t.tagName.toLowerCase()||o||e.preventDefault()})),!e.container.hasResolver(s.ek)){var t="You must configure Aurelia with a BindingLanguage implementation.";throw e.logger.error(t),new Error(t)}e.logger.info("Aurelia Started");var o=u.SO.createCustomEvent("aurelia-started",{bubbles:!0,cancelable:!0});return u.SO.dispatchEvent(o),e})))},e.prototype.enhance=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._configureHost(o||u.SO.querySelectorAll("body")[0]),new Promise((function(o){var r=e.container.get(s.F0);e.root=r.enhance({container:e.container,element:e.host,resources:e.resources,bindingContext:t}),e.root.attached(),e._onAureliaComposed(),o(e)}))},e.prototype.setRoot=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r={};this.root&&this.root.viewModel&&this.root.viewModel.router&&(this.root.viewModel.router.deactivate(),this.root.viewModel.router.reset()),this._configureHost(o);var n=this.container.get(s.F0),i=this.container.get(s.P3);return delete i.initialComposition,t||(t=this.configModuleId?(0,a.ri)("./app",this.configModuleId):"app"),r.viewModel=t,r.container=r.childContainer=this.container,r.viewSlot=this.hostSlot,r.host=this.host,n.compose(r).then((function(t){return e.root=t,r.viewSlot.attached(),e._onAureliaComposed(),e}))},e.prototype._configureHost=function(e){if(!this.hostConfigured){if(e=e||this.host,this.host=e&&"string"!=typeof e?e:u.SO.getElementById(e||"applicationHost"),!this.host)throw new Error("No applicationHost was specified.");this.hostConfigured=!0,this.host.aurelia=this,this.hostSlot=new s.L3(this.host,!0),this.hostSlot.transformChildNodesIntoView(),this.container.registerInstance(u.SO.boundary,this.host)}},e.prototype._onAureliaComposed=function(){var e=u.SO.createCustomEvent("aurelia-composed",{bubbles:!0,cancelable:!0});setTimeout((function(){return u.SO.dispatchEvent(e)}),1)},e}(),f=r.jl("aurelia"),p=/\.[^/.]+$/;function g(e,t){var o=void 0;return function r(){return(o=t.shift())?Promise.resolve(o(e)).then(r):Promise.resolve()}()}function v(e){var t=e.match(p);if(t&&t.length>0)return t[0].split(".")[1]}function m(e){return Promise.all(e.behaviorsToLoad.map((function(t){return t.load(e.container,t.target)}))).then((function(){e.behaviorsToLoad=null}))}function b(e){if(e.processed)throw new Error("This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.")}function w(e,t){return"Invalid "+t+" ["+e+"], "+t+" must be specified as functions or relative module IDs."}var y=function(){function e(e){var t=this;this.aurelia=e,this.container=e.container,this.info=[],this.processed=!1,this.preTasks=[],this.postTasks=[],this.behaviorsToLoad=[],this.configuredPlugins=[],this.resourcesToLoad={},this.preTask((function(){return e.loader.normalize("aurelia-bootstrapper").then((function(e){return t.bootstrapperName=e}))})),this.postTask((function(){return function(e,t,o){if(0===Object.keys(t).length)return Promise.resolve();var r=e.container.get(s.bI);return Promise.all(Object.keys(t).map((function(o){return s=(r=t[o]).moduleId,a=v(s),n(s)&&(s=i(s)),e.loader.normalize(s,r.relativeTo).then((function(e){return{name:r.moduleId,importId:n(r.moduleId)?u(e,a):e}}));var r,s,a}))).then((function(e){var t=[],n=[];return e.forEach((function(e){t.push(void 0),n.push(e.importId)})),r.importViewResources(n,t,o)}));function n(e){var t=v(e);return!!t&&""!==t&&".js"!==t&&".ts"!==t}function i(e){return e.replace(p,"")}function u(e,t){return i(e)+"."+t}}(e,t.resourcesToLoad,e.resources)}))}return e.prototype.instance=function(e,t){return this.container.registerInstance(e,t),this},e.prototype.singleton=function(e,t){return this.container.registerSingleton(e,t),this},e.prototype.transient=function(e,t){return this.container.registerTransient(e,t),this},e.prototype.preTask=function(e){return b(this),this.preTasks.push(e),this},e.prototype.postTask=function(e){return b(this),this.postTasks.push(e),this},e.prototype.feature=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(void 0===e?"undefined":h(e)){case"string":var o=/\/index$/i.test(e),r=o||v(e)?e:e+"/index",n=o?e.substr(0,e.length-6):e;this.info.push({moduleId:r,resourcesRelativeTo:[n,""],config:t});break;case"function":this.info.push({configure:e,config:t||{}});break;default:throw new Error(w(e,"feature"))}return this},e.prototype.globalResources=function(e){var t=this;b(this);for(var o=Array.isArray(e)?e:arguments,r=void 0,n=this.resourcesRelativeTo||["",""],i=0,u=o.length;i<u;++i)switch(void 0===(r=o[i])?"undefined":h(r)){case"string":var l=n[0],c=n[1],d=r;(r.startsWith("./")||r.startsWith("../"))&&""!==l&&(d=(0,a.v_)(l,r)),this.resourcesToLoad[d]={moduleId:d,relativeTo:c};break;case"function":var f=this.aurelia.resources.autoRegister(this.container,r);f instanceof s.h2&&null!==f.elementName&&1===this.behaviorsToLoad.push(f)&&this.postTask((function(){return m(t)}));break;default:throw new Error(w(r,"resource"))}return this},e.prototype.globalName=function(e,t){return b(this),this.resourcesToLoad[e]={moduleId:t,relativeTo:""},this},e.prototype.plugin=function(e,t){b(this);var o=void 0;switch(void 0===e?"undefined":h(e)){case"string":o={moduleId:e,resourcesRelativeTo:[e,""],config:t||{}};break;case"function":o={configure:e,config:t||{}};break;default:throw new Error(w(e,"plugin"))}return this.info.push(o),this},e.prototype._addNormalizedPlugin=function(e,t){var o=this,r={moduleId:e,resourcesRelativeTo:[e,""],config:t||{}};return this.info.push(r),this.preTask((function(){var t=[e,o.bootstrapperName];return r.moduleId=e,r.resourcesRelativeTo=t,Promise.resolve()})),this},e.prototype.defaultBindingLanguage=function(){return this._addNormalizedPlugin("aurelia-templating-binding")},e.prototype.router=function(){return this._addNormalizedPlugin("aurelia-templating-router")},e.prototype.history=function(){return this._addNormalizedPlugin("aurelia-history-browser")},e.prototype.defaultResources=function(){return this._addNormalizedPlugin("aurelia-templating-resources")},e.prototype.eventAggregator=function(){return this._addNormalizedPlugin("aurelia-event-aggregator")},e.prototype.basicConfiguration=function(){return this.defaultBindingLanguage().defaultResources().eventAggregator()},e.prototype.standardConfiguration=function(){return this.basicConfiguration().history().router()},e.prototype.developmentLogging=function(e){var t=this,o=e?r.hw[e]:void 0;return void 0===o&&(o=r.hw.debug),this.preTask((function(){return t.aurelia.loader.normalize("aurelia-logging-console",t.bootstrapperName).then((function(e){return t.aurelia.loader.loadModule(e).then((function(e){r.RP(new e.ConsoleAppender),r.uR(o)}))}))})),this},e.prototype.apply=function(){var e=this;return this.processed?Promise.resolve():g(this,this.preTasks).then((function(){var t=e.aurelia.loader,o=e.info,r=void 0;return function n(){return(r=o.shift())?function(e,t,o){if(f.debug("Loading plugin "+o.moduleId+"."),"string"==typeof o.moduleId){e.resourcesRelativeTo=o.resourcesRelativeTo;var r=o.moduleId;return o.resourcesRelativeTo.length>1?t.normalize(o.moduleId,o.resourcesRelativeTo[1]).then((function(e){return n(e)})):n(r)}if("function"==typeof o.configure)return-1!==e.configuredPlugins.indexOf(o.configure)?Promise.resolve():(e.configuredPlugins.push(o.configure),Promise.resolve(o.configure.call(null,e,o.config||{})));throw new Error(w(o.moduleId||o.configure,"plugin"));function n(r){return t.loadModule(r).then((function(t){if("configure"in t)return-1!==e.configuredPlugins.indexOf(t.configure)?Promise.resolve():Promise.resolve(t.configure(e,o.config||{})).then((function(){e.configuredPlugins.push(t.configure),e.resourcesRelativeTo=null,f.debug("Configured plugin "+o.moduleId+".")}));e.resourcesRelativeTo=null,f.debug("Loaded plugin "+o.moduleId+".")}))}}(e,t,r).then(n):(e.processed=!0,e.configuredPlugins=null,Promise.resolve())}().then((function(){return g(e,e.postTasks)}))}))},e}(),T=null}}]);
//# sourceMappingURL=npm.aurelia-framework.cee4518b06a3cdf6f256.js.map