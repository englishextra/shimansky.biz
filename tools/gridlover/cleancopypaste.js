!function r(e,n,t){function o(u,f){if(!n[u]){if(!e[u]){var c="function"==typeof require&&require;if(!f&&c)return c(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var l=n[u]={exports:{}};e[u][0].call(l.exports,function(r){var n=e[u][1][r];return o(n?n:r)},l,l.exports,r,e,n,t)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<t.length;u++)o(t[u]);return o}({1:[function(r,e){"use strict";function n(r,e){function n(){r.addEventListener("beforecopy",function(n){if(!i(n)){var o=r.querySelectorAll(e);t(o)}}),r.addEventListener("copy",function(n){i(n)||!function(){var n=r.querySelectorAll(e);t(n),setTimeout(function(){o(n)},0)}()})}n()}function t(r){for(var e=0;e<r.length;e++)r[e].style.display="none"}function o(r){for(var e=0;e<r.length;e++)r[e].style.display=""}function i(r){var e=r.target;return"TEXTAREA"==e.tagName&&"INPUT"==e.tagName}e.exports=n},{}]},{},[1]);