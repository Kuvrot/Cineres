import { _decorator, Component, EditBox, Node, RichText, director} from 'cc';
import { EventManager } from './Core/EventManager';
import { LanguageManager } from './Core/LanguageManager';

const { ccclass, property, executionOrder } = _decorator;

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

    @property
    hunger: number = 0;

    //Inventory
    @property
    reales: number = 2;

    @property
    bandages: number = 1;

    @property
    pistolAmmo: number = 0;

    @property
    musketAmmo: number = 0;
    
    @property(RichText)
    inventoryLabel : RichText;

    @property({multiline : true})
    statsHeader = "STATS";

    @property({multiline : true})
    inventoryHeader = "INVENTORY";

    hungerCounter: number = -1;

    static instance : GameManager;

    start() {
        GameManager.instance = this;
    }
    update(deltaTime: number) {
        this.displayInventory();
        this.playerStatsLimits();
        this.increaseHunger();
    }

    println (text : string) {
        let label = LanguageManager.instance.getLabel(text);
        let newString = label + "<br />"
        EventManager.instance.consoleText.string += newString;
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayInventory () {
        
        if (EventManager.instance != null && !EventManager.instance.loaded){
            return;
        }

        let inventoryString = "";
        // Stats
        inventoryString += "<br />" + LanguageManager.instance.getLabel(this.statsHeader);
        inventoryString += "<br />" + LanguageManager.instance.getLabel("health.label") + " " + this.health;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("strength.label") + " " + this.strength;
        //inventoryString += "<br />" + LanguageManager.instance.getLabel("skill.label") + " " +  this.skill;
        //inventoryString += "<br />" + LanguageManager.instance.getLabel("gunSkill.label") + " " +  this.gunSkill;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("agility.label") + " " +  this.agility;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("hunger.label") + " " +  this.hunger;

        // Inventory
        inventoryString += "<br />" + LanguageManager.instance.getLabel(this.inventoryHeader);
        inventoryString += "<br />" + LanguageManager.instance.getLabel("reales.label") + " " +  this.reales;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("bandages.label") + " " +  this.bandages;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("pistol.ammo.label") + " " +  this.pistolAmmo;
        inventoryString += "<br />" + LanguageManager.instance.getLabel("musket.ammo.label") + " " +  this.musketAmmo;
        this.inventoryLabel.string = inventoryString;
    }

    playerStatsLimits(){
        if (this.agility < 1){
            this.agility = 1;
        }
        if (this.strength < 1){
            this.strength = 1;
        }
        if (this.health < 0){
            this.health = 0;
            director.loadScene("deathScreen");
        }
        if (this.hunger > 4){
            this.hunger = 4;
        }
        if (this.health > 20){
            this.health = 20;
        }
    }

    increaseHunger () {
        if (this.hungerCounter > 5){
            this.hunger++;
            this.hungerCounter = 0;
        }
    } 
}


