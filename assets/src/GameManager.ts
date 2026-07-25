import { _decorator, Component, EditBox, Node, RichText } from 'cc';
import { EventManager } from './Core/EventManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    
    @property
    progress: number  = 0;
    //Stats
    @property
    health: number = 100;

    @property
    strength: number = 10;

    @property
    skill: number = 10;

    @property
    gunSkill: number = 10;

    @property
    agility: number = 10;

    //Inventory
    @property
    bandages: number = 1;

    @property
    pistolAmmo: number = 0;

    @property
    musketAmmo: number = 0;
    
    @property(RichText)
    InventoryLabel : RichText;

    @property({multiline : true})
    statsHeader = "STATS";

    @property({multiline : true})
    inventoryHeader = "INVENTORY";

    static instance : GameManager;

    start() {
        GameManager.instance = this;
    }
    update(deltaTime: number) {
        
    }

    println (text : string) {
        let newString = text + "<br />"
        EventManager.instance.consoleText.string += newString;
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


