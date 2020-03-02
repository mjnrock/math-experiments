import Point from "./Point.mjs";

export default class Point3 extends Point {
    constructor(x, y, z) {
        super(x, y);
        
        this.Z = z;
    }

    toArray() {
        return [
            ...super.toArray(),
            this.Z
        ];
    }

    copy() {
        return new Point3(
            this.X,
            this.Y,
            this.Z
        );
    }
}