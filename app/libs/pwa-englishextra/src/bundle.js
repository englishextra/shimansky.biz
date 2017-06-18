/*jslint browser: true */
/*jslint node: true */
/*global global, _, ActiveXObject, alignToMasterBottomLeft, appendFragment, BALA, 
Carousel, changeLocation, container, Cookies, crel, debounce, define, 
DISQUS, DoSlide, Draggabilly, earlyDeviceOrientation, earlyDeviceSize, 
earlyDeviceType, earlyFnGetYyyymmdd, earlyHasTouch, 
earlySvgasimgSupport, earlySvgSupport, escape, fetch, findPos, 
fixEnRuTypo, forEach, getHTTP, getKeyValuesFromJSON, IframeLightbox, 
imagePromise, imagesLoaded, imagesPreloaded, insertExternalHTML, 
insertTextAsFragment, Isotope, isValidId, jQuery, Kamil, 
loadExternalHTML, loadJS, loadUnparsedJSON, manageDataSrcImages, 
manageImgLightboxLinks, Masonry, module, openDeviceBrowser, Packery, 
Parallax, parseLink, PhotoSwipe, PhotoSwipeUI_Default, pnotify, 
prependFragmentBefore, prettyPrint, Promise, Proxy, QRCode, 
removeChildren, removeElement, require, routie, safelyParseJSON, 
scriptIsLoaded, scroll2Top, scrollToElement, scrollToPos, scrollToTop, 
setImmediate, setStyleDisplayBlock, setStyleDisplayNone, 
setStyleOpacity, setStyleVisibilityHidden, setStyleVisibilityVisible, t, 
Tablesort, throttle, Timers, ToProgress, truncString, unescape, verge, 
VK, Ya, ymaps, zenscroll */
/*property console, split */
/*!
 * define global root
 */
/* var globalRoot = "object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {}; */
var globalRoot = "undefined" !== typeof window ? window : this;
/*!
 * safe way to handle console.log
 * @see {@link https://github.com/paulmillr/console-polyfill}
 */
(function(root){"use strict";if(!root.console){root.console={};}var con=root.console;var prop,method;var dummy=function(){};var properties=["memory"];var methods=("assert,clear,count,debug,dir,dirxml,error,exception,group,"+"groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,"+"show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");while((prop=properties.pop())){if(!con[prop]){con[prop]={};}}while((method=methods.pop())){if(!con[method]){con[method]=dummy;}}}(globalRoot));
/*!
 * modified t.js
 * a micro-templating framework in ~400 bytes gzipped
 * @author  Jason Mooberry <jasonmoo@me.com>
 * @license MIT
 * @version 0.1.0
 * Simple interpolation: {{=value}}
 * Scrubbed interpolation: {{%unsafe_value}}
 * Name-spaced variables: {{=User.address.city}}
 * If/else blocks: {{value}} <<markup>> {{:value}} <<alternate markup>> {{/value}}
 * If not blocks: {{!value}} <<markup>> {{/!value}}
 * Object/Array iteration: {{@object_value}} {{=_key}}:{{=_val}} {{/@object_value}}
 * Multi-line templates (no removal of newlines required to render)
 * Render the same template multiple times with different data
 * Works in all modern browsers
 * @see {@link https://github.com/loele/t.js/blob/2b3ab7039353cc365fb3463f6df08fd00eb3eb3d/t.js}
 * passes jshint
 */
(function(root){"use strict";var blockregex=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,valregex=/\{\{([=%])(.+?)\}\}/g;var t=function(template){this.t=template;};function scrub(val){return new Option(val).text.replace(/"/g,"&quot;");}function get_value(vars,key){var parts=key.split(".");while(parts.length){if(!(parts[0]in vars)){return false;}vars=vars[parts.shift()];}return vars;}function render(fragment,vars){return fragment.replace(blockregex,function(_,__,meta,key,inner,if_true,has_else,if_false){var val=get_value(vars,key),temp="",i;if(!val){if(meta==="!"){return render(inner,vars);}if(has_else){return render(if_false,vars);}return"";}if(!meta){return render(if_true,vars);}if(meta==="@"){_=vars._key;__=vars._val;for(i in val){if(val.hasOwnProperty(i)){vars._key=i;vars._val=val[i];temp+=render(inner,vars);}}vars._key=_;vars._val=__;return temp;}}).replace(valregex,function(_,meta,key){var val=get_value(vars,key);if(val||val===0){return meta==="%"?scrub(val):val;}return"";});}t.prototype.render=function(vars){return render(this.t,vars);};root.t=t;}(globalRoot));
/*!
 * modified verge 1.9.1+201402130803
 * @see {@link https://github.com/ryanve/verge}
 * MIT License 2013 Ryan Van Etten
 * removed module
 * converted to dot notation
 * added &&r.left<=viewportW()&&(0!==el.offsetHeight);
 * added &&r.left<=viewportW()&&(0!==el.offsetHeight);
 * added &&r.top<=viewportH()&&(0!==el.offsetHeight);
 * Substitute inViewport with: inY on vertical sites, inX on horizontal ones.
 * On pages without horizontal scroll, inX is always true.
 * On pages without vertical scroll, inY is always true.
 * If the viewport width is >= the document width, then inX is always true.
 * bug: inViewport returns true if element is hidden
 * @see {@link https://github.com/ryanve/verge/issues/19}
 * @see {@link https://github.com/ryanve/verge/blob/master/verge.js}
 * passes jshint
 */
(function(root){"use strict";var verge=(function(){var xports={},win=typeof root!=="undefined"&&root,doc=typeof document!=="undefined"&&document,docElem=doc&&doc.documentElement,matchMedia=win.matchMedia||win.msMatchMedia,mq=matchMedia?function(q){return!!matchMedia.call(win,q).matches;}:function(){return false;},viewportW=xports.viewportW=function(){var a=docElem.clientWidth,b=win.innerWidth;return a<b?b:a;},viewportH=xports.viewportH=function(){var a=docElem.clientHeight,b=win.innerHeight;return a<b?b:a;};xports.mq=mq;xports.matchMedia=matchMedia?function(){return matchMedia.apply(win,arguments);}:function(){return{};};function viewport(){return{"width":viewportW(),"height":viewportH()};}xports.viewport=viewport;xports.scrollX=function(){return win.pageXOffset||docElem.scrollLeft;};xports.scrollY=function(){return win.pageYOffset||docElem.scrollTop;};function calibrate(coords,cushion){var o={};cushion=+cushion||0;o.width=(o.right=coords.right+cushion)-(o.left=coords.left-cushion);o.height=(o.bottom=coords.bottom+cushion)-(o.top=coords.top-cushion);return o;}function rectangle(el,cushion){el=el&&!el.nodeType?el[0]:el;if(!el||1!==el.nodeType){return false;}return calibrate(el.getBoundingClientRect(),cushion);}xports.rectangle=rectangle;function aspect(o){o=null===o?viewport():1===o.nodeType?rectangle(o):o;var h=o.height,w=o.width;h=typeof h==="function"?h.call(o):h;w=typeof w==="function"?w.call(o):w;return w/h;}xports.aspect=aspect;xports.inX=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.right>=0&&r.left<=viewportW()&&(0!==el.offsetHeight);};xports.inY=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.bottom>=0&&r.top<=viewportH()&&(0!==el.offsetHeight);};xports.inViewport=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.bottom>=0&&r.right>=0&&r.top<=viewportH()&&r.left<=viewportW()&&(0!==el.offsetHeight);};return xports;}());root.verge=verge;}(globalRoot));
/*!
 * Carousel v1.0
 * @see {@link https://habrahabr.ru/post/327246/}
 * @see {@link https://codepen.io/iGetPass/pen/apZPMo}
 */
(function(root){"use strict";var d=document,qS="querySelector",aEL="addEventListener";var Carousel=function(setting){var _this=this;if(d[qS](setting.wrap)===null){console.error("Carousel not fount selector "+setting.wrap);return;}var privates={};this.prev_slide=function(){--privates.opt.position;if(privates.opt.position<0){privates.opt.position=privates.opt.max_position-1;}privates.sel.wrap.style.transform="translateX(-"+privates.opt.position+"00%)";};this.next_slide=function(){++privates.opt.position;if(privates.opt.position>=privates.opt.max_position){privates.opt.position=0;}privates.sel.wrap.style.transform="translateX(-"+privates.opt.position+"00%)";};privates.setting=setting;privates.sel={"main":d[qS](privates.setting.main),"wrap":d[qS](privates.setting.wrap),"children":d[qS](privates.setting.wrap).children,"prev":d[qS](privates.setting.prev),"next":d[qS](privates.setting.next)};privates.opt={"position":0,"max_position":d[qS](privates.setting.wrap).children.length};if(privates.sel.prev!==null){privates.sel.prev[aEL]("click",function(){_this.prev_slide();});}if(privates.sel.next!==null){privates.sel.next[aEL]("click",function(){_this.next_slide();});}};root.Carousel=Carousel;}(globalRoot));
/*!
 * modified Simple lightbox effect in pure JS
 * @see {@link https://github.com/squeral/lightbox}
 * @see {@link https://github.com/squeral/lightbox/blob/master/lightbox.js}
 * @params {Object} elem Node element
 * @params {Object} [rate] debounce rate, default 500ms
 * new IframeLightbox(elem)
 * passes jshint
 */
(function(root){"use strict";var d=document,aEL="addEventListener",gEBI="getElementById",gEBCN="getElementsByClassName",cE="createElement",cL="classList",aC="appendChild",dS="dataset",containerClass="iframe-lightbox",isLoadedClass="is-loaded",isOpenedClass="is-opened",isShowingClass="is-showing";var IframeLightbox=function(elem,rate){if(elem.nodeName){this.trigger=elem;this.rate=rate||500;this.el=d[gEBCN](containerClass)[0]||"";this.body=this.el?this.el[gEBCN]("body")[0]:"";this.content=this.el?this.el[gEBCN]("content")[0]:"";this.href=elem[dS].src||"";this.paddingBottom=elem[dS].paddingBottom||"";this.init();}else{return;}};IframeLightbox.prototype.init=function(){var _this=this;if(!this.el){this.create();}var debounce=function(func,wait){var timeout,args,context,timestamp;return function(){context=this;args=[].slice.call(arguments,0);timestamp=new Date();var later=function(){var last=(new Date())-timestamp;if(last<wait){timeout=setTimeout(later,wait-last);}else{timeout=null;func.apply(context,args);}};if(!timeout){timeout=setTimeout(later,wait);}};};var handleOpenIframeLightbox=function(e){e.preventDefault();_this.open();};var debounceHandleOpenIframeLightbox=debounce(handleOpenIframeLightbox,this.rate);this.trigger[aEL]("click",debounceHandleOpenIframeLightbox);};IframeLightbox.prototype.create=function(){var _this=this,bd=d[cE]("div");this.el=d[cE]("div");this.content=d[cE]("div");this.body=d[cE]("div");this.el[cL].add(containerClass);bd[cL].add("backdrop");this.content[cL].add("content");this.body[cL].add("body");this.el[aC](bd);this.content[aC](this.body);this.contentHolder=d[cE]("div");this.contentHolder[cL].add("content-holder");this.contentHolder[aC](this.content);this.el[aC](this.contentHolder);d.body[aC](this.el);bd[aEL]("click",function(){_this.close();});var clearBody=function(e){if(_this.isOpen()){return;}_this.el[cL].remove(isShowingClass);_this.body.innerHTML="";};this.el[aEL]("transitionend",clearBody,false);this.el[aEL]("webkitTransitionEnd",clearBody,false);this.el[aEL]("mozTransitionEnd",clearBody,false);this.el[aEL]("msTransitionEnd",clearBody,false);};IframeLightbox.prototype.loadIframe=function(){this.iframeId=containerClass+Date.now();this.body.innerHTML='<iframe src="'+this.href+'" name="'+this.iframeId+'" id="'+this.iframeId+'" onload="this.style.opacity=1;" style="opacity:0;border:none;" scrolling="no" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true" frameborder="no" title="Embedded Content"></iframe>';(function(iframeId,body){d[gEBI](iframeId).onload=function(){this.style.opacity=1;body[cL].add(isLoadedClass);};}(this.iframeId,this.body));};IframeLightbox.prototype.open=function(){this.loadIframe();if(this.paddingBottom){this.content.style.paddingBottom=this.paddingBottom;}else{this.content.removeAttribute("style");}this.el[cL].add(isShowingClass);this.el[cL].add(isOpenedClass);};IframeLightbox.prototype.close=function(){this.el[cL].remove(isOpenedClass);this.body[cL].remove(isLoadedClass);};IframeLightbox.prototype.isOpen=function(){return this.el[cL].contains(isOpenedClass);};root.IframeLightbox=IframeLightbox;}("undefined" !== typeof window ? window : this));
/*!
 * modified scrollToY
 * @see {@link http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation}
 * passes jshint
 */
(function(root){"use strict";var scroll2Top=function(scrollTargetY,speed,easing){var scrollY=root.scrollY||document.documentElement.scrollTop;scrollTargetY=scrollTargetY||0;speed=speed||2000;easing=easing||'easeOutSine';var currentTime=0;var time=Math.max(0.1,Math.min(Math.abs(scrollY-scrollTargetY)/speed,0.8));var easingEquations={easeOutSine:function(pos){return Math.sin(pos*(Math.PI/2));},easeInOutSine:function(pos){return(-0.5*(Math.cos(Math.PI*pos)-1));},easeInOutQuint:function(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,5);}return 0.5*(Math.pow((pos-2),5)+2);}};function tick(){currentTime+=1/60;var p=currentTime/time;var t=easingEquations[easing](p);if(p<1){requestAnimationFrame(tick);root.scrollTo(0,scrollY+((scrollTargetY-scrollY)*t));}else{root.scrollTo(0,scrollTargetY);}}tick();};root.scroll2Top=scroll2Top;}(globalRoot));
/*!
 * modified JavaScript Cookie - v2.1.3
 * @see {@link https://github.com/js-cookie/js-cookie}
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 * Cookies.set('name', 'value');
 * Create a cookie that expires 7 days from now, valid across the entire site:
 * Cookies.set('name', 'value', { expires: 7 });
 * Create an expiring cookie, valid to the path of the current page:
 * Cookies.set('name', 'value', { expires: 7, path: '' });
 * Cookies.get('name'); // => 'value'
 * Cookies.get('nothing'); // => undefined
 * Read all visible cookies:
 * Cookies.get(); // => { name: 'value' }
 * Cookies.remove('name');
 * Delete a cookie valid to the path of the current page:
 * Cookies.set('name', 'value', { path: '' });
 * Cookies.remove('name'); // fail!
 * Cookies.remove('name', { path: '' }); // removed!
 * IMPORTANT! when deleting a cookie, you must pass the exact same path
 * and domain attributes that was used to set the cookie,
 * unless you're relying on the default attributes.
 * removed AMD, CJS, ES6 wrapper
 * fixed this
 * @see {@link https://github.com/js-cookie/js-cookie/blob/master/src/js.cookie.js}
 * passes jshint
 */
(function(root){"use strict";var Cookies=(function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){if(attributes.hasOwnProperty(key)){result[key]=attributes[key];}}}return result;}function init(converter){var api=function(key,value,attributes){var _this=this;var result;if(typeof document==="undefined"){return;}if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==="number"){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires;}try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result;}}catch(e){}if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);}else{value=converter.write(value,key);}key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);var ret=(document.cookie=[key,'=',value,attributes.expires?'; expires='+attributes.expires.toUTCString():'',attributes.path?'; path='+attributes.path:'',attributes.domain?'; domain='+attributes.domain:'',attributes.secure?'; secure':''].join(''));return ret;}if(!key){result={};}var cookies=document.cookie?document.cookie.split("; "):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1);}try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(_this.json){try{cookie=JSON.parse(cookie);}catch(e){}}if(key===name){result=cookie;break;}if(!key){result[name]=cookie;}}catch(e){}}return result;};api.set=api;api.get=function(key){return api.call(api,key);};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments));};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}));};api.withConverter=init;return api;}return init(function(){});}());root.Cookies=Cookies;}(globalRoot));
/*!
 * A simple promise-compatible "document ready" event handler with a few extra treats.
 * With browserify/webpack:
 * const ready = require('document-ready-promise')
 * ready().then(function(){})
 * If in a non-commonjs environment, just include the script. It will attach document.ready for you.
 * document.ready().then(function() {})
 * The document.ready promise will preserve any values that you may be passing through the promise chain.
 * Using ES2015 and fetch
 * fetch(new Request('kitten.jpg'))
 * .then(response => response.blob())
 * .then(document.ready)
 * .then(blob => document.querySelector("img").src = URL.createObjectURL(blob))
 * @see {@link https://github.com/michealparks/document-ready-promise}
 * @see {@link https://github.com/michealparks/document-ready-promise/blob/master/document-ready-promise.js}
 * passes jshint
 */
(function(document,promise){document.ready=promise;}(globalRoot.document,function(chainVal){"use strict";var d=document,w=globalRoot,loaded=(/^loaded|^i|^c/).test(d.readyState),DOMContentLoaded="DOMContentLoaded",load="load";return new Promise(function(resolve){if(loaded){return resolve(chainVal);}function onReady(){resolve(chainVal);d.removeEventListener(DOMContentLoaded,onReady);w.removeEventListener(load,onReady);}d.addEventListener(DOMContentLoaded,onReady);w.addEventListener(load,onReady);});}));
/*!
 * Timer management (setInterval / setTimeout)
 * @param {Function} fn
 * @param {Number} ms
 * var timers = new Timers();
 * timers.timeout(function () {
 * console.log("before:", timers);
 * timers.clear();
 * timers = null;
 * doSomething();
 * console.log("after:", timers);
 * }, 3000);
 * @see {@link https://github.com/component/timers}
 * @see {@link https://github.com/component/timers/blob/master/index.js}
 * passes jshint
 */
(function(root){var Timers=function(ids){this.ids=ids||[];};Timers.prototype.timeout=function(fn,ms){var id=setTimeout(fn,ms);this.ids.push(id);return id;};Timers.prototype.interval=function(fn,ms){var id=setInterval(fn,ms);this.ids.push(id);return id;};Timers.prototype.clear=function(){this.ids.forEach(clearTimeout);this.ids=[];};root.Timers=Timers;}(globalRoot));
/*!
 * modified Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 * @see {@link https://github.com/component/debounce/blob/master/index.js}
 * passes jshint
 */
(function(root,undefined){var debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result;if(undefined===wait||null===wait){wait=100;}function later(){var last=Date.now()-timestamp;if(last<wait&&last>=0){timeout=setTimeout(later,wait-last);}else{timeout=null;if(!immediate){result=func.apply(context,args);context=args=null;}}}var debounced=function(){context=this;args=arguments;timestamp=Date.now();var callNow=immediate&&!timeout;if(!timeout){timeout=setTimeout(later,wait);}if(callNow){result=func.apply(context,args);context=args=null;}return result;};debounced.clear=function(){if(timeout){clearTimeout(timeout);timeout=null;}};debounced.flush=function(){if(timeout){result=func.apply(context,args);context=args=null;clearTimeout(timeout);timeout=null;}};return debounced;};root.debounce=debounce;}(globalRoot));
/*!
 * modified Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 * @see {@link https://github.com/component/throttle/blob/master/index.js}
 * passes jshint
 */
(function(root,undefined){var throttle=function(func,wait){var ctx,args,rtn,timeoutID;var last=0;return function throttled(){ctx=this;args=arguments;var delta=new Date()-last;if(!timeoutID){if(delta>=wait){call();}else{timeoutID=setTimeout(call,wait-delta);}}return rtn;};function call(){timeoutID=0;last=+new Date();rtn=func.apply(ctx,args);ctx=null;args=null;}};root.throttle=throttle;}(globalRoot));
/*!
 * parse JSON without try / catch
 * @param {String} a JSON string
 * @see {@link http://stackoverflow.com/questions/11182924/how-to-check-if-javascript-object-is-json}
 * safelyParseJSON(a)
 */
(function(root){"use strict";var safelyParseJSON=function(a){var isJson=function(obj){var t=typeof obj;return['boolean','number',"string",'symbol',"function"].indexOf(t)===-1;};if(!isJson(a)){return JSON.parse(a);}else{return a;}};root.safelyParseJSON=safelyParseJSON;}(globalRoot));
/*!
 * return an array of values that match on a certain key
 * techslides.com/how-to-parse-and-search-json-in-javascript
 * @see {@link https://gist.github.com/englishextra/872269c30d7cb2d10e3c3babdefc37b4}
 * var jpr = JSON.parse(response);
 * for(var i=0,l=jpr.length;i<l;i+=1)
 * {var t=getKeyValuesFromJSON(jpr[i],"label"),
 * p=getKeyValuesFromJSON(jpr[i],"link");};
 * @param {String} b JSON entry
 * @param {String} d JSON key to match
 * getKeyValuesFromJSON(b,d)
 */
(function(root){"use strict";var getKeyValuesFromJSON=function(b,d){var c=[];for(var a in b){if(b.hasOwnProperty(a)){if("object"===typeof b[a]){c=c.concat(getKeyValuesFromJSON(b[a],d));}else{if(a===d){c.push(b[a]);}}}}return c;};root.getKeyValuesFromJSON=getKeyValuesFromJSON;}(globalRoot));
/*!
 * modified JavaScript Sync/Async forEach - v0.1.2 - 1/10/2012
 * @see {@link https://github.com/millermedeiros/amd-utils/issues/17}
 * @see {@link https://github.com/cowboy/javascript-sync-async-foreach}
 * @see {@link http://stackoverflow.com/questions/22335853/hack-to-convert-javascript-number-to-uint32}
 * @see {@link https://jsfiddle.net/englishextra/voq0bb62/}
 * Copyright (c) 2012 "Cowboy" Ben Alman; Licensed MIT
 * removed Node.js / browser support wrapper function
 * @param {Object} a Any object to walk through
 * @param {Object} b The sync callback function
 * @param {Object} [c] The async callback function
 * forEach(a,function(e){console.log("eachCallback: "+e);},!1});
 * forEach(a,function(e){console.log("eachCallback: "+e);},function(){console.log("doneCallback");});
 * @see {@link https://github.com/cowboy/javascript-sync-async-foreach/blob/master/dist/ba-foreach.js}
 * passes jshint
 */
(function(root){"use strict";root.forEach=function(arr,eachFn,doneFn){var i=-1;var len=(function(val){val=+val;if(!isFinite(val)||!val){return 0;}return(function(left,right){return left-right*Math.floor(left/right);}(Math.floor(val),Math.pow(2,32)));}(arr.length));(function next(result){var async;var abort=result===false;do{++i;}while(!(i in arr)&&i!==len);if(abort||i===len){if(doneFn){doneFn(!abort,arr);}return;}result=eachFn.call({async:function(){async=true;return next;}},arr[i],i,arr);if(!async){next(result);}}());};}(globalRoot));
/*!
 * loop over the Array
 * @see {@link https://stackoverflow.com/questions/18238173/javascript-loop-through-json-array}
 * @see {@link https://gist.github.com/englishextra/b4939b3430da4b55d731201460d3decb}
 * @param {String} str any text string
 * @param {Int} max a whole positive number
 * @param {String} add any text string
 * truncString(str,max,add)
 */
(function(root){"use strict";var truncString=function(str,max,add){add=add||"\u2026";return("string"===typeof str&&str.length>max?str.substring(0,max)+add:str);};root.truncString=truncString;}(globalRoot));
/*!
 * fix en ru / ru en typo
 * modified sovtime.ru/soft/convert.html
 * @see {@link https://gist.github.com/englishextra/8f398bb7a3e438b692352a3c114a13ae}
 * @see {@link https://jsfiddle.net/englishextra/6p150wu1/}
 * @see {@link https://jsbin.com/runoju/edit?js,output}
 * @param {String} e any text string
 * @param {String} a "ru" or "en", default "en"
 * @param {String} b "en" or "ru", default "ru"
 * fixEnRuTypo(e,a,b)
 */
(function(root){"use strict";var fixEnRuTypo=function(e,a,b){var c="";if("ru"===a&&"en"===b){a='\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';b="f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";}else{a="f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";b='\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';}for(var d=0;d<e.length;d++){var f=a.indexOf(e.charAt(d));if(c>f){c+=e.charAt(d);}else{c+=b.charAt(f);}}return c;};root.fixEnRuTypo=fixEnRuTypo;}(globalRoot));
/*!
 * Check if string represents a valid HTML id
 * @see {@link https://gist.github.com/englishextra/b5aaef8b555a3ba84c68a6e251db149d}
 * @see {@link https://jsfiddle.net/englishextra/z19tznau/}
 * @param {String} a text string
 * @param {Int} [full] if true, checks with leading hash/number sign
 * isValidId(a,full)
 */
(function(root){"use strict";var isValidId=function(a,full){return full?/^\#[A-Za-z][-A-Za-z0-9_:.]*$/.test(a)?!0:!1:/^[A-Za-z][-A-Za-z0-9_:.]*$/.test(a)?!0:!1;};root.isValidId=isValidId;}(globalRoot));
/*!
 * find element's position
 * @see {@link https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document}
 * @param {Object} a an HTML element
 * findPos(a).top
 */
(function(root){"use strict";var findPos=function(a){a=a.getBoundingClientRect();var b=document.body,c=document.documentElement;return{top:Math.round(a.top+(root.pageYOffset||c.scrollTop||b.scrollTop)-(c.clientTop||b.clientTop||0)),left:Math.round(a.left+(root.pageXOffset||c.scrollLeft||b.scrollLeft)-(c.clientLeft||b.clientLeft||0))};};root.findPos=findPos;}(globalRoot));
/*!
 * set position of slave element to bottom left of master
 * @param {String} masterId id string
 * @param {String} servantId id string
 * @param {Boolean} [sameWidth] set same width as of master, default is false
 * alignToMasterBottomLeft(masterId, servantId, sameWidth)
 */
(function(root){var alignToMasterBottomLeft=function(masterId,servantId,sameWidth){sameWidth=sameWidth||"";var d=document,gEBI="getElementById",master=d[gEBI](masterId)||"",servant=d[gEBI](servantId)||"";if(master&&servant){var style=servant.style||"";if(style){if(sameWidth){style.width=servant.offsetWidth+"px";}style.left=master.offsetLeft+"px";style.top=(master.offsetTop+master.offsetHeight)+"px";}}};root.alignToMasterBottomLeft=alignToMasterBottomLeft;}(globalRoot));
/*!
 * remove all children of parent element
 * @see {@link https://gist.github.com/englishextra/da26bf39bc90fd29435e8ae0b409ddc3}
 * @param {Object} e parent HTML Element
 * removeChildren(e)
 */
(function(root){"use strict";var removeChildren=function(e){return (function(){if(e&&e.firstChild){for(;e.firstChild;){e.removeChild(e.firstChild);}}}());};root.removeChildren=removeChildren;}(globalRoot));
/*!
 * append node into other with fragment
 * @see {@link https://gist.github.com/englishextra/0ff3204d5fb285ef058d72f31e3af766}
 * @param {String|object} e an HTML Element to append
 * @param {Object} a target HTML Element
 * appendFragment(e,a)
 */
(function(root){"use strict";var appendFragment=function(e,a){var d=document;a=a||d.getElementsByTagNames("body")[0]||"";return (function(){if(e){var d=document,df=d.createDocumentFragment()||"",aC="appendChild";if("string"===typeof e){e=d.createTextNode(e);}df[aC](e);a[aC](df);}}());};root.appendFragment=appendFragment;}(globalRoot));
/*!
 * insert text response as fragment into element
 * @see {@link https://gist.github.com/englishextra/4e13afb8ce184ad28d77f6b5eed71d1f}
 * @param {String} text text/response to insert
 * @param {Object} container target HTML Element
 * @param {Object} [callback] callback function
 * insertTextAsFragment(t,c,f)
 */
(function(root){"use strict";var insertTextAsFragment=function(text,container,callback){var d=document,b=d.body||"",aC="appendChild",iH="innerHTML",pN="parentNode",cb=function(){return callback&&"function"===typeof callback&&callback();};try{var clonedContainer=container.cloneNode(!1);if(d.createRange){var rg=d.createRange();rg.selectNode(b);var df=rg.createContextualFragment(text);clonedContainer[aC](df);return container[pN]?container[pN].replaceChild(clonedContainer,container):container[iH]=text,cb();}else{clonedContainer[iH]=text;return container[pN]?container[pN].replaceChild(d.createDocumentFragment[aC](clonedContainer),container):container[iH]=text,cb();}}catch(e){console.log(e);}return!1;};root.insertTextAsFragment=insertTextAsFragment;}(globalRoot));
/*!
 * get current protocol - "http" or "https", else return ""
 * @param {Boolean} [force] When set to "true", and the result is empty,
 * the function will return "http"
 * getHTTP(true)
 */
(function(root){"use strict";var getHTTP=(function(type){return function(force){force=force||"";return"http:"===type?"http":"https:"===type?"https":force?"http":"";};}(root.location.protocol||""));root.getHTTP=getHTTP;}(globalRoot));
/*!
 * modified Unified URL parsing API in the browser and node
 * @see {@link https://github.com/wooorm/parse-link}
 * removed module check
 * @see {@link https://gist.github.com/englishextra/4e9a0498772f05fa5d45cfcc0d8be5dd}
 * @see {@link https://gist.github.com/englishextra/2a7fdabd0b23a8433d5fc148fb788455}
 * @see {@link https://jsfiddle.net/englishextra/fcdds4v6/}
 * @param {String} url URL string
 * @param {Boolean} [true|false] if true, returns protocol:, :port, /pathname, ?search, ?query, #hash
 * if set to false, returns protocol, port, pathname, search, query, hash
 * alert(parseLink("http://localhost/search?s=t&v=z#dev").href|
 * origin|host|port|hash|hostname|pathname|protocol|search|query|isAbsolute|isRelative|isCrossDomain);
 */
/*jshint bitwise: false */
(function(root){"use strict";var parseLink=function(url,full){full=full||!1;return (function(){var _r=function(s){return s.replace(/^(#|\?)/,"").replace(/\:$/,"");},l=location||"",_p=function(protocol){switch(protocol){case"http:":return full?":"+80:80;case"https:":return full?":"+443:443;default:return full?":"+l.port:l.port;}},_s=(0===url.indexOf("//")||!!~url.indexOf("://")),w=root.location||"",_o=function(){var o=w.protocol+"//"+w.hostname+(w.port?":"+w.port:"");return o||"";},_c=function(){var c=document.createElement("a");c.href=url;var v=c.protocol+"//"+c.hostname+(c.port?":"+c.port:"");return v!==_o();},a=document.createElement("a");a.href=url;return{href:a.href,origin:_o(),host:a.host||l.host,port:("0"===a.port||""===a.port)?_p(a.protocol):(full?a.port:_r(a.port)),hash:full?a.hash:_r(a.hash),hostname:a.hostname||l.hostname,pathname:a.pathname.charAt(0)!=="/"?(full?"/"+a.pathname:a.pathname):(full?a.pathname:a.pathname.slice(1)),protocol:!a.protocol||":"===a.protocol?(full?l.protocol:_r(l.protocol)):(full?a.protocol:_r(a.protocol)),search:full?a.search:_r(a.search),query:full?a.search:_r(a.search),isAbsolute:_s,isRelative:!_s,isCrossDomain:_c(),hasHTTP:/^(http|https):\/\//i.test(url)?!0:!1};}());};root.parseLink=parseLink;}(globalRoot));
/*jshint bitwise: true */
/*!
 * return image is loaded promise
 * @see {@link https://jsfiddle.net/englishextra/56pavv7d/}
 * @param {String|Object} s image path string or HTML DOM Image Object
 * var m = document.querySelector("img") || "";
 * var s = m.src || "";
 * imagePromise(m).then(function (r) {
 * alert(r);
 * }).catch (function (err) {
 * alert(err);
 * });
 * imagePromise(s).then(function (r) {
 * alert(r);
 * }).catch (function (err) {
 * alert(err);
 * });
 * @see {@link https://gist.github.com/englishextra/3e95d301d1d47fe6e26e3be198f0675e}
 * passes jshint
 */
(function(root){"use strict";var imagePromise=function(s){if(root.Promise){return new Promise(function(y,n){var f=function(e,p){e.onload=function(){y(p);};e.onerror=function(){n(p);};e.src=p;};if("string"===typeof s){var a=new Image();f(a,s);}else{if("img"!==s.tagName){return Promise.reject();}else{if(s.src){f(s,s.src);}}}});}else{throw new Error("Promise is not in "+root);}};root.imagePromise=imagePromise;}(globalRoot));
/*!
 * How can I check if a JS file has been included already?
 * @see {@link https://gist.github.com/englishextra/403a0ca44fc5f495400ed0e20bc51d47}
 * @see {@link https://stackoverflow.com/questions/18155347/how-can-i-check-if-a-js-file-has-been-included-already}
 * @param {String} s path string
 * scriptIsLoaded(s)
 */
(function(root){"use strict";var scriptIsLoaded=function(s){for(var b=document.getElementsByTagName("script")||"",a=0;a<b.length;a+=1){if(b[a].getAttribute("src")===s){return!0;}}return!1;};root.scriptIsLoaded=scriptIsLoaded;}(globalRoot));
/*!
 * Load .json file, but don't JSON.parse it
 * modified JSON with JS.md
 * @see {@link https://gist.github.com/thiagodebastos/08ea551b97892d585f17}
 * @see {@link https://gist.github.com/englishextra/e2752e27761649479f044fd93a602312}
 * @param {String} url path string
 * @param {Object} [callback] callback function
 * @param {Object} [onerror] on error callback function
 * loadUnparsedJSON(url,callback,onerror)
 */
(function(root){"use strict";var loadUnparsedJSON=function(url,callback,onerror){var cb=function(string){return callback&&"function"===typeof callback&&callback(string);};if(root.Promise&&root.fetch&&!root.chrome&&!("undefined"!==typeof root&&root.process&&"renderer"===root.process.type)){fetch(url).then(function(response){if(!response.ok){if(onerror&&"function"===typeof onerror){onerror();}else{throw new Error(response.statusText);}}return response;}).then(function(response){return response.text();}).then(function(text){cb(text);}).catch(function(err){console.log("Error fetch-ing file "+url,err);});}else{var x=root.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");x.overrideMimeType("application/json;charset=utf-8");x.open("GET",url,!0);x.withCredentials=!1;x.onreadystatechange=function(){if(x.status==="404"||x.status===0){console.log("Error XMLHttpRequest-ing file",x.status);return onerror&&"function"===typeof onerror&&onerror();}else if(x.readyState===4&&x.status===200&&x.responseText){cb(x.responseText);}};x.send(null);}};root.loadUnparsedJSON=loadUnparsedJSON;}(globalRoot));
/*!
 * insert External HTML
 * @param {String} id Target Element id
 * @param {String} url path string
 * @param {Object} [callback] callback function
 * @param {Object} [onerror] on error callback function
 * insertExternalHTML(selector,url,callback,onerror)
 */
(function(root){"use strict";var insertExternalHTML=function(id,url,callback,onerror){var d=document,b=d.body||"",gEBI="getElementById",cN="cloneNode",aC="appendChild",pN="parentNode",iH="innerHTML",rC="replaceChild",cR="createRange",cCF="createContextualFragment",cDF="createDocumentFragment",container=d[gEBI](id.replace(/^#/,""))||"",cb=function(){return callback&&"function"===typeof callback&&callback();},arrange=function(frag){try{var clonedContainer=container[cN](!1);if(d[cR]){var rg=d[cR]();rg.selectNode(b);var df=rg[cCF](frag);clonedContainer[aC](df);return container[pN]?container[pN][rC](clonedContainer,container):container[iH]=frag,cb();}else{clonedContainer[iH]=frag;return container[pN]?container[pN][rC](d[cDF][aC](clonedContainer),container):container[iH]=frag,cb();}}catch(e){console.log(e);}return!1;},init=function(){if(root.Promise&&root.fetch&&!root.chrome&&!("undefined"!==typeof root&&root.process&&"renderer"===root.process.type)){fetch(url).then(function(response){if(!response.ok){if(onerror&&"function"===typeof onerror){onerror();}else{throw new Error(response.statusText);}}return response;}).then(function(response){return response.text();}).then(function(text){arrange(text);}).catch(function(err){console.log("Error fetch-ing file "+url,err);});}else{var x=root.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");x.overrideMimeType("text/html;charset=utf-8");x.open("GET",url,!0);x.withCredentials=!1;x.onreadystatechange=function(){if(x.status==="404"||x.status===0){console.log("Error XMLHttpRequest-ing file",x.status);return onerror&&"function"===typeof onerror&&onerror();}else if(x.readyState===4&&x.status===200&&x.responseText){arrange(x.responseText);}};x.send(null);}};if(container){init();}};root.insertExternalHTML=insertExternalHTML;}(globalRoot));
/*!
 * Open external links in default browser out of Electron / nwjs
 * @see {@link https://gist.github.com/englishextra/b9a8140e1c1b8aa01772375aeacbf49b}
 * @see {@link https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser}
 * @see {@link https://github.com/nwjs/nw.js/wiki/shell}
 * electron - file: | nwjs - chrome-extension: | http: Intel XDK
 * wont do in electron and nw,
 * so manageExternalLinks will set target blank to links
 * var win = w.open(url, "_blank");
 * win.focus();
 * @param {String} url URL/path string
 * openDeviceBrowser(url)
 * detect Node.js
 * @see {@link https://github.com/lyrictenor/node-is-nwjs/blob/master/is-nodejs.js}
 * @returns {Boolean} true or false
 * detect Electron
 * @returns {Boolean} true or false
 * detect NW.js
 * @see {@link https://github.com/lyrictenor/node-is-nwjs/blob/master/index.js}
 * @returns {Boolean} true or false
 */
(function(root){"use strict";var isNodejs="undefined"!==typeof process&&"undefined"!==typeof require||"",isElectron="undefined"!==typeof root&&root.process&&"renderer"===root.process.type||"",isNwjs=(function(){if("undefined"!==typeof isNodejs&&isNodejs){try{if("undefined"!==typeof require("nw.gui")){return!0;}}catch(e){return!1;}}return!1;}()),openDeviceBrowser=function(url){var triggerForElectron=function(){var es=isElectron?require("electron").shell:"";return es?es.openExternal(url):"";},triggerForNwjs=function(){var ns=isNwjs?require("nw.gui").Shell:"";return ns?ns.openExternal(url):"";},triggerForHTTP=function(){return!0;},triggerForLocal=function(){return root.open(url,"_system","scrollbars=1,location=no");};if(isElectron){triggerForElectron();}else if(isNwjs){triggerForNwjs();}else{var locationProtocol=root.location.protocol||"",hasHTTP=locationProtocol?"http:"===locationProtocol?"http":"https:"===locationProtocol?"https":"":"";if(hasHTTP){triggerForHTTP();}else{triggerForLocal();}}};root.openDeviceBrowser=openDeviceBrowser;}(globalRoot));
/*!
 * add js class to html element
 */
(function(classes){"use strict";if(classes){classes.add("js");}}(document.documentElement.classList||""));
/*!
 * modified MediaHack - (c) 2013 Pomke Nohkan MIT LICENCED.
 * @see {@link https://gist.github.com/englishextra/ff8c9dde94abe32a9d7c4a65e0f2ccac}
 * @see {@link https://jsfiddle.net/englishextra/xg7ce8kc/}
 * removed className fallback and additionally
 * returns earlyDeviceOrientation,earlyDeviceSize
 * Add media query classes to DOM nodes
 * @see {@link https://github.com/pomke/mediahack/blob/master/mediahack.js}
 */
(function(root,selectors){"use strict";var orientation,size,f=function(a){var b=a.split(" ");if(selectors){for(var c=0;c<b.length;c+=1){a=b[c];selectors.add(a);}}},g=function(a){var b=a.split(" ");if(selectors){for(var c=0;c<b.length;c+=1){a=b[c];selectors.remove(a);}}},h={landscape:"all and (orientation:landscape)",portrait:"all and (orientation:portrait)"},k={small:"all and (max-width:768px)",medium:"all and (min-width:768px) and (max-width:991px)",large:"all and (min-width:992px)"},d,mM="matchMedia",m="matches",o=function(a,b){var c=function(a){if(a[m]){f(b);orientation=b;}else{g(b);}};c(a);a.addListener(c);},s=function(a,b){var c=function(a){if(a[m]){f(b);size=b;}else{g(b);}};c(a);a.addListener(c);};for(d in h){if(h.hasOwnProperty(d)){o(root[mM](h[d]),d);}}for(d in k){if(k.hasOwnProperty(d)){s(root[mM](k[d]),d);}}root.earlyDeviceOrientation=orientation||"";root.earlyDeviceSize=size||"";}(globalRoot,document.documentElement.classList||""));
/*!
 * add mobile or desktop class
 * using Detect Mobile Browsers | Open source mobile phone detection
 * Regex updated: 1 August 2014
 * detectmobilebrowsers.com
 * @see {@link https://github.com/heikojansen/plack-middleware-detectmobilebrowsers}
 */
(function(root,html,mobile,desktop,opera){"use strict";var selector=(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i).test(opera)||(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i).test(opera.substr(0,4))?mobile:desktop;if(html){html.classList.add(selector);}root.earlyDeviceType=selector||"";}(globalRoot,document.documentElement||"","mobile","desktop",navigator.userAgent||navigator.vendor||globalRoot.opera));
/*!
 * add svg support class
 */
(function(root,html,selector){"use strict";selector=document.implementation.hasFeature("http://www.w3.org/2000/svg","1.1")?selector:"no-"+selector;if(html){html.classList.add(selector);}root.earlySvgSupport=selector||"";}(globalRoot,document.documentElement||"","svg"));
/*!
 * add svgasimg support class
 */
(function(root,html,selector){"use strict";selector=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")?selector:"no-"+selector;if(html){html.classList.add(selector);}root.earlySvgasimgSupport=selector||"";}(globalRoot,document.documentElement||"","svgasimg"));
/*!
 * add touch support class
 * @see {@link https://gist.github.com/englishextra/3cb22aab31a52b6760b5921e4fe8db95}
 * @see {@link https://jsfiddle.net/englishextra/z5xhjde8/}
 */
(function(root,html,selector){"use strict";selector="ontouchstart"in html?selector:"no-"+selector;if(html){html.classList.add(selector);}root.earlyHasTouch=selector||"";}(globalRoot,document.documentElement||"","touch"));
/*!
 * return date in YYYY-MM-DD format
 */
(function(root){"use strict";var newDate=(new Date()),newDay=newDate.getDate(),newYear=newDate.getFullYear(),newMonth=newDate.getMonth();(newMonth+=1);if(10>newDay){newDay="0"+newDay;}if(10>newMonth){newMonth="0"+newMonth;}root.earlyFnGetYyyymmdd=newYear+"-"+newMonth+"-"+newDay;}(globalRoot));
/*!
 * append details to title
 */
var initialDocumentTitle = document.title || "",
userBrowsingDetails = " [" + (earlyFnGetYyyymmdd ? earlyFnGetYyyymmdd : "") + (earlyDeviceType ? " " + earlyDeviceType : "") + (earlyDeviceSize ? " " + earlyDeviceSize : "") + (earlyDeviceOrientation ? " " + earlyDeviceOrientation : "") + (earlySvgSupport ? " " + earlySvgSupport : "") + (earlySvgasimgSupport ? " " + earlySvgasimgSupport : "") + (earlyHasTouch ? " " + earlyHasTouch : "") + "]";
if (document.title) {
	document.title = document.title + userBrowsingDetails;
}
/*!
 * loading spinner
 * @requires Timers
 * @see {@link https://gist.github.com/englishextra/24ef040fbda405f7468da70e4f3b69e7}
 * @param {Object} [callback] callback function
 * @param {Int} [delay] any positive whole number, default: 500
 * LoadingSpinner.show();
 * LoadingSpinner.hide(f,n);
 */
var LoadingSpinner = (function () {
	"use strict";
	var d = document,
	b = d.body || "",
	qS = "querySelector",
	spinnerClass = "loading-spinner",
	spinner = d[qS]("." + spinnerClass) || "",
	cL = "classList",
	cE = "createElement",
	isActiveClass = "is-active-loading-spinner";
	/* console.log("triggered function: LoadingSpinner"); */
	if (!spinner) {
		spinner = d[cE]("div");
		spinner[cL].add(spinnerClass);
		appendFragment(spinner, b);
	}
	return {
		show: function () {
			return b[cL].contains(isActiveClass) || b[cL].add(isActiveClass);
		},
		hide: function (callback, delay) {
			delay = delay || 500;
			var timers = new Timers();
			timers.timeout(function () {
				timers.clear();
				timers = null;
				b[cL].remove(isActiveClass);
				if (callback && "function" === typeof callback) {
					callback();
				}
			}, delay);
		}
	};
}
());
/*!
 * render template
 * @requires t.js
 * @requires safelyParseJSON
 */
var renderTemplate = function (parsedJson, templateId, targetId) {
	"use strict";
	var d = document,
	gEBI = "getElementById",
	template = d[gEBI](templateId) || "",
	target = d[gEBI](targetId) || "";
	parsedJson = safelyParseJSON(parsedJson);
	if (parsedJson && template && target) {
		var targetHtml = template.innerHTML || "",
		renderTargetTemplate = new t(targetHtml);
		return renderTargetTemplate.render(parsedJson);
	}
	return {};
};
/*!
 * insert as fragment from template
 * @requires renderTemplate
 * @requires insertTextAsFragment
 */
var insertFromTemplate = function (parsedJson, templateId, targetId, callback, useInner) {
	"use strict";
	useInner = useInner || "";
	var d = document,
	gEBI = "getElementById",
	template = d[gEBI](templateId) || "",
	target = d[gEBI](targetId) || "",
	cb = function () {
		return callback && "function" === typeof callback && callback();
	};
	if (parsedJson && template && target) {
		var targetRendered = renderTemplate(parsedJson, templateId, targetId);
		if (useInner) {
			target.innerHTML = targetRendered;
			cb();
		} else {
			insertTextAsFragment(targetRendered, target, cb);
		}
	}
};
/*!
 * replace img src with data-src
 */
var handleDataSrcImages = function () {
	"use strict";
	var d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	ds = "dataset",
	imgClass = "data-src-img",
	img = d[gEBCN](imgClass) || "",
	isActiveClass = "is-active",
	isBindedClass = "is-binded",
	rerenderDataSrcImage = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			var _src = e[ds].src || "";
			if (_src) {
				if (parseLink(_src).isAbsolute && !parseLink(_src).hasHTTP) {
					e[ds].src = _src.replace(/^/, getHTTP(!0) + ":");
					_src = e[ds].src;
				}
				imagePromise(_src).then(function (r) {
					e.src = _src;
					/* console.log("manageDataSrcImages => imagePromise: loaded image:", r); */
				}).catch (function (err) {
					/* console.log("manageDataSrcImages => imagePromise: cannot load image:", err); */
				});
				/* e.src = _src; */
				e[cL].add(isActiveClass);
				e[cL].add(isBindedClass);
			}
		}
	},
	arrangeDataSrcImage = function (e) {
		/*!
		 * true if elem is in same y-axis as the viewport or within 100px of it
		 * @see {@link https://github.com/ryanve/verge}
		 */
		if (verge.inY(e, 100) /*  && 0 !== e.offsetHeight */) {
			rerenderDataSrcImage(e);
		}
	},
	rerenderDataSrcImages = function () {
		for (var i = 0, l = img.length; i < l; i += 1) {
			arrangeDataSrcImage(img[i]);
		}
		/* forEach(img, arrangeDataSrcImage); */
	};
	if (img) {
		/* console.log("triggered function: manageDataSrcImages"); */
		rerenderDataSrcImages();
	}
},
handleDataSrcImagesWindow = function () {
	var throttleHandleDataSrcImages = throttle(handleDataSrcImages, 100);
	throttleHandleDataSrcImages();
},
manageDataSrcImages = function () {
	"use strict";
	var w = globalRoot,
	aEL = "addEventListener",
	rEL = "removeEventListener";
	w[rEL]("scroll", handleDataSrcImagesWindow);
	w[rEL]("resize", handleDataSrcImagesWindow);
	w[aEL]("scroll", handleDataSrcImagesWindow);
	w[aEL]("resize", handleDataSrcImagesWindow);
	var timers = new Timers();
	timers.timeout(function () {
		timers.clear();
		timers = null;
		handleDataSrcImages();
	}, 100);
};
document.ready().then(manageDataSrcImages);
/*!
 * replace iframe src with data-src
 */
var handleDataSrcIframes = function () {
	"use strict";
	var d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	ds = "dataset",
	sA = "setAttribute",
	iframeClass = "data-src-iframe",
	iframe = d[gEBCN](iframeClass) || "",
	isBindedClass = "is-binded",
	rerenderDataSrcIframe = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			var _src = e[ds].src || "";
			if (_src) {
				if (parseLink(_src).isAbsolute && !parseLink(_src).hasHTTP) {
					e[ds].src = _src.replace(/^/, getHTTP(!0) + ":");
					_src = e[ds].src;
				}
				e.src = _src;
				e[cL].add(isBindedClass);
				e[sA]("frameborder", "no");
				e[sA]("style", "border:none;");
				e[sA]("webkitallowfullscreen", "true");
				e[sA]("mozallowfullscreen", "true");
				e[sA]("scrolling", "no");
				e[sA]("allowfullscreen", "true");
			}
		}
	},
	arrangeDataSrcIframe = function (e) {
		/*!
		 * true if elem is in same y-axis as the viewport or within 100px of it
		 * @see {@link https://github.com/ryanve/verge}
		 */
		if (verge.inY(e, 100) /* && 0 !== e.offsetHeight */) {
			rerenderDataSrcIframe(e);
		}
	},
	rerenderDataSrcIframes = function () {
		for (var i = 0, l = iframe.length; i < l; i += 1) {
			arrangeDataSrcIframe(iframe[i]);
		}
		/* forEach(iframe, arrangeDataSrcIframe); */
	};
	if (iframe) {
		/* console.log("triggered function: manageDataSrcIframes"); */
		rerenderDataSrcIframes();
	}
},
handleDataSrcIframesWindow = function () {
	var throttleHandleDataSrcIframes = throttle(handleDataSrcIframes, 100);
	throttleHandleDataSrcIframes();
},
manageDataSrcIframes = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var w = globalRoot,
	aEL = "addEventListener",
	rEL = "removeEventListener";
	w[rEL]("scroll", handleDataSrcIframesWindow);
	w[rEL]("resize", handleDataSrcIframesWindow);
	w[aEL]("scroll", handleDataSrcIframesWindow);
	w[aEL]("resize", handleDataSrcIframesWindow);
	var timers = new Timers();
	timers.timeout(function () {
		timers.clear();
		timers = null;
		handleDataSrcIframes();
	}, 100);
};
document.ready().then(manageDataSrcIframes);
/*!
 * replace iframe src with data-src
 * @param {Object} [ctx] context HTML Element
 */
var manageIframeLightboxLinks = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	linkClass = "iframe-lightbox-link",
	link = ctx ? ctx[gEBCN](linkClass) || "" : d[gEBCN](linkClass) || "",
	isBindedClass = "is-binded",
	arrangeDataSrcIframe = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			e.lightbox = new IframeLightbox(e);
			e[cL].add(isBindedClass);
		}
	},
	rerenderIframeLightboxLinks = function () {
		for (var i = 0, l = link.length; i < l; i += 1) {
			arrangeDataSrcIframe(link[i]);
		}
		/* forEach(link, arrangeDataSrcIframe); */
	};
	if (link) {
		/* console.log("triggered function: manageIframeLightboxLibks"); */
		rerenderIframeLightboxLinks();
	}
};
document.ready().then(manageIframeLightboxLinks);
/*!
 * set click event on external links,
 * so that they open in new browser tab
 * @param {Object} [ctx] context HTML Element
 */
var handleExternalLink = function (url, ev) {
	"use strict";
	ev.stopPropagation();
	ev.preventDefault();
	var logicHandleExternalLink = openDeviceBrowser.bind(null, url),
	debounceLogicHandleExternalLink = debounce(logicHandleExternalLink, 200);
	debounceLogicHandleExternalLink();
},
manageExternalLinks = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var d = document,
	gEBTN = "getElementsByTagName",
	linkTag = "a",
	link = ctx ? ctx[gEBTN](linkTag) || "" : d[gEBTN](linkTag) || "",
	cL = "classList",
	aEL = "addEventListener",
	gA = "getAttribute",
	isBindedClass = "is-binded",
	arrangeExternalLink = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			var url = e[gA]("href") || "";
			if (url && parseLink(url).isCrossDomain && parseLink(url).hasHTTP) {
				e.title = "" + (parseLink(url).hostname || "") + " откроется в новой вкладке";
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					e.target = "_blank";
					e.rel = "noopener";
				} else {
					e[aEL]("click", handleExternalLink.bind(null, url));
				}
				e[cL].add(isBindedClass);
			}
		}
	},
	rerenderExternalLinks = function () {
		for (var i = 0, l = link.length; i < l; i += 1) {
			arrangeExternalLink(link[i]);
		}
		/* forEach(link, arrangeExternalLink); */
	};
	if (link) {
		/* console.log("triggered function: manageExternalLinks"); */
		rerenderExternalLinks();
	}
};
document.ready().then(manageExternalLinks);
/*!
 * manage data lightbox img links
 */
var hideImgLightbox = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	gEBTN = "getElementsByTagName",
	cL = "classList",
	container = d[qS](".img-lightbox-container") || "",
	img = container ? container[gEBTN]("img")[0] || "" : "",
	an = "animated",
	an1 = "fadeIn",
	an2 = "fadeInUp",
	an3 = "fadeOut",
	an4 = "fadeOutDown",
	dummySrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
	if (container && img) {
		img[cL].remove(an2);
		img[cL].add(an4);
		var hideImg = function () {
			container[cL].remove(an);
			container[cL].remove(an3);
			img[cL].remove(an);
			img[cL].remove(an4);
			img.src = dummySrc;
			container.style.display = "none";
		},
		hideContainer = function () {
			container[cL].remove(an1);
			container[cL].add(an3);
			var timers = new Timers();
			timers.timeout(function () {
				timers.clear();
				timers = null;
				hideImg();
			}, 400);
		};
		var timers = new Timers();
		timers.timeout(function () {
			timers.clear();
			timers = null;
			hideContainer();
		}, 400);
	}
},
handleImgLightboxContainer = function () {
	"use strict";
	var rEL = "removeEventListener";
	if (container) {
		container[rEL]("click", handleImgLightboxContainer);
		hideImgLightbox();
	}
},
handleImgLightboxWindow = function (ev) {
	"use strict";
	var w = globalRoot,
	rEL = "removeEventListener";
	w[rEL]("keyup", handleImgLightboxWindow);
	if (27 === (ev.which || ev.keyCode)) {
		hideImgLightbox();
	}
},
manageImgLightboxLinks = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var w = globalRoot,
	d = document,
	b = d.body || "",
	gEBCN = "getElementsByClassName",
	gEBTN = "getElementsByTagName",
	cL = "classList",
	aEL = "addEventListener",
	aC = "appendChild",
	cE = "createElement",
	gA = "getAttribute",
	linkClass = "img-lightbox-link",
	link = ctx ? ctx[gEBCN](linkClass) || "" : d[gEBCN](linkClass) || "",
	containerClass = "img-lightbox-container",
	container = d[gEBCN](containerClass)[0] || "",
	img = container ? container[gEBTN]("img")[0] || "" : "",
	an = "animated",
	an1 = "fadeIn",
	an2 = "fadeInUp",
	isBindedClass = "is-binded",
	dummySrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
	if (!container) {
		container = d[cE]("div");
		img = d[cE]("img");
		img.src = dummySrc;
		img.alt = "";
		container[aC](img);
		container[cL].add(containerClass);
		appendFragment(container, b);
	}
	var handleImgLightboxLink = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _this = this;
		var logicHandleImgLightboxLink = function () {
			var _href = _this[gA]("href") || "";
			if (container && img && _href) {
				LoadingSpinner.show();
				container[cL].add(an);
				container[cL].add(an1);
				img[cL].add(an);
				img[cL].add(an2);
				if (parseLink(_href).isAbsolute && !parseLink(_href).hasHTTP) {
					_href = _href.replace(/^/, getHTTP(!0) + ":");
				}
				imagePromise(_href).then(function (r) {
					img.src = _href;
					/* console.log("manageImgLightboxLinks => imagePromise: loaded image:", r); */
				}).catch (function (err) {
					/* console.log("manageImgLightboxLinks => imagePromise: cannot load image:", err); */
				});
				/* img.src = _href; */
				w[aEL]("keyup", handleImgLightboxWindow);
				container[aEL]("click", handleImgLightboxContainer);
				container.style.display = "block";
				LoadingSpinner.hide();
			}
		},
		debounceLogicHandleImgLightboxLink = debounce(logicHandleImgLightboxLink, 200);
		debounceLogicHandleImgLightboxLink();
	},
	arrangeImgLightboxLink = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			var _href = e[gA]("href") || "";
			if (_href) {
				if (parseLink(_href).isAbsolute && !parseLink(_href).hasHTTP) {
					e.setAttribute("href", _href.replace(/^/, getHTTP(!0) + ":"));
				}
				e[aEL]("click", handleImgLightboxLink);
				e[cL].add(isBindedClass);
			}
		}
	},
	rerenderImgLightboxLinks = function () {
		for (var j = 0, l = link.length; j < l; j += 1) {
			arrangeImgLightboxLink(link[j]);
		}
		/* forEach(link, arrangeImgLightboxLink); */
	};
	if (link) {
		/* console.log("triggered function: manageImgLightboxLinks"); */
		rerenderImgLightboxLinks();
	}
};
document.ready().then(manageImgLightboxLinks);
/*!
 * hide other dropdown lists
 * use ev.stopPropagation(); ev.preventDefault();
 * in click event handlers of dropdown openers
 * @param {Object} [_this] node element, if empty will affect everyone
 */
var handleOtherDropdownLists = function (_this) {
	"use strict";
	_this = _this || this;
	var d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	isActiveClass = "is-active",
	isDropdownClass = "is-dropdown",
	list = d[gEBCN](isDropdownClass) || "",
	removeActiveClass = function (e) {
		if (_this !== e) {
			e[cL].remove(isActiveClass);
		}
	};
	if (list) {
		for (var i = 0, l = list.length; i < l; i += 1) {
			removeActiveClass(list[i]);
		}
		/* forEach(list, removeActiveClass); */
	}
},
manageOtherDropdownLists = function () {
	"use strict";
	var d = document,
	gEBI = "getElementById",
	aEL = "addEventListener",
	container = d[gEBI]("container") || "";
	if (container) {
		container[aEL]("click", handleOtherDropdownLists);
	}
};
document.ready().then(manageOtherDropdownLists);
globalRoot.addEventListener("hashchange", handleOtherDropdownLists);
/*!
 * add smooth scroll or redirection to static select options
 * @param {Object} [ctx] context HTML Element
 */
var manageChaptersSelect = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	gEBI = "getElementById",
	gEBTN = "getElementsByTagName",
	gEBCN = "getElementsByClassName",
	cL = "classList",
	pN = "parentNode",
	cDF = "createDocumentFragment",
	cE = "createElement",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	cTN = "createTextNode",
	aC = "appendChild",
	aEL = "addEventListener",
	chaptersSelect = d[gEBI]("chapters-select") || "",
	holderChaptersSelect = d[gEBCN]("holder-chapters-select")[0] || "",
	uiPanelContentsSelect = d[gEBCN]("ui-panel-contents-select")[0] || "",
	chaptersListClass = "chapters-list",
	isBindedClass = "is-binded",
	isFixedClass = "is-fixed",
	isActiveClass = "is-active",
	isDropdownClass = "is-dropdown",
	arrangePagesSelect = function () {
		var handleChaptersSelect = function () {
			var _this = this;
			var _hash = _this.options[_this.selectedIndex].value || "",
			tragetObject = _hash ? (isValidId(_hash, true) ? d[gEBI](_hash.replace(/^#/,"")) || "" : "") : "",
			uiPanelContentsSelectHeight = uiPanelContentsSelect ? (uiPanelContentsSelect[cL].contains(isFixedClass) ? uiPanelContentsSelect.offsetHeight : uiPanelContentsSelect.offsetHeight * 2) : 0;
			if (_hash) {
				if (tragetObject) {
					scroll2Top(findPos(tragetObject).top - uiPanelContentsSelectHeight, 10000);
				} else {
					w.location.hash = _hash;
				}
			}
		};
		if (!chaptersSelect[cL].contains(isBindedClass)) {
			chaptersSelect[aEL]("change", handleChaptersSelect);
			chaptersSelect[cL].add(isBindedClass);
		}
	},
	rerenderChaptersSelect = function () {
		arrangePagesSelect();
		var rerenderOption = function (option) {
			if (option) {
				var optionText = option.textContent;
				option.title = optionText;
				var optionTextTruncated = truncString("" + optionText, 28);
				removeChildren(option);
				appendFragment(d.createTextNode(optionTextTruncated), option);
			}
		},
		chaptersSelectOptions = chaptersSelect ? chaptersSelect[gEBTN]("option") || "" : "";
		for (var i = 0, l = chaptersSelectOptions.length; i < l; i += 1) {
			rerenderOption(chaptersSelectOptions[i]);
		}
		/* forEach(chaptersSelectOptions, rerenderOption); */
	},
	rerenderChaptersList = function () {
		var handleChaptersListItem = function (listObj, _hash) {
			var tragetObject = _hash ? (isValidId(_hash, true) ? d[gEBI](_hash.replace(/^#/,"")) || "" : "") : "",
			uiPanelContentsSelectHeight = uiPanelContentsSelect ? (uiPanelContentsSelect[cL].contains(isFixedClass) ? uiPanelContentsSelect.offsetHeight : uiPanelContentsSelect.offsetHeight * 2) : 0;
			if (_hash) {
				if (tragetObject) {
					scroll2Top(findPos(tragetObject).top - uiPanelContentsSelectHeight, 10000);
				} else {
					w.location.hash = _hash;
				}
			}
			listObj[cL].remove(isActiveClass);
		},
		insertChevronDownSmallSvg = function (targetObj) {
			var svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
			use = d[cENS]("http://www.w3.org/2000/svg", "use");
			svg[cL].add("ui-icon");
			use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-ChevronDownSmall");
			svg[aC](use);
			targetObj[aC](svg);
		},
		chaptersList = d[cE]("ul"),
		chaptersListItems = chaptersSelect ? chaptersSelect[gEBTN]("option") || "" : "",
		chaptersListButtonDefaultText = "",
		df = d[cDF](),
		generateChaptersListItems = function (_this, i) {
			if (0 === i) {
				chaptersListButtonDefaultText = _this.firstChild.textContent;
			}
			var chaptersListItem = d[cE]("li"),
			chaptersListItemText = _this.firstChild.textContent || "",
			chaptersListItemValue = _this.value,
			chaptersListItemTextTruncated = truncString("" + chaptersListItemText, 28);
			chaptersListItem[aC](d[cTN](chaptersListItemTextTruncated));
			chaptersListItem.title = chaptersListItemText;
			chaptersListItem[aEL]("click", handleChaptersListItem.bind(null, chaptersList, chaptersListItemValue));
			df[aC](chaptersListItem);
			df[aC](d.createTextNode("\n"));
		};
		for (var i = 0, l = chaptersListItems.length; i < l; i += 1) {
			generateChaptersListItems(chaptersListItems[i], i);
		}
		/* forEach(chaptersListItems, generateChaptersListItems); */
		appendFragment(df, chaptersList);
		chaptersList[cL].add(chaptersListClass);
		chaptersList[cL].add(isDropdownClass);
		holderChaptersSelect.replaceChild(chaptersList, chaptersSelect[pN][pN]);
		var chaptersListButton = d[cE]("a");
		chaptersListButton[aC](d[cTN](chaptersListButtonDefaultText));
		chaptersList[pN].insertBefore(chaptersListButton, chaptersList);
		/*jshint -W107 */
		chaptersListButton.href = "javascript:void(0);";
		/*jshint +W107 */
		insertChevronDownSmallSvg(chaptersListButton);
		var handleChaptersListItemsButton = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			chaptersList[cL].toggle(isActiveClass);
			handleOtherDropdownLists(chaptersList);
		};
		chaptersListButton[aEL]("click", handleChaptersListItemsButton);
	};
	if (holderChaptersSelect && chaptersSelect) {
		/* console.log("triggered function: manageChaptersSelect"); */
		/* rerenderChaptersSelect(); */
		rerenderChaptersList();
	}
};
/*!
 * add click event on hidden-layer show btn
 * @param {Object} [ctx] context HTML Element
 */
var manageExpandingLayers = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var d = document,
	gEBCN = "getElementsByClassName",
	aEL = "addEventListener",
	cL = "classList",
	pN = "parentNode",
	btnClass = "btn-expand-hidden-layer",
	btn = ctx ? ctx[gEBCN](btnClass) || "" : d[gEBCN](btnClass) || "",
	isBindedClass = "is-binded",
	isActiveClass = "is-active",
	handleExpandingLayers = function (_this) {
		_this = _this ? _this.target || "" : "";
		var s = _this[pN] ? _this[pN].nextElementSibling : "";
		if (s) {
			_this[cL].toggle(isActiveClass);
			s[cL].toggle(isActiveClass);
		}
		return !1;
	},
	arrangeExpandingLayers = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			e[aEL]("click", handleExpandingLayers);
			e[cL].add(isBindedClass);
		}
	},
	rerenderExpandingLayers = function () {
		for (var i = 0, l = btn.length; i < l; i += 1) {
			arrangeExpandingLayers(btn[i]);
		}
		/* forEach(btn, arrangeExpandingLayers); */
	};
	if (btn) {
		/* console.log("triggered function: manageExpandingLayers"); */
		rerenderExpandingLayers();
	}
};
/*!
 * init Masonry grid
 * @see {@link https://stackoverflow.com/questions/15160010/jquery-masonry-collapsing-on-initial-page-load-works-fine-after-clicking-home}
 * percentPosition: !0 works well with percent-width items,
 * as items will not transition their position on resize.
 * masonry.desandro.com/options.html
 */
var msnry,
pckry,
initMasonry = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var w = globalRoot,
	d = document,
	gEBCN = "getElementsByClassName",
	masonryGridClass = "masonry-grid",
	masonryItemClass = "masonry-grid-item",
	sizerSelector = ".masonry-grid-sizer",
	masonryGrid = ctx ? ctx[gEBCN](masonryGridClass)[0] || "" : d[gEBCN](masonryGridClass)[0] || "",
	masonryItem = ctx ? ctx[gEBCN](masonryItemClass)[0] || "" : d[gEBCN](masonryItemClass)[0] || "",
	arrangeMasonryItems = function () {
		var timers;
		if (w.Masonry) {
			if (msnry) {
				msnry.destroy();
			}
			msnry = new Masonry("." + masonryGridClass, {
					itemSelector: "." + masonryItemClass,
					columnWidth: sizerSelector,
					gutter: 0,
					percentPosition: !0
				});
			/* console.log("function initMasonry.arrangeItems => initialised msnry"); */
			timers = new Timers();
			timers.interval(function () {
				/* console.log("function initMasonry.arrangeItems => started Interval"); */
				if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
				timers.clear();
				timers = null;
					/* console.log("function initMasonry.arrangeItems; imagesPreloaded=" + imagesPreloaded); */
					msnry.layout();
					/* console.log("function initMasonry.arrangeItems => reinitialised msnry"); */
				}
			}, 100);
		} else if (w.Packery) {
			if (pckry) {
				pckry.destroy();
			}
			pckry = new Packery("." + masonryGridClass, {
					itemSelector: "." + masonryItemClass,
					columnWidth: sizerSelector,
					gutter: 0,
					percentPosition: !0
				});
			/* console.log("function initMasonry.arrangeItems => initialised pckry"); */
			timers = new Timers();
			timers.interval(function () {
				/* console.log("function initMasonry.arrangeItems => started Interval"); */
				if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
				timers.clear();
				timers = null;
						/* console.log("function initMasonry.arrangeItems; imagesPreloaded=" + imagesPreloaded); */
						pckry.layout();
						/* console.log("function initMasonry.arrangeItems => reinitialised pckry"); */
				}
			}, 100);
		} else {
			/* console.log("function initMasonry.arrangeItems => no library is loaded"); */
		}
	};
	if (masonryGrid && masonryItem) {
		if ("undefined" !== typeof imagesPreloaded) {
			/* console.log("triggered function: initMasonryGrid"); */
			var timers = new Timers();
			timers.timeout(function () {
				timers.clear();
				timers = null;
				/* var js = "./cdn/masonry/4.1.1/js/masonry.pkgd.fixed.min.js"; */
				var js = "./cdn/packery/2.1.1/js/packery.pkgd.fixed.min.js";
				if (!scriptIsLoaded(js)) {
					loadJS(js, arrangeMasonryItems);
				} else {
					arrangeMasonryItems();
				}
			}, 100);
		} else {
			/* console.log("function initMasonry => undefined: imagesPreloaded"); */
		}
	}
};
/*!
 * load or refresh disqus_thread on click
 */
var manageDisqusButton = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	var w = globalRoot,
	d = document,
	gEBI = "getElementById",
	gEBCN = "getElementsByClassName",
	cL = "classList",
	ds = "dataset",
	aC = "appendChild",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	cE = "createElement",
	btnClass = "btn-show-disqus",
	btn = ctx ? ctx[gEBCN](btnClass)[0] || "" : d[gEBCN](btnClass)[0] || "",
	disqusThread = d[gEBI]("disqus_thread") || "",
	isBindedClass = "is-binded",
	isActiveClass = "is-active",
	locationHref = w.location.href || "",
	disqusShortname = disqusThread ? (disqusThread[ds].shortname || "") : "",
	embedJsUrl = getHTTP(!0) + "://" + disqusShortname + ".disqus.com/embed.js";
	if (disqusThread && btn && disqusShortname && locationHref) {
		/* console.log("triggered function: manageDisqusButton"); */
		var hideDisqusButton = function () {
			disqusThread[cL].add(isActiveClass);
			btn.style.display = "none";
			LoadingSpinner.hide();
		},
		hideDisqusThread = function () {
			removeChildren(disqusThread);
			var replacementText = d[cE]("p");
			replacementText[aC](d.createTextNode("Комментарии доступны только в веб версии этой страницы."));
			appendFragment(replacementText, disqusThread);
			disqusThread.removeAttribute("id");
			hideDisqusButton();
		},
		renderDisqusThread = function () {
			try {
				DISQUS.reset({
					reload: !0,
					config: function () {
						this.page.identifier = disqusShortname;
						this.page.url = locationHref;
					}
				});
				hideDisqusButton();
			} catch (e) {
				hideDisqusButton();
			}
		},
		handleDisqusButton = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			var logicHandleDisqusButton = function () {
				btn[rEL]("click", handleDisqusButton);
				LoadingSpinner.show();
				if (!scriptIsLoaded(embedJsUrl)) {
					loadJS(embedJsUrl, renderDisqusThread);
				} else {
					renderDisqusThread();
				}
			},
			debounceLogicHandleDisqusButton = debounce(logicHandleDisqusButton, 200);
			debounceLogicHandleDisqusButton();
		};
		if (disqusThread && btn) {
			if ("undefined" !== typeof getHTTP && getHTTP()) {
				if (!btn[cL].contains(isBindedClass)) {
					btn[aEL]("click", handleDisqusButton);
					btn[cL].add(isBindedClass);
				}
			} else {
				hideDisqusThread();
			}
		}
	}
};
/*!
 * modified Notibar.js v1.0
 * Lightweight notification bar, no dependency.
 * @see {@link https://github.com/englishextra/notibar.js}
 * passes jshint
 */
var notiBar = function (opt) {
	var d = document,
	b = d.body || "",
	qS = "querySelector",
	cL = "classList",
	aC = "appendChild",
	cE = "createElement",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	notibarClass = "notibar",
	notibarContainer = d[qS]("." + notibarClass) || "",
	messageClass = "message",
	closeButtonClass = "close",
	defaultKey = "_notibar_dismiss_",
	defaultDatum = "ok",
	animatedClass = "animated",
	fadeInDownClass = "fadeInDown",
	fadeOutUpClass = "fadeOutUp";
	if (b) {
		/* console.log("triggered function: notiBar"); */
		if ("string" === typeof opt) {
			opt = {
				"message": opt
			};
		}
		var settings = {
			"message": "",
			"timeout": 10000,
			"key": defaultKey,
			"datum": defaultDatum,
			"days": 0,
		};
		for (var i in opt) {
			if (opt.hasOwnProperty(i)) {
				settings[i] = opt[i];
			}
		}
		var cookieKey = Cookies.get(settings.key) || "";
		if (cookieKey && cookieKey === decodeURIComponent(settings.datum)) {
			return !1;
		}
		if (notibarContainer) {
			removeChildren(notibarContainer);
		} else {
			notibarContainer = d[cE]("div");
			notibarContainer[cL].add(notibarClass);
			notibarContainer[cL].add(animatedClass);
		}
		var msgContainer = d[cE]("div");
		msgContainer[cL].add(messageClass);
		var msgContent = settings.message || "";
		if ("string" === typeof msgContent) {
			msgContent = d.createTextNode(msgContent);
		}
		msgContainer[aC](msgContent);
		notibarContainer[aC](msgContainer);
		var insertCancelSvg = function (targetObj) {
			var svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
			use = d[cENS]("http://www.w3.org/2000/svg", "use");
			svg[cL].add("ui-icon");
			use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-Cancel");
			svg[aC](use);
			targetObj[aC](svg);
		},
		closeButton = d[cE]("a");
		closeButton[cL].add(closeButtonClass);
		insertCancelSvg(closeButton);
		var set_cookie = function () {
			if (settings.days) {
				Cookies.set(settings.key, settings.datum, {
					expires: settings.days
				});
			} else {
				Cookies.set(settings.key, settings.datum);
			}
		},
		hideMessage = function () {
			var notibarContainer = d[qS]("." + notibarClass) || "";
			if (notibarContainer) {
				notibarContainer[cL].remove(fadeInDownClass);
				notibarContainer[cL].add(fadeOutUpClass);
				removeChildren(notibarContainer);
			}
		},
		handleCloseButton = function () {
			closeButton[rEL]("click", handleCloseButton);
			hideMessage();
			set_cookie();
		};
		closeButton[aEL]("click", handleCloseButton);
		notibarContainer[aC](closeButton);
		appendFragment(notibarContainer, b);
		notibarContainer[cL].remove(fadeOutUpClass);
		notibarContainer[cL].add(fadeInDownClass);
		var timers = new Timers();
		timers.timeout(function () {
			timers.clear();
			timers = null;
			hideMessage();
		}, settings.timeout);
	}
};
/*!
 * init notibar
 */
var initNotibarMsg = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	aC = "appendChild",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	cE = "createElement",
	uiPanelContentsSelect = d[gEBCN]("ui-panel-contents-select")[0] || "",
	cookieKey = "_notibar_dismiss_",
	cookieDatum = "Выбрать статью можно щелкнув по самофиксирующейся планке с заголовком текущей страницы.",
	locationOrigin = parseLink(w.location.href).origin,
	isFixedClass = "is-fixed",
	renderMsg = function () {
		var msgObj = d[cE]("a");
		/*jshint -W107 */
		msgObj.href = "javascript:void(0);";
		/*jshint +W107 */
		var handleMsgObj = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			msgObj[rEL]("click", handleMsgObj);
			var uiPanelContentsSelectHeight = uiPanelContentsSelect ? (uiPanelContentsSelect[cL].contains(isFixedClass) ? uiPanelContentsSelect.offsetHeight : uiPanelContentsSelect.offsetHeight) : 0;
			scroll2Top(findPos(uiPanelContentsSelect).top - uiPanelContentsSelectHeight, 2000);
		};
		msgObj[aEL]("click", handleMsgObj);
		msgObj[aC](d.createTextNode(cookieDatum));
		notiBar({
			"message": msgObj,
			"timeout": 5000,
			"key": cookieKey,
			"datum": cookieDatum,
			"days": 0
		});
	};
	if (locationOrigin && uiPanelContentsSelect) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			/* console.log("triggered function: initNotibarMsg"); */
			var timers = new Timers();
			timers.timeout(function () {
				timers.clear();
				timers = null;
				renderMsg();
			}, 3000);
		}
	}
};
document.ready().then(initNotibarMsg);
/*!
 * manage search input
 */
var manageSearchInput = function () {
	"use strict";
	var d = document,
	gEBI = "getElementById",
	aEL = "addEventListener",
	searchInput = d[gEBI]("text") || "",
	handleSearchInputValue = function () {
		var _this = this;
		var logicHandleSearchInputValue = function () {
			_this.value = _this.value.replace(/\\/g, "").replace(/ +(?= )/g, " ").replace(/\/+(?=\/)/g, "/") || "";
		},
		debounceLogicHandleSearchInputValue = debounce(logicHandleSearchInputValue, 200);
		debounceLogicHandleSearchInputValue();
	};
	if (searchInput) {
		/* console.log("triggered function: manageSearchInput"); */
		searchInput.focus();
		searchInput[aEL]("input", handleSearchInputValue);
	}
};
document.ready().then(manageSearchInput);
/*!
 * init Pages Kamil autocomplete
 * @see {@link https://oss6.github.io/kamil/}
 * @see {@link https://github.com/oss6/kamil/wiki/Example-with-label:link-json-and-typo-correct-suggestion}
 */
var initKamilAutocomplete = function (jsonObj) {
	"use strict";
	var w = globalRoot,
	d = document,
	qS = "querySelector",
	gEBI = "getElementById",
	gEBTN = "getElementsByTagName",
	cL = "classList",
	cE = "createElement",
	cTN = "createTextNode",
	aC = "appendChild",
	pN = "parentNode",
	aEL = "addEventListener",
	searchForm = d[qS](".search-form") || "",
	textInputId = "text",
	textInput = d[gEBI](textInputId) || "",
	outsideContainer = d[gEBI]("container") || "",
	typoAutcompleteListSelector = "kamil-typo-autocomplete",
	typoAutcompleteListClass = "kamil-autocomplete",
	generateMenu = function (jsonResponse) {
		if (jsonResponse) {
			var ac = new Kamil("#" + textInputId, {
					source: jsonResponse,
					property: "title",
					minChars: 2
				});
			/*!
			 * create typo suggestion list
			 */
			var typoAutcompleteList = d[cE]("ul"),
			typoListItem = d[cE]("li"),
			handleTypoSuggestions = function () {
				typoAutcompleteList.style.display = "none";
				typoListItem.style.display = "none";
			},
			showTypoSuggestions = function () {
				typoAutcompleteList.style.display = "block";
				typoListItem.style.display = "block";
			};
			typoAutcompleteList[cL].add(typoAutcompleteListClass);
			typoAutcompleteList.id = typoAutcompleteListSelector;
			handleTypoSuggestions();
			typoAutcompleteList[aC](typoListItem);
			textInput[pN].insertBefore(typoAutcompleteList, textInput.nextElementSibling);
			/*!
			 * this is an optional setup of every li
			 * uset to set a description title attribute
			 * comment out the title attribute setup below
			 */
			ac.renderItem = function (ul, item) {
				var li = d[cE]("li");
				/* li.innerHTML = item.title; */
				appendFragment(d[cTN]("" + item.title), li);
				li.title = item.text;
				ul.appendChild(li);
				return li;
			};
			/*!
			 * show suggestions
			 */
			ac.renderMenu = function (ul, items) {
				items = items || "";
				var itemsLength = items.length,
				_this = this,
				/*!
				 * limit output
				 */
				limitKamilOutput = function (e, i) {
					if (i < 10) {
						_this._renderItemData(ul, e, i);
					}
				};
				if (items) {
					for (var i = 0; i < itemsLength; i += 1) {
						limitKamilOutput(items[i], i);
					}
					/* forEach(items, function (e, i) {
						limitKamilOutput(e, i);
					}); */
				}
				/*!
				 * fix typo - non latin characters found
				 */
				var logicReplaceTypo = function () {
					while (itemsLength < 1) {
						var textInputValue = textInput.value || "";
						if (/[^\u0000-\u007f]/.test(textInputValue)) {
							textInputValue = fixEnRuTypo(textInputValue, "ru", "en");
						} else {
							textInputValue = fixEnRuTypo(textInputValue, "en", "ru");
						}
						showTypoSuggestions();
						removeChildren(typoListItem);
						appendFragment(d[cTN]("" + textInputValue), typoListItem);
						if (textInputValue.match(/^\s*$/)) {
							handleTypoSuggestions();
						}
						/*!
						 * hide typo suggestion
						 */
						if (textInput.value.length < 3 || textInput.value.match(/^\s*$/)) {
							handleTypoSuggestions();
						}
						itemsLength += 1;
					}
				},
				debounceLogicReplaceTypo = debounce(logicReplaceTypo, 200);
				debounceLogicReplaceTypo();
				/*!
				 * truncate text
				 */
				var lis = ul ? ul[gEBTN]("li") || "" : "",
				truncateKamilText = function (e) {
					var t = e.firstChild.textContent || "",
					n = d[cTN](truncString(t, 24));
					e.replaceChild(n, e.firstChild);
					/* e.title = "" + t; */
				};
				if (lis) {
					for (var j = 0, m = lis.length; j < m; j += 1) {
						truncateKamilText(lis[j]);
					}
					/* forEach(lis, truncateKamilText); */
				}
			};
			/*!
			 * set text input value from typo suggestion
			 */
			var handleTypoListItem = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				/*!
				 * set focus first, then set text
				 */
				textInput.focus();
				textInput.value = typoListItem.textContent || "";
				handleTypoSuggestions();
			};
			typoListItem[aEL]("click", handleTypoListItem);
			/*!
			 * hide suggestions on outside click
			 */
			if (outsideContainer) {
				outsideContainer[aEL]("click", handleTypoSuggestions);
			}
			/*!
			 * unless you specify property option in new Kamil
			 * use kamil built-in word label as search key in JSON file
			 * [{"link":"/","label":"some text to match"},
			 * {"link":"/pages/contents.html","label":"some text to match"}]
			 */
			ac.on("kamilselect", function (e) {
				var kamilPath = e.item.href || "",
				triggerOnKamilSelect = function () {
					e.inputElement.value = "";
					handleTypoSuggestions();
					w.location.href = kamilPath;
				};
				if (kamilPath) {
					/*!
					 * nwjs wont like setImmediate here
					 */
					/* setImmediate(triggerOnKamilSelect); */
					triggerOnKamilSelect();
				}
			});
		}
	};
	if (searchForm && textInput) {
		/* console.log("triggered function: initKamilAutocomplete"); */
		var kamilJsUrl = "./cdn/kamil/0.1.1/js/kamil.fixed.min.js";
		if (!scriptIsLoaded(kamilJsUrl)) {
			loadJS(kamilJsUrl, generateMenu.bind(null, jsonObj));
		}
	}
};
/*!
 * render navigation templates
 */
var renderNavigation = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	gEBI = "getElementById",
	gEBTN = "getElementsByTagName",
	cL = "classList",
	pN = "parentNode",
	aEL = "addEventListener",
	navbar = d[gEBI]("navbar") || "",
	navbarParent = navbar[pN] || "",
	popularTemplateId = "template_navbar_popular",
	popularTemplate = d[gEBI](popularTemplateId) || "",
	popularRenderId = "render_navbar_popular",
	popularRender = d[gEBI](popularRenderId) || "",
	moreTemplateId = "template_navbar_more",
	moreTemplate = d[gEBI](moreTemplateId) || "",
	moreRenderId = "render_navbar_more",
	moreRender = d[gEBI](moreRenderId) || "",
	carouselTemplateId = "template_b_carousel",
	carouselTemplate = d[gEBI](carouselTemplateId) || "",
	carouselRenderId = "render_b_carousel",
	carouselRender = d[gEBI](carouselRenderId) || "",
	carouselRenderParent = carouselRender[pN] || "",
	showRenderNavbarPopularId = "show_render_navbar_popular",
	showRenderNavbarPopular = d[gEBI](showRenderNavbarPopularId) || "",
	renderNavbarPopularId = "render_navbar_popular",
	renderNavbarPopular = d[gEBI](renderNavbarPopularId) || "",
	showRenderNavbarMoreId = "show_render_navbar_more",
	showRenderNavbarMore = d[gEBI](showRenderNavbarMoreId) || "",
	renderNavbarMoreId = "render_navbar_more",
	renderNavbarMore = d[gEBI](renderNavbarMoreId) || "",
	navigationJsonUrl = "./libs/pwa-englishextra/json/navigation.json",
	isActiveClass = "is-active",
	handleListItems = function (e) {
		var items = e ? e[gEBTN]("li") || "" : "";
		if (items) {
			for (var i = 0, l = items.length; i < l; i += 1) {
				items[i][aEL]("click", handleOtherDropdownLists);
			}
		}
	},
	alignNavbarLists = function () {
		alignToMasterBottomLeft(showRenderNavbarPopularId, renderNavbarPopularId);
		alignToMasterBottomLeft(showRenderNavbarMoreId, renderNavbarMoreId);
	},
	handleShowRenderNavbarPopularButton = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		renderNavbarPopular[cL].toggle(isActiveClass);
		handleOtherDropdownLists(renderNavbarPopular);
	},
	handleShowRenderNavbarMoreButton = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		renderNavbarMore[cL].toggle(isActiveClass);
		handleOtherDropdownLists(renderNavbarMore);
	},
	handleShowNavbarListsWindow = function () {
		var logicHandleShowNavbarListsWindow = alignNavbarLists,
		throttleLogicHandleShowNavbarListsWindow = throttle(logicHandleShowNavbarListsWindow, 100);
		throttleLogicHandleShowNavbarListsWindow();
	};
	if (navbar) {
		var processNavigationJsonResponse = function (navigationJsonResponse) {
			if (popularTemplate && popularRender) {
				insertFromTemplate(navigationJsonResponse, popularTemplateId, popularRenderId, function () {
					if (moreTemplate && moreRender) {
						insertFromTemplate(navigationJsonResponse, moreTemplateId, moreRenderId, function () {
							alignNavbarLists();
							handleListItems(renderNavbarPopular);
							handleListItems(renderNavbarMore);
							showRenderNavbarPopular[aEL]("click", handleShowRenderNavbarPopularButton);
							showRenderNavbarMore[aEL]("click", handleShowRenderNavbarMoreButton);
							w[aEL]("resize", handleShowNavbarListsWindow);
							if (navbarParent) {
								manageExternalLinks(navbarParent);
							}
						}, true);
					}
				}, true);
			}
			if (carouselTemplate && carouselRender) {
				insertFromTemplate(navigationJsonResponse, carouselTemplateId, carouselRenderId, function () {
					var newCarousel = function () {
						return new Carousel({
							"main": ".js-carousel",
							"wrap": ".js-carousel__wrap",
							"prev": ".js-carousel__prev",
							"next": ".js-carousel__next"
						});
					};
					newCarousel();
					if (carouselRenderParent) {
						manageDataSrcImages();
						manageExternalLinks(carouselRenderParent);
					}
				});
			}
		};
		loadUnparsedJSON(navigationJsonUrl, processNavigationJsonResponse);
	}
};
document.ready().then(renderNavigation);
/*!
 * fix panel with contents select on scroll
 */
var fixUiPanelContentsSelect = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	qS = "querySelector",
	cL = "classList",
	aEL = "addEventListener",
	uiPanelNavigation = d[qS](".ui-panel-navigation") || "",
	holderHero = d[qS](".holder-hero") || "",
	criticalHeight = (uiPanelNavigation ? uiPanelNavigation.offsetHeight : 0) + (holderHero ? holderHero.offsetHeight : 0),
	uiPanelContentsSelect = d[qS](".ui-panel-contents-select") || "",
	isFixedClass = "is-fixed",
	handleUiPanelContentsSelect = function () {
		var logicHandleUiPanelContentsSelect = function () {
			if ((d.body.scrollTop || d.documentElement.scrollTop || 0) > criticalHeight) {
				uiPanelContentsSelect[cL].add(isFixedClass);
			} else {
				uiPanelContentsSelect[cL].remove(isFixedClass);
			}
		},
		throttleLogicHandleUiPanelContentsSelect = throttle(logicHandleUiPanelContentsSelect, 100);
		throttleLogicHandleUiPanelContentsSelect();
	};
	if (uiPanelContentsSelect) {
		w[aEL]("scroll", handleUiPanelContentsSelect);
	}
};
document.ready().then(fixUiPanelContentsSelect);
/*!
 * hide other social holders
 * use ev.stopPropagation(); ev.preventDefault();
 * in click event handlers of social openers
 * @param {Object} [_this] node element, if empty will affect everyone
 */
var handleOtherSocialButtons = function (_this) {
	"use strict";
	_this = _this || this;
	var d = document,
	gEBCN = "getElementsByClassName",
	cL = "classList",
	isActiveClass = "is-active",
	isSocialClass = "is-social",
	btn = d[gEBCN](isSocialClass) || "",
	removeActiveClass = function (e) {
		if (_this !== e) {
			e[cL].remove(isActiveClass);
		}
	};
	if (btn) {
		for (var i = 0, l = btn.length; i < l; i += 1) {
			removeActiveClass(btn[i]);
		}
		/* forEach(btn, removeActiveClass); */
	}
},
manageOtherSocialButtons = function () {
	"use strict";
	var d = document,
	gEBI = "getElementById",
	aEL = "addEventListener",
	container = d[gEBI]("container") || "";
	if (container) {
		container[aEL]("click", handleOtherSocialButtons);
	}
};
document.ready().then(manageOtherSocialButtons);
globalRoot.addEventListener("hashchange", handleOtherSocialButtons);
/*!
 * init qr-code
 * @see {@link https://stackoverflow.com/questions/12777622/how-to-use-enquire-js}
 */
var manageLocationQrCodeImage = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	qS = "querySelector",
	cL = "classList",
	aEL = "addEventListener",
	cE = "createElement",
	btn = d[qS](".btn-toggle-holder-location-qr-code") || "",
	holder = d[qS](".holder-location-qr-code") || "",
	isActiveClass = "is-active",
	isSocialClass = "is-social",
	locationHash = w.location.href || "";
	if (btn && holder && locationHash) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			/* console.log("triggered function: manageLocationQrCodeImage"); */
			var generateLocationQrCodeImg = function () {
				var newText = w.location.href || "",
				newImg = d[cE]("img"),
				newTitle = d.title ? ("Ссылка на страницу «" + d.title.replace(/\[[^\]]*?\]/g, "").trim() + "»") : "",
				newSrc = getHTTP(!0) + "://chart.googleapis.com/chart?cht=qr&chld=M%7C4&choe=UTF-8&chs=300x300&chl=" + encodeURIComponent(newText);
				newImg.alt = newTitle;
				var renderNewQrCode = function () {
					if (w.QRCode) {
						if ("undefined" !== typeof earlySvgSupport && "svg" === earlySvgSupport) {
							newSrc = QRCode.generateSVG(newText, {
									ecclevel: "M",
									fillcolor: "#FFFFFF",
									textcolor: "#191919",
									margin: 4,
									modulesize: 8
								});
							var XMLS = new XMLSerializer();
							newSrc = XMLS.serializeToString(newSrc);
							newSrc = "data:image/svg+xml;base64," + w.btoa(unescape(encodeURIComponent(newSrc)));
							newImg.src = newSrc;
						} else {
							newSrc = QRCode.generatePNG(newText, {
									ecclevel: "M",
									format: "html",
									fillcolor: "#FFFFFF",
									textcolor: "#191919",
									margin: 4,
									modulesize: 8
								});
							newImg.src = newSrc;
						}
					} else {
						newImg.src = newSrc;
					}
					newImg[cL].add("qr-code-img");
					newImg.title = newTitle;
					removeChildren(holder);
					appendFragment(newImg, holder);
				},
				qrjs2JsUrl = "./cdn/qrjs2/0.1.3/js/qrjs2.fixed.min.js";
				if (!scriptIsLoaded(qrjs2JsUrl)) {
					loadJS(qrjs2JsUrl, renderNewQrCode);
				} else {
					renderNewQrCode();
				}
			},
			handleLocationQrCodeButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logicHandleLocationQrCodeButton = function () {
					holder[cL].toggle(isActiveClass);
					holder[cL].add(isSocialClass);
					handleOtherSocialButtons(holder);
					generateLocationQrCodeImg();
				},
				debounceLogicHandleLocationQrCodeButton = debounce(logicHandleLocationQrCodeButton, 200);
				debounceLogicHandleLocationQrCodeButton();
			};
			btn[aEL]("click", handleLocationQrCodeButton);
		}
	}
};
document.ready().then(manageLocationQrCodeImage);
/*!
 * init share btn
 */
var manageShareButton = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	cL = "classList",
	aEL = "addEventListener",
	btn = d[qS](".btn-toggle-holder-share-buttons") || "",
	yaShare2 =  d[qS](".ya-share2") || "",
	holder = d[qS](".holder-share-buttons") || "",
	isActiveClass = "is-active",
	isSocialClass = "is-social";
	if (btn && holder && yaShare2) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			/* console.log("triggered function: manageShareButton"); */
			var handleShareButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logicHandleShareButton = function () {
					holder[cL].toggle(isActiveClass);
					holder[cL].add(isSocialClass);
					handleOtherSocialButtons(holder);
					var es5ShimsJsUrl = getHTTP(!0) + "://yastatic.net/es5-shims/0.0.2/es5-shims.min.js",
					shareJsUrl = getHTTP(!0) + "://yastatic.net/share2/share.js";
					if (!scriptIsLoaded(es5ShimsJsUrl)) {
						loadJS(es5ShimsJsUrl, function () {
							if (!scriptIsLoaded(shareJsUrl)) {
								loadJS(shareJsUrl);
							}
						});
					}
				},
				debounceLogicHandleShareButton = debounce(logicHandleShareButton, 200);
				debounceLogicHandleShareButton();
			};
			btn[aEL]("click", handleShareButton);
		}
	}
};
document.ready().then(manageShareButton);
/*!
 * init vk-like btn
 */
var manageVKLikeButton = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	qS = "querySelector",
	gEBI = "getElementById",
	cL = "classList",
	aEL = "addEventListener",
	btn = d[qS](".btn-toggle-holder-vk-like") || "",
	holder = d[qS](".holder-vk-like") || "",
	vkLikeId = "vk-like",
	vkLike = d[gEBI](vkLikeId) || "",
	isActiveClass = "is-active",
	isSocialClass = "is-social";
	if (btn && holder && vkLike) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			/* console.log("triggered function: manageVKLikeButton"); */
			var handleVKLikeButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				var logicHandleVKLikeButton = function () {
					holder[cL].toggle(isActiveClass);
					holder[cL].add(isSocialClass);
					handleOtherSocialButtons(holder);
					var openapiJsUrl = getHTTP(!0) + "://vk.com/js/api/openapi.js?122";
					if (!scriptIsLoaded(openapiJsUrl)) {
						loadJS(openapiJsUrl, function () {
							if (w.VK) {
								VK.init({
									apiId: (vkLike.dataset.apiid || ""),
									nameTransportPath: "/xd_receiver.htm",
									onlyWidgets: !0
								});
								VK.Widgets.Like(vkLikeId, {
									type: "button",
									height: 24
								});
							}
						});
					}
				},
				debounceLogicHandleVKLikeButton = debounce(logicHandleVKLikeButton, 200);
				debounceLogicHandleVKLikeButton();
			};
			btn[aEL]("click", handleVKLikeButton);
		}
	}
};
document.ready().then(manageVKLikeButton);
/*!
 * init col debug btn
 */
var manageDebugGridButton = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	b = d.body || "",
	qS = "querySelector",
	gEBI = "getElementById",
	gEBCN = "getElementsByClassName",
	cL = "classList",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	container = d[gEBI]("container") || "",
	page = d[gEBI]("page") || "",
	btn = d[gEBCN]("btn-toggle-col-debug")[0] || "",
	debugClass = "debug",
	cookieKey = "_manageDebugGridButton_",
	cookieDatum = "ok",
	handleDebugGridContainer = function () {
		if (container) {
			container[cL].remove(debugClass);
			container[rEL]("click", handleDebugGridContainer);
		}
	},
	showDebugGridMessage = function () {
		var col = d[qS](".col") || "",
		elements = [b, page, container, col],
		debugMessage = [],
		renderElementsInfo = function (e) {
			if (e) {
				debugMessage.push((e.className ? "." + e.className : e.id ? "#" + e.id : e.tagName), " ", w.getComputedStyle(e).getPropertyValue("font-size"), " ", w.getComputedStyle(e).getPropertyValue("line-height"), " ", e.offsetWidth, "x", e.offsetHeight, " \u003e ");
			}
		};
		for (var i = 0, l = elements.length; i < l; i += 1) {
			renderElementsInfo(elements[i]);
		}
		/* forEach(elements, renderElementsInfo); */
		debugMessage = debugMessage.join("");
		debugMessage = debugMessage.slice(0, debugMessage.lastIndexOf(" \u003e "));
		notiBar({
			"message": debugMessage,
			"timeout": 5000,
			"key": cookieKey,
			"datum": cookieDatum,
			"days": 0
		});
	};
	if (page && container && btn) {
		/* console.log("triggered function: manageDebugGridButton"); */
		var locationHref = w.location.href || "";
		if (locationHref && parseLink(locationHref).hasHTTP && (/^(localhost|127.0.0.1)/).test(parseLink(locationHref).hostname)) {
			var handleDebugGridButton = function (ev) {
				ev.stopPropagation();
				ev.preventDefault();
				container[cL].toggle(debugClass);
				if (container[cL].contains(debugClass)) {
					container[aEL]("click", handleDebugGridContainer);
					showDebugGridMessage();
				} else {
					container[rEL]("click", handleDebugGridContainer);
				}
			};
			btn[aEL]("click", handleDebugGridButton);
		} else {
			btn.style.display = "none";
		}
	}
};
document.ready().then(manageDebugGridButton);
/*!
 * process routes, render contents select
 */
var processPoutes = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	qS = "querySelector",
	gEBI = "getElementById",
	gEBTN = "getElementsByTagName",
	gEBCN = "getElementsByClassName",
	aC = "appendChild",
	cDF = "createDocumentFragment",
	cE = "createElement",
	cTN = "createTextNode",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	aEL = "addEventListener",
	cL = "classList",
	pN = "parentNode",
	appContentId = "app-content",
	appContent = d[gEBI](appContentId) || "",
	appContentParent = appContent[pN] || "",
	contentsTemplate = d[gEBI]("template_contents_select") || "",
	contentsRender = d[gEBI]("render_contents_select") || "",
	contentsSelect = d[qS](".contents-select") || "",
	holderContentsSelect = d[qS](".holder-contents-select") || "",
	contentsListClass = "contents-list",
	contentsListSelector = "." + contentsListClass,
	searchTextInput = d[gEBI]("text") || "",
	asideTemplateId = "template_aside",
	asideRenderId = "render_aside",
	commentsTemplateId = "template_comments",
	commentsRenderId = "render_comments",
	nextHrefTemplateId = "template_bottom_navigation",
	nextHrefRenderId = "render_bottom_navigation",
	contentsTemplateId = "template_contents_grid",
	contentsRenderId = "render_contents_grid",
	masonryGridClass = "masonry-grid",
	isActiveClass = "is-active",
	isDropdownClass = "is-dropdown",
	routesJsonUrl = "./libs/pwa-englishextra/json/routes.json";
	if (appContent) {
		var contentsListButtonDefaultText = contentsSelect ? (contentsSelect.options[0].firstChild.textContent || "") : "",
		insertChevronDownSmallSvg = function (targetObj) {
			var svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
			use = d[cENS]("http://www.w3.org/2000/svg", "use");
			svg[cL].add("ui-icon");
			use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-ChevronDownSmall");
			svg[aC](use);
			targetObj[aC](svg);
		},
		processRoutesJsonResponse = function (routesJsonResponse) {
			var routesParsedJson = JSON.parse(routesJsonResponse),
			renderMasonry,
			renderComments,
			triggerOnContentInserted = function (titleString, nextHrefString, asideObj, routesObj) {
				/* var h1 = contentsSelect || d[gEBI]("h1") || "",
				h1Pos = findPos(h1).top || 0;
				if (h1) {
					scroll2Top(h1Pos, 20000);
				} else {
					scroll2Top(0, 20000);
				} */
				scroll2Top(0, 20000);
				/* if (titleString) { */
					d.title = (titleString ? titleString +  " - "  : "" ) + (initialDocumentTitle ? initialDocumentTitle + userBrowsingDetails : "");
				/* } */
				var locationHash = w.location.hash || "";
				if (contentsSelect) {
					var optionMatched = false;
					for (var i = 0, l = contentsSelect.options.length; i < l; i += 1) {
						if (locationHash === contentsSelect.options[i].value) {
							optionMatched = true;
							contentsSelect.selectedIndex = i;
							break;
						}
					}
					/* for (var key in contentsSelect.options) {
						if (contentsSelect.options.hasOwnProperty(key)) {
							if (locationHash === contentsSelect.options[key].value) {
								optionMatched = true;
								contentsSelect.selectedIndex = key;
								break;
							}
						}
					} */
					if (!optionMatched) {
						contentsSelect.selectedIndex = 0;
					}
				}
				var contentsList = d[qS](contentsListSelector) || "";
				if (contentsList) {
					var contentsListButton = holderContentsSelect ? holderContentsSelect[gEBTN]("a")[0] || "" : "";
					if (contentsListButton) {
						var itemMatched = false,
						contentsListItems = contentsList ? contentsList[gEBTN]("li") || "" : "";
						for (var j = 0, m = contentsListItems.length; j < m; j += 1) {
							if (locationHash === contentsListItems[j].dataset.href) {
								itemMatched = true;
								contentsListButton.replaceChild(d[cTN](contentsListItems[j].firstChild.textContent), contentsListButton.firstChild);
								break;
							}
						}
						/* for (var key2 in contentsListItems) {
							if (contentsListItems.hasOwnProperty(key2)) {
								if (locationHash === contentsListItems[key2].dataset.href) {
									itemMatched = true;
									contentsListButton.replaceChild(d[cTN](contentsListItems[key2].firstChild.textContent), contentsListButton.firstChild);
									break;
								}
							}
						} */
						if (!itemMatched) {
							contentsListButton.replaceChild(d[cTN](contentsListButtonDefaultText), contentsListButton.firstChild);
						}
					}
				}
				if (asideObj) {
					var asideTemplate = d[gEBI](asideTemplateId) || "",
					asideRender = d[gEBI](asideRenderId) || "",
					asideRenderParent = asideRender[pN] || "";
					if (asideTemplate && asideRender) {
						insertFromTemplate(asideObj, asideTemplateId, asideRenderId, function () {
							if (asideRenderParent) {
								manageDataSrcImages();
								manageExternalLinks(asideRenderParent);
							}
						});
					}
				}
				if (nextHrefString) {
					var nextHrefTemplate = d[gEBI](nextHrefTemplateId) || "",
					nextHrefRender = d[gEBI](nextHrefRenderId) || "";
					if (nextHrefTemplate && nextHrefRender) {
						insertFromTemplate({
							"next_href": nextHrefString
						}, nextHrefTemplateId, nextHrefRenderId);
					}
				}
				var commentsTemplate = d[gEBI](commentsTemplateId) || "",
				commentsRender = d[gEBI](commentsRenderId) || "",
				commentsRenderParent = commentsRender[pN] || "";
				if (commentsTemplate && commentsRender) {
					if (!renderComments) {
						renderComments = renderTemplate({}, commentsTemplateId, commentsRenderId);
					}
					insertTextAsFragment(renderComments, commentsRender, function () {
						if (commentsRenderParent) {
							manageDisqusButton(commentsRenderParent);
						}
					});
				}
				var masonryGrid = d[gEBCN](masonryGridClass)[0] || "",
				masonryGridParent = masonryGrid[pN] || "";
				if (masonryGrid && masonryGridParent) {
					var contentsTemplate = d[gEBI](contentsTemplateId) || "",
					contentsRender = d[gEBI](contentsRenderId) || "",
					contentsRenderParent = contentsRender[pN] || "";
					if (contentsTemplate && contentsRender) {
						if (!renderMasonry) {
							if (routesObj) {
								renderMasonry = renderTemplate(routesObj, contentsTemplateId, contentsRenderId);
							}
						}
						insertTextAsFragment(renderMasonry, contentsRender, function () {
							if (contentsRenderParent) {
								manageDataSrcImages();
								initMasonry(contentsRenderParent);
								manageExternalLinks(contentsRenderParent);
							}
						});
					} else {
						initMasonry(masonryGridParent);
					}
				}
				/*!
				 * cache parent node beforehand
				 * put when templates rendered
				 */
				if (appContentParent) {
					manageDataSrcImages();
					manageDataSrcIframes();
					manageExternalLinks(appContentParent);
					manageImgLightboxLinks(appContentParent);
					manageIframeLightboxLinks(appContentParent);
					manageChaptersSelect(appContentParent);
					manageExpandingLayers(appContentParent);
				}
				LoadingSpinner.hide();
			};
			if (routesParsedJson) {
				initKamilAutocomplete(routesParsedJson.hashes);
				var handleRoutesWindow = function () {
					if (searchTextInput) {
						searchTextInput.blur();
					}
					var locationHash = w.location.hash || "";
					if (locationHash) {
						var isNotfound = false;
						for (var i = 0, l = routesParsedJson.hashes.length; i < l; i += 1) {
							if (locationHash === routesParsedJson.hashes[i].href) {
								isNotfound = true;
								LoadingSpinner.show();
								insertExternalHTML(appContentId, routesParsedJson.hashes[i].url, triggerOnContentInserted.bind(null, routesParsedJson.hashes[i].title, routesParsedJson.hashes[i].next_href, routesParsedJson.hashes[i].aside, routesParsedJson));
								break;
							}
						}
						/* for (var key in routesParsedJson.hashes) {
							if (routesParsedJson.hashes.hasOwnProperty(key)) {
								if (locationHash === routesParsedJson.hashes[key].href) {
									isNotfound = true;
									LoadingSpinner.show();
									insertExternalHTML(appContentId, routesParsedJson.hashes[key].url, triggerOnContentInserted.bind(null, routesParsedJson.hashes[key].title, routesParsedJson.hashes[key].next_href, routesParsedJson.hashes[key].aside, routesParsedJson));
									break;
								}
							}
						} */
						if (false === isNotfound) {
							var notfoundUrl = routesParsedJson.notfound.url,
							notfoundText = routesParsedJson.notfound.title;
							if (notfoundUrl/*  && notfoundText */) {
								LoadingSpinner.show();
								insertExternalHTML(appContentId, notfoundUrl, triggerOnContentInserted.bind(null, notfoundText));
							}
						}
					} else {
						var homeUrl = routesParsedJson.home.url,
						homeText = routesParsedJson.home.title;
						if (homeUrl/*  && homeText */) {
							LoadingSpinner.show();
							insertExternalHTML(appContentId, homeUrl, triggerOnContentInserted.bind(null, homeText));
						}
					}
				};
				handleRoutesWindow();
				w[aEL]("hashchange", handleRoutesWindow);
				if (contentsTemplate && contentsRender) {
					/*!
					 * insertFromTemplate used in renderTemplate
					 * will remove event listener from select (parent) element,
					 * because it uses fragment method and not inner html
					 * (UPD now you can set last arg as true, and the event listener will work),
					 * so you will have to use inner html method
					 * alternative way to generate select options
					 * with document fragment
					 */
					/* contentsHtml = contentsTemplate[iH] || "",
					renderContentsTemplate = new t(contentsHtml);
					var contentsRendered = renderContentsTemplate.render(routesParsedJson);
					contentsRender[iH] = contentsRendered; */
					var rerenderContentsSelect = function () {
						var handleContentsSelect = function (_this) {
							_this = _this ? _this.target || "" : "";
							var _hash = _this.options[_this.selectedIndex].value || "";
							if (_hash) {
								var tragetObject = isValidId(_hash, true) ? d[gEBI](_hash.replace(/^#/, "")) || "" : "";
								if (tragetObject) {
									scroll2Top(findPos(tragetObject).top, 10000);
								} else {
									w.location.hash = _hash;
								}
							}
						},
						df = d[cDF](),
						generateContentsOptions = function (e) {
							if (e.title) {
								var contentsOption = d[cE]("option");
								contentsOption.value = e.href;
								var contentsOptionText = e.title;
								contentsOption.title = contentsOptionText;
								var contentsOptionTextTruncated = truncString("" + contentsOptionText, 44);
								contentsOption[aC](d.createTextNode(contentsOptionTextTruncated));
								df[aC](contentsOption);
								df[aC](d.createTextNode("\n"));
							}
						};
						for (var i = 0, l = routesParsedJson.hashes.length; i < l; i += 1) {
							generateContentsOptions(routesParsedJson.hashes[i]);
						}
						/* forEach(routesParsedJson.hashes, generateContentsOptions); */
						appendFragment(df, contentsRender);
						contentsSelect[aEL]("change", handleContentsSelect);
					};
					var rerenderContentsList = function () {
						var handleContentsListItem = function (listObj, _hash) {
							if (_hash) {
								var tragetObject = isValidId(_hash, true) ? d[gEBI](_hash.replace(/^#/, "")) || "" : "";
								if (tragetObject) {
									scroll2Top(findPos(tragetObject).top, 10000);
								} else {
									w.location.hash = _hash;
								}
							}
							listObj[cL].remove(isActiveClass);
						},
						contentsList = d[cE]("ul"),
						contentsListButtonText = contentsSelect.options[0].textContent || "",
						df = d[cDF](),
						generateContentsListItems = function (e) {
							if (e.title) {
								var contentsListItem = d[cE]("li"),
								contentsListItemHref = e.href,
								contentsListItemText = e.title;
								contentsListItem.title = contentsListItemText;
								contentsListItem.dataset.href = contentsListItemHref;
								var contentsListItemTextTruncated = truncString("" + contentsListItemText, 44);
								contentsListItem[aC](d.createTextNode(contentsListItemTextTruncated));
								contentsListItem[aEL]("click", handleContentsListItem.bind(null, contentsList, contentsListItemHref));
								df[aC](contentsListItem);
								df[aC](d.createTextNode("\n"));
							}
						};
						for (var j = 0, m = routesParsedJson.hashes.length; j < m; j += 1) {
							generateContentsListItems(routesParsedJson.hashes[j]);
						}
						/* forEach(routesParsedJson.hashes, generateContentsListItems); */
						appendFragment(df, contentsList);
						contentsList[cL].add(contentsListClass);
						contentsList[cL].add(isDropdownClass);
						holderContentsSelect.replaceChild(contentsList, contentsSelect[pN][pN]);
						var contentsListButton = d[cE]("a");
						contentsListButton[aC](d[cTN](contentsListButtonText));
						contentsList[pN].insertBefore(contentsListButton, contentsList);
						/*jshint -W107 */
						contentsListButton.href = "javascript:void(0);";
						/*jshint +W107 */
						insertChevronDownSmallSvg(contentsListButton);
						var handleContentsListItemsButton = function (ev) {
							ev.stopPropagation();
							ev.preventDefault();
							contentsList[cL].toggle(isActiveClass);
							handleOtherDropdownLists(contentsList);
						};
						contentsListButton[aEL]("click", handleContentsListItemsButton);
					};
					if (holderContentsSelect && contentsSelect) {
						/* rerenderContentsSelect(); */
						rerenderContentsList();
					}
				}
			}
		};
		loadUnparsedJSON(routesJsonUrl, processRoutesJsonResponse);
	}
};
document.ready().then(processPoutes);
/*!
 * observe mutations
 * bind functions only for inserted DOM
 * @param {String} ctx HTML Element class or id string
 */
/* var observeMutations = function (ctx) {
	"use strict";
	ctx = ctx && ctx.nodeName ? ctx : "";
	if (ctx) {
		var getMutations = function (e) {
			var triggerOnMutation = function (m) {
				console.log("mutations observer: " + m.type);
				console.log(m.type, "target: " + m.target.tagName + ("." + m.target.className || "#" + m.target.id || ""));
				console.log(m.type, "added: " + m.addedNodes.length + " nodes");
				console.log(m.type, "removed: " + m.removedNodes.length + " nodes");
				if ("childList" === m.type || "subtree" === m.type) {
					mo.disconnect();
				}
			};
			for (var i = 0, l = e.length; i < l; i += 1) {
				triggerOnMutation(e[i]);
			}
			forEach(e, triggerOnMutation);
		},
		mo = new MutationObserver(getMutations);
		mo.observe(ctx, {
			childList: !0,
			subtree: !0,
			attributes: !1,
			characterData: !1
		});
	}
}; */
/*!
 * apply changes to inserted DOM
 * because replace child is used in the first place
 * to insert new content, and if parent node doesnt exist
 * inner html method is applied,
 * the parent node should be observed, not the target
 * node for the insertion
 */
/* var updateInsertedDom = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	gEBI = "getElementById",
	pN = "parentNode",
	ctx = d[gEBI]("app-content")[pN] || "",
	locationHash = w.location.hash || "";
	if (ctx && locationHash) {
		console.log("triggered function: updateInsertedDom");
		observeMutations(ctx);
	}
};
globalRoot.addEventListener("hashchange", updateInsertedDom); */
/*!
 * init ui-totop
 */
var initUiTotop = function () {
	"use strict";
	var w = globalRoot,
	d = document,
	h = d.documentElement || "",
	b = d.body || "",
	qS = "querySelector",
	cL = "classList",
	cE = "createElement",
	aC = "appendChild",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	aEL = "addEventListener",
	btnClass = "ui-totop",
	btnTitle = "Наверх",
	isActiveClass = "is-active",
	handleUiTotopWindow = function (_this) {
		var logicHandleUiTotopWindow = function () {
			var btn = d[qS]("." + btnClass) || "",
			scrollPosition = _this.pageYOffset || h.scrollTop || b.scrollTop || "",
			windowHeight = _this.innerHeight || h.clientHeight || b.clientHeight || "";
			if (scrollPosition && windowHeight && btn) {
				if (scrollPosition > windowHeight) {
					btn[cL].add(isActiveClass);
				} else {
					btn[cL].remove(isActiveClass);
				}
			}
		},
		throttleLogicHandleUiTotopWindow = throttle(logicHandleUiTotopWindow, 100);
		throttleLogicHandleUiTotopWindow();
	},
	renderUiTotop = function () {
		var handleUiTotopAnchor = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			scroll2Top(0, 20000);
		},
		insertUpSvg = function (targetObj) {
			var svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
			use = d[cENS]("http://www.w3.org/2000/svg", "use");
			svg[cL].add("ui-icon");
			use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-Up");
			svg[aC](use);
			targetObj[aC](svg);
		},
		anchor = d[cE]("a");
		anchor[cL].add(btnClass);
		/*jshint -W107 */
		anchor.href = "javascript:void(0);";
		/*jshint +W107 */
		anchor.title = btnTitle;
		anchor[aEL]("click", handleUiTotopAnchor);
		insertUpSvg(anchor);
		b[aC](anchor);
		w[aEL]("scroll", handleUiTotopWindow);
	};
	if (b) {
		/* console.log("triggered function: initUiTotop"); */
		renderUiTotop();
	}
};
document.ready().then(initUiTotop);
/*!
 * init manUP.js
 */
var loadInitManUp = function () {
	"use strict";
	var manUpJsUrl = "/cdn/ManUp.js/0.7/js/manup.fixed.min.js",
	initManUp = function () {
		/* console.log("triggered function: initManUp"); */
	};
	if ("undefined" !== typeof getHTTP && getHTTP()) {
		if (!scriptIsLoaded(manUpJsUrl)) {
			loadJS(manUpJsUrl, initManUp);
		} else {
			initManUp();
		}
	}
};
document.ready().then(loadInitManUp);
/*!
 * show page, finish ToProgress
 */
var showPageFinishProgress = function () {
	"use strict";
	var d = document,
	gEBI = "getElementById",
	page = d[gEBI]("page") || "",
	rerenderPage = function () {
		page.style.opacity = 1;
		/* progressBar.complete(); */
	},
	triggerOnImagesLoaded = function () {
		var timers = new Timers();
		timers.interval(function () {
			/* console.log("function showPageFinishProgress => started Interval"); */
			if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
				timers.clear();
				timers = null;
				/* console.log("function showPageFinishProgress; imagesPreloaded=" + imagesPreloaded); */
				rerenderPage();
			}
		}, 100);
	};
	if (page) {
		/* console.log("triggered function: showPageFinishProgress"); */
		if ("undefined" !== typeof imagesPreloaded) {
			triggerOnImagesLoaded();
		} else {
			rerenderPage();
		}
	}
};
document.ready().then(showPageFinishProgress);
