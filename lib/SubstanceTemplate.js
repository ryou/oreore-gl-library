"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MaterialManager_1 = require("./MaterialManager");
var ModelManager_1 = require("./ModelManager");
var float32vector_1 = require("./float32vector");
var transform_1 = require("./transform");
var matrix_1 = require("./matrix");
var CameraManager_1 = require("./CameraManager");
var Substance = /** @class */ (function () {
    function Substance(_template) {
        this._template = _template;
        this._velocity = new float32vector_1.Vector3(0, 0, 0);
        this._angularVelocity = new float32vector_1.Vector3(0, 0, 0);
        this._transform = new transform_1.Transform();
    }
    Object.defineProperty(Substance.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Substance.prototype, "velocity", {
        set: function (velocity) {
            this._velocity = velocity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Substance.prototype, "angularVelocity", {
        set: function (velocity) {
            this._angularVelocity = velocity;
        },
        enumerable: true,
        configurable: true
    });
    Substance.prototype.update = function () {
        this.transform.addPosition(this._velocity.x, this._velocity.y, this._velocity.z);
        this.transform.addRotation(this._angularVelocity.x, this._angularVelocity.y, this._angularVelocity.z);
    };
    Substance.prototype.render = function (context, indexSize) {
        var _this = this;
        var cameraManagerInstance = CameraManager_1.CameraManager.instance;
        var projectionMatrix = matrix_1.Matrix4x4.perspective({
            fovYRadian: 1.1,
            aspectRatio: cameraManagerInstance.aspect,
            near: 0.001,
            far: 1000,
        });
        var camera = cameraManagerInstance.activeCamera;
        var viewMatrix = camera.transform.matrix.inverse();
        this._template.material.shader.fixedUniforms.forEach(function (uniform) {
            switch (uniform.name) {
                case 'modelMatrix':
                    _this._template.material.shader.setUniform('modelMatrix', _this._transform.matrix);
                    break;
                case 'viewMatrix':
                    _this._template.material.shader.setUniform('viewMatrix', viewMatrix);
                    break;
                case 'projectionMatrix':
                    _this._template.material.shader.setUniform('projectionMatrix', projectionMatrix);
                    break;
                case 'worldCameraPosition':
                    {
                        var localCameraPos4 = new float32vector_1.Vector4(camera.transform.position.x, camera.transform.position.y, camera.transform.position.z, 1);
                        var worldCameraPos4 = localCameraPos4.mulByMatrix(camera.transform.matrix);
                        var worldCameraPosition = new float32vector_1.Vector3(worldCameraPos4.x / worldCameraPos4.w, worldCameraPos4.y / worldCameraPos4.w, worldCameraPos4.z / worldCameraPos4.w);
                        _this._template.material.shader.setUniform('worldCameraPosition', worldCameraPosition.values);
                    }
                    break;
                default:
                    console.error("undefined uniform " + uniform.name);
            }
        });
        this._template.material.attachUniforms();
        context.drawElements(context.TRIANGLES, indexSize, context.UNSIGNED_SHORT, 0);
    };
    return Substance;
}());
exports.Substance = Substance;
var SubstanceTemplate = /** @class */ (function () {
    function SubstanceTemplate(context, modelID, materialID) {
        this._substances = [];
        this._gl = context;
        var model = ModelManager_1.ModelManager.instance.find(modelID);
        if (model !== undefined) {
            this._model = model;
        }
        else {
            console.error("model " + modelID + " not found.");
        }
        var material = MaterialManager_1.MaterialManager.instance.find(materialID);
        if (material !== undefined) {
            this._material = material;
        }
        else {
            console.error("material " + materialID + " is not found.");
        }
    }
    Object.defineProperty(SubstanceTemplate.prototype, "material", {
        get: function () {
            return this._material;
        },
        enumerable: true,
        configurable: true
    });
    SubstanceTemplate.prototype.instantiate = function () {
        var substance = new Substance(this);
        this._substances.push(substance);
        return substance;
    };
    SubstanceTemplate.prototype.update = function () {
        this._substances.forEach(function (substance) { return substance.update(); });
    };
    SubstanceTemplate.prototype.render = function () {
        var _this = this;
        this._gl.useProgram(this._material.shader.program);
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.enable(this._gl.CULL_FACE);
        var vertexBuffer = this._gl.createBuffer();
        var indexBuffer = this._gl.createBuffer();
        var vertexAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'position');
        var normalAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'normal');
        var tangentAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'tangent');
        var binormalAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'binormal');
        var uvAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'texCoord');
        var VERTEX_SIZE = 3;
        var NORMAL_SIZE = 3;
        var TANGENT_SIZE = 3;
        var BINORMAL_SIZE = 3;
        var UV_SIZE = 2;
        var STRIDE = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE + BINORMAL_SIZE + UV_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        var POSITION_OFFSET = 0;
        var NORMAL_OFFSET = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;
        var TANGENT_OFFSET = (VERTEX_SIZE + NORMAL_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        var BINORMAL_OFFSET = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        var UV_OFFSET = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE + BINORMAL_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer);
        this._gl.enableVertexAttribArray(vertexAttribLocation);
        this._gl.enableVertexAttribArray(normalAttribLocation);
        this._gl.enableVertexAttribArray(tangentAttribLocation);
        this._gl.enableVertexAttribArray(binormalAttribLocation);
        this._gl.enableVertexAttribArray(uvAttribLocation);
        this._gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, this._gl.FLOAT, false, STRIDE, POSITION_OFFSET);
        this._gl.vertexAttribPointer(normalAttribLocation, NORMAL_SIZE, this._gl.FLOAT, false, STRIDE, NORMAL_OFFSET);
        this._gl.vertexAttribPointer(tangentAttribLocation, TANGENT_SIZE, this._gl.FLOAT, false, STRIDE, TANGENT_OFFSET);
        this._gl.vertexAttribPointer(binormalAttribLocation, BINORMAL_SIZE, this._gl.FLOAT, false, STRIDE, BINORMAL_OFFSET);
        this._gl.vertexAttribPointer(uvAttribLocation, UV_SIZE, this._gl.FLOAT, false, STRIDE, UV_OFFSET);
        var vertices = this._model.interleaved;
        var indices = this._model.indices;
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, vertices, this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, indices, this._gl.STATIC_DRAW);
        var indexSize = indices.length;
        this._substances.forEach(function (substance) { return substance.render(_this._gl, indexSize); });
    };
    return SubstanceTemplate;
}());
exports.SubstanceTemplate = SubstanceTemplate;
