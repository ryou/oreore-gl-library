"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var float32vector_1 = require("./float32vector");
var matrix_1 = require("./matrix");
var Transform = /** @class */ (function () {
    function Transform() {
        this._position = new float32vector_1.Vector3(0, 0, 0);
        this._rotate = new float32vector_1.Vector3(0, 0, 0);
        this._scale = new float32vector_1.Vector3(1, 1, 1);
    }
    Object.defineProperty(Transform.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (newPosition) {
            this._position.x = newPosition.x;
            this._position.y = newPosition.y;
            this._position.z = newPosition.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "rotate", {
        get: function () {
            return this._rotate;
        },
        set: function (newRotation) {
            this._rotate.x = newRotation.x;
            this._rotate.y = newRotation.y;
            this._rotate.z = newRotation.z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        set: function (newScale) {
            this._scale.x = newScale.x;
            this._scale.y = newScale.y;
            this._scale.z = newScale.z;
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.addPosition = function (x, y, z) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
    };
    Transform.prototype.addRotation = function (rx, ry, rz) {
        this._rotate.x += rx;
        this._rotate.y += ry;
        this._rotate.z += rz;
    };
    Object.defineProperty(Transform.prototype, "matrix", {
        // 変換行列の返却
        get: function () {
            return matrix_1.Matrix4x4.identity
                .translate(this.position.x, this.position.y, this.position.z)
                .scale(this.scale.x, this.scale.y, this.scale.z)
                .rotateX(this.rotate.x)
                .rotateY(this.rotate.y)
                .rotateZ(this.rotate.z);
        },
        enumerable: true,
        configurable: true
    });
    Transform.mulVectorAndMatrix = function (matrix, vector) {
        var vector4 = new float32vector_1.Vector4(vector.x, vector.y, vector.z, 1);
        var result = new float32vector_1.Vector4((matrix.values[0] * vector4.x) + (matrix.values[4] * vector4.y) + (matrix.values[8] * vector4.z) + (matrix.values[12] * vector4.w), (matrix.values[1] * vector4.x) + (matrix.values[5] * vector4.y) + (matrix.values[9] * vector4.z) + (matrix.values[13] * vector4.w), (matrix.values[2] * vector4.x) + (matrix.values[6] * vector4.y) + (matrix.values[10] * vector4.z) + (matrix.values[14] * vector4.w), (matrix.values[3] * vector4.x) + (matrix.values[7] * vector4.y) + (matrix.values[11] * vector4.z) + (matrix.values[15] * vector4.w));
        return new float32vector_1.Vector3(result.x / result.w, result.y / result.w, result.z / result.w);
    };
    return Transform;
}());
exports.Transform = Transform;
