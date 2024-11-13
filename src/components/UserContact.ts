import { TUserContact } from "../types";
import { IEvents } from "./base/events";
import { Form } from "./Form";

export class UserContact extends Form<TUserContact> {
    _email: HTMLElement;
    _phone: HTMLElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email (value:string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
 
    set phone (value:string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

}
