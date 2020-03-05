export default class Main {
    constructor(tick, render) {
        this.IsRunning = false;

        this.Tick = {
            fn: tick,
            Interval: null,
            FPS: 24,
            LastTimestamp: Date.now()
        };
        this.Render = {
            fn: render,
            LastTimestamp: Date.now()
        };
    }

    handleTick(ts) {
        if(this.IsRunning) {
            let delta = (ts - this.Tick.LastTimestamp) / 1000;

            if(this.Tick.fn) {
                this.Tick.fn(delta);
            }

            this.Tick.LastTimestamp = ts;
        }
    }
    handleRender(ts) {
        if(this.IsRunning) {
            let delta = (ts - this.Render.LastTimestamp) / 1000;

            if(this.Render.fn) {
                this.Render.fn(delta);
            }

            this.Render.LastTimestamp = ts;
            
            window.requestAnimationFrame(this.handleRender.bind(this));
        }
    }

    Play() {
        this.IsRunning = true;
        this.Tick.Interval = setInterval(() => this.handleTick(Date.now()), 1000 / this.Tick.FPS);
        window.requestAnimationFrame(this.handleRender.bind(this));

        return this;
    }
    Pause() {
        this.IsRunning = false;
        clearInterval(this.Tick.Interval);

        return this;
    }
}