import { Vector4 } from '../float32vector';
import { ShaderUniformColor, ShaderUniformFloat, ShaderUniformTexture, ShaderUniformTextureCubemap } from '../ShaderUniform'

export const shaderDefinitionArray = [
    {
        id: 'standard',
        fixedUniforms: [
            'modelMatrix',
            'viewMatrix',
            'projectionMatrix',
            'worldCameraPosition',
        ],
        customUniforms: [
            new ShaderUniformColor('color', new Vector4(0.5, 0.5, 0.5, 1.0)),
            new ShaderUniformFloat('metallic', 0.0),
            new ShaderUniformFloat('normalMagnification', 1.0),
            // ノーマルマップのY軸方向に乗算する値
            // DirectX用のノーマルマップを使用する場合は、-1.0を指定
            new ShaderUniformFloat('normalYMultiple', 1.0),
            new ShaderUniformTexture('mainTexture', 'default/white', 0),
            new ShaderUniformTexture('aoTexture', 'default/white', 1),
            new ShaderUniformTexture('normalTexture', 'default/bump', 2),
            new ShaderUniformTextureCubemap('cubemapTexture', 'default/cubemap', 3),
        ],
    },
    {
        id: 'skybox',
        fixedUniforms: [
            'modelMatrix',
            'viewMatrix',
            'projectionMatrix',
        ],
        customUniforms: [
            new ShaderUniformTextureCubemap('cubemapTexture', 'default/cubemap', 0),
        ],
    },
];
