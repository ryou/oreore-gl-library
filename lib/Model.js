"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var float32vector_1 = require("./float32vector");
var VertexData = /** @class */ (function () {
    function VertexData(_vertex, _normal, _textureCoord) {
        this._vertex = _vertex;
        this._normal = _normal;
        this._textureCoord = _textureCoord;
    }
    Object.defineProperty(VertexData.prototype, "vertex", {
        get: function () {
            return this._vertex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexData.prototype, "normal", {
        get: function () {
            return this._normal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexData.prototype, "textureCoord", {
        get: function () {
            return this._textureCoord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexData.prototype, "tangent", {
        get: function () {
            return this._tangent;
        },
        set: function (value) {
            this._tangent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VertexData.prototype, "binormal", {
        get: function () {
            return this._binormal;
        },
        set: function (value) {
            this._binormal = value;
        },
        enumerable: true,
        configurable: true
    });
    VertexData.prototype.getInterleavedValue = function () {
        var out = [];
        out = out.concat(this._vertex.toNumberArray());
        out = out.concat(this._normal.toNumberArray());
        out = out.concat(this._tangent.toNumberArray());
        out = out.concat(this._binormal.toNumberArray());
        out = out.concat(this._textureCoord.toNumberArray());
        return out;
    };
    return VertexData;
}());
exports.VertexData = VertexData;
var Model = /** @class */ (function () {
    function Model(_id, _vertices, _indices) {
        this._id = _id;
        this._vertices = _vertices;
        this._indices = _indices;
    }
    Object.defineProperty(Model.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "vertices", {
        get: function () {
            return this._vertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "indices", {
        get: function () {
            return this._indices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "interleaved", {
        get: function () {
            return this._interleaved;
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.calcInterleavedValues = function () {
        var tmp = [];
        this._vertices.forEach(function (vertex) {
            tmp = tmp.concat(vertex.getInterleavedValue());
        });
        this._interleaved = new Float32Array(tmp);
    };
    Model.prototype.calcTangents = function () {
        var sliceNum = 3;
        var sliceCount = this.indices.length / 3;
        for (var i = 0; i < sliceCount; i++) {
            var tmp = [
                this._vertices[this._indices[sliceNum * i]],
                this._vertices[this._indices[sliceNum * i + 1]],
                this._vertices[this._indices[sliceNum * i + 2]],
            ];
            this.calcTangentsFromTriangleVertexData(tmp[0], tmp[1], tmp[2]);
            this.calcTangentsFromTriangleVertexData(tmp[1], tmp[2], tmp[0]);
            this.calcTangentsFromTriangleVertexData(tmp[2], tmp[0], tmp[1]);
        }
    };
    Model.prototype.calcTangentsFromTriangleVertexData = function (v1, v2, v3) {
        var pos1 = v1.vertex;
        var pos2 = v2.vertex;
        var pos3 = v3.vertex;
        var uv1 = v1.textureCoord;
        var uv2 = v2.textureCoord;
        var uv3 = v3.textureCoord;
        var deltaPos1 = new float32vector_1.Float32Vector3(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
        var deltaPos2 = new float32vector_1.Float32Vector3(pos3.x - pos1.x, pos3.y - pos1.y, pos3.z - pos1.z);
        var deltaUV1 = new float32vector_1.Float32Vector2(uv2.x - uv1.x, uv2.y - uv1.y);
        var deltaUV2 = new float32vector_1.Float32Vector2(uv3.x - uv1.x, uv3.y - uv1.y);
        var r = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
        var t1 = deltaPos1.mulByScalar(deltaUV2.y);
        var t2 = deltaPos2.mulByScalar(deltaUV1.y);
        var tangent = t1.sub(t2).mulByScalar(r);
        var b1 = deltaPos2.mulByScalar(deltaUV1.x);
        var b2 = deltaPos1.mulByScalar(deltaUV2.x);
        var binormal = b1.sub(b2).mulByScalar(r);
        v1.tangent = tangent;
        v1.binormal = binormal;
    };
    Model.prototype.dumpInterleaved = function () {
        var interleaved = this._interleaved;
        var sliceNum = 14;
        var sliceCount = interleaved.length / sliceNum;
        for (var i = 0; i < sliceCount; i++) {
            var offset = sliceNum * i;
            var vertex = new float32vector_1.Float32Vector3(interleaved[offset + 0], interleaved[offset + 1], interleaved[offset + 2]);
            var normal = new float32vector_1.Float32Vector3(interleaved[offset + 3], interleaved[offset + 4], interleaved[offset + 5]);
            var tangent = new float32vector_1.Float32Vector3(interleaved[offset + 6], interleaved[offset + 7], interleaved[offset + 8]);
            var binormal = new float32vector_1.Float32Vector3(interleaved[offset + 9], interleaved[offset + 10], interleaved[offset + 11]);
            var textureCoord = new float32vector_1.Float32Vector2(interleaved[offset + 12], interleaved[offset + 13]);
            console.log(vertex.x + ", " + vertex.y + ", " + vertex.z + ",");
            console.log(normal.x + ", " + normal.y + ", " + normal.z + ",");
            console.log(tangent.x + ", " + tangent.y + ", " + tangent.z + ",");
            console.log(binormal.x + ", " + binormal.y + ", " + binormal.z + ",");
            console.log(textureCoord.x + ", " + textureCoord.y + ",");
        }
    };
    return Model;
}());
exports.Model = Model;
