import Hexagon from "./Hexagon.mjs";

export default class HexTile {
    constructor(q, r, s, { shape = null } = {}) {
        this.Q = q;
        this.R = r;
        this.S = s;

        this.Shape = shape;
    }

    ToAxial() {
        return [
            this.Q,
            this.R
        ];
    }

    CalcOffset(q = 0, r = 0, s = 0) {
        return [
            this.Q + q,
            this.R + r,
            this.S + s
        ];
    }
    /**
     * Returns neighbors starting from "East" and moving anticlockwise
     */
    CalcNeighbors() {
        return [
            this.CalcOffset(1, -1, 0),  // EAST
            this.CalcOffset(1, 0, -1),  // NORTH EAST
            this.CalcOffset(0, 1, -1),  // NORTH WEST
            this.CalcOffset(-1, 1, 0),  // WEST
            this.CalcOffset(-1, 0, 1),  // SOUTH WEST
            this.CalcOffset(0, -1, 1),  // SOUTH EAST
        ];
    }
    /**
     * Returns diagonals starting from "North East" and moving anticlockwise
     */
    CalcDiagonals() {
        return [
            this.CalcOffset(2, -1, -1),  // NORTH EAST
            this.CalcOffset(1, 1, -2),  // NORTH
            this.CalcOffset(-1, 2, -1),  // NORTH WEST
            this.CalcOffset(-2, 1, 1),  // SOUTH WEST
            this.CalcOffset(-1 ,-1, 2),  // SOUTH
            this.CalcOffset(1, -2, 1),  // SOUTH EAST
        ];
    }



    GetDistance(q, r, s) {
        return HexTile.CalcDistance(
            [ this.Q, this.R, this.S ],
            [ q, r, s ]
        )
    }
    GetDistanceToTile(tile) {
        return HexTile.CalcDistance(
            [ this.Q, this.R, this.S ],
            [ tile.Q, tile.R, tile.S ]
        )
    }

    static CalcDistance(a, b) {        
        return Math.max(
            Math.abs(a[ 0 ] - b[ 0 ]),
            Math.abs(a[ 1 ] - b[ 1 ]),
            Math.abs(a[ 2 ] - b[ 2 ])
        );
    }

    static CubeLerp(a, b, t) {
        let lerp = (c, d) => c + (d - c) * t;

        return [
            lerp(a[ 0 ], b[ 0 ], t),
            lerp(a[ 1 ], b[ 1 ], t),
            lerp(a[ 2 ], b[ 2 ], t)
        ];
    }
    
    static DrawLine(a, b) {
        let N = HexTile.CalcDistance(a.Location, b.Location),
            results = [];

        for(let i = 0; i < N; i++) {
            results.push(HexTile.CubeLerp(a, b, 1.0 / N * i));
        }

        return results;
    }
}