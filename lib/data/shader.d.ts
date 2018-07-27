import { ShaderUniformColor, ShaderUniformFloat, ShaderUniformTexture, ShaderUniformTextureCubemap } from '../ShaderUniform';
export declare const shaderDefinitionArray: {
    id: string;
    fixedUniforms: string[];
    customUniforms: (ShaderUniformColor | ShaderUniformTexture | ShaderUniformTextureCubemap | ShaderUniformFloat)[];
}[];
