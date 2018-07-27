import { Shader, ShaderManager } from './ShaderManager';
import { materialDefinitions } from './data/materials';

export class Material {
    protected _options: { name: string, value: any }[];

    constructor(protected _id: string, protected _shader: Shader, protected options: { name: string, value: any }[]) {
        this._options = _shader.customUniforms.map(uniform => {
            return  { name: uniform.name, value: uniform.defaultValue };
        });

        options.forEach(option => this.setOption(option.name, option.value));
    }

    get id() {
        return this._id;
    }

    get shader() {
        return this._shader;
    }

    setOption(name: string, value: any) {
        const option = this._options.find(option => name === option.name);
        if (option === undefined) {
            console.error(`option ${name} is not found.`);
            return;
        }

        option.value = value;
    }

    attachUniforms() {
        this._options.forEach(option => this._shader.setUniform(option.name, option.value));
    }
}

export class MaterialManager {
    static instance: MaterialManager = new MaterialManager();
    protected _materials: Material[] = [];

    protected constructor() {}

    init() {
        materialDefinitions.forEach(materialDefinition => {
            const shader = ShaderManager.instance.find(materialDefinition.shader);
            if (shader === undefined) {
                console.error(`shader ${materialDefinition.shader} is not found.`);
                return;
            }

            const material = new Material(materialDefinition.id, shader, materialDefinition.options);
            this._materials.push(material);
        });
    }

    find(id: string) {
        return this._materials.find(material => id === material.id);
    }
}
