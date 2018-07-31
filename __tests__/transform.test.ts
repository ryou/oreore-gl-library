import { Float32Vector3, Vector3, Vector4 } from '../src/float32vector';
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

    test('MVP Conversion', () => {
        const object = new Transform();
        object.position = new Vector3(100, 100, 0);
        const camera = new Transform();
        camera.position = new Vector3(0, 0, 0);

        const projectionMatrix = Matrix4x4.orthographic({
            top: 100,
            bottom: -100,
            left: -100,
            right: 100,
            near: 0,
            far: 100,
        });

        const modelMatrix = object.matrix;
        const viewMatrix = camera.matrix.inverse();
        const mvpMatrix = projectionMatrix.mulByMatrix(viewMatrix).mulByMatrix(modelMatrix);

        const target = new Vector4(0, 0, 0, 1);
        const result = target.mulByMatrix(mvpMatrix);

        const expectVector = new Vector4(-1, -1, -1, 1);

        expect(result.values).toEqual(expectVector.values);
    });
});
