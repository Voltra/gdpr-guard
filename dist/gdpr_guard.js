(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gdprGuard", [], factory);
	else if(typeof exports === 'object')
		exports["gdprGuard"] = factory();
	else
		root["gdprGuard"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/gdpr_guard.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GdprGuard.ts":
/*!**************************!*\
  !*** ./src/GdprGuard.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage_1 = __webpack_require__(/*! ./GdprStorage */ "./src/GdprStorage.ts");
function makeGuard(name, description, storage, required, enabled) {
    if (storage === void 0) { storage = GdprStorage_1.GdprStorage.Cookie; }
    if (required === void 0) { required = false; }
    if (enabled === void 0) { enabled = null; }
    return {
        name: name,
        description: description,
        storage: storage,
        required: required,
        enabled: enabled === null ? required : enabled,
        enable: function () {
            if (!this.enabled)
                this.toggle();
            return this;
        },
        disable: function () {
            if (this.enabled)
                this.toggle();
            return this;
        },
        toggle: function () {
            if (!this.required)
                this.enabled = !this.enabled;
            return this;
        },
        makeRequired: function () {
            this.required = true;
            this.enabled = true;
            return this;
        },
        isEnabled: function (name) {
            return this.name === name && this.enabled;
        },
        enableForStorage: function (type) {
            if (!this.enabled)
                this.toggleForStorage(type);
            return this;
        },
        disableForStorage: function (type) {
            if (this.enabled)
                this.toggleForStorage(type);
            return this;
        },
        toggleForStorage: function (type) {
            if (this.storage == type && !this.required)
                this.toggle();
            return this;
        },
        raw: function () {
            return JSON.parse(JSON.stringify(this));
        }
    };
}
exports.makeGuard = makeGuard;


/***/ }),

/***/ "./src/GdprGuardGroup.ts":
/*!*******************************!*\
  !*** ./src/GdprGuardGroup.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage_1 = __webpack_require__(/*! ./GdprStorage */ "./src/GdprStorage.ts");
var GdprGuardGroup = (function () {
    function GdprGuardGroup(name, description, enabled, required) {
        if (description === void 0) { description = ""; }
        if (enabled === void 0) { enabled = false; }
        if (required === void 0) { required = false; }
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.required = required;
        this.bindings = new Map();
        this.storage = GdprStorage_1.GdprStorage.None;
        if (this.required)
            this.enabled = true;
    }
    GdprGuardGroup.for = function (name, description, enabled, required) {
        if (description === void 0) { description = ""; }
        if (enabled === void 0) { enabled = false; }
        if (required === void 0) { required = false; }
        return new GdprGuardGroup(name, description, enabled, required);
    };
    GdprGuardGroup.prototype.addGuard = function (guard) {
        this.bindings.set(guard.name, guard);
        return this;
    };
    GdprGuardGroup.prototype.hasGuard = function (name) {
        return this.bindings.has(name);
    };
    GdprGuardGroup.prototype.getGuard = function (name) {
        return this.bindings.get(name) || null;
    };
    GdprGuardGroup.prototype.doForEachGuard = function (cb) {
        this.bindings.forEach(function (guard) { return cb(guard); });
        return this;
    };
    GdprGuardGroup.prototype.isEnabled = function (name) {
        var e_1, _a;
        if (this.hasGuard(name)) {
            var guard = this.getGuard(name);
            if (guard !== null) {
                return guard.enabled;
            }
        }
        try {
            for (var _b = __values(this.bindings), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), _ = _d[0], guard = _d[1];
                if (guard.isEnabled(name))
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    GdprGuardGroup.prototype.enable = function () {
        return this.doForEachGuard(function (guard) { return guard.enable(); });
    };
    GdprGuardGroup.prototype.disable = function () {
        return this.doForEachGuard(function (guard) { return guard.disable(); });
    };
    GdprGuardGroup.prototype.toggle = function () {
        return this.enabled ? this.disable() : this.enable();
    };
    GdprGuardGroup.prototype.makeRequired = function () {
        this.required = true;
        this.enabled = true;
        return this.doForEachGuard(function (guard) { return guard.makeRequired(); });
    };
    GdprGuardGroup.prototype.enableForStorage = function (type) {
        return this.doForEachGuard(function (guard) {
            if (guard.storage & type)
                guard.enable();
        });
    };
    GdprGuardGroup.prototype.disableForStorage = function (type) {
        return this.doForEachGuard(function (guard) {
            if (guard.storage & type)
                guard.disable();
        });
    };
    GdprGuardGroup.prototype.toggleForStorage = function (type) {
        return this.doForEachGuard(function (guard) {
            if (guard.storage & type)
                return guard.toggle();
        });
    };
    GdprGuardGroup.prototype.raw = function () {
        var ret = {
            name: this.name,
            description: this.description,
            enabled: this.enabled,
            required: this.required,
            storage: this.storage,
            guards: [],
        };
        ret.guards = __spread(this.bindings).map(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], guard = _b[1];
            return guard.raw();
        });
        return ret;
    };
    return GdprGuardGroup;
}());
exports.GdprGuardGroup = GdprGuardGroup;


/***/ }),

/***/ "./src/GdprManager.ts":
/*!****************************!*\
  !*** ./src/GdprManager.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GdprGuardGroup_1 = __webpack_require__(/*! ./GdprGuardGroup */ "./src/GdprGuardGroup.ts");
var GdprStorage_1 = __webpack_require__(/*! ./GdprStorage */ "./src/GdprStorage.ts");
var GdprManager = (function () {
    function GdprManager() {
        this.groups = new Map();
        this.name = "manager";
        this.description = "Manager of GDPR guard groups";
        this.enabled = true;
        this.storage = GdprStorage_1.GdprStorage.None;
        this.required = false;
    }
    GdprManager.create = function (groups) {
        if (groups === void 0) { groups = []; }
        var manager = new GdprManager();
        groups.forEach(function (group) { return manager.addGroup(group); });
        return manager;
    };
    GdprManager.prototype.createGroup = function (name, description) {
        if (description === void 0) { description = ""; }
        return this.addGroup(GdprGuardGroup_1.GdprGuardGroup.for(name, description));
    };
    GdprManager.prototype.addGroup = function (category) {
        this.groups.set(category.name, category);
        return this;
    };
    GdprManager.prototype.reduceGroupsPred = function (pred) {
        var e_1, _a;
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), _ = _d[0], group = _d[1];
                if (pred(group))
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    GdprManager.prototype.forEachGroup = function (cb) {
        this.groups.forEach(function (group) { return cb(group); });
        return this;
    };
    GdprManager.prototype.hasGuard = function (name) {
        return this.reduceGroupsPred(function (group) { return group.hasGuard(name); });
    };
    GdprManager.prototype.getGuard = function (name) {
        var e_2, _a;
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), _ = _d[0], group = _d[1];
                if (group.hasGuard(name))
                    return group.getGuard(name);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return null;
    };
    GdprManager.prototype.hasGroup = function (name) {
        return this.reduceGroupsPred(function (group) { return group.name === name; });
    };
    GdprManager.prototype.getGroup = function (name) {
        var e_3, _a;
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), n = _d[0], group = _d[1];
                if (n === name)
                    return group;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return null;
    };
    GdprManager.prototype.isEnabled = function (name) {
        return this.reduceGroupsPred(function (group) { return group.isEnabled(name); });
    };
    GdprManager.prototype.enable = function () {
        this.enabled = true;
        return this.forEachGroup(function (group) { return group.enable(); });
    };
    GdprManager.prototype.disable = function () {
        this.enabled = false;
        return this.forEachGroup(function (group) { return group.disable(); });
    };
    GdprManager.prototype.toggle = function () {
        return this.enabled ? this.disable() : this.enable();
    };
    GdprManager.prototype.makeRequired = function () {
        return this;
    };
    GdprManager.prototype.enableForStorage = function (type) {
        return this.forEachGroup(function (group) { return group.enableForStorage(type); });
    };
    GdprManager.prototype.disableForStorage = function (type) {
        return this.forEachGroup(function (group) { return group.disableForStorage(type); });
    };
    GdprManager.prototype.toggleForStorage = function (type) {
        return this.forEachGroup(function (group) { return group.toggleForStorage(type); });
    };
    GdprManager.prototype.raw = function () {
        var ret = {
            enabled: this.enabled,
            groups: [],
        };
        ret.groups = __spread(this.groups).map(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], group = _b[1];
            return group.raw();
        });
        return ret;
    };
    return GdprManager;
}());
exports.GdprManager = GdprManager;


/***/ }),

/***/ "./src/GdprStorage.ts":
/*!****************************!*\
  !*** ./src/GdprStorage.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage;
(function (GdprStorage) {
    GdprStorage[GdprStorage["None"] = 1] = "None";
    GdprStorage[GdprStorage["Cookie"] = 2] = "Cookie";
    GdprStorage[GdprStorage["LocalStorage"] = 4] = "LocalStorage";
    GdprStorage[GdprStorage["SessionStorage"] = 8] = "SessionStorage";
    GdprStorage[GdprStorage["IndexedDb"] = 16] = "IndexedDb";
    GdprStorage[GdprStorage["FileSystem"] = 16] = "FileSystem";
    GdprStorage[GdprStorage["ServerStorage"] = 16] = "ServerStorage";
    GdprStorage[GdprStorage["All"] = 30] = "All";
})(GdprStorage || (GdprStorage = {}));
exports.GdprStorage = GdprStorage;


/***/ }),

/***/ "./src/builders/GdprGroupBuilder.ts":
/*!******************************************!*\
  !*** ./src/builders/GdprGroupBuilder.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage_1 = __webpack_require__(/*! ../GdprStorage */ "./src/GdprStorage.ts");
var GdprManagerBuilder_1 = __webpack_require__(/*! ./GdprManagerBuilder */ "./src/builders/GdprManagerBuilder.ts");
var GdprGuardGroup_1 = __webpack_require__(/*! ../GdprGuardGroup */ "./src/GdprGuardGroup.ts");
var GdprGuardBuilder_1 = __webpack_require__(/*! ./GdprGuardBuilder */ "./src/builders/GdprGuardBuilder.ts");
var GdprGroupBuilder = (function (_super) {
    __extends(GdprGroupBuilder, _super);
    function GdprGroupBuilder(parent, name, description, storage, enable, require) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.name = name;
        _this.description = description;
        _this.enable = enable;
        _this.require = require;
        _this.guards = [];
        _this.storage = storage;
        if (require)
            _this.enable = true;
        return _this;
    }
    GdprGroupBuilder.prototype.startGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return _super.prototype.startGroup.call(this, storage || this.parent.storage, name, description);
    };
    GdprGroupBuilder.prototype.startRequiredGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description).required();
    };
    GdprGroupBuilder.create = function (mb, name, description, storage, enabled, required) {
        if (description === void 0) { description = ""; }
        if (storage === void 0) { storage = null; }
        if (enabled === void 0) { enabled = true; }
        if (required === void 0) { required = true; }
        return new GdprGroupBuilder(mb, name, description, storage || GdprStorage_1.GdprStorage.Cookie, enabled, required);
    };
    GdprGroupBuilder.prototype.endGroup = function () {
        var enable = this.require || this.enable;
        var group = GdprGuardGroup_1.GdprGuardGroup.for(this.name, this.description, enable, this.require);
        var guards = __spread(this.guards, this.groups);
        guards.forEach(function (guard) { return group.addGuard(guard); });
        if (this.require)
            group.makeRequired();
        this.parent.groups.push(group);
        return this.parent;
    };
    GdprGroupBuilder.prototype.edit = function (cb) {
        cb(this);
        return this;
    };
    GdprGroupBuilder.prototype.withName = function (name) {
        return this.edit(function (b) { return b.name = name; });
    };
    GdprGroupBuilder.prototype.withDescription = function (description) {
        return this.edit(function (b) { return b.description = description; });
    };
    GdprGroupBuilder.prototype.storedIn = function (storage) {
        return this.edit(function (b) { return b.storage = storage; });
    };
    GdprGroupBuilder.prototype.enabled = function () {
        return this.edit(function (b) { return b.enable = true; });
    };
    GdprGroupBuilder.prototype.disabled = function () {
        return this.edit(function (b) { return b.enable = false; });
    };
    GdprGroupBuilder.prototype.required = function () {
        return this.edit(function (b) { return b.require = true; });
    };
    GdprGroupBuilder.prototype.startGuard = function (storage) {
        if (storage === void 0) { storage = null; }
        return GdprGuardBuilder_1.GdprGuardBuilder.create(this, storage || this.storage, this.enable);
    };
    GdprGroupBuilder.prototype.startRequiredGuard = function (storage) {
        return this.startGuard(storage).required();
    };
    GdprGroupBuilder.prototype.withEnabledGuard = function (name, description, storage) {
        if (description === void 0) { description = ""; }
        if (storage === void 0) { storage = null; }
        return this.startGuard(storage)
            .withName(name)
            .withDescription(description)
            .enabled()
            .endGuard();
    };
    GdprGroupBuilder.prototype.withDisabledGuard = function (name, description, storage) {
        if (description === void 0) { description = ""; }
        if (storage === void 0) { storage = null; }
        return this.startGuard(storage)
            .withName(name)
            .withDescription(description)
            .disabled()
            .endGuard();
    };
    return GdprGroupBuilder;
}(GdprManagerBuilder_1.GdprManagerBuilder));
exports.GdprGroupBuilder = GdprGroupBuilder;


/***/ }),

/***/ "./src/builders/GdprGuardBuilder.ts":
/*!******************************************!*\
  !*** ./src/builders/GdprGuardBuilder.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage_1 = __webpack_require__(/*! ../GdprStorage */ "./src/GdprStorage.ts");
var GdprGuard_1 = __webpack_require__(/*! ../GdprGuard */ "./src/GdprGuard.ts");
var GdprGuardBuilder = (function () {
    function GdprGuardBuilder(parent, storage, enable, require) {
        this.parent = parent;
        this.storage = storage;
        this.enable = enable;
        this.require = require;
        this.name = "";
        this.description = "";
        if (require)
            this.enable = true;
    }
    GdprGuardBuilder.create = function (gb, storage, enabled, required) {
        if (storage === void 0) { storage = GdprStorage_1.GdprStorage.Cookie; }
        if (enabled === void 0) { enabled = false; }
        if (required === void 0) { required = false; }
        return new GdprGuardBuilder(gb, storage, enabled, required);
    };
    GdprGuardBuilder.prototype.endGuard = function () {
        var enable = this.require || this.enable;
        var guard = GdprGuard_1.makeGuard(this.name, this.description, this.storage, this.require, enable);
        if (this.require)
            guard.makeRequired();
        this.parent.guards.push(guard);
        return this.parent;
    };
    GdprGuardBuilder.prototype.edit = function (edit) {
        edit(this);
        return this;
    };
    GdprGuardBuilder.prototype.withName = function (name) {
        return this.edit(function (b) { return b.name = name; });
    };
    GdprGuardBuilder.prototype.withDescription = function (description) {
        return this.edit(function (b) { return b.description = description; });
    };
    GdprGuardBuilder.prototype.enabled = function () {
        return this.edit(function (b) { return b.enable = true; });
    };
    GdprGuardBuilder.prototype.disabled = function () {
        return this.edit(function (b) { return b.enable = false; });
    };
    GdprGuardBuilder.prototype.storedIn = function (storage) {
        return this.edit(function (b) { return b.storage = storage; });
    };
    GdprGuardBuilder.prototype.required = function () {
        return this.edit(function (b) { return b.require = true; });
    };
    return GdprGuardBuilder;
}());
exports.GdprGuardBuilder = GdprGuardBuilder;


/***/ }),

/***/ "./src/builders/GdprManagerBuilder.ts":
/*!********************************************!*\
  !*** ./src/builders/GdprManagerBuilder.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprStorage_1 = __webpack_require__(/*! ../GdprStorage */ "./src/GdprStorage.ts");
var GdprManager_1 = __webpack_require__(/*! ../GdprManager */ "./src/GdprManager.ts");
var builders_1 = __webpack_require__(/*! ./builders */ "./src/builders/builders.ts");
var GdprManagerBuilder = (function () {
    function GdprManagerBuilder() {
        this.storage = GdprStorage_1.GdprStorage.Cookie;
        this.groups = [];
    }
    GdprManagerBuilder.make = function () {
        return new GdprManagerBuilder();
    };
    GdprManagerBuilder.prototype.startGroup = function (storage, name, description, enabled) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (enabled === void 0) { enabled = true; }
        return builders_1.GdprGroupBuilder.create(this, name, description, storage, enabled);
    };
    GdprManagerBuilder.prototype.startRequiredGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description, true).enabled();
    };
    GdprManagerBuilder.prototype.startEnabledGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description, true);
    };
    GdprManagerBuilder.prototype.startDisabledGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description, false);
    };
    GdprManagerBuilder.prototype.build = function () {
        return GdprManager_1.GdprManager.create(this.groups);
    };
    GdprManagerBuilder.prototype.endGroup = function () {
        return this;
    };
    return GdprManagerBuilder;
}());
exports.GdprManagerBuilder = GdprManagerBuilder;


/***/ }),

/***/ "./src/builders/builders.ts":
/*!**********************************!*\
  !*** ./src/builders/builders.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./GdprGuardBuilder */ "./src/builders/GdprGuardBuilder.ts"));
__export(__webpack_require__(/*! ./GdprManagerBuilder */ "./src/builders/GdprManagerBuilder.ts"));
__export(__webpack_require__(/*! ./GdprGroupBuilder */ "./src/builders/GdprGroupBuilder.ts"));


/***/ }),

/***/ "./src/gdpr_guard.ts":
/*!***************************!*\
  !*** ./src/gdpr_guard.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprGuard_1 = __webpack_require__(/*! ./GdprGuard */ "./src/GdprGuard.ts");
exports.makeGuard = GdprGuard_1.makeGuard;
var GdprGuardGroup_1 = __webpack_require__(/*! ./GdprGuardGroup */ "./src/GdprGuardGroup.ts");
exports.GdprGuardGroup = GdprGuardGroup_1.GdprGuardGroup;
var GdprManager_1 = __webpack_require__(/*! ./GdprManager */ "./src/GdprManager.ts");
exports.GdprManager = GdprManager_1.GdprManager;
var GdprStorage_1 = __webpack_require__(/*! ./GdprStorage */ "./src/GdprStorage.ts");
exports.GdprStorage = GdprStorage_1.GdprStorage;
var builders_1 = __webpack_require__(/*! ./builders/builders */ "./src/builders/builders.ts");
exports.GdprManagerBuilder = builders_1.GdprManagerBuilder;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHByR3VhcmQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dkcHJHdWFyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwckd1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9HZHByR3VhcmRHcm91cC50cyIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL0dkcHJTdG9yYWdlLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3JvdXBCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3VhcmRCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByTWFuYWdlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL2J1aWxkZXJzL2J1aWxkZXJzLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9nZHByX2d1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFD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Q0FBQztJQUM5RCxDQUFDO0lBRUQsa0NBQUssR0FBTDtRQUNJLE9BQU8seUJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxxQ0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQztBQUdHLGdEQUFrQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkN0Qiw4RkFBa0M7QUFDbEMsa0dBQW9DO0FBQ3BDLDhGQUFrQzs7Ozs7Ozs7Ozs7Ozs7O0FDRmxDLCtFQUF1QztBQXdCbkMsb0JBeEJLLHFCQUFTLENBd0JMO0FBdkJiLDhGQUFpRDtBQXdCN0MseUJBeEJLLCtCQUFjLENBd0JMO0FBdkJsQixxRkFBMkM7QUF3QnZDLHNCQXhCSyx5QkFBVyxDQXdCTDtBQXZCZixxRkFBMkM7QUF3QnZDLHNCQXhCSyx5QkFBVyxDQXdCTDtBQXZCZiw4RkFBd0Q7QUF3QnBELDZCQXhCSyw2QkFBa0IsQ0F3QkwiLCJmaWxlIjoiZ2Rwcl9ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZ2Rwckd1YXJkXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdkcHJHdWFyZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJnZHByR3VhcmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dkcHJfZ3VhcmQudHNcIik7XG4iLCJpbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcclxuXHJcbmludGVyZmFjZSBHZHByR3VhcmR7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG4gICAgcmVxdWlyZWQ6IGJvb2xlYW4sXHJcblxyXG4gICAgaXNFbmFibGVkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4sXHJcblxyXG4gICAgZW5hYmxlKCk6IEdkcHJHdWFyZCxcclxuICAgIGRpc2FibGUoKTogR2Rwckd1YXJkLFxyXG4gICAgdG9nZ2xlKCk6IEdkcHJHdWFyZCxcclxuICAgIG1ha2VSZXF1aXJlZCgpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuICAgIHJhdygpOiBvYmplY3QsXHJcbn1cclxuXHJcbmludGVyZmFjZSBHZHByR3VhcmRSYXd7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgcmVxdWlyZWQ6IGJvb2xlYW4sXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuQ29va2llLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlLCBlbmFibGVkOiBib29sZWFufG51bGwgPSBudWxsKTogR2Rwckd1YXJke1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHN0b3JhZ2UsXHJcbiAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgZW5hYmxlZDogZW5hYmxlZCA9PT0gbnVsbCA/IHJlcXVpcmVkIDogZW5hYmxlZCxcclxuICAgICAgICBlbmFibGUoKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGUoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlKCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYWtlUmVxdWlyZWQoKXtcclxuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNFbmFibGVkKG5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBuYW1lICYmIHRoaXMuZW5hYmxlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvclN0b3JhZ2UodHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0b3JhZ2UgPT0gdHlwZSAmJiAhdGhpcy5yZXF1aXJlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmF3KCk6IEdkcHJHdWFyZFJhd3tcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmQsXHJcbiAgICBHZHByR3VhcmRSYXcsXHJcbiAgICBtYWtlR3VhcmQsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3VhcmQsIEdkcHJHdWFyZFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRDb2xsZWN0aW9uIH0gZnJvbSBcIi4vR2Rwckd1YXJkQ29sbGVjdGlvblwiXHJcblxyXG5pbnRlcmZhY2UgR2Rwckd1YXJkR3JvdXBSYXcgZXh0ZW5kcyBHZHByR3VhcmRSYXd7XHJcbiAgICBndWFyZHM6IEdkcHJHdWFyZFJhd1tdLFxyXG59XHJcblxyXG5jbGFzcyBHZHByR3VhcmRHcm91cCBpbXBsZW1lbnRzIEdkcHJHdWFyZENvbGxlY3Rpb24ge1xyXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBHZHByR3VhcmQ+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2UsIHB1YmxpYyByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICBpZih0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmb3IobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByR3VhcmRHcm91cChuYW1lLCBkZXNjcmlwdGlvbiwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEd1YXJkKGd1YXJkOiBHZHByR3VhcmQpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzLnNldChndWFyZC5uYW1lLCBndWFyZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgaGFzR3VhcmQobmFtZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5iaW5kaW5ncy5oYXMobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3VhcmQobmFtZTogc3RyaW5nKTogR2Rwckd1YXJkIHwgbnVsbHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iaW5kaW5ncy5nZXQobmFtZSkgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZG9Gb3JFYWNoR3VhcmQoY2I6IChndWFyZDogR2Rwckd1YXJkKSA9PiBhbnkpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzLmZvckVhY2goZ3VhcmQgPT4gY2IoZ3VhcmQpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpc0VuYWJsZWQobmFtZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICBpZih0aGlzLmhhc0d1YXJkKG5hbWUpKXtcclxuICAgICAgICAgICAgY29uc3QgZ3VhcmQgPSB0aGlzLmdldEd1YXJkKG5hbWUpO1xyXG4gICAgICAgICAgICBpZihndWFyZCAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxHZHByR3VhcmQ+Z3VhcmQpLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihjb25zdCBbXywgZ3VhcmRdIG9mIHRoaXMuYmluZGluZ3Mpe1xyXG4gICAgICAgICAgICBpZihndWFyZC5pc0VuYWJsZWQobmFtZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGUoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4gZ3VhcmQuZW5hYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4gZ3VhcmQuZGlzYWJsZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZCA/IHRoaXMuZGlzYWJsZSgpIDogdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5tYWtlUmVxdWlyZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IHtcclxuICAgICAgICAgICAgaWYoZ3VhcmQuc3RvcmFnZSAmIHR5cGUpXHJcbiAgICAgICAgICAgICAgICBndWFyZC5lbmFibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IHtcclxuICAgICAgICAgICAgaWYoZ3VhcmQuc3RvcmFnZSAmIHR5cGUpXHJcbiAgICAgICAgICAgICAgICBndWFyZC5kaXNhYmxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IHtcclxuICAgICAgICAgICAgaWYoZ3VhcmQuc3RvcmFnZSAmIHR5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3VhcmQudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmF3KCk6IEdkcHJHdWFyZEdyb3VwUmF3e1xyXG4gICAgICAgIGNvbnN0IHJldDogR2Rwckd1YXJkR3JvdXBSYXcgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlZCxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRoaXMucmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHN0b3JhZ2U6IHRoaXMuc3RvcmFnZSxcclxuICAgICAgICAgICAgZ3VhcmRzOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXQuZ3VhcmRzID0gWy4uLnRoaXMuYmluZGluZ3NdLm1hcCgoW18sIGd1YXJkXSkgPT4gZ3VhcmQucmF3KCkgYXMgR2Rwckd1YXJkUmF3KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHdWFyZEdyb3VwLFxyXG4gICAgR2Rwckd1YXJkR3JvdXBSYXcsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3VhcmQsIEdkcHJHdWFyZFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwLCBHZHByR3VhcmRHcm91cFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZEdyb3VwXCI7XHJcbmltcG9ydCB7IEdkcHJHdWFyZENvbGxlY3Rpb24gfSBmcm9tIFwiLi9HZHByR3VhcmRDb2xsZWN0aW9uXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi9HZHByU3RvcmFnZVwiO1xyXG5cclxuaW50ZXJmYWNlIEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbixcclxuICAgIGdyb3VwczogR2Rwckd1YXJkR3JvdXBSYXdbXSxcclxufVxyXG5cclxuXHJcbmNsYXNzIEdkcHJNYW5hZ2VyIGltcGxlbWVudHMgR2Rwckd1YXJkQ29sbGVjdGlvbntcclxuICAgIHByb3RlY3RlZCBncm91cHM6IE1hcDxzdHJpbmcsIEdkcHJHdWFyZEdyb3VwPiA9IG5ldyBNYXAoKTtcclxuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZyA9IFwibWFuYWdlclwiO1xyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiTWFuYWdlciBvZiBHRFBSIGd1YXJkIGdyb3Vwc1wiO1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICByZWFkb25seSBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLk5vbmU7XHJcbiAgICByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdyb3VwczogR2Rwckd1YXJkR3JvdXBbXSA9IFtdKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBHZHByTWFuYWdlcigpO1xyXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IG1hbmFnZXIuYWRkR3JvdXAoZ3JvdXApKTtcclxuICAgICAgICByZXR1cm4gbWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHcm91cChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkR3JvdXAoR2Rwckd1YXJkR3JvdXAuZm9yKG5hbWUsIGRlc2NyaXB0aW9uKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEdyb3VwKGNhdGVnb3J5OiBHZHByR3VhcmRHcm91cCk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHRoaXMuZ3JvdXBzLnNldChjYXRlZ29yeS5uYW1lLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZHVjZUdyb3Vwc1ByZWQocHJlZDogKGdyb3VwOiBHZHByR3VhcmRDb2xsZWN0aW9uKSA9PiBib29sZWFuKTogYm9vbGVhbntcclxuICAgICAgICBmb3IoY29uc3QgW18sIGdyb3VwXSBvZiB0aGlzLmdyb3Vwcyl7XHJcbiAgICAgICAgICAgIGlmKHByZWQoZ3JvdXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZm9yRWFjaEdyb3VwKGNiOiAoZ3JvdXA6IEdkcHJHdWFyZENvbGxlY3Rpb24pID0+IGFueSk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gY2IoZ3JvdXApKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLmhhc0d1YXJkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWFyZChuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmQgfCBudWxsIHtcclxuICAgICAgICBmb3IoY29uc3QgW18sIGdyb3VwXSBvZiB0aGlzLmdyb3Vwcyl7XHJcbiAgICAgICAgICAgIGlmKGdyb3VwLmhhc0d1YXJkKG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmdldEd1YXJkKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNHcm91cChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEdyb3VwIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtuLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihuID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc0VuYWJsZWQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlR3JvdXBzUHJlZChncm91cCA9PiBncm91cC5pc0VuYWJsZWQobmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAuZW5hYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZCA/IHRoaXMuZGlzYWJsZSgpIDogdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgLy8gbm9vcFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IGdyb3VwLmVuYWJsZUZvclN0b3JhZ2UodHlwZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmF3KCk6IEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgICAgIGNvbnN0IHJldDogR2Rwck1hbmFnZXJSYXcgPSB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlZCxcclxuICAgICAgICAgICAgZ3JvdXBzOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXQuZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBzXS5tYXAoKFtfLCBncm91cF0pID0+IGdyb3VwLnJhdygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJNYW5hZ2VyLFxyXG4gICAgR2Rwck1hbmFnZXJSYXcsXHJcbn0iLCJlbnVtIEdkcHJTdG9yYWdle1xyXG4gICAgTm9uZSA9IDBiMSxcclxuICAgIENvb2tpZSA9IDBiMTAsXHJcbiAgICBMb2NhbFN0b3JhZ2UgPSAwYjEwMCxcclxuICAgIFNlc3Npb25TdG9yYWdlID0gMGIxMDAwLFxyXG4gICAgSW5kZXhlZERiID0gMGIxMDAwMCxcclxuICAgIEZpbGVTeXN0ZW0gPSAwYjEwMDAwLFxyXG4gICAgU2VydmVyU3RvcmFnZSA9IDBiMTAwMDAsXHJcbiAgICBBbGwgPSBDb29raWUgfCBMb2NhbFN0b3JhZ2UgfCBTZXNzaW9uU3RvcmFnZSB8IEluZGV4ZWREYiB8IEZpbGVTeXN0ZW0gfCBTZXJ2ZXJTdG9yYWdlLFxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2RwclN0b3JhZ2UsXHJcbn0iLCJpbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyQnVpbGRlciB9IGZyb20gXCIuL0dkcHJNYW5hZ2VyQnVpbGRlclwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCB9IGZyb20gXCIuLi9HZHByR3VhcmRHcm91cFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEJ1aWxkZXIgfSBmcm9tIFwiLi9HZHByR3VhcmRCdWlsZGVyXCJcclxuXHJcbmNsYXNzIEdkcHJHcm91cEJ1aWxkZXIgZXh0ZW5kcyBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICBwdWJsaWMgZ3VhcmRzOiBHZHByR3VhcmRbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcGFyZW50OiBHZHByTWFuYWdlckJ1aWxkZXIgLFxyXG4gICAgICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcHJvdGVjdGVkIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuYWJsZTogYm9vbGVhbixcclxuICAgICAgICBwcm90ZWN0ZWQgcmVxdWlyZTogYm9vbGVhbixcclxuICAgICl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIGlmKHJlcXVpcmUpXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydEdyb3VwKHN0b3JhZ2UgfHwgdGhpcy5wYXJlbnQuc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFJlcXVpcmVkR3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uKS5yZXF1aXJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG1iOiBHZHByTWFuYWdlckJ1aWxkZXIsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSwgcmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHcm91cEJ1aWxkZXIobWIsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlIHx8IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmRHcm91cCgpOiBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlID0gdGhpcy5yZXF1aXJlIHx8IHRoaXMuZW5hYmxlO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gR2Rwckd1YXJkR3JvdXAuZm9yKHRoaXMubmFtZSwgdGhpcy5kZXNjcmlwdGlvbiwgZW5hYmxlLCB0aGlzLnJlcXVpcmUpO1xyXG4gICAgICAgIGNvbnN0IGd1YXJkcyA9IFsuLi50aGlzLmd1YXJkcywgLi4udGhpcy5ncm91cHNdO1xyXG4gICAgICAgIGd1YXJkcy5mb3JFYWNoKGd1YXJkID0+IGdyb3VwLmFkZEd1YXJkKGd1YXJkKSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVxdWlyZSlcclxuICAgICAgICAgICAgZ3JvdXAubWFrZVJlcXVpcmVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50Lmdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVkaXQoY2I6IChidWlsZGVyOiBHZHByR3JvdXBCdWlsZGVyKSA9PiBhbnkpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNiKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoTmFtZShuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLm5hbWUgPSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9yZWRJbihzdG9yYWdlOiBHZHByU3RvcmFnZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuc3RvcmFnZSA9IHN0b3JhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1aXJlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLnJlcXVpcmUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRHdWFyZChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHdWFyZEJ1aWxkZXIuY3JlYXRlKHRoaXMsIHN0b3JhZ2UgfHwgdGhpcy5zdG9yYWdlLCB0aGlzLmVuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0UmVxdWlyZWRHdWFyZChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEd1YXJkKHN0b3JhZ2UpLnJlcXVpcmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpdGhFbmFibGVkR3VhcmQobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSlcclxuICAgICAgICAgICAgLndpdGhOYW1lKG5hbWUpXHJcbiAgICAgICAgICAgIC53aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgIC5lbmFibGVkKClcclxuICAgICAgICAuZW5kR3VhcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aERpc2FibGVkR3VhcmQobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSlcclxuICAgICAgICAgICAgLndpdGhOYW1lKG5hbWUpXHJcbiAgICAgICAgICAgIC53aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgIC5kaXNhYmxlZCgpXHJcbiAgICAgICAgLmVuZEd1YXJkKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3JvdXBCdWlsZGVyLFxyXG59IiwiaW1wb3J0IHsgR2Rwckdyb3VwQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXJzXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBtYWtlR3VhcmQgfSBmcm9tIFwiLi4vR2Rwckd1YXJkXCI7XHJcblxyXG5jbGFzcyBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcm90ZWN0ZWQgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEdkcHJHcm91cEJ1aWxkZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG4gICAgICAgIHByb3RlY3RlZCBlbmFibGU6IGJvb2xlYW4sXHJcbiAgICAgICAgcHJvdGVjdGVkIHJlcXVpcmU6IGJvb2xlYW4sXHJcbiAgICApe1xyXG4gICAgICAgIGlmKHJlcXVpcmUpXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY3JlYXRlKGdiOiBHZHByR3JvdXBCdWlsZGVyLCBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHdWFyZEJ1aWxkZXIoZ2IsIHN0b3JhZ2UsIGVuYWJsZWQsIHJlcXVpcmVkKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmRHdWFyZCgpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNvbnN0IGVuYWJsZSA9IHRoaXMucmVxdWlyZSB8fCB0aGlzLmVuYWJsZTtcclxuICAgICAgICBjb25zdCBndWFyZCA9IG1ha2VHdWFyZCh0aGlzLm5hbWUsIHRoaXMuZGVzY3JpcHRpb24sIHRoaXMuc3RvcmFnZSwgdGhpcy5yZXF1aXJlLCBlbmFibGUpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnJlcXVpcmUpXHJcbiAgICAgICAgICAgIGd1YXJkLm1ha2VSZXF1aXJlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudC5ndWFyZHMucHVzaChndWFyZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBlZGl0KGVkaXQ6IChidWlsZGVyOiBHZHByR3VhcmRCdWlsZGVyKSA9PiBhbnkpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIGVkaXQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aE5hbWUobmFtZTogc3RyaW5nKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5uYW1lID0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgd2l0aERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlZCgpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmVuYWJsZSA9IGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9yZWRJbihzdG9yYWdlOiBHZHByU3RvcmFnZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuc3RvcmFnZSA9IHN0b3JhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVpcmVkKCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIucmVxdWlyZSA9IHRydWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwckd1YXJkQnVpbGRlcixcclxufSIsImltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByTWFuYWdlciB9IGZyb20gXCIuLi9HZHByTWFuYWdlclwiXHJcbmltcG9ydCB7IEdkcHJHcm91cEJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVyc1wiXHJcblxyXG5jbGFzcyBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICBwdWJsaWMgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Db29raWU7XHJcbiAgICBwdWJsaWMgZ3JvdXBzOiBHZHByR3VhcmRHcm91cFtdID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBtYWtlKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByTWFuYWdlckJ1aWxkZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgZW5hYmxlZDogYm9vbGVhbiA9IHRydWUpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiBHZHByR3JvdXBCdWlsZGVyLmNyZWF0ZSh0aGlzLCBuYW1lLCBkZXNjcmlwdGlvbiwgc3RvcmFnZSwgZW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRSZXF1aXJlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHJ1ZSkuZW5hYmxlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RW5hYmxlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIik6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnREaXNhYmxlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIik6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkKCk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHJldHVybiBHZHByTWFuYWdlci5jcmVhdGUodGhpcy5ncm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuZEdyb3VwKCk6IEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJNYW5hZ2VyQnVpbGRlcixcclxufSIsImV4cG9ydCAqIGZyb20gXCIuL0dkcHJHdWFyZEJ1aWxkZXJcIlxyXG5leHBvcnQgKiBmcm9tIFwiLi9HZHByTWFuYWdlckJ1aWxkZXJcIlxyXG5leHBvcnQgKiBmcm9tIFwiLi9HZHByR3JvdXBCdWlsZGVyXCIiLCJpbXBvcnQgeyBtYWtlR3VhcmQgfSBmcm9tIFwiLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCB9IGZyb20gXCIuL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2Rwck1hbmFnZXIgfSBmcm9tIFwiLi9HZHByTWFuYWdlclwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByTWFuYWdlckJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVycy9idWlsZGVyc1wiXHJcblxyXG4vKlxyXG5cclxuY29uc3QgJGdkcHI6IEdkcHJNYW5hZ2VyID0gR2Rwck1hbmFnZXJCdWlsZGVyLm1ha2UoKVxyXG4uc3RhcnRHcm91cChHZHByU3RvcmFnZS5Db29raWUsIFwidHJhY2tpbmdcIilcclxuICAgIC53aXRoRW5hYmxlZEd1YXJkKFwiR29vZ2xlIFRhZ3MgQW5hbHl0aWNzXCIpIC8vY29va2llXHJcbiAgICAud2l0aEVuYWJsZWRHdWFyZChcIkNvbXBhbnktd2lkZSBUcmFja2luZ1wiLCBcIkhvbWVicmV3ZWQgdHJhY2tpbmcgc3lzdGVtXCIpIC8vY29va2llXHJcbi5lbmRHcm91cCgpXHJcbi5zdGFydEdyb3VwKEdkcHJTdG9yYWdlLkxvY2FsU3RvcmFnZSwgXCJzdHlsZXNcIikgLy9sc1xyXG4gICAgLnN0YXJ0R3JvdXAoKS53aXRoTmFtZShcInRoZW1lc1wiKSAvL2xzXHJcbiAgICAgICAgLndpdGhFbmFibGVkR3VhcmQoXCJjb2xvcnNcIiwgXCJVc2VyIGJhc2VkIGNvbG9yIHNjaGVtZVwiKSAvL2xzXHJcbiAgICAgICAgLndpdGhFbmFibGVkR3VhcmQoXCJcIikgLy9sc1xyXG4gICAgLmVuZEdyb3VwKClcclxuLmVuZEdyb3VwKClcclxuLmJ1aWxkKCk7XHJcblxyXG4qL1xyXG5cclxuZXhwb3J0IHtcclxuICAgIG1ha2VHdWFyZCxcclxuICAgIEdkcHJHdWFyZEdyb3VwLFxyXG4gICAgR2Rwck1hbmFnZXIsXHJcbiAgICBHZHByU3RvcmFnZSxcclxuICAgIEdkcHJNYW5hZ2VyQnVpbGRlcixcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9