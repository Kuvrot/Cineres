import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../../GameManager';
import { LanguageManager } from '../../Core/LanguageManager';
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

            newString += LanguageManager.instance
                .getLabel("loot.reales.label")
                .replace("{0}", reales.toString())
                .replace("{1}", reales > 1 ? "es" : "");
        }

        if (bandages > 0 && this.bandages) {
            GameManager.instance.bandages += bandages;

            newString += LanguageManager.instance
                .getLabel("loot.bandages.label")
                .replace("{0}", bandages.toString())
                .replace("{1}", bandages > 1 ? "s" : "");
        }

        if (pistolAmmo > 0 && this.pistolAmmo) {
            GameManager.instance.pistolAmmo += pistolAmmo;

            newString += LanguageManager.instance
                .getLabel("loot.pistolAmmo.label")
                .replace("{0}", pistolAmmo.toString())
                .replace("{1}", pistolAmmo > 1 ? "s" : "");
        }

        if (musketAmmo > 0 && this.musketAmmo) {
            GameManager.instance.musketAmmo += musketAmmo;

            newString += LanguageManager.instance
                .getLabel("loot.musketAmmo.label")
                .replace("{0}", musketAmmo.toString())
                .replace("{1}", musketAmmo > 1 ? "s" : "");
        }

        if (newString == "") {
            newString = LanguageManager.instance
                .getLabel("loot.nothing.label");
        }

        return newString;
    }
}


