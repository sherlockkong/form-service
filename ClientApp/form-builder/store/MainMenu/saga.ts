import { delay } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import { safeFetch, defaultHeaders, getDefaultValue } from '../../../common/utils';
import { Control, MultiChoiceOptional } from '../../../common/interfaces';
import { wsActionCreators } from '../Workspace';

function* init() {
	if (window.App.formId) {
		yield put(actions.mmActionCreators.setBusy(true));

		const { result } = yield safeFetch(`/api/v1/form/${window.App.formId}`, {
			credentials: 'include',
			method: 'GET',
			headers: defaultHeaders,
		});

		if (result) {
			let controls: Control[] = [];
			if (result.fields && result.fields.length > 0) {
				controls = result.fields.map(f => {
					let control = JSON.parse(f.detail);
					return {
						id: f.fieldId,
						type: f.type,
						question: control.question,
						description: control.description,
						required: control.required,
						optional: control.optional,
						answer: getDefaultValue(control),
					};
				});
			}
			yield put(wsActionCreators.preview.setControls(controls));

			if (result.name) yield put(actions.mmActionCreators.setFormName(result.name));
			if (result.header) yield put(actions.mmActionCreators.setFormHeader(JSON.parse(result.header)));
			if (result.description) yield put(actions.mmActionCreators.setFormDescription(result.description));
			if (result.settings) yield put(actions.mmActionCreators.setFormSettings(result.settings));
		}

		yield put(actions.mmActionCreators.setBusy(false));
	}
}

function* saveForm(action: actions.MMSaveFormAction) {
	yield put(actions.mmActionCreators.setBusy(true));

	action.payload.form
	action.payload.form.FormId = window.App.formId;
	yield safeFetch('/api/v1/form', {
		credentials: 'include',
		method: window.App.formId && 'PUT' || 'POST',
		headers: defaultHeaders,
		body: JSON.stringify(action.payload.form),
	});

	yield put(actions.mmActionCreators.setBusy(false));
}

export function* watchMainMenu() {
	yield takeEvery(actions.mmSagaTypes.Init, init);
	yield takeEvery(actions.mmSagaTypes.SaveForm, saveForm);
}
