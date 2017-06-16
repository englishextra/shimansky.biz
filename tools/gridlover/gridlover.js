!function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e){"use strict";function n(t,e,n,p,d){for(var v=e.rootElement.querySelectorAll("[disabled], [readonly]"),y=v.length-1;y>=0;y--)v[y].removeAttribute("disabled"),v[y].removeAttribute("readonly");var m=new r(t),g=(new i(e.metaEditorElement,m),new a(e.baseEditorElement,m),new u(e.contentEditorElement,m),new s(e.stylesEditorElement,m),new l(e.stylesEditorElement,m),new o(m,n,p,d,e.previewElement));m.set(t),g.initSave();new f,new c(e.stylesEditorElement,".rule input, .rule textarea, .empty");return m}e.exports=n;var r=(t("./const.js"),t("./model.js")),o=t("./io.js"),i=t("./meta.js"),a=t("./base.js"),s=t("./rules.js"),u=t("./content.js"),l=t("./styles.js"),c=t("./cleancopypaste.js"),f=t("./scrubbablenumbers.js")},{"./base.js":2,"./cleancopypaste.js":3,"./const.js":4,"./content.js":5,"./io.js":6,"./meta.js":7,"./model.js":8,"./rules.js":10,"./scrubbablenumbers.js":12,"./styles.js":13}],2:[function(t,e){"use strict";function n(t,e){function n(){var n=!0,i=!1,a=void 0;try{for(var s,u=o[Symbol.iterator]();!(n=(s=u.next()).done);n=!0)for(var l=s.value,c=t.querySelectorAll('[name="'+l+'"]'),f=0;f<c.length;f++)c[f].value=e.get(l),c[f].addEventListener("input",r)}catch(t){i=!0,a=t}finally{try{!n&&u["return"]&&u["return"]()}finally{if(i)throw a}}t.querySelector("#scaleFactorPresets").addEventListener("change",r),t.querySelector("#format").addEventListener("change",r),t.querySelector("#unit").addEventListener("change",r)}function r(n){var r=n.target.name,o=n.target.value;["fontSize","lineHeight","scaleFactor"].indexOf(r)!==-1&&(o=parseFloat(o)),e.set(r,o);for(var i=t.querySelectorAll('[name="'+r+'"]'),a=0;a<i.length;a++)i[a]!==n.target&&(i[a].value=o)}var o=["fontSize","lineHeight","scaleFactor","format","unit"];n()}e.exports=n},{}],3:[function(t,e){"use strict";function n(t,e){function n(){t.addEventListener("beforecopy",function(n){if(!i(n)){var o=t.querySelectorAll(e);r(o)}}),t.addEventListener("copy",function(n){i(n)||!function(){var n=t.querySelectorAll(e);r(n),setTimeout(function(){o(n)},0)}()})}n()}function r(t){for(var e=0;e<t.length;e++)t[e].style.display="none"}function o(t){for(var e=0;e<t.length;e++)t[e].style.display=""}function i(t){var e=t.target;return"TEXTAREA"==e.tagName&&"INPUT"==e.tagName}e.exports=n},{}],4:[function(t,e){"use strict";var n="\ud83d\udc9f";e.exports={PATH_SEPARATOR:n}},{}],5:[function(t,e){"use strict";function n(t,e){function n(){t.querySelector('[name="headInput"]').value=e.get("headInput"),t.querySelector('[name="bodyInput"]').value=e.get("bodyInput"),t.addEventListener("input",r)}function r(t){var n=t.target.name,r=t.target.value;"headInput"===n&&e.set("headInput",r),"bodyInput"===n&&e.set("bodyInput",r)}n()}e.exports=n},{}],6:[function(t,e){"use strict";function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e,o,a,s){function u(){t.listen.apply(t,r(g).concat([c])),t.listen("reset",y)}function l(){t.listen.apply(t,r(g).concat([f])),"local"===e?(h=p,S=500):o&&a&&(E=new XMLHttpRequest,E.addEventListener("readystatechange",v,!1),h=d,S=2e3)}function c(t,e){s.contentWindow.postMessage(n({},t,e),location.origin)}function f(e,n){t.signal("state","Edited"),null!==n&&"object"===("undefined"==typeof n?"undefined":i(n))&&(n=JSON.stringify(n)),x[e]=n,clearTimeout(b),b=setTimeout(h,S)}function p(){for(var t in x){var e=x[t];localStorage.setItem(t,e)}v(!0)}function d(){t.signal("state","Saving"),E.abort(),E.open("PUT",location.href),E.setRequestHeader("X_CSRF_TOKEN",a),E.setRequestHeader("Content-Type","application/json"),E.send(JSON.stringify(x))}function v(e){var n=e===!0,r={done:!1,ok:!1};e.target&&(r.done=e.target.readyState==XMLHttpRequest.DONE,r.ok=200===e.target.status),n||r.done&&r.ok?(x={},t.signal("state","Saved")):r.done&&(console.error("Save failed",e),t.signal("state","Save failed, trying again"),setTimeout(d,2e3))}function y(){if(t.signal("state","Resetting"),clearTimeout(b),"local"===e)localStorage.clear(),location.reload();else if(o&&a){E.abort();var n=new XMLHttpRequest;n.addEventListener("readystatechange",m,!1),n.open("POST",location.href),n.setRequestHeader("X_CSRF_TOKEN",a),n.setRequestHeader("Content-Type","application/json"),n.send('{"reset": true}')}}function m(e){var n=e.target.readyState==XMLHttpRequest.DONE,r=200===e.target.status;n&&r?location.reload():n&&(console.error("Reset failed",e),t.signal("state","Reset failed, please reload the page and try again"))}var g=t.keys(),b=void 0,h=void 0,S=void 0,E=void 0,x={};return u(),{initSave:l}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=o;t("./const.js")},{"./const.js":4}],7:[function(t,e){"use strict";function n(t,e){function n(){var n=e.get("title");u=t.querySelector('[name="title"]'),l=t.querySelector('output[for="title"]'),u&&(u.value=n),l&&(l.textContent=n),s=t.querySelector('[name="state"]'),a=document.title,document.title=r(n,a);for(var c=t.querySelectorAll('[name="showGrid"],[name="showContent"],[name="showStyles"]'),f=0;f<c.length;f++){var p=c[f],d=p.name;e.get(d)===!0?(p.classList.add("hilite"),t.classList.add(d)):e.get(d)===!1&&(p.classList.remove("hilite"),t.classList.remove(d))}t.addEventListener("input",o),t.addEventListener("click",o),e.listen("state",i)}function o(n){var o=n.target,i=o.name,s=o.value;if("title"===i){var u=s;l.textContent=u,document.title=r(u,a),e.set("title",u)}else e.has(i)&&o.classList.contains("toggle")?e.get(i)===!0?(t.classList.remove(i),o.classList.remove("hilite"),e.set(i,!1)):e.get(i)===!1&&(t.classList.add(i),o.classList.add("hilite"),e.set(i,!0)):"reset"===i&&e.signal("reset")}function i(t,e){s&&(s.textContent=e)}var a=void 0,s=void 0,u=void 0,l=void 0;n()}function r(t,e){return t+"\u2009\u2014\u2009"+e}e.exports=n},{}],8:[function(t,e){"use strict";function n(t){function e(){return Object.keys(t)}function n(e){return e in t}function r(e){return void 0===e?Object.assign({},t):e in t?t[e]:void 0}function o(){var e={};if((arguments.length<=0?void 0:arguments[0])===Object(arguments.length<=0?void 0:arguments[0]))e=arguments.length<=0?void 0:arguments[0];else{var n=arguments.length<=0?void 0:arguments[0],r=arguments.length<=1?void 0:arguments[1];e[n]=r}for(var o in e)if(o in t){var i=e[o];t[o]=i,a(o,i)}}function i(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e.pop(),o=e,i=!0,a=!1,s=void 0;try{for(var l,c=o[Symbol.iterator]();!(i=(l=c.next()).done);i=!0){var f=l.value;f in u==!1&&(u[f]=[]),u[f].push(r)}}catch(t){a=!0,s=t}finally{try{!i&&c["return"]&&c["return"]()}finally{if(a)throw s}}}function a(t,e){t in u&&u[t].forEach(function(n){n(t,e)})}function s(t,e){t in u&&(u[t]=u[t].filter(function(t){return t!==e}))}var u={};return{has:n,get:r,set:o,keys:e,listen:i,signal:a,ignore:s}}e.exports=n},{}],9:[function(t,e){"use strict";function n(t,e,a,s){var u={};if(s=s||0,"font-size"in a){var l=a["font-size"].match(i);l&&(s=Math.round(parseInt(l[0])))}for(var c in a)if(a.hasOwnProperty(c)){var f=a[c];"string"===typeof f?f=r(t,e,c,f,s):"object"===("undefined"==typeof f?"undefined":o(f))&&(f=n(t,e,f,s)),u[c]=f}return u}function r(t,e,n,r,o){var s=r;return s=s.replace(/\[base(FontSize|LineHeightPx|LineHeight|ScaleFactor|ScaleType|Unit|Format)\]/g,function(e,n){return n=n&&n[0].toLowerCase()+n.slice(1),"fontSize"===n||"lineHeightPx"===n?t[n]+"px":t[n]}),s=s.replace(/\[(scaleExponent|fontSize|line|autoLineCount|autoLineHeight)\]/g,function(t,n){return"scaleExponent"===n?o:e[o][n]}),s=s.replace(i,function(t){return t=t.replace("sx",""),t=Math.round(parseInt(t)),e[t].fontSize}),s=s.replace(a,function(n){return n=n.replace("gr",""),n=Math.round(parseFloat(n)),n*parseFloat(e[o].line)+t.unit}),"line-height"!==n||"auto"!==r.trim()&&"0"!=parseInt(r,10)||(s=e[o].autoLineHeight),s}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};n.valueComputer=r,e.exports=n;var i=/\b[0-9]+sx\b/g,a=/\b[0-9]+gr\b/g},{}],10:[function(t,e){"use strict";function n(t,e){function n(){t.addEventListener("input",o),t.addEventListener("change",o)}function o(t){var n=t.target.dataset.path,o=t.target.value,a=t.target.dataset.unit;if(a&&(o+=a),o&&n){var s=e.get("cssInput");s=r(s,n.split(i.PATH_SEPARATOR),o),e.set("cssInput",s)}}n()}function r(t,e,n){var r=t,i=!0,a=!1,s=void 0;try{for(var u,l=e[Symbol.iterator]();!(i=(u=l.next()).done);i=!0){var c=u.value;if(""!=c)if("object"===o(r[c]))r=r[c];else if("string"===typeof r[c]){c in r&&(r[c]=n);break}}}catch(t){a=!0,s=t}finally{try{!i&&l["return"]&&l["return"]()}finally{if(a)throw s}}return t}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=n;var i=t("./const.js")},{"./const.js":4}],11:[function(t,e){"use strict";function n(t,e,n){for(var r=parseInt(t.fontSize,10),o=Math.round(t.lineHeight*r),i=t.scaleFactor,a={},s=e;s<=n;s++){a[s]={};var u=Math.round(r*Math.pow(i,s)),l=Math.ceil(u/o),c=o*l;a[s].fontSize=u,a[s].line=o,a[s].autoLineCount=l,a[s].autoLineHeight=c}if("rem"==t.unit)for(var f=t.fontSize,p=r/f,d=e;d<=n;d++){var v=a[d].fontSize,y=(a[d].line,a[d].autoLineHeight,a[d].autoLineCount),m=v/f,g=o/r*p,b=g*y;a[d].fontSize=Math.round(1e7*m)/1e7,a[d].line=Math.round(1e7*g)/1e7,a[d].autoLineHeight=Math.round(1e7*b)/1e7}if("em"==t.unit)for(var h=t.fontSize,S=r/h,E=e;E<=n;E++){var x=a[E].fontSize,L=(a[E].line,a[E].autoLineHeight,a[E].autoLineCount);if(0==E)var j=x/h,w=o/r,H=w*L;else var j=x/S/h,w=o/r/j,H=w*L;a[E].fontSize=Math.round(1e8*j)/1e8,a[E].line=Math.round(1e8*w)/1e8,a[E].autoLineHeight=Math.round(1e8*H)/1e8}for(var T in a)a[T].fontSize=a[T].fontSize+t.unit,a[T].line=a[T].line+t.unit,a[T].autoLineHeight=a[T].autoLineHeight+t.unit;return a}e.exports=n},{}],12:[function(t,e){"use strict";function n(){function t(){document.addEventListener("focusin",e),document.addEventListener("input",n),document.addEventListener("mouseup",u),document.addEventListener("mousedown",a)}function e(t){clearTimeout(l);var e=t.target.parentElement;e&&e.classList.contains("scrubbablenumber")?(c=t.target,i(c),o(c)):c=null}function n(t){clearTimeout(l);var e=t.target.parentElement;e.classList.contains("scrubbablenumber")?(c=t.target,c.value=r(c.min,c.max,t.target.value),l=setTimeout(function(){i(c)},500),o(c)):c=null}function a(t){clearTimeout(l),t.target.parentElement.classList.contains("scrubbablenumber")?(f=document.createElement("div"),f.setAttribute("style","position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999;"),document.body.appendChild(f),c=t.target,p.posX=t.screenX,p.value=parseInt(c.value),p.step=parseInt(c.step),p.min=parseInt(c.min),p.max=parseInt(c.max),document.addEventListener("mousemove",s),i(c)):c=null}function s(t){if(c){var e=p.min,n=p.max,o=p.step,i=n-e,a=i/o,s=200,u=s/a+1,l=(p.posX-t.screenX)*-1,f=p.value+Math.round(l/u);c.value=r(p.min,p.max,f);var d=new Event("input",{bubbles:!0,cancelable:!1});c.dispatchEvent(d)}}function u(){document.removeEventListener("mousemove",s),f&&(f.remove(),f=null),c&&(i(c),c=null)}var l=void 0,c=void 0,f=void 0,p={};t()}function r(t,e,n){return n=Math.max(t,n),n=Math.min(e,n)}function o(t){var e=t.value.length+3;t.style.width="calc(100% + "+e+"ch)"}function i(t){t&&t.select()}e.exports=n},{}],13:[function(t,e){"use strict";function n(t,e){function n(){e.listen.apply(e,c.concat([o])),e.listen("cssInput",i)}function o(t,e){f[t]=e,l()}function i(t,e){p=e,l()}function l(){var n=c.every(function(t){return t in f});if(n&&p){f.lineHeightPx=Math.round(f.lineHeight*f.fontSize),d=a(f,0,12),v=s(f,d,p);var o=u.css(v),i=u.scss(d,f);if(t){if(t&&0==t.children.length){var l="";l+='<pre class="css css-editor"></pre>',l+='<pre class="scss"></pre>',t.innerHTML=l,t.dataset.layout=f.format,y=t.querySelector(".css-editor"),y.innerHTML=u.cssEditor(p,v),m=t.querySelector(".scss")}t.dataset.layout=f.format,r(v,y),m.innerHTML=i}e.set("cssOutput",o),e.set("scssOutput",i)}}var c=["fontSize","lineHeight","scaleFactor","format","unit"],f={},p=void 0,d=void 0,v=void 0,y=void 0,m=void 0;n()}function r(t,e,n,a){a=a||0;var s=" ".repeat(a);n=n||"",n+=i.PATH_SEPARATOR;for(var l in t){var c=t[l],f=u.sanitizeString(n+l),p=e.querySelector("#"+f+"_output");if("string"===typeof c&&p.innerText!==c){var d=u.formatString(l,c,s);p.textContent=d,""===c.trim()?e.querySelector("#"+f).classList.add("empty"):e.querySelector("#"+f).classList.remove("empty")}else"object"===("undefined"==typeof c?"undefined":o(c))&&r(c,e,f,a+1)}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=n;var i=t("./const.js"),a=t("./scalecalculator.js"),s=t("./rulecomputer.js"),u=t("./stylewriter.js")},{"./const.js":4,"./rulecomputer.js":9,"./scalecalculator.js":11,"./stylewriter.js":14}],14:[function(t,e){"use strict";function n(t){return o(f,t)}function r(t,e){var n="$root: (\n fontSize: "+e.fontSize+"px,\n lineHeight: "+e.lineHeightPx+"px\n);\n";return n+o(p,t)}function o(t,e,n){n=n||0;var r=" ".repeat(n),i="",a=t,l=0,c=Object.keys(e).length-1;for(var f in e)if(e.hasOwnProperty(f)){var p=e[f];f.match(/^apptext/)||f.match(/^usertext/)?""!==p.trim()&&(i+=r+s(f,p,r)+"\n"):"string"===typeof p||"number"==typeof p?(i+=""+r+a.start+f+a.assign+p,i+=l<c?""+a.end:""+a.lastEnd):"object"===("undefined"==typeof p?"undefined":u(p))&&(i+=r,i+=a.blockPrefix,i+=f,p.userselector&&(i+=p.userselector),i+=a.blockStart,i+=o(a,p,n+1),i+=r,i+=a.blockEnd),l+=1}return i}function i(t,e,n,r){r=r||"",r+=l.PATH_SEPARATOR,n=n||0;var o=" ".repeat(n),f="";for(var p in t)if(t.hasOwnProperty(p)){var d=t[p],v=e[p],y=(r+p).replace('"',"&quot;"),m=a(y);if(p.match(/^apptext/))f+='<span class="apptext" id="'+m+'">',f+=o,f+='<output id="'+m+'_output">',f+=s(p,v,o),f+="</output>",f+="</span>\n";else if(p.match(/^usertext/)){var g=o.length+"ch",b="width: calc(100% - "+g+"); margin-left: "+g,h="";""===d.trim()&&(h="empty"),f+='<label for="'+m+'_input" id="'+m+'" class="'+h+'">',f+='<span class="autoresize usertext">',f+=o,f+='<textarea placeholder="font-family, weight, etc&hellip;" style="'+b+'" id="'+m+'_input" data-path="'+y+'" data-indent="'+o+'">',f+=d,f+="</textarea>",f+='<output for="'+m+'_input" id="'+m+'_output">',f+=s(p,v,o),f+="</output>",f+="</span>\n",f+="</label>"}else if("string"!=typeof d&&"number"!=typeof d||"userselector"===p){if("object"===("undefined"==typeof d?"undefined":u(d))){if(f+=o+'<span class="rule">'+p,d.userselector){var S=d.userselector,E="",x=m+l.PATH_SEPARATOR+"userselector",L=y+l.PATH_SEPARATOR+"userselector";""===S.trim()&&(E="empty"),f+='<label for="'+x+'_input" id="'+x+'" class="'+E+'">',f+='<span class="autoresize userselector">',f+='<input type="text" id="'+x+'_input" data-path="'+L+'" value="'+S+'" style="width: 100%;">',f+='<output for="'+x+'_input" id="'+x+'_output">',f+=S,f+="</output>",f+="</span>",f+="</label>"}f+=" {\n",f+=i(d,v,n+1,y),f+=o+"}</span>\n"}}else{var j=parseInt(d,10),w=d.replace(c,""),H=0,T=12,A=1;"max-width"===p&&"px"===w&&(T=2700),"max-width"===p&&"gr"===w&&(T=120),"line-height"===p&&"auto"===d&&(j=0,w="gr"),f+=o,f+='<label for="'+m+'_input" id="'+m+'" class="scrubbablenumber">',f+=p+": ",f+='<input id="'+m+'_input" data-path="'+y+'" min="'+H+'" max="'+T+'" step="'+A+'" value="'+j+'" data-unit="'+w+'" type="number">',f+='<output for="'+m+'_input" id="'+m+'_output">',f+=v,f+="</output>;",f+="</label>\n"}}return f}function a(t){var e=/^[0-9]|&quot;|'|"|\n|\s|!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\.|\/|\:|\;|<|=|>|\?|\@|\[|\]|\^|`|{|\||}|~/g;return t=t.replace(e,"_")}function s(t,e,n){e=e.replace(/\n/g,function(){return"\n"+n});var r=e.trim();return"usertext"!==t||""===r||r.match(/;$/)||(e+=";"),e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports={css:n,scss:r,cssEditor:i,sanitizeString:a,formatString:s};var l=t("./const.js"),c=/(?:\d*\.)?\d+/,f={blockPrefix:"",blockStart:" {\n",blockEnd:"}\n",start:"",assign:": ",end:";\n",lastEnd:";"},p={blockPrefix:"$scale",blockStart:": (\n",blockEnd:");\n",start:"",assign:": ",end:",\n",lastEnd:"\n"}},{"./const.js":4}]},{},[1]);