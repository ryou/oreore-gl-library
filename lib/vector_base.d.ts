export declare type TypedArrayLike = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
export interface Vector<T extends TypedArrayLike> {
    readonly values: T;
    readonly magnitude: number;
    toString(): string;
    toNumberArray(): number[];
}
export declare abstract class VectorBase<T extends TypedArrayLike> implements Vector<T> {
    protected _values: T;
    readonly values: T;
    readonly magnitude: number;
    toString(): string;
    toNumberArray(): number[];
}
export declare abstract class Vector2Base<T extends TypedArrayLike> extends VectorBase<T> {
    x: number;
    y: number;
}
export declare abstract class Vector3Base<T extends TypedArrayLike> extends Vector2Base<T> {
    z: number;
}
export declare abstract class Vector4Base<T extends TypedArrayLike> extends Vector3Base<T> {
    w: number;
}
