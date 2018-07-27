"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
    MouseButton[MouseButton["MIDDLE"] = 1] = "MIDDLE";
    MouseButton[MouseButton["RIGHT"] = 2] = "RIGHT";
})(MouseButton = exports.MouseButton || (exports.MouseButton = {}));
var MouseStatus;
(function (MouseStatus) {
    MouseStatus[MouseStatus["UP"] = 0] = "UP";
    MouseStatus[MouseStatus["DOWN"] = 1] = "DOWN";
})(MouseStatus || (MouseStatus = {}));
var MouseDrag = /** @class */ (function () {
    function MouseDrag(_targetDOM, _targetButton) {
        var _this = this;
        this._targetDOM = _targetDOM;
        this._targetButton = _targetButton;
        this._onDrag = undefined;
        this._status = MouseStatus.UP;
        this._beforePosition = { x: 0, y: 0 };
        this._targetDOM.addEventListener('mousedown', function (e) { return _this.onMouseDown(e); });
        this._targetDOM.addEventListener('mousemove', function (e) { return _this.onMouseMove(e); });
        this._targetDOM.addEventListener('mouseup', function (e) { return _this.onMouseUp(e); });
    }
    Object.defineProperty(MouseDrag.prototype, "onDrag", {
        set: function (callback) {
            this._onDrag = callback;
        },
        enumerable: true,
        configurable: true
    });
    MouseDrag.prototype.onMouseDown = function (e) {
        if (e.button === this._targetButton) {
            this._status = MouseStatus.DOWN;
            this._beforePosition.x = e.clientX;
            this._beforePosition.y = e.clientY;
        }
    };
    MouseDrag.prototype.onMouseMove = function (e) {
        if (this._status === MouseStatus.DOWN) {
            if (this._onDrag !== undefined) {
                var movePosition = {
                    x: e.clientX - this._beforePosition.x,
                    y: e.clientY - this._beforePosition.y
                };
                this._onDrag(movePosition.x, movePosition.y);
                this._beforePosition.x = e.clientX;
                this._beforePosition.y = e.clientY;
            }
        }
    };
    MouseDrag.prototype.onMouseUp = function (e) {
        if (e.button === this._targetButton) {
            this._status = MouseStatus.UP;
        }
    };
    return MouseDrag;
}());
exports.MouseDrag = MouseDrag;
