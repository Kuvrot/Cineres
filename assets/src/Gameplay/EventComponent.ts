import { _decorator, Component, Node, Sprite } from 'cc';
import { EventManager } from '../Core/EventManager';
import { CityNameGenerator } from './Generation/CityNameGenerator';
const { ccclass, property } = _decorator;

@ccclass('EventComponent')
export class EventComponent extends Component {
    
    @property
    prompt : string = "";
    
    @property([String])
    options : String[] = [];
    
    @property
    optionSelected : number = 0;

   @property(Sprite)
   image: Sprite;
    
    onEnable() {
    }

    update(deltaTime: number) {
        
    }

    getOption (){
        return this.optionSelected;
    }

    getPrompt () {
        if (this.getComponent(CityNameGenerator) != null){
            this.prompt = this.getComponent(CityNameGenerator).generateCityName(this.prompt);
        }
        return this.prompt;
    }

    removeEvent () {
        EventManager.instance.events.splice(EventManager.instance.currentEvent , 1);
        EventManager.instance.generateNewEvent();
    }
}


