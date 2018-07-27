import { Vector2, Vector3, Vector4 } from '../src/float32vector';
import { Matrix4x4 } from '../src/matrix';

const DELTA = 6;

describe('Vector2', () => {
    test('Add Vector2', () => {
        const vec1 = new Vector2(1, 2);
        const vec2 = new Vector2(3, 4);

        const actual = vec1.add(vec2);

        expect(actual.x).toBeCloseTo(4, DELTA);
        expect(actual.y).toBeCloseTo(6, DELTA);
    });

    test('Sub Vector2', () => {
        const vec1 = new Vector2(1, 2);
        const vec2 = new Vector2(3, 4);

        const actual = vec1.sub(vec2);

        expect(actual.x).toBeCloseTo(-2, DELTA);
        expect(actual.y).toBeCloseTo(-2, DELTA);
    });

    test('Mul Vector2', () => {
        const vec1 = new Vector2(1, 2);

        const actual = vec1.mulByScalar(5);

        expect(actual.x).toBeCloseTo(5, DELTA);
        expect(actual.y).toBeCloseTo(10, DELTA);
    });

    test('Dot Vector2', () => {
        const vec1 = new Vector2(1, 2);
        const vec2 = new Vector2(3, 4);

        const actual = vec1.dot(vec2);

        expect(actual).toBe(11);
    });

    test('Normalize Vector2', () => {
        const vec1 = new Vector2(0, 10);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(1);
    });

    test('Normalize Zero Vector2', () => {
        const vec1 = new Vector2(0, 0);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(0);
    });
});


describe('Vector3', () => {
    test('Add Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);
        const vec2 = new Vector3(4, 5, 6);

        const actual = vec1.add(vec2);

        expect(actual.x).toBeCloseTo(5, DELTA);
        expect(actual.y).toBeCloseTo(7, DELTA);
        expect(actual.z).toBeCloseTo(9, DELTA);
    });

    test('Sub Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);
        const vec2 = new Vector3(4, 5, 6);

        const actual = vec1.sub(vec2);

        expect(actual.x).toBeCloseTo(-3, DELTA);
        expect(actual.y).toBeCloseTo(-3, DELTA);
        expect(actual.z).toBeCloseTo(-3, DELTA);
    });

    test('Mul Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);

        const actual = vec1.mulByScalar(5);

        expect(actual.x).toBeCloseTo(5, DELTA);
        expect(actual.y).toBeCloseTo(10, DELTA);
        expect(actual.z).toBeCloseTo(15, DELTA);
    });

    test('Dot Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);
        const vec2 = new Vector3(4, 5, 6);

        const actual = vec1.dot(vec2);

        expect(actual).toBeCloseTo(32, DELTA);
    });

    test('Cross Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);
        const vec2 = new Vector3(4, 5, 6);

        const actual = vec1.cross(vec2);

        expect(actual.x).toBeCloseTo(-3, DELTA);
        expect(actual.y).toBeCloseTo(6, DELTA);
        expect(actual.z).toBeCloseTo(-3, DELTA);
    });

    test('Normalize Vector3', () => {
        const vec1 = new Vector3(0, 10, 0);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(1);
        expect(actual.z).toBe(0);
    });

    test('Normalize Zero Vector3', () => {
        const vec1 = new Vector3(0, 0, 0);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(0);
        expect(actual.z).toBe(0);
    });

    test('Get XY Vector3', () => {
        const vec1 = new Vector3(1, 2, 3);

        const actual = vec1.xy;

        expect(actual.x).toBe(1);
        expect(actual.y).toBe(2);
    });
});


describe('Vector4', () => {
    test('Add Vector4', () => {
        const vec1 = new Vector4(1, 2, 3, 4);
        const vec2 = new Vector4(5, 6, 7, 8);

        const actual = vec1.add(vec2);

        expect(actual.x).toBeCloseTo(6, DELTA);
        expect(actual.y).toBeCloseTo(8, DELTA);
        expect(actual.z).toBeCloseTo(10, DELTA);
        expect(actual.w).toBeCloseTo(12, DELTA);
    });

    test('Sub Vector4', () => {
        const vec1 = new Vector4(1, 2, 3, 4);
        const vec2 = new Vector4(5, 6, 7, 8);

        const actual = vec1.sub(vec2);

        expect(actual.x).toBeCloseTo(-4, DELTA);
        expect(actual.y).toBeCloseTo(-4, DELTA);
        expect(actual.z).toBeCloseTo(-4, DELTA);
        expect(actual.w).toBeCloseTo(-4, DELTA);
    });

    test('Mul Vector4', () => {
        const vec1 = new Vector4(1, 2, 3, 4);

        const actual = vec1.mulByScalar(5);

        expect(actual.x).toBeCloseTo(5, DELTA);
        expect(actual.y).toBeCloseTo(10, DELTA);
        expect(actual.z).toBeCloseTo(15, DELTA);
        expect(actual.w).toBeCloseTo(20, DELTA);
    });

    test('Mul By Translation Matrix', () => {
        const vec1 = new Vector4(4, 3, 2, 1);
        const matrix = Matrix4x4.translation(1, 2, 3);

        const actual = vec1.mulByMatrix(matrix);

        const expectVector = new Vector4(5, 5, 5, 1);

        expect(actual).toEqual(expectVector);
    });

    test('Mul By Scaling Matrix', () => {
        const vec1 = new Vector4(4, 3, 2, 1);
        const matrix = Matrix4x4.scaling(1, 2, 3);

        const actual = vec1.mulByMatrix(matrix);

        const expectVector = new Vector4(4, 6, 6, 1);

        expect(actual).toEqual(expectVector);
    });

    test('Mul By Rotation Matrix', () => {
        const vec1 = new Vector4(4, 3, 2, 1);
        const matrix = Matrix4x4.rotationX(90);

        const actual = vec1.mulByMatrix(matrix);

        const expectVector = new Vector4(4, -2, 3, 1);

        expect(actual).toEqual(expectVector);
    });

    test('Dot Vector4', () => {
        const vec1 = new Vector4(1, 2, 3, 4);
        const vec2 = new Vector4(5, 6, 7, 8);

        const actual = vec1.dot(vec2);

        expect(actual).toBe(70);
    });

    test('Normalize Vector4', () => {
        const vec1 = new Vector4(0, 10, 0, 0);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(1);
        expect(actual.z).toBe(0);
        expect(actual.w).toBe(0);
    });

    test('Normalize Zero Vector4', () => {
        const vec1 = new Vector4(0, 0, 0, 0);

        const actual = vec1.normalize();

        expect(actual.x).toBe(0);
        expect(actual.y).toBe(0);
        expect(actual.z).toBe(0);
        expect(actual.w).toBe(0);
    });

    test('Get XYZ Vector4', () => {
        const vec1 = new Vector4(1, 2, 3, 4);

        const actual = vec1.xyz;

        expect(actual.x).toBe(1);
        expect(actual.y).toBe(2);
        expect(actual.z).toBe(3);
    });
});
