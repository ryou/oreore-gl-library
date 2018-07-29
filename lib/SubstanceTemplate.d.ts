import { Material } from './MaterialManager';
import { Model } from './Model';
import { Float32Vector3 } from './float32vector';
import { Transform } from './transform';
export declare class Substance {
    protected _template: SubstanceTemplate;
    protected _velocity: Float32Vector3;
    protected _angularVelocity: Float32Vector3;
    protected _transform: Transform;
    constructor(_template: SubstanceTemplate);
    readonly transform: Transform;
    velocity: Float32Vector3;
    angularVelocity: Float32Vector3;
    update(): void;
    render(context: WebGLRenderingContext, indexSize: number): void;
}
export declare class SubstanceTemplate {
    protected _gl: WebGLRenderingContext;
    protected _model: Model;
    protected _material: Material;
    protected _substances: Substance[];
    constructor(context: WebGLRenderingContext, modelID: string, materialID: string);
    readonly material: Material;
    instantiate(): Substance | null;
    update(): void;
    render(): void;
}
