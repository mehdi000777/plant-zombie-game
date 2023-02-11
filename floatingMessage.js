export class FloatingMessage {
    constructor(game, x, y, value, size, color) {
        this.game = game;
        this.value = value;
        this.color = color;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.opacity = 1;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        this.y -= .3;
        this.lifeSpan += deltaTime;
        if (this.opacity > 0.01) this.opacity -= 0.01;
        if (this.lifeSpan > 300) {
            this.markedForDeletion = true;
            this.game.removeObject();
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px Orbitron`;
        ctx.fillText(this.value, this.x, this.y);
        ctx.restore();
    }
}