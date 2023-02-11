import { Cell } from "./cell.js";
import { Enemy } from "./enemy.js";
import { InputHandler } from "./inputHandler.js";
import { Resource } from "./resources.js";
import { UI } from "./ui.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.gameGrid = [];
            this.cellSize = 100;
            this.cellGap = 3;
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.defenders = [];
            this.defenderCost = 100;
            this.numberOfResources = 300;
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.projectiles = [];
            this.resources = [];
            this.resourceTimer = 0;
            this.resourceInterval = 1000;
            this.score = 0;
            this.winingScore = 100;
            this.gameOver = false;
            this.floatingMessages = [];
        }

        render(ctx, deltaTime) {
            //game Grid
            this.gameGrid.forEach(cell => {
                cell.draw(ctx);
            });

            //projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
                projectile.draw(ctx);
            });

            //resources
            if (this.resourceTimer > this.resourceInterval && this.score < this.winingScore) {
                if (Math.random() > .5) this.addResource();
                this.resourceTimer = 0;
            } else {
                this.resourceTimer += deltaTime;
            }
            this.resources.forEach(resource => {
                resource.draw(ctx)
            });

            //defenders
            this.defenders.forEach(defender => {
                defender.update(deltaTime);
                defender.draw(ctx);
            });

            //enemeis
            if (this.enemyTimer > this.enemyInterval && this.score < this.winingScore) {
                this.addEnemy();
                if (this.enemyInterval > 1000) this.enemyInterval -= 50;
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                enemy.draw(ctx);
            });

            //floating message
            this.floatingMessages.forEach(message => {
                message.update(deltaTime);
                message.draw(ctx);
            })

            //UI
            this.ui.draw(ctx);
        }

        removeObject() {
            this.defenders = this.defenders.filter(object => !object.markedForDeletion);
            this.projectiles = this.projectiles.filter(object => !object.markedForDeletion);
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            this.resources = this.resources.filter(object => !object.markedForDeletion);
            this.floatingMessages = this.floatingMessages.filter(object => !object.markedForDeletion);
            console.log(this.floatingMessages)
        }

        craeteGrid() {
            for (let y = this.cellSize; y < this.height; y += this.cellSize) {
                for (let x = 0; x < this.width; x += this.cellSize) {
                    this.gameGrid.push(new Cell(this, x, y));
                }
            }
        }

        checkCollision(first, second) {
            return (first.x < second.x + second.width &&
                first.x + first.width > second.x &&
                first.y < second.y + second.height &&
                first.y + first.height > second.y);
        }

        addEnemy() {
            const randomCell = this.gameGrid[Math.floor(Math.random() * this.gameGrid.length)];
            this.enemies.push(new Enemy(this, randomCell.y));
        }

        addResource() {
            this.resources.push(new Resource(this));
        }
    }

    const game = new Game(canvas);
    game.craeteGrid();

    let lastTime = 0;
    const animate = (timeStamp) => {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, game.cellSize);
        game.render(ctx, deltaTime);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
})