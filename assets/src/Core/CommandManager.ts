import { _decorator, Component, EditBox, Node} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CommandManager')
export class CommandManager extends Component {
    
    @property(EditBox)
    command : EditBox;

    @property
    isCommandEntered : boolean = false;

    static instance;

    start() {
        CommandManager.instance = this;
    }

    update(deltaTime: number) {
    }
    enter () {
        this.command.string.trim();
        if (this.command.string == ''){
           this.command.string = '0'; 
        }
        this.isCommandEntered = true;
    }
    clearCommand(){
        this.command.string = '';
        this.isCommandEntered = false;
    }
}


