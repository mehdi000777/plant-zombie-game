import { FloatingMessage } from "./floatingMessage.js";

export class Enemy {
    constructor(game, verticalPosition) {
        this.game = game;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.spriteWidth = 292;
        this.spriteHeight = 410;
        this.x = this.game.width;
        this.y = verticalPosition;
        this.speed = Math.random() * .2 + .4;
        this.movment = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.markedForDeletion = false;
        this.image = document.getElementById('zombie');
        this.frameX = 0;
        this.maxFrame = 7;
        this.frameTimer = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
    }

    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.x < -this.width) this.game.gameOver = true;
        this.x -= this.movment;

        if (this.health <= 0) {
            this.markedForDeletion = true;
            this.game.removeObject();
            const gainedResources = this.maxHealth / 10;
            this.game.numberOfResources += gainedResources;
            this.game.score += gainedResources;
            this.game.floatingMessages.push(new FloatingMessage(this.game, this.x, this.y, `+${gainedResources}`, 15, 'gold'));
            this.game.floatingMessages.push(new FloatingMessage(this.game, 250, 50, `+${gainedResources}`, 30, 'gold'));
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y);
        ctx.restore();
    }
}