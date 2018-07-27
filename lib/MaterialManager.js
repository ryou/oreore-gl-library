"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderManager_1 = require("./ShaderManager");
var materials_1 = require("./data/materials");
var Material = /** @class */ (function () {
    function Material(_id, _shader, options) {
        var _this = this;
        this._id = _id;
        this._shader = _shader;
        this.options = options;
        this._options = _shader.customUniforms.map(function (uniform) {
            return { name: uniform.name, value: uniform.defaultValue };
        });
        options.forEach(function (option) { return _this.setOption(option.name, option.value); });
    }
    Object.defineProperty(Material.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "shader", {
        get: function () {
            return this._shader;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.setOption = function (name, value) {
        var option = this._options.find(function (option) { return name === option.name; });
        if (option === undefined) {
            console.error("option " + name + " is not found.");
            return;
        }
        option.value = value;
    };
    Material.prototype.attachUniforms = function () {
        var _this = this;
        this._options.forEach(function (option) { return _this._shader.setUniform(option.name, option.value); });
    };
    return Material;
}());
exports.Material = Material;
var MaterialManager = /** @class */ (function () {
    function MaterialManager() {
        this._materials = [];
    }
    MaterialManager.prototype.init = function () {
        var _this = this;
        materials_1.materialDefinitions.forEach(function (materialDefinition) {
            var shader = ShaderManager_1.ShaderManager.instance.find(materialDefinition.shader);
            if (shader === undefined) {
                console.error("shader " + materialDefinition.shader + " is not found.");
                return;
            }
            var material = new Material(materialDefinition.id, shader, materialDefinition.options);
            _this._materials.push(material);
        });
    };
    MaterialManager.prototype.find = function (id) {
        return this._materials.find(function (material) { return id === material.id; });
    };
    MaterialManager.instance = new MaterialManager();
    return MaterialManager;
}());
exports.MaterialManager = MaterialManager;
