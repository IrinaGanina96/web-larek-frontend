export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    selected: boolean;
}

export interface IUser {
    id: string;
    payment: string;
    address: string;
    email: string;
    tel: string;
}

export interface ICardsData {
    cards: ICard[];
    preview: string | null;
    getCardPreview(id:string):ICard;
    setCards(cards: ICard[]):void;
}

export interface IBasket {
    cards: TCardBasket[];
    addCard(id:string):void;
    removeCard(id:string):void;
    clearBasket():void;
    getTotal():number;
    getCounter():number;
}

export interface IUserData {
    setUserPay(payData:TUserPay): void;
    setUserContact(contactData:TUserContact): void;
    getUserData(): IUser;
    checkValidationUserPay(data: Record<keyof TUserPay, string>): boolean;
    checkValidationUserContact(data: Record<keyof TUserContact, string>): boolean;
}

export type TCardPublic = Pick<ICard, 'title'|'image'|'category'|'price'>;

export type TCardBasket = Pick<ICard, 'title'|'price'>;

export type TUserPay = Pick<IUser, 'payment'|'address'>;

export type TUserContact = Pick<IUser, 'email'|'tel'>;



