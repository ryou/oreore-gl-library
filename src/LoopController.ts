export class LoopController {
    protected _animationID: number | null;

    constructor(
        protected _updateFunc: () => void,
        protected _renderFunc: () => void,
        protected _fps: number = 60
    ) {
      this._animationID = null;
    }

    get FRAME_TIME() {
        return 1000.0 / this._fps;
    }
  
    start() {
      const startTime = performance.now();
      let beforeTime = startTime;
  
      const mainLoop = () => {
        this._animationID = requestAnimationFrame(mainLoop);
  
        let counter = 0;
        const currentTime = performance.now();
        let pastTime = currentTime - beforeTime;
        while (pastTime > this.FRAME_TIME) {
          pastTime -= this.FRAME_TIME;
          beforeTime += this.FRAME_TIME;
          this._updateFunc();

          counter++;
        }
        if (counter > 0) this._renderFunc();
      };
      mainLoop();
    }
  
    pause() {
      if (this._animationID !== null) cancelAnimationFrame(this._animationID);
    }
  }
