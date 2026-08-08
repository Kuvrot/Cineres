import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
import { GameManager } from '../../GameManager';
import { SoundManager } from '../../Core/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('StoreEvent')
export class StoreEvent extends Component {

    @property
    generalPrice : number = 1;
    @property
    musketAmmoPrice: number = 2;

    onEnable() {
        let event = this.getComponent(EventComponent);
        for (let i = 0; i < event.options.length - 2; i++){
            event.options[i] += this.generateCostsString(this.generalPrice);
        }
        event.options[3] += this.generateCostsString(this.musketAmmoPrice);
    }
    update(deltaTime: number) {
        if (CommandManager.instance.isCommandEntered){
            switch (CommandManager.instance.command.string){
                case '0': this.buyItem(this.generalPrice , GameManager.instance.bandages); break;
                case '1' : if (!this.validateMoney(this.generalPrice)){break;} GameManager.instance.hunger /= 2; GameManager.instance.reales -= this.generalPrice; SoundManager.instance.playCoinSound(); break;
                case '2': this.buyItem(this.generalPrice , GameManager.instance.pistolAmmo); break;
                case '3': this.buyItem(this.musketAmmoPrice , GameManager.instance.musketAmmo); break;
                default: EventManager.instance.generateNewEvent(); SoundManager.instance.playInventorySound(); break;
            }
            CommandManager.instance.clearCommand();
        }
    }

    buyItem(price: number, item: number) {
        if (!this.validateMoney(price)) { return; } 
        item += 1; 
        GameManager.instance.reales -= price; 
        SoundManager.instance.playCoinSound();
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
            alert('Thou hast not enough reales');
            return false;
        }
        return true;
    }
}


