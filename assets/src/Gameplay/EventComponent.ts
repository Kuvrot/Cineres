import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { EventManager } from '../Core/EventManager';
import { CityNameGenerator } from './Generation/CityNameGenerator';
const { ccclass, property } = _decorator;

@ccclass('EventComponent')
export class EventComponent extends Component {
    
    //Event type
    // 0 = City type
    // 1 = Forest
    // 2 = Interaction
    // 3 = Combat
    // 4 = Store
    // 5 = Loot
    // 6 = Random store
    @property
    eventType: number = 0;

    @property
    prompt : string = "";
    
    @property([String])
    options : String[] = [];
    
    @property
    optionSelected : number = 0;

   @property(SpriteFrame)
   eventImage: SpriteFrame;
    
    onEnable() {
    }

    update(deltaTime: number) {
        
    }

    getOption (){
        return this.optionSelected;
    }

    getPrompt () {
        if (this.eventType == 0 && this.getComponent(CityNameGenerator) != null){
            this.prompt = this.getComponent(CityNameGenerator).generateCityName(this.prompt);
        }
        return this.prompt;
    }

    removeEvent () {
        EventManager.instance.events.splice(EventManager.instance.currentEvent , 1);
        EventManager.instance.generateNewEvent();
    }
}


