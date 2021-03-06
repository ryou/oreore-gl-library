"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            {
                type: 'color',
                name: 'color',
                options: {
                    default: [0.5, 0.5, 0.5, 1.0],
                },
            },
            {
                type: 'float',
                name: 'metallic',
                options: {
                    default: 0.0,
                },
            },
            {
                type: 'float',
                name: 'normalMagnification',
                options: {
                    default: 1.0,
                },
            },
            {
                type: 'float',
                name: 'normalYMultiple',
                options: {
                    default: 1.0,
                },
            },
            {
                type: 'texture',
                name: 'mainTexture',
                options: {
                    default: 'default/white',
                    index: 0,
                },
            },
            {
                type: 'texture',
                name: 'aoTexture',
                options: {
                    default: 'default/white',
                    index: 1,
                },
            },
            {
                type: 'texture',
                name: 'normalTexture',
                options: {
                    default: 'default/bump',
                    index: 2,
                },
            },
            {
                type: 'cubemap',
                name: 'cubemapTexture',
                options: {
                    default: 'default/cubemap',
                    index: 3,
                },
            },
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
            {
                type: 'cubemap',
                name: 'cubemapTexture',
                options: {
                    default: 'default/cubemap',
                    index: 0,
                },
            },
        ],
    },
];
