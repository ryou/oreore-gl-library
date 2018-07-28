"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TextureManager_1 = require("./TextureManager");
var ShaderUniformType;
(function (ShaderUniformType) {
    ShaderUniformType[ShaderUniformType["Color"] = 0] = "Color";
    ShaderUniformType[ShaderUniformType["Texture"] = 1] = "Texture";
    ShaderUniformType[ShaderUniformType["TextureCubemap"] = 2] = "TextureCubemap";
    ShaderUniformType[ShaderUniformType["Float"] = 3] = "Float";
    ShaderUniformType[ShaderUniformType["Vector3"] = 4] = "Vector3";
    ShaderUniformType[ShaderUniformType["Matrix4"] = 5] = "Matrix4";
})(ShaderUniformType = exports.ShaderUniformType || (exports.ShaderUniformType = {}));
var ShaderUniformBase = /** @class */ (function () {
    function ShaderUniformBase(_name, _type) {
        this._name = _name;
        this._type = _type;
    }
    Object.defineProperty(ShaderUniformBase.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderUniformBase.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    return ShaderUniformBase;
}());
exports.ShaderUniformBase = ShaderUniformBase;
var ShaderUniformColor = /** @class */ (function (_super) {
    __extends(ShaderUniformColor, _super);
    function ShaderUniformColor(name, _defaultValue) {
        var _this = _super.call(this, name, ShaderUniformType.Color) || this;
        _this._defaultValue = _defaultValue;
        return _this;
    }
    Object.defineProperty(ShaderUniformColor.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformColor.prototype.setGLUniform = function (context, program, value) {
        if (value.length !== 4) {
            console.error("value length is invalid.");
            return;
        }
        var location = context.getUniformLocation(program, this._name);
        if (location !== null)
            context.uniform4f(location, value[0], value[1], value[2], value[3]);
        else
            console.error(this.name + " location is null.");
    };
    return ShaderUniformColor;
}(ShaderUniformBase));
exports.ShaderUniformColor = ShaderUniformColor;
var ShaderUniformVector3 = /** @class */ (function (_super) {
    __extends(ShaderUniformVector3, _super);
    function ShaderUniformVector3(name, _defaultValue) {
        var _this = _super.call(this, name, ShaderUniformType.Color) || this;
        _this._defaultValue = _defaultValue;
        return _this;
    }
    Object.defineProperty(ShaderUniformVector3.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformVector3.prototype.setGLUniform = function (context, program, value) {
        if (value.length !== 3) {
            console.error(this.name + " value length is invalid.");
            return;
        }
        var location = context.getUniformLocation(program, this._name);
        if (location !== null)
            context.uniform3f(location, value[0], value[1], value[2]);
        else
            console.error(this.name + " location is null.");
    };
    return ShaderUniformVector3;
}(ShaderUniformBase));
exports.ShaderUniformVector3 = ShaderUniformVector3;
var ShaderUniformMatrix4 = /** @class */ (function (_super) {
    __extends(ShaderUniformMatrix4, _super);
    function ShaderUniformMatrix4(name, _defaultValue) {
        var _this = _super.call(this, name, ShaderUniformType.Matrix4) || this;
        _this._defaultValue = _defaultValue;
        return _this;
    }
    Object.defineProperty(ShaderUniformMatrix4.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformMatrix4.prototype.setGLUniform = function (context, program, value) {
        var location = context.getUniformLocation(program, this._name);
        context.uniformMatrix4fv(location, false, value.values);
    };
    return ShaderUniformMatrix4;
}(ShaderUniformBase));
exports.ShaderUniformMatrix4 = ShaderUniformMatrix4;
var ShaderUniformTexture = /** @class */ (function (_super) {
    __extends(ShaderUniformTexture, _super);
    // TODO: デフォルト値として、色を与えることが可能なようにする
    function ShaderUniformTexture(name, _defaultValue, _index) {
        var _this = _super.call(this, name, ShaderUniformType.Color) || this;
        _this._defaultValue = _defaultValue;
        _this._index = _index;
        return _this;
    }
    Object.defineProperty(ShaderUniformTexture.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformTexture.prototype.setGLUniform = function (context, program, value) {
        var textureMap = [
            context.TEXTURE0,
            context.TEXTURE1,
            context.TEXTURE2,
            context.TEXTURE3,
            context.TEXTURE4,
            context.TEXTURE5,
            context.TEXTURE6,
            context.TEXTURE7,
            context.TEXTURE8,
            context.TEXTURE9,
        ];
        var texture = TextureManager_1.TextureManager.instance.find(value);
        if (texture === undefined) {
            console.error("texture " + value + " is not found.");
            return;
        }
        var location = context.getUniformLocation(program, this._name);
        context.activeTexture(textureMap[this._index]);
        context.bindTexture(context.TEXTURE_2D, texture.texture);
        context.uniform1i(location, this._index);
    };
    return ShaderUniformTexture;
}(ShaderUniformBase));
exports.ShaderUniformTexture = ShaderUniformTexture;
var ShaderUniformTextureCubemap = /** @class */ (function (_super) {
    __extends(ShaderUniformTextureCubemap, _super);
    // TODO: デフォルト値として、色を与えることが可能なようにする
    function ShaderUniformTextureCubemap(name, _defaultValue, _index) {
        var _this = _super.call(this, name, ShaderUniformType.Color) || this;
        _this._defaultValue = _defaultValue;
        _this._index = _index;
        return _this;
    }
    Object.defineProperty(ShaderUniformTextureCubemap.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformTextureCubemap.prototype.setGLUniform = function (context, program, value) {
        var textureMap = [
            context.TEXTURE0,
            context.TEXTURE1,
            context.TEXTURE2,
            context.TEXTURE3,
            context.TEXTURE4,
            context.TEXTURE5,
            context.TEXTURE6,
            context.TEXTURE7,
            context.TEXTURE8,
            context.TEXTURE9,
        ];
        var texture = TextureManager_1.TextureManager.instance.find(value);
        if (texture === undefined) {
            console.error("texture " + value + " is not found.");
            return;
        }
        var location = context.getUniformLocation(program, this._name);
        context.activeTexture(textureMap[this._index]);
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture.texture);
        context.uniform1i(location, this._index);
    };
    return ShaderUniformTextureCubemap;
}(ShaderUniformBase));
exports.ShaderUniformTextureCubemap = ShaderUniformTextureCubemap;
var ShaderUniformFloat = /** @class */ (function (_super) {
    __extends(ShaderUniformFloat, _super);
    function ShaderUniformFloat(name, _defaultValue) {
        var _this = _super.call(this, name, ShaderUniformType.Float) || this;
        _this._defaultValue = _defaultValue;
        return _this;
    }
    Object.defineProperty(ShaderUniformFloat.prototype, "defaultValue", {
        get: function () {
            return this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    ShaderUniformFloat.prototype.setGLUniform = function (context, program, value) {
        var location = context.getUniformLocation(program, this._name);
        context.uniform1f(location, value);
    };
    return ShaderUniformFloat;
}(ShaderUniformBase));
exports.ShaderUniformFloat = ShaderUniformFloat;
