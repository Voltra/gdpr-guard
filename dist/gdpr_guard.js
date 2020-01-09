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
var storageFromOrdinal = function (key) {
    switch (true) {
        case key == GdprStorage.All:
            return GdprStorage.All;
        case key == GdprStorage.None:
            return GdprStorage.None;
        case key == GdprStorage.Cookie:
            return GdprStorage.Cookie;
        case key == GdprStorage.LocalStorage:
            return GdprStorage.LocalStorage;
        case key == GdprStorage.SessionStorage:
            return GdprStorage.SessionStorage;
        case key == GdprStorage.IndexedDb:
            return GdprStorage.IndexedDb;
        case key == GdprStorage.FileSystem:
            return GdprStorage.FileSystem;
        case key == GdprStorage.ServerStorage:
            return GdprStorage.ServerStorage;
        default:
            return null;
    }
};
exports.storageFromOrdinal = storageFromOrdinal;


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
exports.storageFromOrdinal = GdprStorage_1.storageFromOrdinal;
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
        return !validateFields ? null : GdprGuard_1.makeGuard(raw.name, raw.description, GdprStorage_1.storageFromOrdinal(raw.storage), !!raw.required, !!raw.enabled);
    };
    return GdprDeserializer;
}());
exports.GdprDeserializer = GdprDeserializer;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHByR3VhcmQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dkcHJHdWFyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwckd1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9HZHByR3VhcmRHcm91cC50cyIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL0dkcHJTdG9yYWdlLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3JvdXBCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3VhcmRCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByTWFuYWdlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL2J1aWxkZXJzL2J1aWxkZXJzLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9nZHByX2d1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9zZXJkZS9HZHByRGVzZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RB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R0csNENBQWdCIiwiZmlsZSI6ImdkcHJfZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImdkcHJHdWFyZFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJnZHByR3VhcmRcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ2Rwckd1YXJkXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9nZHByX2d1YXJkLnRzXCIpO1xuIiwiaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi9HZHByU3RvcmFnZVwiXHJcblxyXG5cclxuLyoqXHJcbiAqIEdlbmVyaWMgdHlwZSByZXByZXNlbnRpbmcgYSBndWFyZFxyXG4gKiBAaW50ZXJmYWNlIEdkcHJHdWFyZFxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5pbnRlcmZhY2UgR2Rwckd1YXJke1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nLFxyXG4gICAgZW5hYmxlZDogYm9vbGVhbixcclxuICAgIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICByZWFkb25seSBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgIHJlcXVpcmVkOiBib29sZWFuLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGEgZ3VhcmQgaXMgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGd1YXJkIHRvIGxvb2sgZm9yXHJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRcclxuICAgICAqL1xyXG4gICAgaXNFbmFibGVkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGUgdGhpcyBndWFyZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZH0gdGhpcyBndWFyZFxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICBlbmFibGUoKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGlzYWJsZSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkfSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGUoKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoaXMgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmR9IHRoaXMgZ3VhcmRcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRcclxuICAgICAqL1xyXG4gICAgdG9nZ2xlKCk6IEdkcHJHdWFyZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1ha2UgdGhpcyBndWFyZCByZXF1aXJlZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZH0gdGhpcyBndWFyZFxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwckd1YXJkLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5hYmxlIGd1YXJkcyBvZiB0aGUgZ2l2ZW4gdHlwZSAodGhpcyBndWFyZCBhbmQgc3ViLWd1YXJkcylcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHR5cGUgVGhlIHN0b3JhZ2UgdHlwZSB0byBlbmFibGUgYWxsIGd1YXJkcyBmb3JcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmR9IHRoaXMgZ3VhcmRcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRcclxuICAgICAqL1xyXG4gICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGUgZ3VhcmRzIG9mIHRoZSBnaXZlbiB0eXBlICh0aGlzIGd1YXJkIGFuZCBzdWItZ3VhcmRzKVxyXG4gICAgICogQHBhcmFtIHtHZHByU3RvcmFnZX0gdHlwZSBUaGUgc3RvcmFnZSB0eXBlIHRvIGVuYWJsZSBhbGwgZ3VhcmRzIGZvclxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZH0gdGhpcyBndWFyZFxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSBndWFyZHMgb2YgdGhlIGdpdmVuIHR5cGUgKHRoaXMgZ3VhcmQgYW5kIHN1Yi1ndWFyZHMpXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSB0eXBlIFRoZSBzdG9yYWdlIHR5cGUgdG8gZW5hYmxlIGFsbCBndWFyZHMgZm9yXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkfSB0aGlzIGd1YXJkXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkXHJcbiAgICAgKi9cclxuICAgIHRvZ2dsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSYXcvc2ltcGxlIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R8R2Rwckd1YXJkUmF3fVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZFxyXG4gICAgICovXHJcbiAgICByYXcoKTogb2JqZWN0fEdkcHJHdWFyZFJhdyxcclxufVxyXG5cclxuLyoqXHJcbiAqIFJhdyByZXByZXNlbnRhdGlvbiBvZiBhIGd1YXJkXHJcbiAqIEBpbnRlcmZhY2UgR2Rwckd1YXJkUmF3XHJcbiAqIEBleHBvcnRcclxuICovXHJcbmludGVyZmFjZSBHZHByR3VhcmRSYXd7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgcmVxdWlyZWQ6IGJvb2xlYW4sXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGYWN0b3J5IGZvciBjcmVhdGluZyBhIGd1YXJkXHJcbiAqIEBwYXJhbSBuYW1lIFRoZSB1bmlxdWUgbmFtZS9pZGVudGlmaWVyIGZvciB0aGlzIGd1YXJkXHJcbiAqIEBwYXJhbSBkZXNjcmlwdGlvbiBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGd1YXJkXHJcbiAqIEBwYXJhbSBzdG9yYWdlIFdoZXJlIHRoZSBkYXRhIHdpbGwgYmUgc3RvcmVkXHJcbiAqIEBwYXJhbSByZXF1aXJlZCBXaGV0aGVyIG9yIG5vdCBpdCBpcyBhIHJlcXVpcmVkIGd1YXJkXHJcbiAqIEBwYXJhbSBlbmFibGVkIFdoZXRoZXIgb3Igbm90IGl0IGlzIGN1cnJlbnRseSBlbmFibGVkXHJcbiAqIEByZXR1cm5zIHtHZHByR3VhcmR9XHJcbiAqIEBleHBvcnRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuQ29va2llLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlLCBlbmFibGVkOiBib29sZWFufG51bGwgPSBudWxsKTogR2Rwckd1YXJke1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHN0b3JhZ2UsXHJcbiAgICAgICAgcmVxdWlyZWQsXHJcbiAgICAgICAgZW5hYmxlZDogZW5hYmxlZCA9PT0gbnVsbCA/IHJlcXVpcmVkIDogZW5hYmxlZCxcclxuICAgICAgICBlbmFibGUoKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGUoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlKCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gIXRoaXMuZW5hYmxlZDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYWtlUmVxdWlyZWQoKXtcclxuICAgICAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNFbmFibGVkKG5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBuYW1lICYmIHRoaXMuZW5hYmxlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvclN0b3JhZ2UodHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0b3JhZ2UgPT0gdHlwZSAmJiAhdGhpcy5yZXF1aXJlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmF3KCk6IEdkcHJHdWFyZFJhd3tcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwckd1YXJkLFxyXG4gICAgR2Rwckd1YXJkUmF3LFxyXG4gICAgbWFrZUd1YXJkLFxyXG59IiwiaW1wb3J0IHsgR2Rwckd1YXJkLCBHZHByR3VhcmRSYXcgfSBmcm9tIFwiLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkQ29sbGVjdGlvbiB9IGZyb20gXCIuL0dkcHJHdWFyZENvbGxlY3Rpb25cIlxyXG5cclxuLyoqXHJcbiAqIFJhdyByZXByZXNlbnRhdGlvbiBvZiBhIGd1YXJkIGdyb3VwXHJcbiAqIEBpbnRlcmZhY2UgR2Rwckd1YXJkR3JvdXBSYXdcclxuICogQGV4dGVuZHMge0dkcHJHdWFyZFJhd31cclxuICogQGV4cG9ydFxyXG4gKi9cclxuaW50ZXJmYWNlIEdkcHJHdWFyZEdyb3VwUmF3IGV4dGVuZHMgR2Rwckd1YXJkUmF3e1xyXG4gICAgZ3VhcmRzOiBHZHByR3VhcmRSYXdbXSxcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgZ3JvdXAgb2YgZ3VhcmRzXHJcbiAqIEBjbGFzcyBHZHByR3VhcmRHcm91cFxyXG4gKiBAaW1wbGVtZW50cyB7R2Rwckd1YXJkQ29sbGVjdGlvbn1cclxuICogQGV4cG9ydFxyXG4gKi9cclxuY2xhc3MgR2Rwckd1YXJkR3JvdXAgaW1wbGVtZW50cyBHZHByR3VhcmRDb2xsZWN0aW9uIHtcclxuICAgIHByb3RlY3RlZCBiaW5kaW5nczogTWFwPHN0cmluZywgR2Rwckd1YXJkPiA9IG5ldyBNYXAoKTtcclxuICAgIHB1YmxpYyByZWFkb25seSBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLk5vbmU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdkcHJHdWFyZEdyb3VwLlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9ZmFsc2VdXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlZD1mYWxzZV1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2UsIHB1YmxpYyByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICBpZih0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBncm91cGVcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVkPWZhbHNlXSBXaGV0aGVyIG9yIG5vdCB0aGUgZ3JvdXAgaXMgZW5hYmxlZCBieSBkZWZhdWx0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlZD1mYWxzZV0gV2hldGhlciBvciBub3QgdGhlIGVudGlyZSBncm91cCBpcyByZXF1aXJlZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmb3IobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlLCByZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByR3VhcmRHcm91cChuYW1lLCBkZXNjcmlwdGlvbiwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZ3VhcmQgdG8gdGhpcyBncm91cFxyXG4gICAgICogQHBhcmFtIHtHZHByR3VhcmR9IGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqL1xyXG4gICAgYWRkR3VhcmQoZ3VhcmQ6IEdkcHJHdWFyZCk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3Muc2V0KGd1YXJkLm5hbWUsIGd1YXJkKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqL1xyXG4gICAgaGFzR3VhcmQobmFtZTogc3RyaW5nKTogYm9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5iaW5kaW5ncy5oYXMobmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIGdldEd1YXJkKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZCB8IG51bGx7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmluZGluZ3MuZ2V0KG5hbWUpIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIGEgY2FsbGJhY2sgb24gZWFjaCBndWFyZCBvZiB0aGlzIGdyb3VwXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhndWFyZDogR2Rwckd1YXJkKSA9PiBhbnl9IGNiXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRvRm9yRWFjaEd1YXJkKGNiOiAoZ3VhcmQ6IEdkcHJHdWFyZCkgPT4gYW55KTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5ncy5mb3JFYWNoKGd1YXJkID0+IGNiKGd1YXJkKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKi9cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuaGFzR3VhcmQobmFtZSkpe1xyXG4gICAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuZ2V0R3VhcmQobmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPEdkcHJHdWFyZD5ndWFyZCkuZW5hYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBndWFyZF0gb2YgdGhpcy5iaW5kaW5ncyl7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLmlzRW5hYmxlZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBlbmFibGUoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4gZ3VhcmQuZW5hYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBkaXNhYmxlKCk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IGd1YXJkLmRpc2FibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIHRvZ2dsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkID8gdGhpcy5kaXNhYmxlKCkgOiB0aGlzLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRHcm91cFxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEdyb3VwfVxyXG4gICAgICovXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5tYWtlUmVxdWlyZWQoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLnN0b3JhZ2UgJiB0eXBlKVxyXG4gICAgICAgICAgICAgICAgZ3VhcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4ge1xyXG4gICAgICAgICAgICBpZihndWFyZC5zdG9yYWdlICYgdHlwZSlcclxuICAgICAgICAgICAgICAgIGd1YXJkLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkR3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRHcm91cH1cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IHtcclxuICAgICAgICAgICAgaWYoZ3VhcmQuc3RvcmFnZSAmIHR5cGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3VhcmQudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkR3JvdXBSYXd9XHJcbiAgICAgKi9cclxuICAgIHJhdygpOiBHZHByR3VhcmRHcm91cFJhd3tcclxuICAgICAgICBjb25zdCByZXQ6IEdkcHJHdWFyZEdyb3VwUmF3ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZWQsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0aGlzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICBzdG9yYWdlOiB0aGlzLnN0b3JhZ2UsXHJcbiAgICAgICAgICAgIGd1YXJkczogW10sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0Lmd1YXJkcyA9IFsuLi50aGlzLmJpbmRpbmdzXS5tYXAoKFtfLCBndWFyZF0pID0+IGd1YXJkLnJhdygpIGFzIEdkcHJHdWFyZFJhdyk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmRHcm91cCxcclxuICAgIEdkcHJHdWFyZEdyb3VwUmF3LFxyXG59IiwiaW1wb3J0IHsgR2Rwckd1YXJkLCBHZHByR3VhcmRSYXcgfSBmcm9tIFwiLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCwgR2Rwckd1YXJkR3JvdXBSYXcgfSBmcm9tIFwiLi9HZHByR3VhcmRHcm91cFwiO1xyXG5pbXBvcnQgeyBHZHByR3VhcmRDb2xsZWN0aW9uIH0gZnJvbSBcIi4vR2Rwckd1YXJkQ29sbGVjdGlvblwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIjtcclxuXHJcbi8qKlxyXG4gKiBSYXcgcmVwcmVzZW50YXRpb24gb2YgYSBndWFyZCBtYW5hZ2VyXHJcbiAqIEBpbnRlcmZhY2UgR2Rwck1hbmFnZXJSYXdcclxuICogQGV4cG9ydFxyXG4gKi9cclxuaW50ZXJmYWNlIEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbixcclxuICAgIGdyb3VwczogR2Rwckd1YXJkR3JvdXBSYXdbXSxcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNYW5hZ2UgbXVsdGlwbGUgZ3VhcmQgZ3JvdXBzXHJcbiAqIEBjbGFzcyBHZHByTWFuYWdlclxyXG4gKiBAaW1wbGVtZW50cyB7R2Rwckd1YXJkQ29sbGVjdGlvbn1cclxuICogQGV4cG9ydFxyXG4gKi9cclxuY2xhc3MgR2Rwck1hbmFnZXIgaW1wbGVtZW50cyBHZHByR3VhcmRDb2xsZWN0aW9ue1xyXG4gICAgcHJvdGVjdGVkIGdyb3VwczogTWFwPHN0cmluZywgR2Rwckd1YXJkR3JvdXA+ID0gbmV3IE1hcCgpO1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gXCJtYW5hZ2VyXCI7XHJcbiAgICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJNYW5hZ2VyIG9mIEdEUFIgZ3VhcmQgZ3JvdXBzXCI7XHJcbiAgICBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuICAgIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEdkcHJNYW5hZ2VyLlxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmFjdG9yeSBmb3IgY3JlYXRpbmcgYSBnZHByIG1hbmFnZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7R2Rwckd1YXJkR3JvdXBbXX0gW2dyb3Vwcz1bXV0gVGhlIGluaXRpYWwgZ3VhcmQgZ3JvdXBzXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ3JvdXBzOiBHZHByR3VhcmRHcm91cFtdID0gW10pOiBHZHByTWFuYWdlcntcclxuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IEdkcHJNYW5hZ2VyKCk7XHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gbWFuYWdlci5hZGRHcm91cChncm91cCkpO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFuZCBhZGQgYSBncm91cCB0byB0aGlzIG1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuZXcgZ3JvdXAncyBuYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBuZXcgZ3JvdXAncyBkZXNjcmlwdGlvblxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZUdyb3VwKG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByTWFuYWdlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRHcm91cChHZHByR3VhcmRHcm91cC5mb3IobmFtZSwgZGVzY3JpcHRpb24pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSBncm91cCB0byB0aGlzIG1hbmFnZXJcclxuICAgICAqIEBwYXJhbSB7R2Rwckd1YXJkR3JvdXB9IGNhdGVnb3J5IFRoZSBncm91cCB0byBhZGRcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhZGRHcm91cChjYXRlZ29yeTogR2Rwckd1YXJkR3JvdXApOiBHZHByTWFuYWdlcntcclxuICAgICAgICB0aGlzLmdyb3Vwcy5zZXQoY2F0ZWdvcnkubmFtZSwgY2F0ZWdvcnkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2hvcnRjaXJjdWl0IG9uIHByZWRpY2F0ZVxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHsoZ3JvdXA6IEdkcHJHdWFyZENvbGxlY3Rpb24pID0+IGJvb2xlYW59IHByZWRcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCByZWR1Y2VHcm91cHNQcmVkKHByZWQ6IChncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYm9vbGVhbik6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihwcmVkKGdyb3VwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGVjdXRlIGEgY2FsbGJhY2sgb24gZWFjaCBncm91cCBvZiB0aGlzIGd1YXJkXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYW55fSBjYlxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBmb3JFYWNoR3JvdXAoY2I6IChncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYW55KTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChncm91cCA9PiBjYihncm91cCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLmhhc0d1YXJkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgZ2V0R3VhcmQobmFtZTogc3RyaW5nKTogR2Rwckd1YXJkIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihncm91cC5oYXNHdWFyZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBncm91cC5nZXRHdWFyZChuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGhhc0dyb3VwKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIGdldEdyb3VwKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEdyb3VwIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtuLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihuID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqL1xyXG4gICAgaXNFbmFibGVkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAuaXNFbmFibGVkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgZW5hYmxlKCk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5lbmFibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKi9cclxuICAgIGRpc2FibGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICB0b2dnbGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQgPyB0aGlzLmRpc2FibGUoKSA6IHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEb2VzIG5vdGhpbmcgZm9yIGEgbWFuYWdlclxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgLy8gbm9vcFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXRkb2NcclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlclxyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICBlbmFibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5lbmFibGVGb3JTdG9yYWdlKHR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IGdyb3VwLmRpc2FibGVGb3JTdG9yYWdlKHR5cGUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0ZG9jXHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJcclxuICAgICAqIEByZXR1cm5zIHtHZHByTWFuYWdlcn1cclxuICAgICAqL1xyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdGRvY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJSYXd9XHJcbiAgICAgKi9cclxuICAgIHJhdygpOiBHZHByTWFuYWdlclJhd3tcclxuICAgICAgICBjb25zdCByZXQ6IEdkcHJNYW5hZ2VyUmF3ID0ge1xyXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZWQsXHJcbiAgICAgICAgICAgIGdyb3VwczogW10sXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0Lmdyb3VwcyA9IFsuLi50aGlzLmdyb3Vwc10ubWFwKChbXywgZ3JvdXBdKSA9PiBncm91cC5yYXcoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByTWFuYWdlcixcclxuICAgIEdkcHJNYW5hZ2VyUmF3LFxyXG59IiwiLyoqXHJcbiAqIFRoZSB0eXBlcyBvZiBzdG9yYWdlIGNvbmNlcm5lZCBieSBHRFBSXHJcbiAqIEBlbnVtIHtudW1iZXJ9XHJcbiAqIEBleHBvcnRcclxuICovXHJcbmVudW0gR2RwclN0b3JhZ2V7XHJcbiAgICAvKipcclxuICAgICAqIE5vIHN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgTm9uZSA9IDBiMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvb2tpZS1iYXNlZCBzdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIENvb2tpZSA9IDBiMTAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yYWdlIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgICovXHJcbiAgICBMb2NhbFN0b3JhZ2UgPSAwYjEwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0b3JhZ2UgaW4gc2Vzc2lvblN0b3JhZ2VcclxuICAgICAqL1xyXG4gICAgU2Vzc2lvblN0b3JhZ2UgPSAwYjEwMDAsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdG9yYWdlIGluIGluZGV4ZWREYlxyXG4gICAgICovXHJcbiAgICBJbmRleGVkRGIgPSAwYjEwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmFnZSBvbiBjbGllbnQtc2lkZSBmaWxlc3lzdGVtXHJcbiAgICAgKi9cclxuICAgIEZpbGVTeXN0ZW0gPSAwYjEwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RvcmFnZSBvbiBzZXJ2ZXIgKHNlc3Npb24sIERCLCBjbG91ZCwgZXRjLi4uKVxyXG4gICAgICovXHJcbiAgICBTZXJ2ZXJTdG9yYWdlID0gMGIxMDAwMCxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsbCBzdG9yYWdlXHJcbiAgICAgKi9cclxuICAgIEFsbCA9IENvb2tpZSB8IExvY2FsU3RvcmFnZSB8IFNlc3Npb25TdG9yYWdlIHwgSW5kZXhlZERiIHwgRmlsZVN5c3RlbSB8IFNlcnZlclN0b3JhZ2UsXHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2VGcm9tT3JkaW5hbCA9IChrZXk6IG51bWJlcik6IEdkcHJTdG9yYWdlfG51bGwgPT4ge1xyXG4gICAgLy8gVGhhbmsgeW91IHZlcnkgbXVjaCB0eXBlc2NyaXB0XHJcbiAgICBzd2l0Y2godHJ1ZSl7XHJcbiAgICAgICAgY2FzZSBrZXkgPT0gR2RwclN0b3JhZ2UuQWxsOlxyXG4gICAgICAgICAgICByZXR1cm4gR2RwclN0b3JhZ2UuQWxsO1xyXG5cclxuICAgICAgICBjYXNlIGtleSA9PSBHZHByU3RvcmFnZS5Ob25lOlxyXG4gICAgICAgICAgICByZXR1cm4gR2RwclN0b3JhZ2UuTm9uZTtcclxuXHJcbiAgICAgICAgY2FzZSBrZXkgPT0gR2RwclN0b3JhZ2UuQ29va2llOlxyXG4gICAgICAgICAgICByZXR1cm4gR2RwclN0b3JhZ2UuQ29va2llO1xyXG5cclxuICAgICAgICBjYXNlIGtleSA9PSBHZHByU3RvcmFnZS5Mb2NhbFN0b3JhZ2U6XHJcbiAgICAgICAgICAgIHJldHVybiBHZHByU3RvcmFnZS5Mb2NhbFN0b3JhZ2U7XHJcblxyXG4gICAgICAgIGNhc2Uga2V5ID09IEdkcHJTdG9yYWdlLlNlc3Npb25TdG9yYWdlOlxyXG4gICAgICAgICAgICByZXR1cm4gR2RwclN0b3JhZ2UuU2Vzc2lvblN0b3JhZ2U7XHJcblxyXG4gICAgICAgIGNhc2Uga2V5ID09IEdkcHJTdG9yYWdlLkluZGV4ZWREYjpcclxuICAgICAgICAgICAgcmV0dXJuIEdkcHJTdG9yYWdlLkluZGV4ZWREYjtcclxuXHJcbiAgICAgICAgY2FzZSBrZXkgPT0gR2RwclN0b3JhZ2UuRmlsZVN5c3RlbTpcclxuICAgICAgICAgICAgcmV0dXJuIEdkcHJTdG9yYWdlLkZpbGVTeXN0ZW07XHJcblxyXG4gICAgICAgIGNhc2Uga2V5ID09IEdkcHJTdG9yYWdlLlNlcnZlclN0b3JhZ2U6XHJcbiAgICAgICAgICAgIHJldHVybiBHZHByU3RvcmFnZS5TZXJ2ZXJTdG9yYWdlO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByU3RvcmFnZSxcclxuICAgIHN0b3JhZ2VGcm9tT3JkaW5hbCxcclxufSIsImltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4uL0dkcHJTdG9yYWdlXCJcclxuaW1wb3J0IHsgR2Rwck1hbmFnZXJCdWlsZGVyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkIH0gZnJvbSBcIi4uL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkQnVpbGRlciB9IGZyb20gXCIuL0dkcHJHdWFyZEJ1aWxkZXJcIlxyXG5cclxuLyoqXHJcbiAqIEJ1aWxkZXIgZm9yIGEgZ2RwciBncm91cFxyXG4gKiBAY2xhc3MgR2Rwckdyb3VwQnVpbGRlclxyXG4gKiBAZXh0ZW5kcyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5jbGFzcyBHZHByR3JvdXBCdWlsZGVyIGV4dGVuZHMgR2Rwck1hbmFnZXJCdWlsZGVye1xyXG4gICAgcHVibGljIGd1YXJkczogR2Rwckd1YXJkW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEdkcHJNYW5hZ2VyQnVpbGRlciAsXHJcbiAgICAgICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyxcclxuICAgICAgICBwcm90ZWN0ZWQgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgICAgICBwcm90ZWN0ZWQgZW5hYmxlOiBib29sZWFuLFxyXG4gICAgICAgIHByb3RlY3RlZCByZXF1aXJlOiBib29sZWFuLFxyXG4gICAgKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICAgICAgaWYocmVxdWlyZSlcclxuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIik6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLnN0YXJ0R3JvdXAoc3RvcmFnZSB8fCB0aGlzLnBhcmVudC5zdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0UmVxdWlyZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24pLnJlcXVpcmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWN0b3J5IGZvciBhIGdyb3VwIGJ1aWxkZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7R2Rwck1hbmFnZXJCdWlsZGVyfSBtYiBUaGUgcGFyZW50IG1hbmFnZXIgYnVpbGRlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7KEdkcHJTdG9yYWdlfG51bGwpfSBbc3RvcmFnZT1udWxsXSBUaGUgc3RvcmFnZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9dHJ1ZV0gV2hldGhlciBvciBub3QgdGhlIGdyb3VwIHNob3VsZCBiZSBlbmFibGVkXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXF1aXJlZD10cnVlXSBXaGV0aGVyIG9yIG5vdCB0aGUgZ3JvdXAgc2hvdWxkIGJlIHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3JvdXBCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG1iOiBHZHByTWFuYWdlckJ1aWxkZXIsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSwgcmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHcm91cEJ1aWxkZXIobWIsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlIHx8IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIHRoZSBncm91cCB1c2luZyB0aGUgY3VycmVudCBidWlsZGVyIHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuZEdyb3VwKCk6IEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgICAgICBjb25zdCBlbmFibGUgPSB0aGlzLnJlcXVpcmUgfHwgdGhpcy5lbmFibGU7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBHZHByR3VhcmRHcm91cC5mb3IodGhpcy5uYW1lLCB0aGlzLmRlc2NyaXB0aW9uLCBlbmFibGUsIHRoaXMucmVxdWlyZSk7XHJcbiAgICAgICAgY29uc3QgZ3VhcmRzID0gWy4uLnRoaXMuZ3VhcmRzLCAuLi50aGlzLmdyb3Vwc107XHJcbiAgICAgICAgZ3VhcmRzLmZvckVhY2goZ3VhcmQgPT4gZ3JvdXAuYWRkR3VhcmQoZ3VhcmQpKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5yZXF1aXJlKVxyXG4gICAgICAgICAgICBncm91cC5tYWtlUmVxdWlyZWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJlbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVkaXQgdGhlIGJ1aWxkZXIgc3RhdGVcclxuICAgICAqIEBpZ25vcmVcclxuICAgICAqIEBwcm90ZWN0ZWRcclxuICAgICAqIEBwYXJhbSB7KGJ1aWxkZXI6IEdkcHJHcm91cEJ1aWxkZXIpID0+IGFueX0gY2JcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGVkaXQoY2I6IChidWlsZGVyOiBHZHByR3JvdXBCdWlsZGVyKSA9PiBhbnkpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNiKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5ldyBuYW1lIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIubmFtZSA9IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvbiBUaGUgbmV3IGRlc2NyaXB0aW9uIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHdpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbjogc3RyaW5nKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgc3RvcmFnZSBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHN0b3JhZ2UgVGhlIG5ldyBzdG9yYWdlIGZvciB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrIGFzIGVuYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZWQoKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmsgYXMgZGlzYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHcm91cEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRpc2FibGVkKCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyayBhcyByZXF1aXJlZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxdWlyZWQoKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5yZXF1aXJlID0gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBhZGRpbmcgYSBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIGZvciB0aGUgZ3VhcmQgKGJ5IGRlZmF1bHQgaXQgdXNlcyB0aGUgZ3JvdXAncyBzdG9yYWdlKVxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnRHdWFyZChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHdWFyZEJ1aWxkZXIuY3JlYXRlKHRoaXMsIHN0b3JhZ2UgfHwgdGhpcy5zdG9yYWdlLCB0aGlzLmVuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGFydCBhZGRpbmcgYSByZXF1aXJlZCBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIGZvciB0aGUgZ3VhcmQgKGJ5IGRlZmF1bHQgaXQgdXNlcyB0aGUgZ3JvdXAncyBzdG9yYWdlKVxyXG4gICAgICogQHJldHVybnMge0dkcHJHdWFyZEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnRSZXF1aXJlZEd1YXJkKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSkucmVxdWlyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhbiBlbmFibGVkIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb249XCJcIl0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHBhcmFtIHsoR2RwclN0b3JhZ2V8bnVsbCl9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckdyb3VwQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2l0aEVuYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmVuYWJsZWQoKVxyXG4gICAgICAgIC5lbmRHdWFyZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgZGlzYWJsZWQgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBndWFyZFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0geyhHZHByU3RvcmFnZXxudWxsKX0gW3N0b3JhZ2U9bnVsbF0gVGhlIHN0b3JhZ2Ugb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3JvdXBCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3aXRoRGlzYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmRpc2FibGVkKClcclxuICAgICAgICAuZW5kR3VhcmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHcm91cEJ1aWxkZXIsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3JvdXBCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlcnNcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IG1ha2VHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIjtcclxuXHJcbi8qKlxyXG4gKiBCdWlsZGVyIGZvciBhIGdkcHIgZ3VhcmRcclxuICogQGNsYXNzIEdkcHJHdWFyZEJ1aWxkZXJcclxuICogQGV4cG9ydFxyXG4gKi9cclxuY2xhc3MgR2Rwckd1YXJkQnVpbGRlcntcclxuICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJvdGVjdGVkIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBHZHByR3VhcmRCdWlsZGVyLlxyXG4gICAgICogQGlnbm9yZVxyXG4gICAgICogQHByb3RlY3RlZFxyXG4gICAgICogQHBhcmFtIHtHZHByR3JvdXBCdWlsZGVyfSBwYXJlbnRcclxuICAgICAqIEBwYXJhbSB7R2RwclN0b3JhZ2V9IHN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVcclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcGFyZW50OiBHZHByR3JvdXBCdWlsZGVyLFxyXG4gICAgICAgIHByb3RlY3RlZCBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgICAgICBwcm90ZWN0ZWQgZW5hYmxlOiBib29sZWFuLFxyXG4gICAgICAgIHByb3RlY3RlZCByZXF1aXJlOiBib29sZWFuLFxyXG4gICAgKXtcclxuICAgICAgICBpZihyZXF1aXJlKVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWN0b3J5IGZvciBjcmVhdGluZyBhIGd1YXJkIGJ1aWxkZXJcclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7R2Rwckdyb3VwQnVpbGRlcn0gZ2IgVGhlIHBhcmVudCBncm91cCBidWlsZGVyXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1HZHByU3RvcmFnZS5Db29raWVdIFRoZSBndWFyZCdzIHN0b3JhZ2VcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWQ9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRoZSBndWFyZCBzaG91bGQgYmUgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVxdWlyZWQ9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRoZSBndWFyZCBzaG91bGQgYmUgcmVxdWlyZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNyZWF0ZShnYjogR2Rwckdyb3VwQnVpbGRlciwgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Db29raWUsIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByR3VhcmRCdWlsZGVyKGdiLCBzdG9yYWdlLCBlbmFibGVkLCByZXF1aXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmQgdGhlIGd1YXJkIGNyZWF0aW9uIHdpdGggdGhlIGN1cnJlbnQgYnVpbGRlciBzdGF0ZVxyXG4gICAgICogQHJldHVybnMge0dkcHJHcm91cEJ1aWxkZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwckd1YXJkQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBlbmRHdWFyZCgpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNvbnN0IGVuYWJsZSA9IHRoaXMucmVxdWlyZSB8fCB0aGlzLmVuYWJsZTtcclxuICAgICAgICBjb25zdCBndWFyZCA9IG1ha2VHdWFyZCh0aGlzLm5hbWUsIHRoaXMuZGVzY3JpcHRpb24sIHRoaXMuc3RvcmFnZSwgdGhpcy5yZXF1aXJlLCBlbmFibGUpO1xyXG5cclxuICAgICAgICBpZih0aGlzLnJlcXVpcmUpXHJcbiAgICAgICAgICAgIGd1YXJkLm1ha2VSZXF1aXJlZCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcmVudC5ndWFyZHMucHVzaChndWFyZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRWRpdCB0aGUgYnVpbGRlcidzIHN0YXRlXHJcbiAgICAgKiBAaWdub3JlXHJcbiAgICAgKiBAcHJvdGVjdGVkXHJcbiAgICAgKiBAcGFyYW0geyhidWlsZGVyOiBHZHByR3VhcmRCdWlsZGVyKSA9PiBhbnl9IGVkaXRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGVkaXQoZWRpdDogKGJ1aWxkZXI6IEdkcHJHdWFyZEJ1aWxkZXIpID0+IGFueSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgZWRpdCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgbmFtZSBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuZXcgbmFtZSBmb3IgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHdpdGhOYW1lKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIubmFtZSA9IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3VhcmRcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXNjcmlwdGlvbiBUaGUgbmV3IGRlc2NyaXB0aW9uIGZvciB0aGUgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgd2l0aERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyayBhcyBlbmFibGVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmsgYXMgZGlzYWJsZWRcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3VhcmRCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJHdWFyZEJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgZGlzYWJsZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHN0b3JhZ2Ugb2YgdGhlIGd1YXJkXHJcbiAgICAgKiBAcGFyYW0ge0dkcHJTdG9yYWdlfSBzdG9yYWdlIFRoZSBuZXcgc3RvcmFnZSBmb3IgdGhlIGd1YXJkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrIGFzIHJlcXVpcmVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckd1YXJkQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByR3VhcmRCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIHJlcXVpcmVkKCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIucmVxdWlyZSA9IHRydWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwckd1YXJkQnVpbGRlcixcclxufSIsImltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByTWFuYWdlciB9IGZyb20gXCIuLi9HZHByTWFuYWdlclwiXHJcbmltcG9ydCB7IEdkcHJHcm91cEJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVyc1wiXHJcblxyXG4vKipcclxuICogQnVpbGRlciBmb3IgYSBHZHByTWFuYWdlclxyXG4gKiBAY2xhc3MgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAqIEBleHBvcnRcclxuICovXHJcbmNsYXNzIEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgIHB1YmxpYyBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZTtcclxuICAgIHB1YmxpYyBncm91cHM6IEdkcHJHdWFyZEdyb3VwW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZhY3RvcnkgZm9yIGEgYnVpbGRlclxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHJldHVybnMge0dkcHJNYW5hZ2VyQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBtYWtlKCk6IEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJNYW5hZ2VyQnVpbGRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7P0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1udWxsXSBUaGUgc3RvcmFnZSB0eXBlIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVkPXRydWVdIFdoZXRoZXIgb3Igbm90IHRoZSBncm91cCBpcyBlbmFibGVkXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhcnRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gR2Rwckdyb3VwQnVpbGRlci5jcmVhdGUodGhpcywgbmFtZSwgZGVzY3JpcHRpb24sIHN0b3JhZ2UsIGVuYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZ3JvdXAgYXMgcmVxdWlyZWRcclxuICAgICAqIEBwYXJhbSB7P0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1udWxsXSBUaGUgc3RvcmFnZSB0eXBlIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhcnRSZXF1aXJlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHJ1ZSkuZW5hYmxlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZW5hYmxlZCBncm91cFxyXG4gICAgICogQHBhcmFtIHs/R2RwclN0b3JhZ2V9IFtzdG9yYWdlPW51bGxdIFRoZSBzdG9yYWdlIHR5cGUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWU9XCJcIl0gVGhlIG5hbWUgb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uPVwiXCJdIFRoZSBkZXNjcmlwdGlvbiBvZiB0aGUgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHtHZHByR3JvdXBCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBzdGFydEVuYWJsZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RhcnQgYSBuZXcgZGlzYWJsZWQgZ3JvdXBcclxuICAgICAqIEBwYXJhbSB7P0dkcHJTdG9yYWdlfSBbc3RvcmFnZT1udWxsXSBUaGUgc3RvcmFnZSB0eXBlIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPVwiXCJdIFRoZSBuYW1lIG9mIHRoZSBncm91cFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbj1cIlwiXSBUaGUgZGVzY3JpcHRpb24gb2YgdGhlIGdyb3VwXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwckdyb3VwQnVpbGRlcn1cclxuICAgICAqIEBtZW1iZXJvZiBHZHByTWFuYWdlckJ1aWxkZXJcclxuICAgICAqL1xyXG4gICAgc3RhcnREaXNhYmxlZEdyb3VwKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBuYW1lOiBzdHJpbmcgPSBcIlwiLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIik6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHcm91cChzdG9yYWdlLCBuYW1lLCBkZXNjcmlwdGlvbiwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQnVpbGQgdGhlIG1hbmFnZXIgZnJvbSB0aGUgY3VycmVudCBidWlsZGVyIHN0YXRlXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJ9XHJcbiAgICAgKiBAbWVtYmVyb2YgR2Rwck1hbmFnZXJCdWlsZGVyXHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKCk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHJldHVybiBHZHByTWFuYWdlci5jcmVhdGUodGhpcy5ncm91cHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kIHRoaXMgZ3JvdXAncyBjcmVhdGlvbiAobm8tb3AgZm9yIG1hbmFnZXIgYnVpbGRlcnMpXHJcbiAgICAgKiBAcmV0dXJucyB7R2Rwck1hbmFnZXJCdWlsZGVyfVxyXG4gICAgICogQG1lbWJlcm9mIEdkcHJNYW5hZ2VyQnVpbGRlclxyXG4gICAgICovXHJcbiAgICBlbmRHcm91cCgpOiBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByTWFuYWdlckJ1aWxkZXIsXHJcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9HZHByR3VhcmRCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwckdyb3VwQnVpbGRlclwiIiwiZXhwb3J0IHsgbWFrZUd1YXJkIH0gZnJvbSBcIi4vR2Rwckd1YXJkXCJcclxuZXhwb3J0IHsgR2Rwckd1YXJkR3JvdXAgfSBmcm9tIFwiLi9HZHByR3VhcmRHcm91cFwiXHJcbmV4cG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJcIlxyXG5leHBvcnQgeyBHZHByU3RvcmFnZSwgc3RvcmFnZUZyb21PcmRpbmFsIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5leHBvcnQgeyBHZHByTWFuYWdlckJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVycy9idWlsZGVyc1wiXHJcbmV4cG9ydCB7IEdkcHJEZXNlcmlhbGl6ZXIgfSBmcm9tIFwiLi9zZXJkZS9HZHByRGVzZXJpYWxpemVyXCJcclxuXHJcbi8qXHJcblxyXG5jb25zdCAkZ2RwcjogR2Rwck1hbmFnZXIgPSBHZHByTWFuYWdlckJ1aWxkZXIubWFrZSgpXHJcbi5zdGFydEdyb3VwKEdkcHJTdG9yYWdlLkNvb2tpZSwgXCJ0cmFja2luZ1wiKVxyXG4gICAgLndpdGhFbmFibGVkR3VhcmQoXCJHb29nbGUgVGFncyBBbmFseXRpY3NcIikgLy9jb29raWVcclxuICAgIC53aXRoRW5hYmxlZEd1YXJkKFwiQ29tcGFueS13aWRlIFRyYWNraW5nXCIsIFwiSG9tZWJyZXdlZCB0cmFja2luZyBzeXN0ZW1cIikgLy9jb29raWVcclxuLmVuZEdyb3VwKClcclxuLnN0YXJ0R3JvdXAoR2RwclN0b3JhZ2UuTG9jYWxTdG9yYWdlLCBcInN0eWxlc1wiKSAvL2xzXHJcbiAgICAuc3RhcnRHcm91cCgpLndpdGhOYW1lKFwidGhlbWVzXCIpIC8vbHNcclxuICAgICAgICAud2l0aEVuYWJsZWRHdWFyZChcImNvbG9yc1wiLCBcIlVzZXIgYmFzZWQgY29sb3Igc2NoZW1lXCIpIC8vbHNcclxuICAgICAgICAud2l0aEVuYWJsZWRHdWFyZChcIlwiKSAvL2xzXHJcbiAgICAuZW5kR3JvdXAoKVxyXG4uZW5kR3JvdXAoKVxyXG4uYnVpbGQoKTtcclxuXHJcbiovXHJcbiIsImltcG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4uL0dkcHJNYW5hZ2VyXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UsIHN0b3JhZ2VGcm9tT3JkaW5hbCB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkLCBtYWtlR3VhcmQgfSBmcm9tIFwiLi4vR2Rwckd1YXJkXCJcclxuXHJcbi8qKlxyXG4gKiBOYW1lc3BhY2UtbGlrZSBjbGFzcyB0aGF0IGFsbG93cyBkZXNlcmlhbGl6YXRpb24gZnJvbSByYXcgZm9ybWF0XHJcbiAqIEBhYnN0cmFjdFxyXG4gKiBAY2xhc3MgR2RwckRlc2VyaWFsaXplclxyXG4gKiBAZXhwb3J0XHJcbiAqL1xyXG5hYnN0cmFjdCBjbGFzcyBHZHByRGVzZXJpYWxpemVye1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXNlcmlhbGl6ZSBhIEdkcHJNYW5hZ2VyIGZyb20gaXRzIHJhdyByZXByZXNlbnRhdGlvblxyXG4gICAgICogQHBhcmFtIHthbnl9IHJhdyBUaGUgc2VyaWFsaXplZCBtYW5hZ2VyXHJcbiAgICAgKiBAcmV0dXJucyB7P0dkcHJNYW5hZ2VyfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJEZXNlcmlhbGl6ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG1hbmFnZXIocmF3OiBhbnkpOiBHZHByTWFuYWdlcnxudWxse1xyXG4gICAgICAgIGNvbnN0IGFsbEtleXMgPSBbXCJlbmFibGVkXCIsIFwiZ3JvdXBzXCJdLmV2ZXJ5KGtleSA9PiBrZXkgaW4gcmF3KTtcclxuICAgICAgICBjb25zdCB2YWxpZGF0ZUZpZWxkcyA9IGFsbEtleXNcclxuICAgICAgICAmJiB0eXBlb2YgcmF3LmVuYWJsZWQgPT0gXCJib29sZWFuXCJcclxuICAgICAgICAmJiBBcnJheS5pc0FycmF5KHJhdy5ncm91cHMpO1xyXG5cclxuICAgICAgICBpZighdmFsaWRhdGVGaWVsZHMpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBncm91cHM6IChHZHByR3VhcmRHcm91cHxudWxsKVtdID0gKDxhbnlbXT5yYXcuZ3JvdXBzKVxyXG4gICAgICAgIC5tYXAoZ3JvdXAgPT4gdGhpcy5ncm91cChncm91cCkpXHJcbiAgICAgICAgLmZpbHRlcihncm91cCA9PiBncm91cCAhPT0gbnVsbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBHZHByTWFuYWdlci5jcmVhdGUoW10pO1xyXG4gICAgICAgIG1hbmFnZXIuZW5hYmxlZCA9ICEhcmF3LmVuYWJsZWQ7XHJcblxyXG4gICAgICAgIGlmKCFncm91cHMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gbWFuYWdlci5hZGRHcm91cChncm91cCBhcyBHZHByR3VhcmRHcm91cCkpO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVzZXJpYWxpemUgYSBHZHByR3VhcmRHcm91cCBmcm9tIGl0cyByYXcgcmVwcmVzZW50YXRpb25cclxuICAgICAqIEBwYXJhbSB7YW55fSByYXcgVGhlIHNlcmlhbGl6ZWQgZ3JvdXBcclxuICAgICAqIEByZXR1cm5zIHs/R2Rwckd1YXJkR3JvdXB9XHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAbWVtYmVyb2YgR2RwckRlc2VyaWFsaXplclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ3JvdXAocmF3OiBhbnkpOiBHZHByR3VhcmRHcm91cHxudWxse1xyXG4gICAgICAgIGNvbnN0IGd1YXJkOiBHZHByR3VhcmR8bnVsbCA9IHRoaXMuZ3VhcmQocmF3KTtcclxuICAgICAgICBpZihndWFyZCA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGtleXMgPSBbXHJcbiAgICAgICAgICAgIFwiZ3VhcmRzXCIsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBhbGxLZXlzID0ga2V5cy5ldmVyeShrZXkgPT4ga2V5IGluIHJhdyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRmllbGRzID0gYWxsS2V5c1xyXG4gICAgICAgICYmIEFycmF5LmlzQXJyYXkocmF3Lmd1YXJkcyk7XHJcblxyXG4gICAgICAgIGlmKCF2YWxpZGF0ZUZpZWxkcylcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gR2Rwckd1YXJkR3JvdXAuZm9yKFxyXG4gICAgICAgICAgICBndWFyZC5uYW1lLFxyXG4gICAgICAgICAgICBndWFyZC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgZ3VhcmQuZW5hYmxlZCxcclxuICAgICAgICAgICAgZ3VhcmQucmVxdWlyZWRcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgZ3VhcmRzOiAoR2Rwckd1YXJkfG51bGwpW10gPSAoPGFueVtdPnJhdy5ndWFyZHMpXHJcbiAgICAgICAgLm1hcChndWFyZCA9PiBrZXlzLmV2ZXJ5KGtleSA9PiBrZXkgaW4gZ3VhcmQpID8gdGhpcy5ncm91cChndWFyZCkgOiB0aGlzLmd1YXJkKGd1YXJkKSlcclxuICAgICAgICAuZmlsdGVyKGd1YXJkID0+IGd1YXJkICE9PSBudWxsKTtcclxuXHJcbiAgICAgICAgaWYoIWd1YXJkcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBndWFyZHMuZm9yRWFjaChndWFyZCA9PiBncm91cC5hZGRHdWFyZChndWFyZCBhcyBHZHByR3VhcmQpKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXNlcmlhbGl6ZSBhIEdkcHJHdWFyZCBmcm9tIGl0cyByYXcgcmVwcmVzZW50YXRpb25cclxuICAgICAqIEBwYXJhbSB7YW55fSByYXcgVGhlIHNlcmlhbGl6ZWQgZ3VhcmRcclxuICAgICAqIEByZXR1cm5zIHs/R2Rwckd1YXJkfVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQG1lbWJlcm9mIEdkcHJEZXNlcmlhbGl6ZXJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGd1YXJkKHJhdzogYW55KTogR2Rwckd1YXJkfG51bGx7XHJcbiAgICAgICAgY29uc3QgYWxsS2V5cyA9IFtcclxuICAgICAgICAgICAgXCJuYW1lXCIsXHJcbiAgICAgICAgICAgIFwiZW5hYmxlZFwiLFxyXG4gICAgICAgICAgICBcInJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIixcclxuICAgICAgICAgICAgXCJzdG9yYWdlXCJcclxuICAgICAgICBdLmV2ZXJ5KGtleSA9PiBrZXkgaW4gcmF3KTtcclxuXHJcbiAgICAgICAgY29uc3QgdmFsaWRhdGVGaWVsZHMgPSBhbGxLZXlzXHJcbiAgICAgICAgJiYgdHlwZW9mIHJhdy5uYW1lID09IFwic3RyaW5nXCJcclxuICAgICAgICAmJiB0eXBlb2YgcmF3LmVuYWJsZWQgPT0gXCJib29sZWFuXCJcclxuICAgICAgICAmJiB0eXBlb2YgcmF3LnJlcXVpcmVkID09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgJiYgdHlwZW9mIHJhdy5kZXNjcmlwdGlvbiA9PSBcInN0cmluZ1wiXHJcbiAgICAgICAgJiYgdHlwZW9mIHJhdy5zdG9yYWdlID09IFwibnVtYmVyXCJcclxuICAgICAgICAmJiByYXcuc3RvcmFnZSBpbiAgR2RwclN0b3JhZ2U7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gIXZhbGlkYXRlRmllbGRzID8gbnVsbCA6IG1ha2VHdWFyZChcclxuICAgICAgICAgICAgcmF3Lm5hbWUsXHJcbiAgICAgICAgICAgIHJhdy5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgc3RvcmFnZUZyb21PcmRpbmFsKHJhdy5zdG9yYWdlKSBhcyBHZHByU3RvcmFnZSxcclxuICAgICAgICAgICAgISFyYXcucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICEhcmF3LmVuYWJsZWRcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2RwckRlc2VyaWFsaXplcixcclxufSJdLCJzb3VyY2VSb290IjoiIn0=