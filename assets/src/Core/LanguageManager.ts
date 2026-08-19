import { _decorator, Component, resources, JsonAsset } from 'cc';
const { ccclass , executionOrder } = _decorator;

@ccclass('LanguageManager')
@executionOrder(-1)
export class LanguageManager extends Component {

    public static instance: LanguageManager;

    private labels;

    onLoad() {
        LanguageManager.instance = this;

        resources.load('language', JsonAsset, (err, asset) => {
            if (err) {
                console.error('Error loading language.json:', err);
                return;
            }

            this.labels = asset.json;

            console.log('Language module loaded');
        });
    }

    getLabel(labelCode: string): string {
        labelCode = labelCode.trim();

        const label = this.labels.find(
            (label: { code: string }) => label.code === labelCode
        );

        if (label) {
            return label.label;
        }

        console.warn("Label not found:", labelCode);
        return labelCode;
    }
}