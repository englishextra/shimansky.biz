!function t(e,n,r){function o(a,u){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!u&&s)return s(a,!0);if(i)return i(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e){"use strict";function n(t,e){function n(){e.listen.apply(e,l.concat([o])),e.listen("cssInput",i)}function o(t,e){f[t]=e,c()}function i(t,e){p=e,c()}function c(){var n=l.every(function(t){return t in f});if(n&&p){f.lineHeightPx=Math.round(f.lineHeight*f.fontSize),d=a(f,0,12),y=u(f,d,p);var o=s.css(y),i=s.scss(d,f);if(t){if(t&&0==t.children.length){var c="";c+='<pre class="css css-editor"></pre>',c+='<pre class="scss"></pre>',t.innerHTML=c,t.dataset.layout=f.format,h=t.querySelector(".css-editor"),h.innerHTML=s.cssEditor(p,y),m=t.querySelector(".scss")}t.dataset.layout=f.format,r(y,h),m.innerHTML=i}e.set("cssOutput",o),e.set("scssOutput",i)}}var l=["fontSize","lineHeight","scaleFactor","format","unit"],f={},p=void 0,d=void 0,y=void 0,h=void 0,m=void 0;n()}function r(t,e,n,a){a=a||0;var u=" ".repeat(a);n=n||"",n+=i.PATH_SEPARATOR;for(var c in t){var l=t[c],f=s.sanitizeString(n+c),p=e.querySelector("#"+f+"_output");if("string"==typeof l&&p.innerText!==l){var d=s.formatString(c,l,u);p.textContent=d,""===l.trim()?e.querySelector("#"+f).classList.add("empty"):e.querySelector("#"+f).classList.remove("empty")}else"object"===("undefined"==typeof l?"undefined":o(l))&&r(l,e,f,a+1)}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=n;var i=t("./const.js"),a=t("./scalecalculator.js"),u=t("./rulecomputer.js"),s=t("./stylewriter.js")},{"./const.js":2,"./rulecomputer.js":3,"./scalecalculator.js":4,"./stylewriter.js":5}],2:[function(t,e){"use strict";var n="\ud83d\udc9f";e.exports={PATH_SEPARATOR:n}},{}],3:[function(t,e){"use strict";function n(t,e,a,u){var s={};if(u=u||0,"font-size"in a){var c=a["font-size"].match(i);c&&(u=Math.round(parseInt(c[0])))}for(var l in a)if(a.hasOwnProperty(l)){var f=a[l];"string"==typeof f?f=r(t,e,l,f,u):"object"===("undefined"==typeof f?"undefined":o(f))&&(f=n(t,e,f,u)),s[l]=f}return s}function r(t,e,n,r,o){var u=r;return u=u.replace(/\[base(FontSize|LineHeightPx|LineHeight|ScaleFactor|ScaleType|Unit|Format)\]/g,function(e,n){return n=n&&n[0].toLowerCase()+n.slice(1),"fontSize"===n||"lineHeightPx"===n?t[n]+"px":t[n]}),u=u.replace(/\[(scaleExponent|fontSize|line|autoLineCount|autoLineHeight)\]/g,function(t,n){return"scaleExponent"===n?o:e[o][n]}),u=u.replace(i,function(t){return t=t.replace("sx",""),t=Math.round(parseInt(t)),e[t].fontSize}),u=u.replace(a,function(n){return n=n.replace("gr",""),n=Math.round(parseFloat(n)),n*parseFloat(e[o].line)+t.unit}),"line-height"!==n||"auto"!==r.trim()&&"0"!=parseInt(r,10)||(u=e[o].autoLineHeight),u}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};n.valueComputer=r,e.exports=n;var i=/\b[0-9]+sx\b/g,a=/\b[0-9]+gr\b/g},{}],4:[function(t,e){"use strict";function n(t,e,n){for(var r=parseInt(t.fontSize,10),o=Math.round(t.lineHeight*r),i=t.scaleFactor,a={},u=e;u<=n;u++){a[u]={};var s=Math.round(r*Math.pow(i,u)),c=Math.ceil(s/o),l=o*c;a[u].fontSize=s,a[u].line=o,a[u].autoLineCount=c,a[u].autoLineHeight=l}if("rem"==t.unit)for(var f=t.fontSize,p=r/f,d=e;d<=n;d++){var y=a[d].fontSize,h=(a[d].line,a[d].autoLineHeight,a[d].autoLineCount),m=y/f,v=o/r*p,b=v*h;a[d].fontSize=Math.round(1e7*m)/1e7,a[d].line=Math.round(1e7*v)/1e7,a[d].autoLineHeight=Math.round(1e7*b)/1e7}if("em"==t.unit)for(var S=t.fontSize,g=r/S,x=e;x<=n;x++){var H=a[x].fontSize,z=(a[x].line,a[x].autoLineHeight,a[x].autoLineCount);if(0==x)var L=H/S,_=o/r,P=_*z;else var L=H/g/S,_=o/r/L,P=_*z;a[x].fontSize=Math.round(1e8*L)/1e8,a[x].line=Math.round(1e8*_)/1e8,a[x].autoLineHeight=Math.round(1e8*P)/1e8}for(var M in a)a[M].fontSize=a[M].fontSize+t.unit,a[M].line=a[M].line+t.unit,a[M].autoLineHeight=a[M].autoLineHeight+t.unit;return a}e.exports=n},{}],5:[function(t,e){"use strict";function n(t){return o(f,t)}function r(t,e){var n="$root: (\n fontSize: "+e.fontSize+"px,\n lineHeight: "+e.lineHeightPx+"px\n);\n";return n+o(p,t)}function o(t,e,n){n=n||0;var r=" ".repeat(n),i="",a=t,c=0,l=Object.keys(e).length-1;for(var f in e)if(e.hasOwnProperty(f)){var p=e[f];f.match(/^apptext/)||f.match(/^usertext/)?""!==p.trim()&&(i+=r+u(f,p,r)+"\n"):"string"==typeof p||"number"==typeof p?(i+=""+r+a.start+f+a.assign+p,i+=c<l?""+a.end:""+a.lastEnd):"object"===("undefined"==typeof p?"undefined":s(p))&&(i+=r,i+=a.blockPrefix,i+=f,p.userselector&&(i+=p.userselector),i+=a.blockStart,i+=o(a,p,n+1),i+=r,i+=a.blockEnd),c+=1}return i}function i(t,e,n,r){r=r||"",r+=c.PATH_SEPARATOR,n=n||0;var o=" ".repeat(n),f="";for(var p in t)if(t.hasOwnProperty(p)){var d=t[p],y=e[p],h=(r+p).replace('"',"&quot;"),m=a(h);if(p.match(/^apptext/))f+='<span class="apptext" id="'+m+'">',f+=o,f+='<output id="'+m+'_output">',f+=u(p,y,o),f+="</output>",f+="</span>\n";else if(p.match(/^usertext/)){var v=o.length+"ch",b="width: calc(100% - "+v+"); margin-left: "+v,S="";""===d.trim()&&(S="empty"),f+='<label for="'+m+'_input" id="'+m+'" class="'+S+'">',f+='<span class="autoresize usertext">',f+=o,f+='<textarea placeholder="font-family, weight, etc&hellip;" style="'+b+'" id="'+m+'_input" data-path="'+h+'" data-indent="'+o+'">',f+=d,f+="</textarea>",f+='<output for="'+m+'_input" id="'+m+'_output">',f+=u(p,y,o),f+="</output>",f+="</span>\n",f+="</label>"}else if("string"!=typeof d&&"number"!=typeof d||"userselector"===p){if("object"===("undefined"==typeof d?"undefined":s(d))){if(f+=o+'<span class="rule">'+p,d.userselector){var g=d.userselector,x="",H=m+c.PATH_SEPARATOR+"userselector",z=h+c.PATH_SEPARATOR+"userselector";""===g.trim()&&(x="empty"),f+='<label for="'+H+'_input" id="'+H+'" class="'+x+'">',f+='<span class="autoresize userselector">',f+='<input type="text" id="'+H+'_input" data-path="'+z+'" value="'+g+'" style="width: 100%;">',f+='<output for="'+H+'_input" id="'+H+'_output">',f+=g,f+="</output>",f+="</span>",f+="</label>"}f+=" {\n",f+=i(d,y,n+1,h),f+=o+"}</span>\n"}}else{var L=parseInt(d,10),_=d.replace(l,""),P=0,M=12,E=1;"max-width"===p&&"px"===_&&(M=2700),"max-width"===p&&"gr"===_&&(M=120),"line-height"===p&&"auto"===d&&(L=0,_="gr"),f+=o,f+='<label for="'+m+'_input" id="'+m+'" class="scrubbablenumber">',f+=p+": ",f+='<input id="'+m+'_input" data-path="'+h+'" min="'+P+'" max="'+M+'" step="'+E+'" value="'+L+'" data-unit="'+_+'" type="number">',f+='<output for="'+m+'_input" id="'+m+'_output">',f+=y,f+="</output>;",f+="</label>\n"}}return f}function a(t){var e=/^[0-9]|&quot;|'|"|\n|\s|!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\.|\/|\:|\;|<|=|>|\?|\@|\[|\]|\^|`|{|\||}|~/g;return t=t.replace(e,"_")}function u(t,e,n){e=e.replace(/\n/g,function(){return"\n"+n});var r=e.trim();return"usertext"!==t||""===r||r.match(/;$/)||(e+=";"),e}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports={css:n,scss:r,cssEditor:i,sanitizeString:a,formatString:u};var c=t("./const.js"),l=/(?:\d*\.)?\d+/,f={blockPrefix:"",blockStart:" {\n",blockEnd:"}\n",start:"",assign:": ",end:";\n",lastEnd:";"},p={blockPrefix:"$scale",blockStart:": (\n",blockEnd:");\n",start:"",assign:": ",end:",\n",lastEnd:"\n"}},{"./const.js":2}]},{},[1]);