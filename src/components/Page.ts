import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}

export class Page extends Component<IPage> {
    protected _counter: HTMLElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;
    protected _basket: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container)

        this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this._catalog = ensureElement<HTMLElement>('.gallery', this.container);
        this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container);
        this._basket = ensureElement<HTMLElement>('.header__basket', this.container);

        this._basket.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }
    
    set counter(counter: number) {
        this._counter.textContent = String(counter);
    }

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    }

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('page__wrapper_locked');
        } else {
            this._wrapper.classList.remove('page__wrapper_locked');
        }
    }
}