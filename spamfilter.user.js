// ==UserScript==
// @id             iitc-plugin-spam-filter@3ch01c
// @name           IITC plugin: spam-filter
// @category       Misc
// @version        0.0.4
// @namespace      https://github.com/3ch01c/ingress-intel-total-conversion
// @description    This is a spam filter plugin which filters out SPAM from Comm messages.
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// @include        https://www.ingress.com/mission/*
// @include        http://www.ingress.com/mission/*
// @match          https://www.ingress.com/mission/*
// @match          http://www.ingress.com/mission/*
// @grant          none
// @updateURL      https://github.com/Eccenux/iitc-plugin-spam-filter/raw/master/spamfilter.meta.js
// @downloadURL    https://github.com/Eccenux/iitc-plugin-spam-filter/raw/master/spamfilter.user.js
// ==/UserScript==


function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// setup plugin
var setup = function() {
	var renderData_orig = window.chat.renderData;

	// spam filter
	window.chat.renderData = function(data, element, likelyWereOldMsgs) {
		var filteredData = {};
		for (var key in data) {
			var user = data[key][3];
			if (user.search(/^(enl|res)[0-9]+$/)>=0) {
				continue;
			}
			var text = data[key][2];
			if (text.search(/xmps\.biz|ingress-(shop|store)|(store|shop)-ingress|ingressfarm\.com/i)>=0) {
				continue;
			}
			filteredData[key] = data[key];
		}
		renderData_orig(filteredData, element, likelyWereOldMsgs);
	}
}

//PLUGIN END //////////////////////////////////////////////////////////


setup.info = plugin_info; //add the script info data to the function as a property

if(!window.bootPlugins) window.bootPlugins = [];

window.bootPlugins.push(setup);

// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();

} // wrapper end

// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
