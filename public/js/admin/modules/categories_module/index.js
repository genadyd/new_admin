/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/admin/api/Api.js":
/*!***************************************!*\
  !*** ./resources/js/admin/api/Api.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Api =
/** @class */
function () {
  function Api(url, method, data, type) {
    var _this = this;

    if (method === void 0) {
      method = 'POST';
    }

    if (data === void 0) {
      data = {};
    }

    if (type === void 0) {
      type = 'json';
    }

    this.exeq = function () {
      var urlPrefix = '/new_admin/public/api';

      if (window.location.host == 'www.admin.loc' || window.location.host == '127.0.0.1:8000' || window.location.host == 'gena-admin.com') {
        urlPrefix = '/api';
      }

      var type = _this.type === 'json' ? 'application/json' : 'text/html'; // const _token = this.data['X-CSRF-TOKEN']
      // this.data['X-CSRF-TOKEN'] = undefined

      return fetch(urlPrefix + _this.url, {
        method: _this.method,
        headers: {
          'Content-Type': type
        },
        body: _this.data == 'undefined' ? '' : JSON.stringify(_this.data)
      }).then(function (response) {
        if (_this.type === 'json') {
          return response.json();
        }

        return response.text();
      });
    };

    this.url = url;
    this.data = data;
    this.method = method;
    this.type = type;
  }

  return Api;
}();

exports["default"] = Api;

/***/ }),

/***/ "./resources/js/admin/api/CategoriesApi.js":
/*!*************************************************!*\
  !*** ./resources/js/admin/api/CategoriesApi.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Api_1 = __importDefault(__webpack_require__(/*! ./Api */ "./resources/js/admin/api/Api.js"));

var CategoriesApi =
/** @class */
function (_super) {
  __extends(CategoriesApi, _super);

  function CategoriesApi() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return CategoriesApi;
}(Api_1["default"]);

exports["default"] = CategoriesApi;

/***/ }),

/***/ "./resources/js/admin/lib/form_validator/FormFieldsValidator.js":
/*!**********************************************************************!*\
  !*** ./resources/js/admin/lib/form_validator/FormFieldsValidator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var FormFieldsValidator =
/** @class */
function () {
  function FormFieldsValidator() {
    var _this = this;

    this.patterns = [{
      name: 'simpleString',
      value: new RegExp(/^(?:[\t-\r \(\)\x2D0-:A-Z_a-z\xA0\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2000-\u200A\u2028\u2029\u202F\u205F\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3000\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]){3,100}$/)
    }, {
      name: 'innerUrl',
      value: new RegExp(/^(?:[\x2D\/-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]){3,50}$/)
    }, {
      name: 'longText',
      value: new RegExp(/^(?:[\t-\r \(\),-\.0-:A-Z_a-z\xA0\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2000-\u200A\u2028\u2029\u202F\u205F\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3000\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDEC0-\uDEEB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])*$/)
    }];

    this.textValidator = function (input) {
      var patternName = input.getAttribute('pattern');

      var found = _this.patterns.find(function (elem) {
        return elem.name === patternName;
      });

      if (found && !found.value.test(input.value)) {
        var inpCont = input.closest('div.input_block');
        inpCont.classList.add('error');
        return false;
      } else {
        input.closest('div.input_block').classList.remove('error');
        return true;
      }
    };
  }

  return FormFieldsValidator;
}();

exports["default"] = FormFieldsValidator;

/***/ }),

/***/ "./resources/js/admin/lib/list_pagination/AbstractPagination.js":
/*!**********************************************************************!*\
  !*** ./resources/js/admin/lib/list_pagination/AbstractPagination.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AbstractPagination =
/** @class */
function () {
  function AbstractPagination(store) {
    this.store = store;
  }

  AbstractPagination.prototype.listRender = function (html_builder) {};

  AbstractPagination.prototype.includeDeleted = function (list) {
    if (!this.store.getState('include_deleted')) {
      list = list.filter(function (val) {
        return !val.deleted_at;
      });
    }

    return list;
  };

  AbstractPagination.prototype.sortByData = function (list) {
    if (this.store.getState('sort_by_date_desc')) {
      list = __spreadArrays(list);
      list.reverse();
    }

    return list;
  };

  AbstractPagination.prototype.onlyDeleted = function (list) {
    if (this.store.getState('only_deleted')) {
      list = list.filter(function (val) {
        return val.deleted_at;
      });
    }

    return list;
  };

  AbstractPagination.prototype.searchItems = function (list) {
    var searchString = this.store.getState('search_string');
    /*
       strip slashas
        */

    list.forEach(function (item) {
      item.name = item.name.replace(/(<([^>]+)>)/gi, "");
      item.heading = item.heading.replace(/(<([^>]+)>)/gi, "");
    });

    if (searchString) {
      var pattern_1 = new RegExp(searchString);
      list = list.filter(function (val) {
        return pattern_1.test(val.heading) || pattern_1.test(val.name);
      });
      list.forEach(function (item, key) {
        list[key].name = item.name.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
        list[key].heading = item.heading.replace(searchString, "<span class=\"finded\">" + searchString + "</span>");
      });
    }

    return list;
  };

  AbstractPagination.prototype.paginationRender = function (list) {
    var data = this.store.getAllState();
    var lastPage = Math.ceil(list.length / data.per_page);
    var objectToBuilder = {
      start_page: 1,
      current_page: +data.current_page,
      last_page: +lastPage,
      buttons_num: lastPage < 3 ? lastPage : 3
    };

    if (objectToBuilder.current_page == objectToBuilder.last_page) {
      /*if last page*/
      if (objectToBuilder.last_page > 2) {
        objectToBuilder.start_page = objectToBuilder.current_page - 2;
        objectToBuilder.buttons_num = objectToBuilder.last_page;
      } else if (objectToBuilder.last_page == 2) {
        objectToBuilder.start_page = objectToBuilder.current_page - 1;
        objectToBuilder.buttons_num = objectToBuilder.last_page;
      } else {
        objectToBuilder.buttons_num = 0;
      }
    } else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
      objectToBuilder.start_page = objectToBuilder.current_page - 1;
      objectToBuilder.buttons_num = objectToBuilder.current_page + 1;
    } else {
      objectToBuilder.start_page = 1;
    }

    return objectToBuilder;
  };

  return AbstractPagination;
}();

exports["default"] = AbstractPagination;

/***/ }),

/***/ "./resources/js/admin/lib/list_pagination/content/categories/CategoriesPagination.js":
/*!*******************************************************************************************!*\
  !*** ./resources/js/admin/lib/list_pagination/content/categories/CategoriesPagination.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AbstractPagination_1 = __importDefault(__webpack_require__(/*! ../../AbstractPagination */ "./resources/js/admin/lib/list_pagination/AbstractPagination.js"));

var CategoriesPagination =
/** @class */
function (_super) {
  __extends(CategoriesPagination, _super);

  function CategoriesPagination(store) {
    var _this = _super.call(this, store) || this;

    _this.setListItemsNumberMaxParam = function (list) {
      var perPageInput = document.getElementById('per_page');

      if (perPageInput) {
        var len = list.length;
        perPageInput.setAttribute('max', len);

        if (_this.store.getState('per_page') > len) {
          perPageInput.value = len;
        } else {
          perPageInput.value = _this.store.getState('per_page');
        }
      }
    };

    return _this;
  }

  return CategoriesPagination;
}(AbstractPagination_1["default"]);

exports["default"] = CategoriesPagination;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/form/Form.js":
/*!*******************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/form/Form.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FormFieldsValidator_1 = __importDefault(__webpack_require__(/*! ../../../lib/form_validator/FormFieldsValidator */ "./resources/js/admin/lib/form_validator/FormFieldsValidator.js"));

var CategoriesApi_1 = __importDefault(__webpack_require__(/*! ../../../api/CategoriesApi */ "./resources/js/admin/api/CategoriesApi.js"));

var Form =
/** @class */
function () {
  function Form() {
    var _this = this;

    this.validator = new FormFieldsValidator_1["default"]();
    this.form = document.getElementById('category_form');

    this.submitButtonEnableDisable = function (validArray) {
      var submitButton = document.getElementById('category_form_submit');
      var res = validArray.find(function (item) {
        return !item.is_valid;
      });

      if (submitButton) {
        if (!res) {
          submitButton.removeAttribute('disabled');
        } else {
          submitButton.setAttribute('disabled', '');
        }
      }
    };

    this.validatorInit = function () {
      if (_this.form) {
        var formInputs = _this.form.querySelectorAll('.category_data input, .category_data textarea'),
            validArray_1 = [];
        /*keyup event to input element*/


        formInputs.forEach(function (input) {
          if (input.hasAttribute('validation')) {
            validArray_1.push({
              name: input.getAttribute('name'),
              is_valid: false
            });
            var res_1;
            input.addEventListener('keyup', function (e) {
              res_1 = _this.validator.textValidator(e.currentTarget);

              if (validArray_1.length > 0) {
                validArray_1.forEach(function (item) {
                  if (item.name === input.getAttribute('name')) {
                    item.is_valid = res_1;
                  }
                });

                _this.submitButtonEnableDisable(validArray_1);
              }
            });
          }
        });
      }
    };

    this.getCategoryData = function () {
      return _this.form ? _this.form.querySelectorAll('.category_data input, .category_data textarea') : [];
    };

    this.getTextFieldsElements = function () {
      var textFieldsBlocks = _this.form ? _this.form.querySelectorAll('.categories_text_field') : [];
      var textFieldsArray = [];
      var that = _this;
      textFieldsBlocks.forEach(function (item) {
        var inputsElements = item.querySelectorAll('input , textarea');
        var inputElemObj = {};
        inputsElements.forEach(function (i) {
          var key = i.getAttribute('name'),
              val = i.value;

          if (i.classList.contains("ckeditor_text")) {
            key = 'ckeditor_text'; // @ts-ignore: Unreachable code error

            val = CKEDITOR.instances[i.getAttribute('id')].getData();
          }

          inputElemObj[key] = val;
        });

        if (!that.checkIfTextFieldDataIsEmpty(inputElemObj)) {
          textFieldsArray = __spreadArrays(textFieldsArray, [inputElemObj]);
        }
      });
      return textFieldsArray;
    };

    this.formSubmit = function () {
      var formElements = __spreadArrays(_this.getCategoryData());

      var validArray; // validation ====================

      validArray = formElements.map(function (input) {
        if (input.hasAttribute('validation')) {
          // if (this.validator.textValidator(input)) return true
          //  else return false
          return _this.validator.textValidator(input);
        }
      }); //validator ======================

      if (!validArray.includes(false)) {
        var token = document.querySelector('[name=csrf-token]');
        var formData = {
          categoryDataObject: _this.collectCategoryData(formElements),
          textFieldsObject: _this.getTextFieldsElements(),
          'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
        };
        var Api = new CategoriesApi_1["default"]('/admin/categories/add_category', 'POST', {
          formData: JSON.stringify(formData)
        });
        var promise = Api.exeq();
        promise.then(function (data) {
          if (typeof data == 'number') {
            _this.clearForm();

            var radioButton = document.getElementById('list_open_close');
            if (!radioButton) return;
            radioButton.checked = true;
          }
        });
      }
    };

    this.collectCategoryData = function (formElements) {
      if (formElements === void 0) {
        formElements = [];
      }

      var catData = {};

      if (formElements.length === 0) {
        formElements = _this.getCategoryData().length > 0 ? __spreadArrays(_this.getCategoryData()) : [];
      }

      formElements.forEach(function (input) {
        catData[input.getAttribute('name')] = input.value;
      });
      return catData;
    };

    this.checkIfTextFieldDataIsEmpty = function (textFieldObject) {
      var objVal = Object.values(textFieldObject);
      var checkArray = objVal.map(function (val) {
        return val == '' || val == ' ';
      });

      if (checkArray.some(function (e) {
        return e === true;
      })) {
        return true;
      }

      return false;
    };

    this.clearForm = function () {
      var form = document.getElementById('category_form');

      if (form) {
        var inputs = form.querySelectorAll('.category_data input:not([type=hidden]), .category_data textarea,' + '                                   .categories_text_field input, .categories_text_field textarea');

        if (inputs) {
          inputs.forEach(function (item) {
            // debugger
            if (item.id.includes('ckeditor_text')) {
              // @ts-ignore
              CKEDITOR.instances[item.name].setData('');
            }

            item.value = '';
          });
        }

        var addedTextFields = form.querySelectorAll('.added');

        if (addedTextFields.length > 0) {
          addedTextFields.forEach(function (el) {
            el.remove();
          });
        }
      }
    };

    this.listOpenClose = function () {
      var radioButton = document.getElementById('list_open_close');

      if (radioButton) {
        radioButton.checked = true;
      }
    };
  }

  return Form;
}();

exports["default"] = Form;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/form/FormListeners.js":
/*!****************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/form/FormListeners.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TextField_1 = __importDefault(__webpack_require__(/*! ./TextField */ "./resources/js/admin/modules/categories_module/form/TextField.js"));

var Form_1 = __importDefault(__webpack_require__(/*! ./Form */ "./resources/js/admin/modules/categories_module/form/Form.js"));

var FormListeners =
/** @class */
function () {
  function FormListeners() {
    var _this = this;

    this.formController = new Form_1["default"]();

    this.add = function () {
      var button = document.getElementById('category_form_submit');
      if (!button) return;
      button.addEventListener('click', function (e) {
        _this.formController.formSubmit();
      });
    };

    this.addTextField = function () {
      var button = document.getElementById('add_text_field');
      if (!button) return;
      button.addEventListener('click', function (e) {
        _this.textField.addTextFieldFormElement();
      });
    };

    this.textFieldRemove = function () {
      var form = document.getElementById('category_form_container');
      if (!form) return;
      form.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.remove_field')) {
          _this.textField.fieldRemove(e);
        }
      });
    };

    this.textFieldOpenClose = function () {
      var form = document.getElementById('category_form_container');
      if (!form) return;
      form.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.text_open_close')) {
          _this.textField.fieldOpenClose(e);
        }
      });
    };

    this.listOpenClose = function () {
      var openCloseButton = document.getElementById('list_open_close_button');

      if (openCloseButton) {
        openCloseButton.onclick = function () {
          _this.formController.listOpenClose();
        };
      }
    };

    this.textField = new TextField_1["default"]();
    this.formController.validatorInit();
    this.add();
    this.addTextField();
    this.textFieldRemove();
    this.textFieldOpenClose();
    this.listOpenClose();
  }

  return FormListeners;
}();

exports["default"] = FormListeners;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/form/TextField.js":
/*!************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/form/TextField.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CategoriesApi_1 = __importDefault(__webpack_require__(/*! ../../../api/CategoriesApi */ "./resources/js/admin/api/CategoriesApi.js"));

var TextField =
/** @class */
function () {
  function TextField() {
    var _this = this;

    this.keys = [1];

    this.addTextFieldFormElement = function () {
      var api = new CategoriesApi_1["default"]('/admin/categories/get_text_field', 'POST', {}, 'text');
      var promise = api.exeq();
      promise.then(function (data) {
        var textFieldContainer = document.querySelector('div.catTextFieldsContainer');
        var container = document.createElement('div');
        container.classList.add('added');
        container.classList.add('hidden');
        container.innerHTML = data;

        if (textFieldContainer) {
          textFieldContainer.append(container);
        }

        _this.fieldsChangeBoxProperties();

        setTimeout(function () {
          container.classList.remove('hidden');
        }, 20);
      });
    };

    this.fieldsChangeBoxProperties = function () {
      var fieldsBoxes = document.querySelectorAll('.added .categories_text_field');
      fieldsBoxes.forEach(function (item, key) {
        var max = _this.keys[_this.keys.length - 1];

        _this.keys.push(max + 1);

        if (item) {
          var num = item.querySelector('.head .left_box .num');
          if (num) num.textContent = "" + (key + 1);
          var editor = item.querySelector('[name=ckeditor_text]');

          if (editor) {
            var new_id = "ckeditor_text_" + _this.keys[_this.keys.length - 1];
            editor.setAttribute('id', new_id);
            editor.setAttribute('name', new_id);
            var oldScript = item.querySelector('sctipt');

            if (oldScript) {
              oldScript.remove();
            } // @ts-ignore


            CKEDITOR.replace(new_id, {
              customConfig: '../ckeditor/custom_config.js'
            });
          }
        }
      });
    };

    this.fieldRemove = function (e) {
      var parentElement = e.target.closest('.added');
      parentElement.classList.add('hidden');
      setTimeout(function () {
        parentElement.remove();
      }, 500);
    };

    this.fieldOpenClose = function (e) {
      var target = e.target,
          parentElement = target.closest('.added'),
          body = parentElement.querySelector('.body');
      var nodeText = target.textContent;

      if (nodeText === 'keyboard_arrow_up') {
        body.classList.add('colapsed');
        target.textContent = 'keyboard_arrow_down';
      } else {
        body.classList.remove('colapsed');
        target.textContent = 'keyboard_arrow_up';
      }
    };
  }

  return TextField;
}();

exports["default"] = TextField;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/index.js":
/*!***************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FormListeners_1 = __importDefault(__webpack_require__(/*! ./form/FormListeners */ "./resources/js/admin/modules/categories_module/form/FormListeners.js"));

var ListListeners_1 = __importDefault(__webpack_require__(/*! ./list/ListListeners */ "./resources/js/admin/modules/categories_module/list/ListListeners.js"));
/*
*  Categories form ==========================
*
* */
// @ts-ignore


CKEDITOR.replace('ckeditor_text', {
  customConfig: '../ckeditor/custom_config.js'
});
var f = new FormListeners_1["default"]();
var l = new ListListeners_1["default"]();
/*
* Categories form end ===========================================================
* */

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/list/ListController.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/list/ListController.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RegularRender_1 = __importDefault(__webpack_require__(/*! ./list_render/RegularRender */ "./resources/js/admin/modules/categories_module/list/list_render/RegularRender.js"));

var RegularListBuilder_1 = __importDefault(__webpack_require__(/*! ./html_list_builder/RegularListBuilder */ "./resources/js/admin/modules/categories_module/list/html_list_builder/RegularListBuilder.js"));

var CategoriesApi_1 = __importDefault(__webpack_require__(/*! ../../../api/CategoriesApi */ "./resources/js/admin/api/CategoriesApi.js"));

var CategoriesState_1 = __importDefault(__webpack_require__(/*! ../../../states/content/categories/CategoriesState */ "./resources/js/admin/states/content/categories/CategoriesState.js"));

var ListController =
/** @class */
function () {
  function ListController() {
    var _this = this;

    this.store = new CategoriesState_1["default"]();

    this.getAllList = function () {
      var token = document.querySelector('[name=csrf-token]');
      var formData = {
        action: {},
        'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
      };
      var Api = new CategoriesApi_1["default"]('/admin/categories/get_list', 'POST', {
        formData: JSON.stringify(formData)
      });
      var promise = Api.exeq();
      promise.then(function (data) {
        _this.store.fill(data, 'categories');

        _this.regularPage(1);

        var perPageInput = document.getElementById('per_page');

        if (perPageInput) {
          perPageInput.value = _this.store.getState('per_page');
        }
      });
    };

    this.regularPage = function (curentPage) {
      _this.store.setState('current_page', curentPage);

      var render = new RegularRender_1["default"](_this.store);
      render.listRender(new RegularListBuilder_1["default"]());
    };

    this.sortByDate = function () {
      _this.store.setState('sort_by_date_desc', !_this.store.getState('sort_by_date_desc'));

      _this.regularPage(1);
    };

    this.includeDeleted = function () {
      _this.store.setState('include_deleted', !_this.store.getState('include_deleted'));

      _this.regularPage(1);
    };
  }

  ListController.prototype.onlyDeleted = function () {
    var includeDeletedElement = document.getElementById('include_deleted');

    if (includeDeletedElement && !includeDeletedElement.checked) {
      includeDeletedElement.click();
    }

    this.store.setState('only_deleted', !this.store.getState('only_deleted'));
    this.regularPage(1);
  };

  ListController.prototype.changePerPageNum = function (event) {
    var newVal = event.target.value;
    this.store.setState('per_page', +newVal);
    this.regularPage(1);
  };

  ListController.prototype.formOpenClose = function () {
    var radioButton = document.getElementById('form_open_close');

    if (radioButton) {
      radioButton.checked = true;
    }
  };

  ListController.prototype.searchInput = function (event) {
    var target = event.target;
    var inputValue = target.value;
    this.store.setState('search_string', inputValue);
    this.regularPage(1);
  };

  return ListController;
}();

exports["default"] = ListController;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/list/ListListeners.js":
/*!****************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/list/ListListeners.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ListController_1 = __importDefault(__webpack_require__(/*! ./ListController */ "./resources/js/admin/modules/categories_module/list/ListController.js"));

var ListListeners =
/** @class */
function () {
  function ListListeners() {
    var _this = this;

    this.listContainer = document.getElementById('categories_list_container');
    this.listController = new ListController_1["default"]();

    this.getList = function () {
      _this.listController.getAllList();
    };
    /*
    * pagination exequte
    * */


    this.pageSwitch = function () {
      if (_this.listContainer) {
        _this.listContainer.addEventListener('click', function (e) {
          var targ = e.target;

          if (targ) {
            if (targ.matches('a.page-link') || targ.matches('a.page-link span')) {
              if (targ.matches('a.page-link span')) {
                targ = targ.closest('a.page-link');
              }

              e.preventDefault();

              try {
                var pageNum = targ.getAttribute('page_num');

                _this.listController.regularPage(pageNum);
              } catch (error) {
                console.error('Expected attrribute "page_num" in target Button');
              }
            }
          }
        });
      }
    };
    /*
    * sorting by date
    * */


    this.sortByDate = function () {
      if (_this.listContainer) {
        var sortByDateInput = _this.listContainer.querySelector('#categories_control_panel #sort_by_date');

        if (sortByDateInput) {
          sortByDateInput.addEventListener('click', function () {
            _this.listController.sortByDate();
          });
        }
      }
    };
    /*
    * show hide deleted items
    * */


    this.includeDeleted = function () {
      if (_this.listContainer) {
        var sortByDateInput = _this.listContainer.querySelector('#categories_control_panel #include_deleted');

        if (sortByDateInput) {
          sortByDateInput.addEventListener('click', function () {
            _this.listController.includeDeleted();
          });
        }
      }
    };
    /*
    * only deleted ****************
    * */


    this.onlyDeleted = function () {
      if (_this.listContainer) {
        var sortByDateInput = _this.listContainer.querySelector('#categories_control_panel #just_deleted');

        if (sortByDateInput) {
          sortByDateInput.addEventListener('click', function (e) {
            var checkBox = e.target;

            if (checkBox) {
              _this.listController.onlyDeleted();
            }
          });
        }
      }
    };

    this.getList();
    this.pageSwitch();
    this.sortByDate();
    this.includeDeleted();
    this.onlyDeleted();
    this.changePerPageNum();
    this.formOpenClose();
    this.categoriesSearch();
  }
  /*
  * change per page num
  * */


  ListListeners.prototype.changePerPageNum = function () {
    var _this = this;

    var perPageInput = document.getElementById('per_page');

    if (perPageInput) {
      perPageInput.oninput = function (e) {
        _this.listController.changePerPageNum(e);
      };
    }
  };
  /*
  * form open close
  * */


  ListListeners.prototype.formOpenClose = function () {
    var _this = this;

    var addNewButton = document.getElementById('add_new_category_form_open');

    if (addNewButton) {
      addNewButton.onclick = function () {
        _this.listController.formOpenClose();
      };
    }
  };
  /*
  *
  * search by name or heading ============
  * */


  ListListeners.prototype.categoriesSearch = function () {
    var _this = this;

    var searchInput = document.getElementById('categories_search_input');

    if (searchInput) {
      searchInput.oninput = function (e) {
        _this.listController.searchInput(e);
      };
    }
  };

  return ListListeners;
}();

exports["default"] = ListListeners;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/list/html_list_builder/RegularListBuilder.js":
/*!***************************************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/list/html_list_builder/RegularListBuilder.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var RegularListBuilder =
/** @class */
function () {
  function RegularListBuilder() {}

  RegularListBuilder.prototype.builder = function (item, key) {
    if (item.text_field_num == null) item.text_field_num = 0;
    var deleted = '';
    if (item.deleted_at) deleted = 'deleted';
    return '<tr class="' + deleted + '">' + '<td scope="row">' + key + '</td>' + '<td>' + item.id + '</td>' + '<td>' + item.name + '</td>' + '<td>' + item.heading + '</td>' + '<td><span class="badge badge-pill badge-primary">' + item.text_field_num + '</span></td>' + '<td class="cat_controls">controls</td>' + '</tr>';
  };

  return RegularListBuilder;
}();

exports["default"] = RegularListBuilder;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/list/html_pagination_builder/RegularPaginationBuilder.js":
/*!***************************************************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/list/html_pagination_builder/RegularPaginationBuilder.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var RegularPaginationBuilder =
/** @class */
function () {
  function RegularPaginationBuilder() {}

  RegularPaginationBuilder.prototype.build = function (data) {
    if (data.buttons_num !== 0) {
      var navHtml = '<ul class="pagination">' + '<li class="page-item">' + '<a class="page-link" page_num="1" href="#" aria-label="Previous">' + '<span aria-hidden="true">«</span>' + '</a>' + '</li>'; //===============================

      for (var i = data.start_page; i <= data.buttons_num; i++) {
        var current = data.current_page == i ? 'current' : '';
        navHtml += '<li class="page-item ' + current + '">' + '<a class="page-link" page_num="' + i + '" href="#">' + i + '</a></li>';
      } //========================================


      navHtml += '<li class="page-item">' + '<a class="page-link" page_num="' + data.last_page + '" href="#" aria-label="Next">' + '<span aria-hidden="true">»</span>' + '</a>' + '</li>' + '</ul>';
      return navHtml;
    }

    return '';
  };

  return RegularPaginationBuilder;
}();

exports["default"] = RegularPaginationBuilder;

/***/ }),

/***/ "./resources/js/admin/modules/categories_module/list/list_render/RegularRender.js":
/*!****************************************************************************************!*\
  !*** ./resources/js/admin/modules/categories_module/list/list_render/RegularRender.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __spreadArrays = this && this.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RegularPaginationBuilder_1 = __importDefault(__webpack_require__(/*! ../html_pagination_builder/RegularPaginationBuilder */ "./resources/js/admin/modules/categories_module/list/html_pagination_builder/RegularPaginationBuilder.js"));

var CategoriesPagination_1 = __importDefault(__webpack_require__(/*! ../../../../lib/list_pagination/content/categories/CategoriesPagination */ "./resources/js/admin/lib/list_pagination/content/categories/CategoriesPagination.js"));

var RegularRender =
/** @class */
function () {
  function RegularRender(store) {
    var _this = this;

    this.tableContainer = document.getElementById('categories_list_container');

    this.append = function (listHtml) {
      if (_this.tableContainer) {
        try {
          var tableBody = _this.tableContainer.querySelector('table tbody');

          if (tableBody) {
            tableBody.innerHTML = listHtml;
          }
        } catch (e) {
          console.error('Append error');
        }
      }
    };

    this.store = store;
    this.pagination = new CategoriesPagination_1["default"](this.store);
  }
  /*
     * get items HTML and put it into page table box
     * */


  RegularRender.prototype.listRender = function (builder) {
    var categoriesList = this.store.getState('categories');
    var perPageNum = this.store.getState('per_page') || 0;
    var perPage = perPageNum != 0 ? perPageNum : categoriesList.length;
    var currentPage = this.store.getState('current_page');
    var offset = currentPage * perPage - (perPage - 1);
    var limit = currentPage * perPage;
    var listHtml = '';
    categoriesList = this.pagination.searchItems(categoriesList);
    categoriesList = this.pagination.includeDeleted(categoriesList);
    categoriesList = this.pagination.sortByData(categoriesList);
    categoriesList = this.pagination.onlyDeleted(categoriesList);
    categoriesList = this.pagination.includeDeleted(categoriesList);
    this.pagination.setListItemsNumberMaxParam(__spreadArrays(categoriesList));
    categoriesList.forEach(function (item, key) {
      if (key >= offset - 1 && key <= limit - 1) {
        listHtml += builder.builder(item, key + 1);
      }
    });
    this.append(listHtml);
    var paginationHtml = this.paginationRender(new RegularPaginationBuilder_1["default"](), categoriesList);
    this.paginationAppend(paginationHtml);
  };

  RegularRender.prototype.paginationRender = function (builder, list) {
    var objectToBuilder = this.pagination.paginationRender(list);
    return builder.build(objectToBuilder);
  };

  RegularRender.prototype.paginationAppend = function (paginationHtml) {
    if (this.tableContainer) {
      try {
        var paginationBox = this.tableContainer.querySelector('ul.pagination');

        if (paginationBox) {
          paginationBox.innerHTML = paginationHtml;
        }
      } catch (e) {
        console.error('Append error');
      }
    }
  };

  return RegularRender;
}();

exports["default"] = RegularRender;

/***/ }),

/***/ "./resources/js/admin/states/AbstractState.js":
/*!****************************************************!*\
  !*** ./resources/js/admin/states/AbstractState.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var AbstractState =
/** @class */
function () {
  function AbstractState() {}

  AbstractState.prototype.fill = function (insertedArray, stateFieldName) {
    this.listState[stateFieldName] = insertedArray; // callback(...params)
  };

  AbstractState.prototype.getState = function (stateFieldName) {
    return this.listState[stateFieldName];
  };

  AbstractState.prototype.setState = function (stateFieldName, newValue) {
    this.listState[stateFieldName] = newValue; // callback(...params)
  };

  AbstractState.prototype.getAllState = function () {
    return this.listState;
  };

  return AbstractState;
}();

exports["default"] = AbstractState;

/***/ }),

/***/ "./resources/js/admin/states/content/categories/CategoriesState.js":
/*!*************************************************************************!*\
  !*** ./resources/js/admin/states/content/categories/CategoriesState.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var AbstractState_1 = __importDefault(__webpack_require__(/*! ../../AbstractState */ "./resources/js/admin/states/AbstractState.js"));

var CategoriesState =
/** @class */
function (_super) {
  __extends(CategoriesState, _super);

  function CategoriesState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.listState = {
      categories: [],
      current_page: 1,
      per_page: 6,
      include_deleted: false,
      only_deleted: false,
      sort_by_date_desc: false,
      search_string: ''
    };
    return _this;
  }

  return CategoriesState;
}(AbstractState_1["default"]);

exports["default"] = CategoriesState;

/***/ }),

/***/ 3:
/*!*********************************************************************!*\
  !*** multi ./resources/js/admin/modules/categories_module/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/new_admin/resources/js/admin/modules/categories_module/index.js */"./resources/js/admin/modules/categories_module/index.js");


/***/ })

/******/ });