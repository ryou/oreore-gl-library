"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var float32vector_1 = require("../float32vector");
exports.materialDefinitions = [
    {
        id: 'standard',
        shader: 'standard',
        options: [
            {
                name: 'color',
                value: new float32vector_1.Float32Vector4(1.0, 1.0, 1.0, 1.0),
            },
            {
                name: 'mainTexture',
                value: 'PavingStones/Color',
            },
            {
                name: 'aoTexture',
                value: 'PavingStones/AO',
            },
            {
                name: 'normalTexture',
                value: 'PavingStones/Normal',
            },
            {
                name: 'cubemapTexture',
                value: 'Cubemap/Chapel',
            },
        ],
    },
    {
        id: 'standard/tiles',
        shader: 'standard',
        options: [
            {
                name: 'color',
                value: new float32vector_1.Float32Vector4(1.0, 1.0, 1.0, 1.0),
            },
            {
                name: 'metallic',
                value: 1.0,
            },
            {
                name: 'normalMagnification',
                value: 1.0,
            },
            {
                name: 'mainTexture',
                value: 'Tiles/Color',
            },
            {
                name: 'aoTexture',
                value: 'Tiles/AO',
            },
            {
                name: 'normalTexture',
                value: 'Tiles/Normal',
            },
            {
                name: 'cubemapTexture',
                value: 'Cubemap/Chapel',
            },
        ],
    },
    {
        id: 'standard/default',
        shader: 'standard',
        options: [],
    },
    {
        id: 'skybox',
        shader: 'skybox',
        options: [
            {
                name: 'cubemapTexture',
                value: 'Cubemap/Chapel',
            },
        ],
    },
];