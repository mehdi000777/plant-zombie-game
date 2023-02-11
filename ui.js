export class UI {
    constructor(game) {
        this.game = game;
        this.font = 'Orbitron';
        this.color = 'gold'
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.font = `30px ${this.font}`;
        //Score
        ctx.fillText('Score: ' + this.game.score, 20, 35);
        //Resources
        ctx.fillText('Resources: ' + this.game.numberOfResources, 20, 75);

        //game over
        if (this.game.gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = `90px ${this.font}`;
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', this.game.width / 2, this.game.height / 2);
        }

        if (this.game.score >= this.game.winingScore && this.game.enemies.length === 0) {
            ctx.fillStyle = 'black';
            ctx.font = `60px ${this.font}`;
            ctx.textAlign = 'center';
            ctx.fillText('LEVEL COMPLETE', this.game.width / 2, this.game.height / 2);
            ctx.font = `30px ${this.font}`;
            ctx.fillText(`You win with ${this.game.score} points!`, this.game.width / 2, this.game.height / 2 + 40);
        }
        ctx.restore();
    }
}