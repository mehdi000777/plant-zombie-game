export class Resource {
    constructor(game) {
        this.game = game;
        this.x = Math.random() * (this.game.width - this.game.cellSize);
        this.y = this.game.gameGrid[Math.floor(Math.random() * this.game.gameGrid.length)].y + 25;
        this.width = this.game.cellSize * .6;
        this.height = this.game.cellSize * .6;
        this.amounts = [20, 30, 40];
        this.amount = this.amounts[Math.floor(Math.random() * this.amounts.length)];
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Orbitron';
        ctx.fillText(this.amount, this.x + 15, this.y + 25);
        ctx.restore();
    }
}