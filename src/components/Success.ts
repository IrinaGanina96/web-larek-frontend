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

        this.buttonSuccess = this.container.querySelector('.order-success__close');
        this._total = this.container.querySelector('.order-success__description');

        if (actions?.onClick) {
            this.buttonSuccess.addEventListener('click', actions.onClick);
        }
    }

    set total(total: string) {
        this._total.textContent = `Списано ${total} синапсов`
    }

}