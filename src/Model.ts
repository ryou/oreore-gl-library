import { Float32Vector2, Float32Vector3 } from './float32vector';

export class VertexData {
    protected _tangent: Float32Vector3;
    protected _binormal: Float32Vector3;

    constructor(protected _vertex: Float32Vector3, protected _normal: Float32Vector3, protected _textureCoord: Float32Vector2) {}

    get vertex() {
        return this._vertex;
    }

    get normal() {
        return this._normal;
    }

    get textureCoord() {
        return this._textureCoord;
    }

    get tangent() {
        return this._tangent;
    }

    set tangent(value: Float32Vector3) {
        this._tangent = value;
    }

    get binormal() {
        return this._binormal;
    }

    set binormal(value: Float32Vector3) {
        this._binormal = value;
    }

    getInterleavedValue(): number[] {
        let out: number[] = [];
        out = out.concat(this._vertex.toNumberArray());
        out = out.concat(this._normal.toNumberArray());
        out = out.concat(this._tangent.toNumberArray());
        out = out.concat(this._binormal.toNumberArray());
        out = out.concat(this._textureCoord.toNumberArray());

        return out;
    }
}

export class Model {
    protected _interleaved: Float32Array;

    constructor(protected _id: string, protected _vertices: VertexData[], protected _indices: Uint16Array) {}

    get id() {
        return this._id;
    }

    get vertices() {
        return this._vertices;
    }

    get indices() {
        return this._indices;
    }

    get interleaved() {
        return this._interleaved;
    }

    calcInterleavedValues() {
        let tmp: number[] = [];

        this._vertices.forEach(vertex => {
            tmp = tmp.concat(vertex.getInterleavedValue())
        });

        this._interleaved = new Float32Array(tmp);
    }

    calcTangents() {
        const sliceNum = 3;
        const sliceCount = this.indices.length / 3;
        for (let i=0; i<sliceCount; i++) {
            const tmp = [
                this._vertices[this._indices[sliceNum * i]],
                this._vertices[this._indices[sliceNum * i + 1]],
                this._vertices[this._indices[sliceNum * i + 2]],
            ]
            this.calcTangentsFromTriangleVertexData(tmp[0], tmp[1], tmp[2]);
            this.calcTangentsFromTriangleVertexData(tmp[1], tmp[2], tmp[0]);
            this.calcTangentsFromTriangleVertexData(tmp[2], tmp[0], tmp[1]);
        }
    }

    calcTangentsFromTriangleVertexData(v1: VertexData, v2: VertexData, v3: VertexData) {
        const pos1 = v1.vertex;
        const pos2 = v2.vertex;
        const pos3 = v3.vertex;
        const uv1 = v1.textureCoord;
        const uv2 = v2.textureCoord;
        const uv3 = v3.textureCoord;

        const deltaPos1 = new Float32Vector3(pos2.x - pos1.x, pos2.y - pos1.y, pos2.z - pos1.z);
        const deltaPos2 = new Float32Vector3(pos3.x - pos1.x, pos3.y - pos1.y, pos3.z - pos1.z);
        const deltaUV1 = new Float32Vector2(uv2.x - uv1.x, uv2.y - uv1.y);
        const deltaUV2 = new Float32Vector2(uv3.x - uv1.x, uv3.y - uv1.y);

        const r = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
        const t1 = deltaPos1.mulByScalar(deltaUV2.y);
        const t2 = deltaPos2.mulByScalar(deltaUV1.y);
        const tangent = t1.sub(t2).mulByScalar(r);
        const b1 = deltaPos2.mulByScalar(deltaUV1.x);
        const b2 = deltaPos1.mulByScalar(deltaUV2.x);
        const binormal = b1.sub(b2).mulByScalar(r);

        v1.tangent = tangent;
        v1.binormal = binormal;
    }

    dumpInterleaved() {
        const interleaved = this._interleaved;
        const sliceNum = 14;
        const sliceCount = interleaved.length / sliceNum;

        for (let i=0; i<sliceCount; i++) {
            const offset = sliceNum * i;
            const vertex = new Float32Vector3(
                interleaved[offset + 0],
                interleaved[offset + 1],
                interleaved[offset + 2]
            );
            const normal = new Float32Vector3(
                interleaved[offset + 3],
                interleaved[offset + 4],
                interleaved[offset + 5]
            );
            const tangent = new Float32Vector3(
                interleaved[offset + 6],
                interleaved[offset + 7],
                interleaved[offset + 8]
            );
            const binormal = new Float32Vector3(
                interleaved[offset + 9],
                interleaved[offset + 10],
                interleaved[offset + 11]
            );
            const textureCoord = new Float32Vector2(
                interleaved[offset + 12],
                interleaved[offset + 13]
            );
            console.log(`${vertex.x}, ${vertex.y}, ${vertex.z},`);
            console.log(`${normal.x}, ${normal.y}, ${normal.z},`);
            console.log(`${tangent.x}, ${tangent.y}, ${tangent.z},`);
            console.log(`${binormal.x}, ${binormal.y}, ${binormal.z},`);
            console.log(`${textureCoord.x}, ${textureCoord.y},`);
        }
    }
}
