!function e(t,n,i){function r(u,a){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!a&&f)return f(u,!0);if(o)return o(u,!0);var h=new Error("Cannot find module '"+u+"'");throw h.code="MODULE_NOT_FOUND",h}var l=n[u]={exports:{}};t[u][0].call(l.exports,function(e){var n=t[u][1][e];return r(n?n:e)},l,l.exports,e,t,n,i)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<i.length;u++)r(i[u]);return r}({1:[function(e,t){"use strict";function n(e,t,n){for(var i=parseInt(e.fontSize,10),r=Math.round(e.lineHeight*i),o=e.scaleFactor,u={},a=t;a<=n;a++){u[a]={};var f=Math.round(i*Math.pow(o,a)),h=Math.ceil(f/r),l=r*h;u[a].fontSize=f,u[a].line=r,u[a].autoLineCount=h,u[a].autoLineHeight=l}if("rem"==e.unit)for(var v=e.fontSize,c=i/v,d=t;d<=n;d++){var L=u[d].fontSize,M=(u[d].line,u[d].autoLineHeight,u[d].autoLineCount),s=L/v,z=r/i*c,S=z*M;u[d].fontSize=Math.round(1e7*s)/1e7,u[d].line=Math.round(1e7*z)/1e7,u[d].autoLineHeight=Math.round(1e7*S)/1e7}if("em"==e.unit)for(var g=e.fontSize,p=i/g,H=t;H<=n;H++){var x=u[H].fontSize,q=(u[H].line,u[H].autoLineHeight,u[H].autoLineCount);if(0==H)var C=x/g,m=r/i,w=m*q;else var C=x/p/g,m=r/i/C,w=m*q;u[H].fontSize=Math.round(1e8*C)/1e8,u[H].line=Math.round(1e8*m)/1e8,u[H].autoLineHeight=Math.round(1e8*w)/1e8}for(var O in u)u[O].fontSize=u[O].fontSize+e.unit,u[O].line=u[O].line+e.unit,u[O].autoLineHeight=u[O].autoLineHeight+e.unit;return u}t.exports=n},{}]},{},[1]);