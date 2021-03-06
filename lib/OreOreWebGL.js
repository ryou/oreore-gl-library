"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderManager_1 = require("./ShaderManager");
var TextureManager_1 = require("./TextureManager");
var MaterialManager_1 = require("./MaterialManager");
var ModelManager_1 = require("./ModelManager");
var LoopController_1 = require("./LoopController");
var OreOreWebGL = /** @class */ (function () {
    function OreOreWebGL(_canvas, shaderDefinitionArray, textureDefinitionArray, modelDefinitionArray, materialDefinitionArray, _onLoad) {
        var _this = this;
        this._canvas = _canvas;
        this._onLoad = _onLoad;
        this._templates = [];
        this._timer = null;
        this._loopController = null;
        var gl = this._canvas.getContext('webgl');
        if (gl !== null) {
            this._gl = gl;
            ShaderManager_1.ShaderManager.instance.setContext(gl);
            var loadShaderPromise = ShaderManager_1.ShaderManager.instance.loadShaders(shaderDefinitionArray);
            TextureManager_1.TextureManager.instance.setContext(gl);
            var loadTexturePromise = TextureManager_1.TextureManager.instance.loadTextures(textureDefinitionArray);
            var loadModelPromise = ModelManager_1.ModelManager.instance.loadModels(modelDefinitionArray);
            Promise.all([loadShaderPromise, loadTexturePromise, loadModelPromise])
                .then(function () {
                MaterialManager_1.MaterialManager.instance.init(materialDefinitionArray);
                _this._loopController = new LoopController_1.LoopController(function () { _this.update(); }, function () { _this.render(); }, 30);
                _this._onLoad();
            });
        }
        else {
            console.error('webgl not found');
        }
    }
    Object.defineProperty(OreOreWebGL.prototype, "gl", {
        get: function () {
            return this._gl;
        },
        enumerable: true,
        configurable: true
    });
    OreOreWebGL.prototype.update = function () {
        this._templates.forEach(function (template) { return template.update(); });
    };
    OreOreWebGL.prototype.render = function () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this._templates.forEach(function (template) { return template.render(); });
        this.gl.flush();
    };
    OreOreWebGL.prototype.addTemplate = function (template) {
        this._templates.push(template);
    };
    OreOreWebGL.prototype.play = function () {
        if (this._loopController !== null)
            this._loopController.start();
        else
            console.error('loop controller is null.');
    };
    OreOreWebGL.prototype.pause = function () {
        if (this._loopController !== null)
            this._loopController.pause();
        else
            console.error('loop controller is null.');
    };
    return OreOreWebGL;
}());
exports.OreOreWebGL = OreOreWebGL;
