import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
import { GameManager } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('StoreEvent')
export class StoreEvent extends Component {

    @property
    generalPrice : number = 1;
    @property
    musketAmmoPrice: number = 2;

    start() {
        let event = this.getComponent(EventComponent);
        for (let i = 0; i < event.options.length - 2; i++){
            event.options[i] += this.generateCostsString(this.generalPrice);
        }
        event.options[3] += this.generateCostsString(this.musketAmmoPrice);
    }
    update(deltaTime: number) {
        if (CommandManager.instance.isCommandEntered){
            switch (CommandManager.instance.command.string){
                case '0': if (!this.validateMoney(this.generalPrice)){break;} GameManager.instance.bandages += 1; GameManager.instance.reales -= this.generalPrice; break;
                case '1' : if (!this.validateMoney(this.generalPrice)){break;} GameManager.instance.hunger /= 2; GameManager.instance.reales -= this.generalPrice; break;
                case '2': if (!this.validateMoney(this.generalPrice)){break;} GameManager.instance.pistolAmmo += 1; GameManager.instance.reales -= this.generalPrice; break;
                case '3': if (!this.validateMoney(this.musketAmmoPrice)){break;} GameManager.instance.musketAmmo += 1; GameManager.instance.reales -= this.musketAmmoPrice; break;
                default: EventManager.instance.generateNewEvent(); break;
            }
            CommandManager.instance.clearCommand();
        }
    }

    generateCostsString (price: number) {
        let str = "(-";
        str += price;
        str += " Reales";
        str += ')';
        return str;
    }

    validateMoney (price: number) {
        if (GameManager.instance.reales < price){
            alert('Not enough money');
            return false;
        }
        return true;
    }
}


