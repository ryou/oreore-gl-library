"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("./Model");
var float32vector_1 = require("./float32vector");
var OBJParser = /** @class */ (function () {
    function OBJParser() {
    }
    OBJParser.parse = function (objData) {
        var data = OBJParser.extractOBJData(objData);
        var fiMap = []; // data.fから重複を取り除いたもの
        var indexArray = [];
        data.f.forEach(function (f) {
            var index = fiMap.findIndex(function (item) { return item === f; });
            if (index === -1) {
                // 新規
                index = fiMap.length;
                var newItem = f;
                fiMap.push(newItem);
            }
            indexArray.push(index);
        });
        var vertexArrayTmp = [];
        var texCoordArrayTmp = [];
        var normalArrayTmp = [];
        fiMap.forEach(function (fi) {
            var splitData = fi.split('/');
            if (splitData.length !== 3)
                console.error('fのデータが不正です。');
            var vertex = Number(splitData[0]) - 1;
            var texCoord = Number(splitData[1]) - 1;
            var normal = Number(splitData[2]) - 1;
            vertexArrayTmp.push(data.v[vertex]);
            texCoordArrayTmp.push(data.vt[texCoord]);
            normalArrayTmp.push(data.vn[normal]);
        });
        var vertexArrayTmp2 = vertexArrayTmp.reduce(function (ac, current) { return ac.concat(current); });
        var texCoordArrayTmp2 = texCoordArrayTmp.reduce(function (ac, current) { return ac.concat(current); });
        var normalArrayTmp2 = normalArrayTmp.reduce(function (ac, current) { return ac.concat(current); });
        var vertexArray = vertexArrayTmp2.map(function (item) { return Number(item); });
        var texCoordArray = texCoordArrayTmp2.map(function (item) { return Number(item); });
        var normalArray = normalArrayTmp2.map(function (item) { return Number(item); });
        var vertexDataArray = [];
        while (true) {
            if (vertexArray.length <= 0)
                break;
            var vertex = vertexArray.splice(0, 3);
            var normal = normalArray.splice(0, 3);
            var textureCoord = texCoordArray.splice(0, 2);
            var data_1 = new Model_1.VertexData(new float32vector_1.Float32Vector3(vertex[0], vertex[1], vertex[2]), new float32vector_1.Float32Vector3(normal[0], normal[1], normal[2]), new float32vector_1.Float32Vector2(textureCoord[0], textureCoord[1]));
            vertexDataArray.push(data_1);
        }
        return {
            verticies: vertexDataArray,
            indicies: indexArray,
        };
    };
    // objデータから'v','vn','f'を抽出し
    // {
    //    v: [ [1,0,0,], [0,1,0], ... ],
    //    vn: [ [1,0,0,], [0,0,1], ... ],
    //    f: [ '2//1', '3//1', '1//1', ... ],
    // }
    // の形式で返却
    OBJParser.extractOBJData = function (objData) {
        var out = {
            v: [],
            vt: [],
            vn: [],
            f: [],
        };
        var newLine = /\r\n|\r|\n/;
        var lines = objData.split(newLine);
        var f = [];
        lines.forEach(function (line) {
            var words = line.split(' ');
            var id = words.shift();
            switch (id) {
                case 'v':
                    out.v.push(words);
                    break;
                case 'vt':
                    out.vt.push(words);
                    break;
                case 'vn':
                    out.vn.push(words);
                    break;
                case 'f':
                    if (words.length !== 3)
                        console.error('三角面でないポリゴンが含まれています。');
                    f.push(words);
                    break;
                default:
                    break;
            }
        });
        var newF = f.reduce(function (ac, current) { return ac.concat(current); });
        out.f = newF;
        return out;
    };
    return OBJParser;
}());
exports.OBJParser = OBJParser;
