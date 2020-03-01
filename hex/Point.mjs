export default class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }

    toArray() {
        return [
            this.X,
            this.Y
        ];
    }

    copy() {
        return new Point(
            this.X,
            this.Y
        );
    }
}