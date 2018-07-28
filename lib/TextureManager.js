"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Texture = /** @class */ (function () {
    function Texture(_id, _texture) {
        this._id = _id;
        this._texture = _texture;
    }
    Object.defineProperty(Texture.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Texture.prototype, "texture", {
        get: function () {
            return this._texture;
        },
        enumerable: true,
        configurable: true
    });
    return Texture;
}());
exports.Texture = Texture;
var TextureManager = /** @class */ (function () {
    function TextureManager() {
        this._textures = [];
    }
    TextureManager.prototype.setContext = function (context) {
        this._gl = context;
    };
    TextureManager.prototype.loadTextures = function (textures) {
        var _this = this;
        var promises = textures.map(function (textureDefinition) {
            var type = textureDefinition.type;
            switch (type) {
                case 'normal':
                    return _this.loadTexture(textureDefinition);
                case 'cubemap':
                    return _this.loadCubemapTexture(textureDefinition);
                default:
                    console.error("texture type " + type + " is invalid.");
                    return Promise.resolve();
            }
        });
        return Promise.all(promises);
    };
    TextureManager.prototype.loadTexture = function (textureDefinition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.onload = function () {
                var tex = _this._gl.createTexture();
                _this._gl.bindTexture(_this._gl.TEXTURE_2D, tex);
                _this._gl.texImage2D(_this._gl.TEXTURE_2D, 0, _this._gl.RGBA, _this._gl.RGBA, _this._gl.UNSIGNED_BYTE, image);
                _this._gl.generateMipmap(_this._gl.TEXTURE_2D);
                _this._gl.bindTexture(_this._gl.TEXTURE_2D, null);
                if (tex !== null) {
                    var texture = new Texture(textureDefinition.id, tex);
                    _this._textures.push(texture);
                    resolve();
                }
                else {
                    reject();
                }
            };
            image.src = textureDefinition.path;
        });
    };
    TextureManager.prototype.loadCubemapTexture = function (textureDefinition) {
        var _this = this;
        var imageArray = [
            {
                name: 'posx.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_X,
            },
            {
                name: 'posy.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
            },
            {
                name: 'posz.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
            },
            {
                name: 'negx.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
            },
            {
                name: 'negy.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            },
            {
                name: 'negz.jpg',
                target: this._gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            },
        ];
        var promises = imageArray.map(function (image) {
            return new Promise(function (resolve) {
                var imageElement = new Image;
                imageElement.onload = function () {
                    resolve({
                        target: image.target,
                        data: imageElement,
                    });
                };
                imageElement.src = textureDefinition.path + '/' + image.name;
            });
        });
        return Promise.all(promises)
            .then(function (images) {
            var tex = _this._gl.createTexture();
            _this._gl.bindTexture(_this._gl.TEXTURE_CUBE_MAP, tex);
            images.forEach(function (image) {
                _this._gl.texImage2D(image.target, 0, _this._gl.RGBA, _this._gl.RGBA, _this._gl.UNSIGNED_BYTE, image.data);
            });
            _this._gl.generateMipmap(_this._gl.TEXTURE_CUBE_MAP);
            _this._gl.texParameteri(_this._gl.TEXTURE_CUBE_MAP, _this._gl.TEXTURE_MIN_FILTER, _this._gl.LINEAR);
            _this._gl.texParameteri(_this._gl.TEXTURE_CUBE_MAP, _this._gl.TEXTURE_MAG_FILTER, _this._gl.LINEAR);
            _this._gl.texParameteri(_this._gl.TEXTURE_CUBE_MAP, _this._gl.TEXTURE_WRAP_S, _this._gl.CLAMP_TO_EDGE);
            _this._gl.texParameteri(_this._gl.TEXTURE_CUBE_MAP, _this._gl.TEXTURE_WRAP_T, _this._gl.CLAMP_TO_EDGE);
            if (tex !== null) {
                var texture = new Texture(textureDefinition.id, tex);
                _this._textures.push(texture);
            }
            else {
                console.error("cubemap texture " + textureDefinition.id + " load failed.");
            }
            _this._gl.bindTexture(_this._gl.TEXTURE_CUBE_MAP, null);
        });
    };
    TextureManager.prototype.find = function (id) {
        return this._textures.find(function (texture) { return texture.id == id; });
    };
    TextureManager.instance = new TextureManager();
    return TextureManager;
}());
exports.TextureManager = TextureManager;
