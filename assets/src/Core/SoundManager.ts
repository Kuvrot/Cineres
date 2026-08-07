import { _decorator, AudioClip, AudioSource, Component, Node, Input, input, EventKeyboard, EditBox } from 'cc';
import { EventManager } from './EventManager';
import { CommandManager } from './CommandManager';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    
    audioSource : AudioSource

    @property(AudioClip)
    keyboardClip : AudioClip;
    @property(AudioClip)
    enterClip : AudioClip;

    @property(EditBox)
    command:EditBox;

    
    start() {
        this.audioSource = this.getComponent(AudioSource);
    }

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.command.node.on(EditBox.EventType.TEXT_CHANGED, this.onTextChanged, this);
    }

    onTextChanged(editBox:EditBox){
        this.audioSource.playOneShot(this.keyboardClip);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        this.audioSource.playOneShot(this.keyboardClip);
    }

    update(deltaTime: number) {

    }

    playEnter () {
        this.audioSource.playOneShot(this.enterClip);
    }
}


