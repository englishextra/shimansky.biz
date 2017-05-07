/*!
 * t.js
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
 * source: github.com/loele/t.js/blob/2b3ab7039353cc365fb3463f6df08fd00eb3eb3d/t.js
 * passes jshint
 */
(function(){var blockregex=/\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,valregex=/\{\{([=%])(.+?)\}\}/g;function t(template){this.t=template;}function scrub(val){return new Option(val).text.replace(/"/g,"&quot;");}function get_value(vars,key){var parts=key.split('.');while(parts.length){if(!(parts[0]in vars)){return false;}vars=vars[parts.shift()];}return vars;}function render(fragment,vars){return fragment.replace(blockregex,function(_,__,meta,key,inner,if_true,has_else,if_false){var val=get_value(vars,key),temp="",i;if(!val){if(meta=='!'){return render(inner,vars);}if(has_else){return render(if_false,vars);}return"";}if(!meta){return render(if_true,vars);}if(meta=='@'){_=vars._key;__=vars._val;for(i in val){if(val.hasOwnProperty(i)){vars._key=i;vars._val=val[i];temp+=render(inner,vars);}}vars._key=_;vars._val=__;return temp;}}).replace(valregex,function(_,meta,key){var val=get_value(vars,key);if(val||val===0){return meta=='%'?scrub(val):val;}return"";});}t.prototype.render=function(vars){return render(this.t,vars);};("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).t=t;})();
/*!
 * modified verge 1.9.1+201402130803
 * github.com/ryanve/verge
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
 * github.com/ryanve/verge/issues/19
 * source: github.com/ryanve/verge/blob/master/verge.js
 * passes jshint
 */
(function(root,name,make){root[name]=make();}("undefined"!==typeof window?window:this,"verge",function(){var xports={},win=typeof window!="undefined"&&window,doc=typeof document!="undefined"&&document,docElem=doc&&doc.documentElement,matchMedia=win.matchMedia||win.msMatchMedia,mq=matchMedia?function(q){return!!matchMedia.call(win,q).matches;}:function(){return false;},viewportW=xports.viewportW=function(){var a=docElem.clientWidth,b=win.innerWidth;return a<b?b:a;},viewportH=xports.viewportH=function(){var a=docElem.clientHeight,b=win.innerHeight;return a<b?b:a;};xports.mq=mq;xports.matchMedia=matchMedia?function(){return matchMedia.apply(win,arguments);}:function(){return{};};function viewport(){return{"width":viewportW(),"height":viewportH()};}xports.viewport=viewport;xports.scrollX=function(){return win.pageXOffset||docElem.scrollLeft;};xports.scrollY=function(){return win.pageYOffset||docElem.scrollTop;};function calibrate(coords,cushion){var o={};cushion=+cushion||0;o.width=(o.right=coords.right+cushion)-(o.left=coords.left-cushion);o.height=(o.bottom=coords.bottom+cushion)-(o.top=coords.top-cushion);return o;}function rectangle(el,cushion){el=el&&!el.nodeType?el[0]:el;if(!el||1!==el.nodeType)return false;return calibrate(el.getBoundingClientRect(),cushion);}xports.rectangle=rectangle;function aspect(o){o=null===o?viewport():1===o.nodeType?rectangle(o):o;var h=o.height,w=o.width;h=typeof h=="function"?h.call(o):h;w=typeof w=="function"?w.call(o):w;return w/h;}xports.aspect=aspect;xports.inX=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.right>=0&&r.left<=viewportW()&&(0!==el.offsetHeight);};xports.inY=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.bottom>=0&&r.top<=viewportH()&&(0!==el.offsetHeight);};xports.inViewport=function(el,cushion){var r=rectangle(el,cushion);return!!r&&r.bottom>=0&&r.right>=0&&r.top<=viewportH()&&r.left<=viewportW()&&(0!==el.offsetHeight);};return xports;}));
/*!
 * modified navbar.js - Minimal navigation script
 * by dnp_theme
 * Licensed under MIT-License
 * @see {@link https://gist.github.com/englishextra/76206ce67897113f5520e31a766fc5ce}
 * @see {@link https://github.com/thednp/navbar.js/blob/master/navbar.js}
 * passes jshint
 */
(function(){"use strict";var w=window,d=document,qS="querySelector",gEBTN="getElementsByTagName",aEL="addEventListener",cL="classList",rootStyle=d.documentElement.style||"",supportTransitions=function(){return"WebkitTransition"in rootStyle||"transition"in rootStyle||"OTransition"in rootStyle||"MsTransition"in rootStyle||"MozTransition"in rootStyle?!0:!1;}(),on=function(element,eventName,handler){element[aEL](eventName,handler,false);},openClass="is-open",isPositioned="is-repositioned",close=function(element){if(element[cL].contains(openClass)){element[cL].remove(openClass);setTimeout(function(){element[cL].remove(isPositioned);},(supportTransitions?200:0));}},Navbar=function(el,outsideClass){var menu=(typeof el==="object")?el:d[qS](el);if(menu){var items=menu[gEBTN]("li")||"";if(items){var enterHandler=function(){var that=this;clearTimeout(that.timer);if(!that[cL].contains(openClass)){that.timer=setTimeout(function(){that[cL].add(openClass);that[cL].add(isPositioned);var siblings=that.parentNode[gEBTN]("li");for(var h=0;h<siblings.length;h++){if(siblings[h]!==that){close(siblings[h]);}}},100);}},closeHandler=function(){for(var i=0,itemsLength=items.length;i<itemsLength;i++){if(items[i][gEBTN]("ul").length){close(items[i]);}}};for(var i=0,itemsLength=items.length;i<itemsLength;i++){if(items[i][gEBTN]("ul").length){on(items[i],"click",enterHandler);}}w[aEL]("hashchange",closeHandler);var outside=d[qS](outsideClass)||"";if(outside){outside[aEL]("click",closeHandler);}}}};("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).Navbar=Navbar;}());
/*!
 * Carousel v1.0
 * @see {@link https://habrahabr.ru/post/327246/}
 * @see {@link https://codepen.io/iGetPass/pen/apZPMo}
 */
(function(){"use strict";var d=document,qS="querySelector",aEL="addEventListener";var Carousel=function(setting){var _this=this;if(d[qS](setting.wrap)===null){console.error("Carousel not fount selector "+setting.wrap);return;}var privates={};this.prev_slide=function(){--privates.opt.position;if(privates.opt.position<0){privates.opt.position=privates.opt.max_position-1;}privates.sel.wrap.style.transform="translateX(-"+privates.opt.position+"00%)";};this.next_slide=function(){++privates.opt.position;if(privates.opt.position>=privates.opt.max_position){privates.opt.position=0;}privates.sel.wrap.style.transform="translateX(-"+privates.opt.position+"00%)";};privates.setting=setting;privates.sel={"main":d[qS](privates.setting.main),"wrap":d[qS](privates.setting.wrap),"children":d[qS](privates.setting.wrap).children,"prev":d[qS](privates.setting.prev),"next":d[qS](privates.setting.next)};privates.opt={"position":0,"max_position":d[qS](privates.setting.wrap).children.length};if(privates.sel.prev!==null){privates.sel.prev[aEL]("click",function(){_this.prev_slide();});}if(privates.sel.next!==null){privates.sel.next[aEL]("click",function(){_this.next_slide();});}};("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).Carousel=Carousel;}());
/*!
 * modified scrollToY
 * @see {@link http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation}
 * passes jshint
 */
(function(){"use strict";var scroll2Top=function(scrollTargetY,speed,easing){var scrollY=window.scrollY||document.documentElement.scrollTop;scrollTargetY=scrollTargetY||0;speed=speed||2000;easing=easing||'easeOutSine';var currentTime=0;var time=Math.max(0.1,Math.min(Math.abs(scrollY-scrollTargetY)/speed,0.8));var easingEquations={easeOutSine:function(pos){return Math.sin(pos*(Math.PI/2));},easeInOutSine:function(pos){return(-0.5*(Math.cos(Math.PI*pos)-1));},easeInOutQuint:function(pos){if((pos/=0.5)<1){return 0.5*Math.pow(pos,5);}return 0.5*(Math.pow((pos-2),5)+2);}};function tick(){currentTime+=1/60;var p=currentTime/time;var t=easingEquations[easing](p);if(p<1){requestAnimationFrame(tick);window.scrollTo(0,scrollY+((scrollTargetY-scrollY)*t));}else{console.log('scroll done');window.scrollTo(0,scrollTargetY);}}tick();};("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).scroll2Top=scroll2Top;}());
/*!
 * return image is loaded promise
 * jsfiddle.net/englishextra/56pavv7d/
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
(function(){"use strict";var imagePromise=function(s){if(window.Promise){return new Promise(function(y,n){var f=function(e,p){e.onload=function(){y(p);};e.onerror=function(){n(p);};e.src=p;};if("string"===typeof s){var a=new Image();f(a,s);}else{if("IMG"!==s.tagName){return Promise.reject();}else{if(s.src){f(s,s.src);}}}});}else{throw new Error("Promise is not in window");}};("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).imagePromise=imagePromise;}());
/*!
 * modified JavaScript Cookie - v2.1.3
 * github.com/js-cookie/js-cookie
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
 * source: github.com/js-cookie/js-cookie/blob/master/src/js.cookie.js
 * passes jshint
 */
(function(){"use strict";var Cookies=function(){function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){if(attributes.hasOwnProperty(key)){result[key]=attributes[key];}}}return result;}function init(converter){var api=function(key,value,attributes){var _this=this;var result;if(typeof document==='undefined'){return;}if(arguments.length>1){attributes=extend({path:'/'},api.defaults,attributes);if(typeof attributes.expires==='number'){var expires=new Date();expires.setMilliseconds(expires.getMilliseconds()+attributes.expires*864e+5);attributes.expires=expires;}try{result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result;}}catch(e){}if(!converter.write){value=encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);}else{value=converter.write(value,key);}key=encodeURIComponent(String(key));key=key.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent);key=key.replace(/[\(\)]/g,escape);var ret=(document.cookie=[key,'=',value,attributes.expires?'; expires='+attributes.expires.toUTCString():'',attributes.path?'; path='+attributes.path:'',attributes.domain?'; domain='+attributes.domain:'',attributes.secure?'; secure':''].join(''));return ret;}if(!key){result={};}var cookies=document.cookie?document.cookie.split('; '):[];var rdecode=/(%[0-9A-Z]{2})+/g;var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split('=');var cookie=parts.slice(1).join('=');if(cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1);}try{var name=parts[0].replace(rdecode,decodeURIComponent);cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent);if(_this.json){try{cookie=JSON.parse(cookie);}catch(e){}}if(key===name){result=cookie;break;}if(!key){result[name]=cookie;}}catch(e){}}return result;};api.set=api;api.get=function(key){return api.call(api,key);};api.getJSON=function(){return api.apply({json:true},[].slice.call(arguments));};api.defaults={};api.remove=function(key,attributes){api(key,'',extend(attributes,{expires:-1}));};api.withConverter=init;return api;}return init(function(){});}();("object"===typeof window&&window||"object"===typeof self&&self||"object"===typeof global&&global||{}).Cookies=Cookies;}());
/*!
 * A simple promise-compatible "document ready" event handler with a few extra treats.
 * With browserify/webpack:
 * const ready = require('document-ready-promise')
 * ready().then(function(){})
 * If in a non-commonjs environment, just include the script. It will attach document.ready for you.
 * document.ready().then(function() {})
 * The document.ready promise will preserve any values that you may be passing through the promise chain.
 * Using ES2015 and window.fetch
 * fetch(new Request('kitten.jpg'))
 * .then(response => response.blob())
 * .then(document.ready)
 * .then(blob => document.querySelector('img').src = URL.createObjectURL(blob))
 * @see {@link https://github.com/michealparks/document-ready-promise}
 * @see {@link https://github.com/michealparks/document-ready-promise/blob/master/document-ready-promise.js}
 * passes jshint
 */
(function(document,promise){if(typeof module!=="undefined")module.exports=promise;else document.ready=promise;})(window.document,function(chainVal){"use strict";var d=document,w=window,loaded=/^loaded|^i|^c/.test(d.readyState),DOMContentLoaded="DOMContentLoaded",load="load";return new Promise(function(resolve){if(loaded)return resolve(chainVal);function onReady(){resolve(chainVal);d.removeEventListener(DOMContentLoaded,onReady);w.removeEventListener(load,onReady);}d.addEventListener(DOMContentLoaded,onReady);w.addEventListener(load,onReady);});});
/*!
 * Behaves the same as setTimeout except uses requestAnimationFrame()
 * where possible for better performance
 * modified gist.github.com/joelambert/1002116
 * the fallback function requestAnimFrame is incorporated
 * gist.github.com/joelambert/1002116
 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
 * jsfiddle.net/englishextra/dnyomc4j/
 * @param {Object} fn The callback function
 * @param {Int} delay The delay in milliseconds
 * requestTimeout(fn,delay)
 */
var requestTimeout=function(fn,delay){var requestAnimFrame=(function(){return window.requestAnimationFrame||function(callback,element){window.setTimeout(callback,1000/60);};})(),start=new Date().getTime(),handle={};function loop(){var current=new Date().getTime(),delta=current-start;if(delta>=delay){fn.call();}else{handle.value=requestAnimFrame(loop);}}handle.value=requestAnimFrame(loop);return handle;};
/*!
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame()
 * where possible for better performance
 * gist.github.com/joelambert/1002116
 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
 * jsfiddle.net/englishextra/dnyomc4j/
 * @param {Int|Object} handle The callback function
 * clearRequestTimeout(handle)
 */
var clearRequestTimeout=function(handle){if(window.cancelAnimationFrame){window.cancelAnimationFrame(handle.value);}else{window.clearTimeout(handle);}};
/*!
 * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
 * modified gist.github.com/joelambert/1002116
 * the fallback function requestAnimFrame is incorporated
 * gist.github.com/joelambert/1002116
 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
 * jsfiddle.net/englishextra/sxrzktkz/
 * @param {Object} fn The callback function
 * @param {Int} delay The delay in milliseconds
 * requestInterval(fn, delay);
 */
var requestInterval=function(fn,delay){var requestAnimFrame=(function(){return window.requestAnimationFrame||function(callback,element){window.setTimeout(callback,1000/60);};})(),start=new Date().getTime(),handle={};function loop(){handle.value=requestAnimFrame(loop);var current=new Date().getTime(),delta=current-start;if(delta>=delay){fn.call();start=new Date().getTime();}}handle.value=requestAnimFrame(loop);return handle;};
/*!
 * Behaves the same as clearInterval except uses cancelRequestAnimationFrame()
 * where possible for better performance
 * gist.github.com/joelambert/1002116
 * gist.github.com/englishextra/873c8f78bfda7cafc905f48a963df07b
 * jsfiddle.net/englishextra/sxrzktkz/
 * @param {Int|Object} handle function handle, or function
 * clearRequestInterval(handle);
 */
var clearRequestInterval=function(handle){if(window.cancelAnimationFrame){window.cancelAnimationFrame(handle.value);}else{window.clearInterval(handle);}};
/*!
 * How can I check if a JS file has been included already?
 * gist.github.com/englishextra/403a0ca44fc5f495400ed0e20bc51d47
 * stackoverflow.com/questions/18155347/how-can-i-check-if-a-js-file-has-been-included-already
 * @param {String} s path string
 * scriptIsLoaded(s)
 */
var scriptIsLoaded=function(s){for(var b=document.getElementsByTagName("script")||"",a=0;a<b.length;a++)if(b[a].getAttribute("src")==s)return!0;return!1;};
/*!
 * parse JSON without try / catch
 * @param {String} a JSON string
 * @see {@link http://stackoverflow.com/questions/11182924/how-to-check-if-javascript-object-is-json}
 * safelyParseJSON(a)
 */
var safelyParseJSON=function(a){var isJson=function(obj){var t=typeof obj;return['boolean','number','string','symbol','function'].indexOf(t)==-1;};if(!isJson(a)){return JSON.parse(a);}else{return a;}};
/*!
 * return an array of values that match on a certain key
 * techslides.com/how-to-parse-and-search-json-in-javascript
 * gist.github.com/englishextra/872269c30d7cb2d10e3c3babdefc37b4
 * var jpr = JSON.parse(response);
 * for(var i=0,l=jpr.length;i<l;i+=1)
 * {var t=getKeyValuesFromJSON(jpr[i],"label"),
 * p=getKeyValuesFromJSON(jpr[i],"link");};
 * @param {String} b JSON entry
 * @param {String} d JSON key to match
 * getKeyValuesFromJSON(b,d)
 */
var getKeyValuesFromJSON=function(b,d){var c=[];for(var a in b){if(b.hasOwnProperty(a)){if("object"===typeof b[a]){c=c.concat(getKeyValuesFromJSON(b[a],d));}else{if(a==d){c.push(b[a]);}}}}return c;};
/*!
 * loop over the Array
 * stackoverflow.com/questions/18238173/javascript-loop-through-json-array
 * gist.github.com/englishextra/b4939b3430da4b55d731201460d3decb
 * @param {String} str any text string
 * @param {Int} max a whole positive number
 * @param {String} add any text string
 * truncString(str,max,add)
 */
var truncString=function(str,max,add){add=add||"\u2026";return("string"===typeof str&&str.length>max?str.substring(0,max)+add:str);};
/*!
 * fix en ru / ru en typo
 * modified sovtime.ru/soft/convert.html
 * gist.github.com/englishextra/8f398bb7a3e438b692352a3c114a13ae
 * jsfiddle.net/englishextra/6p150wu1/
 * jsbin.com/runoju/edit?js,output
 * @param {String} e any text string
 * @param {String} a "ru" or "en", default "en"
 * @param {String} b "en" or "ru", default "ru"
 * fixEnRuTypo(e,a,b)
 */
var fixEnRuTypo=function(e,a,b){var c="";if("ru"==a&&"en"==b){a='\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';b="f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";}else{a="f,dult`;pbqrkvyjghcnea[wxio]ms'.zF<DULT~:PBQRKVYJGHCNEA{WXIO}MS'>Z@#$^&|/?";b='\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044c\u044b\u044d\u044e\u044f\u0410\u0411\u0412\u0413\u0414\u0415\u0401\u0416\u0417\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042a\u042c\u042b\u042d\u042e\u042f"\u2116;:?/.,';}for(var d=0;d<e.length;d++){var f=a.indexOf(e.charAt(d));if(c>f){c+=e.charAt(d);}else{c+=b.charAt(f);}}return c;};
/*!
 * Check if string represents a valid HTML id
 * gist.github.com/englishextra/b5aaef8b555a3ba84c68a6e251db149d
 * jsfiddle.net/englishextra/z19tznau/
 * @param {String} a text string
 * @param {Int} [full] if true, returns with leading hash/number sign
 * isValidId(a,full)
 */
var isValidId=function(a,full){return full?/^\#[A-Za-z][-A-Za-z0-9_:.]*$/.test(a)?!0:!1:/^[A-Za-z][-A-Za-z0-9_:.]*$/.test(a)?!0:!1;};
/*!
 * find element's position
 * stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
 * @param {Object} a an HTML element
 * findPos(a).top
 */
var findPos=function(a){a=a.getBoundingClientRect();var b=document.body,c=document.documentElement;return{top:Math.round(a.top+(window.pageYOffset||c.scrollTop||b.scrollTop)-(c.clientTop||b.clientTop||0)),left:Math.round(a.left+(window.pageXOffset||c.scrollLeft||b.scrollLeft)-(c.clientLeft||b.clientLeft||0))};};
/*!
 * remove all children of parent element
 * gist.github.com/englishextra/da26bf39bc90fd29435e8ae0b409ddc3
 * @param {Object} e parent HTML Element
 * removeChildren(e)
 */
var removeChildren=function(e){return function(){if(e&&e.firstChild){for(;e.firstChild;){e.removeChild(e.firstChild);}}}();};
/*!
 * append node into other with fragment
 * gist.github.com/englishextra/0ff3204d5fb285ef058d72f31e3af766
 * @param {String|object} e an HTML Element to append
 * @param {Object} a target HTML Element
 * appendFragment(e,a)
 */
var appendFragment=function(e,a){"use strict";var d=document;a=a||d.getElementsByTagNames("body")[0]||"";return function(){if(e){var d=document,df=d.createDocumentFragment()||"",aC="appendChild";if("string"===typeof e){e=d.createTextNode(e);}df[aC](e);a[aC](df);}}();};
/*!
 * modified Unified URL parsing API in the browser and node
 * github.com/wooorm/parse-link
 * removed module check
 * gist.github.com/englishextra/4e9a0498772f05fa5d45cfcc0d8be5dd
 * gist.github.com/englishextra/2a7fdabd0b23a8433d5fc148fb788455
 * jsfiddle.net/englishextra/fcdds4v6/
 * @param {String} url URL string
 * @param {Boolean} [true|false] if true, returns protocol:, :port, /pathname, ?search, ?query, #hash
 * if set to false, returns protocol, port, pathname, search, query, hash
 * alert(parseLink("http://localhost/search?s=t&v=z#dev").href|
 * origin|host|port|hash|hostname|pathname|protocol|search|query|isAbsolute|isRelative|isCrossDomain);
 */
/*jslint bitwise: true */
var parseLink=function(url,full){full=full||!1;return function(){var _r=function(s){return s.replace(/^(#|\?)/,"").replace(/\:$/,"");},l=location||"",_p=function(protocol){switch(protocol){case"http:":return full?":"+80:80;case"https:":return full?":"+443:443;default:return full?":"+l.port:l.port;}},_s=(0===url.indexOf("//")||!!~url.indexOf("://")),w=window.location||"",_o=function(){var o=w.protocol+"//"+w.hostname+(w.port?":"+w.port:"");return o||"";},_c=function(){var c=document.createElement("a");c.href=url;var v=c.protocol+"//"+c.hostname+(c.port?":"+c.port:"");return v!==_o();},a=document.createElement("a");a.href=url;return{href:a.href,origin:_o(),host:a.host||l.host,port:("0"===a.port||""===a.port)?_p(a.protocol):(full?a.port:_r(a.port)),hash:full?a.hash:_r(a.hash),hostname:a.hostname||l.hostname,pathname:a.pathname.charAt(0)!="/"?(full?"/"+a.pathname:a.pathname):(full?a.pathname:a.pathname.slice(1)),protocol:!a.protocol||":"==a.protocol?(full?l.protocol:_r(l.protocol)):(full?a.protocol:_r(a.protocol)),search:full?a.search:_r(a.search),query:full?a.search:_r(a.search),isAbsolute:_s,isRelative:!_s,isCrossDomain:_c(),hasHTTP:/^(http|https):\/\//i.test(url)?!0:!1};}();};
/*jslint bitwise: false */
/*!
 * get current protocol - "http" or "https", else return ""
 * @param {Boolean} [a] When set to "true", and the result is empty,
 * the function will return "http"
 * getHTTP(a)
 */
var getHTTP=function(a){return function(f){return"http:"===a?"http":"https:"===a?"https":f?"http":"";};}(window.location.protocol||"");
/*!
 * safe way to handle console.log():
 * sitepoint.com/safe-console-log/
 */
/* jshint ignore:start */
if ("undefined" === typeof console) {
	console = {};
	console.log = function () {
		return;
	};
}
/* jshint ignore:end */
/*!
 * add js class to html element
 */
(function setJsClassToDocumentElement(a){if(a){a.classList.add("js");}}(document.documentElement||""));
/*!
 * detect Node.js
 * github.com/lyrictenor/node-is-nwjs/blob/master/is-nodejs.js
 * @returns {Boolean} true or false
 */
var isNodejs = "undefined" !== typeof process && "undefined" !== typeof require || "";
/*!
 * detect Electron
 * @returns {Boolean} true or false
 */
var isElectron = "undefined" !== typeof window && window.process && "renderer" === window.process.type || "";
/*!
 * detect NW.js
 * github.com/lyrictenor/node-is-nwjs/blob/master/index.js
 * @returns {Boolean} true or false
 */
var isNwjs = function () {
	if ("undefined" !== typeof isNodejs && isNodejs) {
		try {
			if ("undefined" !== typeof require("nw.gui")) {
				return !0;
			}
		} catch (e) {
			return !1;
		}
	}
	return !1;
}
();
/*!
 * modified MediaHack - (c) 2013 Pomke Nohkan MIT LICENCED.
 * gist.github.com/englishextra/ff8c9dde94abe32a9d7c4a65e0f2ccac
 * jsfiddle.net/englishextra/xg7ce8kc/
 * removed className fallback and additionally
 * returns earlyDeviceOrientation,earlyDeviceSize
 * Add media query classes to DOM nodes
 * github.com/pomke/mediahack/blob/master/mediahack.js
 */
var earlyDeviceOrientation="",earlyDeviceSize="";(function(w,e){var f=function(a){var b=a.split(" ");if(e){for(var c=0;c<b.length;c++){a=b[c];e.add(a);}}},g=function(a){var b=a.split(" ");if(e){for(var c=0;c<b.length;c++){a=b[c];e.remove(a);}}},h={landscape:"all and (orientation:landscape)",portrait:"all and (orientation:portrait)"},k={small:"all and (max-width:768px)",medium:"all and (min-width:768px) and (max-width:991px)",large:"all and (min-width:992px)"},d,mM="matchMedia",m="matches",o=function(a,b){var c=function(a){if(a[m]){f(b);earlyDeviceOrientation=b;}else{g(b);}};c(a);a.addListener(c);},s=function(a,b){var c=function(a){if(a[m]){f(b);earlyDeviceSize=b;}else{g(b);}};c(a);a.addListener(c);};for(d in h){if(h.hasOwnProperty(d)){o(w[mM](h[d]),d);}}for(d in k){if(k.hasOwnProperty(d)){s(w[mM](k[d]),d);}}})(window,document.documentElement.classList||"");
/*!
 * add mobile or desktop class
 * using Detect Mobile Browsers | Open source mobile phone detection
 * Regex updated: 1 August 2014
 * detectmobilebrowsers.com
 * github.com/heikojansen/plack-middleware-detectmobilebrowsers
 */
var earlyDeviceType="";(function(d,h,k,n){var c=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(n)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(n.substr(0,4))?h:k;if(d&&c){d.classList.add(c);earlyDeviceType=c;}}(document.documentElement||"","mobile","desktop",navigator.userAgent||navigator.vendor||window.opera));
/*!
 * add svg support class
 */
var earlySvgSupport="";(function(d,s){var c=document.implementation.hasFeature("http://www.w3.org/2000/svg","1.1")?s:"no-"+s;(earlySvgSupport=c);if(d&&c){d.classList.add(c);}}(document.documentElement||"","svg"));
/*!
 * add svgasimg support class
 */
var earlySvgasimgSupport="";(function(d,s){var c=document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")?s:"no-"+s;(earlySvgasimgSupport=c);if(d&&c){d.classList.add(c);}}(document.documentElement||"","svgasimg"));
/*!
 * add touch support class
 * gist.github.com/englishextra/3cb22aab31a52b6760b5921e4fe8db95
 * jsfiddle.net/englishextra/z5xhjde8/
 */
var earlyHasTouch="";(function(d,s){if(d){var c="ontouchstart"in d?s:"no-"+s;earlyHasTouch=c;d.classList.add(c);}}(document.documentElement||"","touch"));
/*!
 * return date in YYYY-MM-DD format
 */
var earlyFnGetYyyymmdd=function(){"use strict";var a=(new Date()),b=a.getDate(),d=a.getFullYear(),c=a.getMonth();(c+=1);if(10>b){b="0"+b;}if(10>c){c="0"+c;}return d+"-"+c+"-"+b;}();
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
 * dependent on setAutoClearedTimeout
 * gist.github.com/englishextra/24ef040fbda405f7468da70e4f3b69e7
 * @param {Object} [f] callback function
 * @param {Int} [n] any positive whole number, default: 500
 * LoadingSpinner.show();
 * LoadingSpinner.hide(f,n);
 */
var LoadingSpinner = function () {
	"use strict";
	var d = document,
	b = d.body || "",
	cls = "loading-spinner",
	qS = "querySelector",
	a = d[qS]("." + cls) || "",
	cL = "classList",
	isActiveLoadingSpinnerClass = "is-active-loading-spinner";
	console.log("triggered function: LoadingSpinner");
	if (!a) {
		a = d.createElement("div");
		a[cL].add(cls);
		appendFragment(a, b);
	}
	return {
		show: function () {
			return b[cL].contains(isActiveLoadingSpinnerClass) || b[cL].add(isActiveLoadingSpinnerClass);
		},
		hide: function (f, n) {
			n = n || 500;
			var st = requestTimeout(function () {
					clearRequestTimeout(st);
					b[cL].remove(isActiveLoadingSpinnerClass);
					if (f && "function" === typeof f) {
						f();
					}
				}, n);
		}
	};
}
();
/*!
 * Open external links in default browser out of Electron / nwjs
 * gist.github.com/englishextra/b9a8140e1c1b8aa01772375aeacbf49b
 * stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser
 * github.com/nwjs/nw.js/wiki/shell
 * electron - file: | nwjs - chrome-extension: | http: Intel XDK
 * @param {String} a URL/path string
 * openDeviceBrowser(a)
 */
var openDeviceBrowser = function (a) {
	"use strict";
	var w = window,
	g = function () {
		var es = "undefined" !== typeof isElectron && isElectron ? require("electron").shell : "";
		return es ? es.openExternal(a) : "";
	},
	k = function () {
		var ns = "undefined" !== typeof isNwjs && isNwjs ? require("nw.gui").Shell : "";
		return ns ? ns.openExternal(a) : "";
	},
	q = function () {
		/*!
		 * wont do in electron and nw,
		 * so manageExternalLinks will set target blank to links
		 */
		/* var win = w.open(a, "_blank");
		win.focus(); */
		return !0;
	},
	v = function () {
		return w.open(a, "_system", "scrollbars=1,location=no");
	};
	console.log("triggered function: openDeviceBrowser");
	if ("undefined" !== typeof isElectron && isElectron) {
		g();
	} else if ("undefined" !== typeof isNwjs && isNwjs) {
		k();
	} else {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			q();
		} else {
			v();
		}
	}
};
/*!
 * replacement for inner html
 */
var insertTextAsFragment = function (t, c, f) {
	"use strict";
	var d = document,
	b = d.body || "",
	aC = "appendChild",
	iH = "innerHTML",
	pN = "parentNode",
	g = function () {
		return f && "function" === typeof f && f();
	};
	console.log("triggered function: insertTextAsFragment");
	try {
		var n = c.cloneNode(!1);
		if (d.createRange) {
			var rg = d.createRange();
			rg.selectNode(b);
			var df = rg.createContextualFragment(t);
			n[aC](df);
			return c[pN] ? c[pN].replaceChild(n, c) : c[iH] = t,
			g();
		} else {
			n[iH] = t;
			return c[pN] ? c[pN].replaceChild(d.createDocumentFragment[aC](n), c) : c[iH] = t,
			g();
		}
	} catch (e) {
		console.log(e);
	}
	return !1;
};
/*!
 * load content via ajax
 */
var insertExternalHTML = function (a, u, f) {
	"use strict";
	var d = document,
	qS = "querySelector",
	c = d[qS](a) || "",
	g = function (t, s) {
		var q = function () {
			return s && "function" === typeof s && s();
		};
		insertTextAsFragment(t, c, q);
	},
	k = function () {
		fetch(u).then(function (r) {
			if (!r.ok) {
				throw new Error(r.statusText);
			}
			return r;
		}).then(function (r) {
			return r.text();
		}).then(function (t) {
			g(t, f);
		}).catch (function (e) {
			console.log("Error inserting content from file " + u, e);
		});
	};
	if (c) {
		console.log("triggered function: insertExternalHTML");
		k();
	}
};
/*!
 * render template
 * @requires t.js
 * @requires safelyParseJSON
 */
var renderTemplate = function (parsedJson, templateId, targetId, callback) {
	"use strict";
	var d = document,
	qS = "querySelector",
	template = d[qS](templateId) || "",
	target = d[qS](targetId) || "";
	parsedJson = safelyParseJSON(parsedJson);
	if (template && target) {
		var targetHtml = template.innerHTML || "",
		renderTargetTemplate = new t(targetHtml);
		var targetRendered = renderTargetTemplate.render(parsedJson);
		insertTextAsFragment(targetRendered, target, function () {
			if (callback && "function" === typeof callback) {
				callback();
			}
		});
	}
};
/*!
 * set click event on external links,
 * so that they open in new browser tab
 * @param {Object} [ctx] context HTML Element
 */
var manageExternalLinks = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	qSA = "querySelectorAll",
	ctx = d.body || "",
	cls = "a",
	cL = "classList",
	isBindedClass = "is-binded",
	aEL = "addEventListener",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	handleExternalLink = function (p, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		openDeviceBrowser(p);
	},
	g = function (e) {
		var p = e.getAttribute("href") || "";
		if (p && parseLink(p).isCrossDomain && parseLink(p).hasHTTP) {
			if (!e[cL].contains(isBindedClass)) {
				e.title = "" + (parseLink(p).hostname || "") + " откроется в новой вкладке";
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					e.target = "_blank";
				} else {
					e[aEL]("click", handleExternalLink.bind(null, p));
				}
				e[cL].add(isBindedClass);
			}
		}
	},
	k = function () {
		a = ctx ? ctx[qSA](cls) || "" : d[qSA](cls) || "";
		for (var i = 0, l = a.length; i < l; i += 1) {
			g(a[i]);
		}
	};
	if (a) {
		console.log("triggered function: manageExternalLinks");
		k();
	}
};
document.ready().then(manageExternalLinks);
/*!
 * replace img src with data-src
 * @param {Object} [ctx] context HTML Element
 */
var handleDataSrcImg = function () {
	"use strict";
	var w = window,
	d = document,
	ctx = d.body || "",
	qS = "querySelector",
	qSA = "querySelectorAll",
	cls = "img[data-src]",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	cL = "classList",
	ds = "dataset",
	isActiveClass = "is-active",
	isBindedClass = "is-binded",
	k = function (e) {
		var _src = e[ds].src || "";
		if (_src) {
			if (!e[cL].contains(isBindedClass)) {
				if (parseLink(_src).isAbsolute && !parseLink(_src).hasHTTP) {
					e[ds].src = _src.replace(/^/, getHTTP(!0) + ":");
					_src = e[ds].src;
				}
				if (w.Promise) {
					imagePromise(_src).then(function (r) {
						e.src = _src;
						console.log("manageDataSrcImg => imagePromise: loaded image:", r);
					}).catch (function (err) {
						console.log("manageDataSrcImg => imagePromise: cannot load image:", err);
					});
				} else {
					e.src = _src;
				}
				e[cL].add(isActiveClass);
				e[cL].add(isBindedClass);
			}
		}
	},
	g = function (e) {
		/*!
		 * true if elem is in same y-axis as the viewport or within 100px of it
		 * github.com/ryanve/verge
		 */
		if (verge.inY(e, 100) && 0 !== e.offsetHeight) {
			k(e);
		}
	};
	if (a) {
		console.log("triggered function: handleDataSrcImg");
		a = ctx ? ctx[qSA](cls) || "" : d[qSA](cls) || "";
		for (var i = 0, l = a.length; i < l; i += 1) {
			g(a[i]);
		}
	}
},
manageDataSrcImg  = function () {
	"use strict";
	var w = window,
	aEL = "addEventListener",
	rEL = "removeEventListener";
	w[rEL]("scroll", handleDataSrcImg);
	w[rEL]("resize", handleDataSrcImg);
	w[aEL]("scroll", handleDataSrcImg);
	w[aEL]("resize", handleDataSrcImg);
};
/*!
 * replace iframe src with data-src
 * @param {Object} [ctx] context HTML Element
 */
var handleDataSrcIframe = function () {
	"use strict";
	var d = document,
	ctx = d.body || "",
	qS = "querySelector",
	qSA = "querySelectorAll",
	cls = "iframe[data-src]",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	isBindedClass = "is-binded",
	cL = "classList",
	ds = "dataset",
	sA = "setAttribute",
	k = function (e) {
		var _src = e[ds].src || "";
		if (_src) {
			if (!e[cL].contains(isBindedClass)) {
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
	g = function (e) {
		/*!
		 * true if elem is in same y-axis as the viewport or within 100px of it
		 * github.com/ryanve/verge
		 */
		if (verge.inY(e, 100) /* && 0 !== e.offsetHeight */) {
			k(e);
		}
	};
	if (a) {
		console.log("triggered function: handleDataSrcIframe");
		a = ctx ? ctx[qSA](cls) || "" : d[qSA](cls) || "";
		for (var i = 0, l = a.length; i < l; i += 1) {
			g(a[i]);
		}
	}
},
manageDataSrcIframe  = function () {
	"use strict";
	var w = window,
	aEL = "addEventListener",
	rEL = "removeEventListener";
	w[rEL]("scroll", handleDataSrcIframe);
	w[rEL]("resize", handleDataSrcIframe);
	w[aEL]("scroll", handleDataSrcIframe);
	w[aEL]("resize", handleDataSrcIframe);
};
/*!
 * manage data lightbox img links
 */
var manageImgLightboxLinks = function () {
	"use strict";
	var w = window,
	d = document,
	b = d.body || "",
	ctx = d.body || "",
	qS = "querySelector",
	qSA = "querySelectorAll",
	cls = "[data-lightbox]",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	ilc = "img-lightbox-container",
	c = d[qS]("." + ilc) || "",
	m = d[qS]("." + ilc + " img") || "",
	an = "animated",
	an1 = "fadeIn",
	an2 = "fadeInUp",
	an3 = "fadeOut",
	an4 = "fadeOutDown",
	isBindedClass = "is-binded",
	cL = "classList",
	ds = "dataset",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	aC = "appendChild",
	dm = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
	if (!c) {
		c = d.createElement("div");
		m = d.createElement("img");
		c[cL].add(ilc);
		m.src = dm;
		m.alt = "";
		c[aC](m);
		appendFragment(c, b);
	}
	var handleImgLightboxLink = function (_this, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var _href = _this.getAttribute("href") || "";
		if (c && m && _href) {
			LoadingSpinner.show();
			c[cL].add(an);
			c[cL].add(an1);
			m[cL].add(an);
			m[cL].add(an2);
			if (parseLink(_href).isAbsolute && !parseLink(_href).hasHTTP) {
				_href = _href.replace(/^/, getHTTP(!0) + ":");
			}
			if (w.Promise) {
				imagePromise(_href).then(function (r) {
					m.src = _href;
					console.log("manageDataSrcImg => imagePromise: loaded image:", r);
				}).catch (function (err) {
					console.log("manageDataSrcImg => imagePromise: cannot load image:", err);
				});
			} else {
				m.src = _href;
			}
			c[aEL]("click", handleImgLightboxContainer);
			w[aEL]("keyup", handleImgLightboxWindow);
			c.style.display = "block";
			LoadingSpinner.hide();
		}
	},
	hideImgLightbox = function () {
		if (c && m) {
			m[cL].remove(an2);
			m[cL].add(an4);
			var hideImg = function () {
				c[cL].remove(an);
				c[cL].remove(an3);
				m[cL].remove(an);
				m[cL].remove(an4);
				m.src = dm;
				c.style.display = "none";
			},
			hideContainer = function () {
				c[cL].remove(an1);
				c[cL].add(an3);
				var st1 = requestTimeout(function () {
						clearRequestTimeout(st1);
						hideImg();
					}, 400);
			};
			var st2 = requestTimeout(function () {
					clearRequestTimeout(st2);
					hideContainer();
				}, 400);
		}
	},
	handleImgLightboxContainer = function () {
		if (c) {
			c[rEL]("click", handleImgLightboxContainer);
			hideImgLightbox();
		}
	},
	handleImgLightboxWindow = function (ev) {
		w[rEL]("keyup", handleImgLightboxWindow);
		if (27 === (ev.which || ev.keyCode)) {
			hideImgLightbox();
		}
	},
	k = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			var v = e[ds].lightbox || "",
			p = e.getAttribute("href") || "";
			if ("img" === v && p) {
				if (parseLink(p).isAbsolute && !parseLink(p).hasHTTP) {
					e.setAttribute("href", p.replace(/^/, getHTTP(!0) + ":"));
				}
				e[aEL]("click", handleImgLightboxLink.bind(null, e));
				e[cL].add(isBindedClass);
			}
		}
	};
	if (a) {
		console.log("triggered function: manageImgLightboxLinks");
		a = ctx ? ctx[qSA](cls) || "" : d[qSA](cls) || "";
		for (var j = 0, l = a.length; j < l; j += 1) {
			k(a[j]);
		}
	}
};
/*!
 * add smooth scroll or redirection to static select options
 * @param {Object} [ctx] context HTML Element
 */
var managePagesSelect = function (ctx) {
	"use strict";
	ctx = ctx || "";
	var w = window,
	d = document,
	cls = "#pages-select",
	qS = "querySelector",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	uiPanelContentsSelect = d[qS](".ui-panel-contents-select") || "",
	cL = "classList",
	isFixedClass = "is-fixed",
	isBindedClass = "is-binded",
	aEL = "addEventListener",
	handleStaticSelect = function (_this) {
		var h = _this.options[_this.selectedIndex].value || "",
		zh = h ? (isValidId(h, !0) ? d[qS](h) : "") : "",
		uiPanelContentsSelectHeight = uiPanelContentsSelect ? (uiPanelContentsSelect[cL].contains(isFixedClass) ? uiPanelContentsSelect.offsetHeight : uiPanelContentsSelect.offsetHeight * 2) : 0;
		if (h) {
			if (zh) {
				scroll2Top(findPos(d[qS](h)).top - uiPanelContentsSelectHeight, 10000);
			} else {
				w.location.hash = h;
			}
		}
	},
	k = function () {
		if (!a[cL].contains(isBindedClass)) {
			a[aEL]("change", handleStaticSelect.bind(null, a));
			a[cL].add(isBindedClass);
		}
	};
	if (a) {
		console.log("triggered function: managePagesSelect");
		k();
	}
};
/*!
 * add click event on hidden-layer show btn
 * @param {Object} [ctx] context HTML Element
 */
var manageExpandingLayers = function (ctx) {
	"use strict";
	ctx = ctx || "";
	var d = document,
	cls = ".btn-expand-hidden-layer",
	qS = "querySelector",
	qSA = "querySelectorAll",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	aEL = "addEventListener",
	cL = "classList",
	pN = "parentNode",
	isActiveClass = "is-active",
	isBindedClass = "is-binded",
	handleExpandingLayers = function (_this) {
		var s = _this[pN] ? _this[pN].nextElementSibling : "";
		if (s) {
			_this[cL].toggle(isActiveClass);
			s[cL].toggle(isActiveClass);
		}
		return !1;
	},
	k = function (e) {
		if (!e[cL].contains(isBindedClass)) {
			e[aEL]("click", handleExpandingLayers.bind(null, e));
			e[cL].add(isBindedClass);
		}
	},
	q = function () {
		a = ctx ? ctx[qSA](cls) || "" : d[qSA](cls) || "";
		for (var i = 0, l = a.length; i < l; i += 1) {
			k(a[i]);
		}
	};
	if (a) {
		console.log("triggered function: manageExpandingLayers");
		q();
	}
};
/*!
 * modified Notibar.js v1.0
 * Lightweight notification bar, no dependency.
 * github.com/englishextra/notibar.js
 * passes jshint
 */
var notiBar = function (opt) {
	var d = document,
	b = d.body || "",
	s_bar = "notibar",
	qS = "querySelector",
	c = d[qS]("." + s_bar) || "",
	s_msg = "message",
	s_close = "close",
	s_key = "_notibar_dismiss_",
	s_val = "ok",
	s_an = "animated",
	s_an1 = "fadeInDown",
	s_an2 = "fadeOutUp",
	cL = "classList",
	aC = "appendChild",
	cE = "createElement",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	aEL = "addEventListener",
	rEL = "removeEventListener";
	if (b) {
		console.log("triggered function: notiBar");
		if ("string" === typeof opt) {
			opt = {
				"message": opt
			};
		}
		var settings = {
			"message": "",
			"timeout": 10000,
			"key": s_key,
			"value": s_val,
			"days": 0,
		};
		for (var i in opt) {
			if (opt.hasOwnProperty(i)) {
				settings[i] = opt[i];
			}
		}
		var c_k = Cookies.get(settings.key) || "";
		if (c_k && c_k === decodeURIComponent(settings.value)) {
			return !1;
		}
		if (c) {
			removeChildren(c);
		} else {
			c = d[cE]("div");
			c[cL].add(s_bar);
			c[cL].add(s_an);
		}
		var m = d[cE]("div");
		m[cL].add(s_msg);
		var s = settings.message || "";
		if ("string" === typeof s) {
			s = d.createTextNode(s);
		}
		m[aC](s);
		c[aC](m);
		var btn = d[cE]("a");
		btn[cL].add(s_close);
		var svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
		use = d[cENS]("http://www.w3.org/2000/svg", "use");
		svg[cL].add("ui-icon");
		use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-Cancel");
		svg[aC](use);
		btn[aC](svg);
		var set_cookie = function () {
			if (settings.days) {
				Cookies.set(settings.key, settings.value, {
					expires: settings.days
				});
			} else {
				Cookies.set(settings.key, settings.value);
			}
		},
		hide_message = function () {
			var notibar = d[qS]("." + s_bar) || "";
			if (notibar) {
				c[cL].remove(s_an1);
				c[cL].add(s_an2);
				removeChildren(c);
			}
		},
		h_btn = function () {
			btn[rEL]("click", h_btn);
			hide_message();
			set_cookie();
		};
		btn[aEL]("click", h_btn);
		c[aC](btn);
		appendFragment(c, b);
		c[cL].remove(s_an2);
		c[cL].add(s_an1);
		var st = requestTimeout(function () {
				clearRequestTimeout(st);
				hide_message();
			}, settings.timeout);
	}
};
/*!
 * init notibar
 */
var initNotibarMsg = function () {
	"use strict";
	if ("undefined" !== typeof getHTTP && getHTTP()) {
		var w = window,
		d = document,
		n = "_notibar_dismiss_",
		m = "Выбрать статью можно щелкнув по самофиксирующейся планке с заголовком текущей страницы.",
		p = parseLink(w.location.href).origin,
		qS = "querySelector",
		aC = "appendChild",
		aEL = "addEventListener",
		rEL = "removeEventListener",
		uiPanelContentsSelect = d[qS]("#render_contents_select") || "",
		g = function () {
			var msgObj = d.createElement("a");
			/* jshint -W107 */
			msgObj.href = "javascript:void(0);";
			/* jshint +W107 */
			var handlerMsgObj = function () {
				msgObj[rEL]("click", handlerMsgObj);
				var uiPanelContentsSelectPos = findPos(uiPanelContentsSelect).top || 0;
				scroll2Top(uiPanelContentsSelectPos, 2000);
			};
			msgObj[aEL]("click", handlerMsgObj);
			msgObj[aC](d.createTextNode(m));
			notiBar({
				"message": msgObj,
				"timeout": 10000,
				"key": n,
				"value": m,
				"days": 0
			});
		};
		if (p && uiPanelContentsSelect) {
			console.log("triggered function: initNotibarMsg");
			var st = requestTimeout(function () {
					clearRequestTimeout(st);
					g();
				}, 3000);
		}
	}
};
document.ready().then(initNotibarMsg);
/*!
 * init Masonry grid
 * stackoverflow.com/questions/15160010/jquery-masonry-collapsing-on-initial-page-load-works-fine-after-clicking-home
 * percentPosition: !0 works well with percent-width items,
 * as items will not transition their position on resize.
 * masonry.desandro.com/options.html
 */
var msnry,
pckry,
initMasonry = function (ctx) {
	"use strict";
	ctx = ctx || "";
	var w = window,
	d = document,
	qS = "querySelector",
	cls = ".masonry-grid",
	h = ".masonry-grid-item",
	k = ".masonry-grid-sizer",
	a = ctx ? ctx[qS](cls) || "" : d[qS](cls) || "",
	c = ctx ? ctx[qS](h) || "" : d[qS](h) || "",
	g = function () {
		var si;
		if (w.Masonry) {
			if (msnry) {
				msnry.destroy();
			}
			msnry = new Masonry(a, {
					itemSelector: h,
					columnWidth: k,
					gutter: 0,
					percentPosition: !0
				});
			console.log("function initMasonry => initialised msnry");
			si = requestInterval(function () {
					console.log("function initMasonry => started Interval");
					if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
						clearRequestInterval(si);
						console.log("function initMasonry => si=" + si.value + "; imagesPreloaded=" + imagesPreloaded);
						msnry.layout();
						console.log("function initMasonry => reinitialised msnry");
					}
				}, 100);
		} else if (w.Packery) {
			if (pckry) {
				pckry.destroy();
			}
			pckry = new Packery(a, {
					itemSelector: h,
					columnWidth: k,
					gutter: 0,
					percentPosition: !0
				});
			console.log("function initMasonry => initialised pckry");
			si = requestInterval(function () {
					console.log("function initMasonry => started Interval");
					if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
						clearRequestInterval(si);
						console.log("function initMasonry => si=" + si.value + "; imagesPreloaded=" + imagesPreloaded);
						pckry.layout();
						console.log("function initMasonry => reinitialised pckry");
					}
				}, 100);
		} else {
			console.log("function initMasonry => no library is loaded");
		}
	};
	if (a && c) {
		console.log("triggered function: initMasonryGrid");
		if ("undefined" !== typeof imagesPreloaded) {
			var st = requestTimeout(function () {
					clearRequestTimeout(st);
					g();
				}, 100);
		} else {
			console.log("function initMasonry => undefined: imagesPreloaded");
		}
	}
},
loadInitMasonry = function (ctx) {
	"use strict";
	ctx = ctx || "";
	/* var js = "./cdn/masonry/4.1.1/js/masonry.pkgd.fixed.min.js"; */
	var js = "./cdn/packery/2.1.1/js/packery.pkgd.fixed.min.js";
	if (!scriptIsLoaded(js)) {
		loadJS(js, initMasonry.bind(null, ctx));
	} else {
		initMasonry(ctx);
	}
};
/*!
 * load or refresh disqus_thread on click
 */
var loadRefreshDisqus = function () {
	"use strict";
	var w = window,
	d = document,
	qS = "querySelector",
	c = d[qS]("#disqus_thread") || "",
	btn = d[qS](".btn-show-disqus") || "",
	p = w.location.href || "",
	cL = "classList",
	ds = "dataset",
	pN = "parentNode",
	aC = "appendChild",
	isActiveClass = "is-active",
	n = c ? (c[ds].shortname || "") : "",
	js = getHTTP(!0) + "://" + n + ".disqus.com/embed.js",
	g = function () {
		c[cL].add(isActiveClass);
		btn.style.display = "none";
		LoadingSpinner.hide();
	},
	k = function () {
		try {
			DISQUS.reset({
				reload: !0,
				config: function () {
					this.page.identifier = n;
					this.page.url = p;
				}
			});
			g();
		} catch (e) {
			btn.style.display = "none";
		}
	},
	v = function () {
		loadJS(js, g);
	},
	z = function () {
		removeChildren(c);
		var replacementText = d.createElement("p");
		replacementText[aC](d.createTextNode("Комментарии доступны только в веб версии этой страницы."));
		appendFragment(replacementText, c);
		c.removeAttribute("id");
		btn[pN].style.display = "none";
	};
	if (c && btn && n && p) {
		console.log("triggered function: loadRefreshDisqus");
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			LoadingSpinner.show();
			if (scriptIsLoaded(js)) {
				k();
			} else {
				v();
			}
		} else {
			z();
		}
	}
},
manageDisqusButton = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	c = d[qS]("#disqus_thread") || "",
	e = c ? (d[qS](".btn-show-disqus") || "") : "",
	aEL = "addEventListener",
	rEL = "removeEventListener",
	cL = "classList",
	isBindedClass = "is-binded",
	h_e = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		e[rEL]("click", h_e);
		loadRefreshDisqus();
	};
	if (c && e) {
		if (!e[cL].contains(isBindedClass)) {
			console.log("triggered function: manageDisqusButton");
			e[aEL]("click", h_e);
			e[cL].add(isBindedClass);
		}
	}
};
/*!
 * init Pages Kamil autocomplete
 * github.com/oss6/kamil/wiki/Example-with-label:link-json-and-typo-correct-suggestion
 */
var initContentsKamil = function (jsonObj) {
	"use strict";
	var w = window,
	d = document,
	qS = "querySelector",
	qSA = "querySelectorAll",
	search_form = d[qS](".search-form") || "",
	id = "#text",
	text = d[qS](id) || "",
	_ul_id = "kamil-typo-autocomplete",
	_ul_class = "kamil-autocomplete",
	outsideContainer = d[qS](".container") || "",
	cL = "classList",
	aEL = "addEventListener",
	aC = "appendChild",
	pN = "parentNode",
	q = function (r) {
		if (r) {
			var ac = new Kamil(id, {
					source: r,
					property: "title",
					minChars: 2
				});
			/*!
			 * create typo suggestion list
			 */
			var _ul = d.createElement("ul"),
			_li = d.createElement("li"),
			hideTypoSuggestions = function () {
				_ul.style.display = "none";
				_li.style.display = "none";
			},
			showTypoSuggestions = function () {
				_ul.style.display = "block";
				_li.style.display = "block";
			};
			_ul[cL].add(_ul_class);
			_ul.id = _ul_id;
			hideTypoSuggestions();
			_ul[aC](_li);
			text[pN].insertBefore(_ul, text.nextElementSibling);
			/*!
			 * show suggestions
			 */
			ac.renderMenu = function (ul, items) {
				items = items || "";
				var l = items.length,
				_this = this,
				/*!
				 * limit output
				 */
				f = function (e, i) {
					if (i < 10) {
						_this._renderItemData(ul, e, i);
					}
				};
				if (items) {
					for (var i = 0; i < l; i += 1) {
						f(items[i], i);
					}
				}
				/*!
				 * fix typo - non latin characters found
				 */
				var h_li = function (v) {
					text.value = v;
					text.focus();
					hideTypoSuggestions();
				},
				h_text = function () {
					if (text.value.length < 3 || text.value.match(/^\s*$/)) {
						hideTypoSuggestions();
					}
				};
				if (outsideContainer) {
					outsideContainer[aEL]("click", hideTypoSuggestions);
				}
				while (l < 1) {
					var v = text.value;
					if (/[^\u0000-\u007f]/.test(v)) {
						v = fixEnRuTypo(v, "ru", "en");
					} else {
						v = fixEnRuTypo(v, "en", "ru");
					}
					showTypoSuggestions();
					removeChildren(_li);
					appendFragment(d.createTextNode("" + v), _li);
					_li[aEL]("click", h_li.bind(null, v));
					if (v.match(/^\s*$/)) {
						hideTypoSuggestions();
					}
					text[aEL]("input", h_text);
					l += 1;
				}
				/*!
				 * truncate text
				 */
				var lis = ul[qSA]("li") || "",
				g = function (e) {
					var t = e.firstChild.textContent || "",
					n = d.createTextNode(truncString(t, 24));
					e.replaceChild(n, e.firstChild);
					e.title = "" + t;
				};
				if (lis) {
					for (var j = 0, m = lis.length; j < m; j += 1) {
						g(lis[j]);
					}
				}
			};
			/*!
			 * unless you specify property option in new Kamil
			 * use kamil built-in word label as search key in JSON file
			 * [{"link":"/","label":"some text to match"},
			 * {"link":"/pages/contents.html","label":"some text to match"}]
			 */
			ac.on("kamilselect", function (e) {
				var p = e.item.href || "",
				sm = function () {
					e.inputElement.value = "";
					hideTypoSuggestions();
					w.location.href = p;
				};
				if (p) {
					/*!
					 * nwjs wont like setImmediate here
					 */
					/* setImmediate(sm); */
					sm();
				}
			});
		}
	};
	if (search_form && text) {
		console.log("triggered function: initContentsKamil");
		q(jsonObj);
	}
},
loadInitContentsKamil = function (jsonObj) {
	"use strict";
	var js = "./cdn/kamil/0.1.1/js/kamil.fixed.min.js";
	if (!scriptIsLoaded(js)) {
		loadJS(js, initContentsKamil.bind(null, jsonObj));
	}
};
/*!
 * render navigation templates
 */
var renderNavigation = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	navbarClass = '[data-function="navbar"]',
	navbar = d[qS](navbarClass) || "",
	outsideContainerClass = ".container",
	navigationJsonUrl = "./json/navigation.json";
	if (navbar) {
		fetch(navigationJsonUrl).then(function (navigationJson) {
			if (!navigationJson.ok) {
				throw new Error(navigationJson.statusText);
			}
			return navigationJson;
		}).then(function (navigationJson) {
			return navigationJson.text();
		}).then(function (navigationJson) {
				renderTemplate(navigationJson, "#template_navbar_popular", "#render_navbar_popular", function () {
					renderTemplate(navigationJson, "#template_navbar_more", "#render_navbar_more", function () {
						Navbar(navbarClass, outsideContainerClass);
						manageExternalLinks();
					});
				});
				var carouselRenderId = "#render_b_carousel";
				renderTemplate(navigationJson, "#template_b_carousel", carouselRenderId, function () {
					manageDataSrcImg();
					var carousel = new Carousel({
							"main": ".js-carousel",
							"wrap": ".js-carousel__wrap",
							"prev": ".js-carousel__prev",
							"next": ".js-carousel__next"
						});
				});
		}).catch (function (err) {
			console.log("Error inserting content from file " + navigationJsonUrl, err);
		});
	}
};
document.ready().then(renderNavigation);
/*!
 * fix panel with contents select on scroll
 */
var fixUiPanelContentsSelect = function () {
	"use strict";
	var w = window,
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
		if ((d.body.scrollTop || d.documentElement.scrollTop || 0) > criticalHeight) {
			uiPanelContentsSelect[cL].add(isFixedClass);
		} else {
			uiPanelContentsSelect[cL].remove(isFixedClass);
		}
	};
	if (uiPanelContentsSelect) {
		w[aEL]("scroll", handleUiPanelContentsSelect);
	}
};
document.ready().then(fixUiPanelContentsSelect);
/*!
 * process routes, render contents select
 */
var processRoutes = function () {
	"use strict";
	var w = window,
	d = document,
	qS = "querySelector",
	aC = "appendChild",
	aEL = "addEventListener",
	pN = "parentNode",
	appContentId = "#app-content",
	appContent = d[qS](appContentId) || "",
	appContentParent = appContent[pN] || "",
	contentsTemplate = d[qS]("#template_contents_select") || "",
	contentsRender = d[qS]("#render_contents_select") || "",
	contentsSelect = d[qS](".contents-select") || "",
	asideTemplateId = "#template_aside",
	asideRenderId = "#render_aside",
	nextHrefTemplateId = "#template_bottom_nav_btns",
	nextHrefRenderId = "#render_bottom_nav_btns",
	masonryTemplateId = "#template_masonry_grid",
	masonryRenderId = "#render_contents_cards",
	routesJsonUrl = "./json/routes.json";
	if (appContent) {
		fetch(routesJsonUrl).then(function (routesJson) {
			if (!routesJson.ok) {
				throw new Error(routesJson.statusText);
			}
			return routesJson;
		}).then(function (routesJson) {
			return routesJson.text();
		}).then(function (routesJson) {
			var routesParsedJson = JSON.parse(routesJson),
			onInsertExternalHTML = function (titleString, nextHrefString, asideObj, routesObj) {
				LoadingSpinner.hide();
				/* var h1 = contentsSelect || d[qS]("#h1") || "",
				h1Pos = findPos(h1).top || 0;
				if (h1) {
					scroll2Top(h1Pos, 20000);
				} else {
					scroll2Top(0, 20000);
				} */
				scroll2Top(0, 20000);
				if (titleString) {
					d.title = titleString + (initialDocumentTitle ? " - " + initialDocumentTitle : "") + userBrowsingDetails;
				}
				if (contentsSelect) {
					for (var i = 0, l = contentsSelect.options.length; i < l; i += 1) {
						if (contentsSelect.options[i].value === w.location.hash) {
							contentsSelect.selectedIndex = i;
							break;
						}
					}
				}
				if (routesObj) {
					renderTemplate(routesObj, masonryTemplateId, masonryRenderId, function () {
						loadInitMasonry(appContentParent);
						manageDataSrcImg();
					});
				}
				if (nextHrefString) {
					renderTemplate({"next_href": nextHrefString}, nextHrefTemplateId, nextHrefRenderId);
				}
				if (asideObj) {
					renderTemplate(asideObj, asideTemplateId, asideRenderId, function () {
						manageExternalLinks();
						manageDataSrcImg();
					});
				}
				/*!
				 * cache parent node beforehand
				 */
				manageExternalLinks();
				manageDataSrcImg();
				manageDataSrcIframe();
				manageImgLightboxLinks();
				managePagesSelect(appContentParent);
				manageExpandingLayers(appContentParent);
				manageDisqusButton(appContentParent);
			};
			if (routesParsedJson) {
				loadInitContentsKamil(routesParsedJson.hashes);
				var navigateOnHashChange = function () {
					if (w.location.hash) {
						var notfound = false;
						for (var key in routesParsedJson.hashes) {
							if (routesParsedJson.hashes.hasOwnProperty(key)) {
								if (w.location.hash === routesParsedJson.hashes[key].href) {
									notfound = true;
									LoadingSpinner.show();
									insertExternalHTML(appContentId, routesParsedJson.hashes[key].url, onInsertExternalHTML.bind(null, routesParsedJson.hashes[key].title, routesParsedJson.hashes[key].next_href, routesParsedJson.hashes[key].aside, routesParsedJson));
									break;
								}
							}
						}
						if (false === notfound) {
							var notfoundUrl = routesParsedJson.notfound.url,
							notfoundText = routesParsedJson.notfound.title;
							if (notfoundUrl && notfoundText) {
								LoadingSpinner.show();
								insertExternalHTML(appContentId, notfoundUrl, onInsertExternalHTML.bind(null, notfoundText));
							}
						}
					} else {
						var homeUrl = routesParsedJson.home.url,
						homeText = routesParsedJson.home.title;
						if (homeUrl && homeText) {
							LoadingSpinner.show();
							insertExternalHTML(appContentId, homeUrl, onInsertExternalHTML.bind(null, homeText));
						}
					}
				};
				navigateOnHashChange();
				w[aEL]("hashchange", navigateOnHashChange);
				var handleContentsSelect = function (_this) {
					var h = _this.options[_this.selectedIndex].value || "";
					if (h) {
						w.location.hash = h;
					}
				};
				if (contentsTemplate && contentsRender) {
					/*!
					 * insertTextAsFragment will remove event listener from select element,
					 * so you will have to use inner html method
					 */
					/* var contentsHtml = contentsTemplate.innerHTML || "",
					renderContentsTemplate = new t(contentsHtml);
					var contentsRendered = renderContentsTemplate.render(routesParsedJson);
					contentsRender.innerHTML = contentsRendered; */
					/*!
					 * alternative way to generate select options
					 * with document fragment
					 */
					var df = d.createDocumentFragment();
					for (var key in routesParsedJson.hashes) {
						if (routesParsedJson.hashes.hasOwnProperty(key)) {
							var contentsOption = d.createElement("option");
							contentsOption.value = routesParsedJson.hashes[key].href;
							var contentsOptionText = routesParsedJson.hashes[key].title;
							contentsOption.title = contentsOptionText;
							var contentsOptionTextTruncated = truncString("" + contentsOptionText, 48);
							contentsOption[aC](d.createTextNode(contentsOptionTextTruncated));
							df[aC](contentsOption);
							df[aC](d.createTextNode("\n"));
						}
					}
					appendFragment(df, contentsRender);
					contentsSelect[aEL]("change", handleContentsSelect.bind(null, contentsSelect));
				}
			}
		}).catch (function (err) {
			console.log("Error inserting content from file " + routesJsonUrl, err);
		});
	}
};
document.ready().then(processRoutes);
/*!
 * observe mutations
 * bind functions only for inserted DOM
 * @param {String} ctx HTML Element class or id string
 */
var observeMutations = function (ctx) {
	"use strict";
	ctx = ctx || "";
	if (ctx) {
		var g = function (e) {
			var f = function (m) {
				console.log("mutations observer: " + m.type);
				console.log(m.type, "target: " + m.target.tagName + ("." + m.target.className || "#" + m.target.id || ""));
				console.log(m.type, "added: " + m.addedNodes.length + " nodes");
				console.log(m.type, "removed: " + m.removedNodes.length + " nodes");
				if ("childList" === m.type || "subtree" === m.type) {
					mo.disconnect();
				}
			};
			for (var i = 0, l = e.length; i < l; i += 1) {
				f(e[i]);
			}
		},
		mo = new MutationObserver(g);
		mo.observe(ctx, {
			childList: !0,
			subtree: !0,
			attributes: !1,
			characterData: !1
		});
	}
};
/*!
 * apply changes to inserted DOM
 */
var updateInsertedDom = function () {
	"use strict";
	var w = window,
	d = document,
	qS = "querySelector",
	h = w.location.hash || "",
	pN = "parentNode",
	/*!
	 * because replace child is used in the first place
	 * to insert new content, and if parent node doesnt exist
	 * inner html method is applied,
	 * the parent node should be observed, not the target
	 * node for the insertion
	 */
	ctx = d[qS]("#app-content")[pN] || "";
	if (ctx && h) {
		console.log("triggered function: updateInsertedDom");
		observeMutations(ctx);
	}
};
window.addEventListener("hashchange", updateInsertedDom);
/*!
 * init ui-totop
 */
var initUiTotop = function () {
	"use strict";
	var w = window,
	d = document,
	qS = "querySelector",
	b = d[qS]("body") || "",
	h = d[qS]("html") || "",
	u = "ui-totop",
	t = "Наверх",
	cL = "classList",
	cE = "createElement",
	aC = "appendChild",
	cENS = "createElementNS",
	sANS = "setAttributeNS",
	aEL = "addEventListener",
	isActiveClass = "is-active",
	k = function (_this) {
		var a = _this.pageYOffset || h.scrollTop || b.scrollTop || "",
		c = _this.innerHeight || h.clientHeight || b.clientHeight || "",
		e = d[qS]("." + u) || "";
		if (a && c && e) {
			if (a > c) {
				e[cL].add(isActiveClass);
			} else {
				e[cL].remove(isActiveClass);
			}
		}
	},
	g = function () {
		var h_a = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			scroll2Top(0, 20000);
		},
		a = d[cE]("a"),
		svg = d[cENS]("http://www.w3.org/2000/svg", "svg"),
		use = d[cENS]("http://www.w3.org/2000/svg", "use");
		a[cL].add(u);
		/* jshint -W107 */
		a.href = "javascript:void(0);";
		/* jshint +W107 */
		a.title = t;
		a[cL].add(u);
		a[aEL]("click", h_a);
		svg[cL].add("ui-icon");
		use[sANS]("http://www.w3.org/1999/xlink", "xlink:href", "#ui-icon-Up");
		svg[aC](use);
		a[aC](svg);
		b[aC](a);
		w[aEL]("scroll", k.bind(null, w));
	};
	if (b) {
		console.log("triggered function: initUiTotop");
		g();
	}
};
document.ready().then(initUiTotop);
/*!
 * show page, finish ToProgress
 */
var showPageFinishProgress = function () {
	"use strict";
	var d = document,
	qS = "querySelector",
	a = d[qS]("#page") || "",
	g = function () {
		a.style.opacity = 1;
		/* progressBar.complete(); */
	},
	k = function () {
		var si = requestInterval(function () {
				console.log("function showPageFinishProgress => started Interval");
				if ("undefined" !== typeof imagesPreloaded && imagesPreloaded) {
					clearRequestInterval(si);
					console.log("function showPageFinishProgress => si=" + si.value + "; imagesPreloaded=" + imagesPreloaded);
					g();
				}
			}, 100);
	};
	if (a) {
		console.log("triggered function: showPageFinishProgress");
		if ("undefined" !== typeof imagesPreloaded) {
			k();
		} else {
			g();
		}
	}
};
window.addEventListener("load", showPageFinishProgress);
