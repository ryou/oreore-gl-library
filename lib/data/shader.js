"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var float32vector_1 = require("../float32vector");
var ShaderUniform_1 = require("../ShaderUniform");
exports.shaderDefinitionArray = [
    {
        id: 'standard',
        fixedUniforms: [
            'modelMatrix',
            'viewMatrix',
            'projectionMatrix',
            'worldCameraPosition',
        ],
        customUniforms: [
            new ShaderUniform_1.ShaderUniformColor('color', new float32vector_1.Vector4(0.5, 0.5, 0.5, 1.0)),
            new ShaderUniform_1.ShaderUniformFloat('metallic', 0.0),
            new ShaderUniform_1.ShaderUniformFloat('normalMagnification', 1.0),
            // ノーマルマップのY軸方向に乗算する値
            // DirectX用のノーマルマップを使用する場合は、-1.0を指定
            new ShaderUniform_1.ShaderUniformFloat('normalYMultiple', 1.0),
            new ShaderUniform_1.ShaderUniformTexture('mainTexture', 'default/white', 0),
            new ShaderUniform_1.ShaderUniformTexture('aoTexture', 'default/white', 1),
            new ShaderUniform_1.ShaderUniformTexture('normalTexture', 'default/bump', 2),
            new ShaderUniform_1.ShaderUniformTextureCubemap('cubemapTexture', 'default/cubemap', 3),
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
            new ShaderUniform_1.ShaderUniformTextureCubemap('cubemapTexture', 'default/cubemap', 0),
        ],
    },
];
