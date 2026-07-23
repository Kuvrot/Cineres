import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CombatEvent')
export class CombatEvent extends Component {
    
    @property
    enemyName: string = "";
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


