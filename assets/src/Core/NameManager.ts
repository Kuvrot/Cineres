import { _decorator, Component, Node } from 'cc';
import { LanguageManager } from './LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('NameManager')
export class NameManager extends Component {
    
    static instance : NameManager;

    cityNames: string [] = ['Corazón' , 'Santa María', 'La santísima trinidad', 'Encarnación' , 'La sagrada revelación', 'Iztacatlán', 'Iknoyotlán', 'Mikistlicán', 'Yolotlicán'];
    cityAdjectives: string[] = [
        'city.label.1',
        'city.label.2',
        'city.label.3',
        'city.label.4',
        'city.label.5',
        'city.label.6',
        'city.label.7',
        'city.label.8'
    ];

    start() {
        NameManager.instance = this;
    }

    update(deltaTime: number) {
        
    }

    generateCityName (){
        if (this.cityNames.length == 0){
            return "Sin nombre";
        }
        
        let index = this.getRandomInt(0 , this.cityNames.length - 1);
        let cityName = this.cityNames[index];
        this.cityNames.splice(index, 1); 
        return cityName;
    }
    
    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateCityAdjectives () {
        let adjectives = "";
        adjectives += "<br />";
        let index1 = this.getRandomInt(0 , this.cityAdjectives.length - 1);
        adjectives += LanguageManager.instance.getLabel(this.cityAdjectives[index1]) + "<br />";
        return adjectives;
    }
}


