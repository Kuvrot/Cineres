import { _decorator, Component, Node, RichText, Sprite, SpriteComponent } from 'cc';
import { EventComponent } from '../Gameplay/EventComponent';
import { GameManager } from '../GameManager';
import { CombatEvent } from '../Gameplay/Events/CombatEvent';
const { ccclass, property } = _decorator;

@ccclass('EventManager')
export class EventManager extends Component {
    static instance : EventManager;

    @property([EventComponent])
    events : EventComponent[] = [];

    @property
    currentEvent : number = 0;

    previousEvent: number = -1;

    @property(RichText)
    consoleText : RichText;

    @property(RichText)
    enemyLabel : RichText;

    @property
    movingText : string = "Moving forward...";

    @property(SpriteComponent)
    display: SpriteComponent;
    
    start() {
        EventManager.instance = this;
        for (let i = 0; i < this.events.length; i++){
            this.events[i].node.active = false;
        }
        this.generateNewEvent();
    }

    update(deltaTime: number) {
    }
    
    //If the argument provided is null, a random event will be generate
    generateNewEvent(event: EventComponent = null){  
        GameManager.instance.hungerCounter++;
        let index = 0;
        if (event == null){
            index = this.generateRandomEvent();
        }else{
            index = this.events.indexOf(event);
            if (index == -1){
                index = this.generateRandomEvent();
            } 
        } 
        if (this.previousEvent != -1){
            this.previousEvent = this.currentEvent;
            this.currentEvent = index;
        }else{
            this.currentEvent = 0;
            this.previousEvent = this.currentEvent;
        }

        if (this.previousEvent >= 0){
            this.events[this.previousEvent].node.active = false;
        }
        this.events[this.currentEvent].node.active = true;
        this.displayPrompt();
    }

    generateRandomEvent () {
        let index = GameManager.instance.getRandomInt(0 , this.events.length - 1);
        while (index == this.previousEvent) {
            index = GameManager.instance.getRandomInt(0 , this.events.length - 1);
        }
        return index;
    }

    clearConsole () {
        this.consoleText.string = "";
    }

    displayPrompt () {
        let consoleText = this.events[this.currentEvent].getPrompt();
        //Display options
        consoleText += "<br />";
        if (this.events[this.currentEvent].eventType == 3 && this.events[this.currentEvent].getComponent(CombatEvent)){
            consoleText += "<br />";
            consoleText += "A<color=#FF0000> " + this.events[this.currentEvent].getComponent(CombatEvent).enemyName +  " </color>has appeared.";
            consoleText += "<br />";
        }
        for (let i  = 0; i < this.events[this.currentEvent].options.length; i++){
            consoleText += "<br/>";
            consoleText += i + ". " + this.events[this.currentEvent].options[i];
        }
        this.consoleText.string = consoleText;
        this.display.spriteFrame = this.events[this.currentEvent].eventImage;
    }
}


