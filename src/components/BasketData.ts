import { IBasketData, ICard, TCardBasket } from "../types";
import { IEvents } from "./base/events";

export class BasketData implements IBasketData {
    cards: TCardBasket[] = [];
    total: number;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events
    }

    addCard(card: TCardBasket) {
        const cardInBasket = this.cards.find((item) => item.id === card.id);

        if(!cardInBasket) {
            this.cards = [...this.cards, card]
            this.events.emit('counter:changed');
            this.events.emit('basket:changed')
        } 
    }

    cardInBasket(id:string): boolean {
		return this.cards.some((card) => card.id === id);
	}

    removeCard(id:string) {
        this.cards = this.cards.filter(card => card.id !== id);
        this.events.emit('counter:changed');
        this.events.emit('basket:changed');
    }

    clearBasket() {
        this.cards = []
        this.events.emit('counter:changed');
        this.events.emit('basket:changed')
    }

    getTotal() {
        return this.cards.reduce((a, card) => a + card.price, 0);
    }

    getItemsIds(): string[] {
		return this.cards.map((card) => card.id);
	}

    getCounter() {
        return this.cards.length
    }
}