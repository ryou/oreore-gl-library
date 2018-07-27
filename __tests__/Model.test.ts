import { Model, VertexData } from '../src/Model';
import { Float32Vector2, Float32Vector3 } from '../src/float32vector';

const DELTA = 6;

describe('Model', () => {
    test('Calc Tangent', () => {
        const vertex: VertexData[] = [
            new VertexData(
                new Float32Vector3(0, 1, 0),
                new Float32Vector3(0, 0, 1),
                new Float32Vector2(0, 1)
            ),
            new VertexData(
                new Float32Vector3(1, 1, 0),
                new Float32Vector3(0, 0, 1),
                new Float32Vector2(1, 1)
            ),
            new VertexData(
                new Float32Vector3(0, 0, 0),
                new Float32Vector3(0, 0, 1),
                new Float32Vector2(0, 0)
            ),
            new VertexData(
                new Float32Vector3(1, 0, 0),
                new Float32Vector3(0, 0, 1),
                new Float32Vector2(1, 0)
            ),
        ];
        const model = new Model(
            'test',
            vertex,
            new Uint16Array([
                0, 2, 1,
                1, 2, 3
            ])
        );
        model.calcTangents();
        model.calcInterleavedValues();

        const expectArray = new Float32Array([
            0, 1, 0,
            0, 0, 1,
            1, 0, 0,
            0, 1, 0,
            0, 1,
            1, 1, 0,
            0, 0, 1,
            1, 0, 0,
            0, 1, 0,
            1, 1,
            0, 0, 0,
            0, 0, 1,
            1, 0, 0,
            0, 1, 0,
            0, 0,
            1, 0, 0,
            0, 0, 1,
            1, 0, 0,
            0, 1, 0,
            1, 0
        ]);

        model.interleaved.forEach((value, index) => {
            expect(value).toBeCloseTo(expectArray[index], DELTA);
        });
    });
});
