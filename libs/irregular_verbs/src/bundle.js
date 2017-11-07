/*jslint browser: true */
/*jslint node: true */
/*global appendFragment, debounce, DoSlide, earlyDeviceOrientation,
earlyDeviceSize, earlyDeviceType, earlyFnGetYyyymmdd, earlyHasTouch,
earlySvgasimgSupport, earlySvgSupport, getHTTP, loadJS,
openDeviceBrowser, parseLink, Promise, QRCode, removeChildren, require,
scriptIsLoaded, setStyleDisplayBlock, setStyleDisplayNone,
setStyleOpacity, setStyleVisibilityVisible, Timers, ToProgress,
unescape, VK, Ya */
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
 * modified ToProgress v0.1.1
 * @see {@link https://github.com/djyde/ToProgress}
 * @see {@link https://gist.github.com/englishextra/6a8c79c9efbf1f2f50523d46a918b785}
 * @see {@link https://jsfiddle.net/englishextra/z5xhjde8/}
 * arguments.callee changed to TP, a local wrapper function,
 * so that public function name is now customizable;
 * wrapped in curly brackets:
 * else{document.body.appendChild(this.progressBar);};
 * removed module check
 * passes jshint
 */
(function(root){"use strict";var ToProgress=(function(){var TP=function(){var t=function(){var s=document.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var j in i){if(i.hasOwnProperty(j)){if(void 0!==s.style[j]){return i[j];}}}},s=function(t,a){if(this.progress=0,this.options={id:"top-progress-bar",color:"#F44336",height:"2px",duration:0.2},t&&"object"===typeof t){for(var i in t){if(t.hasOwnProperty(i)){this.options[i]=t[i];}}}if(this.options.opacityDuration=3*this.options.duration,this.progressBar=document.createElement("div"),this.progressBar.id=this.options.id,this.progressBar.setCSS=function(t){for(var a in t){if(t.hasOwnProperty(a)){this.style[a]=t[a];}}},this.progressBar.setCSS({position:a?"relative":"fixed",top:"0",left:"0",right:"0","background-color":this.options.color,height:this.options.height,width:"0%",transition:"width "+this.options.duration+"s, opacity "+this.options.opacityDuration+"s","-moz-transition":"width "+this.options.duration+"s, opacity "+this.options.opacityDuration+"s","-webkit-transition":"width "+this.options.duration+"s, opacity "+this.options.opacityDuration+"s"}),a){var o=document.querySelector(a);if(o){if(o.hasChildNodes()){o.insertBefore(this.progressBar,o.firstChild);}else{o.appendChild(this.progressBar);}}}else{document.body.appendChild(this.progressBar);}},i=t();return s.prototype.transit=function(){this.progressBar.style.width=this.progress+"%";},s.prototype.getProgress=function(){return this.progress;},s.prototype.setProgress=function(t,s){this.show();this.progress=t>100?100:0>t?0:t;this.transit();if(s){s();}},s.prototype.increase=function(t,s){this.show();this.setProgress(this.progress+t,s);},s.prototype.decrease=function(t,s){this.show();this.setProgress(this.progress-t,s);},s.prototype.finish=function(t){var s=this;this.setProgress(100,t);this.hide();if(i){this.progressBar.addEventListener(i,function(t){s.reset();s.progressBar.removeEventListener(t.type,TP);});}},s.prototype.reset=function(t){this.progress=0;this.transit();if(t){t();}},s.prototype.hide=function(){this.progressBar.style.opacity="0";},s.prototype.show=function(){this.progressBar.style.opacity="1";},s;};return TP();}());root.ToProgress=ToProgress;}(globalRoot));
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
var userBrowsingDetails = " [" + (earlyFnGetYyyymmdd ? earlyFnGetYyyymmdd : "") + (earlyDeviceType ? " " + earlyDeviceType : "") + (earlyDeviceSize ? " " + earlyDeviceSize : "") + (earlyDeviceOrientation ? " " + earlyDeviceOrientation : "") + (earlySvgSupport ? " " + earlySvgSupport : "") + (earlySvgasimgSupport ? " " + earlySvgasimgSupport : "") + (earlyHasTouch ? " " + earlyHasTouch : "") + "]";
if (document.title) {
	document.title = document.title + userBrowsingDetails;
}
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
(function(root){"use strict";var d=root.document;d.ready=function(chainVal){var loaded=(/^loaded|^i|^c/).test(d.readyState),DOMContentLoaded="DOMContentLoaded",load="load";return new Promise(function(resolve){if(loaded){return resolve(chainVal);}function onReady(){resolve(chainVal);d.removeEventListener(DOMContentLoaded,onReady);root.removeEventListener(load,onReady);}d.addEventListener(DOMContentLoaded,onReady);root.addEventListener(load,onReady);});};}(globalRoot));
/*!
 * How can I check if a JS file has been included already?
 * @see {@link https://gist.github.com/englishextra/403a0ca44fc5f495400ed0e20bc51d47}
 * @see {@link https://stackoverflow.com/questions/18155347/how-can-i-check-if-a-js-file-has-been-included-already}
 * @param {String} s path string
 * scriptIsLoaded(s)
 */
(function(root){"use strict";var scriptIsLoaded=function(s){for(var b=document.getElementsByTagName("script")||"",a=0;a<b.length;a+=1){if(b[a].getAttribute("src")===s){return!0;}}return!1;};root.scriptIsLoaded=scriptIsLoaded;}(globalRoot));
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
(function(root){"use strict";var appendFragment=function(e,a){var d=document;a=a||d.getElementsByTagNames("body")[0]||"";return (function(){if(e){var d=document,df=d.createDocumentFragment()||"",appendChild="appendChild";if("string"===typeof e){e=d.createTextNode(e);}df[appendChild](e);a[appendChild](df);}}());};root.appendFragment=appendFragment;}(globalRoot));
/*!
 * set style display block of an element
 * @param {Object} a an HTML Element
 * setStyleDisplayBlock(a)
 */
(function(root){var setStyleDisplayBlock=function(a){return (function(){if(a){a.style.display="block";}}());};root.setStyleDisplayBlock=setStyleDisplayBlock;}(globalRoot));
/*!
 * set style display none of an element
 * @param {Object} a an HTML Element
 * setStyleDisplayNone(a)
 */
(function(root){var setStyleDisplayNone=function(a){return (function(){if(a){a.style.display="none";}}());};root.setStyleDisplayNone=setStyleDisplayNone;}(globalRoot));
/*!
 * set style opacity of an element
 * @param {Object} a an HTML Element
 * @param {Number} n any positive decimal number 0.00-1.00
 * setStyleOpacity(a,n)
 */
(function(root){var setStyleOpacity=function(a,n){n=n||1;return (function(){if(a){a.style.opacity=n;}}());};root.setStyleOpacity=setStyleOpacity;}(globalRoot));
/*!
 * set style visibility visible of an element
 * @param {Object} a an HTML Element
 * setStyleVisibilityVisible(a)
 */
(function(root){var setStyleVisibilityVisible=function(a){return (function(){if(a){a.style.visibility="visible";}}());};root.setStyleVisibilityVisible=setStyleVisibilityVisible;}(globalRoot));
/*!
 * set style visibility hidden of an element
 * @param {Object} a an HTML Element
 * setStyleVisibilityHidden(a)
 */
(function(root){var setStyleVisibilityHidden=function(a){return (function(){if(a){a.style.visibility="hidden";}}());};root.setStyleVisibilityHidden=setStyleVisibilityHidden;}(globalRoot));
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
 * get current protocol - "http" or "https", else return ""
 * @param {Boolean} [force] When set to "true", and the result is empty,
 * the function will return "http"
 * getHTTP(true)
 */
(function(root){"use strict";var getHTTP=(function(type){return function(force){force=force||"";return"http:"===type?"http":"https:"===type?"https":force?"http":"";};}(root.location.protocol||""));root.getHTTP=getHTTP;}(globalRoot));
/*!
 * Open external links in default browser out of Electron / nwjs
 * @see {@link https://gist.github.com/englishextra/b9a8140e1c1b8aa01772375aeacbf49b}
 * @see {@link https://stackoverflow.com/questions/32402327/how-can-i-force-external-links-from-browser-window-to-open-in-a-default-browser}
 * @see {@link https://github.com/nwjs/nw.js/wiki/shell}
 * electron - file: | nwjs - chrome-extension: | http: Intel XDK
 * wont do in electron and nw,
 * so manageExternalLinkAll will set target blank to links
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
 * init ToProgress and extend methods
 */
var progressBar = new ToProgress({
		id : "top-progress-bar",
		color : "#FF2C40",
		height : "3px",
		duration : 0.2
	});
/*!
 * @memberof progressBar
 * @param {Int} [n] a whole positive number
 * progressBar.init(n)
 */
progressBar.init = function (state) {
	state = state || 20;
	return this.increase(state);
};
/*!
 * @memberof progressBar
 * progressBar.complete()
 */
progressBar.complete = function () {
	return this.finish(),
	this.hide();
};
progressBar.init();
/*!
 * set click event on external links,
 * so that they open in new browser tab
 * @param {Object} [ctx] context HTML Element
 */
var handleExternalLink = function (url, ev) {
	"use strict";
	ev.stopPropagation();
	ev.preventDefault();
	var logicHandleExternalLink = openDeviceBrowser.bind(null, url);
	var debounceLogicHandleExternalLink = debounce(logicHandleExternalLink, 200);
	debounceLogicHandleExternalLink();
},
manageExternalLinkAll = function (scope) {
	"use strict";
	var ctx = scope && scope.nodeName ? scope : "";
	var d = document;
	var getElementsByTagName = "getElementsByTagName";
	var getAttribute = "getAttribute";
	var classList = "classList";
	var _addEventListener = "addEventListener";
	var linkTag = "a";
	var link = ctx ? ctx[getElementsByTagName](linkTag) || "" : d[getElementsByTagName](linkTag) || "";
	var isBindedClass = "is-binded";
	var arrange = function (e) {
		if (!e[classList].contains(isBindedClass)) {
			var url = e[getAttribute]("href") || "";
			if (url && parseLink(url).isCrossDomain && parseLink(url).hasHTTP) {
				e.title = "" + (parseLink(url).hostname || "") + " откроется в новой вкладке";
				if ("undefined" !== typeof getHTTP && getHTTP()) {
					e.target = "_blank";
					e.rel = "noopener";
				} else {
					e[_addEventListener]("click", handleExternalLink.bind(null, url));
				}
				e[classList].add(isBindedClass);
			}
		}
	};
	if (link) {
		for (var i = 0, l = link.length; i < l; i += 1) {
			arrange(link[i]);
		}
		/* forEach(link, arrange, false); */
	}
};
document.ready().then(manageExternalLinkAll);
/*!
 * hide ui buttons in fullscreen mode
 */
var hideUiBtnsInFullScreen = function () {
	"use strict";
	var w = globalRoot;
	var d = document;
	var getElementsByClassName = "getElementsByClassName";
	var cdPrev = d[getElementsByClassName]("cd-prev")[0] || "";
	var cdNext = d[getElementsByClassName]("cd-next")[0] || "",
	btnNavMenu = d[getElementsByClassName]("btn-nav-menu")[0] || "",
	btnMenuMore = d[getElementsByClassName]("btn-menu-more")[0] || "",
	btnShowVKLike = d[getElementsByClassName]("btn-show-vk-like")[0] || "",
	btnShareButtons = d[getElementsByClassName]("btn-share-buttons")[0] || "",
	btnUiTotop = d[getElementsByClassName]("ui-totop")[0] || "",
	holderSearchForm = d[getElementsByClassName]("holder-search-form")[0] || "";
	var jsUrl = getHTTP(true) + "://vk.com/js/api/openapi.js?122",
	f = !1;
	if (!f) {
		f = !0;
		/*!
		 * Detecting if a browser is in full screen mode
		 * @see {@link https://stackoverflow.com/questions/2863351/checking-if-browser-is-in-fullscreen}
		 * @see {@link https://stackoverflow.com/questions/1047319/detecting-if-a-browser-is-in-full-screen-mode}
		 */
		var args = [cdPrev, cdNext, btnNavMenu, btnMenuMore, btnShareButtons, btnUiTotop, holderSearchForm];
		if ((w.navigator.standalone) || (screen.height === w.outerHeight) || (w.fullScreen) || (w.innerWidth === screen.width && w.innerHeight === screen.height)) {
			for (var i = 0, l = args.length; i < l; i += 1) {
				setStyleDisplayNone(args[i]);
			}
			setStyleDisplayNone(btnShowVKLike);
		} else {
			for (var j = 0, m = args.length; j < m; j += 1) {
				setStyleDisplayBlock(args[j]);
			}
			if (!scriptIsLoaded(jsUrl)) {
				setStyleDisplayBlock(btnShowVKLike);
			}
		}
	}
},
resizeHideUiBtnsInFullScreen = function () {
	"use strict";
	var w = globalRoot;
	var _addEventListener = "addEventListener";
	if ("undefined" !== typeof earlyDeviceType && "desktop" === earlyDeviceType) {
		hideUiBtnsInFullScreen();
		w[_addEventListener]("resize", hideUiBtnsInFullScreen);
	}
};
document.ready().then(resizeHideUiBtnsInFullScreen);
/*!
 * init DoSlide
 * A simple slider.
 * @see {@link https://github.com/MopTym/doSlide/blob/master/demo/3_1_slider.html}
 */
var initDoSlide = function () {
	"use strict";
	var w = globalRoot;
	var d = document;
	var getElementsByClassName = "getElementsByClassName";
	var _addEventListener = "addEventListener";
	var dsContainerSelector = ".ds-container";
	var dsContainer = d[getElementsByClassName]("ds-container")[0] || "";
	var cdPrev = d[getElementsByClassName]("cd-prev")[0] || "";
	var cdNext = d[getElementsByClassName]("cd-next")[0] || "";
	var initScript = function () {
		var slide = new DoSlide(dsContainerSelector, {
			duration : 2000,
			horizontal : true,
			infinite : true
		});
		var timer = function (slide, interval, token) {
			var next = function () {
				token = setTimeout(next, interval);
				if (!(d.hidden || d.webkitHidden)) {
					slide.next();
				}
			};
			return function () {
				clearTimeout(token);
				token = setTimeout(next, interval);
			};
		};
		var slideTimer = timer(slide, 5000);
		var handleCdPrev = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			slide.prev();
		};
		var handleCdNext = function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			slide.next();
		};
		if (w.DoSlide) {
			/*!
			 * dont JSMin line below: Notepad++ will freeze
			 * comment out if you dont want slide autorotation
			 */
			slide.onChanged(slideTimer).do(slideTimer);
			/*!
			 * init next button if no slide autorotation
			 */
			setStyleDisplayBlock(cdPrev);
			setStyleDisplayBlock(cdNext);
			cdPrev[_addEventListener]("click", handleCdPrev);
			cdNext[_addEventListener]("click", handleCdNext);
		}
	};
	if (dsContainer && cdPrev && cdNext) {
		var jsUrl = "../../cdn/doSlide/1.1.4/js/do-slide.fixed.min.js";
		if (!scriptIsLoaded(jsUrl)) {
			loadJS(jsUrl, initScript);
		}
	}
};
document.ready().then(initDoSlide);
/*!
 * init qr-code
 * @see {@link https://stackoverflow.com/questions/12777622/how-to-use-enquire-js}
 */
var manageLocationQrCodeImage = function () {
	"use strict";
	var w = globalRoot;
	var d = document;
	var getElementsByClassName = "getElementsByClassName";
	var classList = "classList";
	var createElement = "createElement";
	var holder = d[getElementsByClassName]("holder-location-qr-code")[0] || "";
	var locationHref = w.location.href || "";
	var initScript = function () {
		var locationHref = w.location.href || "";
		var img = d[createElement]("img");
		var imgTitle = d.title ? ("Ссылка на страницу «" + d.title.replace(/\[[^\]]*?\]/g, "").trim() + "»") : "";
		var imgSrc = getHTTP(true) + "://chart.googleapis.com/chart?cht=qr&chld=M%7C4&choe=UTF-8&chs=300x300&chl=" + encodeURIComponent(locationHref);
		img.alt = imgTitle;
		if (w.QRCode) {
			if ("undefined" !== typeof earlySvgSupport && "svg" === earlySvgSupport) {
				imgSrc = QRCode.generateSVG(locationHref, {
						ecclevel: "M",
						fillcolor: "#FFFFFF",
						textcolor: "#191919",
						margin: 4,
						modulesize: 8
					});
				var XMLS = new XMLSerializer();
				imgSrc = XMLS.serializeToString(imgSrc);
				imgSrc = "data:image/svg+xml;base64," + w.btoa(unescape(encodeURIComponent(imgSrc)));
				img.src = imgSrc;
			} else {
				imgSrc = QRCode.generatePNG(locationHref, {
						ecclevel: "M",
						format: "html",
						fillcolor: "#FFFFFF",
						textcolor: "#191919",
						margin: 4,
						modulesize: 8
					});
				img.src = imgSrc;
			}
		} else {
			img.src = imgSrc;
		}
		img[classList].add("qr-code-img");
		img.title = imgTitle;
		removeChildren(holder);
		appendFragment(img, holder);
	};
	if (holder && locationHref) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			var jsUrl = "../../cdn/qrjs2/0.1.6/js/qrjs2.fixed.min.js";
			if (!scriptIsLoaded(jsUrl)) {
				loadJS(jsUrl, initScript);
			}
		}
	}
};
document.ready().then(manageLocationQrCodeImage);
/*!
 * init menu-more
 */
var initMenuMore = function () {
	"use strict";
	var d = document;
	var getElementById = "getElementById";
	var getElementsByClassName = "getElementsByClassName";
	var getElementsByTagName = "getElementsByTagName";
	var classList = "classList";
	var _addEventListener = "addEventListener";
	var container = d[getElementById]("container") || "";
	var page = d[getElementById]("page") || "";
	var holderPanelMenuMore = d[getElementsByClassName]("holder-panel-menu-more")[0] || "";
	var btnMenuMore = d[getElementsByClassName]("btn-menu-more")[0] || "";
	var panelMenuMore = d[getElementsByClassName]("panel-menu-more")[0] || "";
	var panelMenuMoreItems = panelMenuMore ? panelMenuMore[getElementsByTagName]("li") || "" : "";
	var panelNavMenu = d[getElementsByClassName]("panel-nav-menu")[0] || "";
	var isActiveClass = "is-active";
	var handleItem = function () {
		page[classList].remove(isActiveClass);
		holderPanelMenuMore[classList].remove(isActiveClass);
		if (panelNavMenu && panelNavMenu[classList].contains(isActiveClass)) {
			panelNavMenu[classList].remove(isActiveClass);
		}
	};
	var addContainerHandler = function () {
		container[_addEventListener]("click", handleItem);
	};
	var addBtnHandler = function () {
		var handleBtnMenuMore = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			holderPanelMenuMore[classList].toggle(isActiveClass);
		};
		btnMenuMore[_addEventListener]("click", handleBtnMenuMore);
	};
	var addItemHandlerAll = function () {
		var addItemHandler = function (e) {
			e[_addEventListener]("click", handleItem);
		};
		for (var i = 0, l = panelMenuMoreItems.length; i < l; i += 1) {
			addItemHandler(panelMenuMoreItems[i]);
		}
		/* forEach(panelMenuMoreItems, addItemHandler, false); */
	};
	if (page && container && holderPanelMenuMore && btnMenuMore && panelMenuMore && panelMenuMoreItems) {
		/*!
		 * hide menu more on outside click
		 */
		addContainerHandler();
		/*!
		 * show or hide menu more
		 */
		addBtnHandler();
		/*!
		 * hide menu more on item clicked
		 */
		addItemHandlerAll();
	}
};
document.ready().then(initMenuMore);
/*!
 * show menu-more on document ready
 */
var showMenuMore = function () {
	"use strict";
	var d = document;
	var getElementsByClassName = "getElementsByClassName";
	var classList = "classList";
	var holderPanelMenuMore = d[getElementsByClassName]("holder-panel-menu-more")[0] || "";
	var isActiveClass = "is-active";
	if (holderPanelMenuMore) {
		var timers = new Timers();
		timers.timeout(function () {
			timers.clear();
			timers = null;
			holderPanelMenuMore[classList].add(isActiveClass);
		}, 2000);
	}
};
document.ready().then(showMenuMore);
/*!
 * init share btn
 * class ya-share2 automatically triggers Ya.share2,
 * so use either default class ya-share2 or custom id
 * ya-share2 class will be added if you init share block
 * via ya-share2 api
 * @see {@link https://tech.yandex.ru/share/doc/dg/api-docpage/}
 */
var yshare;
var manageShareButton = function () {
	"use strict";
	var w = globalRoot;
	var d = document;
	var getElementById = "getElementById";
	var getElementsByClassName = "getElementsByClassName";
	var _addEventListener = "addEventListener";
	var btn = d[getElementsByClassName]("btn-share-buttons")[0] || "";
	var yaShare2Id = "ya-share2";
	var yaShare2 = d[getElementById](yaShare2Id) || "";
	var handleShareButton = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var initScript = function () {
			if (w.Ya) {
				try {
					if (yshare) {
						yshare.updateContent({
							title: d.title || "",
							description: d.title || "",
							url: w.location.href || ""
						});
					} else {
						yshare = Ya.share2(yaShare2Id, {
							content: {
								title: d.title || "",
								description: d.title || "",
								url: w.location.href || ""
							}
						});
					}
					setStyleVisibilityVisible(yaShare2);
					setStyleOpacity(yaShare2, 1);
					setStyleDisplayNone(btn);
				} catch (err) {
					console.log("cannot update or init Ya", err);
				}
			}
		};
		var jsUrl = getHTTP(true) + "://yastatic.net/share2/share.js";
		if (!scriptIsLoaded(jsUrl)) {
			loadJS(jsUrl, initScript);
		}
	};
	if (btn && yaShare2) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			btn[_addEventListener]("click", handleShareButton);
		} else {
			setStyleDisplayNone(btn);
		}
	}
};
document.ready().then(manageShareButton);
/*!
 * init vk-like on click
 */
var manageVKLikeButton = function () {
	"use strict";
	var w = globalRoot;
	var d = document;
	var getElementById = "getElementById";
	var getElementsByClassName = "getElementsByClassName";
	var dataset = "dataset";
	var _addEventListener = "addEventListener";
	var _removeEventListener = "removeEventListener";
	var VKLikeId = "vk-like";
	var vkLike = d[getElementById](VKLikeId) || "";
	var btn = d[getElementsByClassName]("btn-show-vk-like")[0] || "";
	var handleVKLikeButton = function (ev) {
		ev.stopPropagation();
		ev.preventDefault();
		btn[_removeEventListener]("click", handleVKLikeButton);
		setStyleVisibilityVisible(vkLike);
		setStyleOpacity(vkLike, 1);
		setStyleDisplayNone(btn);
		var initScript = function () {
			if (w.VK) {
				try {
					VK.init({
						apiId: (vkLike[dataset].apiid || ""),
						nameTransportPath: "/xd_receiver.htm",
						onlyWidgets: true
					});
					VK.Widgets.Like(VKLikeId, {
						type: "button",
						height: 24
					});
				} catch (err) {
					console.log("cannot init VK", err);
				}
			}
		};
		var jsUrl = getHTTP(true) + "://vk.com/js/api/openapi.js?122";
		if (!scriptIsLoaded(jsUrl)) {
			loadJS(jsUrl, initScript);
		}
	};
	if (btn && vkLike) {
		if ("undefined" !== typeof getHTTP && getHTTP()) {
			btn[_addEventListener]("click", handleVKLikeButton);
		} else {
			setStyleDisplayNone(btn);
		}
	}
};
document.ready().then(manageVKLikeButton);
/*!
 * init manUP.js
 */
/* var initManUp = function () {
	"use strict";
	if ("undefined" !== typeof getHTTP && getHTTP()) {
		var jsUrl = "/cdn/ManUp.js/0.7/js/manup.fixed.min.js";
		if (!scriptIsLoaded(jsUrl)) {
			loadJS(jsUrl);
		}
	}
};
document.ready().then(initManUp); */
/*!
 * show page, finish ToProgress
 */
var showPageFinishProgress = function () {
	"use strict";
	var d = document;
	var getElementById = "getElementById";
	var container = d[getElementById]("container") || "";
	if (container) {
		setStyleOpacity(container, 1);
		progressBar.increase(20);
	}
};
document.ready().then(showPageFinishProgress);
globalRoot.addEventListener("load", function () {
	progressBar.complete();
});
