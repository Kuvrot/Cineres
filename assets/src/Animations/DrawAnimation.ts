import { _decorator, Component, Node, SpriteComponent } from 'cc';
import { CommandManager } from '../Core/CommandManager';
const { ccclass, property } = _decorator;

@ccclass('DrawAnimation')
export class DrawAnimation extends Component {
    
    @property
    drawSpeed: number = 0.3;

    sprite : SpriteComponent;
    maxRange : number = 1;
    start() {
        this.sprite = this.getComponent(SpriteComponent);
    }

    update(deltaTime: number) {
        
        if (CommandManager.instance.isCommandEntered){
            this.sprite.fillRange = 0;
        }
        
        if (this.sprite.fillRange < 1){
            this.sprite.fillRange += 1 * deltaTime * this.drawSpeed;
        }
    }
}


