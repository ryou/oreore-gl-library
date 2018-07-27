import { Float32Vector3, Float32Vector4 } from './float32vector';
import { Matrix4x4 } from './matrix';
export declare enum ShaderUniformType {
    Color = 0,
    Texture = 1,
    TextureCubemap = 2,
    Float = 3,
    Vector3 = 4,
    Matrix4 = 5
}
export declare abstract class ShaderUniformBase {
    protected _name: string;
    protected _type: ShaderUniformType;
    constructor(_name: string, _type: ShaderUniformType);
    readonly type: ShaderUniformType;
    readonly name: string;
    abstract readonly defaultValue: any;
    abstract setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: any): void;
}
export declare class ShaderUniformColor extends ShaderUniformBase {
    protected _defaultValue: Float32Vector4;
    constructor(name: string, _defaultValue: Float32Vector4);
    readonly defaultValue: Float32Vector4;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Float32Vector4): void;
}
export declare class ShaderUniformVector3 extends ShaderUniformBase {
    protected _defaultValue: Float32Vector3;
    constructor(name: string, _defaultValue: Float32Vector3);
    readonly defaultValue: Float32Vector3;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Float32Vector3): void;
}
export declare class ShaderUniformMatrix4 extends ShaderUniformBase {
    protected _defaultValue: Matrix4x4;
    constructor(name: string, _defaultValue: Matrix4x4);
    readonly defaultValue: Matrix4x4;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: Matrix4x4): void;
}
export declare class ShaderUniformTexture extends ShaderUniformBase {
    protected _defaultValue: string;
    protected _index: number;
    constructor(name: string, _defaultValue: string, _index: number);
    readonly defaultValue: string;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: string): void;
}
export declare class ShaderUniformTextureCubemap extends ShaderUniformBase {
    protected _defaultValue: string;
    protected _index: number;
    constructor(name: string, _defaultValue: string, _index: number);
    readonly defaultValue: string;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: string): void;
}
export declare class ShaderUniformFloat extends ShaderUniformBase {
    protected _defaultValue: number;
    constructor(name: string, _defaultValue: number);
    readonly defaultValue: number;
    setGLUniform(context: WebGLRenderingContext, program: WebGLProgram, value: number): void;
}
