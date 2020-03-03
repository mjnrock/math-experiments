export default class HexMap {
    constructor(canvas, { width = null, height = null, origin = [0, 0], tileSize = 50, hexType = "flat" } = {}) {
        this.Canvas = canvas;

        this.Width = width || canvas.width;
        this.Height = height || canvas.height;

        this.Origin = {
            X: origin[0],
            Y: origin[1]
        };
        this.TileSize = tileSize;
        this.HexType = hexType;     // flat|pointy
    }

    Draw() {
        const ctx = this.Canvas.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);

        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#000";
        ctx.font = "10pt mono";
        this.DrawBoard(ctx);
    }

    DrawBoard(ctx) {
        const frontier = [
            this.AxialToCube(this.Hex(0, 0))
        ];
        const closed = [];

        while (frontier.length) {
            let cube = frontier.pop();
            let hex = this.CubeToAxial(cube);
            let willDraw = this.WillDrawHex(hex);
            this.DrawHexagon(ctx, hex, willDraw);

            if (willDraw) {
                let neighbors = this.GetCubeNeighbors(cube);

                neighbors.forEach(n => {
                    if (!closed.includes(JSON.stringify(n))) {
                        frontier.push(n);
                    }
                });
            }

            closed.push(JSON.stringify(cube));
        }
    }

    DrawHexagon(ctx, hex, drawHex = null) {
        if ("x" in hex && "y" in hex && "z" in hex) {
            hex = this.CubeToAxial(hex);
        }

        let { x: px, y: py } = this.HexToPixel(hex);
        px += this.Origin.X;
        py += this.Origin.Y;
        const corners = this.GetPixelCorners(this.Point(px, py));

        let doDraw = drawHex !== null ? drawHex : this.WillDrawHex(corners);
        if (doDraw) {
            //  Draw the actual hexagon
            corners.forEach((c, i) => {
                let { x: x0, y: y0 } = c;
                let { x: x1, y: y1 } = corners[i + 1 > 5 ? 0 : i + 1];

                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.stroke();
            });

            let txtPx = `${~~px}, ${~~py}`,
                txtPxWidth = ctx.measureText(txtPx);
            ctx.fillText(txtPx, px - txtPxWidth.width / 2, py);
            let txtCoords = `${~~hex.q}, ${~~hex.r}`,
                txtCoordsWidth = ctx.measureText(txtCoords);
            ctx.fillText(txtCoords, px - txtCoordsWidth.width / 2, py + 15);

            return true;
        }

        return false;
    }

    WillDrawHex(corners) {
        if ("q" in corners && "r" in corners) {
            const { x: px, y: py } = this.HexToPixel(corners);
            corners = this.GetPixelCorners(this.Point(px + this.Origin.X, py + this.Origin.Y));
        }

        const lines = this.GetPixelLines(corners);

        //  Do not draw a hexagon if it will bleed over the edge of the map
        const ptl = this.Point(0, 0),
            ptr = this.Point(this.Width, 0),
            pbr = this.Point(this.Width, this.Height),
            pbl = this.Point(0, this.Height);

        for (let [la, lb] of lines) {
            if (
                this.CheckLineIntersection(la, lb, ptl, ptr)
                || this.CheckLineIntersection(la, lb, ptr, pbr)
                || this.CheckLineIntersection(la, lb, pbr, pbl)
                || this.CheckLineIntersection(la, lb, pbl, ptl)
            ) {
                return false;
            }
        }

        return true;
    }

    CheckLineIntersection(p1, p2, p3, p4) {
        let uA = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));
        let uB = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return true;
        }

        return false;
    }

    GetPixelCorner(center, i) {
        let deg = 60 * i + (this.HexType === "flat" ? 0 : -30);
        let rad = Math.PI / 180 * deg;

        return this.Point(
            center.x + this.TileSize * Math.cos(rad),
            center.y + this.TileSize * Math.sin(rad),
        );
    }
    GetPixelCorners(center) {
        let corners = [];

        for (let i = 0; i < 6; i++) {
            corners.push(this.GetPixelCorner(center, i));
        }

        return corners;
    }
    GetPixelLines(corners) {
        return corners.map((c, i) => [
            c,
            corners[i + 1 >= 5 ? 0 : i + 1]
        ]);
    }

    HexToPixel(hex) {
        if (this.HexType === "flat") {
            let x = this.TileSize * (3 / 2 * hex.q);
            let y = this.TileSize * (Math.sqrt(3) / 2 * hex.q + Math.sqrt(3) * hex.r);

            return this.Point(x, y);
        } else if (this.HexType === "pointy") {
            let x = this.TileSize * (Math.sqrt(3) * hex.q + Math.sqrt(3) / 2 * hex.r);
            let y = this.TileSize * (3 / 2 * hex.r);

            return this.Point(x, y);
        }
    }
    PixelToHex(point) {
        point.x -= this.Origin.X;
        point.y -= this.Origin.Y;

        if (this.HexType === "flat") {
            let q = (2 / 3 * point.x) / this.TileSize;
            let r = (-1 / 3 * point.x + Math.sqrt(3) / 3 * point.y) / this.TileSize;

            return this.HexRound(this.Hex(q, r));
        } else if (this.HexType === "pointy") {
            let q = (Math.sqrt(3) / 3 * point.x - 1 / 3 * point.y) / size;
            let r = (2 / 3 * point.y) / size;

            return this.HexRound(this.Hex(q, r));
        }
    }


    GetCubeNeighbors(input) {
        let cube = input;
        if ("q" in input && "r" in input) {
            cube = this.AxialToCube(input);
        }

        let directions = [
            this.Cube(1, -1, 0),
            this.Cube(1, 0, -1),
            this.Cube(0, 1, -1),
            this.Cube(-1, 1, 0),
            this.Cube(-1, 0, 1),
            this.Cube(0, -1, 1),
        ];

        return directions.map(dir => this.CubeAdd(cube, dir));
    }

    CubeToAxial(cube) {
        return this.Hex(
            cube.x,
            cube.z
        );
    }
    AxialToCube(hex) {
        return this.Cube(
            hex.q,
            -hex.q - hex.r,
            hex.r
        );
    }

    HexRound(hex) {
        return this.CubeToAxial(this.CubeRound(this.AxialToCube(hex)));
    }

    CubeRound(cube) {
        let rx = Math.round(cube.x);
        let ry = Math.round(cube.y);
        let rz = Math.round(cube.z);

        let x_diff = Math.abs(rx - cube.x);
        let y_diff = Math.abs(ry - cube.y);
        let z_diff = Math.abs(rz - cube.z);

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry - rz;
        } else if (y_diff > z_diff) {
            ry = -rx - rz;
        } else {
            rz = -rx - ry;
        }

        return this.Cube(rx, ry, rz);
    }
    CubeAdd(a, b) {
        return this.Cube(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z
        );
    }

    //  Math.atan2(0, -0) === Math.PI, so all this -0 checking is really just a safeguard for lazy trig inputs
    Point(x, y) {
        return {
            x: x === -0 ? 0 : x,
            y: y === -0 ? 0 : y
        };
    }
    Cube(x, y, z) {
        return {
            x: x === -0 ? 0 : x,
            y: y === -0 ? 0 : y,
            z: z === -0 ? 0 : z
        };
    }
    Hex(q, r) {
        if (this.HexType === "flat") {
            return {
                q: q === -0 ? 0 : q,
                r: r === -0 ? 0 : r,
                w: this.TileSize * 2,
                h: this.TileSize * Math.sqrt(3)
            };
        } else if (this.HexType === "pointy") {
            return {
                q: q === -0 ? 0 : q,
                r: r === -0 ? 0 : r,
                w: this.TileSize * Math.sqrt(3),
                h: this.TileSize * 2
            };
        }
    }
};