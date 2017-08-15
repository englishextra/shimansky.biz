/*!
 * make gallery and attach zoomwall.js (gallery maker) and echo.js (lazyloader)
 */
var zoomwallGallery = document.getElementById("zoomwall") || "";
if (zoomwallGallery) {
	var imgClass = "data-src-img"; // lazyloader finds images using class this name
	var jsonHighresKeyName = "highres"; // should be same img data attribute as in json high resolution key name
	var jsonSrcKeyName = "src"; // will be an initial img src from json
	var jsonUrl = "./json/zoomwall.json"; // images list
	var myHeaders = new Headers();
	fetch(jsonUrl, {
		headers: myHeaders,
		credentials: "same-origin"
	}).then(function (response) {
		if (response.ok) {
			return response.text();
		} else {
			throw new Error("cannot fetch", jsonUrl);
		}
	}).then(function (text) {
		var jsonObj = JSON.parse(text);
		var generateGallery = new Promise(function (resolve, reject) {
			var df = document.createDocumentFragment();
			var key;
			for (key in jsonObj) {
				if (jsonObj.hasOwnProperty(key)) {
					if (jsonObj[key][jsonSrcKeyName] && jsonObj[key][jsonHighresKeyName]) {
						var img = document.createElement("img");
						if ((/^([0-9]+)(\x|\ )([0-9]+)$/).test(jsonObj[key][jsonSrcKeyName])) {
							img.src = ["data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20",
								jsonObj[key][jsonSrcKeyName].replace("x", "%20"),
								"%27%2F%3E"].join("");
						} else {
							img.src = jsonObj[key][jsonSrcKeyName];
						}
						img.dataset[jsonHighresKeyName] = jsonObj[key][jsonHighresKeyName];
						img.classList.add(imgClass);
						df.appendChild(img);
						df.appendChild(document.createTextNode("\n"));
					}
				}
			}
			key = null;
			/* var i;
			for (i = 0; i < jsonObj.length; i += 1) {
				var img = document.createElement("img");
				img.src = jsonObj[i].src;
				img.dataset[jsonHighresKeyName] = jsonObj[i][jsonHighresKeyName];
				img.classList.add(imgClass);
				df.appendChild(img);
				df.appendChild(document.createTextNode("\n"));
			}
			i = null; */
			if (zoomwallGallery.appendChild(df)) {
				resolve();
			} else {
				reject();
			}
		});
		generateGallery.then(function (result) {
			return result;
		}).then(function (result) {
			var timers = setTimeout(function () {
				clearTimeout(timers);
				timers = null;
				zoomwall.create(zoomwallGallery, true, jsonHighresKeyName);
			}, 200);
		}).then(function (result) {
			var timers = setTimeout(function () {
				clearTimeout(timers);
				timers = null;
				echo(imgClass, jsonHighresKeyName);
			}, 200);
		}).catch (function (err) {
			console.log("Cannot create zoomwall gallery", err);
		});
	}).catch (function (err) {
		console.log("cannot parse", jsonUrl);
	});
	/* var initEcho = function () {
		"use strict";
		echo(imgClass, jsonHighresKeyName);
	};
	window.addEventListener("load", initEcho); */
}
