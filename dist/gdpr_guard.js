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
function makeGuard(name, description, storage, enabled) {
    if (storage === void 0) { storage = GdprStorage_1.GdprStorage.Cookie; }
    if (enabled === void 0) { enabled = false; }
    return {
        name: name,
        description: description,
        storage: storage,
        enabled: enabled,
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
            this.enabled = !this.enabled;
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
            if (this.storage == type)
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
    function GdprGuardGroup(name, description, enabled) {
        if (description === void 0) { description = ""; }
        if (enabled === void 0) { enabled = false; }
        this.name = name;
        this.description = description;
        this.enabled = enabled;
        this.bindings = new Map();
        this.storage = GdprStorage_1.GdprStorage.None;
    }
    GdprGuardGroup.for = function (name, description, enabled) {
        if (description === void 0) { description = ""; }
        if (enabled === void 0) { enabled = false; }
        return new GdprGuardGroup(name, description, enabled);
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
        return this.forEachGroup(function (group) {
            if (group.name !== GdprManager.REQUIRED_GROUP)
                group.disable();
        });
    };
    GdprManager.prototype.toggle = function () {
        return this.enabled ? this.disable() : this.enable();
    };
    GdprManager.prototype.enableForStorage = function (type) {
        return this.forEachGroup(function (group) { return group.enableForStorage(type); });
    };
    GdprManager.prototype.disableForStorage = function (type) {
        return this.forEachGroup(function (group) {
            if (group.name !== GdprManager.REQUIRED_GROUP)
                group.disableForStorage(type);
        });
    };
    GdprManager.prototype.toggleForStorage = function (type) {
        return this.forEachGroup(function (group) {
            if (group.name !== GdprManager.REQUIRED_GROUP)
                group.toggleForStorage(type);
        });
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
    GdprManager.REQUIRED_GROUP = "REQUIRED";
    GdprManager.REQUIRED_GROUP_DESC = "Features that cannot be disabled";
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
    function GdprGroupBuilder(parent, name, description, storage, enable) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        _this.name = name;
        _this.description = description;
        _this.enable = enable;
        _this.guards = [];
        _this.storage = storage;
        return _this;
    }
    GdprGroupBuilder.prototype.startGroup = function (storage, name, description) {
        if (storage === void 0) { storage = null; }
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        return _super.prototype.startGroup.call(this, storage || this.parent.storage, name, description);
    };
    GdprGroupBuilder.create = function (mb, name, description, storage, enabled) {
        if (description === void 0) { description = ""; }
        if (storage === void 0) { storage = null; }
        if (enabled === void 0) { enabled = true; }
        return new GdprGroupBuilder(mb, name, description, storage || GdprStorage_1.GdprStorage.Cookie, enabled);
    };
    GdprGroupBuilder.prototype.endGroup = function () {
        var group = GdprGuardGroup_1.GdprGuardGroup.for(this.name, this.description, this.enable);
        var guards = __spread(this.guards, this.groups);
        guards.forEach(function (guard) { return group.addGuard(guard); });
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
    GdprGroupBuilder.prototype.startGuard = function (storage) {
        return GdprGuardBuilder_1.GdprGuardBuilder.create(this, storage || this.storage, this.enable);
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
    function GdprGuardBuilder(parent, storage, enable) {
        this.parent = parent;
        this.storage = storage;
        this.enable = enable;
        this.name = "";
        this.description = "";
    }
    GdprGuardBuilder.create = function (gb, storage, enabled) {
        if (storage === void 0) { storage = GdprStorage_1.GdprStorage.Cookie; }
        if (enabled === void 0) { enabled = false; }
        return new GdprGuardBuilder(gb, storage, enabled);
    };
    GdprGuardBuilder.prototype.endGuard = function () {
        var guard = GdprGuard_1.makeGuard(this.name, this.description, this.storage, this.enable);
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
var REQUIRED_GROUP = GdprManager_1.GdprManager.REQUIRED_GROUP, REQUIRED_GROUP_DESC = GdprManager_1.GdprManager.REQUIRED_GROUP_DESC;
exports.REQUIRED_GROUP = REQUIRED_GROUP;
exports.REQUIRED_GROUP_DESC = REQUIRED_GROUP_DESC;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZHByR3VhcmQvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2dkcHJHdWFyZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwckd1YXJkLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9HZHByR3VhcmRHcm91cC50cyIsIndlYnBhY2s6Ly9nZHByR3VhcmQvLi9zcmMvR2Rwck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL0dkcHJTdG9yYWdlLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3JvdXBCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByR3VhcmRCdWlsZGVyLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9idWlsZGVycy9HZHByTWFuYWdlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vZ2Rwckd1YXJkLy4vc3JjL2J1aWxkZXJzL2J1aWxkZXJzLnRzIiwid2VicGFjazovL2dkcHJHdWFyZC8uL3NyYy9nZHByX2d1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFD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TyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGtDQUFLLEdBQUw7UUFDSSxPQUFPLHlCQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQscUNBQVEsR0FBUjtRQUNJLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUM7QUFHRyxnREFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DdEIsOEZBQWtDO0FBQ2xDLGtHQUFvQztBQUNwQyw4RkFBa0M7Ozs7Ozs7Ozs7Ozs7OztBQ0ZsQywrRUFBdUM7QUEwQm5DLG9CQTFCSyxxQkFBUyxDQTBCTDtBQXpCYiw4RkFBaUQ7QUEwQjdDLHlCQTFCSywrQkFBYyxDQTBCTDtBQXpCbEIscUZBQTJDO0FBMEJ2QyxzQkExQksseUJBQVcsQ0EwQkw7QUF6QmYscUZBQTJDO0FBMEJ2QyxzQkExQksseUJBQVcsQ0EwQkw7QUF6QmYsOEZBQXdEO0FBMEJwRCw2QkExQkssNkJBQWtCLENBMEJMO0FBUGQsNkRBQWMsRUFBRSxtRUFBbUIsQ0FBaUI7QUFReEQsd0NBQWM7QUFDZCxrREFBbUIiLCJmaWxlIjoiZ2Rwcl9ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZ2Rwckd1YXJkXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdkcHJHdWFyZFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJnZHByR3VhcmRcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2dkcHJfZ3VhcmQudHNcIik7XG4iLCJpbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcclxuXHJcbmludGVyZmFjZSBHZHByR3VhcmR7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG5cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFuLFxyXG5cclxuICAgIGVuYWJsZSgpOiBHZHByR3VhcmQsXHJcbiAgICBkaXNhYmxlKCk6IEdkcHJHdWFyZCxcclxuICAgIHRvZ2dsZSgpOiBHZHByR3VhcmQsXHJcblxyXG4gICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuICAgIGRpc2FibGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwckd1YXJkLFxyXG4gICAgdG9nZ2xlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJHdWFyZCxcclxuICAgIHJhdygpOiBvYmplY3QsXHJcbn1cclxuXHJcbmludGVyZmFjZSBHZHByR3VhcmRSYXd7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbmFibGVkOiBib29sZWFuLFxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlR3VhcmQobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZSwgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlKTogR2Rwckd1YXJke1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHN0b3JhZ2UsXHJcbiAgICAgICAgZW5hYmxlZCxcclxuICAgICAgICBlbmFibGUoKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpc2FibGUoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5lbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9nZ2xlKCl7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9ICF0aGlzLmVuYWJsZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaXNFbmFibGVkKG5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lID09PSBuYW1lICYmIHRoaXMuZW5hYmxlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUZvclN0b3JhZ2UodHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZSl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZW5hYmxlZClcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGUpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0b3JhZ2UgPT0gdHlwZSlcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmF3KCk6IEdkcHJHdWFyZFJhd3tcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmQsXHJcbiAgICBHZHByR3VhcmRSYXcsXHJcbiAgICBtYWtlR3VhcmQsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3VhcmQsIEdkcHJHdWFyZFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBHZHByR3VhcmRDb2xsZWN0aW9uIH0gZnJvbSBcIi4vR2Rwckd1YXJkQ29sbGVjdGlvblwiXHJcblxyXG5pbnRlcmZhY2UgR2Rwckd1YXJkR3JvdXBSYXcgZXh0ZW5kcyBHZHByR3VhcmRSYXd7XHJcbiAgICBndWFyZHM6IEdkcHJHdWFyZFJhd1tdLFxyXG59XHJcblxyXG5jbGFzcyBHZHByR3VhcmRHcm91cCBpbXBsZW1lbnRzIEdkcHJHdWFyZENvbGxlY3Rpb24ge1xyXG4gICAgcHJvdGVjdGVkIGJpbmRpbmdzOiBNYXA8c3RyaW5nLCBHZHByR3VhcmQ+ID0gbmV3IE1hcCgpO1xyXG4gICAgcHVibGljIHJlYWRvbmx5IHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuTm9uZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIsIHB1YmxpYyBlbmFibGVkOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmb3IobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgZW5hYmxlZDogYm9vbGVhbiA9IGZhbHNlKTogR2Rwckd1YXJkR3JvdXB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHZHByR3VhcmRHcm91cChuYW1lLCBkZXNjcmlwdGlvbiwgZW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkR3VhcmQoZ3VhcmQ6IEdkcHJHdWFyZCk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3Muc2V0KGd1YXJkLm5hbWUsIGd1YXJkKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzLmhhcyhuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWFyZChuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmQgfCBudWxse1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzLmdldChuYW1lKSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkb0ZvckVhY2hHdWFyZChjYjogKGd1YXJkOiBHZHByR3VhcmQpID0+IGFueSk6IEdkcHJHdWFyZEdyb3Vwe1xyXG4gICAgICAgIHRoaXMuYmluZGluZ3MuZm9yRWFjaChndWFyZCA9PiBjYihndWFyZCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZChuYW1lOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgICAgIGlmKHRoaXMuaGFzR3VhcmQobmFtZSkpe1xyXG4gICAgICAgICAgICBjb25zdCBndWFyZCA9IHRoaXMuZ2V0R3VhcmQobmFtZSk7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPEdkcHJHdWFyZD5ndWFyZCkuZW5hYmxlZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IFtfLCBndWFyZF0gb2YgdGhpcy5iaW5kaW5ncyl7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLmlzRW5hYmxlZChuYW1lKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5lbmFibGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiBndWFyZC5kaXNhYmxlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSgpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbmFibGVkID8gdGhpcy5kaXNhYmxlKCkgOiB0aGlzLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLnN0b3JhZ2UgJiB0eXBlKVxyXG4gICAgICAgICAgICAgICAgZ3VhcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLnN0b3JhZ2UgJiB0eXBlKVxyXG4gICAgICAgICAgICAgICAgZ3VhcmQuZGlzYWJsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByR3VhcmRHcm91cHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb0ZvckVhY2hHdWFyZChndWFyZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGd1YXJkLnN0b3JhZ2UgJiB0eXBlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGd1YXJkLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJhdygpOiBHZHByR3VhcmRHcm91cFJhd3tcclxuICAgICAgICBjb25zdCByZXQ6IEdkcHJHdWFyZEdyb3VwUmF3ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBlbmFibGVkOiB0aGlzLmVuYWJsZWQsXHJcbiAgICAgICAgICAgIHN0b3JhZ2U6IHRoaXMuc3RvcmFnZSxcclxuICAgICAgICAgICAgZ3VhcmRzOiBbXSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXQuZ3VhcmRzID0gWy4uLnRoaXMuYmluZGluZ3NdLm1hcCgoW18sIGd1YXJkXSkgPT4gZ3VhcmQucmF3KCkgYXMgR2Rwckd1YXJkUmF3KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICAgIEdkcHJHdWFyZEdyb3VwLFxyXG4gICAgR2Rwckd1YXJkR3JvdXBSYXcsXHJcbn0iLCJpbXBvcnQgeyBHZHByR3VhcmQsIEdkcHJHdWFyZFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwLCBHZHByR3VhcmRHcm91cFJhdyB9IGZyb20gXCIuL0dkcHJHdWFyZEdyb3VwXCI7XHJcbmltcG9ydCB7IEdkcHJHdWFyZENvbGxlY3Rpb24gfSBmcm9tIFwiLi9HZHByR3VhcmRDb2xsZWN0aW9uXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi9HZHByU3RvcmFnZVwiO1xyXG5cclxuaW50ZXJmYWNlIEdkcHJNYW5hZ2VyUmF3e1xyXG4gICAgZW5hYmxlZDogYm9vbGVhbixcclxuICAgIGdyb3VwczogR2Rwckd1YXJkR3JvdXBSYXdbXSxcclxufVxyXG5cclxuXHJcbmNsYXNzIEdkcHJNYW5hZ2VyIGltcGxlbWVudHMgR2Rwckd1YXJkQ29sbGVjdGlvbntcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVRVUlSRURfR1JPVVA6IHN0cmluZyA9IFwiUkVRVUlSRURcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUkVRVUlSRURfR1JPVVBfREVTQzogc3RyaW5nID0gXCJGZWF0dXJlcyB0aGF0IGNhbm5vdCBiZSBkaXNhYmxlZFwiO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ3JvdXBzOiBNYXA8c3RyaW5nLCBHZHByR3VhcmRHcm91cD4gPSBuZXcgTWFwKCk7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmcgPSBcIm1hbmFnZXJcIjtcclxuICAgIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIk1hbmFnZXIgb2YgR0RQUiBndWFyZCBncm91cHNcIjtcclxuICAgIGVuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcmVhZG9ubHkgc3RvcmFnZTogR2RwclN0b3JhZ2UgPSBHZHByU3RvcmFnZS5Ob25lO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdyb3VwczogR2Rwckd1YXJkR3JvdXBbXSA9IFtdKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgY29uc3QgbWFuYWdlciA9IG5ldyBHZHByTWFuYWdlcigpO1xyXG4gICAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IG1hbmFnZXIuYWRkR3JvdXAoZ3JvdXApKTtcclxuICAgICAgICByZXR1cm4gbWFuYWdlcjtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVHcm91cChuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwck1hbmFnZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkR3JvdXAoR2Rwckd1YXJkR3JvdXAuZm9yKG5hbWUsIGRlc2NyaXB0aW9uKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGFkZEdyb3VwKGNhdGVnb3J5OiBHZHByR3VhcmRHcm91cCk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHRoaXMuZ3JvdXBzLnNldChjYXRlZ29yeS5uYW1lLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZHVjZUdyb3Vwc1ByZWQocHJlZDogKGdyb3VwOiBHZHByR3VhcmRDb2xsZWN0aW9uKSA9PiBib29sZWFuKTogYm9vbGVhbntcclxuICAgICAgICBmb3IoY29uc3QgW18sIGdyb3VwXSBvZiB0aGlzLmdyb3Vwcyl7XHJcbiAgICAgICAgICAgIGlmKHByZWQoZ3JvdXApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZm9yRWFjaEdyb3VwKGNiOiAoZ3JvdXA6IEdkcHJHdWFyZENvbGxlY3Rpb24pID0+IGFueSk6IEdkcHJNYW5hZ2Vye1xyXG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gY2IoZ3JvdXApKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBoYXNHdWFyZChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLmhhc0d1YXJkKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHdWFyZChuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmQgfCBudWxsIHtcclxuICAgICAgICBmb3IoY29uc3QgW18sIGdyb3VwXSBvZiB0aGlzLmdyb3Vwcyl7XHJcbiAgICAgICAgICAgIGlmKGdyb3VwLmhhc0d1YXJkKG5hbWUpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwLmdldEd1YXJkKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBoYXNHcm91cChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWR1Y2VHcm91cHNQcmVkKGdyb3VwID0+IGdyb3VwLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEdyb3VwKG5hbWU6IHN0cmluZyk6IEdkcHJHdWFyZEdyb3VwIHwgbnVsbCB7XHJcbiAgICAgICAgZm9yKGNvbnN0IFtuLCBncm91cF0gb2YgdGhpcy5ncm91cHMpe1xyXG4gICAgICAgICAgICBpZihuID09PSBuYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpc0VuYWJsZWQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVkdWNlR3JvdXBzUHJlZChncm91cCA9PiBncm91cC5pc0VuYWJsZWQobmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGVuYWJsZSgpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IGdyb3VwLmVuYWJsZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlKCk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4ge1xyXG4gICAgICAgICAgICBpZihncm91cC5uYW1lICE9PSBHZHByTWFuYWdlci5SRVFVSVJFRF9HUk9VUClcclxuICAgICAgICAgICAgICAgIGdyb3VwLmRpc2FibGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUoKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVuYWJsZWQgPyB0aGlzLmRpc2FibGUoKSA6IHRoaXMuZW5hYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlRm9yU3RvcmFnZSh0eXBlOiBHZHByU3RvcmFnZSk6IEdkcHJNYW5hZ2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JFYWNoR3JvdXAoZ3JvdXAgPT4gZ3JvdXAuZW5hYmxlRm9yU3RvcmFnZSh0eXBlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUZvclN0b3JhZ2UodHlwZTogR2RwclN0b3JhZ2UpOiBHZHByTWFuYWdlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yRWFjaEdyb3VwKGdyb3VwID0+IHtcclxuICAgICAgICAgICAgaWYoZ3JvdXAubmFtZSAhPT0gR2Rwck1hbmFnZXIuUkVRVUlSRURfR1JPVVApXHJcbiAgICAgICAgICAgICAgICBncm91cC5kaXNhYmxlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVGb3JTdG9yYWdlKHR5cGU6IEdkcHJTdG9yYWdlKTogR2Rwck1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvckVhY2hHcm91cChncm91cCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGdyb3VwLm5hbWUgIT09IEdkcHJNYW5hZ2VyLlJFUVVJUkVEX0dST1VQKVxyXG4gICAgICAgICAgICAgICAgZ3JvdXAudG9nZ2xlRm9yU3RvcmFnZSh0eXBlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByYXcoKTogR2Rwck1hbmFnZXJSYXd7XHJcbiAgICAgICAgY29uc3QgcmV0OiBHZHByTWFuYWdlclJhdyA9IHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdGhpcy5lbmFibGVkLFxyXG4gICAgICAgICAgICBncm91cHM6IFtdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldC5ncm91cHMgPSBbLi4udGhpcy5ncm91cHNdLm1hcCgoW18sIGdyb3VwXSkgPT4gZ3JvdXAucmF3KCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge1xyXG4gICAgR2Rwck1hbmFnZXIsXHJcbiAgICBHZHByTWFuYWdlclJhdyxcclxufSIsImVudW0gR2RwclN0b3JhZ2V7XHJcbiAgICBOb25lID0gMGIxLFxyXG4gICAgQ29va2llID0gMGIxMCxcclxuICAgIExvY2FsU3RvcmFnZSA9IDBiMTAwLFxyXG4gICAgU2Vzc2lvblN0b3JhZ2UgPSAwYjEwMDAsXHJcbiAgICBJbmRleGVkRGIgPSAwYjEwMDAwLFxyXG4gICAgRmlsZVN5c3RlbSA9IDBiMTAwMDAsXHJcbiAgICBTZXJ2ZXJTdG9yYWdlID0gMGIxMDAwMCxcclxuICAgIEFsbCA9IENvb2tpZSB8IExvY2FsU3RvcmFnZSB8IFNlc3Npb25TdG9yYWdlIHwgSW5kZXhlZERiIHwgRmlsZVN5c3RlbSB8IFNlcnZlclN0b3JhZ2UsXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByU3RvcmFnZSxcclxufSIsImltcG9ydCB7IEdkcHJTdG9yYWdlIH0gZnJvbSBcIi4uL0dkcHJTdG9yYWdlXCJcclxuaW1wb3J0IHsgR2Rwck1hbmFnZXJCdWlsZGVyIH0gZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkIH0gZnJvbSBcIi4uL0dkcHJHdWFyZFwiXHJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4uL0dkcHJHdWFyZEdyb3VwXCJcclxuaW1wb3J0IHsgR2Rwckd1YXJkQnVpbGRlciB9IGZyb20gXCIuL0dkcHJHdWFyZEJ1aWxkZXJcIlxyXG5cclxuY2xhc3MgR2Rwckdyb3VwQnVpbGRlciBleHRlbmRzIEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgIHB1YmxpYyBndWFyZHM6IEdkcHJHdWFyZFtdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEdkcHJNYW5hZ2VyQnVpbGRlciAsXHJcbiAgICAgICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyxcclxuICAgICAgICBwcm90ZWN0ZWQgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICBzdG9yYWdlOiBHZHByU3RvcmFnZSxcclxuICAgICAgICBwcm90ZWN0ZWQgZW5hYmxlOiBib29sZWFuLFxyXG4gICAgKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0R3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICByZXR1cm4gc3VwZXIuc3RhcnRHcm91cChzdG9yYWdlIHx8IHRoaXMucGFyZW50LnN0b3JhZ2UsIG5hbWUsIGRlc2NyaXB0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShtYjogR2Rwck1hbmFnZXJCdWlsZGVyLCBuYW1lOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgZW5hYmxlZDogYm9vbGVhbiA9IHRydWUpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiBuZXcgR2Rwckdyb3VwQnVpbGRlcihtYiwgbmFtZSwgZGVzY3JpcHRpb24sIHN0b3JhZ2UgfHwgR2RwclN0b3JhZ2UuQ29va2llLCBlbmFibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5kR3JvdXAoKTogR2Rwck1hbmFnZXJCdWlsZGVye1xyXG4gICAgICAgIGNvbnN0IGdyb3VwID0gR2Rwckd1YXJkR3JvdXAuZm9yKHRoaXMubmFtZSwgdGhpcy5kZXNjcmlwdGlvbiwgdGhpcy5lbmFibGUpO1xyXG4gICAgICAgIGNvbnN0IGd1YXJkcyA9IFsuLi50aGlzLmd1YXJkcywgLi4udGhpcy5ncm91cHNdO1xyXG4gICAgICAgIGd1YXJkcy5mb3JFYWNoKGd1YXJkID0+IGdyb3VwLmFkZEd1YXJkKGd1YXJkKSk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQuZ3JvdXBzLnB1c2goZ3JvdXApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZWRpdChjYjogKGJ1aWxkZXI6IEdkcHJHcm91cEJ1aWxkZXIpID0+IGFueSk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgY2IodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpdGhOYW1lKG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIubmFtZSA9IG5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuYWJsZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5lbmFibGUgPSBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0R3VhcmQoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHdWFyZEJ1aWxkZXIuY3JlYXRlKHRoaXMsIHN0b3JhZ2UgfHwgdGhpcy5zdG9yYWdlLCB0aGlzLmVuYWJsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpdGhFbmFibGVkR3VhcmQobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSlcclxuICAgICAgICAgICAgLndpdGhOYW1lKG5hbWUpXHJcbiAgICAgICAgICAgIC53aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgIC5lbmFibGVkKClcclxuICAgICAgICAuZW5kR3VhcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aERpc2FibGVkR3VhcmQobmFtZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIiwgc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3VhcmQoc3RvcmFnZSlcclxuICAgICAgICAgICAgLndpdGhOYW1lKG5hbWUpXHJcbiAgICAgICAgICAgIC53aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgIC5kaXNhYmxlZCgpXHJcbiAgICAgICAgLmVuZEd1YXJkKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3JvdXBCdWlsZGVyLFxyXG59IiwiaW1wb3J0IHsgR2Rwckdyb3VwQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXJzXCJcclxuaW1wb3J0IHsgR2RwclN0b3JhZ2UgfSBmcm9tIFwiLi4vR2RwclN0b3JhZ2VcIlxyXG5pbXBvcnQgeyBtYWtlR3VhcmQgfSBmcm9tIFwiLi4vR2Rwckd1YXJkXCI7XHJcblxyXG5jbGFzcyBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcm90ZWN0ZWQgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByb3RlY3RlZCBwYXJlbnQ6IEdkcHJHcm91cEJ1aWxkZXIsXHJcbiAgICAgICAgcHJvdGVjdGVkIHN0b3JhZ2U6IEdkcHJTdG9yYWdlLFxyXG4gICAgICAgIHByb3RlY3RlZCBlbmFibGU6IGJvb2xlYW4sXHJcbiAgICApe1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjcmVhdGUoZ2I6IEdkcHJHcm91cEJ1aWxkZXIsIHN0b3JhZ2U6IEdkcHJTdG9yYWdlID0gR2RwclN0b3JhZ2UuQ29va2llLCBlbmFibGVkOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIHJldHVybiBuZXcgR2Rwckd1YXJkQnVpbGRlcihnYiwgc3RvcmFnZSwgZW5hYmxlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZW5kR3VhcmQoKTogR2Rwckdyb3VwQnVpbGRlcntcclxuICAgICAgICBjb25zdCBndWFyZCA9IG1ha2VHdWFyZCh0aGlzLm5hbWUsIHRoaXMuZGVzY3JpcHRpb24sIHRoaXMuc3RvcmFnZSwgdGhpcy5lbmFibGUpO1xyXG4gICAgICAgIHRoaXMucGFyZW50Lmd1YXJkcy5wdXNoKGd1YXJkKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGVkaXQoZWRpdDogKGJ1aWxkZXI6IEdkcHJHdWFyZEJ1aWxkZXIpID0+IGFueSk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgZWRpdCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB3aXRoTmFtZShuYW1lOiBzdHJpbmcpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLm5hbWUgPSBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB3aXRoRGVzY3JpcHRpb24oZGVzY3JpcHRpb246IHN0cmluZyk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZW5hYmxlZCgpOiBHZHByR3VhcmRCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVkaXQoYiA9PiBiLmVuYWJsZSA9IHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVkKCk6IEdkcHJHdWFyZEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdChiID0+IGIuZW5hYmxlID0gZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3JlZEluKHN0b3JhZ2U6IEdkcHJTdG9yYWdlKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5lZGl0KGIgPT4gYi5zdG9yYWdlID0gc3RvcmFnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByR3VhcmRCdWlsZGVyLFxyXG59IiwiaW1wb3J0IHsgR2Rwckd1YXJkR3JvdXAgfSBmcm9tIFwiLi4vR2Rwckd1YXJkR3JvdXBcIlxyXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuLi9HZHByU3RvcmFnZVwiXHJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyIH0gZnJvbSBcIi4uL0dkcHJNYW5hZ2VyXCJcclxuaW1wb3J0IHsgR2Rwckdyb3VwQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXJzXCJcclxuXHJcbmNsYXNzIEdkcHJNYW5hZ2VyQnVpbGRlcntcclxuICAgIHB1YmxpYyBzdG9yYWdlOiBHZHByU3RvcmFnZSA9IEdkcHJTdG9yYWdlLkNvb2tpZTtcclxuICAgIHB1YmxpYyBncm91cHM6IEdkcHJHdWFyZEdyb3VwW10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG1ha2UoKXtcclxuICAgICAgICByZXR1cm4gbmV3IEdkcHJNYW5hZ2VyQnVpbGRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R3JvdXAoc3RvcmFnZTogR2RwclN0b3JhZ2V8bnVsbCA9IG51bGwsIG5hbWU6IHN0cmluZyA9IFwiXCIsIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiLCBlbmFibGVkOiBib29sZWFuID0gdHJ1ZSk6IEdkcHJHcm91cEJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIEdkcHJHcm91cEJ1aWxkZXIuY3JlYXRlKHRoaXMsIG5hbWUsIGRlc2NyaXB0aW9uLCBzdG9yYWdlLCBlbmFibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEVuYWJsZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RGlzYWJsZWRHcm91cChzdG9yYWdlOiBHZHByU3RvcmFnZXxudWxsID0gbnVsbCwgbmFtZTogc3RyaW5nID0gXCJcIiwgZGVzY3JpcHRpb246IHN0cmluZyA9IFwiXCIpOiBHZHByR3JvdXBCdWlsZGVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0R3JvdXAoc3RvcmFnZSwgbmFtZSwgZGVzY3JpcHRpb24sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBidWlsZCgpOiBHZHByTWFuYWdlcntcclxuICAgICAgICByZXR1cm4gR2Rwck1hbmFnZXIuY3JlYXRlKHRoaXMuZ3JvdXBzKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmRHcm91cCgpOiBHZHByTWFuYWdlckJ1aWxkZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBHZHByTWFuYWdlckJ1aWxkZXIsXHJcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9HZHByR3VhcmRCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwck1hbmFnZXJCdWlsZGVyXCJcclxuZXhwb3J0ICogZnJvbSBcIi4vR2Rwckdyb3VwQnVpbGRlclwiIiwiaW1wb3J0IHsgbWFrZUd1YXJkIH0gZnJvbSBcIi4vR2Rwckd1YXJkXCJcbmltcG9ydCB7IEdkcHJHdWFyZEdyb3VwIH0gZnJvbSBcIi4vR2Rwckd1YXJkR3JvdXBcIlxuaW1wb3J0IHsgR2Rwck1hbmFnZXIgfSBmcm9tIFwiLi9HZHByTWFuYWdlclwiXG5pbXBvcnQgeyBHZHByU3RvcmFnZSB9IGZyb20gXCIuL0dkcHJTdG9yYWdlXCJcbmltcG9ydCB7IEdkcHJNYW5hZ2VyQnVpbGRlciB9IGZyb20gXCIuL2J1aWxkZXJzL2J1aWxkZXJzXCJcblxuLypcblxuY29uc3QgJGdkcHI6IEdkcHJNYW5hZ2VyID0gR2Rwck1hbmFnZXJCdWlsZGVyLm1ha2UoKVxuLnN0YXJ0R3JvdXAoR2RwclN0b3JhZ2UuQ29va2llLCBcInRyYWNraW5nXCIpXG4gICAgLndpdGhFbmFibGVkR3VhcmQoXCJHb29nbGUgVGFncyBBbmFseXRpY3NcIikgLy9jb29raWVcbiAgICAud2l0aEVuYWJsZWRHdWFyZChcIkNvbXBhbnktd2lkZSBUcmFja2luZ1wiLCBcIkhvbWVicmV3ZWQgdHJhY2tpbmcgc3lzdGVtXCIpIC8vY29va2llXG4uZW5kR3JvdXAoKVxuLnN0YXJ0R3JvdXAoR2RwclN0b3JhZ2UuTG9jYWxTdG9yYWdlLCBcInN0eWxlc1wiKSAvL2xzXG4gICAgLnN0YXJ0R3JvdXAoKS53aXRoTmFtZShcInRoZW1lc1wiKSAvL2xzXG4gICAgICAgIC53aXRoRW5hYmxlZEd1YXJkKFwiY29sb3JzXCIsIFwiVXNlciBiYXNlZCBjb2xvciBzY2hlbWVcIikgLy9sc1xuICAgICAgICAud2l0aEVuYWJsZWRHdWFyZChcIlwiKSAvL2xzXG4gICAgLmVuZEdyb3VwKClcbi5lbmRHcm91cCgpXG4uYnVpbGQoKTtcblxuKi9cblxuY29uc3QgeyBSRVFVSVJFRF9HUk9VUCwgUkVRVUlSRURfR1JPVVBfREVTQyB9ID0gR2Rwck1hbmFnZXI7XG5cbmV4cG9ydCB7XG4gICAgbWFrZUd1YXJkLFxuICAgIEdkcHJHdWFyZEdyb3VwLFxuICAgIEdkcHJNYW5hZ2VyLFxuICAgIEdkcHJTdG9yYWdlLFxuICAgIEdkcHJNYW5hZ2VyQnVpbGRlcixcbiAgICBSRVFVSVJFRF9HUk9VUCxcbiAgICBSRVFVSVJFRF9HUk9VUF9ERVNDLFxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==