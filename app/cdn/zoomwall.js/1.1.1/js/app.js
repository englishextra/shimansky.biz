(function(w, d){
	"use strict";
	/*!
	 * make gallery and attach zoomwall.js (gallery maker) and echo.js (lazyloader)
	 */
	var zoomwallGallery = d.getElementById("zoomwall") || "";
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
		var generateGallery = new Promise(function (resolve, reject) {
			var jsonObj;
			try {
				jsonObj = JSON.parse(text);
				if (!jsonObj[0][jsonHighresKeyName]) {
					throw new Error("incomplete JSON data: no " + jsonHighresKeyName);
				} else {
					if (!jsonObj[0][jsonSrcKeyName]) {
						throw new Error("incomplete JSON data: no " + jsonSrcKeyName);
					}
				}
			} catch (err) {
				console.log("cannot init generateGallery", err);
				return;
			}
			var df = d.createDocumentFragment();
			var key;
			for (key in jsonObj) {
				if (jsonObj.hasOwnProperty(key)) {
					if (jsonObj[key][jsonSrcKeyName] && jsonObj[key][jsonHighresKeyName]) {
						var img = d.createElement("img");
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
						df.appendChild(d.createTextNode("\n"));
					}
				}
			}
			key = null;
			/* var i;
			for (i = 0; i < jsonObj.length; i += 1) {
				var img = d.createElement("img");
				img.src = jsonObj[i].src;
				img.dataset[jsonHighresKeyName] = jsonObj[i][jsonHighresKeyName];
				img.classList.add(imgClass);
				df.appendChild(img);
				df.appendChild(d.createTextNode("\n"));
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
				if (zoomwallGallery) {
					zoomwall.create(zoomwallGallery, true, jsonHighresKeyName);
				}
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
		echo(imgClass, jsonHighresKeyName);
	};
	w.addEventListener("load", initEcho); */
}("undefined" !== typeof window ? window : this, document));
