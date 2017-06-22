/*jslint browser: true */
/*jslint node: true */
/*global global, $, ActiveXObject, alignToMasterBottomLeft, appendFragment, BALA, 
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
scriptIsLoaded, scroll2Top, scrollToTop, 
setImmediate, setStyleDisplayBlock, setStyleDisplayNone, 
setStyleOpacity, setStyleVisibilityHidden, setStyleVisibilityVisible, t, 
Tablesort, throttle, Timers, ToProgress, truncString, unescape, verge, 
VK, Ya, ymaps */
/*!
 * define global root
 */
/* var globalRoot = "object" === typeof window && window || "object" === typeof self && self || "object" === typeof global && global || {}; */
var globalRoot = "undefined" !== typeof window ? window : this;
/*!
 * safe way to handle console.log
 * @see {@link https://github.com/paulmillr/console-polyfill}
 */
(function (root) {
	"use strict";
	if (!root.console) {
		root.console = {};
	}var con = root.console;var prop, method;var dummy = function () {};var properties = ["memory"];var methods = ("assert,clear,count,debug,dir,dirxml,error,exception,group," + "groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd," + "show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");while (prop = properties.pop()) {
		if (!con[prop]) {
			con[prop] = {};
		}
	}while (method = methods.pop()) {
		if (!con[method]) {
			con[method] = dummy;
		}
	}
})(globalRoot);
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
(function (root) {
	"use strict";
	var ToProgress = function () {
		var TP = function () {
			var t = function () {
				var s = document.createElement("fakeelement"),
				    i = { transition: "transitionend", OTransition: "oTransitionEnd", MozTransition: "transitionend", WebkitTransition: "webkitTransitionEnd" };for (var j in i) {
					if (i.hasOwnProperty(j)) {
						if (void 0 !== s.style[j]) {
							return i[j];
						}
					}
				}
			},
			    s = function (t, a) {
				if (this.progress = 0, this.options = { id: "top-progress-bar", color: "#F44336", height: "2px", duration: 0.2 }, t && "object" === typeof t) {
					for (var i in t) {
						if (t.hasOwnProperty(i)) {
							this.options[i] = t[i];
						}
					}
				}if (this.options.opacityDuration = 3 * this.options.duration, this.progressBar = document.createElement("div"), this.progressBar.id = this.options.id, this.progressBar.setCSS = function (t) {
					for (var a in t) {
						if (t.hasOwnProperty(a)) {
							this.style[a] = t[a];
						}
					}
				}, this.progressBar.setCSS({ position: a ? "relative" : "fixed", top: "0", left: "0", right: "0", "background-color": this.options.color, height: this.options.height, width: "0%", transition: "width " + this.options.duration + "s, opacity " + this.options.opacityDuration + "s", "-moz-transition": "width " + this.options.duration + "s, opacity " + this.options.opacityDuration + "s", "-webkit-transition": "width " + this.options.duration + "s, opacity " + this.options.opacityDuration + "s" }), a) {
					var o = document.querySelector(a);if (o) {
						if (o.hasChildNodes()) {
							o.insertBefore(this.progressBar, o.firstChild);
						} else {
							o.appendChild(this.progressBar);
						}
					}
				} else {
					document.body.appendChild(this.progressBar);
				}
			},
			    i = t();return s.prototype.transit = function () {
				this.progressBar.style.width = this.progress + "%";
			}, s.prototype.getProgress = function () {
				return this.progress;
			}, s.prototype.setProgress = function (t, s) {
				this.show();this.progress = t > 100 ? 100 : 0 > t ? 0 : t;this.transit();if (s) {
					s();
				}
			}, s.prototype.increase = function (t, s) {
				this.show();this.setProgress(this.progress + t, s);
			}, s.prototype.decrease = function (t, s) {
				this.show();this.setProgress(this.progress - t, s);
			}, s.prototype.finish = function (t) {
				var s = this;this.setProgress(100, t);this.hide();if (i) {
					this.progressBar.addEventListener(i, function (t) {
						s.reset();s.progressBar.removeEventListener(t.type, TP);
					});
				}
			}, s.prototype.reset = function (t) {
				this.progress = 0;this.transit();if (t) {
					t();
				}
			}, s.prototype.hide = function () {
				this.progressBar.style.opacity = "0";
			}, s.prototype.show = function () {
				this.progressBar.style.opacity = "1";
			}, s;
		};return TP();
	}();root.ToProgress = ToProgress;
})(globalRoot);
/*!
 * modified scrollToY
 * @see {@link http://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation}
 * passes jshint
 */
(function (root) {
	"use strict";
	var scroll2Top = function (scrollTargetY, speed, easing) {
		var scrollY = root.scrollY || document.documentElement.scrollTop;scrollTargetY = scrollTargetY || 0;speed = speed || 2000;easing = easing || 'easeOutSine';var currentTime = 0;var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8));var easingEquations = { easeOutSine: function (pos) {
				return Math.sin(pos * (Math.PI / 2));
			}, easeInOutSine: function (pos) {
				return -0.5 * (Math.cos(Math.PI * pos) - 1);
			}, easeInOutQuint: function (pos) {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}return 0.5 * (Math.pow(pos - 2, 5) + 2);
			} };function tick() {
			currentTime += 1 / 60;var p = currentTime / time;var t = easingEquations[easing](p);if (p < 1) {
				requestAnimationFrame(tick);root.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
			} else {
				root.scrollTo(0, scrollTargetY);
			}
		}tick();
	};root.scroll2Top = scroll2Top;
})(globalRoot);
/*!
 * A function for elements selection - v0.1.9
 * @see {@link https://github.com/finom/bala}
 * @param {String} a id, class or tag string
 * @param {String|Object} [b] context tag string or HTML Element object
 * a=BALA("sometag/#someid/.someclass"[,someParent]);
 * a=BALA.one("sometag/#someid/.someclass"[,someParent]);
 * global $ becomes var g
 * renamed function $ to g
 * @see {@link https://github.com/finom/bala/blob/master/bala.js}
 * passes jshint
 */
(function (root) {
	"use strict";
	var BALA = function () {
		var g = function (document, s_addEventListener, s_querySelectorAll) {
			function g(s, context, bala) {
				bala = Object.create(g.fn);if (s) {
					bala.push.apply(bala, s[s_addEventListener] ? [s] : "" + s === s ? /</.test(s) ? ((context = document.createElement(context || s_addEventListener)).innerHTML = s, context.children) : context ? (context = g(context)[0]) ? context[s_querySelectorAll](s) : bala : document[s_querySelectorAll](s) : typeof s === "function" ? document.readyState[7] ? s() : document[s_addEventListener]('DOMContentLoaded', s) : s);
				}return bala;
			}g.fn = [];g.one = function (s, context) {
				return g(s, context)[0] || null;
			};return g;
		}(document, 'addEventListener', 'querySelectorAll');return g;
	}();root.BALA = BALA;
})(globalRoot);
/*!
 * Super lightweight script (~1kb) to detect via Javascript events like
 * 'tap' 'dbltap' "swipeup" "swipedown" "swipeleft" "swiperight"
 * on any kind of device.
 * Version: 2.0.1
 * Author: Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 * Copyright (c) Gianluca Guarini
 * @see {@link https://github.com/GianlucaGuarini/Tocca.js/blob/master/Tocca.js}
 * passes jshint
 */
(function (doc, win) {
	"use strict";
	if (typeof doc.createEvent !== "function") {
		return false;
	}var pointerEventSupport = function (type) {
		var lo = type.toLowerCase(),
		    ms = "MS" + type;return navigator.msPointerEnabled ? ms : win.PointerEvent ? lo : false;
	},
	    defaults = { useJquery: !win.IGNORE_JQUERY && typeof jQuery !== "undefined", swipeThreshold: win.SWIPE_THRESHOLD || 100, tapThreshold: win.TAP_THRESHOLD || 150, dbltapThreshold: win.DBL_TAP_THRESHOLD || 200, longtapThreshold: win.LONG_TAP_THRESHOLD || 1000, tapPrecision: win.TAP_PRECISION / 2 || 60 / 2, justTouchEvents: win.JUST_ON_TOUCH_DEVICES },
	    wasTouch = false,
	    touchevents = { touchstart: pointerEventSupport("PointerDown") || "touchstart", touchend: pointerEventSupport("PointerUp") || "touchend", touchmove: pointerEventSupport("PointerMove") || "touchmove" },
	    isTheSameFingerId = function (e) {
		return !e.pointerId || typeof pointerId === "undefined" || e.pointerId === pointerId;
	},
	    setListener = function (elm, events, callback) {
		var eventsArray = events.split(" "),
		    i = eventsArray.length;while (i--) {
			elm.addEventListener(eventsArray[i], callback, false);
		}
	},
	    getPointerEvent = function (event) {
		return event.targetTouches ? event.targetTouches[0] : event;
	},
	    getTimestamp = function () {
		return new Date().getTime();
	},
	    sendEvent = function (elm, eventName, originalEvent, data) {
		var customEvent = doc.createEvent("Event");customEvent.originalEvent = originalEvent;data = data || {};data.x = currX;data.y = currY;data.distance = data.distance;if (defaults.useJquery) {
			customEvent = jQuery.Event(eventName, { originalEvent: originalEvent });jQuery(elm).trigger(customEvent, data);
		}if (customEvent.initEvent) {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					customEvent[key] = data[key];
				}
			}customEvent.initEvent(eventName, true, true);elm.dispatchEvent(customEvent);
		}while (elm) {
			if (elm["on" + eventName]) {
				elm["on" + eventName](customEvent);
			}elm = elm.parentNode;
		}
	},
	    onTouchStart = function (e) {
		if (!isTheSameFingerId(e)) {
			return;
		}pointerId = e.pointerId;if (e.type !== "mousedown") {
			wasTouch = true;
		}if (e.type === "mousedown" && wasTouch) {
			return;
		}var pointer = getPointerEvent(e);cachedX = currX = pointer.pageX;cachedY = currY = pointer.pageY;longtapTimer = setTimeout(function () {
			sendEvent(e.target, "longtap", e);target = e.target;
		}, defaults.longtapThreshold);timestamp = getTimestamp();tapNum++;
	},
	    onTouchEnd = function (e) {
		if (!isTheSameFingerId(e)) {
			return;
		}pointerId = undefined;if (e.type === "mouseup" && wasTouch) {
			wasTouch = false;return;
		}var eventsArr = [],
		    now = getTimestamp(),
		    deltaY = cachedY - currY,
		    deltaX = cachedX - currX;clearTimeout(dblTapTimer);clearTimeout(longtapTimer);if (deltaX <= -defaults.swipeThreshold) {
			eventsArr.push("swiperight");
		}if (deltaX >= defaults.swipeThreshold) {
			eventsArr.push("swipeleft");
		}if (deltaY <= -defaults.swipeThreshold) {
			eventsArr.push("swipedown");
		}if (deltaY >= defaults.swipeThreshold) {
			eventsArr.push("swipeup");
		}if (eventsArr.length) {
			for (var i = 0; i < eventsArr.length; i++) {
				var eventName = eventsArr[i];sendEvent(e.target, eventName, e, { distance: { x: Math.abs(deltaX), y: Math.abs(deltaY) } });
			}tapNum = 0;
		} else {
			if (cachedX >= currX - defaults.tapPrecision && cachedX <= currX + defaults.tapPrecision && cachedY >= currY - defaults.tapPrecision && cachedY <= currY + defaults.tapPrecision) {
				if (timestamp + defaults.tapThreshold - now >= 0) {
					sendEvent(e.target, tapNum >= 2 && target === e.target ? "dbltap" : "tap", e);target = e.target;
				}
			}dblTapTimer = setTimeout(function () {
				tapNum = 0;
			}, defaults.dbltapThreshold);
		}
	},
	    onTouchMove = function (e) {
		if (!isTheSameFingerId(e)) {
			return;
		}if (e.type === "mousemove" && wasTouch) {
			return;
		}var pointer = getPointerEvent(e);currX = pointer.pageX;currY = pointer.pageY;
	},
	    tapNum = 0,
	    pointerId,
	    currX,
	    currY,
	    cachedX,
	    cachedY,
	    timestamp,
	    target,
	    dblTapTimer,
	    longtapTimer;setListener(doc, touchevents.touchstart + (defaults.justTouchEvents ? "" : " mousedown"), onTouchStart);setListener(doc, touchevents.touchend + (defaults.justTouchEvents ? "" : " mouseup"), onTouchEnd);setListener(doc, touchevents.touchmove + (defaults.justTouchEvents ? "" : " mousemove"), onTouchMove);win.tocca = function (options) {
		for (var opt in options) {
			if (options.hasOwnProperty(opt)) {
				defaults[opt] = options[opt];
			}
		}return defaults;
	};
})(document, globalRoot);
/*!
 * safe way to handle console.log
 * @see {@link https://github.com/paulmillr/console-polyfill}
 */
(function (root) {
	"use strict";
	if (!root.console) {
		root.console = {};
	}var con = root.console;var prop, method;var dummy = function () {};var properties = ["memory"];var methods = ("assert,clear,count,debug,dir,dirxml,error,exception,group," + "groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd," + "show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");while (prop = properties.pop()) {
		if (!con[prop]) {
			con[prop] = {};
		}
	}while (method = methods.pop()) {
		if (!con[method]) {
			con[method] = dummy;
		}
	}
})(globalRoot);
/*!
 * add js class to html element
 */
(function (classes) {
	"use strict";
	if (classes) {
		classes.add("js");
	}
})(document.documentElement.classList || "");
/*!
 * modified MediaHack - (c) 2013 Pomke Nohkan MIT LICENCED.
 * @see {@link https://gist.github.com/englishextra/ff8c9dde94abe32a9d7c4a65e0f2ccac}
 * @see {@link https://jsfiddle.net/englishextra/xg7ce8kc/}
 * removed className fallback and additionally
 * returns earlyDeviceOrientation,earlyDeviceSize
 * Add media query classes to DOM nodes
 * @see {@link https://github.com/pomke/mediahack/blob/master/mediahack.js}
 */
(function (root, selectors) {
	"use strict";
	var orientation,
	    size,
	    f = function (a) {
		var b = a.split(" ");if (selectors) {
			for (var c = 0; c < b.length; c += 1) {
				a = b[c];selectors.add(a);
			}
		}
	},
	    g = function (a) {
		var b = a.split(" ");if (selectors) {
			for (var c = 0; c < b.length; c += 1) {
				a = b[c];selectors.remove(a);
			}
		}
	},
	    h = { landscape: "all and (orientation:landscape)", portrait: "all and (orientation:portrait)" },
	    k = { small: "all and (max-width:768px)", medium: "all and (min-width:768px) and (max-width:991px)", large: "all and (min-width:992px)" },
	    d,
	    mM = "matchMedia",
	    m = "matches",
	    o = function (a, b) {
		var c = function (a) {
			if (a[m]) {
				f(b);orientation = b;
			} else {
				g(b);
			}
		};c(a);a.addListener(c);
	},
	    s = function (a, b) {
		var c = function (a) {
			if (a[m]) {
				f(b);size = b;
			} else {
				g(b);
			}
		};c(a);a.addListener(c);
	};for (d in h) {
		if (h.hasOwnProperty(d)) {
			o(root[mM](h[d]), d);
		}
	}for (d in k) {
		if (k.hasOwnProperty(d)) {
			s(root[mM](k[d]), d);
		}
	}root.earlyDeviceOrientation = orientation || "";root.earlyDeviceSize = size || "";
})(globalRoot, document.documentElement.classList || "");
/*!
 * add mobile or desktop class
 * using Detect Mobile Browsers | Open source mobile phone detection
 * Regex updated: 1 August 2014
 * detectmobilebrowsers.com
 * @see {@link https://github.com/heikojansen/plack-middleware-detectmobilebrowsers}
 */
(function (root, html, mobile, desktop, opera) {
	"use strict";
	var selector = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(opera.substr(0, 4)) ? mobile : desktop;if (html) {
		html.classList.add(selector);
	}root.earlyDeviceType = selector || "";
})(globalRoot, document.documentElement || "", "mobile", "desktop", navigator.userAgent || navigator.vendor || globalRoot.opera);
/*!
 * add svg support class
 */
(function (root, html, selector) {
	"use strict";
	selector = document.implementation.hasFeature("http://www.w3.org/2000/svg", "1.1") ? selector : "no-" + selector;if (html) {
		html.classList.add(selector);
	}root.earlySvgSupport = selector || "";
})(globalRoot, document.documentElement || "", "svg");
/*!
 * add svgasimg support class
 */
(function (root, html, selector) {
	"use strict";
	selector = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") ? selector : "no-" + selector;if (html) {
		html.classList.add(selector);
	}root.earlySvgasimgSupport = selector || "";
})(globalRoot, document.documentElement || "", "svgasimg");
/*!
 * add touch support class
 * @see {@link https://gist.github.com/englishextra/3cb22aab31a52b6760b5921e4fe8db95}
 * @see {@link https://jsfiddle.net/englishextra/z5xhjde8/}
 */
(function (root, html, selector) {
	"use strict";
	selector = "ontouchstart" in html ? selector : "no-" + selector;if (html) {
		html.classList.add(selector);
	}root.earlyHasTouch = selector || "";
})(globalRoot, document.documentElement || "", "touch");
/*!
 * return date in YYYY-MM-DD format
 */
(function (root) {
	"use strict";
	var newDate = new Date(),
	    newDay = newDate.getDate(),
	    newYear = newDate.getFullYear(),
	    newMonth = newDate.getMonth();newMonth += 1;if (10 > newDay) {
		newDay = "0" + newDay;
	}if (10 > newMonth) {
		newMonth = "0" + newMonth;
	}root.earlyFnGetYyyymmdd = newYear + "-" + newMonth + "-" + newDay;
})(globalRoot);
/*!
 * append details to title
 */
var userBrowsingDetails = " [" + (earlyFnGetYyyymmdd ? earlyFnGetYyyymmdd : "") + (earlyDeviceType ? " " + earlyDeviceType : "") + (earlyDeviceSize ? " " + earlyDeviceSize : "") + (earlyDeviceOrientation ? " " + earlyDeviceOrientation : "") + (earlySvgSupport ? " " + earlySvgSupport : "") + (earlySvgasimgSupport ? " " + earlySvgasimgSupport : "") + (earlyHasTouch ? " " + earlyHasTouch : "") + "]";
if (document.title) {
	document.title = document.title + userBrowsingDetails;
}
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
(function (root) {
	"use strict";
	root.forEach = function (arr, eachFn, doneFn) {
		var i = -1;var len = function (val) {
			val = +val;if (!isFinite(val) || !val) {
				return 0;
			}return function (left, right) {
				return left - right * Math.floor(left / right);
			}(Math.floor(val), Math.pow(2, 32));
		}(arr.length);(function next(result) {
			var async;var abort = result === false;do {
				++i;
			} while (!(i in arr) && i !== len);if (abort || i === len) {
				if (doneFn) {
					doneFn(!abort, arr);
				}return;
			}result = eachFn.call({ async: function () {
					async = true;return next;
				} }, arr[i], i, arr);if (!async) {
				next(result);
			}
		})();
	};
})(globalRoot);
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
(function (root, undefined) {
	var debounce = function (func, wait, immediate) {
		var timeout, args, context, timestamp, result;if (undefined === wait || null === wait) {
			wait = 100;
		}function later() {
			var last = Date.now() - timestamp;if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;if (!immediate) {
					result = func.apply(context, args);context = args = null;
				}
			}
		}var debounced = function () {
			context = this;args = arguments;timestamp = Date.now();var callNow = immediate && !timeout;if (!timeout) {
				timeout = setTimeout(later, wait);
			}if (callNow) {
				result = func.apply(context, args);context = args = null;
			}return result;
		};debounced.clear = function () {
			if (timeout) {
				clearTimeout(timeout);timeout = null;
			}
		};debounced.flush = function () {
			if (timeout) {
				result = func.apply(context, args);context = args = null;clearTimeout(timeout);timeout = null;
			}
		};return debounced;
	};root.debounce = debounce;
})(globalRoot);
/*!
 * modified Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 * @see {@link https://github.com/component/throttle/blob/master/index.js}
 * passes jshint
 */
(function (root, undefined) {
	var throttle = function (func, wait) {
		var ctx, args, rtn, timeoutID;var last = 0;return function throttled() {
			ctx = this;args = arguments;var delta = new Date() - last;if (!timeoutID) {
				if (delta >= wait) {
					call();
				} else {
					timeoutID = setTimeout(call, wait - delta);
				}
			}return rtn;
		};function call() {
			timeoutID = 0;last = +new Date();rtn = func.apply(ctx, args);ctx = null;args = null;
		}
	};root.throttle = throttle;
})(globalRoot);
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
(function (document, promise) {
	document.ready = promise;
})(globalRoot.document, function (chainVal) {
	"use strict";
	var d = document,
	    w = globalRoot,
	    loaded = /^loaded|^i|^c/.test(d.readyState),
	    DOMContentLoaded = "DOMContentLoaded",
	    load = "load";return new Promise(function (resolve) {
		if (loaded) {
			return resolve(chainVal);
		}function onReady() {
			resolve(chainVal);d.removeEventListener(DOMContentLoaded, onReady);w.removeEventListener(load, onReady);
		}d.addEventListener(DOMContentLoaded, onReady);w.addEventListener(load, onReady);
	});
});
/*!
 * How can I check if a JS file has been included already?
 * @see {@link https://gist.github.com/englishextra/403a0ca44fc5f495400ed0e20bc51d47}
 * @see {@link https://stackoverflow.com/questions/18155347/how-can-i-check-if-a-js-file-has-been-included-already}
 * @param {String} s path string
 * scriptIsLoaded(s)
 */
(function (root) {
	"use strict";
	var scriptIsLoaded = function (s) {
		for (var b = document.getElementsByTagName("script") || "", a = 0; a < b.length; a += 1) {
			if (b[a].getAttribute("src") === s) {
				return !0;
			}
		}return !1;
	};root.scriptIsLoaded = scriptIsLoaded;
})(globalRoot);
/*!
 * append node into other with fragment
 * @see {@link https://gist.github.com/englishextra/0ff3204d5fb285ef058d72f31e3af766}
 * @param {String|object} e an HTML Element to append
 * @param {Object} a target HTML Element
 * appendFragment(e,a)
 */
(function (root) {
	"use strict";
	var appendFragment = function (e, a) {
		var d = document;a = a || d.getElementsByTagNames("body")[0] || "";return function () {
			if (e) {
				var d = document,
				    df = d.createDocumentFragment() || "",
				    aC = "appendChild";if ("string" === typeof e) {
					e = d.createTextNode(e);
				}df[aC](e);a[aC](df);
			}
		}();
	};root.appendFragment = appendFragment;
})(globalRoot);
/*!
 * set style opacity of an element
 * @param {Object} a an HTML Element
 * @param {Number} n any positive decimal number 0.00-1.00
 * setStyleOpacity(a,n)
 */
(function (root) {
	var setStyleOpacity = function (a, n) {
		n = n || 1;return function () {
			if (a) {
				a.style.opacity = n;
			}
		}();
	};root.setStyleOpacity = setStyleOpacity;
})(globalRoot);
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
(function (root) {
	"use strict";
	var parseLink = function (url, full) {
		full = full || !1;return function () {
			var _r = function (s) {
				return s.replace(/^(#|\?)/, "").replace(/\:$/, "");
			},
			    l = location || "",
			    _p = function (protocol) {
				switch (protocol) {case "http:":
						return full ? ":" + 80 : 80;case "https:":
						return full ? ":" + 443 : 443;default:
						return full ? ":" + l.port : l.port;}
			},
			    _s = 0 === url.indexOf("//") || !!~url.indexOf("://"),
			    w = root.location || "",
			    _o = function () {
				var o = w.protocol + "//" + w.hostname + (w.port ? ":" + w.port : "");return o || "";
			},
			    _c = function () {
				var c = document.createElement("a");c.href = url;var v = c.protocol + "//" + c.hostname + (c.port ? ":" + c.port : "");return v !== _o();
			},
			    a = document.createElement("a");a.href = url;return { href: a.href, origin: _o(), host: a.host || l.host, port: "0" === a.port || "" === a.port ? _p(a.protocol) : full ? a.port : _r(a.port), hash: full ? a.hash : _r(a.hash), hostname: a.hostname || l.hostname, pathname: a.pathname.charAt(0) !== "/" ? full ? "/" + a.pathname : a.pathname : full ? a.pathname : a.pathname.slice(1), protocol: !a.protocol || ":" === a.protocol ? full ? l.protocol : _r(l.protocol) : full ? a.protocol : _r(a.protocol), search: full ? a.search : _r(a.search), query: full ? a.search : _r(a.search), isAbsolute: _s, isRelative: !_s, isCrossDomain: _c(), hasHTTP: /^(http|https):\/\//i.test(url) ? !0 : !1 };
		}();
	};root.parseLink = parseLink;
})(globalRoot);
/*jshint bitwise: true */
/*!
 * get current protocol - "http" or "https", else return ""
 * @param {Boolean} [force] When set to "true", and the result is empty,
 * the function will return "http"
 * getHTTP(true)
 */
(function (root) {
	"use strict";
	var getHTTP = function (type) {
		return function (force) {
			force = force || "";return "http:" === type ? "http" : "https:" === type ? "https" : force ? "http" : "";
		};
	}(root.location.protocol || "");root.getHTTP = getHTTP;
})(globalRoot);
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
(function (root) {
	"use strict";
	var isNodejs = "undefined" !== typeof process && "undefined" !== typeof require || "",
	    isElectron = "undefined" !== typeof root && root.process && "renderer" === root.process.type || "",
	    isNwjs = function () {
		if ("undefined" !== typeof isNodejs && isNodejs) {
			try {
				if ("undefined" !== typeof require("nw.gui")) {
					return !0;
				}
			} catch (e) {
				return !1;
			}
		}return !1;
	}(),
	    openDeviceBrowser = function (url) {
		var triggerForElectron = function () {
			var es = isElectron ? require("electron").shell : "";return es ? es.openExternal(url) : "";
		},
		    triggerForNwjs = function () {
			var ns = isNwjs ? require("nw.gui").Shell : "";return ns ? ns.openExternal(url) : "";
		},
		    triggerForHTTP = function () {
			return !0;
		},
		    triggerForLocal = function () {
			return root.open(url, "_system", "scrollbars=1,location=no");
		};if (isElectron) {
			triggerForElectron();
		} else if (isNwjs) {
			triggerForNwjs();
		} else {
			var locationProtocol = root.location.protocol || "",
			    hasHTTP = locationProtocol ? "http:" === locationProtocol ? "http" : "https:" === locationProtocol ? "https" : "" : "";if (hasHTTP) {
				triggerForHTTP();
			} else {
				triggerForLocal();
			}
		}
	};root.openDeviceBrowser = openDeviceBrowser;
})(globalRoot);
/*!
 * init ToProgress and extend methods
 */
var progressBar = new ToProgress({
	id: "top-progress-bar",
	color: "#FF2C40",
	height: "3px",
	duration: 0.2
});
/*!
 * @memberof progressBar
 * @param {Int} [n] a whole positive number
 * progressBar.init(n)
 */
progressBar.init = function (n) {
	n = n || 20;
	return this.increase(n);
};
/*!
 * @memberof progressBar
 * progressBar.complete()
 */
progressBar.complete = function () {
	return this.finish(), this.hide();
};
progressBar.init();
/*!
 * set click event on external links,
 * so that they open in new browser tab
 * @param {Object} [ctx] context HTML Element
 */
var handleExternalLink = function (p, ev) {
	"use strict";

	ev.stopPropagation();
	ev.preventDefault();
	openDeviceBrowser(p);
},
    manageExternalLinks = function (ctx) {
	"use strict";

	ctx = ctx && ctx.nodeName ? ctx : "";
	var w = globalRoot,
	    cls = "a",
	    a = ctx ? BALA.one(cls, ctx) || "" : BALA.one(cls) || "",
	    aEL = "addEventListener",
	    g = function (e) {
		var p = e.getAttribute("href") || "";
		if (p && parseLink(p).isCrossDomain && parseLink(p).hasHTTP) {
			e.title = "" + (parseLink(p).hostname || "") + " откроется в новой вкладке";
			if ("undefined" !== typeof getHTTP && getHTTP()) {
				e.target = "_blank";
				e.rel = "noopener";
			} else {
				e[aEL]("click", handleExternalLink.bind(null, p));
			}
		}
	},
	    k = function () {
		a = ctx ? BALA(cls, ctx) || "" : BALA(cls) || "";
		for (var i = 0, l = a.length; i < l; i += 1) {
			g(a[i]);
		}
		/* forEach(a, g, !1); */
	};
	if (a) {
		/* console.log("triggered function: manageExternalLinks"); */
		k();
	}
};
document.ready().then(manageExternalLinks);
/*!
 * init comments logic
 */
var initComments = function () {
	"use strict";

	var w = globalRoot;
	if ("undefined" !== typeof w.jQuery) {
		$(document).ready(function () {
			/*!
    * init comments
    */
			var d = document,
			    comments_textarea = $("#comments_textarea") || "",

			/* comments_check = $("#comments_check") || "", */
			comments_form_submit_button = $("#comments_form_submit_button") || "",
			    comments_form = $("#comments_form") || "",
			    comments_form_reset_button = $("#comments_form_reset_button") || "",
			    load_pt_comments = $("#load_pt_comments") || "",
			    error_msg = {
				history: !1,
				stack: !1,
				title: "Неуспешно",
				text: " Введите Ваш комментарий! ",
				opacity: 1,
				width: "280px",
				remove: !0,
				pnotify_addclass: "ui-pnotify-error",
				delay: 3E3
			},
			    notify = jQuery.pnotify || "",
			    success_msg = {
				history: !1,
				stack: !1,
				title: "Успех",
				text: "Ваш комментарий добавлен!",
				opacity: 1,
				width: "280px",
				remove: !0,
				pnotify_addclass: "ui-pnotify-success",
				delay: 3E3
			};
			if (comments_textarea) {
				var h_comments_form_submit_button = function () {
					var comments_textarea_value = comments_textarea.val(),
					    self_href = encodeURIComponent(w.location.href.split("#")[0]),
					    fixed_title = encodeURIComponent(d.title.replace("'", "&#39;")),
					    ajax_data = "comments_textarea=" + comments_textarea_value + "&self_href=" + self_href + "&self_title=" + fixed_title;
					if (comments_textarea_value) {
						localStorage.setItem("comments_textarea", JSON.stringify(comments_textarea_value));
					}
					if (!comments_textarea_value || !self_href || !fixed_title) {
						return notify(error_msg), !1;
					}
					comments_form_submit_button.hide();
					$.ajax({
						type: "POST",
						url: "/scripts/comments/add.php",
						data: ajax_data,
						success: function () {
							localStorage.removeItem("comments_textarea");
							comments_form[0].reset();
							load_pt_comments.load("/scripts/comments/?load=posts&limit=100");
							notify(success_msg);
						}
					});
					return !1;
				};
				comments_form_submit_button.click(h_comments_form_submit_button);
				var comments_textarea_current_value = comments_textarea.val(),
				    self_href = localStorage.getItem("comments_textarea");
				if (!comments_textarea_current_value && self_href) {
					comments_textarea.val($.parseJSON(self_href));
				}
				var h_comments_form_reset_button = function () {
					localStorage.removeItem("comments_textarea");
					comments_textarea.val("");
					comments_textarea.focus();
				};
				comments_form_reset_button.click(h_comments_form_reset_button);
			}
			load_pt_comments.load("/scripts/comments/?load=posts&limit=100");
		});
	}
},
    loadInitComments = function () {
	"use strict";

	var js = "../libs/comments/js/vendors.min.js";
	if (!scriptIsLoaded(js)) {
		loadJS(js, initComments);
	}
};
document.ready().then(loadInitComments);
/*!
 * init comments textarea focus
 */
var manageCommentsTextarea = function () {
	"use strict";

	var a = BALA.one("#comments_textarea") || "";
	if (a) {
		a.focus();
	}
};
document.ready().then(manageCommentsTextarea);
/*!
 * init nav-menu
 */
var initNavMenu = function () {
	"use strict";

	var w = globalRoot,
	    container = BALA.one("#container") || "",
	    page = BALA.one("#page") || "",
	    btn = BALA.one(".btn-nav-menu") || "",
	    panel = BALA.one(".panel-nav-menu") || "",
	    items = BALA("a", panel) || "",
	    holder = BALA.one(".holder-panel-menu-more") || "",
	    cL = "classList",
	    aEL = "addEventListener",
	    is_active = "is-active",
	    p = w.location.href || "",
	    r = function () {
		page[cL].remove(is_active);
		panel[cL].remove(is_active);
		btn[cL].remove(is_active);
	},
	    f = function () {
		page[cL].add(is_active);
		panel[cL].add(is_active);
		btn[cL].add(is_active);
	},
	    t = function () {
		page[cL].toggle(is_active);
		panel[cL].toggle(is_active);
		btn[cL].toggle(is_active);
	},
	    h = function () {
		if (holder && holder[cL].contains(is_active)) {
			holder[cL].remove(is_active);
		}
	},
	    g = function () {
		var h_container_left = function () {
			/* console.log("swipeleft"); */
			h();
			if (panel[cL].contains(is_active)) {
				r();
			}
		},
		    h_container_right = function () {
			/* console.log("swiperight"); */
			h();
			if (!panel[cL].contains(is_active)) {
				f();
			}
		};
		container[aEL]("click", h_container_left);
		/* container.onclick = h_container_left; */
		if ("undefined" !== typeof earlyHasTouch && "touch" === earlyHasTouch) {
			container[aEL]("swipeleft", h_container_left);
			/* container.onswipeleft = h_container_left; */
			container[aEL]("swiperight", h_container_right);
			/* container.onswiperight = h_container_right; */
		}
	},
	    k = function () {
		var h_btn = function (ev) {
			ev.stopPropagation();
			ev.preventDefault();
			h();
			t();
		};
		btn[aEL]("click", h_btn);
	},
	    q = function () {
		h();
		r();
	},
	    m = function (e) {
		e[cL].remove(is_active);
	},
	    n = function (e) {
		e[cL].add(is_active);
	},
	    s = function (a) {
		for (var j = 0, l = a.length; j < l; j += 1) {
			m(a[j]);
		}
		/* forEach(a, m, !1); */
	},
	    v = function (e) {
		var h_e = function () {
			if (panel[cL].contains(is_active)) {
				q();
			}
			s(items);
			n(e);
		};
		e[aEL]("click", h_e);
		if (e.href === p) {
			n(e);
		} else {
			m(e);
		}
	},
	    z = function () {
		for (var i = 0, l = items.length; i < l; i += 1) {
			v(items[i]);
		}
		/* forEach(items, v, !1); */
	};
	if (container && page && btn && panel && items) {
		/* console.log("triggered function: initNavMenu"); */
		/*!
   * open or close nav
   */
		k();
		g();
		/*!
   * close nav, scroll to top, highlight active nav item
   */
		z();
	}
};
document.ready().then(initNavMenu);
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
 * show page, finish ToProgress
 */
var showPageFinishProgress = function () {
	"use strict";

	var a = BALA.one("#container") || "";
	/* console.log("triggered function: showPageFinishProgress"); */
	setStyleOpacity(a, 1);
	progressBar.complete();
};
document.ready().then(showPageFinishProgress);

//# sourceMappingURL=bundle.js.map