import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { EventManager } from '../Core/EventManager';
import { CityNameGenerator } from './Generation/CityNameGenerator';
import { GenerateUselessEvent } from './Generation/GenerateUselessEvent';
import { LanguageManager } from '../Core/LanguageManager';
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

    @property({ multiline: true })
    prompt : string = "";
    
    @property([String])
    options : String[] = [];
    
    @property
    optionSelected : number = 0;

   @property(SpriteFrame)
   eventImage: SpriteFrame;

    protected onDisable(): void {
        if (this.getComponent(GenerateUselessEvent) != null) {
            this.getComponent(GenerateUselessEvent).generateEvent();
        }
    }

    update(deltaTime: number) {
        
    }

    getOption (){
        return this.optionSelected;
    }

    getPrompt () {
        let translatedPrompt = LanguageManager.instance.getLabel(this.prompt);
        if (this.eventType == 0 && this.getComponent(CityNameGenerator) != null){
            translatedPrompt = this.getComponent(CityNameGenerator).generateCityName(translatedPrompt);
        }
        return translatedPrompt;
    }

    removeEvent () {
        EventManager.instance.events.splice(EventManager.instance.currentEvent , 1);
        EventManager.instance.generateNewEvent();
    }
}


