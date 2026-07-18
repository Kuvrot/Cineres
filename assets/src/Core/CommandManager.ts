import { _decorator, Component, EditBox, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommandManager')
export class CommandManager extends Component {
    
    @property(EditBox)
    command : EditBox;
    
    static instance;

    start() {
        CommandManager.instance = this;
    }

    update(deltaTime: number) {
        
    }

    enter () {
        this.command.string = "";
    }
}


