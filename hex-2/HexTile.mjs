import EnumOrientation from "./enum/Orientation.mjs";

//! Default Offset calcuations assume an "Odd Column" orientation
export default class HexTile {
    constructor(row, col, { scale = 1.0, orientation = EnumOrientation.ODD_COLUMN } = {}) {
        let [ a, b, c ] = HexTile.FromOffset(row, col);

        this.X = a;
        this.Y = b;
        this.Z = c;

        this.Orientation = orientation;
        this.Scale = scale;
        this.Corners = HexTile.GetPixelCorners(row, col, scale, { orientation });
    }
    
    ToOffset() {
        switch(this.Orientation) {
            case EnumOrientation.ODD_COLUMN:
                return [
                    this.X,
                    this.Z + (this.X - (this.X & 1)) / 2
                ];
            case EnumOrientation.EVEN_COLUMN:
                return [
                    this.X,
                    this.Z + (this.X + (this.X & 1)) / 2
                ];
            case EnumOrientation.ODD_ROW:
                return [
                    this.X + (this.Z - (this.Z & 1)) / 2,
                    this.Z
                ];
            case EnumOrientation.EVEN_ROW:
                return [
                    this.X + (this.Z + (this.Z & 1)) / 2,
                    this.Z
                ];
            default:
                return false;
        }
    }

    GetNeighbors() {
        let directions = [
            [ 1, -1, 0 ],
            [ 1, 0, -1 ],
            [ 0, 1, -1 ],
            [ -1, 1, 0 ],
            [ -1, 0, 1 ],
            [ 0, -1, 1 ],
        ];

        let results = [];
        directions.forEach(([ dx, dy, dz ]) => results.push([
            this.X + dx,
            this.Y + dy,
            this.Z + dz
        ]));

        return results;
    }



    static ToOffset(x, y, z, orientation = EnumOrientation.ODD_COLUMN) {
        switch(orientation) {
            case EnumOrientation.ODD_COLUMN:
                return [
                    x,
                    z + (x - (x & 1)) / 2
                ];
            case EnumOrientation.EVEN_COLUMN:
                return [
                    x,
                    z + (x + (x & 1)) / 2
                ];
            case EnumOrientation.ODD_ROW:
                return [
                    x + (z - (z & 1)) / 2,
                    z
                ];
            case EnumOrientation.EVEN_ROW:
                return [
                    x + (z + (z & 1)) / 2,
                    z
                ];
            default:
                return false;
        }
    }
    static FromOffset(row, col, orientation = EnumOrientation.ODD_COLUMN) {
        let x, z;

        switch(orientation) {
            case EnumOrientation.ODD_COLUMN:
                x = col;
                z = row - (col - (col & 1)) / 2;

                return [
                    x,
                    -x - z,
                    z
                ];
            case EnumOrientation.EVEN_COLUMN:
                x = col;
                z = row - (col + (col & 1)) / 2;

                return [
                    x,
                    -x - z,
                    z
                ];
            case EnumOrientation.ODD_ROW:
                x = col - (row - (row & 1)) / 2;
                z = row;

                return [
                    x,
                    -x - z,
                    z
                ];
            case EnumOrientation.EVEN_ROW:
                x = col - (row + (row & 1)) / 2;
                z = row;

                return [
                    x,
                    -x - z,
                    z
                ];
            default:
                return false;
        }
    }

    static GetPixelCorner(px, py, i, scale = 1.0, { orientation = EnumOrientation.ODD_COLUMN } = {}) {
        let rot = orientation === EnumOrientation.ODD_ROW || orientation === EnumOrientation.EVEN_ROW ? -30 : 0;

        let deg = 60 * i + rot;
        let rad = Math.PI / 180 * deg;

        return [
            px + scale * Math.cos(rad),
            py + scale * Math.sin(rad)
        ];
    }
    static GetPixelCorners(tx, ty, scale = 1.0, { orientation = EnumOrientation.ODD_COLUMN, offX = 0, offY = 0 } = obj = {}) {
        let corners = [];

        for(let i = 0; i < 6; i++) {
            corners.push(HexTile.GetPixelCorner(
                ...HexTile.TileToPixel(tx, ty, scale, { orientation, offX, offY }),
                i,
                scale,
                orientation
            ));
        }

        return corners;
    }

    static TileToPixel(tx, ty, scale = 1.0, { orientation = EnumOrientation.ODD_COLUMN, offX = 0, offY = 0 } = {}) {
        if(orientation === EnumOrientation.ODD_COLUMN) {
            return [
                offX + scale * 3 / 2 * tx,
                offY + scale * Math.sqrt(3) * (ty + 0.5 * (tx & 1))
            ];
        } else if(orientation === EnumOrientation.EVEN_COLUMN) {
            return [
                offX + scale * 3 / 2 * tx,
                offY + scale * Math.sqrt(3) * (ty - 0.5 * (tx & 1))
            ];
        } else if(orientation === EnumOrientation.ODD_ROW) {
            return [
                offY + scale * Math.sqrt(3) * (tx + 0.5 * (ty & 1)),
                offX + scale * 3 / 2 * ty
            ];
        } else if(orientation === EnumOrientation.EVEN_ROW) {
            return [
                offY + scale * Math.sqrt(3) * (tx - 0.5 * (ty & 1)),
                offX + scale * 3 / 2 * ty
            ];
        }
    }

    static PixelToTile(x, y, scale = 1.0, { orientation = EnumOrientation.ODD_COLUMN, offX = 0, offY = 0 } = {}) {
        let w = 2 * scale,
            h = Math.sqrt(3) * scale;

        let q = (2 / 3 * x) / scale,
            r = (-1 / 3 * x + Math.sqrt(3) / 3 * y) / scale;

        return HexTile.FromOffset(q, r, orientation);
    }


    // static RoundHexTile(x, y, z) {
    //     let rx = Math.round(x);
    //     let ry = Math.round(y);
    //     let rz = Math.round(z);

    //     let x_diff = Math.abs(rx - x);
    //     let y_diff = Math.abs(ry - y);
    //     let z_diff = Math.abs(rz - z);

    //     if ((x_diff > y_diff) && (x_diff > z_diff)) {
    //         rx = -ry - rz;
    //     } else if (y_diff > z_diff) {
    //         ry = -rx - rz;
    //     } else {
    //         rz = -rx - ry;
    //     }

    //     return [
    //         rx,
    //         ry,
    //         rz
    //     ];
    // }
    // static RoundOffset(x, y) {
    //     return HexTile.FromOffset(x, y)
    // }
};