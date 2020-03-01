import Hexagon from "./Hexagon.mjs";
import Point from "./Point.mjs";
import Point3 from "./Point3.mjs";

export default class HexTile {
    constructor(x, y, z, size, { shape = null } = {}) {
        this.Location = new Point3(x, y, z);
        this.Shape = shape;
    }

    ToAxial() {
        return new Point(
            this.Location.X,
            this.Location.Z
        );
    }

    CalcOffset(x = 0, y = 0, z = 0) {
        return new Point3(
            this.Location.X + x,
            this.Location.Y + y,
            this.Location.Z + z
        );
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



    GetDistance(x, y, z) {
        return HexTile.CalcDistance(
            this.Location,
            new Point(x, y, z)
        )
    }
    GetDistanceToTile(tile) {
        return HexTile.CalcDistance(
            this.Location,
            tile.Location
        )
    }

    Copy(x = 0, y = 0, z = 0) {
        return new HexTile(
            this.Shape,
            new Point3(
                this.Location.X + x,
                this.Location.Y + y,
                this.Location.Z + z
            )
        );
    }

    static CalcAllWithinRange(point3, range = 0) {
        let results = [];

        for(let x = -range; x <= range; x++) {
            for(let y = Math.max(-range, -x - range); y <= Math.min(range, -x + range); y++) {
                let z = -x - y;

                results.push(new Point3(
                    point3.X + x,
                    point3.Y + y,
                    point3.Z + z
                ));
            }
        }

        return results;
    }

    static CalcDistance(a, b) {        
        return Math.max(
            Math.abs(a.X - b.X),
            Math.abs(a.Y - b.Y),
            Math.abs(a.Z - b.Z)
        );
    }

    static CubeLerp(a, b, t) {
        let lerp = (c, d) => c + (d - c) * t;

        return new Point3(
            lerp(a.X, b.X, t),
            lerp(a.Y, b.Y, t),
            lerp(a.Z, b.Z, t)
        );
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