import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
import { GameManager } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GoToStore')
export class GoToStore extends Component {
    
    @property(EventComponent)
    storeEvent: EventComponent;

    @property
    restingCost = 3;


    start() {
    }

    update(deltaTime: number) {
       if (CommandManager.instance.isCommandEntered){
        switch (CommandManager.instance.command.string){
            default : EventManager.instance.generateNewEvent(); break;
            case '1' : EventManager.instance.generateNewEvent(this.storeEvent); break;
            case '2' : this.rest(); EventManager.instance.generateNewEvent(); break;
        }
        CommandManager.instance.clearCommand();
       }
    }

    rest () {
        if (GameManager.instance.reales < this.restingCost){
            alert ("Not enough reales");
            return;
        }
        GameManager.instance.reales -= this.restingCost;
        GameManager.instance.agility += 10; 
    }
}


