import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { Basket } from './components/Basket';
import { BasketData } from './components/BasketData';
import { Card } from './components/Card';
import { CardData } from './components/CardData';
import { Modal } from './components/Modal';
import { Page } from './components/Page';
import { UserData } from './components/UserData';
import { UserPay } from './components/UserPay';
import { UserContact } from './components/UserContact';
import './scss/styles.scss';
import { IApi, ICard, IUserData, TUserContact, TUserPay } from './types';
import { API_URL, CDN_URL, settings } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { Success } from './components/Success';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(CDN_URL, baseApi);

const modal = new Modal (document.querySelector('#modal-container'), events);

const cardTemplatePreview: HTMLTemplateElement = document.querySelector('#card-preview');
const cardTemplateCatalog: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardTemplateBasket: HTMLTemplateElement = document.querySelector('#card-basket');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const page = new Page(document.body, events);
const basket = new Basket (cloneTemplate(basketTemplate), events)
const order = new UserPay (cloneTemplate(orderTemplate), events)
const contacts = new UserContact (cloneTemplate(contactTemplate), events)
const success = new Success(cloneTemplate(successTemplate))

const cardsData = new CardData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);

api.getCards()
	.then((cards) => {
		cardsData.cards = cards;
		events.emit('cards:changed');
	})
	.catch((err) => {
		console.error(err);
	});

events.onAll((event) => {
	console.log(event.eventName, event.data)
})

events.on('cards:changed', () => {
	page.catalog = cardsData.cards.map(card => {
		const cardInstant = new Card(cloneTemplate(cardTemplateCatalog), events, {
			onClick:() => events.emit('card:select', card)
		});
		return cardInstant.render({
			image: card.image,
			title: card.title,
			category: card.category,
			price: card.price
		})
	})
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});

events.on('card:select', (card: ICard) => {
	cardsData.setPreview (card);
})

events.on('card:selected', (card: ICard) => {
		const cardPreview = new Card(cloneTemplate(cardTemplatePreview), events, {
			onClick:() => events.emit('card:add', card)
		});
		modal.render({
			content: cardPreview.render ({
				image: card.image,
				title: card.title,
				category: card.category,
				price: card.price,
				description: card.description
			}),
		});

		if (basketData.cardInBasket(card.id)) {
			cardPreview.setDisabledButton();
		}
})

events.on('card:add', (card: ICard) => {
	basketData.addCard(card);
	modal.close();
})

events.on('basket:changed', () => {
	basket.cards = basketData.cards.map((card, index) => {
		const cardInstant = new Card(cloneTemplate(cardTemplateBasket), events, {
			onClick:() => events.emit('card:remove', card)
		});
		cardInstant.index += index;
		return cardInstant.render({
			index: String(index+1),
			title: card.title,
			price: card.price,
		});
	})
	basket.total = basketData.getTotal();
})

events.on('counter:changed', () => {
	page.counter = basketData.getCounter();
  })

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
})

events.on('card:remove', (card: ICard) => {
	basketData.removeCard(card.id);
})

events.on('userPay:open', () => {
	modal.render({
		content: order.render ({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		})
	})
})

events.on('order.pay:input', (data: { field: string; value: string }) => {
	userData.setPayment(data.value);
});

events.on('pay:changed', () => {
	order.payment = userData.getPayment();
});

events.on(/^order\..*:input/, (data: { field: keyof TUserPay, value: string }) => {
    userData.setOrderField(data.field, data.value);
});

events.on('order:ready' , () => {
	order.valid = true;
})

events.on('formErrors:change', (errors: Partial<TUserPay>) => {
    const { payment, address } = errors;
    order.valid = !payment && !address;
    order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render ({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		})
	})
})

events.on(/^contacts\..*:input/, (data: { field: keyof TUserContact, value: string }) => {
    userData.setContactField(data.field, data.value);
});

events.on('contacts:ready' , () => {
	contacts.valid = true;
})

events.on('formErrors:change', (errors: Partial<TUserContact>) => {
    const { email, phone} = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

events.on('contacts:submit', () => {
	const orderData = {
			...userData.getUserData(),
			total: basketData.getTotal(),		
			items: basketData.getItemsIds()
		}
	console.log(orderData)
	api.orderLots(orderData)
        .then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
			onClick: () => {
				modal.close();
				basketData.clearBasket();
				events.emit('success:submit');
			}
		});
		success.total = String(result.total);

        modal.render({
            content: success.render({
			})
        });
	})
		.catch(error => {
			console.error(error);
		});
})