import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
const { ccclass, property } = _decorator;

@ccclass('StartGame')
export class StartGame extends Component {
    
    @property(EventComponent)
    initialEvent : EventComponent;

    start() {

    }

    update(deltaTime: number) {
       if (CommandManager.instance.isCommandEntered){
        if (CommandManager.instance.command.string == '0'){
            EventManager.instance.generateNewEvent(this.initialEvent);
        }else{
            alert("Incorrect command!");
        }
        CommandManager.instance.clearCommand();
       }
    }
}


