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

    static instance : GameManager;

    start() {
        GameManager.instance = this;
    }
    update(deltaTime: number) {
        this.displayInventory();
        this.playerStatsLimits();
        //this.hungerFeature();
    }

    println (text : string) {
        let newString = text + "<br />"
        EventManager.instance.consoleText.string += newString;
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    displayInventory () {
        let inventoryString = "";
        //Stats
        inventoryString += "<br />" + this.statsHeader;
        inventoryString += "<br />Health: " + this.health;
        inventoryString += "<br />Strength: " + this.strength;
        //inventoryString += "<br />Skill: " + this.skill;
        //inventoryString += "<br /> Gun skill: " + this.gunSkill);
        inventoryString += "<br />Agility: " + this.agility;
        inventoryString += "<br />Hunger: " + this.hunger;
        
        //Inventory
        inventoryString += "<br />" + this.inventoryHeader;
        inventoryString += "<br />Reales: " + this.reales;
        inventoryString += "<br />Bandages: " + this.bandages;
        inventoryString += "<br />Pistol ammo: " + this.pistolAmmo;
        inventoryString += "<br />Musket ammo: " + this.musketAmmo;
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
        }
        if (this.hunger > 4){
            this.hunger = 4;
        }
        if (this.health > 20){
            this.health = 20;
        }
    }

    hungerFeature () {
        this.strength = this.hunger;
        this.agility -= this.hunger;
    }
}


