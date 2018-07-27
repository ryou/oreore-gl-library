import { VertexData } from './Model';
export declare class OBJParser {
    static parse(objData: string): {
        verticies: VertexData[];
        indicies: number[];
    };
    static extractOBJData(objData: string): {
        v: string[][];
        vt: string[][];
        vn: string[][];
        f: string[];
    };
}
