import { shaderDefinitionArray } from './data/shader';
import { Matrix4x4 } from './matrix';
import { ShaderUniformBase, ShaderUniformMatrix4, ShaderUniformVector3 } from './ShaderUniform';
import { Vector3 } from './float32vector';

export class Shader {
    protected _id: string;
    protected _program: WebGLProgram;

    // 固定ユニフォーム（mvpMatrix等、どのシェーダーでも設定されるもの）
    protected _fixedUniforms: ShaderUniformBase[] = [];
    // カスタムユニフォーム（法線マップ、メタリック等、シェーダー毎に設定されるもの）
    protected _customUniforms: ShaderUniformBase[] = [];

    constructor(protected gl: WebGLRenderingContext, id: string, vSource: string, fSource: string, fixedUniforms: string[], customUniforms: ShaderUniformBase[]) {
        this._id = id;

        // uniformの設定
        fixedUniforms.forEach(uniform => {
            switch(uniform) {
                case 'modelMatrix':
                case 'viewMatrix':
                case 'projectionMatrix':
                    this._fixedUniforms.push(new ShaderUniformMatrix4(uniform, Matrix4x4.identity));
                    break;
                case 'worldCameraPosition':
                    this._fixedUniforms.push(new ShaderUniformVector3('worldCameraPosition', new Vector3(0, 0, 0)));
                    break;
                default:
                    console.error(`undefined fixed uniform ${uniform}`);
            }
        });
        this._customUniforms = this._customUniforms.concat(customUniforms);

        // vertex shaderのコンパイル
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vSource);
        gl.compileShader(vertexShader);

        // コンパイルが成功したかどうかのチェック
        const vShaderCompileStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if (!vShaderCompileStatus) {
            const info = gl.getShaderInfoLog(vertexShader);
            console.error(info);
        }

        // fragment shaderのコンパイル
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fSource);
        gl.compileShader(fragmentShader);

        const fShaderCompileStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
        if (!fShaderCompileStatus) {
            const info = gl.getShaderInfoLog(fragmentShader);
            console.error(info);
        }

        // シェーダープログラムの作成
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linkStatus) {
            const info = gl.getProgramInfoLog(program);
            console.error(info);
        }

        if (program !== null) {
            this._program = program;
        } else {
            console.error('program is null');
        }
    }

    get program(): WebGLProgram {
        return this._program;
    }

    get id(): string {
        return this._id;
    }

    get fixedUniforms(): ShaderUniformBase[] {
        return this._fixedUniforms;
    }

    get customUniforms(): ShaderUniformBase[] {
        return this._customUniforms;
    }

    get uniforms(): ShaderUniformBase[] {
        return this._fixedUniforms.concat(this._customUniforms);
    }

    findUniform(name: string) {
        return this.uniforms.find(uniform => uniform.name === name);
    }

    // TODO: ここでvalueがanyになってしまうことをなんとかしたい
    setUniform(name: string, value: any) {
        const uniform = this.findUniform(name);
        if (uniform !== undefined) {
            uniform.setGLUniform(this.gl, this._program, value);
        } else {
            console.error(`uniform ${name} is not found.`);
        }
    }
}

export class ShaderManager {
    static instance: ShaderManager = new ShaderManager();

    protected _shaders: Shader[] = [];
    protected _gl: WebGLRenderingContext;

    protected constructor() {}

    setContext(gl: WebGLRenderingContext) {
        this._gl = gl;
    }

    loadShaders() {
        const promises = shaderDefinitionArray.map(item => this.loadShader(item));

        return Promise.all(promises);
    }

    loadShader(options: {id: string, fixedUniforms: string[], customUniforms: ShaderUniformBase[]}) {
        const loadVertexShader = fetch(`./shaders/${options.id}/vertex_shader.glsl`);
        const loadFragmentShader = fetch(`./shaders/${options.id}/fragment_shader.glsl`);

        return Promise.all([loadVertexShader, loadFragmentShader])
            .then(response => Promise.all([response[0].text(), response[1].text()]))
            .then(shaderSources => {
                const vertexShaderSource = shaderSources[0];
                const fragmentShaderSource = shaderSources[1];

                const shader = new Shader(this._gl, options.id, vertexShaderSource, fragmentShaderSource, options.fixedUniforms, options.customUniforms);
                this._shaders.push(shader);
            });
    }

    find(id: string) {
        return this._shaders.find(shader => shader.id === id);
    }
}
