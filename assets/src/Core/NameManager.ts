import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NameManager')
export class NameManager extends Component {
    
    static instance : NameManager;

    names: string [] = ['Corazón' , 'Santa María', 'La santísima trinidad', 'Encarnación' , 'La sagrada revelación', 'Iztacatlán', 'Iknoyotlán', 'Mikistlicán', 'Yolotlicán'];
    
    start() {
        NameManager.instance = this;
    }

    update(deltaTime: number) {
        
    }

    generateCityName (){
        if (this.names.length == 0){
            return "Sin nombre";
        }
        
        let index = this.getRandomInt(0 , this.names.length - 1);
        let cityName = this.names[index];
        this.names.splice(index, 1); 
        return cityName;
    }
    
    getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}


