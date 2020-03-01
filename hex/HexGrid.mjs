import Hexagon from "./Hexagon.mjs";
import HexTile from "./HexTile.mjs";
import EnumOrientation from "./EnumOrientation.mjs";

export default class HexGrid {
    constructor(width, height, tileSize = 32, { isFlatGrid = true } = {}) {
        this.Width = width;
        this.Height = height;

        this.TileSize = tileSize;
        this.Tiles = {};
        this.TileOrientation = isFlatGrid ? EnumOrientation.FLAT : EnumOrientation.POINTY;

        for(let x = 0; x < width; x++) {
            for(let y = 0; y < height; y++) {
                let z = ~~(-x - y);

                this.Tiles[ `${ x },${ y },${ z }` ] = new HexTile(x, y, z, this.TileSize);

                if(this.TileOrientation === EnumOrientation.FLAT) {
                    this.Tiles[ `${ x },${ y },${ z }` ].Shape = new Hexagon(
                        (this.TileSize * 0.5) + this.TileSize * (3 / 2) * x,
                        this.TileSize + this.TileSize * (Math.sqrt(3) / 2 * x + Math.sqrt(3) * y),
                        this.TileSize,
                        this.TileOrientation
                    );
                } else {
                    this.Tiles[ `${ x },${ y },${ z }` ].Shape = new Hexagon(
                        (this.TileSize * 0.5) + this.TileSize * (Math.sqrt(3) * x) + (Math.sqrt(3) / 2 * y),
                        (this.TileSize * 1.25) + this.TileSize * (3 / 2) * y,
                        this.TileSize,
                        this.TileOrientation
                    );
                }
            }
        }
    }
}