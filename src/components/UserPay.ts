import { TUserPay } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./Form";

export class UserPay extends Form<TUserPay> {
    onlineButton: HTMLButtonElement;
    offlineButton: HTMLButtonElement;
    _address: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.onlineButton = this.container.querySelector('.button_alt[name="card"]');
        this.offlineButton = this.container.querySelector('.button_alt[name="cash"]');
        this.onlineButton.classList.add('button_alt-active');

        this.onlineButton.addEventListener('click', () => {
            this.onlineButton.classList.add('button_alt-active');
            this.offlineButton.classList.remove('button_alt-active');
            this.onInputChange('payment', 'card');
        });
        this.offlineButton.addEventListener('click', () => {
            this.offlineButton.classList.add('button_alt-active');
            this.onlineButton.classList.remove('button_alt-active');
            this.onInputChange('payment', 'card');
        });
    }


    set payment(value: string) {
        this.onlineButton.classList.toggle('button_alt-active', value === 'card');
        this.offlineButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address (value:string) {
        (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
    }
}