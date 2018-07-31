import { Material, MaterialManager } from './MaterialManager';
import { Model } from './Model';
import { ModelManager } from './ModelManager';
import { Float32Vector3, Vector3 } from './float32vector';
import { Transform } from './transform';
import { Matrix4x4 } from './matrix';
import { CameraManager } from './CameraManager';

export class Substance {
    protected _velocity: Float32Vector3 = new Vector3(0, 0, 0);
    protected _angularVelocity: Float32Vector3 = new Vector3(0, 0, 0);
    protected _transform: Transform = new Transform();

    constructor(protected _template: SubstanceTemplate) {}

    get transform() {
        return this._transform;
    }

    set velocity(velocity: Float32Vector3) {
        this._velocity = velocity;
    }

    set angularVelocity(velocity: Float32Vector3) {
        this._angularVelocity = velocity;
    }

    update() {
        this.transform.addPosition(this._velocity.x, this._velocity.y, this._velocity.z);
        this.transform.addRotation(this._angularVelocity.x, this._angularVelocity.y, this._angularVelocity.z);
    }

    render(context: WebGLRenderingContext, indexSize: number) {
        const cameraManagerInstance = CameraManager.instance;
        let projectionMatrix = Matrix4x4.perspective({
            fovYRadian: 1.1,
            aspectRatio: cameraManagerInstance.aspect,
            near: 0.001,
            far: 1000,
        });
        const camera = cameraManagerInstance.activeCamera;
        let viewMatrix = camera.transform.matrix.inverse();

        this._template.material.shader.fixedUniforms.forEach(uniform => {
            switch(uniform.name) {
                case 'modelMatrix':
                    this._template.material.shader.setUniform('modelMatrix', this._transform.matrix);
                    break;
                case 'viewMatrix':
                    this._template.material.shader.setUniform('viewMatrix', viewMatrix);
                    break;
                case 'projectionMatrix':
                    this._template.material.shader.setUniform('projectionMatrix', projectionMatrix);
                    break;
                case 'localNormal2WorldMatrix':
                    {
                        const localNormal2WorldTransform = new Transform();
                        localNormal2WorldTransform.rotate = this.transform.rotate;
                        this._template.material.shader.setUniform('localNormal2WorldMatrix', localNormal2WorldTransform.matrix);
                    }
                    break;
                case 'worldCameraPosition':
                    this._template.material.shader.setUniform('worldCameraPosition', camera.transform.position.values);
                    break;
                default:
                    console.error(`undefined uniform ${uniform.name}`);
            }
        });
        this._template.material.attachUniforms();

        context.drawElements(context.TRIANGLES, indexSize, context.UNSIGNED_SHORT, 0);
    }
}

export class SubstanceTemplate {
    protected _gl: WebGLRenderingContext;
    protected _model: Model;
    protected _material: Material;

    protected _substances: Substance[] = [];

    constructor(context: WebGLRenderingContext, modelID: string, materialID: string) {
        this._gl = context;

        const model = ModelManager.instance.find(modelID);
        if (model !== undefined) {
            this._model = model;
        } else {
            console.error(`model ${modelID} not found.`);
        }

        const material = MaterialManager.instance.find(materialID);
        if (material !== undefined) {
            this._material = material;
        } else {
            console.error(`material ${materialID} is not found.`);
            
        }
    }

    get material(): Material {
        return this._material;
    }

    instantiate(): Substance | null {
        const substance = new Substance(this);
        this._substances.push(substance);

        return substance;
    }

    update() {
        this._substances.forEach(substance => substance.update());
    }

    render() {
        this._gl.useProgram(this._material.shader.program);

        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.enable(this._gl.CULL_FACE);

        const vertexBuffer = this._gl.createBuffer();
        const indexBuffer = this._gl.createBuffer();

        const vertexAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'position');
        const normalAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'normal');
        const tangentAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'tangent');
        const binormalAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'binormal');
        const uvAttribLocation = this._gl.getAttribLocation(this._material.shader.program, 'texCoord');

        const VERTEX_SIZE = 3;
        const NORMAL_SIZE = 3;
        const TANGENT_SIZE = 3;
        const BINORMAL_SIZE = 3;
        const UV_SIZE = 2;

        const STRIDE = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE + BINORMAL_SIZE + UV_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        const POSITION_OFFSET = 0;
        const NORMAL_OFFSET   = VERTEX_SIZE * Float32Array.BYTES_PER_ELEMENT;
        const TANGENT_OFFSET  = (VERTEX_SIZE + NORMAL_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        const BINORMAL_OFFSET = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE) * Float32Array.BYTES_PER_ELEMENT;
        const UV_OFFSET       = (VERTEX_SIZE + NORMAL_SIZE + TANGENT_SIZE + BINORMAL_SIZE) * Float32Array.BYTES_PER_ELEMENT;

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer);

        this._gl.enableVertexAttribArray(vertexAttribLocation);
        this._gl.enableVertexAttribArray(normalAttribLocation);
        this._gl.enableVertexAttribArray(tangentAttribLocation);
        this._gl.enableVertexAttribArray(binormalAttribLocation);
        this._gl.enableVertexAttribArray(uvAttribLocation);

        this._gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, this._gl.FLOAT, false, STRIDE, POSITION_OFFSET);
        this._gl.vertexAttribPointer(normalAttribLocation, NORMAL_SIZE, this._gl.FLOAT, false, STRIDE, NORMAL_OFFSET);
        this._gl.vertexAttribPointer(tangentAttribLocation, TANGENT_SIZE, this._gl.FLOAT, false, STRIDE, TANGENT_OFFSET);
        this._gl.vertexAttribPointer(binormalAttribLocation, BINORMAL_SIZE, this._gl.FLOAT, false, STRIDE, BINORMAL_OFFSET);
        this._gl.vertexAttribPointer(uvAttribLocation, UV_SIZE, this._gl.FLOAT, false, STRIDE, UV_OFFSET);

        const vertices = this._model.interleaved;
        const indices = this._model.indices;

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, vertices, this._gl.STATIC_DRAW);

        this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, indices, this._gl.STATIC_DRAW);

        const indexSize = indices.length;

        this._substances.forEach(substance => substance.render(this._gl, indexSize));
    }
}
