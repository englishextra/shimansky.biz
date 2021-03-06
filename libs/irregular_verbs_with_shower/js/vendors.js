/*jslint browser: true */

/*jslint node: true */

/*global global, ActiveXObject, define, escape, module, pnotify, Proxy, jQuery, require, self, setImmediate, window */

/*!
 * modified fo babel Shower HTML presentation engine v1.0.1
 * @see {@link https://github.com/shower/shower}
 * @copyright 2010–2014 Vadim Makeev, pepelsbey.net
 * @license MIT license: github.com/shower/shower/wiki/MIT-License
 * exposed as window property
 * changed container from body to particular class
 * added check for container existense
 * source: shwr.me/shower/shower.min.js
 * passes jshint
 */
(function(root) {
	if ("undefined" === typeof root || !("document" in root)) {
		return (
			console.log("root is undefined or document is not in window"), !1
		);
	}

	root.shower =
		root.shower ||
		(function(a, b, c) {
			function d(a) {
				for (var b in a) {
					if (a.hasOwnProperty(b)) {
						this[b] = a[b];
					}
				}
			}

			var e,
				f = {},
				g = a.location,
				h_cls = "shower-list",
				h = b.querySelector("." + h_cls) || "",
				i = [],
				j = [],
				k = !(!a.history || !a.history.pushState);

			if (h) {
				return (
					(d.prototype = {
						getSlideNumber: function getSlideNumber() {
							return this.number;
						},
						isLast: function isLast() {
							return f.slideList.length === this.number + 1;
						},
						isFinished: function isFinished() {
							return this.innerComplete >= this.innerLength;
						},
						process: function process(a) {
							return this.timing
								? (this.initTimer(a), this)
								: (this.next(a), this);
						},
						initTimer: function initTimer(a) {
							var b = this;
							return b.timing
								? (b.stopTimer(),
								  (e = b.isFinished()
										? setInterval(function () {
												b.stopTimer();
												a.next();
										  }, b.timing * (b.innerLength || 1))
										: setInterval(function () {
												if (b.isFinished()) {
													b.stopTimer();
													a.next();
												} else {
													b.next(a);
												}
										  }, b.timing)),
								  this)
								: !1;
						},
						stopTimer: function stopTimer() {
							return e && (clearInterval(e), (e = !1)), this;
						},
						prev: function prev(a) {
							var c,
								d = this;
							return !d.hasInnerNavigation ||
								d.isFinished() ||
								0 === d.innerComplete
								? (a.prev(), !1)
								: ((c = b
										.getElementById(d.id)
										.querySelectorAll(".next.active")),
								  !c || c.length < 1
										? !1
										: (d.innerComplete > 0
												? (d.innerComplete--,
												  c[
														c.length - 1
												  ].classList.remove("active"))
												: a.prev(),
										  this));
						},
						next: function next(a) {
							var c,
								d = this;
							return !d.hasInnerNavigation || d.isFinished()
								? (a.next(), !1)
								: (d.isFinished() ||
										((c = b
											.getElementById(d.id)
											.querySelectorAll(
												".next:not(.active)"
											)),
										c[0].classList.add("active"),
										d.innerComplete++),
								  this);
						}
					}),
					(f._getData = function (a, b) {
						return a.dataset
							? a.dataset[b]
							: a.getAttribute("data-" + b);
					}),
					(f.slideList = []),
					(f.init = function (a, c) {
						var e;
						a = a || ".slide";
						c = c || "div.progress div";
						i = b.querySelectorAll(a);
						j = b.querySelector(c);

						for (var g = 0; g < i.length; g++) {
							if (!i[g].id) {
								i[g].id = g + 1;
								e = f._getData(i[g], "timing");

								if (e && /^(\d{1,2}:)?\d{1,3}$/.test(e)) {
									if (-1 !== e.indexOf(":")) {
										e = e.split(":");
										e =
											1e3 *
											(60 * parseInt(e[0], 10) +
												parseInt(e[1], 10));
									} else {
										e = 1e3 * parseInt(e, 10);

										if (0 === e) {
											e = !1;
										}
									}
								} else {
									e = !1;
								}

								f.slideList.push(
									new d({
										id: i[g].id,
										number: g,
										hasInnerNavigation:
											null !==
											i[g].querySelector(".next"),
										timing: e,
										innerLength: i[g].querySelectorAll(
											".next"
										).length,
										innerComplete: 0
									})
								);
							}
						}

						return f;
					}),
					(f._getTransform = function () {
						var b = Math.max(
							h.clientWidth / a.innerWidth,
							h.clientHeight / a.innerHeight
						);
						return "scale(" + 1 / b + ")";
					}),
					(f._applyTransform = function (a) {
						return (
							[
								"WebkitTransform",
								"MozTransform",
								"msTransform",
								"OTransform",
								"transform"
							].forEach(function(b) {
								h.style[b] = a;
							}),
							!0
						);
					}),
					(f._isNumber = function (a) {
						return !isNaN(parseFloat(a)) && isFinite(a);
					}),
					(f._normalizeSlideNumber = function (a) {
						if (!f._isNumber(a)) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						return (
							0 > a && (a = 0),
							a >= f.slideList.length &&
								(a = f.slideList.length - 1),
							a
						);
					}),
					(f._getSlideIdByEl = function (a) {
						for (
							;
							"BODY" !== a.nodeName && "HTML" !== a.nodeName;

						) {
							if (a.classList.contains("slide")) {
								return a.id;
							}

							a = a.parentNode;
						}

						return "";
					}),
					(f._checkInteractiveElement = function (a) {
						return "A" === a.target.nodeName;
					}),
					(f.getSlideNumber = function (a) {
						var b,
							c = f.slideList.length - 1;

						for ("" === a && (b = 0); c >= 0; --c) {
							if (a === f.slideList[c].id) {
								b = c;
								break;
							}
						}

						return b;
					}),
					(f.go = function (a, b) {
						var c;

						if (!f._isNumber(a)) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						return f.slideList[a]
							? ((g.hash = f.getSlideHash(a)),
							  f.updateProgress(a),
							  f.updateActiveAndVisitedSlides(a),
							  f.isSlideMode() &&
									(f.showPresenterNotes(a),
									(c = f.slideList[a]),
									c.timing && c.initTimer(f)),
							  "function" === typeof b && b(),
							  a)
							: !1;
					}),
					(f.next = function (a) {
						var b = f.getCurrentSlideNumber(),
							c = f.slideList[b + 1];
						return c
							? (f.go(b + 1),
							  "function" === typeof a && a(),
							  this)
							: !1;
					}),
					(f._turnNextSlide = function (a) {
						var b = f.getCurrentSlideNumber(),
							c = f.slideList[b];

						if (f.isSlideMode()) {
							c.stopTimer();
							c.next(f);
						} else {
							f.go(b + 1);
						}

						if ("function" === typeof a) {
							a();
						}
					}),
					(f.prev = f.previous = function (a) {
						var b = f.getCurrentSlideNumber();
						return 1 > b
							? !1
							: (f.go(b - 1),
							  "function" === typeof a && a(),
							  true);
					}),
					(f._turnPreviousSlide = function (a) {
						var b = f.getCurrentSlideNumber(),
							c = f.slideList[b];
						return (
							c.stopTimer(),
							f.isSlideMode() ? c.prev(f) : f.go(b - 1),
							"function" === typeof a && a(),
							!0
						);
					}),
					(f.first = function (a) {
						var b = f.slideList[f.getCurrentSlideNumber()];

						if (b && b.timing) {
							b.stopTimer();
						}

						f.go(0);

						if ("function" === typeof a) {
							a();
						}
					}),
					(f.last = function (a) {
						var b = f.slideList[f.getCurrentSlideNumber()];

						if (b && b.timing) {
							b.stopTimer();
						}

						f.go(f.slideList.length - 1);

						if ("function" === typeof a) {
							a();
						}
					}),
					(f.enterSlideMode = function (a) {
						var b = f.getCurrentSlideNumber();
						return (
							h.classList.remove(h_cls),
							h.classList.add("full"),
							f.isListMode() &&
								k &&
								history.pushState(
									null,
									null,
									g.pathname + "?full" + f.getSlideHash(b)
								),
							f._applyTransform(f._getTransform()),
							"function" === typeof a && a(),
							!0
						);
					}),
					(f.enterListMode = function (a) {
						var b;
						return (
							h.classList.remove("full"),
							h.classList.add(h_cls),
							f.clearPresenterNotes(),
							f._applyTransform("none"),
							f.isListMode()
								? !1
								: ((b = f.getCurrentSlideNumber()),
								  f.slideList[b].stopTimer(),
								  f.isSlideMode() &&
										k &&
										history.pushState(
											null,
											null,
											g.pathname + f.getSlideHash(b)
										),
								  f.scrollToSlide(b),
								  "function" === typeof a && a(),
								  true)
						);
					}),
					(f.toggleMode = function (a) {
						return (
							f.isListMode()
								? f.enterSlideMode()
								: f.enterListMode(),
							"function" === typeof a && a(),
							!0
						);
					}),
					(f.getCurrentSlideNumber = function () {
						var a = f.slideList.length - 1,
							b = g.hash.substr(1);

						if ("" === b) {
							return -1;
						}

						for (; a >= 0; --a) {
							if (b === f.slideList[a].id) {
								return a;
							}
						}

						return 0;
					}),
					(f.scrollToSlide = function (c) {
						var d,
							e = !1;

						if (!f._isNumber(c)) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						if (f.isSlideMode()) {
							throw new Error(
								"You can't scroll to because you in slide mode. Please, switch to list mode."
							);
						}

						if (-1 === c) {
							return e;
						}

						if (!f.slideList[c]) {
							throw new Error(
								"There is no slide with number " + c
							);
						}

						return (
							(d = b.getElementById(f.slideList[c].id)),
							a.scrollTo(0, d.offsetTop),
							(e = !0),
							e
						);
					}),
					(f.isListMode = function () {
						return k
							? !/^full.*/.test(g.search.substr(1))
							: h.classList.contains(h_cls);
					}),
					(f.isSlideMode = function () {
						return k
							? /^full.*/.test(g.search.substr(1))
							: h.classList.contains("full");
					}),
					(f.updateProgress = function (a) {
						if (null === j) {
							return !1;
						}

						if (!f._isNumber(a)) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						return (
							(j.style.width =
								(
									(100 / (f.slideList.length - 1)) *
									f._normalizeSlideNumber(a)
								).toFixed(2) + "%"),
							!0
						);
					}),
					(f.updateActiveAndVisitedSlides = function (a) {
						var c,
							d,
							e = f.slideList.length;

						if (
							((a = f._normalizeSlideNumber(a)), !f._isNumber(a))
						) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						for (c = 0; e > c; ++c) {
							d = b.getElementById(f.slideList[c].id);
						}

						if (a > c) {
							d.classList.remove("active");
							d.classList.add("visited");
						} else {
							if (c > a) {
								d.classList.remove("visited");
								d.classList.remove("active");
							} else {
								d.classList.remove("visited");
								d.classList.add("active");
							}
						}

						return !0;
					}),
					(f.clearPresenterNotes = function () {
						if (f.isSlideMode() && a.console && a.console.clear) {
							console.clear();
						}
					}),
					(f.showPresenterNotes = function (c) {
						if ((f.clearPresenterNotes(), a.console)) {
							c = f._normalizeSlideNumber(c);
							var d = f.slideList[c].id,
								e = f.slideList[c + 1]
									? f.slideList[c + 1].id
									: null,
								g = b.getElementById(d).querySelector("footer");

							if (
								(g &&
									g.innerHTML &&
									console.info(
										g.innerHTML.replace(/\n\s+/g, "\n")
									),
								e)
							) {
								var h = b.getElementById(e).querySelector("h2");

								if (h) {
									h = h.innerHTML.replace(
										/^\s+|<[^>]+>/g,
										""
									);
									console.info("NEXT: " + h);
								}
							}
						}
					}),
					(f.getSlideHash = function (a) {
						if (!f._isNumber(a)) {
							throw new Error(
								"Gimme slide number as Number, baby!"
							);
						}

						return (
							(a = f._normalizeSlideNumber(a)),
							"#" + f.slideList[a].id
						);
					}),
					(f.wheel = function (a) {
						var d,
							e = b.querySelector("body"),
							g = "locked" === e.getAttribute("data-scroll");

						if (!g) {
							if (!f.isListMode()) {
								e.setAttribute("data-scroll", "locked");
								d =
									a.deltaY === c
										? a.wheelDeltaY < 0
										: a.deltaY > 0;

								if (d) {
									f._turnNextSlide();
								} else {
									f._turnPreviousSlide();
								}

								setTimeout(function () {
									e.setAttribute("data-scroll", "unlocked");
								}, 200);
							}
						}
					}),
					a.addEventListener(
						"DOMContentLoaded",
						function() {
							var a = f.getCurrentSlideNumber(),
								b =
									h.classList.contains("full") ||
									f.isSlideMode();

							if (-1 === a && b) {
								f.go(0);
							} else {
								if (0 === a || b) {
									f.go(a);
								}
							}

							if (b) {
								f.enterSlideMode();
							}
						},
						!1
					),
					a.addEventListener(
						"popstate",
						function() {
							var a = f.getCurrentSlideNumber();

							if (-1 !== a) {
								f.go(a);
							}

							if (f.isListMode()) {
								f.enterListMode();
							} else {
								f.enterSlideMode();
							}
						},
						!1
					),
					a.addEventListener(
						"resize",
						function() {
							if (f.isSlideMode()) {
								f._applyTransform(f._getTransform());
							}
						},
						!1
					),
					b.addEventListener(
						"keydown",
						function(a) {
							var b,
								c = f.getCurrentSlideNumber(),
								d = f.slideList[-1 !== c ? c : 0];

							switch (a.which) {
								case 80:
									if (
										f.isListMode() &&
										a.altKey &&
										a.metaKey
									) {
										a.preventDefault();
										b = d.number;
										f.go(b);
										f.enterSlideMode();
										f.showPresenterNotes(b);

										if (d.timing) {
											d.initTimer(f);
										}
									}

									break;

								case 116:
									a.preventDefault();

									if (f.isListMode()) {
										b = a.shiftKey ? d.number : 0;
										f.go(b);
										f.enterSlideMode();
										f.showPresenterNotes(b);

										if (d.timing) {
											d.initTimer(f);
										}
									} else {
										f.enterListMode();
									}

									break;

								case 13:
									if (f.isListMode() && -1 !== c) {
										a.preventDefault();
										f.enterSlideMode();
										f.showPresenterNotes(c);

										if (d.timing) {
											d.initTimer(f);
										}
									}

									break;

								case 27:
									if (f.isSlideMode()) {
										a.preventDefault();
										f.enterListMode();
									}

									break;

								case 33:
								case 38:
								case 37:
								case 72:
								case 75:
									if (a.altKey || a.ctrlKey || a.metaKey) {
										return;
									}

									a.preventDefault();

									f._turnPreviousSlide();

									break;

								case 34:
								case 40:
								case 39:
								case 76:
								case 74:
									if (a.altKey || a.ctrlKey || a.metaKey) {
										return;
									}

									a.preventDefault();

									f._turnNextSlide();

									break;

								case 36:
									a.preventDefault();
									f.first();
									break;

								case 35:
									a.preventDefault();
									f.last();
									break;

								case 9:
								case 32:
									a.preventDefault();
									f[
										a.shiftKey
											? "_turnPreviousSlide"
											: "_turnNextSlide"
									]();
							}
						},
						!1
					),
					f.init(),
					b.addEventListener(
						"click",
						function(a) {
							var b,
								c,
								d = f._getSlideIdByEl(a.target);

							if (d && f.isListMode()) {
								b = f.getSlideNumber(d);
								f.go(b);
								f.enterSlideMode();
								f.showPresenterNotes(b);
								c = f.slideList[b];

								if (c.timing) {
									c.initTimer(f);
								}
							}
						},
						!1
					),
					b.addEventListener(
						"touchstart",
						function(b) {
							var c,
								d,
								e,
								g = f._getSlideIdByEl(b.target);

							if (
								g &&
								f.isSlideMode() &&
								!f._checkInteractiveElement(b)
							) {
								e = b.touches[0].pageX;

								if (e > a.innerWidth / 2) {
									f._turnNextSlide();
								} else {
									f._turnPreviousSlide();

									if (f.isListMode()) {
										c = f.getSlideNumber(g);
										f.go(c);
										f.enterSlideMode();
										f.showPresenterNotes(c);
										d = f.slideList[c];

										if (d.timing) {
											d.initTimer(f);
										}
									}
								}
							}
						},
						!1
					),
					b.addEventListener(
						"touchmove",
						function(a) {
							if (f.isSlideMode()) {
								a.preventDefault();
							}
						},
						!1
					),
					b.addEventListener("wheel", f.wheel, !1),
					b.addEventListener("mousewheel", f.wheel, !1),
					f
				);
			} else {
				console.log(h_cls + " is not found");
			}
		})(root, root.document);
})("undefined" !== typeof window ? window : this);
