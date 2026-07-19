import { _decorator, Component, Node } from 'cc';
import { NameManager } from '../../Core/NameManager';
const { ccclass, property } = _decorator;

@ccclass('CityNameGenerator')
export class CityNameGenerator extends Component {
    
    @property
    header : string = "You have arrived to a town called "

    cityName: string = "";

    cityAdjectives: string = "";

    onEnable() {
    }

    update(deltaTime: number) {
        
    }

    generateCityName (prompt: string){
        let previousPrompt = prompt;
        let cityName = NameManager.instance.generateCityName();
        let newPrompt = this.header += " " + "<color=#00FFFF>" + cityName + "</color> ";
        newPrompt += '<br /> <br />';
        newPrompt += previousPrompt;
        newPrompt += '<br /> <br />';
        newPrompt += '<br />' + NameManager.instance.generateCityAdjectives();
        return newPrompt;
    }
    
    getCityName () {
        return this.cityName;
    }
}


