"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoopController = /** @class */ (function () {
    function LoopController(_updateFunc, _renderFunc, _fps) {
        if (_fps === void 0) { _fps = 60; }
        this._updateFunc = _updateFunc;
        this._renderFunc = _renderFunc;
        this._fps = _fps;
        this._animationID = null;
    }
    Object.defineProperty(LoopController.prototype, "FRAME_TIME", {
        get: function () {
            return 1000.0 / this._fps;
        },
        enumerable: true,
        configurable: true
    });
    LoopController.prototype.start = function () {
        var _this = this;
        var startTime = performance.now();
        var beforeTime = startTime;
        var mainLoop = function () {
            _this._animationID = requestAnimationFrame(mainLoop);
            var counter = 0;
            var currentTime = performance.now();
            var pastTime = currentTime - beforeTime;
            while (pastTime > _this.FRAME_TIME) {
                pastTime -= _this.FRAME_TIME;
                beforeTime += _this.FRAME_TIME;
                _this._updateFunc();
                counter++;
            }
            if (counter > 0)
                _this._renderFunc();
        };
        mainLoop();
    };
    LoopController.prototype.pause = function () {
        if (this._animationID !== null)
            cancelAnimationFrame(this._animationID);
    };
    return LoopController;
}());
exports.LoopController = LoopController;
