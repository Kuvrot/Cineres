import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuComponent')
export class MainMenuComponent extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    disable () {
        this.node.active = false;
    }

    enable () {
        this.node.active = true;    
    }
}


