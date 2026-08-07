import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../GameManager';
import { EventManager } from '../../Core/EventManager';
import { CommandManager } from '../../Core/CommandManager';
import { LootGeneration } from '../Generation/LootGeneration';
const { ccclass, property } = _decorator;

@ccclass('CombatEvent')
export class CombatEvent extends Component {
    
    @property
    enemyName: string = "";

    //EnemyStats
    @property
    maxHealth: number = 10;
    @property
    maxAgility: number = 10;
    @property
    maxStrength : number = 10;
    
    health : number = 10;
    agility: number = 10;
    strength : number = 10;

    playerName : string = "Thou";
    
    isCombatInitiated : boolean = false;

    musketFired : boolean = false;

    pistolFired: boolean = false;

    start() {
        //Cleans enemy name
        this.enemyName.replace("  " , " ");
        this.enemyName = "<color=#FF0000>" + this.enemyName + " </color>";
        this.playerName = "<color=#00FFFF>" + this.playerName + " </color>";
    }

    protected onLoad(): void {
        this.health = this.maxHealth
        this.agility = this.maxAgility;
        this.strength = this.maxStrength;
    }

    protected onDisable(): void {
        EventManager.instance.enemyLabel.string = "";
    }

    update(deltaTime: number) {
        this.enemyStatsLimits();

        if (!this.isCombatInitiated){
            if (CommandManager.instance.isCommandEntered){
                switch(CommandManager.instance.command.string){
                    default : EventManager.instance.clearConsole(); CommandManager.instance.clearCommand(); GameManager.instance.println(this.generateOptions()); this.combatSystem(); this.isCombatInitiated = true; break;
                    case '1' : EventManager.instance.clearConsole(); CommandManager.instance.clearCommand(); this.runAway(); break;
                }
            }
        }else{
            this.combatSystem();
        }
    }

    // 0 = attack
    // 1 = heal
    // 2 = use/reload pistol
    // 3 = use/reload musket
    combatSystem () {
        //Enemy health bar
        EventManager.instance.enemyLabel.string = this.enemyName;
        for (let i = 1; i <= this.health; i++){
            EventManager.instance.enemyLabel.string += '#';
        }

        if (CommandManager.instance.isCommandEntered) {
            EventManager.instance.clearConsole();
            if (this.health > 0) {
                switch (CommandManager.instance.command.string) {
                    case '0': this.attack(); break;
                    case '1': this.useBandage(); break;
                    case '2': this.usePistol(); break;
                    case '3': this.useMusket(); break;
                    default: this.attack(); break;
                }
                this.generateEnemyAction();
                GameManager.instance.println(this.generateOptions());
            }else{
                GameManager.instance.println(this.generateOptions());
                switch (CommandManager.instance.command.string) {
                    default: 
                        EventManager.instance.clearConsole(); 
                        CommandManager.instance.clearCommand();
                        EventManager.instance.generateNewEvent(); 
                        break;
                }
            }
            CommandManager.instance.clearCommand();
        }
    }

    runAway () {
        let p = GameManager.instance.getRandomInt(0 , 10);
        if (p <= GameManager.instance.agility){
            EventManager.instance.generateNewEvent();
        }else{
            alert("You failed to run away");
            this.isCombatInitiated = true;
            EventManager.instance.clearConsole();
            CommandManager.instance.clearCommand();
            GameManager.instance.println(this.generateOptions());
            this.combatSystem();
        }
        GameManager.instance.agility -= 2;
    }

    generateEnemyAction(){
        GameManager.instance.println(this.enemyName + "Attacks");
        let p = GameManager.instance.getRandomInt(1 , 10);
        if (p <= GameManager.instance.agility - GameManager.instance.hunger){
            GameManager.instance.println(this.playerName + "dodged the attack");
        }else{
            GameManager.instance.println(this.playerName + "failed to dodged the attack and receive " + (this.strength / 2).toString() + " damage");
            GameManager.instance.health -= this.strength / 2;
        }
        GameManager.instance.agility -= 1;
    }

    attack () {
        let p = GameManager.instance.getRandomInt(1 , 10);
        GameManager.instance.println(this.playerName + "attackest with thy blade");
        if (p <= this.agility){
            GameManager.instance.println(this.enemyName + "dodges thy attack");
        }else{
            this.health -= GameManager.instance.strength - GameManager.instance.hunger;
            GameManager.instance.println(this.playerName + "make " + (GameManager.instance.strength - GameManager.instance.hunger) + " damage");
        }
        GameManager.instance.strength--;
        this.agility--;
    }

    useBandage () {
        if (GameManager.instance.bandages > 0){
            GameManager.instance.bandages--;
            GameManager.instance.health+= 10;
            GameManager.instance.println(this.playerName + " dress thy wounds.");
        }else{
            GameManager.instance.println("Thou reached into thy pockets, but found no bandages remained; thou hadst wasted precious time");
        }
    }

    usePistol () {
        if (GameManager.instance.pistolAmmo > 0){
            if (!this.pistolFired){
                let damage = (GameManager.instance.getRandomInt(2 , 5));
                this.health -= damage;
                this.agility-= damage/2;
                GameManager.instance.pistolAmmo--;
                GameManager.instance.println(this.playerName + " fire thy pistol and make " + damage + " damage");
                this.pistolFired = true;
            }else{
                GameManager.instance.println(this.playerName + " reloaded thy pistol");
                this.pistolFired = false;
            }
        }else{
            GameManager.instance.println("Thou reached into thy pockets, but found no ammo remained; thou hadst wasted precious time");
        }
    }

    useMusket () {
        if (GameManager.instance.musketAmmo > 0){
            if (!this.musketFired){
                GameManager.instance.musketAmmo--;
                let damage = (GameManager.instance.getRandomInt(2 , 10));
                this.health -= damage;
                this.agility-= damage/2;
                GameManager.instance.println(this.playerName + " fire thy musket and make " + damage + " damage");
                this.musketFired = true;
                GameManager.instance.musketAmmo--;
            }else{
                GameManager.instance.println(this.playerName + " reloaded thy musket");
                this.musketFired = false;
            }
        }else{
            GameManager.instance.println("Thou reached into thy pockets, but found no ammo remained; thou hadst wasted precious time");
        }
    }

    generateOptions () {
        let options = "<br />";
        if (this.health <= 0){
            EventManager.instance.clearConsole();
            options += this.enemyName + " hast been defeated <br />";
            options += this.getComponent(LootGeneration).generateLoot() + "<br />";
            options += "<br />";
            options += "0.Continue <br />";
            return options;
        }
        options += "0.Attack with thy blade<br />";
        options += "1.Use bandage (+10 health) <br / >";
        if (this.pistolFired){
            options += "2.Reload pistol <br / >";
        }else{
            options += "2.Fire pistol <br / >"
        }
        if (this.musketFired){
            options += "3.Reload musket <br / >";
        }else{
            options += "3.Fire musket <br / >"
        }
        return options;
    }

    enemyStatsLimits(){
        if (this.agility < 0){
            this.agility = 0;
        }
        if (this.strength < 0){
            this.agility = 0;
        }
    }
}


