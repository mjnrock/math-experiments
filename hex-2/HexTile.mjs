//! ALL Offset calcuations assume an "Odd Column" orientation
export default class HexTile {
    constructor(row, col) {
        let [ a, b, c ] = HexTile.FromOffset(row, col);

        this.X = a;
        this.Y = b;
        this.Z = c;
    }

    ToOffset() {
        return [
            this.X,
            this.Z + (this.X - (this.X & 1)) / 2
        ];
    }

    static FromOffset(row, col) {
        let x = col;
        let z = row - (col - (col & 1)) / 2;
        let y = -x - z;

        return [
            x,
            y,
            z
        ];
    }


    static GetPixelCorner(px, py, i, scale = 1.0, offX = 0, offY = 0) {
        let deg = 60 * i;
        let rad = Math.PI / 180 * deg;

        return [
            px + scale * Math.cos(rad),
            py + scale * Math.sin(rad)
        ];
    }
    static GetPixelCorners(tx, ty, scale = 1.0, offX = 0, offY = 0) {
        let corners = [];

        for(let i = 0; i < 6; i++) {
            corners.push(HexTile.GetPixelCorner(
                // tx * 2,
                // ty * Math.sqrt(3),
                ...HexTile.GetPixelOrigin(tx, ty, scale, offX, offY),

                i,
                scale,
                offX,
                offY + (tx - (tx & 1)) / 2
            ));
        }

        return corners;
    }
    static GetPixelOrigin(tx, ty, scale = 1.0, offX = 0, offY = 0) {
        return [
            offX + scale * tx * 2,
            offY + scale * ty * Math.sqrt(3),
        ];
    }
};