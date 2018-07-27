// ユーザー定義型
// 下記URLの`Type Aliases`を参照
// https://www.typescriptlang.org/docs/handbook/advanced-types.html
export type TypedArrayLike = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;

export interface Vector<T extends TypedArrayLike> {
    readonly values: T;
    readonly magnitude: number;
    toString(): string;
    toNumberArray(): number[];
}

export abstract class VectorBase<T extends TypedArrayLike> implements Vector<T> {
    protected _values: T;

    get values(): T {
        return this._values;
    }

    get magnitude(): number {
        const sumSq: number = this._values.reduce((prev: number, current: number) => prev + (current ** 2), 0);
        return Math.sqrt(sumSq);
    }

    toString(): string {
        const dimension = this._values.length;
        return `Vector${dimension}(${this._values.join(', ')})`;
    }

    toNumberArray(): number[] {
        const out: number[] = [];
        this._values.forEach(value => out.push(value));

        return out;
    }
}


export abstract class Vector2Base<T extends TypedArrayLike> extends VectorBase<T> {
    get x(): number {
        return this._values[0];
    }

    get y(): number {
        return this._values[1];
    }

    set x(value: number) {
        this._values[0] = value;
    }

    set y(value: number) {
        this._values[1] = value;
    }
}


export abstract class Vector3Base<T extends TypedArrayLike> extends Vector2Base<T> {
    get z(): number {
        return this._values[2];
    }

    set z(value: number) {
        this._values[2] = value;
    }
}


export abstract class Vector4Base<T extends TypedArrayLike> extends Vector3Base<T> {
    get w(): number {
        return this._values[3];
    }

    set w(value: number) {
        this._values[3] = value;
    }
}

