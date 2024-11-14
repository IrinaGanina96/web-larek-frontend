import { IBasketData } from "../types";
import { createElement, ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Basket extends Component<IBasketData> {
    protected _cards: HTMLElement;
    protected _total: HTMLElement;
    protected _buttonBasket?: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container)

        this._cards = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__price', this.container);
        this._buttonBasket = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this._buttonBasket?.addEventListener('click', () => {
            this.events.emit('userPay:open');
        });

        this.cards = [];
    }

    set cards(cards: HTMLElement[]) {
        if (cards.length) {
            this._cards.replaceChildren(...cards);
            this._buttonBasket.disabled = false;
        } else {
            this._cards.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
            this._buttonBasket.disabled = true; 
        }
    }

    set total(total: number) {
        this._total.textContent = `${total} синапсов`;
    }
}