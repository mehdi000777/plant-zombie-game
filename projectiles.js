export class Projectile {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
        this.markedForDeletion = false;
    }

    update() {
        this.x += this.speed;

        if (this.x > this.game.width - this.game.cellSize) {
            this.markedForDeletion = true;
            this.game.removeObject();
        }

        this.game.enemies.forEach(enemy => {
            if (this.game.checkCollision(this, enemy)) {
                this.markedForDeletion = true;
                this.game.removeObject();
                enemy.health -= this.power;
            }
        })
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}