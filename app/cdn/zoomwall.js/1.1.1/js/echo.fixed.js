/*!
 * @see {@link https://toddmotto.com/echo-js-simple-javascript-image-lazy-loading/}
 * added option to specify data attribute and img class
 */
(function (root) {
	"use strict";
	var echo = function (imgClass, dataAttributeName) {
		imgClass = imgClass || "data-src-img";
		dataAttributeName = dataAttributeName || "src";
		var w = root;
		var d = document;
		/*
		 * Constructor function
		 */
		var Echo = function (elem) {
			var _this = this;
			_this.elem = elem;
			_this.render();
			_this.listen();
		};
		var isBindedEchoClass = "is-binded-echo";
		/*!
		 * check if already binded
		 */
		var isBindedEcho = (function () {
			return d.documentElement.classList.contains(isBindedEchoClass) || "";
		}
			());
		/*
		 * Images for echoing
		 */
		var echoStore = [];
		/*
		 * Element in viewport logic
		 */
		var scrolledIntoView = function (element) {
			var coords = element.getBoundingClientRect();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || d.documentElement.clientHeight));
		};
		/*
		 * Changing src attr logic
		 */
		var echoSrc = function (img, callback) {
			img.src = img.dataset[dataAttributeName] || img.getAttribute("data-" + dataAttributeName);
			if (callback) {
				callback();
			}
		};
		/*
		 * Remove loaded item from array
		 */
		var removeEcho = function (element, index) {
			if (echoStore.indexOf(element) !== -1) {
				echoStore.splice(index, 1);
			}
		};
		/*
		 * Echo the images and callbacks
		 */
		var echoImageAll = function () {
			for (var i = 0; i < echoStore.length; i++) {
				var self = echoStore[i];
				if (scrolledIntoView(self)) {
					echoSrc(self, removeEcho(self, i));
				}
			}
		};
		/*
		 * Prototypal setup
		 */
		Echo.prototype = {
			init: function () {
				echoStore.push(this.elem);
			},
			render: function () {
				if (d.addEventListener) {
					/* d.addEventListener("DOMContentLoaded", echoImageAll, false); */
				} else {
					/* w.onload = echoImageAll; */
					/* w.addEventListener("load", echoImageAll); */
				}
				echoImageAll();
			},
			listen: function () {
				if (!isBindedEcho) {
					/* w.onscroll = echoImageAll; */
					w.addEventListener("scroll", echoImageAll);
					d.documentElement.classList.add(isBindedEchoClass);
				}
			}
		};
		/*
		 * Initiate the plugin
		 */
		/* var lazyImgs = d.querySelectorAll("img[data-echo]"); */
		var lazyImgs = d.getElementsByClassName(imgClass) || "";
		var walkLazyImageAll = function () {
			for (var i = 0; i < lazyImgs.length; i++) {
				new Echo(lazyImgs[i]).init();
			}
		};
		if (lazyImgs) {
			walkLazyImageAll();
		}
	};
	root.echo = echo;
}
	("undefined" !== typeof window ? window : this));
