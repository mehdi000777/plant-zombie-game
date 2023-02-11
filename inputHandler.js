import { Defender } from "./defenders.js";
import { FloatingMessage } from "./floatingMessage.js";

export class InputHandler {
    constructor(game) {
        this.game = game;
        this.mouse = {
            x: undefined,
            y: undefined,
            width: .1,
            height: .1,
        }
        this.canvasPosition = this.game.canvas.getBoundingClientRect();

        this.game.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x - this.canvasPosition.left;
            this.mouse.y = e.y - this.canvasPosition.top;
        });

        this.game.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });

        this.game.canvas.addEventListener('click', () => {
            const cell = this.game.gameGrid.filter(cell => this.game.checkCollision(cell, this.mouse));
            const defender = this.game.defenders.filter(defender => defender.x === cell[0].x && defender.y === cell[0].y);
            const resource = this.game.resources.filter(resource => this.game.checkCollision(resource, this.mouse));
            if (defender.length > 0) return;
            if (resource.length > 0) {
                resource[0].markedForDeletion = true;
                this.game.removeObject();
                this.game.numberOfResources += resource[0].amount;
                this.game.floatingMessages.push(new FloatingMessage(this.game, this.mouse.x, this.mouse.y, `+${resource[0].amount}`, 20, 'gold'));
                this.game.floatingMessages.push(new FloatingMessage(this.game, 250, 50, `+${resource[0].amount}`, 30, 'gold'));
            }
            else if (cell.length > 0 && this.game.numberOfResources >= this.game.defenderCost) {
                this.game.defenders.push(new Defender(this.game, cell[0].x, cell[0].y));
                this.game.numberOfResources -= this.game.defenderCost;
            } else {
                this.game.floatingMessages.push(new FloatingMessage(this.game, this.mouse.x, this.mouse.y, 'need more resources', 15, 'red'));
            }
        });

        window.addEventListener('resize', () => {
            this.canvasPosition = this.game.canvas.getBoundingClientRect();
        })
    }
}