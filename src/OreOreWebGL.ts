import { ShaderManager } from './ShaderManager';
import { TextureManager } from './TextureManager';
import { MaterialManager } from './MaterialManager';
import { ModelManager } from './ModelManager';
import { SubstanceTemplate } from './SubstanceTemplate';

export class OreOreWebGL {
    protected _gl: WebGLRenderingContext;

    protected _templates: SubstanceTemplate[] = [];

    protected _timer: number | null = null;

    constructor(
        protected _canvas: HTMLCanvasElement,
        shaderDefinitionArray: any[],
        textureDefinitionArray: any[],
        modelDefinitionArray: any[],
        materialDefinitionArray: any[],
        protected _onLoad: () => void
    ) {
        const gl = this._canvas.getContext('webgl');
        if (gl !== null) {
            this._gl = gl;

            ShaderManager.instance.setContext(gl);
            const loadShaderPromise = ShaderManager.instance.loadShaders(shaderDefinitionArray);
        
            TextureManager.instance.setContext(gl);
            const loadTexturePromise = TextureManager.instance.loadTextures(textureDefinitionArray);
        
            const loadModelPromise = ModelManager.instance.loadModels(modelDefinitionArray);
        
            Promise.all([loadShaderPromise, loadTexturePromise, loadModelPromise])
                .then(() => {
                    MaterialManager.instance.init(materialDefinitionArray);
                    
                    this._onLoad();
                });
        
        } else {
            console.error('webgl not found');
        }
    }

    get gl() {
        return this._gl;
    }

    protected mainLoop() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this._templates.forEach(template => template.update());
        this._templates.forEach(template => template.render());

        this.gl.flush();
    }

    addTemplate(template: SubstanceTemplate) {
        this._templates.push(template);
    }

    play() {
        if (this._timer !== null) return;

        this._timer = setInterval(() => {
            this.mainLoop();
        }, 33);
    }

    pause() {
        if (this._timer !== null) clearInterval(this._timer);
    }
}
