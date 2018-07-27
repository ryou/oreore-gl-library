import { Float32Vector3, Vector3 } from '../src/float32vector';
import { Matrix4x4 } from '../src/matrix';
import { Transform } from '../src/transform';

describe('Transform', () => {
    test('Mul Vector And Matrix', () => {
        const transform = new Transform();
        const actual = Transform.mulVectorAndMatrix(
            Matrix4x4.translation(1, 2, 3),
            transform.position
        );

        const result = new Float32Vector3(1, 2, 3);

        expect(actual.values).toEqual(result.values);
    });

    test('Translate', () => {
        const transform = new Transform();
        transform.position = new Vector3(1, 2, 3);

        const expectVector = new Float32Vector3(1, 2, 3);

        expect(transform.position.values).toEqual(expectVector.values);
    });

    test('Matrix', () => {
        const transform = new Transform();
        transform.position = new Vector3(1, 2, 3);
        transform.rotate = new Vector3(90, 180, 270);
        transform.scale = new Vector3(1, 2, 3);
        const actual = transform.matrix;

        const expectMatrix = Matrix4x4.scaling(1, 2, 3)
                                .rotateX(90)
                                .rotateY(180)
                                .rotateZ(270)
                                .translate(1, 2, 3);

        expect(actual.values).toEqual(expectMatrix.values);
    });
});
