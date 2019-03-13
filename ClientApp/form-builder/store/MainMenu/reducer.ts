import { Reducer, Action } from 'redux';
import * as update from "immutability-helper";
import RichTextEditor from 'react-rte';

import { MainMenuState } from './interfaces';
import { MMReducerAction } from './actions';

let defaultState: MainMenuState = {
	formName: '',
	formHeader: { display: true, content: '', align: 'left' },
	formDescription: RichTextEditor.createEmptyValue().toString('html'),
	formSettings: '',
	busy: false,
	navSelected: 'design',
};

export const mmReducer: Reducer<MainMenuState> = (state: MainMenuState = defaultState, action: MMReducerAction) => {
	switch (action.type) {
		case 'App/MM/SetFormName':
			return update(state, { formName: { $set: action.payload.formName } });
		case 'App/MM/SetFormHeader':
			return update(state, { formHeader: { $set: action.payload.formHeader } });
		case 'App/MM/SetFormDescription':
			return update(state, { formDescription: { $set: action.payload.formDescription } });
		case 'App/MM/SetFormSettings':
			return update(state, { formSettings: { $set: action.payload.formSettings } });
		case 'App/MM/SetNavSelected':
			return update(state, { navSelected: { $set: action.payload.navSelected } });
		case 'App/MM/SetBusy':
			return update(state, { busy: { $set: action.payload.busy } });

		default: return state;
	}
}