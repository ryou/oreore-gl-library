import { Float32Vector4 } from '../float32vector';
export declare const materialDefinitions: {
    id: string;
    shader: string;
    options: ({
        name: string;
        value: Float32Vector4;
    } | {
        name: string;
        value: number;
    } | {
        name: string;
        value: string;
    })[];
}[];
