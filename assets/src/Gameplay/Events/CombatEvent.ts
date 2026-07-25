import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../GameManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
import { CommandManager } from '../../Core/CommandManager';
const { ccclass, property } = _decorator;

@ccclass('CombatEvent')
export class CombatEvent extends Component {
    
    @property
    enemyName: string = "";

    //Actions label
    @property
    enemyAttackLabel = "" ;
    @property
    enemyDashLabel = "";
    @property
    enemyBlockLabel = "";

    //Enemy actions
    // 0 = attack
    // 1 = dash
    // 2 = block
    @property
    action : number = 0;

    //EnemyStats
    @property
    health: number = 10;
    @property
    agility: number = 10;
    @property
    stamina: number = 10;
    @property
    strength : number = 10;
    
    //playerStateMachine
    @property
    playerTurn : boolean = false;
    
    @property
    isCombatInitiated : boolean = false;

    musketFired : boolean = false;

    pistolFired: boolean = false;

    start() {
        
    }

    protected onDisable(): void {
        EventManager.instance.enemyLabel.string = "";
    }

    update(deltaTime: number) {
        if (!this.isCombatInitiated){
            if (CommandManager.instance.isCommandEntered){
                switch(CommandManager.instance.command.string){
                    case '0' : EventManager.instance.clearConsole(); this.combatSystem(); this.isCombatInitiated = true; break;
                    case '1' : this.runAway(); break;
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
        EventManager.instance.enemyLabel.string = "<color=#FF0000>" + this.enemyName + " </color>";
        for (let i = 1; i < this.health; i++){
            EventManager.instance.enemyLabel.string += '#';
        }

        if (CommandManager.instance.isCommandEntered){
            EventManager.instance.clearConsole();
            switch (CommandManager.instance.command) {
                case '0' : this.attack(); break;
                case '1' : this.useBandage(); break;
                case '2' : this.usePistol(); break;
                case '3' : this.useMusket(); break;
            }
            this.println(this.generateOptions());
            CommandManager.instance.clearCommand();
        }
    }

    runAway () {
        let p = this.getRandomInt(0 , 10);
        if (p <= GameManager.instance.agility){
            EventManager.instance.generateNewEvent();
        }else{
            alert("You failed to run away");
            GameManager.instance.agility -= 1;
            this.isCombatInitiated = true;
            EventManager.instance.clearConsole();
            this.combatSystem();
        }
    }

    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateEnemyAction(){
        let action = this.getRandomInt(0 , 2);
        this.println("<color=#FF0000>" + this.enemyName + " </color>" + "Attacks");
        let p = this.getRandomInt(0 , 10);
        if (p <= GameManager.instance.agility){
            this.println("<color=#00FFFF>" + "You" + " </color>" + "dodged the attack");
        }else{
            this.println("<color=#00FFFF>" + "You" + " </color>" + "failed to dodged the attack and receive " + (this.strength / 2).toString() + " damage");
            GameManager.instance.health -= this.strength / 2;
        }
        GameManager.instance.agility -= 1;
    }

    attack () {
        let p = this.getRandomInt(0 , 10);
        if (p <= this.agility){
            this.println("<color=#FF0000>" + this.enemyName + " </color>" + "dodges your attack");
        }else{
            this.println("<color=#FF0000>" + this.enemyName + " </color>" + "get's " + (GameManager.instance.strength / 2).toString());
        }
        this.health -= GameManager.instance.strength / 2;
        GameManager.instance.strength--;
        this.agility --;
    }

    useBandage () {
        if (GameManager.instance.bandages > 0){
            GameManager.instance.bandages--;
            GameManager.instance.health+= 10;
            this.println("<color=#00FFFF>" + "You" + " </color>" + "patch yourself");
        }else{
            alert("No bandages available");
        }
    }

    usePistol () {
        if (GameManager.instance.pistolAmmo > 0){
            GameManager.instance.pistolAmmo--;
            this.health -= GameManager.instance.strength;
            this.println("<color=#00FFFF>" + "You" + " </color>" + "make " + (GameManager.instance.strength) + " damage");
        }else{
            alert("No pistol ammo available");
        }
    }

    useMusket () {
        if (GameManager.instance.musketAmmo > 0){
            GameManager.instance.musketAmmo--;
            this.health -= GameManager.instance.strength * 2;
            this.println("<color=#00FFFF>" + "You" + " </color>" + "make " + (GameManager.instance.strength * 2) + " damage");
        }else{
            alert("No musket ammo available");
        }
    }

    generateOptions () {
        let options = "";
        options += "0.attack <br />";
        options += "1.use bandage (+10 health) <br / >";
        if (this.pistolFired){
            options += "2.reload pistol <br / >";
        }else{
            options += "2.shoot pistol <br / >"
        }
        if (this.musketFired){
            options += "2.reload musket <br / >";
        }else{
            options += "2.shoot musket <br / >"
        }
        return options;
    }

    println (text : string) {
        let newString = "<br />"
        newString += text;
       EventManager.instance.consoleText.string += newString;
    }
}


