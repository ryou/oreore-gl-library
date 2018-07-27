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
var vector_base_1 = require("./vector_base");
var Float32Vector2 = /** @class */ (function (_super) {
    __extends(Float32Vector2, _super);
    function Float32Vector2(x, y) {
        var _this = _super.call(this) || this;
        _this._values = new Float32Array([x, y]);
        return _this;
    }
    Float32Vector2.prototype.add = function (other) {
        return new Float32Vector2(this.x + other.x, this.y + other.y);
    };
    Float32Vector2.prototype.sub = function (other) {
        return new Float32Vector2(this.x - other.x, this.y - other.y);
    };
    Float32Vector2.prototype.mulByScalar = function (scalar) {
        return new Float32Vector2(this.x * scalar, this.y * scalar);
    };
    Float32Vector2.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Float32Vector2.prototype.normalize = function () {
        if (this.magnitude === 0)
            return this;
        return this.mulByScalar(1 / this.magnitude);
    };
    return Float32Vector2;
}(vector_base_1.Vector2Base));
exports.Float32Vector2 = Float32Vector2;
var Float32Vector3 = /** @class */ (function (_super) {
    __extends(Float32Vector3, _super);
    function Float32Vector3(x, y, z) {
        var _this = _super.call(this) || this;
        _this._values = new Float32Array([x, y, z]);
        return _this;
    }
    Float32Vector3.prototype.add = function (other) {
        return new Float32Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    };
    Float32Vector3.prototype.sub = function (other) {
        return new Float32Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    };
    Float32Vector3.prototype.mulByScalar = function (scalar) {
        return new Float32Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    };
    Float32Vector3.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };
    Float32Vector3.prototype.cross = function (other) {
        var cx = this.y * other.z - this.z * other.y;
        var cy = this.z * other.x - this.x * other.z;
        var cz = this.x * other.y - this.y * other.x;
        return new Float32Vector3(cx, cy, cz);
    };
    Float32Vector3.prototype.normalize = function () {
        if (this.magnitude === 0)
            return this;
        return this.mulByScalar(1 / this.magnitude);
    };
    Object.defineProperty(Float32Vector3.prototype, "xy", {
        get: function () {
            return new Float32Vector2(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    return Float32Vector3;
}(vector_base_1.Vector3Base));
exports.Float32Vector3 = Float32Vector3;
var Float32Vector4 = /** @class */ (function (_super) {
    __extends(Float32Vector4, _super);
    function Float32Vector4(x, y, z, w) {
        var _this = _super.call(this) || this;
        _this._values = new Float32Array([x, y, z, w]);
        return _this;
    }
    Float32Vector4.prototype.add = function (other) {
        return new Float32Vector4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    };
    Float32Vector4.prototype.sub = function (other) {
        return new Float32Vector4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    };
    Float32Vector4.prototype.mulByScalar = function (scalar) {
        return new Float32Vector4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    };
    Float32Vector4.prototype.mulByMatrix = function (matrix) {
        return new Float32Vector4((matrix.values[0] * this.x) + (matrix.values[4] * this.y) + (matrix.values[8] * this.z) + (matrix.values[12] * this.w), (matrix.values[1] * this.x) + (matrix.values[5] * this.y) + (matrix.values[9] * this.z) + (matrix.values[13] * this.w), (matrix.values[2] * this.x) + (matrix.values[6] * this.y) + (matrix.values[10] * this.z) + (matrix.values[14] * this.w), (matrix.values[3] * this.x) + (matrix.values[7] * this.y) + (matrix.values[11] * this.z) + (matrix.values[15] * this.w));
    };
    Float32Vector4.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    };
    Float32Vector4.prototype.normalize = function () {
        if (this.magnitude === 0)
            return this;
        return this.mulByScalar(1 / this.magnitude);
    };
    Object.defineProperty(Float32Vector4.prototype, "xyz", {
        get: function () {
            return new Float32Vector3(this.x, this.y, this.z);
        },
        enumerable: true,
        configurable: true
    });
    return Float32Vector4;
}(vector_base_1.Vector4Base));
exports.Float32Vector4 = Float32Vector4;
exports.Vector2 = Float32Vector2;
exports.Vector3 = Float32Vector3;
exports.Vector4 = Float32Vector4;
