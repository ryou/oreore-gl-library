import { Float32Vector2, Float32Vector3 } from './float32vector';
export declare class VertexData {
    protected _vertex: Float32Vector3;
    protected _normal: Float32Vector3;
    protected _textureCoord: Float32Vector2;
    protected _tangent: Float32Vector3;
    protected _binormal: Float32Vector3;
    constructor(_vertex: Float32Vector3, _normal: Float32Vector3, _textureCoord: Float32Vector2);
    readonly vertex: Float32Vector3;
    readonly normal: Float32Vector3;
    readonly textureCoord: Float32Vector2;
    tangent: Float32Vector3;
    binormal: Float32Vector3;
    getInterleavedValue(): number[];
}
export declare class Model {
    protected _id: string;
    protected _vertices: VertexData[];
    protected _indices: Uint16Array;
    protected _interleaved: Float32Array;
    constructor(_id: string, _vertices: VertexData[], _indices: Uint16Array);
    readonly id: string;
    readonly vertices: VertexData[];
    readonly indices: Uint16Array;
    readonly interleaved: Float32Array;
    calcInterleavedValues(): void;
    calcTangents(): void;
    calcTangentsFromTriangleVertexData(v1: VertexData, v2: VertexData, v3: VertexData): void;
    dumpInterleaved(): void;
}
