function _typeof(obj) {
	if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
		_typeof = function _typeof(obj) {
			return typeof obj;
		};
	} else {
		_typeof = function _typeof(obj) {
			return obj &&
				typeof Symbol === "function" &&
				obj.constructor === Symbol &&
				obj !== Symbol.prototype
				? "symbol"
				: typeof obj;
		};
	}
	return _typeof(obj);
}

!(function(t) {
	var e = (function(t) {
		function e(i) {
			if (n[i]) return n[i].exports;
			var r = (n[i] = {
				exports: {},
				id: i,
				loaded: !1
			});
			return (
				t[i].call(r.exports, r, r.exports, e),
				(r.loaded = !0),
				r.exports
			);
		}

		var n = {};
		return (e.m = t), (e.c = n), (e.p = ""), e(0);
	})([
		function(t, e, n) {
			"use strict";

			function i(t) {
				return t && t.__esModule
					? t
					: {
							default: t
					  };
			}

			function r(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			}

			var o =
					Object.assign ||
					function(t) {
						for (var e = 1; e < arguments.length; e++) {
							var n = arguments[e];

							for (var i in n) {
								Object.prototype.hasOwnProperty.call(n, i) &&
									(t[i] = n[i]);
							}
						}

						return t;
					},
				s = (function() {
					function t(t, e) {
						for (var n = 0; n < e.length; n++) {
							var i = e[n];
							(i.enumerable = i.enumerable || !1),
								(i.configurable = !0),
								"value" in i && (i.writable = !0),
								Object.defineProperty(t, i.key, i);
						}
					}

					return function(e, n, i) {
						return n && t(e.prototype, n), i && t(e, i), e;
					};
				})(),
				u = n(1),
				a = n(2),
				c = i(a),
				l = n(3),
				f = (n(5), n(4)),
				h = n(6),
				d = i(h),
				v = (function() {
					function t() {
						var e =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: document.createElement("div"),
							n =
								arguments.length > 1 && void 0 !== arguments[1]
									? arguments[1]
									: {};
						r(this, t),
							Object.defineProperty(
								this,
								"_data",
								u.DATA_DESCRIPTOR
							),
							(this.$ = c.default),
							(this.callbacks = {
								onChanged: [],
								onBeforeChange: [],
								onOverRange: [],
								onUserMouseWheel: [],
								onUserSwipe: []
							}),
							(this.userEvent = null),
							(this.isChanging = !1),
							(this.el = e.nodeType
								? e
								: document.querySelector(e)),
							(this.eventEl = null),
							(this.sections = this.el.children),
							(this.currentIndex = n.initIndex || 0),
							(this.currentSection = this.sections[
								this.currentIndex
							]),
							(this.config = o(
								{},
								u.DEFAULT_CONFIG,
								u.DEFAULT_INIT_CONFIG
							)),
							this.set(n),
							l.init(this);
					}

					return (
						s(t, [
							{
								key: "set",
								value: function value(t, e) {
									var n = this.config;
									return (
										"string" == typeof t
											? (n[t] = e)
											: o(n, t),
										this
									);
								}
							},
							{
								key: "get",
								value: function value(t) {
									return this.config[t];
								}
							},
							{
								key: "next",
								value: function value() {
									var t = this.config.infinite
										? (this.currentIndex + 1) %
										  this.el.children.length
										: this.currentIndex + 1;
									return this.go(t), this;
								}
							},
							{
								key: "prev",
								value: function value() {
									var t = this.config.infinite
										? (this.currentIndex ||
												this.el.children.length) - 1
										: this.currentIndex - 1;
									return this.go(t), this;
								}
							},
							{
								key: "go",
								value: function value(t) {
									return f.change(this, +t || 0), this;
								}
							},
							{
								key: "do",
								value: function value(t) {
									return (
										t.call(
											this,
											this.currentIndex,
											this.currentSection
										),
										this
									);
								}
							},
							{
								key: "onChanged",
								value: function value(t) {
									return (
										this.callbacks.onChanged.push(t), this
									);
								}
							},
							{
								key: "onBeforeChange",
								value: function value(t) {
									return (
										this.callbacks.onBeforeChange.push(t),
										this
									);
								}
							},
							{
								key: "onOverRange",
								value: function value(t) {
									return (
										this.callbacks.onOverRange.push(t), this
									);
								}
							},
							{
								key: "onUserMouseWheel",
								value: function value(t) {
									return (
										this.callbacks.onUserMouseWheel.push(t),
										this
									);
								}
							},
							{
								key: "onUserSwipe",
								value: function value(t) {
									return (
										this.callbacks.onUserSwipe.push(t), this
									);
								}
							},
							{
								key: "initSpaceByKey",
								value: function value(t) {
									return (
										Object.defineProperty(this._data, t, {
											enumerable: !1,
											configurable: !0,
											writable: !1,
											value: {}
										}),
										this._data[t]
									);
								}
							},
							{
								key: "getSpaceByKey",
								value: function value(t) {
									return this._data[t];
								}
							}
						]),
						t
					);
				})();

			(v.from = function(t, e, n) {
				return new v(e, o({}, t.config, n));
			}),
				(v.applyNewKey = function() {
					var t = "key" + Date.now() + ~~(1e4 * Math.random());
					return t;
				}),
				(v.use = function(t, e) {
					t && t.install && t.install(v, e);
				}),
				v.use(d.default),
				(v.$ = c.default),
				(v.supportedTransition = c.default.getSupportedCSS(
					"transition"
				)),
				(v.supportedTransform = c.default.getSupportedCSS("transform")),
				(t.exports = v);
		},
		function(t, e) {
			"use strict";

			Object.defineProperty(e, "__esModule", {
				value: !0
			});
			(e.DEFAULT_INIT_CONFIG = {
				initIndex: 0,
				initClass: "ds-init",
				activeClass: "active",
				transitionInClass: "transition-in",
				transitionOutClass: "transition-out",
				silent: !1,
				horizontal: !1,
				infinite: !1,
				listenUserMouseWheel: !0,
				listenUserSwipe: !0,
				eventElemSelector: null
			}),
				(e.DEFAULT_CONFIG = {
					duration: 1e3,
					timingFunction: "ease",
					minInterval: 50,
					translate3d: !0,
					parent: null,
					respondToUserEvent: !0,
					stopPropagation: !1
				}),
				(e.DATA_DESCRIPTOR = {
					enumerable: !1,
					configurable: !1,
					writable: !1,
					value: {}
				});
		},
		function(t, e) {
			"use strict";

			function n(t, e, n, i) {
				if (t && e)
					for (var r, o = 0, s = t.length; s > o; o++) {
						if (
							((r = n ? e.call(n, t[o], o, t) : e(t[o], o, t)),
							r === !1)
						)
							return i;
					}
			}

			function i(t, e) {
				var n = [];

				for (var i in t) {
					t.hasOwnProperty(i) && n.push(e ? e(i) : i);
				}

				return n;
			}

			function r(t) {
				if (!t.length) return 0;
				var e = Array.prototype.reduce.call(t, function(t, e) {
					return t + e;
				});
				return e / t.length;
			}

			function o(t) {
				return (
					"object" ===
						("undefined" == typeof t ? "undefined" : a(t)) &&
					u(t.length)
				);
			}

			function s(t, e, n, i) {
				return u(i) ||
					"object" === ("undefined" == typeof n ? "undefined" : a(n))
					? (h.each(t, function(t) {
							return e(t, n, i);
					  }),
					  t)
					: t.length
					? e(t[0], n)
					: void 0;
			}

			function u(t) {
				return "undefined" != typeof t;
			}

			Object.defineProperty(e, "__esModule", {
				value: !0
			});

			var a =
					"function" == typeof Symbol &&
					"symbol" == _typeof(Symbol.iterator)
						? function(t) {
								return _typeof(t);
						  }
						: function(t) {
								return t &&
									"function" == typeof Symbol &&
									t.constructor === Symbol &&
									t !== Symbol.prototype
									? "symbol"
									: _typeof(t);
						  },
				c =
					Object.assign ||
					function(t) {
						for (var e = 1; e < arguments.length; e++) {
							var n = arguments[e];

							for (var i in n) {
								Object.prototype.hasOwnProperty.call(n, i) &&
									(t[i] = n[i]);
							}
						}

						return t;
					},
				l = 800,
				f = 50,
				h = function d(t) {
					return new d.prototype.Init(t);
				};

			(h.prototype = {
				constructor: h,
				length: 0,
				Init: function Init(t) {
					var e = this;
					return t
						? t instanceof h
							? t
							: (t.nodeType
									? ((this[0] = t), (this.length = 1))
									: ("string" == typeof t &&
											(t =
												document.querySelectorAll(t) ||
												[]),
									  h.each(t, function(t, n) {
											return (e[n] = t);
									  }),
									  (this.length = t.length)),
							  this)
						: this;
				}
			}),
				(h.prototype.Init.prototype = h.prototype),
				c(h.prototype, {
					each: function each(t, e, n, i) {
						return h.each(this, t, e, n, i);
					},
					eq: function eq(t) {
						return isNaN(t)
							? h()
							: h(this[0 > t ? this.length + t : t]);
					},
					on: function on(t, e) {
						var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: !1;
						return this.each(function(i) {
							return h.on(i, t, e, n);
						});
					},
					off: function off(t, e) {
						var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: !1;
						return this.each(function(i) {
							return h.off(i, t, e, n);
						});
					},
					attr: function attr(t) {
						return s(this, h.attr, t);
					},
					css: function css(t, e) {
						return s(this, h.css, t, e);
					},
					removeAttr: function removeAttr(t) {
						return this.each(function(e) {
							return h.removeAttr(e, t);
						});
					},
					addClass: function addClass(t) {
						return this.each(function(e) {
							return h.addClass(e, t);
						});
					},
					removeClass: function removeClass(t) {
						return this.each(function(e) {
							return h.removeClass(e, t);
						});
					},
					hasClass: function hasClass(t) {
						return !this.each(
							function(e) {
								return !h.hasClass(e, t);
							},
							!1,
							!0,
							!1
						);
					},
					onMouseWheel: function onMouseWheel(t, e) {
						return this.each(function(n) {
							return h.onMouseWheel(n, t, e);
						});
					},
					onSwipe: function onSwipe(t, e) {
						return this.each(function(n) {
							return h.onSwipe(n, t, e);
						});
					}
				}),
				c(h, {
					each: function each(t, e, n, i, r) {
						if (o(t))
							for (var s, u = 0, a = t.length; a > u; u++) {
								if (
									((s = n
										? e.call(t[u], t[u], u, t)
										: e(t[u], u, t)),
									s === !1 && i)
								)
									return r;
							}
						return t;
					},
					on: function on(t, e, n) {
						var i =
							arguments.length > 3 && void 0 !== arguments[3]
								? arguments[3]
								: !1;
						t && t.addEventListener(e, n, i);
					},
					off: function off(t, e, n) {
						var i =
							arguments.length > 3 && void 0 !== arguments[3]
								? arguments[3]
								: !1;
						t && t.removeEventListener(e, n, i);
					},
					attr: function attr(t, e, n) {
						if (t)
							if ("string" == typeof e) {
								if (!u(n)) return t.getAttribute(e) || "";
								t.setAttribute(e, n);
							} else
								for (var i in e) {
									e.hasOwnProperty(i) &&
										t.setAttribute(i, e[i]);
								}
					},
					css: function css(t, e, n) {
						if (t && e)
							if ("string" == typeof e) {
								if (!u(n)) return t.style[e];
								t.style[e] = n;
							} else
								for (var i in e) {
									e.hasOwnProperty(i) && (t.style[i] = e[i]);
								}
					},
					removeAttr: function removeAttr(t, e) {
						t && t.removeAttribute(e);
					},
					addClass: function addClass(t, e) {
						if (t && e && !this.hasClass(t, e)) {
							var n = this.attr(t, "class").trim(),
								i = (n + " " + e).trim();
							this.attr(t, "class", i);
						}
					},
					removeClass: function removeClass(t, e) {
						if (t && e) {
							var n = new RegExp("\\s*\\b" + e + "\\b\\s*", "g"),
								i = this.attr(t, "class")
									.replace(n, " ")
									.trim();
							this.attr(t, "class", i);
						}
					},
					hasClass: function hasClass(t, e) {
						return (
							!(!t || !e) &&
							new RegExp("\\b" + e + "\\b").test(
								this.attr(t, "class")
							)
						);
					}
				}),
				c(h, {
					getSupportedCSS: (function() {
						var t = ["", "-webkit-", "-moz-", "-o-", "-ms-"],
							e = document.createElement("div"),
							i = e.style;
						return function(e) {
							var r,
								o =
									arguments.length > 1 &&
									void 0 !== arguments[1]
										? arguments[1]
										: !0,
								s = o
									? t.map(function(t) {
											return t + e;
									  })
									: [e];
							return (
								n(s, function(t) {
									return (
										(r = void 0 !== i[t] ? t : r),
										void 0 === r
									);
								}),
								r
							);
						};
					})(),
					onMouseWheel: function onMouseWheel(t, e) {
						var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: function() {
										return !1;
								  };

						if (t && e) {
							var i = 0,
								o = [];
							["DOMMouseScroll", "mousewheel"].map(function(s) {
								t.addEventListener(
									s,
									function(s) {
										s.preventDefault(),
											n() && s.stopPropagation();
										var u = s.detail
											? -s.detail
											: s.wheelDelta;

										if (u) {
											Date.now() - i > 200 && (o = []),
												(i = Date.now()),
												o.push(Math.abs(u)),
												o.length > 150 && o.shift();
											var a = ~~r(o.slice(-10)),
												c = ~~r(o.slice(-70)),
												l = a >= c;

											if (l) {
												var f = 0 > u ? "down" : "up";
												e.call(t, f);
											}
										}
									},
									!1
								);
							});
						}
					},
					onSwipe: function onSwipe(t, e) {
						var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: function() {
										return !1;
								  };

						if (t && e) {
							var i = void 0,
								r = void 0,
								o = void 0,
								s = void 0,
								u = void 0;
							t.addEventListener(
								"touchstart",
								function(t) {
									n() && t.stopPropagation();
									var e = t.changedTouches[0];
									(i = e.clientX),
										(r = e.clientY),
										(s = e.clientX),
										(u = e.clientY),
										(o = Date.now());
								},
								!1
							),
								t.addEventListener(
									"touchmove",
									function(t) {
										if (
											(n() && t.stopPropagation(),
											t.preventDefault(),
											(!t.scale || 1 === t.scale) &&
												1 === t.changedTouches.length)
										) {
											var e = t.changedTouches[0];
											(s = e.clientX), (u = e.clientY);
										}
									},
									!1
								),
								t.addEventListener(
									"touchend",
									function(a) {
										if (
											(n() && a.stopPropagation(),
											Date.now() - o < l)
										) {
											var c = s - i,
												h = u - r,
												d = Math.abs(c),
												v = Math.abs(h),
												g = void 0;
											Math.max(d, v) > f &&
												((g =
													d > v
														? c > 0
															? "right"
															: "left"
														: h > 0
														? "down"
														: "up"),
												e.call(t, g));
										}
									},
									!1
								);
						}
					},
					forEach: n,
					keys: i
				}),
				(e.default = h);
		},
		function(t, e, n) {
			"use strict";

			function i(t) {
				return t && t.__esModule
					? t
					: {
							default: t
					  };
			}

			function r(t) {
				t.config.silent || u.initSections(t, t.config.initIndex || 0),
					t.config.eventElemSelector !== !1 && a.startListen(t),
					s.default.removeClass(t.el, t.config.initClass);
			}

			Object.defineProperty(e, "__esModule", {
				value: !0
			}),
				(e.init = void 0);
			var o = n(2),
				s = i(o),
				u = n(4),
				a = n(5);
			e.init = r;
		},
		function(t, e, n) {
			"use strict";

			function i(t) {
				return t && t.__esModule
					? t
					: {
							default: t
					  };
			}

			function r(t, e) {
				var n = v.default(t.el),
					i = v.default(t.sections);
				t.config.horizontal
					? (n.css("width", i.length + "00%"),
					  i.css({
							width: 100 / i.length + "%",
							float: "left"
					  }))
					: (n.css("height", i.length + "00%"),
					  i.css("height", 100 / i.length + "%")),
					o(t, e, !0);
			}

			function o(t, e, n) {
				var i = t.currentSection,
					r = t.sections[e],
					o = t.config,
					a = o.minInterval + (p ? o.duration : 0);
				return (
					(a = n ? 0 : a),
					(t.isChanging = !0),
					t.config.silent ||
						(u(t, e), n || s(o, i, r, !0), h(t, e, n)),
					setTimeout(function() {
						o.silent || n || s(o, i, r, !1), (t.isChanging = !1);
					}, a),
					a
				);
			}

			function s(t, e, n, i) {
				i
					? (v.default.addClass(e, t.transitionOutClass),
					  v.default.addClass(n, t.transitionInClass))
					: (v.default.removeClass(e, t.transitionOutClass),
					  v.default.removeClass(n, t.transitionInClass));
			}

			function u(t, e) {
				v.default(t.sections).each(function(n, i) {
					i === e
						? v.default.addClass(n, t.config.activeClass)
						: v.default.removeClass(n, t.config.activeClass);
				});
			}

			function a(t, e) {
				if (c(t, e))
					if (l(t, e)) f(t, e);
					else if (g.executeUserEventCallbacks(t)) {
						var n = t.currentIndex,
							i = g.executeEventCallbacks(t, {
								name: "onBeforeChange",
								args: [n, e, t.currentSection, t.sections[e]]
							});

						if (i) {
							var r = o(t, e);
							(t.currentIndex = e),
								(t.currentSection = t.sections[e]),
								setTimeout(function() {
									g.executeEventCallbacks(t, {
										name: "onChanged",
										args: [
											e,
											n,
											t.currentSection,
											t.sections[n]
										]
									});
								}, r);
						}
					}
			}

			function c(t, e) {
				return !t.isChanging && e !== t.currentIndex;
			}

			function l(t, e) {
				return 0 > e || e >= t.sections.length;
			}

			function f(t, e) {
				var n = t.config.parent,
					i = g.executeEventCallbacks(t, {
						name: "onOverRange",
						args: [t.currentIndex, e, t.currentSection]
					});
				i && n && (0 > e ? n.prev() : n.next());
			}

			function h(t, e, n) {
				var i = t.config;

				if (m) {
					if (p) {
						var r =
								m +
								" " +
								(i.timingFunction || "") +
								" " +
								i.duration +
								"ms",
							o = m + " 0ms";
						v.default.css(t.el, p, n ? o : r);
					}

					var s = (100 * -e) / t.sections.length + "%",
						u = i.horizontal ? s + ",0" : "0," + s;
					(u =
						y && i.translate3d
							? "translate3d(" + u + ",0)"
							: "translate(" + u + ")"),
						v.default.css(t.el, m, u);
				} else
					v.default.css(
						t.el,
						i.horizontal ? "left" : "top",
						-e + "00%"
					);
			}

			Object.defineProperty(e, "__esModule", {
				value: !0
			}),
				(e.change = e.initSections = void 0);

			var d = n(2),
				v = i(d),
				g = n(5),
				p = v.default.getSupportedCSS("transition"),
				m = v.default.getSupportedCSS("transform"),
				y = (function() {
					var t = !1;

					if (m && window.getComputedStyle) {
						var e = document.createElement("div");
						document.body.insertBefore(e, null),
							(e.style[m] = "translate3d(1%, 1%, 0)"),
							(t = window
								.getComputedStyle(e)
								.getPropertyValue(m)),
							document.body.removeChild(e);
					}

					return t && "none" !== t;
				})();

			(e.initSections = r), (e.change = a);
		},
		function(t, e, n) {
			"use strict";

			function i(t) {
				return t && t.__esModule
					? t
					: {
							default: t
					  };
			}

			function r(t) {
				var e = t.userEvent;

				if (e) {
					t.userEvent = null;
					var n = t.callbacks[e.name],
						i = s(n, e.args, t, !1);
					return i !== !1;
				}

				return !0;
			}

			function o(t, e) {
				var n = t.callbacks[e.name],
					i = s(n, e.args, t, !1);
				return i !== !1;
			}

			function s(t, e, n, i) {
				return h.default.forEach(
					t,
					function(t) {
						return t.apply(n, e);
					},
					null,
					i
				);
			}

			function u(t) {
				a(t),
					t.config.listenUserMouseWheel && c(t, t.eventEl),
					t.config.listenUserSwipe && l(t, t.eventEl);
			}

			function a(t) {
				var e = t.config.eventElemSelector;
				t.eventEl =
					null === e
						? t.el
						: e.nodeType
						? e
						: document.querySelector(e);
			}

			function c(t, e) {
				h.default.onMouseWheel(
					e,
					function(e) {
						t.config.respondToUserEvent &&
							!t.isChanging &&
							((t.userEvent = {
								name: "onUserMouseWheel",
								args: [e]
							}),
							"down" === e ? t.next() : t.prev());
					},
					function() {
						return t.config.stopPropagation;
					}
				);
			}

			function l(t, e) {
				h.default.onSwipe(
					e,
					function(e) {
						t.config.respondToUserEvent &&
							!t.isChanging &&
							((t.userEvent = {
								name: "onUserSwipe",
								args: [e]
							}),
							t.config.horizontal
								? ("left" === e && t.next(),
								  "right" === e && t.prev())
								: ("up" === e && t.next(),
								  "down" === e && t.prev()));
					},
					function() {
						return t.config.stopPropagation;
					}
				);
			}

			Object.defineProperty(e, "__esModule", {
				value: !0
			}),
				(e.executeUserEventCallbacks = e.executeEventCallbacks = e.startListen = void 0);
			var f = n(2),
				h = i(f);
			(e.startListen = u),
				(e.executeEventCallbacks = o),
				(e.executeUserEventCallbacks = r);
		},
		function(t, e) {
			"use strict";

			function n(t, e) {
				if (!(t instanceof e))
					throw new TypeError("Cannot call a class as a function");
			}

			function i(t) {
				return function(e) {
					return e.keyCode === t;
				};
			}

			function r(t) {
				t.prototype.getKeyboard = (function() {
					var e = t.applyNewKey();
					return function() {
						var t = this.getSpaceByKey(e);
						return (
							t ||
								((t = this.initSpaceByKey(e)),
								(t.res = new s(this, e))),
							t.res
						);
					};
				})();
			}

			Object.defineProperty(e, "__esModule", {
				value: !0
			});

			var o = (function() {
					function t(t, e) {
						for (var n = 0; n < e.length; n++) {
							var i = e[n];
							(i.enumerable = i.enumerable || !1),
								(i.configurable = !0),
								"value" in i && (i.writable = !0),
								Object.defineProperty(t, i.key, i);
						}
					}

					return function(e, n, i) {
						return n && t(e.prototype, n), i && t(e, i), e;
					};
				})(),
				s = (function() {
					function t(e) {
						n(this, t),
							(this.eventType = "keydown"),
							(this.eventElement = window),
							(this.for = e),
							(this.$ = e.$),
							(this.isOn = !1),
							(this.listener = u.bind(this)),
							(this.mappings = [
								{
									filter: i(40),
									action: function action() {
										this.config.horizontal || this.next();
									}
								},
								{
									filter: i(38),
									action: function action() {
										this.config.horizontal || this.prev();
									}
								},
								{
									filter: i(39),
									action: function action() {
										this.config.horizontal && this.next();
									}
								},
								{
									filter: i(37),
									action: function action() {
										this.config.horizontal && this.prev();
									}
								}
							]);
					}

					return (
						o(t, [
							{
								key: "setEventType",
								value: function value(t) {
									if (t !== this.eventType) {
										var e = this.isOn;
										e && this.turnOff(),
											(this.eventType = t),
											e && this.turnOn();
									}

									return this;
								}
							},
							{
								key: "setEventElement",
								value: function value(t) {
									if (t !== this.eventElement) {
										var e = this.isOn;
										e && this.turnOff(),
											(this.eventElement = t),
											e && this.turnOn();
									}

									return this;
								}
							},
							{
								key: "getMappings",
								value: function value() {
									return this.mappings;
								}
							},
							{
								key: "setMappings",
								value: function value(t) {
									return (this.mappings = t), this;
								}
							},
							{
								key: "turnOn",
								value: function value() {
									return (
										this.isOn ||
											(this.$.on(
												this.eventElement,
												this.eventType,
												this.listener,
												!1
											),
											(this.isOn = !0)),
										this
									);
								}
							},
							{
								key: "turnOff",
								value: function value() {
									return (
										this.isOn &&
											(this.$.off(
												this.eventElement,
												this.eventType,
												this.listener,
												!1
											),
											(this.isOn = !1)),
										this
									);
								}
							}
						]),
						t
					);
				})(),
				u = function u(t) {
					var e = this.mappings || [],
						n = this.for;
					e.forEach(function(e) {
						e.filter.call(n, t) === !0 && e.action.call(n, t);
					});
				};

			e.default = {
				install: r
			};
		}
	]);

	t.DoSlide = e;
})("undefined" != typeof window ? window : this);