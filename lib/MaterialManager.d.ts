import { Shader } from './ShaderManager';
export declare class Material {
    protected _id: string;
    protected _shader: Shader;
    protected options: {
        name: string;
        value: any;
    }[];
    protected _options: {
        name: string;
        value: any;
    }[];
    constructor(_id: string, _shader: Shader, options: {
        name: string;
        value: any;
    }[]);
    readonly id: string;
    readonly shader: Shader;
    setOption(name: string, value: any): void;
    attachUniforms(): void;
}
export declare class MaterialManager {
    static instance: MaterialManager;
    protected _materials: Material[];
    protected constructor();
    init(): void;
    find(id: string): Material | undefined;
}
