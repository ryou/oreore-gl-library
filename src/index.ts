import { ShaderManager } from './ShaderManager';
import { TextureManager } from './TextureManager';
import { MaterialManager } from './MaterialManager';
import { SubstanceTemplate } from './SubstanceTemplate';
import { ModelManager } from './ModelManager';
import { Vector3 } from './float32vector';
import { CameraManager } from './CameraManager';
import { MouseDrag, MouseButton } from './MouseDrag';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');
//この時点でglの型が未確定なので、型チェックが必要
if (gl !== null && gl instanceof WebGLRenderingContext) {
    ShaderManager.instance.setContext(gl);
    const loadShaderPromise = ShaderManager.instance.loadShaders();

    TextureManager.instance.setContext(gl);
    const loadTexturePromise = TextureManager.instance.loadTextures();

    const loadModelPromise = ModelManager.instance.loadModels();

    Promise.all([loadShaderPromise, loadTexturePromise, loadModelPromise])
        .then(() => {
            MaterialManager.instance.init();

            const mainCamera = CameraManager.instance.create('MainCamera');
            mainCamera.activate();
            mainCamera.transform.position = new Vector3(0, 0, -5);

            const template = new SubstanceTemplate(gl, 'smoothsphere', 'standard/tiles');
            const substance = template.instantiate();
            if (substance !== null) {
                substance.transform.rotate = new Vector3(0, 0, 45);
                substance.transform.scale = new Vector3(2, 2, 2);
            }

            const skyboxTemplate = new SubstanceTemplate(gl, 'skybox', 'skybox');
            skyboxTemplate.instantiate();

            const leftMouseDrag = new MouseDrag(canvas, MouseButton.LEFT);
            leftMouseDrag.onDrag = (x, y) => {
                const magnification = 0.5;
                mainCamera.transform.addRotation(
                    -y * magnification,
                    -x * magnification,
                    0
                );
            };
            const middleMouseDrag = new MouseDrag(canvas, MouseButton.MIDDLE);
            middleMouseDrag.onDrag = (x, y) => {
                const magnification = 0.1;
                mainCamera.transform.addPosition(
                    x * magnification,
                    -y * magnification,
                    0
                );
            };

            if (substance !== null) {
                setInterval(() => {
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

                    // substance.transform.addRotation(2, 0, 0);
                    substance.update();
    
                    skyboxTemplate.render();
                    template.render();
    
                    gl.flush();
                }, 33);
            }
        });
} else {
    console.error('webgl not found');
}
