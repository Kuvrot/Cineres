import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NameManager')
export class NameManager extends Component {
    
    static instance : NameManager;

    cityNames: string [] = ['Corazón' , 'Santa María', 'La santísima trinidad', 'Encarnación' , 'La sagrada revelación', 'Iztacatlán', 'Iknoyotlán', 'Mikistlicán', 'Yolotlicán'];
    cityAdjectives : string[] = [
        'The poverty of this place is tragic' , 
        'People are weak, only a few souls have enough strength to work', 
        'People is malnourished or lies death on the streets',
        'This place have been devastated by corruption and plague',
        'This place have been devastated, just a few souls gather in the streets',
        'People look at you with distrust',
        'People look at you with curiosity',
        'You can smell the misery out of this place'
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
        adjectives += this.cityAdjectives[index1] + "<br />";
        return adjectives;
    }
}


