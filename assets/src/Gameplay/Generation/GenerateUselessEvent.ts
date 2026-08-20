import { _decorator, Component, resources, JsonAsset } from 'cc';
import { GameManager } from '../../GameManager';
import { EventComponent } from '../EventComponent';
const { ccclass } = _decorator;

@ccclass('GenerateUselessEvent')
export class GenerateUselessEvent extends Component {

    start() {

    }

    generateEvent(): string {
        const randomId = GameManager.instance.getRandomInt(1 , 30);
        resources.load('fillEvents', JsonAsset, (err, asset) => {
            if (err) {
                console.error('Error loading events.json:', err);
                return;
            }

            const events = asset.json;

            const event = events.find((event: { id: number }) => event.id === randomId);

            if (event) {
                this.getComponent(EventComponent).prompt = event.description;
            }
        });
        return '';
    }

    update(deltaTime: number) {

    }
}