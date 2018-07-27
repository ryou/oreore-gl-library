import { Vector2Base, Vector3Base, Vector4Base } from './vector_base';
import { Matrix4x4 } from './matrix';
export declare class Float32Vector2 extends Vector2Base<Float32Array> {
    constructor(x: number, y: number);
    add(other: Float32Vector2): Float32Vector2;
    sub(other: Float32Vector2): Float32Vector2;
    mulByScalar(scalar: number): Float32Vector2;
    dot(other: Float32Vector2): number;
    normalize(): Float32Vector2;
}
export declare class Float32Vector3 extends Vector3Base<Float32Array> {
    constructor(x: number, y: number, z: number);
    add(other: Float32Vector3): Float32Vector3;
    sub(other: Float32Vector3): Float32Vector3;
    mulByScalar(scalar: number): Float32Vector3;
    dot(other: Float32Vector3): number;
    cross(other: Float32Vector3): Float32Vector3;
    normalize(): Float32Vector3;
    readonly xy: Float32Vector2;
}
export declare class Float32Vector4 extends Vector4Base<Float32Array> {
    constructor(x: number, y: number, z: number, w: number);
    add(other: Float32Vector4): Float32Vector4;
    sub(other: Float32Vector4): Float32Vector4;
    mulByScalar(scalar: number): Float32Vector4;
    mulByMatrix(matrix: Matrix4x4): Float32Vector4;
    dot(other: Float32Vector4): number;
    normalize(): Float32Vector4;
    readonly xyz: Float32Vector3;
}
export declare const Vector2: typeof Float32Vector2;
export declare const Vector3: typeof Float32Vector3;
export declare const Vector4: typeof Float32Vector4;
