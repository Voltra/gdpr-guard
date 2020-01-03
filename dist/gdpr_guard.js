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
        return this.forEachGroup(function (group) { return group.enable(); });
    };
    GdprManager.prototype.disable = function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHByR3VhcmQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dkcHJHdWFyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwckd1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9HZHByR3VhcmRHcm91cC50cyIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL0dkcHJTdG9yYWdlLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3JvdXBCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3VhcmRCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByTWFuYWdlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL2J1aWxkZXJzL2J1aWxkZXJzLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9nZHByX2d1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEscUZBQTJDO0FBOEIzQyxTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsV0FBbUIsRUFBRSxPQUF5QyxFQUFFLFFBQXlCLEVBQUUsT0FBNEI7SUFBbEcsb0NBQXVCLHlCQUFXLENBQUMsTUFBTTtJQUFFLDJDQUF5QjtJQUFFLHdDQUE0QjtJQUNwSixPQUFPO1FBQ0gsSUFBSTtRQUNKLFdBQVc7UUFDWCxPQUFPO1FBQ1AsUUFBUTtRQUNSLE9BQU8sRUFBRSxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU87UUFDOUMsTUFBTTtZQUNGLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFDWixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbEIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU87WUFDSCxJQUFHLElBQUksQ0FBQyxPQUFPO2dCQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVsQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsTUFBTTtZQUNGLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNqQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsWUFBWTtZQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxTQUFTLFlBQUMsSUFBSTtZQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBQ0QsZ0JBQWdCLFlBQUMsSUFBSTtZQUNqQixJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87Z0JBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxpQkFBaUIsWUFBQyxJQUFJO1lBQ2xCLElBQUcsSUFBSSxDQUFDLE9BQU87Z0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxnQkFBZ0IsWUFBQyxJQUFJO1lBQ2pCLElBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtnQkFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxHQUFHLEVBQUg7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQUtHLDhCQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZiLHFGQUEyQztBQU8zQztJQUlJLHdCQUFtQixJQUFZLEVBQVMsV0FBd0IsRUFBUyxPQUF3QixFQUFTLFFBQXlCO1FBQTNGLDhDQUF3QjtRQUFTLHlDQUF3QjtRQUFTLDJDQUF5QjtRQUFoSCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBSHpILGFBQVEsR0FBMkIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN2QyxZQUFPLEdBQWdCLHlCQUFXLENBQUMsSUFBSSxDQUFDO1FBR3BELElBQUcsSUFBSSxDQUFDLFFBQVE7WUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRU0sa0JBQUcsR0FBVixVQUFXLElBQVksRUFBRSxXQUF3QixFQUFFLE9BQXdCLEVBQUUsUUFBeUI7UUFBN0UsOENBQXdCO1FBQUUseUNBQXdCO1FBQUUsMkNBQXlCO1FBQ2xHLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxLQUFnQjtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRVMsdUNBQWMsR0FBeEIsVUFBeUIsRUFBNkI7UUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBSyxJQUFJLFNBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsa0NBQVMsR0FBVCxVQUFVLElBQVk7O1FBQ2xCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUNuQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUcsS0FBSyxLQUFLLElBQUksRUFBQztnQkFDZCxPQUFtQixLQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3JDO1NBQ0o7O1lBRUQsS0FBd0Isc0JBQUksQ0FBQyxRQUFRLDZDQUFDO2dCQUE1Qiw0QkFBVSxFQUFULFNBQUMsRUFBRSxhQUFLO2dCQUNmLElBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQ3BCLE9BQU8sSUFBSSxDQUFDO2FBQ25COzs7Ozs7Ozs7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFLLElBQUksWUFBSyxDQUFDLE1BQU0sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxnQ0FBTyxHQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsT0FBTyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsWUFBWSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLElBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFLO1lBQzVCLElBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJO2dCQUNuQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLElBQWlCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFLO1lBQzVCLElBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJO2dCQUNuQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQseUNBQWdCLEdBQWhCLFVBQWlCLElBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFLO1lBQzVCLElBQUcsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJO2dCQUNuQixPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBRyxHQUFIO1FBQ0ksSUFBTSxHQUFHLEdBQXNCO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFFRixHQUFHLENBQUMsTUFBTSxHQUFHLFNBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBQyxFQUFVO2dCQUFWLGtCQUFVLEVBQVQsU0FBQyxFQUFFLGFBQUs7WUFBTSxZQUFLLENBQUMsR0FBRyxFQUFrQjtRQUEzQixDQUEyQixDQUFDLENBQUM7UUFFakYsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQUFDO0FBR0csd0NBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5R2xCLDhGQUFxRTtBQUVyRSxxRkFBNEM7QUFRNUM7SUFRSTtRQVBVLFdBQU0sR0FBZ0MsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqRCxTQUFJLEdBQVcsU0FBUyxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsOEJBQThCLENBQUM7UUFDOUQsWUFBTyxHQUFZLElBQUksQ0FBQztRQUNmLFlBQU8sR0FBZ0IseUJBQVcsQ0FBQyxJQUFJLENBQUM7UUFDakQsYUFBUSxHQUFZLEtBQUssQ0FBQztJQUcxQixDQUFDO0lBRWEsa0JBQU0sR0FBcEIsVUFBcUIsTUFBNkI7UUFBN0Isb0NBQTZCO1FBQzlDLElBQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFLLElBQUksY0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksSUFBWSxFQUFFLFdBQXdCO1FBQXhCLDhDQUF3QjtRQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsK0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUdELDhCQUFRLEdBQVIsVUFBUyxRQUF3QjtRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxzQ0FBZ0IsR0FBMUIsVUFBMkIsSUFBNkM7OztZQUNwRSxLQUF3QixzQkFBSSxDQUFDLE1BQU0sNkNBQUM7Z0JBQTFCLDRCQUFVLEVBQVQsU0FBQyxFQUFFLGFBQUs7Z0JBQ2YsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNWLE9BQU8sSUFBSSxDQUFDO2FBQ25COzs7Ozs7Ozs7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRVMsa0NBQVksR0FBdEIsVUFBdUIsRUFBdUM7UUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBSyxJQUFJLFNBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVk7OztZQUNqQixLQUF3QixzQkFBSSxDQUFDLE1BQU0sNkNBQUM7Z0JBQTFCLDRCQUFVLEVBQVQsU0FBQyxFQUFFLGFBQUs7Z0JBQ2YsSUFBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxJQUFZOzs7WUFDakIsS0FBd0Isc0JBQUksQ0FBQyxNQUFNLDZDQUFDO2dCQUExQiw0QkFBVSxFQUFULFNBQUMsRUFBRSxhQUFLO2dCQUNmLElBQUcsQ0FBQyxLQUFLLElBQUk7b0JBQ1QsT0FBTyxLQUFLLENBQUM7YUFDcEI7Ozs7Ozs7OztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsSUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFLLElBQUksWUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCw0QkFBTSxHQUFOO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsTUFBTSxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxPQUFPLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekQsQ0FBQztJQUVELGtDQUFZLEdBQVo7UUFFSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLElBQWlCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFLLElBQUksWUFBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHVDQUFpQixHQUFqQixVQUFrQixJQUFpQjtRQUMvQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBSyxJQUFJLFlBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBaUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQseUJBQUcsR0FBSDtRQUNJLElBQU0sR0FBRyxHQUFtQjtZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBRUYsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQUMsRUFBVTtnQkFBVixrQkFBVSxFQUFULFNBQUMsRUFBRSxhQUFLO1lBQU0sWUFBSyxDQUFDLEdBQUcsRUFBRTtRQUFYLENBQVcsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQztBQUdHLGtDQUFXOzs7Ozs7Ozs7Ozs7Ozs7QUN6SGYsSUFBSyxXQVNKO0FBVEQsV0FBSyxXQUFXO0lBQ1osNkNBQVU7SUFDVixpREFBYTtJQUNiLDZEQUFvQjtJQUNwQixpRUFBdUI7SUFDdkIsd0RBQW1CO0lBQ25CLDBEQUFvQjtJQUNwQixnRUFBdUI7SUFDdkIsNENBQXFGO0FBQ3pGLENBQUMsRUFUSSxXQUFXLEtBQVgsV0FBVyxRQVNmO0FBR0csa0NBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pmLHNGQUE0QztBQUM1QyxtSEFBeUQ7QUFFekQsK0ZBQWtEO0FBQ2xELDZHQUFxRDtBQUVyRDtJQUErQixvQ0FBa0I7SUFHN0MsMEJBQ2MsTUFBMEIsRUFDMUIsSUFBWSxFQUNaLFdBQW1CLEVBQzdCLE9BQW9CLEVBQ1YsTUFBZSxFQUNmLE9BQWdCO1FBTjlCLFlBUUksaUJBQU8sU0FJVjtRQVhhLFlBQU0sR0FBTixNQUFNLENBQW9CO1FBQzFCLFVBQUksR0FBSixJQUFJLENBQVE7UUFDWixpQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUVuQixZQUFNLEdBQU4sTUFBTSxDQUFTO1FBQ2YsYUFBTyxHQUFQLE9BQU8sQ0FBUztRQVJ2QixZQUFNLEdBQWdCLEVBQUUsQ0FBQztRQVc1QixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFHLE9BQU87WUFDTixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7SUFDM0IsQ0FBQztJQUVNLHFDQUFVLEdBQWpCLFVBQWtCLE9BQWdDLEVBQUUsSUFBaUIsRUFBRSxXQUF3QjtRQUE3RSx3Q0FBZ0M7UUFBRSxnQ0FBaUI7UUFBRSw4Q0FBd0I7UUFDM0YsT0FBTyxpQkFBTSxVQUFVLFlBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sNkNBQWtCLEdBQXpCLFVBQTBCLE9BQWdDLEVBQUUsSUFBaUIsRUFBRSxXQUF3QjtRQUE3RSx3Q0FBZ0M7UUFBRSxnQ0FBaUI7UUFBRSw4Q0FBd0I7UUFDbkcsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEUsQ0FBQztJQUVhLHVCQUFNLEdBQXBCLFVBQXFCLEVBQXNCLEVBQUUsSUFBWSxFQUFFLFdBQXdCLEVBQUUsT0FBZ0MsRUFBRSxPQUF1QixFQUFFLFFBQXdCO1FBQTdHLDhDQUF3QjtRQUFFLHdDQUFnQztRQUFFLHdDQUF1QjtRQUFFLDBDQUF3QjtRQUNwSyxPQUFPLElBQUksZ0JBQWdCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxJQUFJLHlCQUFXLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUNJLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFNLEtBQUssR0FBRywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRixJQUFNLE1BQU0sWUFBTyxJQUFJLENBQUMsTUFBTSxFQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQUssSUFBSSxZQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFFL0MsSUFBRyxJQUFJLENBQUMsT0FBTztZQUNYLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFUywrQkFBSSxHQUFkLFVBQWUsRUFBc0M7UUFDakQsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG1DQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFiLENBQWEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSwwQ0FBZSxHQUF0QixVQUF1QixXQUFtQjtRQUN0QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxFQUEzQixDQUEyQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLG1DQUFRLEdBQWYsVUFBZ0IsT0FBb0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxrQ0FBTyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsTUFBTSxHQUFHLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sbUNBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFDLElBQUksUUFBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0scUNBQVUsR0FBakIsVUFBa0IsT0FBeUI7UUFDdkMsT0FBTyxtQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sNkNBQWtCLEdBQXpCLFVBQTBCLE9BQXlCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRU0sMkNBQWdCLEdBQXZCLFVBQXdCLElBQVksRUFBRSxXQUF3QixFQUFFLE9BQWdDO1FBQTFELDhDQUF3QjtRQUFFLHdDQUFnQztRQUM1RixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2FBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDZCxlQUFlLENBQUMsV0FBVyxDQUFDO2FBQzVCLE9BQU8sRUFBRTthQUNiLFFBQVEsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFTSw0Q0FBaUIsR0FBeEIsVUFBeUIsSUFBWSxFQUFFLFdBQXdCLEVBQUUsT0FBZ0M7UUFBMUQsOENBQXdCO1FBQUUsd0NBQWdDO1FBQzdGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQzthQUNkLGVBQWUsQ0FBQyxXQUFXLENBQUM7YUFDNUIsUUFBUSxFQUFFO2FBQ2QsUUFBUSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxDQTlGOEIsdUNBQWtCLEdBOEZoRDtBQUdHLDRDQUFnQjs7Ozs7Ozs7Ozs7Ozs7O0FDdEdwQixzRkFBNEM7QUFDNUMsZ0ZBQXlDO0FBRXpDO0lBSUksMEJBQ2MsTUFBd0IsRUFDeEIsT0FBb0IsRUFDcEIsTUFBZSxFQUNmLE9BQWdCO1FBSGhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQWE7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUNmLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFQcEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUNsQixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQVEvQixJQUFHLE9BQU87WUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRU0sdUJBQU0sR0FBYixVQUFjLEVBQW9CLEVBQUUsT0FBeUMsRUFBRSxPQUF3QixFQUFFLFFBQXlCO1FBQTlGLG9DQUF1Qix5QkFBVyxDQUFDLE1BQU07UUFBRSx5Q0FBd0I7UUFBRSwyQ0FBeUI7UUFDOUgsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNDLElBQU0sS0FBSyxHQUFHLHFCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUV6RixJQUFHLElBQUksQ0FBQyxPQUFPO1lBQ1gsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVTLCtCQUFJLEdBQWQsVUFBZSxJQUF3QztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQVEsR0FBUixVQUFTLElBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBYixDQUFhLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsMENBQWUsR0FBZixVQUFnQixXQUFtQjtRQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxXQUFXLEdBQUcsV0FBVyxFQUEzQixDQUEyQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVMsT0FBb0I7UUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQUMsSUFBSSxRQUFDLENBQUMsT0FBTyxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUM7QUFHRyw0Q0FBZ0I7Ozs7Ozs7Ozs7Ozs7OztBQy9EcEIsc0ZBQTRDO0FBQzVDLHNGQUE0QztBQUM1QyxxRkFBNkM7QUFFN0M7SUFBQTtRQUNXLFlBQU8sR0FBZ0IseUJBQVcsQ0FBQyxNQUFNLENBQUM7UUFDMUMsV0FBTSxHQUFxQixFQUFFLENBQUM7SUE2QnpDLENBQUM7SUEzQmlCLHVCQUFJLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHVDQUFVLEdBQVYsVUFBVyxPQUFnQyxFQUFFLElBQWlCLEVBQUUsV0FBd0IsRUFBRSxPQUF1QjtRQUF0Ryx3Q0FBZ0M7UUFBRSxnQ0FBaUI7UUFBRSw4Q0FBd0I7UUFBRSx3Q0FBdUI7UUFDN0csT0FBTywyQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEIsVUFBbUIsT0FBZ0MsRUFBRSxJQUFpQixFQUFFLFdBQXdCO1FBQTdFLHdDQUFnQztRQUFFLGdDQUFpQjtRQUFFLDhDQUF3QjtRQUM1RixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdkUsQ0FBQztJQUVELDhDQUFpQixHQUFqQixVQUFrQixPQUFnQyxFQUFFLElBQWlCLEVBQUUsV0FBd0I7UUFBN0Usd0NBQWdDO1FBQUUsZ0NBQWlCO1FBQUUsOENBQXdCO1FBQzNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsK0NBQWtCLEdBQWxCLFVBQW1CLE9BQWdDLEVBQUUsSUFBaUIsRUFBRSxXQUF3QjtRQUE3RSx3Q0FBZ0M7UUFBRSxnQ0FBaUI7UUFBRSw4Q0FBd0I7UUFDNUYsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBQ0ksT0FBTyx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELHFDQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQUFDO0FBR0csZ0RBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q3RCLDhGQUFrQztBQUNsQyxrR0FBb0M7QUFDcEMsOEZBQWtDOzs7Ozs7Ozs7Ozs7Ozs7QUNGbEMsK0VBQXVDO0FBd0JuQyxvQkF4QksscUJBQVMsQ0F3Qkw7QUF2QmIsOEZBQWlEO0FBd0I3Qyx5QkF4QkssK0JBQWMsQ0F3Qkw7QUF2QmxCLHFGQUEyQztBQXdCdkMsc0JBeEJLLHlCQUFXLENBd0JMO0FBdkJmLHFGQUEyQztBQXdCdkMsc0JBeEJLLHlCQUFXLENBd0JMO0FBdkJmLDhGQUF3RDtBQXdCcEQsNkJBeEJLLDZCQUFrQixDQXdCTCIsImZpbGUiOiJnZHByX2d1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJnZHByR3VhcmRcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZ2Rwckd1YXJkXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImdkcHJHdWFyZFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZ2Rwcl9ndWFyZC50c1wiKTtcbiIsImltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5cclxuaW50ZXJmYWNlIEdkcHJHdWFyZHtcclxuICAgIHJlYWRvbmx5IG5hbWU6IHN0cmluZyxcclxuICAgIGVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcmVhZG9ubHkgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbiAgICByZXF1aXJlZDogYm9vbGVhbixcclxuXHJcbiAgICBpc0VuYWJsZWQobmFtZTogc3RyaW5nKTogYm9vbGVhbixcclxuXHJcbiAgICBlbmFibGUoKTogR2Rwckd1YXJkLFxyXG4gICAgZGlzYWJsZSgpOiBHZHByR3VhcmQsXHJcbiAgICB0b2dnbGUoKTogR2Rwckd1YXJkLFxyXG4gICAgbWFrZVJlcXVpcmVkKCk6IEdkcHJHdWFyZCxcclxuXHJcbiAgICBlbmFibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG4gICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmQsXHJcbiAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG4gICAgcmF3KCk6IG9iamVjdCxcclxufVxyXG5cclxuaW50ZXJmYWNlIEdkcHJHdWFyZFJhd3tcclxuICAgIG5hbWU6IHN0cmluZyxcclxuICAgIGVuYWJsZWQ6IGJvb2xlYW4sXHJcbiAgICByZXF1aXJlZDogYm9vbGVhbixcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUd1YXJkKG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Db29raWUsIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2UsIGVuYWJsZWQ6IGJvb2xlYW58bnVsbCA9IG51bGwpOiBHZHByR3VhcmR7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgc3RvcmFnZSxcclxuICAgICAgICByZXF1aXJlZCxcclxuICAgICAgICBlbmFibGVkOiBlbmFibGVkID09PSBudWxsID8gcmVxdWlyZWQgOiBlbmFibGVkLFxyXG4gICAgICAgIGVuYWJsZSgpe1xyXG4gICAgICAgICAgICBpZighdGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZSgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLmVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGUoKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMucmVxdWlyZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1ha2VSZXF1aXJlZCgpe1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc0VuYWJsZWQobmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWUgPT09IG5hbWUgJiYgdGhpcy5lbmFibGVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaXNhYmxlRm9yU3RvcmFnZSh0eXBlKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVGb3JTdG9yYWdlKHR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RvcmFnZSA9PSB0eXBlICYmICF0aGlzLnJlcXVpcmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByYXcoKTogR2Rwckd1YXJkUmF3e1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHdWFyZCxcclxuICAgIEdkcHJHdWFyZFJhdyxcclxuICAgIG1ha2VHdWFyZCxcclxufSIsImltcG9ydCB7IEdkcHJHdWFyZCwgR2Rwckd1YXJkUmF3IH0gZnJvbSBcIi4vR2Rwckd1YXJkXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZENvbGxlY3Rpb24gfSBmcm9tIFwiLi9HZHByR3VhcmRDb2xsZWN0aW9uXCJcclxuXHJcbmludGVyZmFjZSBHZHByR3VhcmRHcm91cFJhdyBleHRlbmRzIEdkcHJHdWFyZFJhd3tcclxuICAgIGd1YXJkczogR2Rwckd1YXJkUmF3W10sXHJcbn1cclxuXHJcbmNsYXNzIEdkcHJHdWFyZEdyb3VwIGltcGxlbWVudHMgR2Rwckd1YXJkQ29sbGVjdGlvbiB7XHJcbiAgICBwcm90ZWN0ZWQgYmluZGluZ3M6IE1hcDxzdHJpbmcsIEdkcHJHdWFyZD4gPSBuZXcgTWFwKCk7XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Ob25lO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgcHVibGljIGVuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZSwgcHVibGljIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmKHRoaXMucmVxdWlyZWQpXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvcihuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBlbmFibGVkOiBib29sZWFuID0gZmFsc2UsIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHdWFyZEdyb3VwKG5hbWUsIGRlc2NyaXB0aW9uLCBlbmFibGVkLCByZXF1aXJlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkR3VhcmQoZ3VhcmQ6IEdkcHJHdWFyZCk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3Muc2V0KGd1YXJkLm5hbWUsIGd1YXJkKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzLmhhcyhuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWFyZChuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmQgfCBudWxse1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzLmdldChuYW1lKSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb0ZvckVhY2hHdWFyZChjYjogKGd1YXJkOiBHZHByR3VhcmQpID0+IGFueSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChndWFyZCA9PiBjYihndWFyZCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuaGFzR3VhcmQobmFtZSkpe1xyXG4gICAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuZ2V0R3VhcmQobmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPEdkcHJHdWFyZD5ndWFyZCkuZW5hYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBndWFyZF0gb2YgdGhpcy5iaW5kaW5ncyl7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLmlzRW5hYmxlZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5lbmFibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkID8gdGhpcy5kaXNhYmxlKCkgOiB0aGlzLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1ha2VSZXF1aXJlZCgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvRm9yRWFjaEd1YXJkKGd1YXJkID0+IGd1YXJkLm1ha2VSZXF1aXJlZCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4ge1xyXG4gICAgICAgICAgICBpZihndWFyZC5zdG9yYWdlICYgdHlwZSlcclxuICAgICAgICAgICAgICAgIGd1YXJkLmVuYWJsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4ge1xyXG4gICAgICAgICAgICBpZihndWFyZC5zdG9yYWdlICYgdHlwZSlcclxuICAgICAgICAgICAgICAgIGd1YXJkLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9Gb3JFYWNoR3VhcmQoZ3VhcmQgPT4ge1xyXG4gICAgICAgICAgICBpZihndWFyZC5zdG9yYWdlICYgdHlwZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBndWFyZC50b2dnbGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByYXcoKTogR2Rwckd1YXJkR3JvdXBSYXd7XHJcbiAgICAgICAgY29uc3QgcmV0OiBHZHByR3VhcmRHcm91cFJhdyA9IHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGVkLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdGhpcy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgc3RvcmFnZTogdGhpcy5zdG9yYWdlLFxyXG4gICAgICAgICAgICBndWFyZHM6IFtdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldC5ndWFyZHMgPSBbLi4udGhpcy5iaW5kaW5nc10ubWFwKChbXywgZ3VhcmRdKSA9PiBndWFyZC5yYXcoKSBhcyBHZHByR3VhcmRSYXcpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwckd1YXJkR3JvdXAsXHJcbiAgICBHZHByR3VhcmRHcm91cFJhdyxcclxufSIsImltcG9ydCB7IEdkcHJHdWFyZCwgR2Rwckd1YXJkUmF3IH0gZnJvbSBcIi4vR2Rwckd1YXJkXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkR3JvdXAsIEdkcHJHdWFyZEdyb3VwUmF3IH0gZnJvbSBcIi4vR2Rwckd1YXJkR3JvdXBcIjtcclxuaW1wb3J0IHsgR2Rwckd1YXJkQ29sbGVjdGlvbiB9IGZyb20gXCIuL0dkcHJHdWFyZENvbGxlY3Rpb25cIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCI7XHJcblxyXG5pbnRlcmZhY2UgR2Rwck1hbmFnZXJSYXd7XHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgZ3JvdXBzOiBHZHByR3VhcmRHcm91cFJhd1tdLFxyXG59XHJcblxyXG5cclxuY2xhc3MgR2Rwck1hbmFnZXIgaW1wbGVtZW50cyBHZHByR3VhcmRDb2xsZWN0aW9ue1xyXG4gICAgcHJvdGVjdGVkIGdyb3VwczogTWFwPHN0cmluZywgR2Rwckd1YXJkR3JvdXA+ID0gbmV3IE1hcCgpO1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gXCJtYW5hZ2VyXCI7XHJcbiAgICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJNYW5hZ2VyIG9mIEdEUFIgZ3VhcmQgZ3JvdXBzXCI7XHJcbiAgICBlbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuICAgIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCl7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZ3JvdXBzOiBHZHByR3VhcmRHcm91cFtdID0gW10pOiBHZHByTWFuYWdlcntcclxuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbmV3IEdkcHJNYW5hZ2VyKCk7XHJcbiAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gbWFuYWdlci5hZGRHcm91cChncm91cCkpO1xyXG4gICAgICAgIHJldHVybiBtYW5hZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUdyb3VwKG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByTWFuYWdlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRHcm91cChHZHByR3VhcmRHcm91cC5mb3IobmFtZSwgZGVzY3JpcHRpb24pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgYWRkR3JvdXAoY2F0ZWdvcnk6IEdkcHJHdWFyZEdyb3VwKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgdGhpcy5ncm91cHMuc2V0KGNhdGVnb3J5Lm5hbWUsIGNhdGVnb3J5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVkdWNlR3JvdXBzUHJlZChwcmVkOiAoZ3JvdXA6IEdkcHJHdWFyZENvbGxlY3Rpb24pID0+IGJvb2xlYW4pOiBib29sZWFue1xyXG4gICAgICAgIGZvcihjb25zdCBbXywgZ3JvdXBdIG9mIHRoaXMuZ3JvdXBzKXtcclxuICAgICAgICAgICAgaWYocHJlZChncm91cCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBmb3JFYWNoR3JvdXAoY2I6IChncm91cDogR2Rwckd1YXJkQ29sbGVjdGlvbikgPT4gYW55KTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChncm91cCA9PiBjYihncm91cCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0d1YXJkKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAuaGFzR3VhcmQobmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEd1YXJkKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZCB8IG51bGwge1xyXG4gICAgICAgIGZvcihjb25zdCBbXywgZ3JvdXBdIG9mIHRoaXMuZ3JvdXBzKXtcclxuICAgICAgICAgICAgaWYoZ3JvdXAuaGFzR3VhcmQobmFtZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXAuZ2V0R3VhcmQobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0dyb3VwKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZHVjZUdyb3Vwc1ByZWQoZ3JvdXAgPT4gZ3JvdXAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R3JvdXAobmFtZTogc3RyaW5nKTogR2Rwckd1YXJkR3JvdXAgfCBudWxsIHtcclxuICAgICAgICBmb3IoY29uc3QgW24sIGdyb3VwXSBvZiB0aGlzLmdyb3Vwcyl7XHJcbiAgICAgICAgICAgIGlmKG4gPT09IG5hbWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLmlzRW5hYmxlZChuYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlKCk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAuZW5hYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW5hYmxlZCA/IHRoaXMuZGlzYWJsZSgpIDogdGhpcy5lbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYWtlUmVxdWlyZWQoKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgLy8gbm9vcFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IGdyb3VwLmVuYWJsZUZvclN0b3JhZ2UodHlwZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiBncm91cC5kaXNhYmxlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmF3KCk6IEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgICAgIGNvbnN0IHJldDogR2Rwck1hbmFnZXJSYXcgPSB7XHJcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuZW5hYmxlZCxcclxuICAgICAgICAgICAgZ3JvdXBzOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXQuZ3JvdXBzID0gWy4uLnRoaXMuZ3JvdXBzXS5tYXAoKFtfLCBncm91cF0pID0+IGdyb3VwLnJhdygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJNYW5hZ2VyLFxyXG4gICAgR2Rwck1hbmFnZXJSYXcsXHJcbn0iLCJlbnVtIEdkcHJTdG9yYWdle1xyXG4gICAgTm9uZSA9IDBiMSxcclxuICAgIENvb2tpZSA9IDBiMTAsXHJcbiAgICBMb2NhbFN0b3JhZ2UgPSAwYjEwMCxcclxuICAgIFNlc3Npb25TdG9yYWdlID0gMGIxMDAwLFxyXG4gICAgSW5kZXhlZERiID0gMGIxMDAwMCxcclxuICAgIEZpbGVTeXN0ZW0gPSAwYjEwMDAwLFxyXG4gICAgU2VydmVyU3RvcmFnZSA9IDBiMTAwMDAsXHJcbiAgICBBbGwgPSBDb29raWUgfCBMb2NhbFN0b3JhZ2UgfCBTZXNzaW9uU3RvcmFnZSB8IEluZGV4ZWREYiB8IEZpbGVTeXN0ZW0gfCBTZXJ2ZXJTdG9yYWdlLFxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2RwclN0b3JhZ2UsXHJcbn0iLCJpbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyQnVpbGRlciB9IGZyb20gXCIuL0dkcHJNYW5hZ2VyQnVpbGRlclwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCB9IGZyb20gXCIuLi9HZHByR3VhcmRHcm91cFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEJ1aWxkZXIgfSBmcm9tIFwiLi9HZHByR3VhcmRCdWlsZGVyXCJcclxuXHJcbmNsYXNzIEdkcHJHcm91cEJ1aWxkZXIgZXh0ZW5kcyBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICBwdWJsaWMgZ3VhcmRzOiBHZHByR3VhcmRbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgcGFyZW50OiBHZHByTWFuYWdlckJ1aWxkZXIgLFxyXG4gICAgICAgIHByb3RlY3RlZCBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgcHJvdGVjdGVkIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuYWJsZTogYm9vbGVhbixcclxuICAgICAgICBwcm90ZWN0ZWQgcmVxdWlyZTogYm9vbGVhbixcclxuICAgICl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIGlmKHJlcXVpcmUpXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiBzdXBlci5zdGFydEdyb3VwKHN0b3JhZ2UgfHwgdGhpcy5wYXJlbnQuc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFJlcXVpcmVkR3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uKS5yZXF1aXJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKG1iOiBHZHByTWFuYWdlckJ1aWxkZXIsIG5hbWU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwgPSBudWxsLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSwgcmVxdWlyZWQ6IGJvb2xlYW4gPSB0cnVlKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJHcm91cEJ1aWxkZXIobWIsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlIHx8IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmRHcm91cCgpOiBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlID0gdGhpcy5yZXF1aXJlIHx8IHRoaXMuZW5hYmxlO1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gR2Rwckd1YXJkR3JvdXAuZm9yKHRoaXMubmFtZSwgdGhpcy5kZXNjcmlwdGlvbiwgZW5hYmxlLCB0aGlzLnJlcXVpcmUpO1xyXG4gICAgICAgIGNvbnN0IGd1YXJkcyA9IFsuLi50aGlzLmd1YXJkcywgLi4udGhpcy5ncm91cHNdO1xyXG4gICAgICAgIGd1YXJkcy5mb3JFYWNoKGd1YXJkID0+IGdyb3VwLmFkZEd1YXJkKGd1YXJkKSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVxdWlyZSlcclxuICAgICAgICAgICAgZ3JvdXAubWFrZVJlcXVpcmVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50Lmdyb3Vwcy5wdXNoKGdyb3VwKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVkaXQoY2I6IChidWlsZGVyOiBHZHByR3JvdXBCdWlsZGVyKSA9PiBhbnkpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIGNiKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoTmFtZShuYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLm5hbWUgPSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9yZWRJbihzdG9yYWdlOiBHZHByU3RvcmFnZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuc3RvcmFnZSA9IHN0b3JhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmFibGVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1aXJlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLnJlcXVpcmUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRHdWFyZChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gR2Rwckd1YXJkQnVpbGRlci5jcmVhdGUodGhpcywgc3RvcmFnZSB8fCB0aGlzLnN0b3JhZ2UsIHRoaXMuZW5hYmxlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRSZXF1aXJlZEd1YXJkKHN0b3JhZ2U6IEdkcHJTdG9yYWdlfG51bGwpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSkucmVxdWlyZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aEVuYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmVuYWJsZWQoKVxyXG4gICAgICAgIC5lbmRHdWFyZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoRGlzYWJsZWRHdWFyZChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnRHdWFyZChzdG9yYWdlKVxyXG4gICAgICAgICAgICAud2l0aE5hbWUobmFtZSlcclxuICAgICAgICAgICAgLndpdGhEZXNjcmlwdGlvbihkZXNjcmlwdGlvbilcclxuICAgICAgICAgICAgLmRpc2FibGVkKClcclxuICAgICAgICAuZW5kR3VhcmQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHcm91cEJ1aWxkZXIsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3JvdXBCdWlsZGVyIH0gZnJvbSBcIi4vYnVpbGRlcnNcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IG1ha2VHdWFyZCB9IGZyb20gXCIuLi9HZHByR3VhcmRcIjtcclxuXHJcbmNsYXNzIEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICBwcm90ZWN0ZWQgbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByb3RlY3RlZCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJvdGVjdGVkIHBhcmVudDogR2Rwckdyb3VwQnVpbGRlcixcclxuICAgICAgICBwcm90ZWN0ZWQgc3RvcmFnZTogR2RwclN0b3JhZ2UsXHJcbiAgICAgICAgcHJvdGVjdGVkIGVuYWJsZTogYm9vbGVhbixcclxuICAgICAgICBwcm90ZWN0ZWQgcmVxdWlyZTogYm9vbGVhbixcclxuICAgICl7XHJcbiAgICAgICAgaWYocmVxdWlyZSlcclxuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGUoZ2I6IEdkcHJHcm91cEJ1aWxkZXIsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuQ29va2llLCBlbmFibGVkOiBib29sZWFuID0gZmFsc2UsIHJlcXVpcmVkOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIHJldHVybiBuZXcgR2Rwckd1YXJkQnVpbGRlcihnYiwgc3RvcmFnZSwgZW5hYmxlZCwgcmVxdWlyZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuZEd1YXJkKCk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlID0gdGhpcy5yZXF1aXJlIHx8IHRoaXMuZW5hYmxlO1xyXG4gICAgICAgIGNvbnN0IGd1YXJkID0gbWFrZUd1YXJkKHRoaXMubmFtZSwgdGhpcy5kZXNjcmlwdGlvbiwgdGhpcy5zdG9yYWdlLCB0aGlzLnJlcXVpcmUsIGVuYWJsZSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMucmVxdWlyZSlcclxuICAgICAgICAgICAgZ3VhcmQubWFrZVJlcXVpcmVkKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGFyZW50Lmd1YXJkcy5wdXNoKGd1YXJkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVkaXQoZWRpdDogKGJ1aWxkZXI6IEdkcHJHdWFyZEJ1aWxkZXIpID0+IGFueSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgZWRpdCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTmFtZShuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLm5hbWUgPSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZyk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlZCgpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmVuYWJsZSA9IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVkKCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWlyZWQoKTogR2Rwckd1YXJkQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5yZXF1aXJlID0gdHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmRCdWlsZGVyLFxyXG59IiwiaW1wb3J0IHsgR2Rwckd1YXJkR3JvdXAgfSBmcm9tIFwiLi4vR2Rwckd1YXJkR3JvdXBcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4uL0dkcHJNYW5hZ2VyXCJcclxuaW1wb3J0IHsgR2Rwckdyb3VwQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXJzXCJcclxuXHJcbmNsYXNzIEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgIHB1YmxpYyBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZTtcclxuICAgIHB1YmxpYyBncm91cHM6IEdkcHJHdWFyZEdyb3VwW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2UoKXtcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJNYW5hZ2VyQnVpbGRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHcm91cEJ1aWxkZXIuY3JlYXRlKHRoaXMsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlLCBlbmFibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydFJlcXVpcmVkR3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0cnVlKS5lbmFibGVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFbmFibGVkR3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydERpc2FibGVkR3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydEdyb3VwKHN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGQoKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJNYW5hZ2VyLmNyZWF0ZSh0aGlzLmdyb3Vwcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kR3JvdXAoKTogR2Rwck1hbmFnZXJCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwck1hbmFnZXJCdWlsZGVyLFxyXG59IiwiZXhwb3J0ICogZnJvbSBcIi4vR2Rwckd1YXJkQnVpbGRlclwiXHJcbmV4cG9ydCAqIGZyb20gXCIuL0dkcHJNYW5hZ2VyQnVpbGRlclwiXHJcbmV4cG9ydCAqIGZyb20gXCIuL0dkcHJHcm91cEJ1aWxkZXJcIiIsImltcG9ydCB7IG1ha2VHdWFyZCB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXG5pbXBvcnQgeyBHZHByR3VhcmRHcm91cCB9IGZyb20gXCIuL0dkcHJHdWFyZEdyb3VwXCJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJcIlxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi9HZHByU3RvcmFnZVwiXG5pbXBvcnQgeyBHZHByTWFuYWdlckJ1aWxkZXIgfSBmcm9tIFwiLi9idWlsZGVycy9idWlsZGVyc1wiXG5cbi8qXG5cbmNvbnN0ICRnZHByOiBHZHByTWFuYWdlciA9IEdkcHJNYW5hZ2VyQnVpbGRlci5tYWtlKClcbi5zdGFydEdyb3VwKEdkcHJTdG9yYWdlLkNvb2tpZSwgXCJ0cmFja2luZ1wiKVxuICAgIC53aXRoRW5hYmxlZEd1YXJkKFwiR29vZ2xlIFRhZ3MgQW5hbHl0aWNzXCIpIC8vY29va2llXG4gICAgLndpdGhFbmFibGVkR3VhcmQoXCJDb21wYW55LXdpZGUgVHJhY2tpbmdcIiwgXCJIb21lYnJld2VkIHRyYWNraW5nIHN5c3RlbVwiKSAvL2Nvb2tpZVxuLmVuZEdyb3VwKClcbi5zdGFydEdyb3VwKEdkcHJTdG9yYWdlLkxvY2FsU3RvcmFnZSwgXCJzdHlsZXNcIikgLy9sc1xuICAgIC5zdGFydEdyb3VwKCkud2l0aE5hbWUoXCJ0aGVtZXNcIikgLy9sc1xuICAgICAgICAud2l0aEVuYWJsZWRHdWFyZChcImNvbG9yc1wiLCBcIlVzZXIgYmFzZWQgY29sb3Igc2NoZW1lXCIpIC8vbHNcbiAgICAgICAgLndpdGhFbmFibGVkR3VhcmQoXCJcIikgLy9sc1xuICAgIC5lbmRHcm91cCgpXG4uZW5kR3JvdXAoKVxuLmJ1aWxkKCk7XG5cbiovXG5cbmV4cG9ydCB7XG4gICAgbWFrZUd1YXJkLFxuICAgIEdkcHJHdWFyZEdyb3VwLFxuICAgIEdkcHJNYW5hZ2VyLFxuICAgIEdkcHJTdG9yYWdlLFxuICAgIEdkcHJNYW5hZ2VyQnVpbGRlcixcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=