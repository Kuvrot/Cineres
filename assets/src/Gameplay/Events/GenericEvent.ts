import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { GameManager } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GenericEvent')
export class GenericEvent extends Component {
    @property
    generateRandomLoot : boolean = false;

    @property
    agilityCost: number = 0;

    @property
    realesCost: number = 0;

    @property
    eat: boolean = false;
    @property
    health : number = 0;
    @property
    agility : number = 0;
    @property
    strength : number = 0;
    @property
    hunger : number = 0;

    @property
    reales: number = 0;

    @property
    bandages: number = 0;
    @property
    pistolAmmo: number = 0;
    @property
    musketAmmo: number = 0;

    @property
    action: boolean = false;

    start() {
        
    }

    protected onEnable(): void {
        if (!this.generateRandomLoot){
            return;
        }
        this.health = GameManager.instance.getRandomInt(0 , 2);
        this.agility = GameManager.instance.getRandomInt(0 , 4);
        this.strength = GameManager.instance.getRandomInt(0 , 2);
        this.reales = GameManager.instance.getRandomInt(0 , 2);
        this.bandages = GameManager.instance.getRandomInt(0 , 2);
        this.pistolAmmo = GameManager.instance.getRandomInt(0 , 2);
        this.musketAmmo = GameManager.instance.getRandomInt(0 , 2);
        this.eat = GameManager.instance.getRandomInt(0 , 1) == 0 ? false : true;
        this.hunger = GameManager.instance.getRandomInt(0 , 2);
    }

    update(deltaTime: number) {
        if (CommandManager.instance.isCommandEntered){
            if (CommandManager.instance.command.string == '0'){
                if (!this.action){
                    EventManager.instance.clearConsole();
                    this.displayText();
                    this.action = true;
                }else{
                    if (CommandManager.instance.command.string == '0'){
                        EventManager.instance.generateNewEvent();
                    }
                }
            }else{
                EventManager.instance.generateNewEvent();
            }
            CommandManager.instance.clearCommand(); 
        }
    }

    displayText () {  
        if (this.realesCost > 0){
            if ((GameManager.instance.reales - this.realesCost < 0)){
                GameManager.instance.println("Thou hast not enough reales");
                GameManager.instance.println("");
                GameManager.instance.println("0.Continue");
                return;
            }else{
                GameManager.instance.reales -= this.realesCost;
            }
        }

        GameManager.instance.reales += this.reales;
        GameManager.instance.bandages += this.bandages;
        GameManager.instance.pistolAmmo += this.pistolAmmo;
        GameManager.instance.musketAmmo += this.musketAmmo;
        GameManager.instance.agility += this.agility;
        GameManager.instance.strength += this.strength;
        GameManager.instance.health += this.health;

        if (this.agilityCost > 0){
            GameManager.instance.agility -= this.agilityCost;
        }
        if (this.reales > 0) {
            GameManager.instance.println("Thou hast found " + this.reales + "<color=#FFFF00> Reales </color>");
        }
        if (this.bandages > 0) {
            GameManager.instance.println("Thou hast found " + this.bandages + "<color=#FF00FF> Bandages </color>");
            
        }
        if (this.pistolAmmo > 0) {
            GameManager.instance.println("Thou hast found " + this.pistolAmmo + "<color=#FF00FF> Pistol Ammo </color>");
        }
        if (this.musketAmmo > 0) {
            GameManager.instance.println("Thou hast found " + this.musketAmmo + "<color=#FF00FF> Musket ammo </color>");
        }
        if (this.agility > 0 || this.strength > 0 || this.health > 0){
            let stat = "Luckly, Thou wast able to rest. <br />";
            if (this.agility > 0){
                stat += "| +" + this.agility + " agility | <br />";
            }
            if (this.strength > 0){
                stat += "| +" + this.strength + " strength | <br />";
            }
            if (this.health > 0){
                stat += "| +" + this.health + " health | <br />";
            }
            GameManager.instance.println(stat);
        }
        if (this.eat) {
            GameManager.instance.println("Thy hunger hast been satisfied. <br />");
            GameManager.instance.hunger = 0;
        }else{
            if (this.hunger > 0){
                GameManager.instance.println("Thy hunger hast increased by " + this.hunger +  "<br />");
                GameManager.instance.hunger += this.hunger;
            }
        }
        GameManager.instance.println("<br />0.Continue");                             
    }
}


