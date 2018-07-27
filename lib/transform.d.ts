import { Float32Vector3 } from './float32vector';
import { Matrix4x4 } from './matrix';
export declare class Transform {
    protected _position: Float32Vector3;
    protected _rotate: Float32Vector3;
    protected _scale: Float32Vector3;
    constructor();
    position: Float32Vector3;
    rotate: Float32Vector3;
    scale: Float32Vector3;
    addPosition(x: number, y: number, z: number): void;
    addRotation(rx: number, ry: number, rz: number): void;
    readonly matrix: Matrix4x4;
    static mulVectorAndMatrix(matrix: Matrix4x4, vector: Float32Vector3): Float32Vector3;
}
