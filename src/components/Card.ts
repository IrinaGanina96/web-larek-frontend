import { ICard } from "../types";
import { categoryColor } from "../utils/constants";
import { IEvents } from "./base/events";
import { Component } from "./base/Component";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
    protected events: IEvents;
    protected cardId: string;
    protected cardTitle: HTMLElement;
    protected cardImage?: HTMLImageElement;
    protected cardDescription?: HTMLElement;
    protected cardPrice: HTMLElement;
    protected cardCategory?: HTMLElement;
    protected cardButtonAdd?: HTMLButtonElement;
    protected cardIndex?: HTMLElement;
   
    constructor(protected container: HTMLElement, events: IEvents, actions?: ICardActions) {
        super(container);
        this.events = events;

        this.cardTitle = this.container.querySelector('.card__title');
        this.cardImage = this.container.querySelector('.card__image');
        this.cardDescription = this.container.querySelector('.card__text');
        this.cardPrice = this.container.querySelector('.card__price');
        this.cardCategory = this.container.querySelector('.card__category');
        this.cardButtonAdd = this.container.querySelector('.card__button');
        this.cardIndex = this.container.querySelector('.basket__item-index');

        if (actions?.onClick) {
            if (this.cardButtonAdd) {
                this.cardButtonAdd.addEventListener('click', actions.onClick);
            } else {
                this.container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id (id: string) {
        this.cardId = id
    }

    get id() {
        return this.cardId;
    }

    set title (title: string) {
        this.cardTitle.textContent = title;
    }

    protected setImage (src:string, alt?:string) {
        this.cardImage.src = src;
        this.cardImage.alt = alt;
    }

    set image (image:string) {
        this.setImage(image, this.title)
    }

    set description (description:string) {
        this.cardDescription.textContent = description;
    }

    set price (price: number) { 
        if (price <=0) {
            this.cardPrice.textContent = 'Бесценно'
            this.cardButtonAdd?.setAttribute('disabled', 'disabled')
        } else {
            this.cardPrice.textContent = `${price} синапсов`;
            this.cardButtonAdd?.removeAttribute('disabled')
        }
    }

    set category (category: string) {
        this.cardCategory.textContent = category;
        this.cardCategory.classList.add(categoryColor[category])
    }

    set button(button: string) {
        this.cardButtonAdd.textContent = button;
    }

    set index(index:number) {
        this.cardIndex.textContent = String(index);
    }

    setDisabledButton() {
		this.cardButtonAdd.setAttribute('disabled', 'disabled');
        this.cardButtonAdd.textContent = 'Уже в корзине';
	}
}