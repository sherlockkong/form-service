import { Reducer, Action } from 'redux';
import * as update from "immutability-helper";
import { AppState } from './interfaces';
import { AppReducerAction } from './actions';

let defaultState: AppState = {
	controls: [],
	busy: false,
	submitted: false,
	formName: '',
	formHeader: { display: true, content: '', align: 'left' },
	formDescription: '',
	formWebhook: '',
	errorDic: {},
};

export const appReducer: Reducer<AppState> = (state: AppState = defaultState, action: AppReducerAction) => {
	switch (action.type) {
		case 'App/SetBusy':
			return update(state, { busy: { $set: action.payload.busy } });
		case 'App/SetFormName':
			return update(state, { formName: { $set: action.payload.formName } });
		case 'App/MM/SetFormDescription':
			return update(state, { formDescription: { $set: action.payload.formDescription } });
		case 'App/MM/SetFormHeader':
			return update(state, { formHeader: { $set: action.payload.formHeader } });
		case 'App/SetFormWebhook':
			return update(state, { formWebhook: { $set: action.payload.formWebhook } });
		case 'App/SetControls':
			return update(state, { controls: { $set: action.payload.controls } });
		case 'App/SetSubmitted':
			return update(state, { submitted: { $set: action.payload.submitted } });
		case 'App/SetErrorDic':
			return update(state, { errorDic: { $set: action.payload.errorDic } });

		default: return state;
	}
}