export declare enum MouseButton {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}
declare enum MouseStatus {
    UP = 0,
    DOWN = 1
}
export declare class MouseDrag {
    protected _targetDOM: HTMLElement;
    protected _targetButton: MouseButton;
    protected _onDrag: ((x: number, y: number) => void) | undefined;
    protected _status: MouseStatus;
    protected _beforePosition: {
        x: number;
        y: number;
    };
    constructor(_targetDOM: HTMLElement, _targetButton: MouseButton);
    onDrag: (x: number, y: number) => void;
    onMouseDown(e: MouseEvent): void;
    onMouseMove(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
export {};
