import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StatsManager')
export class StatsManager extends Component {
    
    static instance: StatsManager;
    
    @property
    healingAmount : number = 10;

    start() {
        StatsManager.instance = this;
    }

    update(deltaTime: number) {
        
    }
}


