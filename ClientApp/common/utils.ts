import { Control, NumberOptional, RadioOptional, DateTimeOptional, RatingOptional, FileAnswerModel } from "./interfaces";
import * as moment from "moment";
import * as EmailValidator from 'email-validator';
import * as urlRegex from 'url-regex';

// generateId ----------------------------------------------- //
export function generateId(ids?: string[]) {
	let id = `${Math.round(1000000 * Math.random())}`;
	while (ids && ids.indexOf(id) !== -1) {
		id = `${Math.round(1000000 * Math.random())}`;
	}
	return id;
}
// --------------------------------------------------------- //

// safeFetch ----------------------------------------------- //
const checkStatus = (res: Response) => {
	if (res.status >= 200 && res.status < 300) return Promise.resolve(res);
	else return Promise.reject({ message: res.statusText, status: res.status });
}

const errorCatch = (error) => {
	if (error.status === 401) {
		// window.location.replace(window.location.origin + '/logout');
		// return null;
	}
	else return { error };
}

export const safeFetch = (url: RequestInfo, init: RequestInit = null) =>
	(init != null && fetch(url, init) || fetch(url))
		.then(checkStatus)
		.then(result => result.json())
		.then(result => ({ result }))
		.catch(error => errorCatch(error));

export const defaultHeaders = new Headers({ "Content-type": "application/json", "Accept": "application/json" });
// --------------------------------------------------------- //

// getDefaultValue ----------------------------------------- //

export function getDefaultValue(c: Control) {
	switch (c.type) {
		case 'number': return (c.optional as NumberOptional).min;
		case 'rating': return (parseInt((c.optional as RatingOptional).score) / 2);
		case 'radio': return (c.optional as RadioOptional).items[0].value;
		case 'date-time': return moment().format(DateTimeFormat[(c.optional as DateTimeOptional).type]);

		default: return '';
	}
}

export const DateTimeFormat = {
	'dateTime': 'YYYY-MM-DD HH:mm',
	'date': 'YYYY-MM-DD',
	'time': 'HH:mm',
}

// --------------------------------------------------------- //

// validateControlAnswer ----------------------------------- //
const phone = /^1[3-9](\d{9})$/;

export function validateControlAnswer(c: Control) {
	if (c.required && (c.answer === '' || c.answer == undefined || c.answer === null)) return 'required';

	switch (c.type) {
		case 'email': return EmailValidator.validate(c.answer as string) ? '' : 'invalidEmail';
		case 'website': return urlRegex({ strict: false }).test(c.answer as string) ? '' : 'invalidUrl';
		case 'phone': return phone.test(c.answer as string) ? '' : 'invalidPhone';
		case 'file': return ((JSON.parse(c.answer as string)) as FileAnswerModel[]).length > 0 ? '' : 'required';

		default: return '';
	}
}
// --------------------------------------------------------- //