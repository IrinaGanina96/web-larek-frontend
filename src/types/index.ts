export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    index: string;
}

export interface IUser {
    total: number;
    items: string [];
    payment: string;
    address: string;
    email: string;
    phone: string;
}

export interface ICardsData {
    cards: ICard[];
    preview: string | null;
    getCardPreview(id:string):ICard;
}

export interface IBasketData {
    cards: TCardBasket[];
    total: number;
    addCard(card: ICard):void;
    removeCard(id:string):void;
    clearBasket():void;
    getTotal():number;
    getCounter():number;
    cardInBasket(id:string): boolean;
    getItemsIds(): string[];
}

export interface IUserData {
    formErrorsPay: FormErrorsPay;
    FormErrors: FormErrorsContact;
    setUserPay(payData:TUserPay): void;
    setUserContact(contactData:TUserContact): void;
    getUserData(): void;
    setPayment(value: string):void;
    getPayment(): string;
    setOrderField(field: keyof TUserPay, value: string):void;
    validateUserPay(): boolean;
    setContactField(field: keyof TUserContact, value: string):void;
    validateUserContact(): boolean
}

export type TCardPublic = Pick<ICard, 'title'|'image'|'category'|'price'>;

export type TCardBasket = Pick<ICard, 'id'|'title'|'price'|'index'>;

export type TUserPay = Pick<IUser, 'payment'|'address'>;

export type TUserContact = Pick<IUser, 'email'|'phone'>;

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri:string): Promise<T>;
    post<T>(uri:string, data:object, method?:ApiPostMethods): Promise<T>;
}

export type FormErrorsPay = Partial<Record<keyof TUserPay, string>>;
export type FormErrorsContact = Partial<Record<keyof TUserContact, string>>;