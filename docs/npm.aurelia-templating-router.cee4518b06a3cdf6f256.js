"use strict";(self.webpackChunkaquaweb=self.webpackChunkaquaweb||[]).push([[451],{"aurelia-templating-router":(t,e,n)=>{n.d(e,{configure:()=>g});var o=n(6433),i=n(1383),r=n(8627),u=n(1781),a=n(6158),s=n(6778),c=n(1015),l=n(8099),p=function(t,e){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},p(t,e)},h=function(){},f=function(){function t(t,e,n,o,i,r,u){this.element=t,this.container=e,this.viewSlot=n,this.router=o,this.viewLocator=i,this.compositionTransaction=r,this.compositionEngine=u,this.router.registerViewPort(this,this.element.getAttribute("name")),"initialComposition"in r||(r.initialComposition=!0,this.compositionTransactionNotifier=r.enlist())}return t.inject=function(){return[c.SO.Element,a.W2,u.L3,o.F0,u.r7,u.P3,u.Zo]},t.prototype.created=function(t){this.owningView=t},t.prototype.bind=function(t,e){this.container.viewModel=t,this.overrideContext=e},t.prototype.process=function(t,e){var n=this,o=t,r=o.component,a=r.childContainer,s=r.viewModel,c=r.viewModelResource,l=c.metadata,p=r.router.currentInstruction.config,h=p.viewPorts&&p.viewPorts[o.name]||{};a.get(w)._notify(this);var f={viewModel:h.layoutViewModel||p.layoutViewModel||this.layoutViewModel,view:h.layoutView||p.layoutView||this.layoutView,model:h.layoutModel||p.layoutModel||this.layoutModel,router:o.component.router,childContainer:a,viewSlot:this.viewSlot},d=this.viewLocator.getViewStrategy(r.view||s);return d&&r.view&&d.makeRelativeTo(i.aP.get(r.router.container.viewModel.constructor).moduleId),l.load(a,c.value,null,d,!0).then((function(t){n.compositionTransactionNotifier||(n.compositionTransactionOwnershipToken=n.compositionTransaction.tryCapture()),(f.viewModel||f.view)&&(o.layoutInstruction=f);var i=u.iC.dynamic(n.element,s,t);if(o.controller=l.create(a,i),e)return null;n.swap(o)}))},t.prototype.swap=function(t){var e=this,n=t,o=n.controller,i=n.layoutInstruction,r=this.view,a=function(){var t=u.pL[e.swapOrder]||u.pL.after,n=e.viewSlot;t(n,r,(function(){return Promise.resolve(n.add(e.view))})).then((function(){e._notify()}))},c=function(t){o.automate(e.overrideContext,t);var n=e.compositionTransactionOwnershipToken;return n?n.waitForCompositionComplete().then((function(){return e.compositionTransactionOwnershipToken=null,a()})):a()};return i?(i.viewModel||(i.viewModel=new h),this.compositionEngine.createController(i).then((function(t){var n=t.view;return u._P.distributeView(o.view,t.slots||n.slots),t.automate((0,s.db)(i.viewModel),e.owningView),n.children.push(o.view),n||t})).then((function(t){return e.view=t,c(t)}))):(this.view=o.view,c(this.owningView))},t.prototype._notify=function(){var t=this.compositionTransactionNotifier;t&&(t.done(),this.compositionTransactionNotifier=null)},t.$view=null,t.$resource={name:"router-view",bindables:["swapOrder","layoutView","layoutViewModel","layoutModel","inherit-binding-context"]},t}(),w=function(){function t(){var t=this;this.promise=new Promise((function(e){return t.resolve=e}))}return t.prototype.findNearest=function(){return this.promise},t.prototype._notify=function(t){this.resolve(t)},t}(),d=function(){};(0,u.Rs)("<template></template>")(d);var v=function(t){function e(e){var n=t.call(this)||this;return n.compositionEngine=e,n}return function(t,e){function n(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(e,t),e.prototype.resolveViewModel=function(t,e){return new Promise((function(n,o){var a;if("moduleId"in e){var s=e.moduleId;return null===s?a=d:(s=(0,r.ri)(s,i.aP.get(t.container.viewModel.constructor).moduleId),a=/\.html/i.test(s)?function(t){var e=/([^\/^\?]+)\.html/i.exec(t)[1],n=function(){function t(){}return t.prototype.bind=function(t){this.$parent=t},t}();return(0,u.Mo)(e)(n),(0,u.Pl)(t)(n),n}(s):s),n(a)}o(new Error('Invalid route config. No "moduleId" found.'))}))},e.prototype.createChildContainer=function(t){var e=t.container.createChild();return e.registerSingleton(w),e.getChildRouter=function(){var n;return e.registerHandler(o.F0,(function(){return n||(n=t.createChild(e))})),e.get(o.F0)},e},e.prototype.loadRoute=function(t,e,n){var o=this;return this.resolveViewModel(t,e).then((function(n){return o.compositionEngine.ensureViewModel({viewModel:n,childContainer:o.createChildContainer(t),view:e.view||e.viewStrategy,router:t})}))},e.inject=[u.Zo],e}(o.b8),m=(0,l.jl)("route-href"),y=function(){function t(t,e){this.router=t,this.element=e,this.attribute="href"}return t.inject=function(){return[o.F0,c.SO.Element]},t.prototype.bind=function(){this.isActive=!0,this.processChange()},t.prototype.unbind=function(){this.isActive=!1},t.prototype.attributeChanged=function(t,e){return e&&this.element.removeAttribute(e),this.processChange()},t.prototype.processChange=function(){var t=this;return this.router.ensureConfigured().then((function(){if(!t.isActive)return null;var e=t.element,n=t.router.generate(t.route,t.params);return e.au.controller?e.au.controller.viewModel[t.attribute]=n:e.setAttribute(t.attribute,n),null})).catch((function(t){m.error(t)}))},t.$resource={type:"attribute",name:"route-href",bindables:[{name:"route",changeHandler:"processChange",primaryProperty:!0},{name:"params",changeHandler:"processChange"},"attribute"]},t}();function g(t){t.singleton(o.b8,v).singleton(o.F0,o.WY).globalResources(f,y),t.container.registerAlias(o.F0,o.WY)}}}]);
//# sourceMappingURL=npm.aurelia-templating-router.cee4518b06a3cdf6f256.js.map