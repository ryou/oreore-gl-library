import { SubstanceTemplate } from './SubstanceTemplate';
import { LoopController } from './LoopController';
export declare class OreOreWebGL {
    protected _canvas: HTMLCanvasElement;
    protected _onLoad: () => void;
    protected _gl: WebGLRenderingContext;
    protected _templates: SubstanceTemplate[];
    protected _timer: number | null;
    protected _loopController: LoopController | null;
    constructor(_canvas: HTMLCanvasElement, shaderDefinitionArray: any[], textureDefinitionArray: any[], modelDefinitionArray: any[], materialDefinitionArray: any[], _onLoad: () => void);
    readonly gl: WebGLRenderingContext;
    protected update(): void;
    protected render(): void;
    addTemplate(template: SubstanceTemplate): void;
    play(): void;
    pause(): void;
}
