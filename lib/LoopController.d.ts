export declare class LoopController {
    protected _updateFunc: () => void;
    protected _renderFunc: () => void;
    protected _fps: number;
    protected _animationID: number | null;
    constructor(_updateFunc: () => void, _renderFunc: () => void, _fps?: number);
    readonly FRAME_TIME: number;
    start(): void;
    pause(): void;
}
