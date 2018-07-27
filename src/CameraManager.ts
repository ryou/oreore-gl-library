import { Transform } from "./transform";

export class Camera {
    protected _transform: Transform = new Transform();

    constructor(protected _name: string) {}

    get name() {
        return this._name;
    }

    get transform(): Transform {
        return this._transform;
    }

    activate() {
        CameraManager.instance.activate(this._name);
    }
}

export class CameraManager {
    static instance: CameraManager = new CameraManager();

    protected _activeCamera: Camera;
    protected _cameras: Camera[] = [];

    protected constructor() {}

    get cameras() {
        return this._cameras;
    }

    get activeCamera() {
        return this._activeCamera;
    }

    activate(name: string) {
        const camera = CameraManager.instance.find(name);
        if (camera !== undefined) this._activeCamera = camera;
        else console.error(`Camera ${name} is not found.`);
    }

    create(name: string) {
        const camera = new Camera(name);
        this._cameras.push(camera);

        return camera;
    }

    find(name: string): Camera | undefined {
        return this._cameras.find(camera => camera.name === name);
    }
}
