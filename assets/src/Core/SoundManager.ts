import { _decorator, AudioClip, AudioSource, Component, Node, Input, input, EventKeyboard, EditBox } from 'cc';
import { EventManager } from './EventManager';
import { CommandManager } from './CommandManager';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    
    static instance: SoundManager;

    audioSource : AudioSource

    @property(AudioClip)
    keyboardClip : AudioClip;
    @property(AudioClip)
    enterClip : AudioClip;
    @property(AudioClip)
    shotClip : AudioClip;

    @property(AudioClip)
    coinClip : AudioClip;

    @property(AudioClip)
    pageClip : AudioClip;

    @property(AudioClip)
    attackClip : AudioClip;

    @property(AudioClip)
    inventoryClip : AudioClip;

    @property(AudioClip)
    swingClip : AudioClip;

    @property(EditBox)
    command:EditBox;

    
    start() {
        SoundManager.instance = this;
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

    playShotSound () {
        if (this.shotClip == null){
            return;
        }
        this.audioSource.playOneShot(this.shotClip);
    }

    playCoinSound () {
        if (this.coinClip == null){
            return;
        }
        this.audioSource.playOneShot(this.coinClip);
    }

    playPageSound () {
        if (this.pageClip == null){
            return;
        }
        this.audioSource.playOneShot(this.pageClip);
    }

    playInventorySound(){
        if (this.inventoryClip == null){
            return;
        }
        this.audioSource.playOneShot(this.inventoryClip);
    }
    playSwingSound(){
        if (this.swingClip == null){
            return;
        }
        this.audioSource.playOneShot(this.swingClip);
    }
}


