import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../GameManager';
import { EventManager } from '../../Core/EventManager';
import { CommandManager } from '../../Core/CommandManager';
import { LootGeneration } from '../Generation/LootGeneration';
import { SoundManager } from '../../Core/SoundManager';
import { StatsManager } from '../../Core/StatsManager';
import { LanguageManager } from '../../Core/LanguageManager';
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
    
    enemyHealth : number = 10;
    enemyAgility: number = 10;
    enemyStrength : number = 10;

    playerName : string = "player.name";
    
    isCombatInitiated : boolean = false;

    musketFired : boolean = false;

    pistolFired: boolean = false;

    start() {
        this.playerName = LanguageManager.instance.getLabel(this.playerName.trim());
        
        //Cleans enemy name
        this.enemyName = LanguageManager.instance.getLabel(this.enemyName.trim());
        this.enemyName.replace("  " , " ");

        this.enemyName = "<color=#FF0000>" + this.enemyName + " </color>";
        this.playerName = "<color=#00FFFF>" + this.playerName + " </color>";
    }

    protected onEnable(): void {
        this.enemyHealth = this.maxHealth
        this.enemyAgility = this.maxAgility;
        this.enemyStrength = this.maxStrength;
        this.musketFired = false;
        this.pistolFired = false;
        if (GameManager.instance.health + StatsManager.instance.healingAmount <= 20 && GameManager.instance.bandages > 0) {
            GameManager.instance.bandages--;
            GameManager.instance.health += StatsManager.instance.healingAmount;
        }
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
        for (let i = 1; i <= this.enemyHealth; i++){
            EventManager.instance.enemyLabel.string += '#';
        }

        if (CommandManager.instance.isCommandEntered) {
            EventManager.instance.clearConsole();
            if (this.enemyHealth > 0) {
                switch (CommandManager.instance.command.string) {
                    case '0': this.attack(); break;
                    case '1': this.useBandage(); break;
                    case '2': this.usePistol(); break;
                    case '3': this.useMusket(); break;
                    default: this.attack(); break;
                }
                if (this.enemyHealth > 0){
                    this.generateEnemyAction();
                }
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
        GameManager.instance.println(this.enemyName + " " + LanguageManager.instance.getLabel("enemy.attack"));
        let p = GameManager.instance.getRandomInt(1 , 10);
        if (p <= GameManager.instance.agility - GameManager.instance.hunger){
            GameManager.instance.println(this.playerName + LanguageManager.instance.getLabel("dodge.label"));
        }else{
            GameManager.instance.println(this.playerName + LanguageManager.instance.getLabel("dodge.failed.label") + (this.enemyStrength / 2).toString() + " " + LanguageManager.instance.getLabel("damage"));
            GameManager.instance.health -= this.enemyStrength / 2;
        }
        GameManager.instance.agility -= 1;
    }

    attack () {
        let p = GameManager.instance.getRandomInt(1 , 10);
        GameManager.instance.println(this.playerName + LanguageManager.instance.getLabel("player.attack"));
        if (p <= this.enemyAgility){
            GameManager.instance.println(this.enemyName + LanguageManager.instance.getLabel("dodge.label"));
        }else{
            let damage = GameManager.instance.strength - GameManager.instance.hunger;
            if (damage < 1){
                damage = 1;
            }
            this.enemyHealth -= damage;
            GameManager.instance.println(this.playerName + "make " + (GameManager.instance.strength - GameManager.instance.hunger) + " " + LanguageManager.instance.getLabel("damage"));
        }
        GameManager.instance.strength--;
        this.enemyAgility--;
        SoundManager.instance.playSwingSound();
    }

    useBandage () {
        if (GameManager.instance.bandages > 0){
            GameManager.instance.bandages--;
            GameManager.instance.health+= StatsManager.instance.healingAmount;
            GameManager.instance.println(this.playerName + " " + LanguageManager.instance.getLabel("player.heal"));
            SoundManager.instance.playPageSound();
        }else{
            GameManager.instance.println(LanguageManager.instance.getLabel("bandages.not.found"));
        }
    }

    usePistol () {
        if (GameManager.instance.pistolAmmo > 0){
            if (!this.pistolFired){
                let damage = (GameManager.instance.getRandomInt(2 , 5));
                this.enemyHealth -= damage;
                this.enemyAgility-= damage/2;
                GameManager.instance.pistolAmmo--;
                GameManager.instance.println(this.playerName + " " + LanguageManager.instance.getLabel("player.pistol.fire") + " " + damage + " " + LanguageManager.instance.getLabel("damage"));
                this.pistolFired = true;
                SoundManager.instance.playShotSound();
            }else{
                GameManager.instance.println(this.playerName + " " + LanguageManager.instance.getLabel("player.pistol.reload"));
                this.pistolFired = false;
                SoundManager.instance.playReloadSound();
            }
        }else{
            GameManager.instance.println(LanguageManager.instance.getLabel("player.ammo.not.found"));
        }
    }

    useMusket () {
        if (GameManager.instance.musketAmmo > 0){
            if (!this.musketFired){
                GameManager.instance.musketAmmo--;
                let damage = (GameManager.instance.getRandomInt(2 , 10));
                this.enemyHealth -= damage;
                this.enemyAgility-= damage/2;
                GameManager.instance.println(this.playerName + " " + LanguageManager.instance.getLabel("player.musket.fire") + " " + damage + " " + LanguageManager.instance.getLabel("damage"));
                this.musketFired = true;
                GameManager.instance.musketAmmo--;
                SoundManager.instance.playShotSound();
            }else{
                GameManager.instance.println(this.playerName + " " + LanguageManager.instance.getLabel("player.musket.reload"));
                this.musketFired = false;
                SoundManager.instance.playReloadSound();
            }
        }else{
            GameManager.instance.println(LanguageManager.instance.getLabel("player.ammo.not.found"));
        }
    }

    generateOptions () {
        let options = "<br />";
        if (this.enemyHealth <= 0){
            EventManager.instance.clearConsole();
            options += this.enemyName + " " + LanguageManager.instance.getLabel("enemy.defeated") + " <br />";
            options += this.getComponent(LootGeneration).generateLoot() + "<br />";
            options += "<br />";
            options += "0." + LanguageManager.instance.getLabel("continue.label") + "<br />";
            return options;
        }

        options += "0." + LanguageManager.instance.getLabel("combat.attack.label") + "<br />";
        options += "1." + LanguageManager.instance.getLabel("combat.bandage.label") + " <br />";
        if (this.pistolFired) {
            options += "2." + LanguageManager.instance.getLabel("combat.reloadPistol.label") + " <br />";
        } else {
            options += "2." + LanguageManager.instance.getLabel("combat.firePistol.label") + " <br />";
        }

        if (this.musketFired) {
            options += "3." + LanguageManager.instance.getLabel("combat.reloadMusket.label") + " <br />";
        } else {
            options += "3." + LanguageManager.instance.getLabel("combat.fireMusket.label") + " <br />";
        }

        return options;
    }

    enemyStatsLimits(){
        if (this.enemyAgility < 0){
            this.enemyAgility = 0;
        }
        if (this.enemyStrength < 0){
            this.enemyAgility = 0;
        }
    }
}


