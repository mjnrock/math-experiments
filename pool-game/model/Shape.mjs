export default class Shape {
    constructor(x, y, mass = 1) {
        this.X = x;
        this.Y = y;

        this.Mass = mass;
    }

    getAABB() {}
}