import { delay } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { defaultHeaders, safeFetch, getDefaultValue } from '../../common/utils';
import { actionCreators, appSagaTypes } from './actions';
import { Control, NumberOptional, RadioOptional } from '../../common/interfaces';
import { AppState, WebHookData } from './interfaces';

export function* init() {
	yield put(actionCreators.setBusy(true));

	let controls: Control[] = [];
	let { result } = yield safeFetch(`/api/v1/form/${window.App.formId}`, {
		credentials: 'include',
		method: 'GET',
		headers: defaultHeaders,
	});
	if (result) {
		controls = result.fields.map(f => {
			let detail = JSON.parse(f.detail);
			return {
				id: f.fieldId,
				type: f.type,
				question: detail.question,
				description: detail.description,
				required: detail.required,
				optional: detail.optional,
				answer: '',
			};
		});
		yield put(actionCreators.setFormName(result.name));
		yield put(actionCreators.setFormDescription(result.description));
		yield put(actionCreators.setFormHeader(JSON.parse(result.header)));
		yield put(actionCreators.setFormWebhook(result.webhook));
	}

	if (window.App.formDataId) {
		let { result } = yield safeFetch(`/api/v1/form/data/${window.App.formDataId}`, {
			credentials: 'include',
			method: 'GET',
			headers: defaultHeaders,
		});
		if (result && result.fieldDataList && result.fieldDataList.length > 0) {
			controls.forEach(c => {
				let fd = result.fieldDataList.find(f => f.fieldId === c.id);
				if (fd) c.answer = fd.data;
			});
		}
	}

	// Set default value
	controls.forEach(c => {
		if (c.answer !== '') return;
		c.answer = getDefaultValue(c);
	});

	yield put(actionCreators.setControls(controls));
	yield put(actionCreators.setBusy(false));
}

function* save() {
	yield put(actionCreators.setBusy(true));
	const state = (yield select<{ app: AppState }>(state => state.app)) as AppState;
	const list = state.controls.map(c => ({
		FieldId: c.id,
		Data: c.answer,
	}));
	let url = `/api/v1/form/${window.App.formId}/data`;
	if (window.App.formDataId) url = `/api/v1/form/data/${window.App.formDataId}`;
	let { result } = yield safeFetch(url, {
		credentials: 'include',
		method: window.App.formDataId && 'PUT' || 'POST',
		headers: defaultHeaders,
		body: JSON.stringify({ FieldDataList: list }),
	});

	let webhookData: WebHookData = {
		type: window.App.formDataId && 'UpdateData' || 'AddData',
		payload: JSON.stringify(result),
	}
	yield safeFetch(state.formWebhook, {
		credentials: 'include',
		method: 'POST',
		headers: defaultHeaders,
		body: JSON.stringify(webhookData),
	});


	yield put(actionCreators.setBusy(false));
	yield put(actionCreators.setSubmitted(true));
}

export function* watchApp() {
	yield takeEvery(appSagaTypes.Init, init);
	yield takeEvery(appSagaTypes.Save, save);
}
