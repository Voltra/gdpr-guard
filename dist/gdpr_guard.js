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
        return this.name === name || this.bindings.has(name);
    };
    GdprGuardGroup.prototype.getGuard = function (name) {
        if (this.name === name)
            return this;
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
        if (!!require)
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
        if (required === void 0) { required = false; }
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
        return builders_1.GdprGroupBuilder.create(this, name, description, storage, enabled, false);
    };
    GdprManagerBuilder.prototype.startRequiredGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startEnabledGroup(storage, name, description).required();
    };
    GdprManagerBuilder.prototype.startEnabledGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description, true).enabled();
    };
    GdprManagerBuilder.prototype.startDisabledGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return this.startGroup(storage, name, description, false).disabled();
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
var GdprDeserializer_1 = __webpack_require__(/*! ./serde/GdprDeserializer */ "./src/serde/GdprDeserializer.ts");
exports.GdprDeserializer = GdprDeserializer_1.GdprDeserializer;


/***/ }),

/***/ "./src/serde/GdprDeserializer.ts":
/*!***************************************!*\
  !*** ./src/serde/GdprDeserializer.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GdprManager_1 = __webpack_require__(/*! ../GdprManager */ "./src/GdprManager.ts");
var GdprStorage_1 = __webpack_require__(/*! ../GdprStorage */ "./src/GdprStorage.ts");
var GdprGuardGroup_1 = __webpack_require__(/*! ../GdprGuardGroup */ "./src/GdprGuardGroup.ts");
var GdprGuard_1 = __webpack_require__(/*! ../GdprGuard */ "./src/GdprGuard.ts");
var GdprDeserializer = (function () {
    function GdprDeserializer() {
    }
    GdprDeserializer.manager = function (raw) {
        var _this = this;
        var allKeys = ["enabled", "groups"].every(function (key) { return key in raw; });
        var validateFields = allKeys
            && typeof raw.enabled == "boolean"
            && Array.isArray(raw.groups);
        if (!validateFields)
            return null;
        var groups = raw.groups
            .map(function (group) { return _this.group(group); })
            .filter(function (group) { return group !== null; });
        var manager = GdprManager_1.GdprManager.create([]);
        manager.enabled = !!raw.enabled;
        if (!groups.length)
            return null;
        groups.forEach(function (group) { return manager.addGroup(group); });
        return manager;
    };
    GdprDeserializer.group = function (raw) {
        var _this = this;
        var guard = this.guard(raw);
        if (guard === null)
            return null;
        var keys = [
            "guards",
        ];
        var allKeys = keys.every(function (key) { return key in raw; });
        var validateFields = allKeys
            && Array.isArray(raw.guards);
        if (!validateFields)
            return null;
        var group = GdprGuardGroup_1.GdprGuardGroup.for(guard.name, guard.description, guard.enabled, guard.required);
        var guards = raw.guards
            .map(function (guard) { return keys.every(function (key) { return key in guard; }) ? _this.group(guard) : _this.guard(guard); })
            .filter(function (guard) { return guard !== null; });
        if (!guards.length)
            return null;
        guards.forEach(function (guard) { return group.addGuard(guard); });
        return group;
    };
    GdprDeserializer.guard = function (raw) {
        var allKeys = [
            "name",
            "enabled",
            "required",
            "description",
            "storage"
        ].every(function (key) { return key in raw; });
        var validateFields = allKeys
            && typeof raw.name == "string"
            && typeof raw.enabled == "boolean"
            && typeof raw.required == "boolean"
            && typeof raw.description == "string"
            && typeof raw.storage == "number"
            && raw.storage in GdprStorage_1.GdprStorage;
        return !validateFields ? null : GdprGuard_1.makeGuard(raw.name, raw.description, raw.storage, !!raw.required, !!raw.enabled);
    };
    return GdprDeserializer;
}());
exports.GdprDeserializer = GdprDeserializer;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHByR3VhcmQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dkcHJHdWFyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwckd1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9HZHByR3VhcmRHcm91cC50cyIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL0dkcHJTdG9yYWdlLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3JvdXBCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3VhcmRCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByTWFuYWdlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL2J1aWxkZXJzL2J1aWxkZXJzLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9nZHByX2d1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9zZXJkZS9HZHByRGVzZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RB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USxJQUFJLFNBQVM7ZUFDaEMsT0FBTyxHQUFHLENBQUMsV0FBVyxJQUFJLFFBQVE7ZUFDbEMsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLFFBQVE7ZUFDOUIsR0FBRyxDQUFDLE9BQU8sSUFBSyx5QkFBVyxDQUFDO1FBRy9CLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMscUJBQVMsQ0FDckMsR0FBRyxDQUFDLElBQUksRUFDUixHQUFHLENBQUMsV0FBVyxFQUNmLEdBQUcsQ0FBQyxPQUFzQixFQUMxQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDZCxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDaEIsQ0FBQztJQUNOLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUM7QUFHRyw0Q0FBZ0IiLCJmaWxlIjoiZ2Rwcl9ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZ2Rwckd1YXJkXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdkcHJHdWFyZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJnZHByR3VhcmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dkcHJfZ3VhcmQudHNcIik7XG4iLCJpbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcclxuXHJcblxyXG4vKipcclxuICogR2VuZXJpYyB0eXBlIHJlcHJlc2VudGluZyBhIGd1YXJkXHJcbiAqIEBpbnRlcmZhY2UgR2Rwckd1YXJkXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmludGVyZmFjZSBHZHByR3VhcmR7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG4gICAgcmVxdWlyZWQ6IGJvb2xlYW4sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgYSBndWFyZCBpcyBlbmFibGVkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3VhcmQgdG8gbG9vayBmb3JcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICBpc0VuYWJsZWQobmFtZTogc3RyaW5nKTogYm9vbGVhbixcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuYWJsZSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkfSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZSgpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNhYmxlIHRoaXMgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmR9IHRoaXMgZ3VhcmRcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRcclxuICAgICAqL1xyXG4gICAgZGlzYWJsZSgpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhpcyBndWFyZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZH0gdGhpcyBndWFyZFxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICB0b2dnbGUoKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFrZSB0aGlzIGd1YXJkIHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkfSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIG1ha2VSZXF1aXJlZCgpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGUgZ3VhcmRzIG9mIHRoZSBnaXZlbiB0eXBlICh0aGlzIGd1YXJkIGFuZCBzdWItZ3VhcmRzKVxyXG4gICAgICogQHBhcmFtIHtHZHByU3RvcmFnZX0gdHlwZSBUaGUgc3RvcmFnZSB0eXBlIHRvIGVuYWJsZSBhbGwgZ3VhcmRzIGZvclxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZH0gdGhpcyBndWFyZFxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICBlbmFibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSBndWFyZHMgb2YgdGhlIGdpdmVuIHR5cGUgKHRoaXMgZ3VhcmQgYW5kIHN1Yi1ndWFyZHMpXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSB0eXBlIFRoZSBzdG9yYWdlIHR5cGUgdG8gZW5hYmxlIGFsbCBndWFyZHMgZm9yXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkfSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIGd1YXJkcyBvZiB0aGUgZ2l2ZW4gdHlwZSAodGhpcyBndWFyZCBhbmQgc3ViLWd1YXJkcylcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHR5cGUgVGhlIHN0b3JhZ2UgdHlwZSB0byBlbmFibGUgYWxsIGd1YXJkcyBmb3JcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmR9IHRoaXMgZ3VhcmRcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRcclxuICAgICAqL1xyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJhdy9zaW1wbGUgcmVwcmVzZW50YXRpb24gb2YgdGhpcyBndWFyZFxyXG4gICAgICogQHJldHVybnMge29iamVjdHxHZHByR3VhcmRSYXd9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIHJhdygpOiBvYmplY3R8R2Rwckd1YXJkUmF3LFxyXG59XHJcblxyXG4vKipcclxuICogUmF3IHJlcHJlc2VudGF0aW9uIG9mIGEgZ3VhcmRcclxuICogQGludGVyZmFjZSBHZHByR3VhcmRSYXdcclxuICogQGV4cG9ydFxyXG4gKi9cclxuaW50ZXJmYWNlIEdkcHJHdWFyZFJhd3tcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICByZXF1aXJlZDogYm9vbGVhbixcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxufVxyXG5cclxuLyoqXHJcbiAqIEZhY3RvcnkgZm9yIGNyZWF0aW5nIGEgZ3VhcmRcclxuICogQHBhcmFtIG5hbWUgVGhlIHVuaXF1ZSBuYW1lL2lkZW50aWZpZXIgZm9yIHRoaXMgZ3VhcmRcclxuICogQHBhcmFtIGRlc2NyaXB0aW9uIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3VhcmRcclxuICogQHBhcmFtIHN0b3JhZ2UgV2hlcmUgdGhlIGRhdGEgd2lsbCBiZSBzdG9yZWRcclxuICogQHBhcmFtIHJlcXVpcmVkIFdoZXRoZXIgb3Igbm90IGl0IGlzIGEgcmVxdWlyZWQgZ3VhcmRcclxuICogQHBhcmFtIGVuYWJsZWQgV2hldGhlciBvciBub3QgaXQgaXMgY3VycmVudGx5IGVuYWJsZWRcclxuICogQHJldHVybnMge0dkcHJHdWFyZH1cclxuICogQGV4cG9ydFxyXG4gKi9cclxuZnVuY3Rpb24gbWFrZUd1YXJkKG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Db29raWUsIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2UsIGVuYWJsZWQ6IGJvb2xlYW58bnVsbCA9IG51bGwpOiBHZHByR3VhcmR7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgc3RvcmFnZSxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBlbmFibGVkOiBlbmFibGVkID09PSBudWxsID8gcmVxdWlyZWQgOiBlbmFibGVkLFxyXG4gICAgICAgIGVuYWJsZSgpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZSgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGUoKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMucmVxdWlyZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ha2VSZXF1aXJlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0VuYWJsZWQobmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IG5hbWUgJiYgdGhpcy5lbmFibGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlRm9yU3RvcmFnZSh0eXBlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVGb3JTdG9yYWdlKHR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RvcmFnZSA9PSB0eXBlICYmICF0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByYXcoKTogR2Rwckd1YXJkUmF3e1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmQsXHJcbiAgICBHZHByR3VhcmRSYXcsXHJcbiAgICBtYWtlR3VhcmQsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3VhcmQsIEdkcHJHdWFyZFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRDb2xsZWN0aW9uIH0gZnJvbSBcIi4vR2Rwckd1YXJkQ29sbGVjdGlvblwiXHJcblxyXG4vKipcclxuICogUmF3IHJlcHJlc2VudGF0aW9uIG9mIGEgZ3VhcmQgZ3JvdXBcclxuICogQGludGVyZmFjZSBHZHByR3VhcmRHcm91cFJhd1xyXG4gKiBAZXh0ZW5kcyB7R2Rwckd1YXJkUmF3fVxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5pbnRlcmZhY2UgR2Rwckd1YXJkR3JvdXBSYXcgZXh0ZW5kcyBHZHByR3VhcmRSYXd7XHJcbiAgICBndWFyZHM6IEdkcHJHdWFyZFJhd1tdLFxyXG59XHJcblxyXG4vKipcclxuICogQSBncm91cCBvZiBndWFyZHNcclxuICogQGNsYXNzIEdkcHJHdWFyZEdyb3VwXHJcbiAqIEBpbXBsZW1lbnRzIHtHZHByR3VhcmRDb2xsZWN0aW9ufVxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5jbGFzcyBHZHByR3VhcmRHcm91cCBpbXBsZW1lbnRzIEdkcHJHdWFyZENvbGxlY3Rpb24ge1xyXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBHZHByR3VhcmQ+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgR2Rwckd1YXJkR3JvdXAuXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlZD1mYWxzZV1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVpcmVkPWZhbHNlXVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcHVibGljIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmKHRoaXMucmVxdWlyZWQpXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWN0b3J5IGZvciBjcmVhdGluZyBhIGdyb3VwZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRoZSBncm91cCBpcyBlbmFibGVkIGJ5IGRlZmF1bHRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVpcmVkPWZhbHNlXSBXaGV0aGVyIG9yIG5vdCB0aGUgZW50aXJlIGdyb3VwIGlzIHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZvcihuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBlbmFibGVkOiBib29sZWFuID0gZmFsc2UsIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHdWFyZEdyb3VwKG5hbWUsIGRlc2NyaXB0aW9uLCBlbmFibGVkLCByZXF1aXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBndWFyZCB0byB0aGlzIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJHdWFyZH0gZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRHcm91cH1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICovXHJcbiAgICBhZGRHdWFyZChndWFyZDogR2Rwckd1YXJkKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5zZXQoZ3VhcmQubmFtZSwgZ3VhcmQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICovXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IG5hbWUgfHwgdGhpcy5iaW5kaW5ncy5oYXMobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIGdldEd1YXJkKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZCB8IG51bGx7XHJcbiAgICAgICAgaWYodGhpcy5uYW1lID09PSBuYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmluZGluZ3MuZ2V0KG5hbWUpIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIGEgY2FsbGJhY2sgb24gZWFjaCBndWFyZCBvZiB0aGlzIGdyb3VwXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhndWFyZDogR2Rwckd1YXJkKSA9PiBhbnl9IGNiXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRvRm9yRWFjaEd1YXJkKGNiOiAoZ3VhcmQ6IEdkcHJHdWFyZCkgPT4gYW55KTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGd1YXJkID0+IGNiKGd1YXJkKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuaGFzR3VhcmQobmFtZSkpe1xyXG4gICAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuZ2V0R3VhcmQobmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPEdkcHJHdWFyZD5ndWFyZCkuZW5hYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBndWFyZF0gb2YgdGhpcy5iaW5kaW5ncyl7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLmlzRW5hYmxlZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBlbmFibGUoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4gZ3VhcmQuZW5hYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlKCk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IGd1YXJkLmRpc2FibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIHRvZ2dsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkID8gdGhpcy5kaXNhYmxlKCkgOiB0aGlzLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5tYWtlUmVxdWlyZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLnN0b3JhZ2UgJiB0eXBlKVxyXG4gICAgICAgICAgICAgICAgZ3VhcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4ge1xyXG4gICAgICAgICAgICBpZihndWFyZC5zdG9yYWdlICYgdHlwZSlcclxuICAgICAgICAgICAgICAgIGd1YXJkLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRHcm91cH1cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IHtcclxuICAgICAgICAgICAgaWYoZ3VhcmQuc3RvcmFnZSAmIHR5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3VhcmQudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXBSYXd9XHJcbiAgICAgKi9cclxuICAgIHJhdygpOiBHZHByR3VhcmRHcm91cFJhd3tcclxuICAgICAgICBjb25zdCByZXQ6IEdkcHJHdWFyZEdyb3VwUmF3ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICBzdG9yYWdlOiB0aGlzLnN0b3JhZ2UsXHJcbiAgICAgICAgICAgIGd1YXJkczogW10sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0Lmd1YXJkcyA9IFsuLi50aGlzLmJpbmRpbmdzXS5tYXAoKFtfLCBndWFyZF0pID0+IGd1YXJkLnJhdygpIGFzIEdkcHJHdWFyZFJhdyk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmRHcm91cCxcclxuICAgIEdkcHJHdWFyZEdyb3VwUmF3LFxyXG59IiwiaW1wb3J0IHsgR2Rwckd1YXJkLCBHZHByR3VhcmRSYXcgfSBmcm9tIFwiLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCwgR2Rwckd1YXJkR3JvdXBSYXcgfSBmcm9tIFwiLi9HZHByR3VhcmRHcm91cFwiO1xyXG5pbXBvcnQgeyBHZHByR3VhcmRDb2xsZWN0aW9uIH0gZnJvbSBcIi4vR2Rwckd1YXJkQ29sbGVjdGlvblwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiBSYXcgcmVwcmVzZW50YXRpb24gb2YgYSBndWFyZCBtYW5hZ2VyXHJcbiAqIEBpbnRlcmZhY2UgR2Rwck1hbmFnZXJSYXdcclxuICogQGV4cG9ydFxyXG4gKi9cclxuaW50ZXJmYWNlIEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbixcclxuICAgIGdyb3VwczogR2Rwckd1YXJkR3JvdXBSYXdbXSxcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2UgbXVsdGlwbGUgZ3VhcmQgZ3JvdXBzXHJcbiAqIEBjbGFzcyBHZHByTWFuYWdlclxyXG4gKiBAaW1wbGVtZW50cyB7R2Rwckd1YXJkQ29sbGVjdGlvbn1cclxuICogQGV4cG9ydFxyXG4gKi9cclxuY2xhc3MgR2Rwck1hbmFnZXIgaW1wbGVtZW50cyBHZHByR3VhcmRDb2xsZWN0aW9ue1xyXG4gICAgcHJvdGVjdGVkIGdyb3VwczogTWFwPHN0cmluZywgR2Rwckd1YXJkR3JvdXA+ID0gbmV3IE1hcCgpO1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gXCJtYW5hZ2VyXCI7XHJcbiAgICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJNYW5hZ2VyIG9mIEdEUFIgZ3VhcmQgZ3JvdXBzXCI7XHJcbiAgICBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuICAgIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdkcHJNYW5hZ2VyLlxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBnZHByIG1hbmFnZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7R2Rwckd1YXJkR3JvdXBbXX0gW2dyb3Vwcz1bXV0gVGhlIGluaXRpYWwgZ3VhcmQgZ3JvdXBzXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ3JvdXBzOiBHZHByR3VhcmRHcm91cFtdID0gW10pOiBHZHByTWFuYWdlcntcclxuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IEdkcHJNYW5hZ2VyKCk7XHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gbWFuYWdlci5hZGRHcm91cChncm91cCkpO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuZCBhZGQgYSBncm91cCB0byB0aGlzIG1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuZXcgZ3JvdXAncyBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBuZXcgZ3JvdXAncyBkZXNjcmlwdGlvblxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUdyb3VwKG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByTWFuYWdlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRHcm91cChHZHByR3VhcmRHcm91cC5mb3IobmFtZSwgZGVzY3JpcHRpb24pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBncm91cCB0byB0aGlzIG1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7R2Rwckd1YXJkR3JvdXB9IGNhdGVnb3J5IFRoZSBncm91cCB0byBhZGRcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRHcm91cChjYXRlZ29yeTogR2Rwckd1YXJkR3JvdXApOiBHZHByTWFuYWdlcntcclxuICAgICAgICB0aGlzLmdyb3Vwcy5zZXQoY2F0ZWdvcnkubmFtZSwgY2F0ZWdvcnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRjaXJjdWl0IG9uIHByZWRpY2F0ZVxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsoZ3JvdXA6IEdkcHJHdWFyZENvbGxlY3Rpb24pID0+IGJvb2xlYW59IHByZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCByZWR1Y2VHcm91cHNQcmVkKHByZWQ6IChncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihwcmVkKGdyb3VwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIGEgY2FsbGJhY2sgb24gZWFjaCBncm91cCBvZiB0aGlzIGd1YXJkXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYW55fSBjYlxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBmb3JFYWNoR3JvdXAoY2I6IChncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYW55KTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChncm91cCA9PiBjYihncm91cCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLmhhc0d1YXJkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgZ2V0R3VhcmQobmFtZTogc3RyaW5nKTogR2Rwckd1YXJkIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihncm91cC5oYXNHdWFyZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBncm91cC5nZXRHdWFyZChuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGhhc0dyb3VwKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldEdyb3VwKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEdyb3VwIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtuLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihuID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgaXNFbmFibGVkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAuaXNFbmFibGVkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgZW5hYmxlKCk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5lbmFibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICB0b2dnbGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQgPyB0aGlzLmRpc2FibGUoKSA6IHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb2VzIG5vdGhpbmcgZm9yIGEgbWFuYWdlclxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgLy8gbm9vcFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICBlbmFibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5lbmFibGVGb3JTdG9yYWdlKHR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IGdyb3VwLmRpc2FibGVGb3JTdG9yYWdlKHR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJSYXd9XHJcbiAgICAgKi9cclxuICAgIHJhdygpOiBHZHByTWFuYWdlclJhd3tcclxuICAgICAgICBjb25zdCByZXQ6IEdkcHJNYW5hZ2VyUmF3ID0ge1xyXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZWQsXHJcbiAgICAgICAgICAgIGdyb3VwczogW10sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0Lmdyb3VwcyA9IFsuLi50aGlzLmdyb3Vwc10ubWFwKChbXywgZ3JvdXBdKSA9PiBncm91cC5yYXcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByTWFuYWdlcixcclxuICAgIEdkcHJNYW5hZ2VyUmF3LFxyXG59IiwiLyoqXHJcbiAqIFRoZSB0eXBlcyBvZiBzdG9yYWdlIGNvbmNlcm5lZCBieSBHRFBSXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqIEBleHBvcnRcclxuICovXHJcbmVudW0gR2RwclN0b3JhZ2V7XHJcbiAgICAvKipcclxuICAgICAqIE5vIHN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgTm9uZSA9IDBiMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvb2tpZS1iYXNlZCBzdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIENvb2tpZSA9IDBiMTAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yYWdlIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2UgPSAwYjEwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JhZ2UgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgU2Vzc2lvblN0b3JhZ2UgPSAwYjEwMDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yYWdlIGluIGluZGV4ZWREYlxyXG4gICAgICovXHJcbiAgICBJbmRleGVkRGIgPSAwYjEwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmFnZSBvbiBjbGllbnQtc2lkZSBmaWxlc3lzdGVtXHJcbiAgICAgKi9cclxuICAgIEZpbGVTeXN0ZW0gPSAwYjEwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmFnZSBvbiBzZXJ2ZXIgKHNlc3Npb24sIERCLCBjbG91ZCwgZXRjLi4uKVxyXG4gICAgICovXHJcbiAgICBTZXJ2ZXJTdG9yYWdlID0gMGIxMDAwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCBzdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIEFsbCA9IENvb2tpZSB8IExvY2FsU3RvcmFnZSB8IFNlc3Npb25TdG9yYWdlIHwgSW5kZXhlZERiIHwgRmlsZVN5c3RlbSB8IFNlcnZlclN0b3JhZ2UsXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByU3RvcmFnZSxcclxufSIsImltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4uL0dkcHJTdG9yYWdlXCJcclxuaW1wb3J0IHsgR2Rwck1hbmFnZXJCdWlsZGVyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkIH0gZnJvbSBcIi4uL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkQnVpbGRlciB9IGZyb20gXCIuL0dkcHJHdWFyZEJ1aWxkZXJcIlxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkZXIgZm9yIGEgZ2RwciBncm91cFxyXG4gKiBAY2xhc3MgR2Rwckdyb3VwQnVpbGRlclxyXG4gKiBAZXh0ZW5kcyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5jbGFzcyBHZHByR3JvdXBCdWlsZGVyIGV4dGVuZHMgR2Rwck1hbmFnZXJCdWlsZGVye1xyXG4gICAgcHVibGljIGd1YXJkczogR2Rwckd1YXJkW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEdkcHJNYW5hZ2VyQnVpbGRlciAsXHJcbiAgICAgICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyxcclxuICAgICAgICBwcm90ZWN0ZWQgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgICAgICBwcm90ZWN0ZWQgZW5hYmxlOiBib29sZWFuLFxyXG4gICAgICAgIHByb3RlY3RlZCByZXF1aXJlOiBib29sZWFuLFxyXG4gICAgKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgaWYoISFyZXF1aXJlKVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0R3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gc3VwZXIuc3RhcnRHcm91cChzdG9yYWdlIHx8IHRoaXMucGFyZW50LnN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRSZXF1aXJlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIik6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbikucmVxdWlyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZhY3RvcnkgZm9yIGEgZ3JvdXAgYnVpbGRlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtHZHByTWFuYWdlckJ1aWxkZXJ9IG1iIFRoZSBwYXJlbnQgbWFuYWdlciBidWlsZGVyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlZD10cnVlXSBXaGV0aGVyIG9yIG5vdCB0aGUgZ3JvdXAgc2hvdWxkIGJlIGVuYWJsZWRcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3JlcXVpcmVkPXRydWVdIFdoZXRoZXIgb3Igbm90IHRoZSBncm91cCBzaG91bGQgYmUgcmVxdWlyZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUobWI6IEdkcHJNYW5hZ2VyQnVpbGRlciwgbmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHcm91cEJ1aWxkZXIobWIsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlIHx8IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIHRoZSBncm91cCB1c2luZyB0aGUgY3VycmVudCBidWlsZGVyIHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuZEdyb3VwKCk6IEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgICAgICBjb25zdCBlbmFibGUgPSB0aGlzLnJlcXVpcmUgfHwgdGhpcy5lbmFibGU7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBHZHByR3VhcmRHcm91cC5mb3IodGhpcy5uYW1lLCB0aGlzLmRlc2NyaXB0aW9uLCBlbmFibGUsIHRoaXMucmVxdWlyZSk7XHJcbiAgICAgICAgY29uc3QgZ3VhcmRzID0gWy4uLnRoaXMuZ3VhcmRzLCAuLi50aGlzLmdyb3Vwc107XHJcbiAgICAgICAgZ3VhcmRzLmZvckVhY2goZ3VhcmQgPT4gZ3JvdXAuYWRkR3VhcmQoZ3VhcmQpKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yZXF1aXJlKVxyXG4gICAgICAgICAgICBncm91cC5tYWtlUmVxdWlyZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJlbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIGJ1aWxkZXIgc3RhdGVcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7KGJ1aWxkZXI6IEdkcHJHcm91cEJ1aWxkZXIpID0+IGFueX0gY2JcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGVkaXQoY2I6IChidWlsZGVyOiBHZHByR3JvdXBCdWlsZGVyKSA9PiBhbnkpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNiKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5ldyBuYW1lIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIubmFtZSA9IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvbiBUaGUgbmV3IGRlc2NyaXB0aW9uIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbjogc3RyaW5nKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgc3RvcmFnZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHN0b3JhZ2UgVGhlIG5ldyBzdG9yYWdlIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrIGFzIGVuYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQoKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmsgYXMgZGlzYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVkKCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyayBhcyByZXF1aXJlZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQoKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5yZXF1aXJlID0gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBhZGRpbmcgYSBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIGZvciB0aGUgZ3VhcmQgKGJ5IGRlZmF1bHQgaXQgdXNlcyB0aGUgZ3JvdXAncyBzdG9yYWdlKVxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnRHdWFyZChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHdWFyZEJ1aWxkZXIuY3JlYXRlKHRoaXMsIHN0b3JhZ2UgfHwgdGhpcy5zdG9yYWdlLCB0aGlzLmVuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBhZGRpbmcgYSByZXF1aXJlZCBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIGZvciB0aGUgZ3VhcmQgKGJ5IGRlZmF1bHQgaXQgdXNlcyB0aGUgZ3JvdXAncyBzdG9yYWdlKVxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnRSZXF1aXJlZEd1YXJkKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSkucmVxdWlyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbiBlbmFibGVkIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2l0aEVuYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmVuYWJsZWQoKVxyXG4gICAgICAgIC5lbmRHdWFyZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZGlzYWJsZWQgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0geyhHZHByU3RvcmFnZXxudWxsKX0gW3N0b3JhZ2U9bnVsbF0gVGhlIHN0b3JhZ2Ugb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3JvdXBCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3aXRoRGlzYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmRpc2FibGVkKClcclxuICAgICAgICAuZW5kR3VhcmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHcm91cEJ1aWxkZXIsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3JvdXBCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlcnNcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IG1ha2VHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIjtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZGVyIGZvciBhIGdkcHIgZ3VhcmRcclxuICogQGNsYXNzIEdkcHJHdWFyZEJ1aWxkZXJcclxuICogQGV4cG9ydFxyXG4gKi9cclxuY2xhc3MgR2Rwckd1YXJkQnVpbGRlcntcclxuICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJvdGVjdGVkIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHZHByR3VhcmRCdWlsZGVyLlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtHZHByR3JvdXBCdWlsZGVyfSBwYXJlbnRcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcGFyZW50OiBHZHByR3JvdXBCdWlsZGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgICAgICBwcm90ZWN0ZWQgZW5hYmxlOiBib29sZWFuLFxyXG4gICAgICAgIHByb3RlY3RlZCByZXF1aXJlOiBib29sZWFuLFxyXG4gICAgKXtcclxuICAgICAgICBpZihyZXF1aXJlKVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWN0b3J5IGZvciBjcmVhdGluZyBhIGd1YXJkIGJ1aWxkZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7R2Rwckdyb3VwQnVpbGRlcn0gZ2IgVGhlIHBhcmVudCBncm91cCBidWlsZGVyXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1HZHByU3RvcmFnZS5Db29raWVdIFRoZSBndWFyZCdzIHN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRoZSBndWFyZCBzaG91bGQgYmUgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZWQ9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRoZSBndWFyZCBzaG91bGQgYmUgcmVxdWlyZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShnYjogR2Rwckdyb3VwQnVpbGRlciwgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Db29raWUsIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByR3VhcmRCdWlsZGVyKGdiLCBzdG9yYWdlLCBlbmFibGVkLCByZXF1aXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmQgdGhlIGd1YXJkIGNyZWF0aW9uIHdpdGggdGhlIGN1cnJlbnQgYnVpbGRlciBzdGF0ZVxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBlbmRHdWFyZCgpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNvbnN0IGVuYWJsZSA9IHRoaXMucmVxdWlyZSB8fCB0aGlzLmVuYWJsZTtcclxuICAgICAgICBjb25zdCBndWFyZCA9IG1ha2VHdWFyZCh0aGlzLm5hbWUsIHRoaXMuZGVzY3JpcHRpb24sIHRoaXMuc3RvcmFnZSwgdGhpcy5yZXF1aXJlLCBlbmFibGUpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnJlcXVpcmUpXHJcbiAgICAgICAgICAgIGd1YXJkLm1ha2VSZXF1aXJlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudC5ndWFyZHMucHVzaChndWFyZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgYnVpbGRlcidzIHN0YXRlXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhidWlsZGVyOiBHZHByR3VhcmRCdWlsZGVyKSA9PiBhbnl9IGVkaXRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGVkaXQoZWRpdDogKGJ1aWxkZXI6IEdkcHJHdWFyZEJ1aWxkZXIpID0+IGFueSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgZWRpdCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbmFtZSBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuZXcgbmFtZSBmb3IgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIubmFtZSA9IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvbiBUaGUgbmV3IGRlc2NyaXB0aW9uIGZvciB0aGUgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgd2l0aERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyayBhcyBlbmFibGVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmsgYXMgZGlzYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgZGlzYWJsZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHN0b3JhZ2Ugb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSBzdG9yYWdlIFRoZSBuZXcgc3RvcmFnZSBmb3IgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrIGFzIHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHJlcXVpcmVkKCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIucmVxdWlyZSA9IHRydWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwckd1YXJkQnVpbGRlcixcclxufSIsImltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByTWFuYWdlciB9IGZyb20gXCIuLi9HZHByTWFuYWdlclwiXHJcbmltcG9ydCB7IEdkcHJHcm91cEJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVyc1wiXHJcblxyXG4vKipcclxuICogQnVpbGRlciBmb3IgYSBHZHByTWFuYWdlclxyXG4gKiBAY2xhc3MgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmNsYXNzIEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgIHB1YmxpYyBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZTtcclxuICAgIHB1YmxpYyBncm91cHM6IEdkcHJHdWFyZEdyb3VwW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZhY3RvcnkgZm9yIGEgYnVpbGRlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYWtlKCk6IEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJNYW5hZ2VyQnVpbGRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7P0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1udWxsXSBUaGUgc3RvcmFnZSB0eXBlIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVkPXRydWVdIFdoZXRoZXIgb3Igbm90IHRoZSBncm91cCBpcyBlbmFibGVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhcnRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gR2Rwckdyb3VwQnVpbGRlci5jcmVhdGUodGhpcywgbmFtZSwgZGVzY3JpcHRpb24sIHN0b3JhZ2UsIGVuYWJsZWQsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IGEgbmV3IGdyb3VwIGFzIHJlcXVpcmVkXHJcbiAgICAgKiBAcGFyYW0gez9HZHByU3RvcmFnZX0gW3N0b3JhZ2U9bnVsbF0gVGhlIHN0b3JhZ2UgdHlwZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cIlwiXSBUaGUgbmFtZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBncm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0UmVxdWlyZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0RW5hYmxlZEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uKS5yZXF1aXJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZW5hYmxlZCBncm91cFxyXG4gICAgICogQHBhcmFtIHs/R2RwclN0b3JhZ2V9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIHR5cGUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJcIl0gVGhlIG5hbWUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBzdGFydEVuYWJsZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIHRydWUpLmVuYWJsZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0YXJ0IGEgbmV3IGRpc2FibGVkIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0gez9HZHByU3RvcmFnZX0gW3N0b3JhZ2U9bnVsbF0gVGhlIHN0b3JhZ2UgdHlwZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZT1cIlwiXSBUaGUgbmFtZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBncm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXJ0RGlzYWJsZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIGZhbHNlKS5kaXNhYmxlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGQgdGhlIG1hbmFnZXIgZnJvbSB0aGUgY3VycmVudCBidWlsZGVyIHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKCk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHJldHVybiBHZHByTWFuYWdlci5jcmVhdGUodGhpcy5ncm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIHRoaXMgZ3JvdXAncyBjcmVhdGlvbiAobm8tb3AgZm9yIG1hbmFnZXIgYnVpbGRlcnMpXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBlbmRHcm91cCgpOiBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByTWFuYWdlckJ1aWxkZXIsXHJcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9HZHByR3VhcmRCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwckdyb3VwQnVpbGRlclwiIiwiZXhwb3J0IHsgbWFrZUd1YXJkIH0gZnJvbSBcIi4vR2Rwckd1YXJkXCJcclxuZXhwb3J0IHsgR2Rwckd1YXJkR3JvdXAgfSBmcm9tIFwiLi9HZHByR3VhcmRHcm91cFwiXHJcbmV4cG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJcIlxyXG5leHBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcclxuZXhwb3J0IHsgR2Rwck1hbmFnZXJCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlcnMvYnVpbGRlcnNcIlxyXG5leHBvcnQgeyBHZHByRGVzZXJpYWxpemVyIH0gZnJvbSBcIi4vc2VyZGUvR2RwckRlc2VyaWFsaXplclwiXHJcblxyXG4vKlxyXG5cclxuY29uc3QgJGdkcHI6IEdkcHJNYW5hZ2VyID0gR2Rwck1hbmFnZXJCdWlsZGVyLm1ha2UoKVxyXG4uc3RhcnRHcm91cChHZHByU3RvcmFnZS5Db29raWUsIFwidHJhY2tpbmdcIilcclxuICAgIC53aXRoRW5hYmxlZEd1YXJkKFwiR29vZ2xlIFRhZ3MgQW5hbHl0aWNzXCIpIC8vY29va2llXHJcbiAgICAud2l0aEVuYWJsZWRHdWFyZChcIkNvbXBhbnktd2lkZSBUcmFja2luZ1wiLCBcIkhvbWVicmV3ZWQgdHJhY2tpbmcgc3lzdGVtXCIpIC8vY29va2llXHJcbi5lbmRHcm91cCgpXHJcbi5zdGFydEdyb3VwKEdkcHJTdG9yYWdlLkxvY2FsU3RvcmFnZSwgXCJzdHlsZXNcIikgLy9sc1xyXG4gICAgLnN0YXJ0R3JvdXAoKS53aXRoTmFtZShcInRoZW1lc1wiKSAvL2xzXHJcbiAgICAgICAgLndpdGhFbmFibGVkR3VhcmQoXCJjb2xvcnNcIiwgXCJVc2VyIGJhc2VkIGNvbG9yIHNjaGVtZVwiKSAvL2xzXHJcbiAgICAgICAgLndpdGhFbmFibGVkR3VhcmQoXCJcIikgLy9sc1xyXG4gICAgLmVuZEdyb3VwKClcclxuLmVuZEdyb3VwKClcclxuLmJ1aWxkKCk7XHJcblxyXG4qL1xyXG4iLCJpbXBvcnQgeyBHZHByTWFuYWdlciB9IGZyb20gXCIuLi9HZHByTWFuYWdlclwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4uL0dkcHJTdG9yYWdlXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkR3JvdXAgfSBmcm9tIFwiLi4vR2Rwckd1YXJkR3JvdXBcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmQsIG1ha2VHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIlxyXG5cclxuLyoqXHJcbiAqIE5hbWVzcGFjZS1saWtlIGNsYXNzIHRoYXQgYWxsb3dzIGRlc2VyaWFsaXphdGlvbiBmcm9tIHJhdyBmb3JtYXRcclxuICogQGFic3RyYWN0XHJcbiAqIEBjbGFzcyBHZHByRGVzZXJpYWxpemVyXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmFic3RyYWN0IGNsYXNzIEdkcHJEZXNlcmlhbGl6ZXJ7XHJcbiAgICAvKipcclxuICAgICAqIERlc2VyaWFsaXplIGEgR2Rwck1hbmFnZXIgZnJvbSBpdHMgcmF3IHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmF3IFRoZSBzZXJpYWxpemVkIG1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHs/R2Rwck1hbmFnZXJ9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgR2RwckRlc2VyaWFsaXplclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbWFuYWdlcihyYXc6IGFueSk6IEdkcHJNYW5hZ2VyfG51bGx7XHJcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IFtcImVuYWJsZWRcIiwgXCJncm91cHNcIl0uZXZlcnkoa2V5ID0+IGtleSBpbiByYXcpO1xyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRmllbGRzID0gYWxsS2V5c1xyXG4gICAgICAgICYmIHR5cGVvZiByYXcuZW5hYmxlZCA9PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICYmIEFycmF5LmlzQXJyYXkocmF3Lmdyb3Vwcyk7XHJcblxyXG4gICAgICAgIGlmKCF2YWxpZGF0ZUZpZWxkcylcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3VwczogR2Rwckd1YXJkR3JvdXBbXSA9ICg8YW55W10+cmF3Lmdyb3VwcylcclxuICAgICAgICAubWFwKGdyb3VwID0+IHRoaXMuZ3JvdXAoZ3JvdXApKVxyXG4gICAgICAgIC5maWx0ZXIoZ3JvdXAgPT4gZ3JvdXAgIT09IG51bGwpIGFzIEdkcHJHdWFyZEdyb3VwW107XHJcblxyXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBHZHByTWFuYWdlci5jcmVhdGUoW10pO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9ICEhcmF3LmVuYWJsZWQ7XHJcblxyXG4gICAgICAgIGlmKCFncm91cHMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gbWFuYWdlci5hZGRHcm91cChncm91cCkpO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzZXJpYWxpemUgYSBHZHByR3VhcmRHcm91cCBmcm9tIGl0cyByYXcgcmVwcmVzZW50YXRpb25cclxuICAgICAqIEBwYXJhbSB7YW55fSByYXcgVGhlIHNlcmlhbGl6ZWQgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHs/R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgR2RwckRlc2VyaWFsaXplclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ3JvdXAocmF3OiBhbnkpOiBHZHByR3VhcmRHcm91cHxudWxse1xyXG4gICAgICAgIGNvbnN0IGd1YXJkOiBHZHByR3VhcmR8bnVsbCA9IHRoaXMuZ3VhcmQocmF3KTtcclxuICAgICAgICBpZihndWFyZCA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleXMgPSBbXHJcbiAgICAgICAgICAgIFwiZ3VhcmRzXCIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBhbGxLZXlzID0ga2V5cy5ldmVyeShrZXkgPT4ga2V5IGluIHJhdyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRmllbGRzID0gYWxsS2V5c1xyXG4gICAgICAgICYmIEFycmF5LmlzQXJyYXkocmF3Lmd1YXJkcyk7XHJcblxyXG4gICAgICAgIGlmKCF2YWxpZGF0ZUZpZWxkcylcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gR2Rwckd1YXJkR3JvdXAuZm9yKFxyXG4gICAgICAgICAgICBndWFyZC5uYW1lLFxyXG4gICAgICAgICAgICBndWFyZC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgZ3VhcmQuZW5hYmxlZCxcclxuICAgICAgICAgICAgZ3VhcmQucmVxdWlyZWRcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgZ3VhcmRzOiBHZHByR3VhcmRbXSA9ICg8YW55W10+cmF3Lmd1YXJkcylcclxuICAgICAgICAubWFwKGd1YXJkID0+IGtleXMuZXZlcnkoa2V5ID0+IGtleSBpbiBndWFyZCkgPyB0aGlzLmdyb3VwKGd1YXJkKSA6IHRoaXMuZ3VhcmQoZ3VhcmQpKVxyXG4gICAgICAgIC5maWx0ZXIoZ3VhcmQgPT4gZ3VhcmQgIT09IG51bGwpIGFzIEdkcHJHdWFyZFtdO1xyXG5cclxuICAgICAgICBpZighZ3VhcmRzLmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGd1YXJkcy5mb3JFYWNoKGd1YXJkID0+IGdyb3VwLmFkZEd1YXJkKGd1YXJkKSk7XHJcbiAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzZXJpYWxpemUgYSBHZHByR3VhcmQgZnJvbSBpdHMgcmF3IHJlcHJlc2VudGF0aW9uXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcmF3IFRoZSBzZXJpYWxpemVkIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7P0dkcHJHdWFyZH1cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBtZW1iZXJvZiBHZHByRGVzZXJpYWxpemVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBndWFyZChyYXc6IGFueSk6IEdkcHJHdWFyZHxudWxse1xyXG4gICAgICAgIGNvbnN0IGFsbEtleXMgPSBbXHJcbiAgICAgICAgICAgIFwibmFtZVwiLFxyXG4gICAgICAgICAgICBcImVuYWJsZWRcIixcclxuICAgICAgICAgICAgXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCIsXHJcbiAgICAgICAgICAgIFwic3RvcmFnZVwiXHJcbiAgICAgICAgXS5ldmVyeShrZXkgPT4ga2V5IGluIHJhdyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRmllbGRzID0gYWxsS2V5c1xyXG4gICAgICAgICYmIHR5cGVvZiByYXcubmFtZSA9PSBcInN0cmluZ1wiXHJcbiAgICAgICAgJiYgdHlwZW9mIHJhdy5lbmFibGVkID09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHJhdy5yZXF1aXJlZCA9PSBcImJvb2xlYW5cIlxyXG4gICAgICAgICYmIHR5cGVvZiByYXcuZGVzY3JpcHRpb24gPT0gXCJzdHJpbmdcIlxyXG4gICAgICAgICYmIHR5cGVvZiByYXcuc3RvcmFnZSA9PSBcIm51bWJlclwiXHJcbiAgICAgICAgJiYgcmF3LnN0b3JhZ2UgaW4gIEdkcHJTdG9yYWdlO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuICF2YWxpZGF0ZUZpZWxkcyA/IG51bGwgOiBtYWtlR3VhcmQoXHJcbiAgICAgICAgICAgIHJhdy5uYW1lLFxyXG4gICAgICAgICAgICByYXcuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIHJhdy5zdG9yYWdlIGFzIEdkcHJTdG9yYWdlLFxyXG4gICAgICAgICAgICAhIXJhdy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgISFyYXcuZW5hYmxlZFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByRGVzZXJpYWxpemVyLFxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==