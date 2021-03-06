export default class Game {
    constructor(canvas, tick, render) {
        this.IsRunning = false;
        this.Canvas = canvas;

        this.Tick = {
            fn: tick,
            Interval: null,
            FPS: 60,
            LastTimestamp: Date.now(),
            LastDelta: 0
        };
        this.Render = {
            fn: render,
            LastTimestamp: Date.now()
        };

        this.Registry = {};
        this.Helpers = {};
    }

    get _() {
        return this.Helpers;
    }
    get $() {
        return this.Registry;
    }

    prop(key, value) {
        this.Helpers[ key ] = value;

        return this;
    }

    register(namespace, object) {
        this.Registry[ namespace ] = object;
        
        return this;
    }
    unregister(namespace) {
        delete this.Registry[ namespace ];

        return this;
    }

    handleTick(ts) {
        if(this.IsRunning) {
            let delta = (ts - this.Tick.LastTimestamp) / 1000;
            this.Tick.LastDelta = delta;

            if(this.Tick.fn) {
                this.Tick.fn.call(this, delta);
            }

            this.Tick.LastTimestamp = ts;
        }
    }
    handleRender(ts) {
        if(this.IsRunning) {
            let delta = (ts - this.Render.LastTimestamp) / 1000;

            if(this.Render.fn) {
                this.Render.fn.call(this, delta);
            }

            this.Render.LastTimestamp = ts;

            this.Canvas.text(`FPS: ${ (this.Tick.FPS).toFixed(2) }`, this.Canvas.get().width / 2, 30, { color: "#000"});
            this.Canvas.text(`RPS: ${ (1000 / (delta * 1000)).toFixed(2) }`, this.Canvas.get().width / 2, 50, { color: "#000"});
            
            window.requestAnimationFrame(this.handleRender.bind(this));
        }
    }

    Play() {
        this.IsRunning = true;
        this.Tick.Interval = setInterval(() => this.handleTick(Date.now()), 1000 / this.Tick.FPS);

        if(window) {
            window.requestAnimationFrame(this.handleRender.bind(this));
        }

        return this;
    }
    Pause() {
        this.IsRunning = false;
        clearInterval(this.Tick.Interval);

        return this;
    }
}