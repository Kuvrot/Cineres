import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
const { ccclass, property } = _decorator;

@ccclass('GoToStore')
export class GoToStore extends Component {
    
    @property(EventComponent)
    storeEvent: EventComponent;
    
    start() {

    }

    update(deltaTime: number) {
       if (CommandManager.instance.isCommandEntered){
        switch (CommandManager.instance.command.string){
            case '0' : EventManager.instance.generateNewEvent();
            case '1' : EventManager.instance.generateNewEvent(this.storeEvent);
        }
        CommandManager.instance.clearCommand();
       }
    }
}


