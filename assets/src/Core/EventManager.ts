import { _decorator, Component, Node, RichText, Sprite, SpriteComponent } from 'cc';
import { EventComponent } from '../Gameplay/EventComponent';
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

    generateNewEvent(){
        let index = this.getRandomInt(0 , this.events.length - 1);
        while (index == this.previousEvent) {
            index = this.getRandomInt(0 , this.events.length - 1);
        }
        this.previousEvent = this.currentEvent;
        this.currentEvent = index;
        if (this.previousEvent >= 0){
            this.events[this.previousEvent].node.active = false;
        }
        this.events[this.currentEvent].node.active = true;
        this.displayPrompt();
    }

    clearConsole () {
        this.consoleText.string = "";
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayPrompt () {
        let consoleText = this.events[this.currentEvent].getPrompt();
        
        //Display options
        consoleText += "<br/>";
        for (let i  = 0; i < this.events[this.currentEvent].options.length; i++){
            consoleText += "<br/>"
            consoleText += i + ". " + this.events[this.currentEvent].options[i];
        }
        this.consoleText.string = consoleText;

        this.display.spriteFrame = this.events[this.currentEvent].eventImage;
    }
}


