import { FormErrorsContact, FormErrorsPay, IUserData, TUserContact, TUserPay } from "../types"
import { IEvents } from "./base/events";

export class UserData implements IUserData {
    protected payment: string;
    protected address: string;
    protected email: string;
    protected phone: string;
    protected events: IEvents;
    formErrorsPay: FormErrorsPay = {}
    FormErrors: FormErrorsContact = {};

    constructor(events: IEvents) { 
        this.events = events
    }

    setUserPay(payData:TUserPay){
        this.payment = payData.payment;
        this.address = payData.address;
    }
    
    setUserContact(contactData:TUserContact) {
        this.email = contactData.email;
        this.phone = contactData.phone;
    }

    setPayment(value: string) {
		this.payment = value;
        this.events.emit('pay:changed');
	}

    getPayment(): string {
        return this.payment;
    }

    getUserData() {
        return {
            payment: this.payment, 
            address: this.address, 
            email: this. email, 
            phone: this.phone,
        }
    }

    setOrderField(field: keyof TUserPay, value: string) {
        this[field] = value;
        if (this.validateUserPay()) {
            this.events.emit('order:ready', this);
        } 
    }

    validateUserPay(){
        const errors: typeof this.formErrorsPay = {};
        if (!this.address) {        
            errors.address = "Необходимо указать адрес"      
        }
        if (!this.payment) {
            errors.payment = "Необходимо выбрать способ оплаты";
        }
        this.formErrorsPay = errors;  
        this.events.emit('formErrors:change', this.formErrorsPay);          
        return Object.keys(errors).length === 0;
    }

    setContactField(field: keyof TUserContact, value: string) {
        this[field] = value;
        if (this.validateUserContact()) {
            this.events.emit('contacts:ready', this);
        } 
    }

    validateUserContact(){
        const errors: typeof this.FormErrors = {};
        if (!this.email) {        
            errors.email = "Необходимо указать e-mail"      
        }
        if (!this.phone) {        
            errors.phone = "Необходимо указать телефон"      
        }
        this.FormErrors = errors;  
        this.events.emit('formErrors:change', this.FormErrors);          
        return Object.keys(errors).length === 0;
      }
}