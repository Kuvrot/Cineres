import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
const { ccclass, property } = _decorator;

@ccclass('StartGame')
export class StartGame extends Component {
    
    @property(EventComponent)
    initialEvent : EventComponent;

    @property
    uniqueEvent : boolean = true;

    eventHappened = false;

    start() {

    }
    protected onEnable(): void {
        if (this.eventHappened){
            EventManager.instance.generateNewEvent(this.initialEvent);
        }
    }

    update(deltaTime: number) {
       if (CommandManager.instance.isCommandEntered){
        if (CommandManager.instance.command.string == '0'){
            EventManager.instance.generateNewEvent(this.initialEvent);
            if (this.uniqueEvent){
                this.eventHappened = true;
                //This lines breakes the game
                //EventManager.instance.events.splice(EventManager.instance.events.indexOf(this.getComponent(EventComponent)), 1);
            }
        }
        CommandManager.instance.clearCommand();
       }
    }
}


