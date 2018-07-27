import { SubstanceTemplate } from './SubstanceTemplate';
export declare class OreOreWebGL {
    protected _canvas: HTMLCanvasElement;
    protected _onLoad: () => void;
    protected _gl: WebGLRenderingContext;
    protected _templates: SubstanceTemplate[];
    protected _timer: number | null;
    constructor(_canvas: HTMLCanvasElement, _onLoad: () => void);
    readonly gl: WebGLRenderingContext;
    protected mainLoop(): void;
    addTemplate(template: SubstanceTemplate): void;
    play(): void;
    pause(): void;
}
