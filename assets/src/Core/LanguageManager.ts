import { _decorator, Component, resources, JsonAsset, director, sys } from 'cc';
const { ccclass , executionOrder } = _decorator;

@ccclass('LanguageManager')
@executionOrder(-1)
export class LanguageManager extends Component {

    public static instance: LanguageManager;
    language : string;
    private labels;

    protected onLoad(): void {
        LanguageManager.instance = this;
        if (sys.localStorage.getItem("language") !=  null){
            this.language = sys.localStorage.getItem("language");
            this.loadLanguageModule();
        }
    }

    loadLanguageModule() {  
        let languageFile = 'language' + '-' + this.language;
        resources.load(languageFile, JsonAsset, (err, asset) => {
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

    selectLanguage (languageCode : string) {
        LanguageManager.instance.language = languageCode;
        console.log("Language selected : " +  LanguageManager.instance.language);
        this.loadLanguageModule();
        sys.localStorage.setItem("language", languageCode);
        director.loadScene("mainMenu");
    }

    selectEnglish() {
        this.selectLanguage("en");
    }

    selectSpanish() {
        this.selectLanguage("es");
    }

    selectFrench() {
        this.selectLanguage("fr");
    }

    selectGerman() {
        this.selectLanguage("de");
    }
}