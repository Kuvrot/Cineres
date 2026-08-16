import { _decorator, Component, Node, game, director, RichText} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuManager')
export class MainMenuManager extends Component {

    @property
    application : string = "cineres";

    @property
    version : string = "1.0";

    @property(RichText)
    versionLabel : RichText;

    start() {
        if (this.versionLabel != null){
            this.versionLabel.string = this.application + " v" + this.version;
        }
    }

    update(deltaTime: number) {

    }
    
    loadGame() {
        director.loadScene("game");
    }

    loadMainMenu (){
        director.loadScene("mainMenu");
    }

    // Exit the game
    exitApplication() {
        game.end();
    }
}


