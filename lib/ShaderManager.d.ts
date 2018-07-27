import { ShaderUniformBase } from './ShaderUniform';
export declare class Shader {
    protected gl: WebGLRenderingContext;
    protected _id: string;
    protected _program: WebGLProgram;
    protected _fixedUniforms: ShaderUniformBase[];
    protected _customUniforms: ShaderUniformBase[];
    constructor(gl: WebGLRenderingContext, id: string, vSource: string, fSource: string, fixedUniforms: string[], customUniforms: ShaderUniformBase[]);
    readonly program: WebGLProgram;
    readonly id: string;
    readonly fixedUniforms: ShaderUniformBase[];
    readonly customUniforms: ShaderUniformBase[];
    readonly uniforms: ShaderUniformBase[];
    findUniform(name: string): ShaderUniformBase | undefined;
    setUniform(name: string, value: any): void;
}
export declare class ShaderManager {
    static instance: ShaderManager;
    protected _shaders: Shader[];
    protected _gl: WebGLRenderingContext;
    protected constructor();
    setContext(gl: WebGLRenderingContext): void;
    loadShaders(): Promise<void[]>;
    loadShader(options: {
        id: string;
        fixedUniforms: string[];
        customUniforms: ShaderUniformBase[];
    }): Promise<void>;
    find(id: string): Shader | undefined;
}
