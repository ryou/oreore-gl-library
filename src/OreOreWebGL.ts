import { ShaderManager } from './ShaderManager';
import { TextureManager } from './TextureManager';
import { MaterialManager } from './MaterialManager';
import { ModelManager } from './ModelManager';
import { SubstanceTemplate } from './SubstanceTemplate';
import { LoopController } from './LoopController';

export class OreOreWebGL {
    protected _gl: WebGLRenderingContext;

    protected _templates: SubstanceTemplate[] = [];

    protected _timer: number | null = null;

    protected _loopController: LoopController | null = null;

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

                    this._loopController = new LoopController(
                        () => { this.update(); },
                        () => { this.render(); },
                        30
                    );
                    
                    this._onLoad();
                });
        
        } else {
            console.error('webgl not found');
        }
    }

    get gl() {
        return this._gl;
    }

    protected update() {
        this._templates.forEach(template => template.update());
    }

    protected render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this._templates.forEach(template => template.render());

        this.gl.flush();
    }

    addTemplate(template: SubstanceTemplate) {
        this._templates.push(template);
    }

    play() {
        if (this._loopController !== null) this._loopController.start();
        else console.error('loop controller is null.');
    }

    pause() {
        if (this._loopController !== null) this._loopController.pause();
        else console.error('loop controller is null.');
    }
}
