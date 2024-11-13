import { ICard, ICardsData } from "../types";
import { IEvents } from "./base/events";

export class CardData implements ICardsData {
    protected _cards: ICard[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events
    }
   
    set cards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed')
    }

    get cards(): ICard[] {
        return this._cards;
    }

    getCardPreview(id: string): ICard {
        return this._cards.find((card) => card.id === id);
    }

    setPreview(card: ICard) {
            this._preview = card.id;
            this.events.emit('card:selected', card)
    }

    get preview() {
        return this._preview;
    }
}