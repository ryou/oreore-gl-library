import { OBJParser } from '../src/OBJParser';

const DELTA = 6;

describe('OBJParser', () => {

    const cubeObjData = `
# Blender v2.79 (sub 0) OBJ File: ''
# www.blender.org
mtllib cube.mtl
o Cube_Cube.001
v -1.000000 -1.000000 1.000000
v -1.000000 1.000000 1.000000
v -1.000000 -1.000000 -1.000000
v -1.000000 1.000000 -1.000000
v 1.000000 -1.000000 1.000000
v 1.000000 1.000000 1.000000
v 1.000000 -1.000000 -1.000000
v 1.000000 1.000000 -1.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vt 1.000000 0.000000
vt 0.000000 1.000000
vt 0.000000 0.000000
vt 1.000000 1.000000
vt 1.000000 1.000000
vt 1.000000 1.000000
vt 1.000000 1.000000
vt 1.000000 1.000000
vn -1.0000 0.0000 0.0000
vn 0.0000 0.0000 -1.0000
vn 1.0000 0.0000 0.0000
vn 0.0000 0.0000 1.0000
vn 0.0000 -1.0000 0.0000
vn 0.0000 1.0000 0.0000
usemtl None
s off
f 2/1/1 3/2/1 1/3/1
f 4/4/2 7/5/2 3/6/2
f 8/7/3 5/8/3 7/9/3
f 6/10/4 1/11/4 5/12/4
f 7/13/5 1/11/5 3/6/5
f 4/4/6 6/14/6 8/15/6
f 2/1/1 4/16/1 3/2/1
f 4/4/2 8/17/2 7/5/2
f 8/7/3 6/18/3 5/8/3
f 6/10/4 2/19/4 1/11/4
f 7/13/5 5/20/5 1/11/5
f 4/4/6 2/19/6 6/14/6
`;

    test('parse data', () => {
        const actual = OBJParser.parse(cubeObjData);
        const expected = {
            "vertex": [
                -1,
                1,
                1,
                -1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                -1,
                1,
                1,
                -1,
                1,
                -1,
                1,
                1,
                -1,
                -1,
                1,
                1,
                1,
                -1,
                -1,
                1,
                1,
                -1,
                1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                -1,
                -1,
                -1,
                1,
                -1,
                1,
                1,
                1,
                1,
                1,
                -1,
                -1,
                1,
                -1,
                1,
                1,
                -1,
                1,
                1,
                1,
                -1,
                1,
                1,
                1,
                -1,
                1,
                -1,
                1,
                1
            ],
            "normal": [
                -1,
                0,
                0,
                -1,
                0,
                0,
                -1,
                0,
                0,
                0,
                0,
                -1,
                0,
                0,
                -1,
                0,
                0,
                -1,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                -1,
                0,
                0,
                -1,
                0,
                0,
                -1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                -1,
                0,
                0,
                0,
                0,
                -1,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                -1,
                0,
                0,
                1,
                0
            ],
            "textureCoord": [
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            "index": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                0,
                18,
                1,
                3,
                19,
                4,
                6,
                20,
                7,
                9,
                21,
                10,
                12,
                22,
                13,
                15,
                23,
                16
            ]
        };

        expect(actual).toEqual(expected);
    });
    test('extract data', () => {
        const actual = OBJParser.extractOBJData(cubeObjData);

        const expected = {
            "v": [
                [
                    "-1.000000",
                    "-1.000000",
                    "1.000000"
                ],
                [
                    "-1.000000",
                    "1.000000",
                    "1.000000"
                ],
                [
                    "-1.000000",
                    "-1.000000",
                    "-1.000000"
                ],
                [
                    "-1.000000",
                    "1.000000",
                    "-1.000000"
                ],
                [
                    "1.000000",
                    "-1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "-1.000000",
                    "-1.000000"
                ],
                [
                    "1.000000",
                    "1.000000",
                    "-1.000000"
                ]
            ],
            "vt": [
                [
                    "1.000000",
                    "0.000000"
                ],
                [
                    "0.000000",
                    "1.000000"
                ],
                [
                    "0.000000",
                    "0.000000"
                ],
                [
                    "1.000000",
                    "0.000000"
                ],
                [
                    "0.000000",
                    "1.000000"
                ],
                [
                    "0.000000",
                    "0.000000"
                ],
                [
                    "1.000000",
                    "0.000000"
                ],
                [
                    "0.000000",
                    "1.000000"
                ],
                [
                    "0.000000",
                    "0.000000"
                ],
                [
                    "1.000000",
                    "0.000000"
                ],
                [
                    "0.000000",
                    "1.000000"
                ],
                [
                    "0.000000",
                    "0.000000"
                ],
                [
                    "1.000000",
                    "0.000000"
                ],
                [
                    "0.000000",
                    "1.000000"
                ],
                [
                    "0.000000",
                    "0.000000"
                ],
                [
                    "1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "1.000000"
                ],
                [
                    "1.000000",
                    "1.000000"
                ]
            ],
            "vn": [
                [
                    "-1.0000",
                    "0.0000",
                    "0.0000"
                ],
                [
                    "0.0000",
                    "0.0000",
                    "-1.0000"
                ],
                [
                    "1.0000",
                    "0.0000",
                    "0.0000"
                ],
                [
                    "0.0000",
                    "0.0000",
                    "1.0000"
                ],
                [
                    "0.0000",
                    "-1.0000",
                    "0.0000"
                ],
                [
                    "0.0000",
                    "1.0000",
                    "0.0000"
                ]
            ],
            "f": [
                "2/1/1",
                "3/2/1",
                "1/3/1",
                "4/4/2",
                "7/5/2",
                "3/6/2",
                "8/7/3",
                "5/8/3",
                "7/9/3",
                "6/10/4",
                "1/11/4",
                "5/12/4",
                "7/13/5",
                "1/11/5",
                "3/6/5",
                "4/4/6",
                "6/14/6",
                "8/15/6",
                "2/1/1",
                "4/16/1",
                "3/2/1",
                "4/4/2",
                "8/17/2",
                "7/5/2",
                "8/7/3",
                "6/18/3",
                "5/8/3",
                "6/10/4",
                "2/19/4",
                "1/11/4",
                "7/13/5",
                "5/20/5",
                "1/11/5",
                "4/4/6",
                "2/19/6",
                "6/14/6"
            ]
        };

        expect(actual).toEqual(expected);
    });
});
