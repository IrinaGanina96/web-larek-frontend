import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected buttonSuccess: HTMLElement;
    protected _total: HTMLElement;

    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this.buttonSuccess = ensureElement<HTMLElement>('.order-success__close', this.container);
        this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

        if (actions?.onClick) {
            this.buttonSuccess.addEventListener('click', actions.onClick);
        }
    }

    set total(total: string) {
        this._total.textContent = `Списано ${total} синапсов`
    }

}