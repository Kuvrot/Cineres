import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    
    @property
    progress: number  = 0;

    //Stats
    @property
    health: number = 100;

    @property
    strength: number = 10;

    @property
    skill: number = 10;

    @property
    gunSkill: number = 10;

    @property
    agility: number = 10;

    //Inventory
    @property
    bandages: number = 1;

    @property
    pistolAmmo: number = 0;

    @property
    musketAmmo: number = 0;
    
    static instance : GameManager;

    start() {
        GameManager.instance = this;
    }

    update(deltaTime: number) {
        
    }
}


