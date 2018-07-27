import { Transform } from "./transform";
export declare class Camera {
    protected _name: string;
    protected _transform: Transform;
    constructor(_name: string);
    readonly name: string;
    readonly transform: Transform;
    activate(): void;
}
export declare class CameraManager {
    static instance: CameraManager;
    protected _activeCamera: Camera;
    protected _cameras: Camera[];
    protected _aspect: number;
    protected constructor();
    readonly cameras: Camera[];
    readonly activeCamera: Camera;
    aspect: number;
    activate(name: string): void;
    create(name: string): Camera;
    find(name: string): Camera | undefined;
}
