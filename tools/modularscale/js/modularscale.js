function ms(a,b,c){"string"===typeof a&&(a=1);void 0==a&&(a=msValue);void 0==b&&(b=msBases);void 0==c&&(c=msRatios);0>=b&&(b=1);"number"!=typeof Math.abs(b[0])&&(b=1);b=(""+b).split(",");c=(""+c).split(",");for(var d=[],g,e=0;e<c.length;e++)for(var h=0;h<b.length;h++)if(g=h+e,0<=a){for(var f=0;Math.pow(c[e],f)*b[h]>=b[0];)d.push([Math.pow(c[e],f)*b[h],g]),f--;for(f=0;Math.pow(c[e],f)*b[h]<=Math.pow(c[e],a+1)*b[h];)d.push([Math.pow(c[e],f)*b[h],g]),f++}else{for(f=0;Math.pow(c[e],f)*b[h]<=b[0];)d.push([Math.pow(c[e],f)*b[h],g]),f++;for(f=0;Math.pow(c[e],f)*b[h]>=Math.pow(c[e],a-1)*b[h];)Math.pow(c[e],f)*b[h]<=b[0]&&d.push([Math.pow(c[e],f)*b[h],g]),f--}return d=msUnique(d),0>a&&(d=d.reverse()),d[Math.abs(a)]}function changeBase(a,b){msBase=[];msUnit=null;var c=!1;if(null!=a){var d=a.value.match(/^(\d+(?:\.\d+)?)(.*)$/);38==b?a.value=d[1]-0+1+d[2]:40==b&&1<d[1]&&(a.value=d[1]-1+d[2])}for(var d=document.getElementsByClassName("base"),g=0;g<d.length;g++)v=("0"+d[g].value).match(/^(\d+(?:\.\d+)?)(.*)$/),0<v[1]?msBase.push(v[1].slice(1)):c="Your base must be greater than 0",null==msUnit&&(msUnit=v[2]);0==c?(msPage(msBase,msUnit,msRatio),error(c)):error(c);codeMode(mode)}function changeRatio(){msRatio=[];for(var a=!1,b=document.getElementsByClassName("ratio"),c=0;c<b.length;c++)v=parseFloat(b[c].value),"number"==typeof v?msRatio.push(v):a=!0,1>=v&&(a="Your ratio needs to be greater than 1");0==a?(msPage(msBase,msUnit,msRatio),error(a)):error(a);codeMode(mode)}function msPanel(a){document.body.className="panel-"+a+" mode-"+mode+" "+help;"output"==a&&document.activeElement.blur();currentPanel=a}function aboutT(){"about"==currentPanel?(msPanel("calc")):(msPanel("about"))}function handleTouchStart(a){xDown=a.touches[0].clientX;yDown=a.touches[0].clientY}function handleTouchMove(a){if(xDown&&yDown){var b=xDown-a.touches[0].clientX;a=yDown-a.touches[0].clientY;545<document.documentElement.clientWidth?Math.abs(b)>Math.abs(a)&&msPanel(0<b?"about":"calc"):Math.abs(b)>Math.abs(a)&&(a=panelNames.indexOf(currentPanel),0<b&&2>a&&msPanel(panelNames[a+1]),0>=b&&0<a&&msPanel(panelNames[a-1]));yDown=xDown=null}}function outputM(a){outputMode=a;document.getElementById("output").className="output panel "+a;msPage(msBase,msUnit,msRatio)}function addBase(a){var b=document.getElementById("formBases"),c=document.createElement("label"),d=document.getElementsByClassName("base")[0].value;a&&(d=a);c.innerHTML='<input type="text" class="base" value="'+d+'" onkeyup="changeBase(this,event.keyCode)">';0==ratioCount&&multiLimit>ratioCount&&(b.appendChild(c),baseCount++);1==baseCount&&(b.classList.add("multi"),document.getElementById("formRatios").classList.add("no-add"));baseCount==multiLimit&&b.classList.add("no-add")}function removeBase(){0<baseCount&&(document.getElementById("formBases").lastChild.remove(),baseCount--);0==baseCount&&(formBases.classList.remove("multi"),document.getElementById("formRatios").classList.remove("no-add"));multiLimit>baseCount&&formBases.classList.remove("no-add");changeBase()}function addRatio(a){var b=document.getElementById("formRatios"),c=document.createElement("label"),d=document.getElementsByClassName("ratio")[0].value;a&&(d=a);c.innerHTML='<input type="number" class="ratio" min="1.001" value="'+d+'" step="0.001" onkeyup="changeRatio()"><div onclick="ratioSelectOpen(this)" class="ratios-select-open"><svg viewBox="0 0 10 10" class="ratios-select-svg" aria-labelledby="title"><title id="title">Select a ratio</title><path d="m0 3 l10 0 -5 5 z"/></svg></div><div class="ratios-select"></div>';0==baseCount&&multiLimit>ratioCount&&(b.appendChild(c),ratioCount++);1==ratioCount&&(b.classList.add("multi"),document.getElementById("formBases").classList.add("no-add"));ratioCount==multiLimit&&b.classList.add("no-add")}function removeRatio(){0<ratioCount&&(document.getElementById("formRatios").lastChild.remove(),ratioCount--);0==ratioCount&&(formRatios.classList.remove("multi"),document.getElementById("formBases").classList.remove("no-add"));multiLimit>ratioCount&&formRatios.classList.remove("no-add");changeRatio()}function closeRSfn(a){a.classList.remove("open");a.nextSibling.innerHTML="";document.getElementById("formRatios").classList.remove("open")}function closeRS(){for(var a=document.getElementById("formRatios").getElementsByClassName("open"),b=0;b<a.length;b++)closeRSfn(a[b])}function ratioSelectOpen(a){a.classList.contains("open")?(a.classList.remove("open"),a.nextSibling.innerHTML="",document.getElementById("formRatios").classList.remove("open")):(closeRS(),a.classList.add("open"),a.nextSibling.innerHTML=ratioDropHTML,document.getElementById("formRatios").classList.add("open"))}function rS(a){document.getElementById("formRatios").getElementsByClassName("open")[0].previousSibling.value=a;closeRS();changeRatio();msPage(msBase,msUnit,msRatio)}function baseList(){var a=[];for(i=0;i<msBase.length;++i)a.push(msBase[i]+msUnit);return a}function codeMode(a){var b=document.getElementById("codeSettings");"web"==a?b.innerHTML="":"sass"==a?b.innerHTML='<textarea id="ms-settings" onClick="this.select();">$ms-base: '+baseList()+";\n$ms-ratio: "+msRatio+';</textarea><a href="https://github.com/modularscale/modularscale-sass" target="_blank" class="code-install">Install the Sass plugin</a>':"js"==a&&(b.innerHTML='<textarea id="ms-settings" onClick="this.select();">msBases = ['+msBase+"];\nmsRatios = ["+msRatio+'];</textarea><a href="https://github.com/modularscale/modularscale-js" target="_blank" class="code-install">Install the JS plugin</a>');mode=a;document.body.className="panel-"+panel+" mode-"+mode+" "+help;newURL()}function error(a){document.getElementById("error").innerHTML=a?a:""}function newURL(){window.history.replaceState("","Modularscale","?"+msBase+"&"+msUnit+"&"+msRatio+"&"+mode+"&"+outputMode)}function queryURL(){var a=window.location.search;if(0<a.search("utm_"))return null;if(0<a.search("&")&&(a=a.split("?")[1].split("&"),a.length=5)){if(msBase=a[0].split(","),msUnit=a[1],msRatio=a[2].split(","),mode=a[3],outputMode=a[4],document.getElementsByClassName("base")[0].value=msBase[0]+msUnit,document.getElementsByClassName("ratio")[0].value=msRatio[0],1<msBase.length)for(a=1;a<msBase.length;a++)addBase(msBase[a]+msUnit);if(1<msRatio.length)for(a=1;a<msRatio.length;a++)addRatio(msRatio[a]);msPage(msBase,msUnit,msRatio);codeMode(mode);outputM(outputMode)}}function helpT(){"help"==help?(help="help-off",document.body.className="panel-"+panel+" mode-"+mode+" "+help):(document.cookie="helpT",help="help",document.body.className="panel-"+panel+" mode-"+mode+" "+help)}function aboutA(a){msPanel("about");var b=document.getElementById(a).offsetTop;document.getElementById("about").scrollTop=b-12;lastHelp=a;}function stepUnits(a,b,c,d){a=Math.round(1E3*ms(a,b,d)[0])/1E3;d=a+c;return(1!=b[0]||"em"!=c)&&(d=d+"</span><span>"+Math.round(a/b[0]*1E3)/1E3+"em"),"px"===c&&(d=d+'</span><span class="at16">'+Math.round(a/16*1E3)/1E3+'<a href="http://nicewebtype.com/notes/2012/07/19/leave-default-font-size-alone-and-embrace-the-em/" title="What is ems @ 16?">em @ 16</a>'),"<span>"+d+"</span>"}function msPage(a,b,c){var d=16;if(rMsUnit=b,rMsBase=a,"em"==b||"rem"==b){rMsUnit="px";rMsBase=[];for(var g=0;g<a.length;g++)rMsBase.push(16*a[g])}for(;-6<=d;)g=ms(d,rMsBase,c),0<=d?(document.getElementById("m"+d+"value").innerHTML=stepUnits(d,a,b,c),document.getElementById("text_m"+d).style.fontSize=g[0]+rMsUnit,document.getElementById("text_m"+d).setAttribute("class","s"+g[1]+" text")):(document.getElementById("mn"+Math.abs(d)+"value").innerHTML=stepUnits(d,a,b,c),document.getElementById("text_mn"+Math.abs(d)).style.fontSize=g[0]+rMsUnit,document.getElementById("text_mn"+Math.abs(d)).setAttribute("class","s"+g[1]+" text")),d--;document.getElementById("text_m0").scrollIntoView(!1);newURL();}for(var msValue=0,msBases=1,msRatios=(1+Math.sqrt(5))/2,msUnique=function(a){a=a.sort(function(a,b){return a[0]-b[0]});newArr=[];for(var b=null,c=0;c<a.length;c++){var d=a[c][0];d!=b&&newArr.push(a[c]);b=d}return newArr},panelNames=["calc","output","about"],currentPanel="calc",panels=document.getElementsByClassName("panel"),i=0;i<panels.length;i++)panels[i].onclick=function () {msPanel(this.dataset.panel)};document.addEventListener("touchstart",handleTouchStart,!1);document.addEventListener("touchmove",handleTouchMove,!1);for(var xDown=null,yDown=null,baseCount=0,ratioCount=0,ratios=document.getElementsByClassName("panel"),i=0;i<panels.length;i++)panels[i].onclick=function () {msPanel(this.dataset.panel)};for(var ratioDropHTML='<a href="javascript:rS(1.067)">15:16 \u2013 minor second</a><a href="javascript:rS(1.125)">8:9 \u2013 major second</a><a href="javascript:rS(1.2)">5:6 \u2013 minor third</a><a href="javascript:rS(1.25)">4:5 \u2013 major third</a><a href="javascript:rS(1.333)">3:4 \u2013 perfect fourth</a><a href="javascript:rS(1.414)">1:\u221a2 \u2013 aug. fourth / dim. fifth</a><a href="javascript:rS(1.5)">2:3 \u2013 perfect fifth</a><a href="javascript:rS(1.6)">5:8 \u2013 minor sixth</a><a href="javascript:rS(1.618)">1:1.618 \u2013 golden section</a><a href="javascript:rS(1.667)">3:5 \u2013 major sixth</a><a href="javascript:rS(1.778)">9:16 \u2013 minor seventh</a><a href="javascript:rS(1.875)">8:15 \u2013 major seventh</a><a href="javascript:rS(2)">1:2 \u2013 octave</a><a href="javascript:rS(2.5)">2:5 \u2013 major tenth</a><a href="javascript:rS(2.667)">3:8 \u2013 major eleventh</a><a href="javascript:rS(3)">1:3 \u2013 major twelfth</a><a href="javascript:rS(4)">1:4 \u2013 double octave</a>',open=document.body,i=0;i<open.length;i++)open[i].classList.remove("open");var help="help-off",lastHelp=null;"T"==document.cookie.split("help")[1]&&helpT();var mode="web",panel="form",outputMode="text",msBase=[1],msUnit="em",msRatio=[1.5],multiLimit=3;queryURL();document.addEventListener("DOMContentLoaded",function () {document.getElementById("text_m0").scrollIntoView(!1)});window.navigator.standalone&&navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&document.body.classList.add("ios-webapp");
