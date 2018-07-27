"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TEXTURE_TYPE;
(function (TEXTURE_TYPE) {
    TEXTURE_TYPE[TEXTURE_TYPE["NORMAL"] = 0] = "NORMAL";
    TEXTURE_TYPE[TEXTURE_TYPE["CUBEMAP"] = 1] = "CUBEMAP";
})(TEXTURE_TYPE = exports.TEXTURE_TYPE || (exports.TEXTURE_TYPE = {}));
exports.textures = [
    {
        id: 'default/white',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/default_textures/white.png',
    },
    {
        id: 'default/bump',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/default_textures/bump.png',
    },
    {
        id: 'default/cubemap',
        type: TEXTURE_TYPE.CUBEMAP,
        path: './images/default_textures/cubemap',
    },
    {
        id: 'tex',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tex.jpg',
    },
    {
        id: 'tex',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tex.jpg',
    },
    {
        id: 'tex2',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tex2.jpg',
    },
    {
        id: 'PavingStones/Color',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/paving_stones/PavingStones19_col.jpg'
    },
    {
        id: 'PavingStones/AO',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/paving_stones/PavingStones19_AO.jpg'
    },
    {
        id: 'PavingStones/Normal',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/paving_stones/PavingStones19_nrm.jpg'
    },
    {
        id: 'Tiles/Color',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tiles/Tiles10_col.jpg'
    },
    {
        id: 'Tiles/AO',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tiles/Tiles10_AO.jpg'
    },
    {
        id: 'Tiles/Normal',
        type: TEXTURE_TYPE.NORMAL,
        path: './images/tiles/Tiles10_nrm.jpg'
    },
    {
        id: 'Cubemap/01',
        type: TEXTURE_TYPE.CUBEMAP,
        path: './images/cubemap/yokohama'
    },
    {
        id: 'Cubemap/Chapel',
        type: TEXTURE_TYPE.CUBEMAP,
        path: './images/cubemap/chapel'
    },
];
