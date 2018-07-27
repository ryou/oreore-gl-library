"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transform_1 = require("./transform");
var Camera = /** @class */ (function () {
    function Camera(_name) {
        this._name = _name;
        this._transform = new transform_1.Transform();
    }
    Object.defineProperty(Camera.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.activate = function () {
        CameraManager.instance.activate(this._name);
    };
    return Camera;
}());
exports.Camera = Camera;
var CameraManager = /** @class */ (function () {
    function CameraManager() {
        this._cameras = [];
    }
    Object.defineProperty(CameraManager.prototype, "cameras", {
        get: function () {
            return this._cameras;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraManager.prototype, "activeCamera", {
        get: function () {
            return this._activeCamera;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraManager.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (value) {
            this._aspect = value;
        },
        enumerable: true,
        configurable: true
    });
    CameraManager.prototype.activate = function (name) {
        var camera = CameraManager.instance.find(name);
        if (camera !== undefined)
            this._activeCamera = camera;
        else
            console.error("Camera " + name + " is not found.");
    };
    CameraManager.prototype.create = function (name) {
        var camera = new Camera(name);
        this._cameras.push(camera);
        return camera;
    };
    CameraManager.prototype.find = function (name) {
        return this._cameras.find(function (camera) { return camera.name === name; });
    };
    CameraManager.instance = new CameraManager();
    return CameraManager;
}());
exports.CameraManager = CameraManager;
