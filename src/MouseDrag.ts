export enum MouseButton {
    LEFT = 0,
    MIDDLE,
    RIGHT,
}

enum MouseStatus {
    UP,
    DOWN,
}

export class MouseDrag {
    protected _onDrag: ((x: number, y: number) => void) | undefined = undefined;

    protected _status: MouseStatus = MouseStatus.UP;
    protected _beforePosition: { x: number, y: number } = {x: 0, y: 0};

    constructor(protected _targetDOM: HTMLElement, protected _targetButton: MouseButton) {
        this._targetDOM.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this._targetDOM.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this._targetDOM.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    set onDrag(callback: (x: number, y: number) => void) {
        this._onDrag = callback;
    }

    onMouseDown(e: MouseEvent) {
        if (e.button === this._targetButton) {
            this._status = MouseStatus.DOWN;
            this._beforePosition.x = e.clientX;
            this._beforePosition.y = e.clientY;
        }
    }

    onMouseMove(e: MouseEvent) {
        if (this._status === MouseStatus.DOWN) {
            if (this._onDrag !== undefined) {
                const movePosition = {
                    x: e.clientX - this._beforePosition.x,
                    y: e.clientY - this._beforePosition.y
                };

                this._onDrag(movePosition.x, movePosition.y);

                this._beforePosition.x = e.clientX;
                this._beforePosition.y = e.clientY;
            }
        }
    }

    onMouseUp(e: MouseEvent) {
        if (e.button === this._targetButton) {
            this._status = MouseStatus.UP;
        }
    }
}
