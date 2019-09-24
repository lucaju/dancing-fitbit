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
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "                <div class=\"uk-margin-bottom\">\n                    <h3 class=\"team-name uk-margin-remove-bottom\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n                    <div>"
    + ((stack1 = ((helper = (helper = helpers.bio || (depth0 != null ? depth0.bio : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bio","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n                </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, buffer = 
  "<div id=\"intro\"\n    class=\"uk-section uk-section-seconday uk-height-viewport uk-background-cover uk-background-fixed\"\n    data-src=\"images/bg.jpg\" uk-img>\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-top\">\n\n        <div class=\"uk-margin-top uk-text-center\">\n            <h1 class=\"title uk-margin-xlarge-bottom\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n            <button id=\"play-button\"\n                    class=\"uk-button uk-button-secondary uk-button-large uk-align-center play-button uk-margin-large-top uk-border-pill\">"
    + alias4(((helper = (helper = helpers.startButton || (depth0 != null ? depth0.startButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startButton","hash":{},"data":data}) : helper)))
    + "</button>\n\n            <div class=\"uk-grid uk-margin-large-top\">\n                <div class=\"uk-width-expand\"></div>\n                <div class=\"uk-width-auto\">\n                    <p class=\"headphones uk-text-left\">\n                        <img class=\"uk-align-left uk-padding-remove uk-margin-small-right\"\n                            data-src=\"images/headphones.png\"\n                            alt=\"Headphones\" uk-img>"
    + alias4(((helper = (helper = helpers.headphones || (depth0 != null ? depth0.headphones : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"headphones","hash":{},"data":data}) : helper)))
    + "</p>\n                </div>\n                <div class=\"uk-width-expand\"></div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-medium\">\n        <div class=\"uk-grid uk-margin-bottom uk-margin-large-top\">\n            <div class=\"uk-width-1-6\">\n                <button id=\"lang-button\"\n                        class=\"uk-button uk-button-secondary uk-align-right lang-button\">"
    + alias4(((helper = (helper = helpers.langButton || (depth0 != null ? depth0.langButton : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"langButton","hash":{},"data":data}) : helper)))
    + "</button>\n            </div>\n            <div class=\"uk-width-5-6\">\n                "
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n        </div>\n    </div>\n\n    <div class=\"uk-container uk-container-xsmall uk-margin-large-top\">\n\n\n        <h2 class=\"subtitle uk-text-center uk-margin-large-top\">"
    + alias4(((helper = (helper = helpers.collabTitle || (depth0 != null ? depth0.collabTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collabTitle","hash":{},"data":data}) : helper)))
    + "</h2>\n        <div class=\"uk-grid\">\n            <div class=\"uk-width-1-6\"></div>\n            <div class=\"uk-width-5-6\">\n";
  stack1 = ((helper = (helper = helpers.collborators || (depth0 != null ? depth0.collborators : depth0)) != null ? helper : alias2),(options={"name":"collborators","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.collborators) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ob21lLmhicyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9ob21lLmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0EsMENBQTBDLG9CQUFvQixXQUFXOztRQUV6RTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQix1QkFBdUI7UUFDdkM7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDNU5BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDaUM7QUFDSzs7QUFFQTtBQUNqQjs7QUFFZ0I7QUFDckM7O0FBRXdDO0FBQ0E7OztBQUd4QztBQUNBLG1CQUFtQixrREFBRTtBQUNyQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUUsd0RBQUk7QUFDTjs7QUFFQSxFQUFFO0FBQ0YsZ0NBQWdDLGtOQUFnRTtBQUNoRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQiw2REFBTSxLQUFLLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLGdCQUFnQiw2REFBTSxLQUFLLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLGtEQUFFLEdBQUcsa0RBQUU7QUFDdEQ7O0FBRUE7QUFDQSxDQUFDLHdEQUFJO0FBQ0w7QUFDQSxFQUFFLHdEQUFJO0FBQ04sRUFBRTs7QUFFRixDQUFDLHdEQUFJO0FBQ0w7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0EsbUJBQW1CLHdEQUFJO0FBQ3ZCO0FBQ0EsQ0FBQyxJOzs7Ozs7Ozs7OztBQ3BGRCxpQkFBaUIsbUJBQU8sQ0FBQyxzRkFBMEM7QUFDbkUseUJBQXlCLHVEQUF1RDtBQUNoRixpRUFBaUU7QUFDakUscUZBQXFGOztBQUVyRjtBQUNBLDBMQUEwTCx1QkFBdUIsYUFBYTtBQUM5TjtBQUNBLHdLQUF3SyxzQkFBc0IsYUFBYTtBQUMzTTtBQUNBLENBQUM7QUFDRCw4RkFBOEY7QUFDOUY7QUFDQSx3S0FBd0ssd0JBQXdCLGFBQWE7QUFDN007QUFDQSxvTEFBb0wsOEJBQThCLGFBQWE7QUFDL047QUFDQSxrTEFBa0wsNkJBQTZCLGFBQWE7QUFDNU47QUFDQSxrTEFBa0wsNkJBQTZCLGFBQWE7QUFDNU47QUFDQSx3TEFBd0wsOEJBQThCLGFBQWE7QUFDbk87QUFDQSxvTEFBb0wsOEJBQThCLGFBQWE7QUFDL047QUFDQSw4SUFBOEksK0JBQStCLHlFQUF5RTtBQUN0UCw4QkFBOEI7QUFDOUIsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBLENBQUMsZ0JBQWdCLEU7Ozs7Ozs7Ozs7OztBQzdCakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFnRDtBQUNmOztBQUVqQyxjQUFjLCtEQUFROztBQUV0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGdEQUFPOztBQUVyQixLQUFLLDZEQUFNO0FBQ1gsRUFBRSw2REFBTTtBQUNSOztBQUVBLENBQUMsNkRBQU07QUFDUDs7QUFFQTtBQUNBLENBQUMsNkRBQU07QUFDUCxlQUFlLDZEQUFNO0FBQ3JCO0FBQ0EsRUFBRTs7QUFFRixDQUFDLDZEQUFNO0FBQ1A7QUFDQSxFQUFFO0FBQ0Y7OztBQUdlO0FBQ2Y7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaERELHVDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0cmV0dXJuIHJlc3VsdDtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwibWFpblwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLmFwcC5idW5kbGUuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbXCIuL3NyYy9hcHAuanNcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qXG5AYXV0aG9yOiBMdWNpYW5vIEZyaXp6ZXJhIDxsdWNhanVAZ21haWwuY29tPlxuKi9cblxuLy8gbW9kdWxlc1xuaW1wb3J0ICd1aWtpdC9kaXN0L2pzL3Vpa2l0Lm1pbic7XG5pbXBvcnQge3NlbGVjdH0gZnJvbSAnZDMvZGlzdC9kMy5taW4nO1xuXG5pbXBvcnQgJ3Vpa2l0L2Rpc3QvY3NzL3Vpa2l0Lm1pbi5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5cbmltcG9ydCBob21lIGZyb20gJy4vY29tcG9uZW50cy9ob21lJztcbi8vIGltcG9ydCBkYW5jaW5nIGZyb20gJy4vY29tcG9uZW50cy9kYW5jaW5nJztcblxuaW1wb3J0IGVuIGZyb20gJy4vbG9jYWxpemF0aW9uL2VuLmpzb24nO1xuaW1wb3J0IGZyIGZyb20gJy4vbG9jYWxpemF0aW9uL2ZyLmpzb24nO1xuXG5cbmxldCB2aWV3ID0gJ2hvbWUnO1xubGV0IGxvY2FsaXphdGlvbiA9IGVuO1xubGV0IGRhbmNpbmc7XG5cbmNvbnN0IGNoYW5nZVZpZXcgPSBhc3luYyBuZXdWaWV3ID0+IHtcblxuXHRoaWRlVmlldyh2aWV3KTtcblxuXHR2aWV3ID0gbmV3VmlldztcblxuXHRpZiAodmlldyA9PSAnaG9tZScpIHtcblx0XHRob21lLnJlbmRlcihsb2NhbGl6YXRpb24pO1xuXHRcdGFkZEhvbWVMaXN0ZW5lcigpO1xuXG5cdH0gZWxzZSBpZiAodmlldyA9PSAnZGFuY2luZycpIHtcblx0XHRpZiAoIWRhbmNpbmcpIGRhbmNpbmcgPSBhd2FpdCBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogXCJkYW5jaW5nXCIgKi8gJy4vY29tcG9uZW50cy9kYW5jaW5nJyk7XG5cdFx0ZGFuY2luZy5yZW5kZXIobG9jYWxpemF0aW9uKTtcblx0XHRhZGREYW5jaW5nTGlzdGVuZXIoKTtcblx0fVxuXG5cdHNob3dWaWV3KHZpZXcpO1xufTtcblxuY29uc3QgaGlkZVZpZXcgPSAodmlld05hbWUpID0+IHtcblx0bGV0IHZpZXdIVE1MID0gc2VsZWN0KGAjJHt2aWV3TmFtZX1gKTtcblx0dmlld0hUTUwudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKDIwMDApXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMClcblx0XHQub24oJ2VuZCcsICgpID0+IHtcblx0XHRcdHZpZXdIVE1MLnJlbW92ZSgpO1xuXHRcdH0pO1xufTtcblxuY29uc3Qgc2hvd1ZpZXcgPSAodmlld05hbWUpID0+IHtcblx0bGV0IHZpZXdIVE1MID0gc2VsZWN0KGAjJHt2aWV3TmFtZX1gKTtcblx0dmlld0hUTUwuc3R5bGUoJ29wYWNpdHknLCAwKTtcblx0dmlld0hUTUwudHJhbnNpdGlvbigpXG5cdFx0LmR1cmF0aW9uKDIwMDApXG5cdFx0LmRlbGF5KDIwMDApXG5cdFx0LnN0eWxlKCdvcGFjaXR5JywgMSk7XG59O1xuXG5jb25zdCBjaGFuZ2VMYW5ndWFnZSA9IGxhbmcgPT4ge1xuXHRsb2NhbGl6YXRpb24gPSAobGFuZy50b0xvd2VyQ2FzZSgpID09ICdmcicpID8gZnIgOiBlbjtcbn07XG5cbmNvbnN0IGFkZEhvbWVMaXN0ZW5lciA9ICgpID0+IHtcblx0aG9tZS5ldmVudC5vbignY2hhbmdlbGFuZ3VhZ2UnLCBsYW5nID0+IHtcblx0XHRjaGFuZ2VMYW5ndWFnZShsYW5nKTtcblx0XHRob21lLnJlbmRlcihsb2NhbGl6YXRpb24pO1xuXHR9KTtcblxuXHRob21lLmV2ZW50Lm9uKCdjaGFuZ2V2aWV3JywgdmlldyA9PiB7XG5cdFx0Y2hhbmdlVmlldyh2aWV3KTtcblx0fSk7XG59O1xuXG5jb25zdCBhZGREYW5jaW5nTGlzdGVuZXIgPSAoKSA9PiB7XG5cdGRhbmNpbmcuZXZlbnQub24oJ2NoYW5nZXZpZXcnLCB2aWV3ID0+IHtcblx0XHRjaGFuZ2VWaWV3KHZpZXcpO1xuXHR9KTtcbn07XG5cbihmdW5jdGlvbiBpbml0KCkge1xuXHRjb25zdCBob21lRXZlbnQgPSBob21lLnJlbmRlcihsb2NhbGl6YXRpb24pO1xuXHRhZGRIb21lTGlzdGVuZXIoaG9tZUV2ZW50KTtcbn0oKSk7IiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qc1wiKTtcbmZ1bmN0aW9uIF9fZGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiAob2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqKTsgfVxubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1tcImRlZmF1bHRcIl0gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiMVwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgdmFyIHN0YWNrMSwgaGVscGVyLCBhbGlhczE9ZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSwgYWxpYXMyPWhlbHBlcnMuaGVscGVyTWlzc2luZywgYWxpYXMzPVwiZnVuY3Rpb25cIjtcblxuICByZXR1cm4gXCIgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLWJvdHRvbVxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XFxcInRlYW0tbmFtZSB1ay1tYXJnaW4tcmVtb3ZlLWJvdHRvbVxcXCI+XCJcbiAgICArIGNvbnRhaW5lci5lc2NhcGVFeHByZXNzaW9uKCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2gzPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmJpbyB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuYmlvIDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJiaW9cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxLCBoZWxwZXIsIG9wdGlvbnMsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb24sIGJ1ZmZlciA9IFxuICBcIjxkaXYgaWQ9XFxcImludHJvXFxcIlxcbiAgICBjbGFzcz1cXFwidWstc2VjdGlvbiB1ay1zZWN0aW9uLXNlY29uZGF5IHVrLWhlaWdodC12aWV3cG9ydCB1ay1iYWNrZ3JvdW5kLWNvdmVyIHVrLWJhY2tncm91bmQtZml4ZWRcXFwiXFxuICAgIGRhdGEtc3JjPVxcXCJpbWFnZXMvYmcuanBnXFxcIiB1ay1pbWc+XFxuICAgIDxkaXYgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXIteHNtYWxsIHVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstbWFyZ2luLXRvcCB1ay10ZXh0LWNlbnRlclxcXCI+XFxuICAgICAgICAgICAgPGgxIGNsYXNzPVxcXCJ0aXRsZSB1ay1tYXJnaW4teGxhcmdlLWJvdHRvbVxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLnRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC50aXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwidGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9oMT5cXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJwbGF5LWJ1dHRvblxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJ1ay1idXR0b24gdWstYnV0dG9uLXNlY29uZGFyeSB1ay1idXR0b24tbGFyZ2UgdWstYWxpZ24tY2VudGVyIHBsYXktYnV0dG9uIHVrLW1hcmdpbi1sYXJnZS10b3AgdWstYm9yZGVyLXBpbGxcXFwiPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5zdGFydEJ1dHRvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuc3RhcnRCdXR0b24gOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcInN0YXJ0QnV0dG9uXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvYnV0dG9uPlxcblxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWdyaWQgdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWV4cGFuZFxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWF1dG9cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImhlYWRwaG9uZXMgdWstdGV4dC1sZWZ0XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVxcXCJ1ay1hbGlnbi1sZWZ0IHVrLXBhZGRpbmctcmVtb3ZlIHVrLW1hcmdpbi1zbWFsbC1yaWdodFxcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1zcmM9XFxcImltYWdlcy9oZWFkcGhvbmVzLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PVxcXCJIZWFkcGhvbmVzXFxcIiB1ay1pbWc+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmhlYWRwaG9uZXMgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmhlYWRwaG9uZXMgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImhlYWRwaG9uZXNcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9wPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtZXhwYW5kXFxcIj48L2Rpdj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cXFwidWstY29udGFpbmVyIHVrLWNvbnRhaW5lci14c21hbGwgdWstbWFyZ2luLWxhcmdlLW1lZGl1bVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1ncmlkIHVrLW1hcmdpbi1ib3R0b20gdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtMS02XFxcIj5cXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cXFwibGFuZy1idXR0b25cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcInVrLWJ1dHRvbiB1ay1idXR0b24tc2Vjb25kYXJ5IHVrLWFsaWduLXJpZ2h0IGxhbmctYnV0dG9uXFxcIj5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubGFuZ0J1dHRvbiB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubGFuZ0J1dHRvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibGFuZ0J1dHRvblwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2J1dHRvbj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ1ay13aWR0aC01LTZcXFwiPlxcbiAgICAgICAgICAgICAgICBcIlxuICAgICsgKChzdGFjazEgPSAoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmRlc2NyaXB0aW9uIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5kZXNjcmlwdGlvbiA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiZGVzY3JpcHRpb25cIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSkgIT0gbnVsbCA/IHN0YWNrMSA6IFwiXCIpXG4gICAgKyBcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcblxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ1ay1jb250YWluZXIgdWstY29udGFpbmVyLXhzbWFsbCB1ay1tYXJnaW4tbGFyZ2UtdG9wXFxcIj5cXG5cXG5cXG4gICAgICAgIDxoMiBjbGFzcz1cXFwic3VidGl0bGUgdWstdGV4dC1jZW50ZXIgdWstbWFyZ2luLWxhcmdlLXRvcFxcXCI+XCJcbiAgICArIGFsaWFzNCgoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLmNvbGxhYlRpdGxlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jb2xsYWJUaXRsZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwiY29sbGFiVGl0bGVcIixcImhhc2hcIjp7fSxcImRhdGFcIjpkYXRhfSkgOiBoZWxwZXIpKSlcbiAgICArIFwiPC9oMj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLWdyaWRcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLTEtNlxcXCI+PC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidWstd2lkdGgtNS02XFxcIj5cXG5cIjtcbiAgc3RhY2sxID0gKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jb2xsYm9yYXRvcnMgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLmNvbGxib3JhdG9ycyA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLChvcHRpb25zPXtcIm5hbWVcIjpcImNvbGxib3JhdG9yc1wiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSxvcHRpb25zKSA6IGhlbHBlcikpO1xuICBpZiAoIWhlbHBlcnMuY29sbGJvcmF0b3JzKSB7IHN0YWNrMSA9IGhlbHBlcnMuYmxvY2tIZWxwZXJNaXNzaW5nLmNhbGwoZGVwdGgwLHN0YWNrMSxvcHRpb25zKX1cbiAgaWYgKHN0YWNrMSAhPSBudWxsKSB7IGJ1ZmZlciArPSBzdGFjazE7IH1cbiAgcmV0dXJuIGJ1ZmZlciArIFwiICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxkaXYgY2xhc3M9XFxcInVrLWNvbnRhaW5lciB1ay1jb250YWluZXIteHNtYWxsIHVrLW1hcmdpbi1sYXJnZS10b3BcXFwiPlxcbiAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8YSBocmVmPVxcXCJodHRwczovL2dpdGh1Yi5jb20vbHVjYWp1L2RhbmNpbmctZml0Yml0XFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInVrLWFsaWduLWNlbnRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVxcXCI0NVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtc3JjPVxcXCJpbWFnZXMvZ2l0aHViLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiQ0NcXFwiIHVrLWltZz5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInVrLXdpZHRoLWF1dG9cXFwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uYy80LjAvXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCI+XFxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XFxcInVrLWFsaWduLWNlbnRlclxcXCJcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVxcXCIxMDBcXFwiXFxuICAgICAgICAgICAgICAgICAgICBkYXRhLXNyYz1cXFwiaW1hZ2VzL2NjLWJ5LW5jLnBuZ1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cXFwiQ0NcXFwiIHVrLWltZz5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTsiLCJpbXBvcnQge2Rpc3BhdGNoLCBzZWxlY3R9IGZyb20gJ2QzL2Rpc3QvZDMubWluJztcbmltcG9ydCBob21lSEJTIGZyb20gJy4vaG9tZS5oYnMnO1xuXG5jb25zdCBldmVudCA9IGRpc3BhdGNoKCdjaGFuZ2VsYW5ndWFnZScsICdjaGFuZ2V2aWV3Jyk7XG5cbi8vdXBkYXRlIGluZm9cbmNvbnN0IHVwZGF0ZVBhZ2VEYXRhID0gZGF0YSA9PiB7XG5cdHJldHVybiB7XG5cdFx0dGl0bGU6IGRhdGEudGl0bGUsXG5cdFx0ZGVzY3JpcHRpb246IGRhdGEuZGVzY3JpcHRpb24sXG5cdFx0c3RhcnRCdXR0b246IGRhdGEuc3RhcnRCdXR0b24sXG5cdFx0aGVhZHBob25lczogZGF0YS5oZWFkcGhvbmVzLFxuXHRcdGxhbmdCdXR0b246IGRhdGEubGFuZ0J1dHRvbixcblx0XHRjb2xsYWJUaXRsZTogZGF0YS5jb2xsYWJUaXRsZSxcblx0XHRzcG9uc29yVHRpbGU6IGRhdGEuc3BvbnNvclR0aWxlLFxuXHRcdGNvbGxib3JhdG9yczogZGF0YS5jb2xsYm9yYXRvcnMsXG5cdH07XG59O1xuXG4vL3VwZGF0ZSBpbnRlcmZhY2VcbmNvbnN0IHJlbmRlciA9IChkYXRhKSA9PiB7XG5cblx0Ly91cGRhdGUgaW5mb1xuXHRjb25zdCBwYWdlRGF0YSA9IHVwZGF0ZVBhZ2VEYXRhKGRhdGEpO1xuXHRjb25zdCBodG1sID0gaG9tZUhCUyhwYWdlRGF0YSk7XG5cblx0aWYgKHNlbGVjdCgnI2hvbWUnKS5lbXB0eSgpKSB7XG5cdFx0c2VsZWN0KCcjYXBwJykuYXBwZW5kKCdkaXYnKS5hdHRyKCdpZCcsICdob21lJyk7XG5cdH1cblxuXHRzZWxlY3QoJyNob21lJykuaHRtbChodG1sKTtcblx0d2luZG93LnNjcm9sbFRvKDAsIDEpO1xuXG5cdC8vc2V0IGludGVyYWN0aW9uXG5cdHNlbGVjdCgnI2xhbmctYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IGxhbmcgPSBzZWxlY3QodGhpcykuaHRtbCgpO1xuXHRcdGV2ZW50LmNhbGwoJ2NoYW5nZWxhbmd1YWdlJywgdGhpcywgbGFuZyk7XG5cdH0pO1xuXG5cdHNlbGVjdCgnI3BsYXktYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdGV2ZW50LmNhbGwoJ2NoYW5nZXZpZXcnLCB0aGlzLCAnZGFuY2luZycpO1xuXHR9KTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRyZW5kZXIsXG5cdGV2ZW50XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=