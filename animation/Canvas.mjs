export default class Canvas {
    constructor(canvas) {
        this.Canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.IsPlaying = false;
    }

    //* Erasure methods
    clear() {
        this.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

        return this;
    }
    erase(x, y, w, h) {
        this.ctx.clearRect(x, y, w, h);

        return this;
    }
    eraseNgon(n, x, y, r, { rotation = 0 } = {}) {
        let pColor = this.ctx.strokeStyle;
        let pBgColor = this.ctx.fillStyle;

        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.fillStyle = "#fff";
        this.ngon(n, x, y, r, { rotation, isFilled: true });

        // Reset the composite and revert color
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.strokeStyle = pColor;
        this.ctx.fillStyle = pBgColor;
    }

    
    //* Context meta methods
    prop(...props) {
        if(Array.isArray(props[ 0 ])) {
            props.forEach(([ prop, value ]) => {
                this.ctx[ prop ] = value;
            });
        } else if(typeof props[ 0 ] === "object") {
            Object.entries(props[ 0 ]).forEach(([ prop, value ]) => {
                this.ctx[ prop ] = value;
            });
        }

        return this;
    }

    
    //* Shape methods
    circle(x, y, r, { isFilled = false } = {}) {
        if(isFilled) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        return this;
    }

    point(x, y) {
        return this.rect(x, y, 1, 1);
    }

    line(x0, y0, x1, y1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.closePath();
        this.ctx.stroke();

        return this;
    }

    rect(x, y, w, h, { isFilled = false } = {}) {
        this.ctx.beginPath();
        if(isFilled) {
            this.ctx.fillRect(x, y, w, h);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        } else {
            this.ctx.rect(x, y, w, h);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        return this;
    }

    square(x, y, { rc = null, rw = null, isFilled = false } = {}) {
        if(rc !== null) {
            this.rect(x, y, 2 * rc * Math.cos(Math.PI / 4), 2 * rc * Math.sin(Math.PI / 4), { isFilled });
        } else if(rw !== null) {
            this.rect(x, y, 2 * rw, 2 * rw, { isFilled });
        }
    }

    _getNgonCorner(x, y, r, i, v, rot = 0) {
        let deg = (360 / v) * i + rot;
        let rad = (Math.PI / 180) * deg;

        return [
            x + r * Math.cos(rad),
            y + r * Math.sin(rad),
        ];
    }
    ngon(n, x, y, r, { isFilled = false, rotation = 0 } = {}) {
        let corners = [];
        for (let i = 0; i < n; i++) {
            corners.push(this._getNgonCorner(x, y, r, i, n, rotation));
        }

        this.ctx.beginPath();
        this.ctx.moveTo(...corners[ 0 ]);
        corners.forEach((c, i) => {
            if(i < corners.length - 1) {
                this.ctx.lineTo(...corners[i + 1]);
            }
        });
        this.ctx.lineTo(...corners[ 0 ]);
        this.ctx.closePath();

        if(isFilled) {
            // this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        } else {
            this.ctx.stroke();
        }

        return this;
    }

    
    //* Canvas animation methods
    StartRendering() {
        this.IsPlaying = true;

        window.requestAnimationFrame(this.Render);
    }
    StopRendering() {
        this.IsPlaying = false;

        return this;
    }
    Render(delta) {
        if(this.IsPlaying) {
            window.requestAnimationFrame(this.Render);
        }
    }
}