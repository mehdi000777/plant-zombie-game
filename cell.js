export class Cell {
    constructor(game, x, y) {
        this.game = game;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        if (this.game.checkCollision(this, this.game.input.mouse)) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}