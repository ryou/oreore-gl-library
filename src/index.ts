import { OreOreWebGL } from './OreOreWebGL';
import { SubstanceTemplate } from './SubstanceTemplate';
import { Vector3 } from './float32vector';
import { CameraManager } from './CameraManager';
import { MouseDrag, MouseButton } from './MouseDrag';

const cameraManagerInstance = CameraManager.instance;

const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

const oreore = new OreOreWebGL(
    canvas,
    () => {
        const mainCamera = CameraManager.instance.create('MainCamera');
        mainCamera.activate();
        mainCamera.transform.position = new Vector3(0, 0, -5);

        const template = new SubstanceTemplate(oreore.gl, 'smoothsphere', 'standard/tiles');
        oreore.addTemplate(template);
        const substance = template.instantiate();
        if (substance !== null) {
            substance.transform.rotate = new Vector3(0, 0, 45);
            substance.transform.scale = new Vector3(2, 2, 2);
        }

        const skyboxTemplate = new SubstanceTemplate(oreore.gl, 'skybox', 'skybox');
        oreore.addTemplate(skyboxTemplate);
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

        oreore.play();
    },
);

const updateAspectRatio = () => {
    cameraManagerInstance.aspect = window.innerWidth / window.innerHeight;
}

window.addEventListener('load', updateAspectRatio);
window.addEventListener('resize', updateAspectRatio);
