import { TextureManager } from './TextureManager';
import { Float32Vector3, Float32Vector4 } from './float32vector';
import { Matrix4x4 } from './matrix';

export enum ShaderUniformType {
    Color,
    Texture,
    TextureCubemap,
    Float,
    Vector3,
    Matrix4,
}

export abstract class ShaderUniformBase {
    constructor(protected _name: string, protected _type: ShaderUniformType) {}

    get type() {
        return this._type;
    }

    get name() {
        return this._name;
    }

    abstract get defaultValue(): any;

    abstract setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: any): void;
}

export class ShaderUniformColor extends ShaderUniformBase {
    constructor(name: string, protected _defaultValue: Float32Vector4) {
        super(name, ShaderUniformType.Color);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Float32Vector4) {
        const location = context.getUniformLocation(program, this._name);
        if (location !== null) context.uniform4f(location, value.x, value.y, value.z, value.w);
        else console.error(`${this.name} location is null.`);
    }
}

export class ShaderUniformVector3 extends ShaderUniformBase {
    constructor(name: string, protected _defaultValue: Float32Vector3) {
        super(name, ShaderUniformType.Color);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Float32Vector3) {
        const location = context.getUniformLocation(program, this._name);
        if (location !== null) context.uniform3f(location, value.x, value.y, value.z);
        else console.error(`${this.name} location is null.`);
    }
}

export class ShaderUniformMatrix4 extends ShaderUniformBase {
    constructor(name: string, protected _defaultValue: Matrix4x4) {
        super(name, ShaderUniformType.Matrix4);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Matrix4x4) {
        const location = context.getUniformLocation(program, this._name);
        context.uniformMatrix4fv(location, false, value.values);
    }
}

export class ShaderUniformTexture extends ShaderUniformBase {
    // TODO: デフォルト値として、色を与えることが可能なようにする
    constructor(name: string, protected _defaultValue: string, protected _index: number) {
        super(name, ShaderUniformType.Color);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: string) {
        const textureMap = [
            context.TEXTURE0,
            context.TEXTURE1,
            context.TEXTURE2,
            context.TEXTURE3,
            context.TEXTURE4,
            context.TEXTURE5,
            context.TEXTURE6,
            context.TEXTURE7,
            context.TEXTURE8,
            context.TEXTURE9,
        ];

        const texture = TextureManager.instance.find(value);
        if (texture === undefined) {
            console.error(`texture ${value} is not found.`);
            return;
        }
        const location = context.getUniformLocation(program, this._name);
        context.activeTexture(textureMap[this._index])
        context.bindTexture(context.TEXTURE_2D, texture.texture);
        context.uniform1i(location, this._index);
    }
}

export class ShaderUniformTextureCubemap extends ShaderUniformBase {
    // TODO: デフォルト値として、色を与えることが可能なようにする
    constructor(name: string, protected _defaultValue: string, protected _index: number) {
        super(name, ShaderUniformType.Color);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: string) {
        const textureMap = [
            context.TEXTURE0,
            context.TEXTURE1,
            context.TEXTURE2,
            context.TEXTURE3,
            context.TEXTURE4,
            context.TEXTURE5,
            context.TEXTURE6,
            context.TEXTURE7,
            context.TEXTURE8,
            context.TEXTURE9,
        ];

        const texture = TextureManager.instance.find(value);
        if (texture === undefined) {
            console.error(`texture ${value} is not found.`);
            return;
        }
        const location = context.getUniformLocation(program, this._name);
        context.activeTexture(textureMap[this._index]);
        context.bindTexture(context.TEXTURE_CUBE_MAP, texture.texture);
        context.uniform1i(location, this._index);
    }
}

export class ShaderUniformFloat extends ShaderUniformBase {
    constructor(name: string, protected _defaultValue: number) {
        super(name, ShaderUniformType.Float);
    }

    get defaultValue() {
        return this._defaultValue;
    }

    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: number) {
        const location = context.getUniformLocation(program, this._name);
        context.uniform1f(location, value);
    }
}
