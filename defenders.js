import { Projectile } from "./projectiles.js";

export class Defender {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = this.game.cellSize;
        this.height = this.game.cellSize;
        this.spriteWidth = 167;
        this.spriteHeight = 243;
        this.shooting = false;
        this.health = 100;
        this.timer = 0;
        this.interval = 1000;
        this.markedForDeletion = false;
        this.image = document.getElementById('plant');
        this.frameX = 0;
        this.maxFrame = 1;
        this.frameTimer = 0;
        this.fps = 10;
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

        const enemy = this.game.enemies.filter(enemy => enemy.y === this.y);
        if (enemy.length > 0) this.shooting = true;
        else this.shooting = false;

        //collision
        this.game.enemies.forEach(enemy => {
            if (this.game.checkCollision(this, enemy)) {
                this.health -= .2;
                enemy.movment = 0;
            }
            if (this.health <= 0) {
                this.markedForDeletion = true;
                this.game.removeObject();
                enemy.movment = enemy.speed;
            }
        });

        if (this.shooting && this.timer > this.interval) {
            this.game.projectiles.push(new Projectile(this.game, this.x + this.width / 2, this.y + this.health / 2));
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '20px Orbitron';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y);
        ctx.restore();
    }
}