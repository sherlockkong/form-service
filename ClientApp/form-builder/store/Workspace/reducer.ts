import { Reducer, Action } from 'redux';
import * as update from "immutability-helper";

import *as CI from '../../../common/interfaces';
import { WsReducerAction } from './actions';
import { generateId, getDefaultValue } from '../../../common/utils';
import { WorkspaceState } from './interfaces';

let defaultState: WorkspaceState = {
	preview: {
		selected: 'setting',
		controls: [],
		errorDic: {},
	},
};

const t = (key: string) => window.App.i18n.t(`app:${key}`);

const generateControl = (type: CI.ControlType, state: WorkspaceState): CI.Control => {
	let id = generateId(state.preview.controls.map(c => c.id));
	let control: CI.Control = {
		id,
		question: t('wsQuestionDefaultValue'),
		description: t('wsDescriptionDefaultValue'),
		answer: '',
		required: true,
		type: type,
		optional: null,
	};

	switch (type) {
		case 'single-line-text': {
			let optional: CI.SingleLineTextOptional = {
				placeholder: t('wsAnswerPlaceholder'),
			};
			control.optional = optional;
			break;
		}

		case 'paragraph': {
			let optional: CI.ParagraphTextOptional = {
				placeholder: t('wsAnswerPlaceholder'),
			};
			control.optional = optional;
			break;
		}

		case 'multi-choice': {
			let values = [], i = 0;
			while (i++ < 3) values.push(generateId(values));
			let optional: CI.MultiChoiceOptional = {
				items: values.map((value, i) => ({ label: t(`wsMultiChoiceV${i + 1}`), value }))
			};
			control.optional = optional;
			break;
		}

		case 'number': {
			let optional: CI.NumberOptional = {
				minValidation: true,
				maxValidation: true,
				max: 100,
				min: 0,
				step: 1,
				placeholder: t('wsAnswerPlaceholder'),
			};
			control.optional = optional;
			break;
		}

		case 'rating': {
			let optional: CI.RatingOptional = {
				score: '3',
			};
			control.optional = optional;
			break;
		}

		case 'radio': {
			let values = [], i = 0;
			while (i++ < 2) values.push(generateId(values));
			let optional: CI.RadioOptional = {
				items: values.map((value, i) => ({ label: t(`wsRadioV${i + 1}`), value }))
			};
			control.optional = optional;
			break;
		}

		case 'file': {
			let optional: CI.FileOptional = {
				custom: '',
				max: 1,
				type: 'no-limit',
				placeholder: t('wsSelectFile'),
			};
			control.optional = optional;
			break;
		}

		case 'date-time': {
			let optional: CI.DateTimeOptional = {
				type: 'dateTime'
			};
			control.optional = optional;
			break;
		}

		case 'phone': {
			let optional: CI.PhoneOptional = {
				placeholder: t('wsEnterPhoneNumber'),
			};
			control.optional = optional;
			break;
		}

		case 'email': {
			let optional: CI.EmailOptional = {
				placeholder: t('wsEnterEmail'),
			};
			control.optional = optional;
			break;
		}

		case 'website': {
			let optional: CI.WebsiteOptional = {
				placeholder: t('wsEnterWebsite'),
			};
			control.optional = optional;
			break;
		}

		default: return null;
	}

	control.answer = getDefaultValue(control);

	return control;
}

export const wsReducer: Reducer<WorkspaceState> = (state: WorkspaceState = defaultState, action: WsReducerAction) => {
	switch (action.type) {
		case 'App/Ws/PvSetSelected':
			return update(state, { preview: { selected: { $set: action.payload.selected } } });
		case 'App/Ws/PvSetControls':
			return update(state, { preview: { controls: { $set: action.payload.controls } } });
		case 'App/Ws/PvAddControl': {
			let control = generateControl(action.payload.type, state);
			if (control === null) return state;
			return update(state, { preview: { controls: { $push: [control] }, selected: { $set: control.id } } });
		}
		case 'App/Ws/PvUpdateControl': {
			let control = action.payload.control;
			let index = state.preview.controls.findIndex(c => c.id === state.preview.selected);
			if (index === -1) return state;
			let query: any = { preview: { controls: { [index]: { $set: control } } } };
			return update(state, query);
		}
		case 'App/Ws/PvRemoveControl': {
			let idx = state.preview.controls.findIndex(c => c.id === action.payload.id);
			let newSelected = state.preview.selected;
			if (state.preview.selected === action.payload.id) {
				let controls = state.preview.controls;
				if (controls.length === 1) newSelected = '';
				else {
					if (idx === 0) newSelected = controls[1].id;
					else newSelected = controls[idx - 1].id;
				}
			}
			let newState = update(state, { preview: { controls: { $splice: [[idx, 1]] } } });
			if (newSelected !== state.preview.selected) newState = update(newState, { preview: { selected: { $set: newSelected } } });
			return newState;
		}
		case 'App/Ws/PvSetErrorDic':
			return update(state, { preview: { errorDic: { $set: action.payload.errorDic } } });

		default: return state;
	}
}