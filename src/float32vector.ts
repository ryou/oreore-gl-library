import { Vector2Base, Vector3Base, Vector4Base } from './vector_base';
import { Matrix4x4 } from './matrix';


export class Float32Vector2 extends Vector2Base<Float32Array> {
    constructor(x: number, y: number) {
        super();
        this._values = new Float32Array([x, y]);
    }

    add(other: Float32Vector2): Float32Vector2 {
        return new Float32Vector2(this.x + other.x, this.y + other.y);
    }

    sub(other: Float32Vector2): Float32Vector2 {
        return new Float32Vector2(this.x - other.x, this.y - other.y);
    }

    mulByScalar(scalar: number): Float32Vector2 {
        return new Float32Vector2(this.x * scalar, this.y * scalar);
    }

    dot(other: Float32Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    normalize(): Float32Vector2 {
        if (this.magnitude === 0) return this;
        return this.mulByScalar(1 / this.magnitude);
    }
}

export class Float32Vector3 extends Vector3Base<Float32Array> {
    constructor(x: number, y: number, z: number) {
        super();
        this._values = new Float32Array([x, y, z]);
    }

    add(other: Float32Vector3): Float32Vector3 {
        return new Float32Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    sub(other: Float32Vector3): Float32Vector3 {
        return new Float32Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    mulByScalar(scalar: number): Float32Vector3 {
        return new Float32Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    dot(other: Float32Vector3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    cross(other: Float32Vector3): Float32Vector3 {
        const cx = this.y * other.z - this.z * other.y;
        const cy = this.z * other.x - this.x * other.z;
        const cz = this.x * other.y - this.y * other.x;

        return new Float32Vector3(cx, cy, cz);
    }

    normalize(): Float32Vector3 {
        if (this.magnitude === 0) return this;
        return this.mulByScalar(1 / this.magnitude);
    }

    get xy(): Float32Vector2 {
        return new Float32Vector2(this.x, this.y);
    }
}


export class Float32Vector4 extends Vector4Base<Float32Array> {
    constructor(x: number, y: number, z: number, w: number) {
        super();
        this._values = new Float32Array([x, y, z, w]);
    }

    add(other: Float32Vector4): Float32Vector4 {
        return new Float32Vector4(
            this.x + other.x,
            this.y + other.y,
            this.z + other.z,
            this.w + other.w
        );
    }

    sub(other: Float32Vector4): Float32Vector4 {
        return new Float32Vector4(
            this.x - other.x,
            this.y - other.y,
            this.z - other.z,
            this.w - other.w
        );
    }

    mulByScalar(scalar: number): Float32Vector4 {
        return new Float32Vector4(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar,
            this.w * scalar
        );
    }

    mulByMatrix(matrix: Matrix4x4): Float32Vector4 {
        return new Float32Vector4(
            (matrix.values[0] * this.x) + (matrix.values[4] * this.y) + (matrix.values[8]  * this.z) + (matrix.values[12] * this.w),
            (matrix.values[1] * this.x) + (matrix.values[5] * this.y) + (matrix.values[9]  * this.z) + (matrix.values[13] * this.w),
            (matrix.values[2] * this.x) + (matrix.values[6] * this.y) + (matrix.values[10] * this.z) + (matrix.values[14] * this.w),
            (matrix.values[3] * this.x) + (matrix.values[7] * this.y) + (matrix.values[11] * this.z) + (matrix.values[15] * this.w)
        );
    }

    dot(other: Float32Vector4): number {
        return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    }

    normalize(): Float32Vector4 {
        if (this.magnitude === 0) return this;
        return this.mulByScalar(1 / this.magnitude);
    }

    get xyz(): Float32Vector3 {
        return new Float32Vector3(this.x, this.y, this.z);
    }
}

export const Vector2 = Float32Vector2;
export const Vector3 = Float32Vector3;
export const Vector4 = Float32Vector4;
