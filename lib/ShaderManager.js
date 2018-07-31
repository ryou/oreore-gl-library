"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matrix_1 = require("./matrix");
var ShaderUniform_1 = require("./ShaderUniform");
var Shader = /** @class */ (function () {
    function Shader(gl, id, vSource, fSource, fixedUniforms, customUniforms) {
        var _this = this;
        this.gl = gl;
        // 固定ユニフォーム（mvpMatrix等、どのシェーダーでも設定されるもの）
        this._fixedUniforms = [];
        // カスタムユニフォーム（法線マップ、メタリック等、シェーダー毎に設定されるもの）
        this._customUniforms = [];
        this._id = id;
        // uniformの設定
        fixedUniforms.forEach(function (uniform) {
            switch (uniform) {
                case 'modelMatrix':
                case 'viewMatrix':
                case 'projectionMatrix':
                case 'localNormal2WorldMatrix':
                    _this._fixedUniforms.push(new ShaderUniform_1.ShaderUniformMatrix4(uniform, matrix_1.Matrix4x4.identity));
                    break;
                case 'worldCameraPosition':
                    _this._fixedUniforms.push(new ShaderUniform_1.ShaderUniformVector3('worldCameraPosition', [0, 0, 0]));
                    break;
                default:
                    console.error("undefined fixed uniform " + uniform);
            }
        });
        this._customUniforms = this._customUniforms.concat(customUniforms);
        // vertex shaderのコンパイル
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vSource);
        gl.compileShader(vertexShader);
        // コンパイルが成功したかどうかのチェック
        var vShaderCompileStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if (!vShaderCompileStatus) {
            var info = gl.getShaderInfoLog(vertexShader);
            console.error(info);
        }
        // fragment shaderのコンパイル
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fSource);
        gl.compileShader(fragmentShader);
        var fShaderCompileStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if (!fShaderCompileStatus) {
            var info = gl.getShaderInfoLog(fragmentShader);
            console.error(info);
        }
        // シェーダープログラムの作成
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linkStatus) {
            var info = gl.getProgramInfoLog(program);
            console.error(info);
        }
        if (program !== null) {
            this._program = program;
        }
        else {
            console.error('program is null');
        }
    }
    Object.defineProperty(Shader.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "fixedUniforms", {
        get: function () {
            return this._fixedUniforms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "customUniforms", {
        get: function () {
            return this._customUniforms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "uniforms", {
        get: function () {
            return this._fixedUniforms.concat(this._customUniforms);
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.findUniform = function (name) {
        return this.uniforms.find(function (uniform) { return uniform.name === name; });
    };
    // TODO: ここでvalueがanyになってしまうことをなんとかしたい
    Shader.prototype.setUniform = function (name, value) {
        var uniform = this.findUniform(name);
        if (uniform !== undefined) {
            uniform.setGLUniform(this.gl, this._program, value);
        }
        else {
            console.error("uniform " + name + " is not found.");
        }
    };
    return Shader;
}());
exports.Shader = Shader;
var ShaderManager = /** @class */ (function () {
    function ShaderManager() {
        this._shaders = [];
    }
    ShaderManager.prototype.setContext = function (gl) {
        this._gl = gl;
    };
    ShaderManager.prototype.loadShaders = function (shaderDefinitionArray) {
        var _this = this;
        var promises = shaderDefinitionArray.map(function (item) { return _this.loadShader(item); });
        return Promise.all(promises);
    };
    ShaderManager.prototype.loadShader = function (options) {
        var _this = this;
        var loadVertexShader = fetch("./shaders/" + options.id + "/vertex_shader.glsl");
        var loadFragmentShader = fetch("./shaders/" + options.id + "/fragment_shader.glsl");
        var cUniforms = [];
        options.customUniforms.forEach(function (uniform) {
            var uniformBase;
            switch (uniform.type) {
                case 'color':
                    uniformBase = new ShaderUniform_1.ShaderUniformColor(uniform.name, uniform.options.default);
                    break;
                case 'vector3':
                    uniformBase = new ShaderUniform_1.ShaderUniformVector3(uniform.name, uniform.options.default);
                    break;
                case 'float':
                    uniformBase = new ShaderUniform_1.ShaderUniformFloat(uniform.name, uniform.options.default);
                    break;
                case 'texture':
                    uniformBase = new ShaderUniform_1.ShaderUniformTexture(uniform.name, uniform.options.default, uniform.options.index);
                    break;
                case 'cubemap':
                    uniformBase = new ShaderUniform_1.ShaderUniformTextureCubemap(uniform.name, uniform.options.default, uniform.options.index);
                    break;
                default:
                    console.error("uniform type " + uniform.type + " is invalid.");
                    return;
            }
            cUniforms.push(uniformBase);
        });
        return Promise.all([loadVertexShader, loadFragmentShader])
            .then(function (response) { return Promise.all([response[0].text(), response[1].text()]); })
            .then(function (shaderSources) {
            var vertexShaderSource = shaderSources[0];
            var fragmentShaderSource = shaderSources[1];
            var shader = new Shader(_this._gl, options.id, vertexShaderSource, fragmentShaderSource, options.fixedUniforms, cUniforms);
            _this._shaders.push(shader);
        });
    };
    ShaderManager.prototype.find = function (id) {
        return this._shaders.find(function (shader) { return shader.id === id; });
    };
    ShaderManager.instance = new ShaderManager();
    return ShaderManager;
}());
exports.ShaderManager = ShaderManager;
