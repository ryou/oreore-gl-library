"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix2x2 = /** @class */ (function () {
    function Matrix2x2(m11, m21, m12, m22) {
        this._values = new Float32Array([
            m11, m21,
            m12, m22
        ]);
    }
    Matrix2x2.identity = function () {
        return new Matrix2x2(1.0, 0.0, 0.0, 1.0);
    };
    Object.defineProperty(Matrix2x2.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix2x2.prototype.toString = function () {
        return this._values.toString();
    };
    return Matrix2x2;
}());
exports.Matrix2x2 = Matrix2x2;
var Matrix3x3 = /** @class */ (function () {
    function Matrix3x3(m11, m21, m31, m12, m22, m32, m13, m23, m33) {
        this._values = new Float32Array([
            m11, m21, m31,
            m12, m22, m32,
            m13, m23, m33
        ]);
    }
    Matrix3x3.identity = function () {
        return new Matrix3x3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    };
    Object.defineProperty(Matrix3x3.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix3x3.prototype.toString = function () {
        return this._values.toString();
    };
    return Matrix3x3;
}());
exports.Matrix3x3 = Matrix3x3;
var Matrix4x4 = /** @class */ (function () {
    function Matrix4x4(m11, m21, m31, m41, m12, m22, m32, m42, m13, m23, m33, m43, m14, m24, m34, m44) {
        this._values = new Float32Array([
            m11, m21, m31, m41,
            m12, m22, m32, m42,
            m13, m23, m33, m43,
            m14, m24, m34, m44
        ]);
    }
    Object.defineProperty(Matrix4x4.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Matrix4x4.prototype.toString = function () {
        return this._values.toString();
    };
    Object.defineProperty(Matrix4x4, "identity", {
        /* 行列基本機能 */
        // 単位行列
        get: function () {
            return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        },
        enumerable: true,
        configurable: true
    });
    // 逆行列
    Matrix4x4.prototype.inverse = function () {
        var a = this._values[0], b = this._values[4], c = this._values[8], d = this._values[12], e = this._values[1], f = this._values[5], g = this._values[9], h = this._values[13], i = this._values[2], j = this._values[6], k = this._values[10], l = this._values[14], m = this._values[3], n = this._values[7], o = this._values[11], p = this._values[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
        var r11 = (f * B - g * A + h * z) * ivd;
        var r12 = (-b * B + c * A - d * z) * ivd;
        var r13 = (n * v - o * u + p * t) * ivd;
        var r14 = (-j * v + k * u - l * t) * ivd;
        var r21 = (-e * B + g * y - h * x) * ivd;
        var r22 = (a * B - c * y + d * x) * ivd;
        var r23 = (-m * v + o * s - p * r) * ivd;
        var r24 = (i * v - k * s + l * r) * ivd;
        var r31 = (e * A - f * y + h * w) * ivd;
        var r32 = (-a * A + b * y - d * w) * ivd;
        var r33 = (m * u - n * s + p * q) * ivd;
        var r34 = (-i * u + j * s - l * q) * ivd;
        var r41 = (-e * z + f * x - g * w) * ivd;
        var r42 = (a * z - b * x + c * w) * ivd;
        var r43 = (-m * t + n * r - o * q) * ivd;
        var r44 = (i * t - j * r + k * q) * ivd;
        return new Matrix4x4(r11, r21, r31, r41, r12, r22, r32, r42, r13, r23, r33, r43, r14, r24, r34, r44);
    };
    // 乗算
    Matrix4x4.prototype.mulByMatrix = function (other) {
        var m11 = this._values[0];
        var m12 = this._values[4];
        var m13 = this._values[8];
        var m14 = this._values[12];
        var m21 = this._values[1];
        var m22 = this._values[5];
        var m23 = this._values[9];
        var m24 = this._values[13];
        var m31 = this._values[2];
        var m32 = this._values[6];
        var m33 = this._values[10];
        var m34 = this._values[14];
        var m41 = this._values[3];
        var m42 = this._values[7];
        var m43 = this._values[11];
        var m44 = this._values[15];
        var o11 = other.values[0];
        var o12 = other.values[4];
        var o13 = other.values[8];
        var o14 = other.values[12];
        var o21 = other.values[1];
        var o22 = other.values[5];
        var o23 = other.values[9];
        var o24 = other.values[13];
        var o31 = other.values[2];
        var o32 = other.values[6];
        var o33 = other.values[10];
        var o34 = other.values[14];
        var o41 = other.values[3];
        var o42 = other.values[7];
        var o43 = other.values[11];
        var o44 = other.values[15];
        var r11 = (m11 * o11) + (m12 * o21) + (m13 * o31) + (m14 * o41);
        var r12 = (m11 * o12) + (m12 * o22) + (m13 * o32) + (m14 * o42);
        var r13 = (m11 * o13) + (m12 * o23) + (m13 * o33) + (m14 * o43);
        var r14 = (m11 * o14) + (m12 * o24) + (m13 * o34) + (m14 * o44);
        var r21 = (m21 * o11) + (m22 * o21) + (m23 * o31) + (m24 * o41);
        var r22 = (m21 * o12) + (m22 * o22) + (m23 * o32) + (m24 * o42);
        var r23 = (m21 * o13) + (m22 * o23) + (m23 * o33) + (m24 * o43);
        var r24 = (m21 * o14) + (m22 * o24) + (m23 * o34) + (m24 * o44);
        var r31 = (m31 * o11) + (m32 * o21) + (m33 * o31) + (m34 * o41);
        var r32 = (m31 * o12) + (m32 * o22) + (m33 * o32) + (m34 * o42);
        var r33 = (m31 * o13) + (m32 * o23) + (m33 * o33) + (m34 * o43);
        var r34 = (m31 * o14) + (m32 * o24) + (m33 * o34) + (m34 * o44);
        var r41 = (m41 * o11) + (m42 * o21) + (m43 * o31) + (m44 * o41);
        var r42 = (m41 * o12) + (m42 * o22) + (m43 * o32) + (m44 * o42);
        var r43 = (m41 * o13) + (m42 * o23) + (m43 * o33) + (m44 * o43);
        var r44 = (m41 * o14) + (m42 * o24) + (m43 * o34) + (m44 * o44);
        return new Matrix4x4(r11, r21, r31, r41, r12, r22, r32, r42, r13, r23, r33, r43, r14, r24, r34, r44);
    };
    Matrix4x4.mul = function (a, b) {
        return a.mulByMatrix(b);
    };
    /* 変形機能 */
    // 移動
    Matrix4x4.translation = function (tx, ty, tz) {
        return new Matrix4x4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, tx, ty, tz, 1.0);
    };
    Matrix4x4.prototype.translate = function (tx, ty, tz) {
        return this.mulByMatrix(Matrix4x4.translation(tx, ty, tz));
    };
    // 拡大
    Matrix4x4.scaling = function (sx, sy, sz) {
        return new Matrix4x4(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    };
    Matrix4x4.prototype.scale = function (sx, sy, sz) {
        return this.mulByMatrix(Matrix4x4.scaling(sx, sy, sz));
    };
    // 回転
    Matrix4x4.rotationX = function (angle) {
        var radian = (angle / 180) * Math.PI;
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1);
    };
    Matrix4x4.rotationY = function (angle) {
        var radian = (angle / 180) * Math.PI;
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1);
    };
    Matrix4x4.rotationZ = function (angle) {
        var radian = (angle / 180) * Math.PI;
        var sin = Math.sin(radian);
        var cos = Math.cos(radian);
        return new Matrix4x4(cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    Matrix4x4.prototype.rotateX = function (angle) {
        return this.mulByMatrix(Matrix4x4.rotationX(angle));
    };
    Matrix4x4.prototype.rotateY = function (angle) {
        return this.mulByMatrix(Matrix4x4.rotationY(angle));
    };
    Matrix4x4.prototype.rotateZ = function (angle) {
        return this.mulByMatrix(Matrix4x4.rotationZ(angle));
    };
    Matrix4x4.lookAt = function (cameraPosition, lookAtPosition, cameraUp) {
        var zAxis = cameraPosition.sub(lookAtPosition).normalize();
        var xAxis = cameraUp.cross(zAxis).normalize();
        var yAxis = zAxis.cross(xAxis).normalize();
        return new Matrix4x4(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, -cameraPosition.dot(xAxis), -cameraPosition.dot(yAxis), -cameraPosition.dot(zAxis), 1.0);
    };
    Matrix4x4.orthographic = function (options) {
        var top = options.top;
        var bottom = options.bottom;
        var left = options.left;
        var right = options.right;
        var near = options.near;
        var far = options.far;
        return new Matrix4x4(2 / (right - left), 0.0, 0.0, 0.0, 0.0, 2 / (top - bottom), 0.0, 0.0, 0.0, 0.0, -2 / (far - near), 0.0, -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1.0);
    };
    Matrix4x4.frustum = function (options) {
        var top = options.top;
        var bottom = options.bottom;
        var left = options.left;
        var right = options.right;
        var near = options.near;
        var far = options.far;
        return new Matrix4x4(2 * near / (right - left), 0.0, 0.0, 0.0, 0.0, 2 * near / (top - bottom), 0.0, 0.0, (right + left) / (right - left), (top + bottom) / (top - bottom), -(far + near) / (far - near), -1.0, 0.0, 0.0, -2 * far * near / (far - near), 0.0);
    };
    Matrix4x4.perspective = function (options) {
        var top = options.near * Math.tan(options.fovYRadian * 0.5);
        var height = top * 2;
        var width = options.aspectRatio * height;
        var left = -0.5 * width;
        var right = left + width;
        var bottom = top - height;
        return Matrix4x4.frustum({
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            near: options.near,
            far: options.far
        });
    };
    return Matrix4x4;
}());
exports.Matrix4x4 = Matrix4x4;
exports.Matrix2 = Matrix2x2;
exports.Matrix3 = Matrix3x3;
exports.Matrix4 = Matrix4x4;
