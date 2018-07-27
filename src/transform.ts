import { Vector3, Float32Vector3, Vector4 } from './float32vector';
import { Matrix4x4 } from './matrix';

export class Transform {
    protected _position: Float32Vector3;
    protected _rotate: Float32Vector3;
    protected _scale: Float32Vector3;

    constructor() {
        this._position = new Vector3(0, 0, 0);
        this._rotate = new Vector3(0, 0, 0);
        this._scale = new Vector3(1, 1, 1);
    }

    get position() {
        return this._position;
    }

    set position(newPosition: Float32Vector3) {
        this._position.x = newPosition.x;
        this._position.y = newPosition.y;
        this._position.z = newPosition.z;
    }

    get rotate() {
        return this._rotate;
    }

    set rotate(newRotation: Float32Vector3) {
        this._rotate.x = newRotation.x;
        this._rotate.y = newRotation.y;
        this._rotate.z = newRotation.z;
    }

    get scale() {
        return this._scale;
    }

    set scale(newScale: Float32Vector3) {
        this._scale.x = newScale.x;
        this._scale.y = newScale.y;
        this._scale.z = newScale.z;
    }

    addPosition(x: number, y: number, z: number) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
    }

    addRotation(rx: number, ry: number, rz: number) {
        this._rotate.x += rx;
        this._rotate.y += ry;
        this._rotate.z += rz;
    }

    // 変換行列の返却
    get matrix() {
        return Matrix4x4.scaling(this.scale.x, this.scale.y, this.scale.z)
                    .rotateX(this.rotate.x)
                    .rotateY(this.rotate.y)
                    .rotateZ(this.rotate.z)
                    .translate(this.position.x, this.position.y, this.position.z);
    }

    static mulVectorAndMatrix(matrix: Matrix4x4, vector: Float32Vector3) {
        const vector4 = new Vector4(vector.x, vector.y, vector.z, 1);
        
        const result = new Vector4(
            (matrix.values[0] * vector4.x) + (matrix.values[4] * vector4.y) + (matrix.values[8]  * vector4.z) + (matrix.values[12] * vector4.w),
            (matrix.values[1] * vector4.x) + (matrix.values[5] * vector4.y) + (matrix.values[9]  * vector4.z) + (matrix.values[13] * vector4.w),
            (matrix.values[2] * vector4.x) + (matrix.values[6] * vector4.y) + (matrix.values[10] * vector4.z) + (matrix.values[14] * vector4.w),
            (matrix.values[3] * vector4.x) + (matrix.values[7] * vector4.y) + (matrix.values[11] * vector4.z) + (matrix.values[15] * vector4.w)
        );
        
        return new Vector3(
            result.x / result.w,
            result.y / result.w,
            result.z / result.w
        );
    }
}
