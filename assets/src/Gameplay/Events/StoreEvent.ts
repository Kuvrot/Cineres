import { _decorator, Component, Node } from 'cc';
import { CommandManager } from '../../Core/CommandManager';
import { EventManager } from '../../Core/EventManager';
import { EventComponent } from '../EventComponent';
import { GameManager } from '../../GameManager';
import { SoundManager } from '../../Core/SoundManager';
import { LanguageManager } from '../../Core/LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('StoreEvent')
export class StoreEvent extends Component {

    @property
    generalPrice : number = 1;
    @property
    musketAmmoPrice: number = 2;

    onLoad() {
        let event = this.getComponent(EventComponent);
        for (let i = 0; i < event.options.length - 2; i++){
            event.options[i] += this.generateCostsString(this.generalPrice);
        }
        event.options[3] += this.generateCostsString(this.musketAmmoPrice);
    }
    update(deltaTime: number) {
        if (CommandManager.instance.isCommandEntered){
            switch (CommandManager.instance.command.string){
                case '0': this.buyItem(this.generalPrice, () => GameManager.instance.bandages++); break;
                case '1' : if (!this.validateMoney(this.generalPrice)){break;} GameManager.instance.hunger /= 2; GameManager.instance.reales -= this.generalPrice; SoundManager.instance.playCoinSound(); break;
                case '2': this.buyItem(this.generalPrice , () => GameManager.instance.pistolAmmo++); break;
                case '3': this.buyItem(this.musketAmmoPrice , () => GameManager.instance.musketAmmo++); break;
                default: EventManager.instance.generateNewEvent(); SoundManager.instance.playInventorySound(); break;
            }
            CommandManager.instance.clearCommand();
        }
    }

    buyItem(price: number, addItem: () => void, quantity : number = 1) {
        if (!this.validateMoney(price)) { return; }

        for (let i = 0; i <= quantity; i++){
            addItem();
        }

        GameManager.instance.reales -= price;
        SoundManager.instance.playCoinSound();
    }

    generateCostsString (price: number) {
        let str = "(-";
        str += price;
        str += " " + LanguageManager.instance.getLabel("reales.label");
        str += ')';
        return str;
    }

    validateMoney (price: number) {
        if (GameManager.instance.reales < price){
            alert(LanguageManager.instance.getLabel("not.reales"));
            return false;
        }
        return true;
    }
}


