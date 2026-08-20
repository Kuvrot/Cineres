import { _decorator, Component, LabelComponent, Node, RichText } from 'cc';
import { LanguageManager } from './LanguageManager';
const { ccclass, property } = _decorator;

@ccclass('TranslateLabels')
export class TranslateLabels extends Component {
    
    richText : RichText;
    label : LabelComponent;
    
    start() {
    }

    update(deltaTime: number) {
        if (this.getComponent(RichText)) {
            this.richText = this.getComponent(RichText);
            this.richText.string = LanguageManager.instance.getLabel(this.richText.string);
        }
        if (this.getComponent(LabelComponent)) {
            this.label = this.getComponent(LabelComponent);
            this.label.string = LanguageManager.instance.getLabel(this.label.string);
        } 
    }
}
