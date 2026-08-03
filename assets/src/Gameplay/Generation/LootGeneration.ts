import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../GameManager';
const { ccclass, property } = _decorator;

@ccclass('LootGeneration')
export class LootGeneration extends Component {

    @property
    reales = false;

    @property
    bandages = false;

    @property
    pistolAmmo = false;

    @property
    musketAmmo = false;

    start() {

    }

    update(deltaTime: number) {

    }

    generateLoot() {

        let newString = "";
        let reales = GameManager.instance.getRandomInt(0, 2);
        let bandages = GameManager.instance.getRandomInt(0, 2);
        let pistolAmmo = GameManager.instance.getRandomInt(0, 2);
        let musketAmmo = GameManager.instance.getRandomInt(0, 2);

        if (reales > 0 && this.reales) {
            GameManager.instance.reales += reales;
            newString += `<br />Thou hast looted ${reales} real${reales > 1 ? "es" : ""}.`;
        }

        if (bandages > 0 && this.bandages) {
            GameManager.instance.bandages += bandages;
            newString += `<br />Thou hast looted ${bandages} bandage${bandages > 1 ? "s" : ""}.`;
        }

        if (pistolAmmo > 0 && this.pistolAmmo) {
            GameManager.instance.pistolAmmo += pistolAmmo;
            newString += `<br />Thou hast looted ${pistolAmmo} pistol round${pistolAmmo > 1 ? "s" : ""}.`;
        }

        if (musketAmmo > 0 && this.musketAmmo) {
            GameManager.instance.musketAmmo += musketAmmo;
            newString += `<br />Thou hast looted ${musketAmmo} musket ball${musketAmmo > 1 ? "s" : ""}.`;
        }

        if (newString == "") {
            newString = "<br />Thou hast found nothing of worth.";
        }

        return newString;
    }
}


