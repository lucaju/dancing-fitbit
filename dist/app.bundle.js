/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".app.bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/app.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uikit/dist/js/uikit.min */ "./node_modules/uikit/dist/js/uikit.min.js");
/* harmony import */ var uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_js_uikit_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3/dist/d3.min */ "./node_modules/d3/dist/d3.min.js");
/* harmony import */ var d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uikit/dist/css/uikit.min.css */ "./node_modules/uikit/dist/css/uikit.min.css");
/* harmony import */ var uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(uikit_dist_css_uikit_min_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/home */ "./src/components/home.js");
/* harmony import */ var _localization_en_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./localization/en.json */ "./src/localization/en.json");
var _localization_en_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./localization/en.json */ "./src/localization/en.json", 1);
/* harmony import */ var _localization_fr_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./localization/fr.json */ "./src/localization/fr.json");
var _localization_fr_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./localization/fr.json */ "./src/localization/fr.json", 1);
/*
@author: Luciano Frizzera <lucaju@gmail.com>
*/

// modules







// import dancing from './components/dancing';





let view = 'home';
let localization = _localization_en_json__WEBPACK_IMPORTED_MODULE_5__;
let dancing;

const changeView = async newView => {

	hideView(view);

	view = newView;

	if (view == 'home') {
		_components_home__WEBPACK_IMPORTED_MODULE_4__["default"].render(localization);
		addHomeListener();

	} else if (view == 'dancing') {
		if (!dancing) dancing = await Promise.all(/*! import() | dancing */[__webpack_require__.e("vendors~dancing"), __webpack_require__.e("dancing")]).then(__webpack_require__.bind(null, /*! ./components/dancing */ "./src/components/dancing.js"));
		dancing.render(localization);
		addDancingListener();
	}

	showView(view);
};

const hideView = (viewName) => {
	let viewHTML = Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_1__["select"])(`#${viewName}`);
	viewHTML.transition()
		.duration(2000)
		.style('opacity', 0)
		.on('end', () => {
			viewHTML.remove();
		});
};

const showView = (viewName) => {
	let viewHTML = Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_1__["select"])(`#${viewName}`);
	viewHTML.style('opacity', 0);
	viewHTML.transition()
		.duration(2000)
		.delay(2000)
		.style('opacity', 1);
};

const changeLanguage = lang => {
	localization = (lang.toLowerCase() == 'fr') ? _localization_fr_json__WEBPACK_IMPORTED_MODULE_6__ : _localization_en_json__WEBPACK_IMPORTED_MODULE_5__;
};

const addHomeListener = () => {
	_components_home__WEBPACK_IMPORTED_MODULE_4__["default"].event.on('changelanguage', lang => {
		changeLanguage(lang);
		_components_home__WEBPACK_IMPORTED_MODULE_4__["default"].render(localization);
	});

	_components_home__WEBPACK_IMPORTED_MODULE_4__["default"].event.on('changeview', view => {
		changeView(view);
	});
};

const addDancingListener = () => {
	dancing.event.on('changeview', view => {
		changeView(view);
	});
};

(function init() {
	const homeEvent = _components_home__WEBPACK_IMPORTED_MODULE_4__["default"].render(localization);
	addHomeListener(homeEvent);
}());

/***/ }),

/***/ "./src/components/home.hbs":
/*!*********************************!*\
  !*** ./src/components/home.hbs ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(/*! ../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function";

  return "                <div class=\"uk-margin-bottom\">\n                    <h3 class=\"team-name uk-margin-remove-bottom\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":45,"column":66},"end":{"line":45,"column":74}}}) : helper)))
    + "</h3>\n                    <div>"
    + ((stack1 = ((helper = (helper = helpers.bio || (depth0 != null ? depth0.bio : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bio","hash":{},"data":data,"loc":{"start":{"line":46,"column":25},"end":{"line":46,"column":34}}}) : helper))) != null ? stack1 : "")
    + "</div>\n                </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, buffer = 
  "<div id=\"intro\"\n    class=\"uk-section uk-section-seconday uk-height-viewport uk-background-cover uk-background-fixed\"\n    data-src=\"images/bg.jpg\" uk-img>\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-top\">\n\n        <div class=\"uk-margin-top uk-text-center\">\n            <h1 class=\"title uk-margin-xlarge-bottom\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":54},"end":{"line":7,"column":63}}}) : helper)))
    + "</h1>\n            <button id=\"play-button\"\n                    class=\"uk-button uk-button-secondary uk-button-large uk-align-center play-button uk-margin-large-top uk-border-pill\">"
    + alias4(((helper = (helper = helpers.startButton || (depth0 != null ? depth0.startButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startButton","hash":{},"data":data,"loc":{"start":{"line":9,"column":137},"end":{"line":9,"column":152}}}) : helper)))
    + "</button>\n\n            <div class=\"uk-grid uk-margin-large-top\">\n                <div class=\"uk-width-expand\"></div>\n                <div class=\"uk-width-auto\">\n                    <p class=\"headphones uk-text-left\">\n                        <img class=\"uk-align-left uk-padding-remove uk-margin-small-right\"\n                            data-src=\"images/headphones.png\"\n                            alt=\"Headphones\" uk-img>"
    + alias4(((helper = (helper = helpers.headphones || (depth0 != null ? depth0.headphones : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"headphones","hash":{},"data":data,"loc":{"start":{"line":17,"column":52},"end":{"line":17,"column":66}}}) : helper)))
    + "</p>\n                </div>\n                <div class=\"uk-width-expand\"></div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-medium\">\n        <div class=\"uk-grid uk-margin-bottom uk-margin-large-top\">\n            <div class=\"uk-width-1-6\">\n                <button id=\"lang-button\"\n                        class=\"uk-button uk-button-secondary uk-align-right lang-button\">"
    + alias4(((helper = (helper = helpers.langButton || (depth0 != null ? depth0.langButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"langButton","hash":{},"data":data,"loc":{"start":{"line":28,"column":89},"end":{"line":28,"column":103}}}) : helper)))
    + "</button>\n            </div>\n            <div class=\"uk-width-5-6\">\n                "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":31,"column":16},"end":{"line":31,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-top\">\n\n\n        <h2 class=\"subtitle uk-text-center uk-margin-large-top\">"
    + alias4(((helper = (helper = helpers.collabTitle || (depth0 != null ? depth0.collabTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collabTitle","hash":{},"data":data,"loc":{"start":{"line":39,"column":64},"end":{"line":39,"column":79}}}) : helper)))
    + "</h2>\n        <div class=\"uk-grid\">\n            <div class=\"uk-width-1-6\"></div>\n            <div class=\"uk-width-5-6\">\n";
  stack1 = ((helper = (helper = helpers.collborators || (depth0 != null ? depth0.collborators : depth0)) != null ? helper : alias2),(options={"name":"collborators","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":43,"column":16},"end":{"line":48,"column":33}}}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.collborators) { stack1 = container.hooks.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n        </div>\n\n    </div>\n\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-top\">\n        <div>\n            <a href=\"https://github.com/lucaju/dancing-fitbit\" target=\"_blank\">\n                <img class=\"uk-align-center\"\n                    width=\"45\"\n                    data-src=\"images/github.png\"\n                    alt=\"CC\" uk-img>\n            </a>\n        </div>\n        <div class=\"uk-width-auto\">\n            <a href=\"https://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\">\n                <img class=\"uk-align-center\"\n                    width=\"100\"\n                    data-src=\"images/cc-by-nc.png\"\n                    alt=\"CC\" uk-img>\n            </a>\n        </div>\n    </div>\n</div>";
},"useData":true});

/***/ }),

/***/ "./src/components/home.js":
/*!********************************!*\
  !*** ./src/components/home.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3/dist/d3.min */ "./node_modules/d3/dist/d3.min.js");
/* harmony import */ var d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _home_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.hbs */ "./src/components/home.hbs");
/* harmony import */ var _home_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_hbs__WEBPACK_IMPORTED_MODULE_1__);



const event = Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('changelanguage', 'changeview');

//update info
const updatePageData = data => {
	return {
		title: data.title,
		description: data.description,
		startButton: data.startButton,
		headphones: data.headphones,
		langButton: data.langButton,
		collabTitle: data.collabTitle,
		sponsorTtile: data.sponsorTtile,
		collborators: data.collborators,
	};
};

//update interface
const render = (data) => {

	//update info
	const pageData = updatePageData(data);
	const html = _home_hbs__WEBPACK_IMPORTED_MODULE_1___default()(pageData);

	if (Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])('#home').empty()) {
		Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])('#app').append('div').attr('id', 'home');
	}

	Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])('#home').html(html);
	window.scrollTo(0, 1);

	//set interaction
	Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])('#lang-button').on('click', function () {
		const lang = Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])(this).html();
		event.call('changelanguage', this, lang);
	});

	Object(d3_dist_d3_min__WEBPACK_IMPORTED_MODULE_0__["select"])('#play-button').on('click', function () {
		event.call('changeview', this, 'dancing');
	});
};


/* harmony default export */ __webpack_exports__["default"] = ({
	render,
	event
});

/***/ }),

/***/ "./src/localization/en.json":
/*!**********************************!*\
  !*** ./src/localization/en.json ***!
  \**********************************/
/*! exports provided: title, description, startButton, restartButton, headphones, langButton, collabTitle, sponsorTtile, collborators, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"Dancing with Fitbit\",\"description\":\"<p>Florence*, a choreographer and dance professor in her late fifties, has tracked herself with a Fitbit Charge HR watch at all times for one week. Throughout this period, she took notes on her experience and the thoughts that emerged from it in a journal. After the week of tracking, she created and performed a choreography inspired by this lived experience. The data collected by the self-tracking device were then used in the creation of a soundtrack, and the production of visual effects. These two “re-workings” of the Fitbit data were integrated in an edited video, and used to create this web-based interactive platform.</p>This research and creation project aimed to explore how the data and the lived self-tracking experience could be used to generate subversive forms of data materialization through choreography, sound, and visuals. We aimed to critique injunctions related to aging bodies and “successful aging” normativities.</p><p>The creative process also became the hub for technical and theoretical explorations on the bodies produced through the Fitbit device and related activities (mediatized bodies, regulated bodies, standardized bodies, lived bodies, etc.) as well as on what constitutes “data.” We conceive the data as being culturally mediated. The mediation processes that participate in data production inform the ways in which it is produced, treated, and rendered effective. Our critical approach aimed to “re-work” the “bio” metric bodies produced by Fitbit, to deconstruct the narratives and temporalities that are embedded and generated in their production.</p><p>More information on the theoretical framework underlying the project and on its creative dimensions coming soon.</p>\",\"startButton\":\"Start\",\"restartButton\":\"Restart\",\"headphones\":\"Better with headphones\",\"langButton\":\"Fr\",\"collabTitle\":\"Project Collaborators\",\"sponsorTtile\":\"Sponsor\",\"collborators\":[{\"name\":\"Florence\",\"bio\":\"Fictious “name”, on her request.<br/>Florence is a dance choreographer and professor. She participated in the project by tracking herself and creating and performing a choreography inspired by this lived experience. This lived experience was then used by all the collaborators to develop their own creative process.\"},{\"name\":\"Myriam Durocher\",\"bio\":\"Myriam Durocher is a PhD candidate in Communication Studies at Université de Montréal. She has been the instigator and the coordinator of the project. She also provided the critical literature anchored in critical gerontology that underpins the whole project. Her work within this research group investigates the power relations that are negotiated through the elaboration of injunctions and normativities in relation to aging bodies and self-tracking devices.\"},{\"name\":\"Julia Salles\",\"bio\":\"Julia Salles is a PhD candidate in Communication Studies at Université du Québec à Montréal and a Lecturer at Université de Montréal. She created the edited video of the dance performance, integrating the visuals and sounds produced by Luciano and Samuel. She also worked on developing this web interactive platform, as a way to present the materials in an interactive and non-linear form.\"},{\"name\":\"Samuel Thulin\",\"bio\":\"Samuel Thulin is a researcher and artist working at the intersection of mobilities research, communication and media studies, sound studies, and critical disability studies. He is currently a Horizon Postdoctoral Fellow in the Department of Communication Studies at Concordia University working in the Milieux Institute for Arts, Culture and Technology’s Participatory Media cluster. He produced the soundtrack with the data retrieved from Fitbit. He aimed to create an atmospheric soundscape, reflecting the tensions and ambivalence felt by Florence during her week of self-tracking.\"},{\"name\":\"Luciano Frizzera\",\"bio\":\"Luciano Frizzera is a PhD candidate in Communication Studies at Concordia University. He retrieved the Fitbit data generated through Florence’s week of self-tracking – not only those accessible to the Fitbit user, but more extensively, those produced, collected and archived by Fitbit. He also worked on creating the visualizations, producing data-driven graphs, that aim to get rid of any linearity or consistency afforded by Fitbit to its user.\"}]}");

/***/ }),

/***/ "./src/localization/fr.json":
/*!**********************************!*\
  !*** ./src/localization/fr.json ***!
  \**********************************/
/*! exports provided: title, description, startButton, restartButton, headphones, langButton, collabTitle, sponsorTtile, collborators, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"title\":\"Danser avec Fitbit\",\"description\":\"<p>Florence*, une chorégraphe et professeure de danse dans la fin cinquantaine, a suivi en continu ses activités physiques et quotidiennes avec une montre Fitbit Charge HR durant une semaine. Durant cette période, elle a noté son expérience et les réflexions qui ont émergé de celle-ci dans un journal de bord. Après la semaine de suivi en continu, elle a créé et performé une chorégraphie, inspirée de son expérience vécue. Les données récoltées par la technologie de suivi en continu ont alors été utilisées pour la création d’une trame sonore et la production d’effets visuels. Ces deux « re-travail » des données Fitbit ont été intégrés à une vidéo éditée et utilisés pour créer cette plate-forme web interactive.</p>Ce projet de recherche et de création, vise à explorer comment les données et l’expérience de suivi en continu peuvent être utilisées pour générer des formes subversives de matérialisation des données (à travers la chorégraphie, le son, les visuels). Nous avons voulu critiquer les injonctions liées aux corps vieillissants et aux normativités constitutives du « bien vieillir ». </p><p>Ce processus créatif est également devenu un nœud pour des explorations techniques et théoriques sur les corps produits à travers le dispositif Fitbit et ses activités liées (corps médiatisés, corps régulés, corps standardisés, corps vécus, etc.) de même que sur ce que constituent les « données ». Nous concevons les données comme étant culturellement médiées. Les processus de médiation qui participent de la production des données informent les manières par lesquelles elles sont produites, traitées et rendues effectives. Notre approche critique a visé à « retravailler » les corps biométriques produits par Fitbit, afin de déconstruire les narratifs et temporalités qui se retrouvent intégrés et produits dans leur production.</p><p>Plus d’information à venir quant au cadre théorique sous-tendant le projet et quant à ses dimensions créatives.</p>\",\"startButton\":\"Commencer\",\"restartButton\":\"Recommencer\",\"headphones\":\"Préférable avec des écouteurs\",\"langButton\":\"En\",\"collabTitle\":\"Les collaborateurs et collaboratrices du projet \",\"sponsorTtile\":\"Commanditaire\",\"collborators\":[{\"name\":\"Florence\",\"bio\":\"*Nom fictif, à sa demande.<br/>Florence est une chorégraphe et professeure de danse. Elle a participé au projet en suivant en continu ses activités et en créant et performant une chorégraphie inspirée de son expérience vécue. Cette même expérience vécue a par la suite été utilisée par les autres collaborateurs/collaboratrices dans leur propre processus créatif.\"},{\"name\":\"Myriam Durocher\",\"bio\":\"Myriam Durocher est étudiante au doctorat en communication à l’Université de Montréal. Elle a été l’instigatrice et la coordonnatrice du projet. Elle a également approvisionné le groupe de la littérature critique issue du champ de la gérontologie critique qui soutient l’ensemble du projet. Son travail au sein de ce groupe de recherche questionne les relations de pouvoir qui se retrouvent négociées à travers l’élaboration d’injonctions et de normativités liant/en lien avec les corps vieillissants et les technologies de suivi en continu.\"},{\"name\":\"Julia Salles\",\"bio\":\"Julia Salles est étudiante au doctorat en communication à l’Université du Québec à Montréal et chargée de cours à l’Université de Montréal. Elle a créé la vidéo éditée de la performance dansée, en y intégrant les visuels et les sons produits par Luciano et Samuel. Elle a également travaillé sur le développement d’une plate-forme web interactive, comme manière de présenter les matériaux dans des formes interactives et non linéaires.\"},{\"name\":\"Samuel Thulin\",\"bio\":\"Samuel Thulin est un chercheur et un artiste qui s’inscrit à l’intersection des recherches sur la mobilité, des études médiatiques et en communication, des études sur le son et des études critiques sur le handicap. Il est présentement postdoctorant Horizon au département de communication de l’Université Concordia, travaillant au sein du Participatory Media cluster du Milieux Institute for Arts, Culture and Technology. Il a produit une trame sonore avec les données recueillies de Fitbit. Il a souhaité créer un paysage sonore atmosphérique, reflétant les tensions et l’ambivalence ressentie par Florence durant sa semaine de suivi en continu.\"},{\"name\":\"Luciano Frizzera\",\"bio\":\"Luciano Frizzera est étudiant au doctorat en communication à l’Université Concordia. Il a récupéré les données Fitbit générées lors de la semaine de suivi en continu de Florence – non pas uniquement les données accessibles à l’utilisateur/l’utilisatrice Fitbit mais, plus largement, celles produites, recueillies et archivées par Fitbit. Il a également travaillé à la création de visualisations, produisant des graphiques guidés par les données dans le but de se détourner de la linéarité et de l’uniformité fournies par Fitbit à ses utilisateurs/utilisatrices.\"}]}");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ob21lLmhicyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ob21lLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0EsMENBQTBDLG9CQUFvQixXQUFXOztRQUV6RTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDNU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDaUM7QUFDSzs7QUFFQTtBQUNqQjs7QUFFZ0I7QUFDckM7O0FBRXdDO0FBQ0E7OztBQUd4QztBQUNBLG1CQUFtQixrREFBRTtBQUNyQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUUsd0RBQUk7QUFDTjs7QUFFQSxFQUFFO0FBQ0YsZ0NBQWdDLGtOQUFnRTtBQUNoRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQiw2REFBTSxLQUFLLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGdCQUFnQiw2REFBTSxLQUFLLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLGtEQUFFLEdBQUcsa0RBQUU7QUFDdEQ7O0FBRUE7QUFDQSxDQUFDLHdEQUFJO0FBQ0w7QUFDQSxFQUFFLHdEQUFJO0FBQ04sRUFBRTs7QUFFRixDQUFDLHdEQUFJO0FBQ0w7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsbUJBQW1CLHdEQUFJO0FBQ3ZCO0FBQ0EsQ0FBQyxJOzs7Ozs7Ozs7OztBQ3BGRCxpQkFBaUIsbUJBQU8sQ0FBQyxzRkFBMEM7QUFDbkUseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDBMQUEwTCx1QkFBdUIsb0JBQW9CLFNBQVMsc0JBQXNCLFFBQVEsd0JBQXdCO0FBQ3BTO0FBQ0Esd0tBQXdLLHNCQUFzQixvQkFBb0IsU0FBUyxzQkFBc0IsUUFBUSx3QkFBd0I7QUFDalI7QUFDQSxDQUFDO0FBQ0QsOEZBQThGO0FBQzlGO0FBQ0Esd0tBQXdLLHdCQUF3QixvQkFBb0IsU0FBUyxxQkFBcUIsUUFBUSx1QkFBdUI7QUFDalI7QUFDQSxvTEFBb0wsOEJBQThCLG9CQUFvQixTQUFTLHNCQUFzQixRQUFRLHdCQUF3QjtBQUNyUztBQUNBLGtMQUFrTCw2QkFBNkIsb0JBQW9CLFNBQVMsc0JBQXNCLFFBQVEsd0JBQXdCO0FBQ2xTO0FBQ0Esa0xBQWtMLDZCQUE2QixvQkFBb0IsU0FBUyxzQkFBc0IsUUFBUSx5QkFBeUI7QUFDblM7QUFDQSx3TEFBd0wsOEJBQThCLG9CQUFvQixTQUFTLHNCQUFzQixRQUFRLHdCQUF3QjtBQUN6UztBQUNBLG9MQUFvTCw4QkFBOEIsb0JBQW9CLFNBQVMsc0JBQXNCLFFBQVEsd0JBQXdCO0FBQ3JTO0FBQ0EsOElBQThJLCtCQUErQixnRkFBZ0YsU0FBUyxzQkFBc0IsUUFBUSx3QkFBd0I7QUFDNVQsOEJBQThCO0FBQzlCLHVCQUF1QixrQkFBa0I7QUFDekM7QUFDQSxDQUFDLGdCQUFnQixFOzs7Ozs7Ozs7Ozs7QUM3QmpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0Q7QUFDZjs7QUFFakMsY0FBYywrREFBUTs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxnREFBTzs7QUFFckIsS0FBSyw2REFBTTtBQUNYLEVBQUUsNkRBQU07QUFDUjs7QUFFQSxDQUFDLDZEQUFNO0FBQ1A7O0FBRUE7QUFDQSxDQUFDLDZEQUFNO0FBQ1AsZUFBZSw2REFBTTtBQUNyQjtBQUNBLEVBQUU7O0FBRUYsQ0FBQyw2REFBTTtBQUNQO0FBQ0EsRUFBRTtBQUNGOzs7QUFHZTtBQUNmO0FBQ0E7QUFDQSxDQUFDLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hERCx1QyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5hcHAuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvYXBwLmpzXCIsXCJ2ZW5kb3Jzfm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKlxuQGF1dGhvcjogTHVjaWFubyBGcml6emVyYSA8bHVjYWp1QGdtYWlsLmNvbT5cbiovXG5cbi8vIG1vZHVsZXNcbmltcG9ydCAndWlraXQvZGlzdC9qcy91aWtpdC5taW4nO1xuaW1wb3J0IHtzZWxlY3R9IGZyb20gJ2QzL2Rpc3QvZDMubWluJztcblxuaW1wb3J0ICd1aWtpdC9kaXN0L2Nzcy91aWtpdC5taW4uY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgaG9tZSBmcm9tICcuL2NvbXBvbmVudHMvaG9tZSc7XG4vLyBpbXBvcnQgZGFuY2luZyBmcm9tICcuL2NvbXBvbmVudHMvZGFuY2luZyc7XG5cbmltcG9ydCBlbiBmcm9tICcuL2xvY2FsaXphdGlvbi9lbi5qc29uJztcbmltcG9ydCBmciBmcm9tICcuL2xvY2FsaXphdGlvbi9mci5qc29uJztcblxuXG5sZXQgdmlldyA9ICdob21lJztcbmxldCBsb2NhbGl6YXRpb24gPSBlbjtcbmxldCBkYW5jaW5nO1xuXG5jb25zdCBjaGFuZ2VWaWV3ID0gYXN5bmMgbmV3VmlldyA9PiB7XG5cblx0aGlkZVZpZXcodmlldyk7XG5cblx0dmlldyA9IG5ld1ZpZXc7XG5cblx0aWYgKHZpZXcgPT0gJ2hvbWUnKSB7XG5cdFx0aG9tZS5yZW5kZXIobG9jYWxpemF0aW9uKTtcblx0XHRhZGRIb21lTGlzdGVuZXIoKTtcblxuXHR9IGVsc2UgaWYgKHZpZXcgPT0gJ2RhbmNpbmcnKSB7XG5cdFx0aWYgKCFkYW5jaW5nKSBkYW5jaW5nID0gYXdhaXQgaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6IFwiZGFuY2luZ1wiICovICcuL2NvbXBvbmVudHMvZGFuY2luZycpO1xuXHRcdGRhbmNpbmcucmVuZGVyKGxvY2FsaXphdGlvbik7XG5cdFx0YWRkRGFuY2luZ0xpc3RlbmVyKCk7XG5cdH1cblxuXHRzaG93Vmlldyh2aWV3KTtcbn07XG5cbmNvbnN0IGhpZGVWaWV3ID0gKHZpZXdOYW1lKSA9PiB7XG5cdGxldCB2aWV3SFRNTCA9IHNlbGVjdChgIyR7dmlld05hbWV9YCk7XG5cdHZpZXdIVE1MLnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbigyMDAwKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDApXG5cdFx0Lm9uKCdlbmQnLCAoKSA9PiB7XG5cdFx0XHR2aWV3SFRNTC5yZW1vdmUoKTtcblx0XHR9KTtcbn07XG5cbmNvbnN0IHNob3dWaWV3ID0gKHZpZXdOYW1lKSA9PiB7XG5cdGxldCB2aWV3SFRNTCA9IHNlbGVjdChgIyR7dmlld05hbWV9YCk7XG5cdHZpZXdIVE1MLnN0eWxlKCdvcGFjaXR5JywgMCk7XG5cdHZpZXdIVE1MLnRyYW5zaXRpb24oKVxuXHRcdC5kdXJhdGlvbigyMDAwKVxuXHRcdC5kZWxheSgyMDAwKVxuXHRcdC5zdHlsZSgnb3BhY2l0eScsIDEpO1xufTtcblxuY29uc3QgY2hhbmdlTGFuZ3VhZ2UgPSBsYW5nID0+IHtcblx0bG9jYWxpemF0aW9uID0gKGxhbmcudG9Mb3dlckNhc2UoKSA9PSAnZnInKSA/IGZyIDogZW47XG59O1xuXG5jb25zdCBhZGRIb21lTGlzdGVuZXIgPSAoKSA9PiB7XG5cdGhvbWUuZXZlbnQub24oJ2NoYW5nZWxhbmd1YWdlJywgbGFuZyA9PiB7XG5cdFx0Y2hhbmdlTGFuZ3VhZ2UobGFuZyk7XG5cdFx0aG9tZS5yZW5kZXIobG9jYWxpemF0aW9uKTtcblx0fSk7XG5cblx0aG9tZS5ldmVudC5vbignY2hhbmdldmlldycsIHZpZXcgPT4ge1xuXHRcdGNoYW5nZVZpZXcodmlldyk7XG5cdH0pO1xufTtcblxuY29uc3QgYWRkRGFuY2luZ0xpc3RlbmVyID0gKCkgPT4ge1xuXHRkYW5jaW5nLmV2ZW50Lm9uKCdjaGFuZ2V2aWV3JywgdmlldyA9PiB7XG5cdFx0Y2hhbmdlVmlldyh2aWV3KTtcblx0fSk7XG59O1xuXG4oZnVuY3Rpb24gaW5pdCgpIHtcblx0Y29uc3QgaG9tZUV2ZW50ID0gaG9tZS5yZW5kZXIobG9jYWxpemF0aW9uKTtcblx0YWRkSG9tZUxpc3RlbmVyKGhvbWVFdmVudCk7XG59KCkpOyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanNcIik7XG5mdW5jdGlvbiBfX2RlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgKG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iaik7IH1cbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbXCJkZWZhdWx0XCJdIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBzdGFjazEsIGhlbHBlciwgYWxpYXMxPWRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksIGFsaWFzMj1jb250YWluZXIuaG9va3MuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIjtcblxuICByZXR1cm4gXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWJvdHRvbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInRlYW0tbmFtZSB1ay1tYXJnaW4tcmVtb3ZlLWJvdHRvbVxcXCI+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGEsXCJsb2NcIjp7XCJzdGFydFwiOntcImxpbmVcIjo0NSxcImNvbHVtblwiOjY2fSxcImVuZFwiOntcImxpbmVcIjo0NSxcImNvbHVtblwiOjc0fX19KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmJpbyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYmlvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJiaW9cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhLFwibG9jXCI6e1wic3RhcnRcIjp7XCJsaW5lXCI6NDYsXCJjb2x1bW5cIjoyNX0sXCJlbmRcIjp7XCJsaW5lXCI6NDYsXCJjb2x1bW5cIjozNH19fSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cIjtcbn0sXCJjb21waWxlclwiOls4LFwiPj0gNC4zLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9Y29udGFpbmVyLmhvb2tzLmhlbHBlck1pc3NpbmcsIGFsaWFzMz1cImZ1bmN0aW9uXCIsIGFsaWFzND1jb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbiwgYnVmZmVyID0gXG4gIFwiPGRpdiBpZD1cXFwiaW50cm9cXFwiXFxuICAgIGNsYXNzPVxcXCJ1ay1zZWN0aW9uIHVrLXNlY3Rpb24tc2Vjb25kYXkgdWstaGVpZ2h0LXZpZXdwb3J0IHVrLWJhY2tncm91bmQtY292ZXIgdWstYmFja2dyb3VuZC1maXhlZFxcXCJcXG4gICAgZGF0YS1zcmM9XFxcImltYWdlcy9iZy5qcGdcXFwiIHVrLWltZz5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci14c21hbGwgdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1tYXJnaW4tdG9wIHVrLXRleHQtY2VudGVyXFxcIj5cXG4gICAgICAgICAgICA8aDEgY2xhc3M9XFxcInRpdGxlIHVrLW1hcmdpbi14bGFyZ2UtYm90dG9tXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMudGl0bGUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnRpdGxlIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJ0aXRsZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGEsXCJsb2NcIjp7XCJzdGFydFwiOntcImxpbmVcIjo3LFwiY29sdW1uXCI6NTR9LFwiZW5kXCI6e1wibGluZVwiOjcsXCJjb2x1bW5cIjo2M319fSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9oMT5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJwbGF5LWJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXNlY29uZGFyeSB1ay1idXR0b24tbGFyZ2UgdWstYWxpZ24tY2VudGVyIHBsYXktYnV0dG9uIHVrLW1hcmdpbi1sYXJnZS10b3AgdWstYm9yZGVyLXBpbGxcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zdGFydEJ1dHRvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc3RhcnRCdXR0b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInN0YXJ0QnV0dG9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YSxcImxvY1wiOntcInN0YXJ0XCI6e1wibGluZVwiOjksXCJjb2x1bW5cIjoxMzd9LFwiZW5kXCI6e1wibGluZVwiOjksXCJjb2x1bW5cIjoxNTJ9fX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYnV0dG9uPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWdyaWQgdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWF1dG9cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImhlYWRwaG9uZXMgdWstdGV4dC1sZWZ0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJ1ay1hbGlnbi1sZWZ0IHVrLXBhZGRpbmctcmVtb3ZlIHVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zcmM9XFxcImltYWdlcy9oZWFkcGhvbmVzLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJIZWFkcGhvbmVzXFxcIiB1ay1pbWc+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmhlYWRwaG9uZXMgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmhlYWRwaG9uZXMgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImhlYWRwaG9uZXNcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhLFwibG9jXCI6e1wic3RhcnRcIjp7XCJsaW5lXCI6MTcsXCJjb2x1bW5cIjo1Mn0sXCJlbmRcIjp7XCJsaW5lXCI6MTcsXCJjb2x1bW5cIjo2Nn19fSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci14c21hbGwgdWstbWFyZ2luLWxhcmdlLW1lZGl1bVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1ncmlkIHVrLW1hcmdpbi1ib3R0b20gdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS02XFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGFuZy1idXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tc2Vjb25kYXJ5IHVrLWFsaWduLXJpZ2h0IGxhbmctYnV0dG9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubGFuZ0J1dHRvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubGFuZ0J1dHRvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibGFuZ0J1dHRvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGEsXCJsb2NcIjp7XCJzdGFydFwiOntcImxpbmVcIjoyOCxcImNvbHVtblwiOjg5fSxcImVuZFwiOntcImxpbmVcIjoyOCxcImNvbHVtblwiOjEwM319fSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtNS02XFxcIj5cXG4gICAgICAgICAgICAgICAgXCJcbiAgICArICgoc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5kZXNjcmlwdGlvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuZGVzY3JpcHRpb24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImRlc2NyaXB0aW9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YSxcImxvY1wiOntcInN0YXJ0XCI6e1wibGluZVwiOjMxLFwiY29sdW1uXCI6MTZ9LFwiZW5kXCI6e1wibGluZVwiOjMxLFwiY29sdW1uXCI6MzN9fX0pIDogaGVscGVyKSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKVxuICAgICsgXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci14c21hbGwgdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuXFxuXFxuICAgICAgICA8aDIgY2xhc3M9XFxcInN1YnRpdGxlIHVrLXRleHQtY2VudGVyIHVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jb2xsYWJUaXRsZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuY29sbGFiVGl0bGUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImNvbGxhYlRpdGxlXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YSxcImxvY1wiOntcInN0YXJ0XCI6e1wibGluZVwiOjM5LFwiY29sdW1uXCI6NjR9LFwiZW5kXCI6e1wibGluZVwiOjM5LFwiY29sdW1uXCI6Nzl9fX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvaDI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1ncmlkXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC0xLTZcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTUtNlxcXCI+XFxuXCI7XG4gIHN0YWNrMSA9ICgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuY29sbGJvcmF0b3JzIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jb2xsYm9yYXRvcnMgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwob3B0aW9ucz17XCJuYW1lXCI6XCJjb2xsYm9yYXRvcnNcIixcImhhc2hcIjp7fSxcImZuXCI6Y29udGFpbmVyLnByb2dyYW0oMSwgZGF0YSwgMCksXCJpbnZlcnNlXCI6Y29udGFpbmVyLm5vb3AsXCJkYXRhXCI6ZGF0YSxcImxvY1wiOntcInN0YXJ0XCI6e1wibGluZVwiOjQzLFwiY29sdW1uXCI6MTZ9LFwiZW5kXCI6e1wibGluZVwiOjQ4LFwiY29sdW1uXCI6MzN9fX0pLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEsb3B0aW9ucykgOiBoZWxwZXIpKTtcbiAgaWYgKCFoZWxwZXJzLmNvbGxib3JhdG9ycykgeyBzdGFjazEgPSBjb250YWluZXIuaG9va3MuYmxvY2tIZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLHN0YWNrMSxvcHRpb25zKX1cbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXIteHNtYWxsIHVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vbHVjYWp1L2RhbmNpbmctZml0Yml0XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInVrLWFsaWduLWNlbnRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVxcXCI0NVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3JjPVxcXCJpbWFnZXMvZ2l0aHViLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiQ0NcXFwiIHVrLWltZz5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWF1dG9cXFwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy80LjAvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInVrLWFsaWduLWNlbnRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVxcXCIxMDBcXFwiXFxuICAgICAgICAgICAgICAgICAgICBkYXRhLXNyYz1cXFwiaW1hZ2VzL2NjLWJ5LW5jLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiQ0NcXFwiIHVrLWltZz5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTsiLCJpbXBvcnQge2Rpc3BhdGNoLCBzZWxlY3R9IGZyb20gJ2QzL2Rpc3QvZDMubWluJztcbmltcG9ydCBob21lSEJTIGZyb20gJy4vaG9tZS5oYnMnO1xuXG5jb25zdCBldmVudCA9IGRpc3BhdGNoKCdjaGFuZ2VsYW5ndWFnZScsICdjaGFuZ2V2aWV3Jyk7XG5cbi8vdXBkYXRlIGluZm9cbmNvbnN0IHVwZGF0ZVBhZ2VEYXRhID0gZGF0YSA9PiB7XG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IGRhdGEudGl0bGUsXG5cdFx0ZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG5cdFx0c3RhcnRCdXR0b246IGRhdGEuc3RhcnRCdXR0b24sXG5cdFx0aGVhZHBob25lczogZGF0YS5oZWFkcGhvbmVzLFxuXHRcdGxhbmdCdXR0b246IGRhdGEubGFuZ0J1dHRvbixcblx0XHRjb2xsYWJUaXRsZTogZGF0YS5jb2xsYWJUaXRsZSxcblx0XHRzcG9uc29yVHRpbGU6IGRhdGEuc3BvbnNvclR0aWxlLFxuXHRcdGNvbGxib3JhdG9yczogZGF0YS5jb2xsYm9yYXRvcnMsXG5cdH07XG59O1xuXG4vL3VwZGF0ZSBpbnRlcmZhY2VcbmNvbnN0IHJlbmRlciA9IChkYXRhKSA9PiB7XG5cblx0Ly91cGRhdGUgaW5mb1xuXHRjb25zdCBwYWdlRGF0YSA9IHVwZGF0ZVBhZ2VEYXRhKGRhdGEpO1xuXHRjb25zdCBodG1sID0gaG9tZUhCUyhwYWdlRGF0YSk7XG5cblx0aWYgKHNlbGVjdCgnI2hvbWUnKS5lbXB0eSgpKSB7XG5cdFx0c2VsZWN0KCcjYXBwJykuYXBwZW5kKCdkaXYnKS5hdHRyKCdpZCcsICdob21lJyk7XG5cdH1cblxuXHRzZWxlY3QoJyNob21lJykuaHRtbChodG1sKTtcblx0d2luZG93LnNjcm9sbFRvKDAsIDEpO1xuXG5cdC8vc2V0IGludGVyYWN0aW9uXG5cdHNlbGVjdCgnI2xhbmctYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGxhbmcgPSBzZWxlY3QodGhpcykuaHRtbCgpO1xuXHRcdGV2ZW50LmNhbGwoJ2NoYW5nZWxhbmd1YWdlJywgdGhpcywgbGFuZyk7XG5cdH0pO1xuXG5cdHNlbGVjdCgnI3BsYXktYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdGV2ZW50LmNhbGwoJ2NoYW5nZXZpZXcnLCB0aGlzLCAnZGFuY2luZycpO1xuXHR9KTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRyZW5kZXIsXG5cdGV2ZW50XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=