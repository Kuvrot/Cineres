import { _decorator, Component, EventMouse, ImageAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CursorManager')
export class CursorManager extends Component {

    @property(ImageAsset) 
    private cursorImage: ImageAsset = null;

    private _styleElement: HTMLStyleElement | null = null;

    onEnable() {
        this.lockCursor();
    }

    onDisable() {
        // Limpiar el estilo si se desactiva el componente
        if (this._styleElement) {
            this._styleElement.remove();
            this._styleElement = null;
        }
    }

    private lockCursor() {
        if (!this.cursorImage) return;

        // 1. Remover estilo previo si existe para evitar duplicados
        if (this._styleElement) this._styleElement.remove();

        // 2. Crear una etiqueta <style> dinámica
        this._styleElement = document.createElement('style');
        
        // 3. Forzar el cursor en TODOS los elementos (*) con !important
        // Esto incluye canvas, contenedores, botones e inputs
        this._styleElement.innerHTML = `
            * {
                cursor: url("${this.cursorImage.nativeUrl}") 0 0, auto !important;
            }
        `;

        // 4. Inyectarlo al DOM para que tenga la máxima prioridad
        document.head.appendChild(this._styleElement);
    }
}


