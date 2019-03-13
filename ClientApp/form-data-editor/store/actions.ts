import { Control, ErrorDic } from "../../common/interfaces";
import { FormHeader } from "./interfaces";

// Reducer Actions
export interface SetBusyAction { type: 'App/SetBusy', payload: { busy: boolean } };
export interface SetFormNameAction { type: 'App/SetFormName', payload: { formName: string } };
export interface MMSetFormHeaderAction { type: 'App/MM/SetFormHeader', payload: { formHeader: FormHeader } };
export interface MMSetFormDescriptionAction { type: 'App/MM/SetFormDescription', payload: { formDescription: string } };
export interface SetFormWebhookAction { type: 'App/SetFormWebhook', payload: { formWebhook: string } };
export interface SetControlsAction { type: 'App/SetControls', payload: { controls: Control[] } };
export interface SetSubmittedAction { type: 'App/SetSubmitted', payload: { submitted: boolean } };
export interface SetSetErrorDicAction { type: 'App/SetErrorDic', payload: { errorDic: ErrorDic } };

const setBusy = (busy: boolean): SetBusyAction => ({ type: 'App/SetBusy', payload: { busy } });
const setFormHeader = (formHeader: FormHeader): MMSetFormHeaderAction => ({ type: 'App/MM/SetFormHeader', payload: { formHeader } });
const setFormDescription = (formDescription: string): MMSetFormDescriptionAction => ({ type: 'App/MM/SetFormDescription', payload: { formDescription } });
const setFormWebhook = (formWebhook: string): SetFormWebhookAction => ({ type: 'App/SetFormWebhook', payload: { formWebhook } });
const setFormName = (formName: string): SetFormNameAction => ({ type: 'App/SetFormName', payload: { formName } });
const setControls = (controls: Control[]): SetControlsAction => ({ type: 'App/SetControls', payload: { controls } });
const setSubmitted = (submitted: boolean): SetSubmittedAction => ({ type: 'App/SetSubmitted', payload: { submitted } });
const setErrorDic = (errorDic: ErrorDic): SetSetErrorDicAction => ({ type: 'App/SetErrorDic', payload: { errorDic } });

export type AppReducerAction = SetBusyAction | MMSetFormHeaderAction | MMSetFormDescriptionAction | SetFormWebhookAction | SetFormNameAction | SetControlsAction | SetSubmittedAction | SetSetErrorDicAction;

// Saga Actions
export interface InitAction { type: 'App/Init' };
const init = (): InitAction => ({ type: 'App/Init' });

export interface SaveAction { type: 'App/Save' };
const save = (): SaveAction => ({ type: 'App/Save' });

export const appSagaTypes = {
	Init: 'App/Init',
	Save: 'App/Save',
};

// Actions Creators
export const actionCreators = {
	// Reducer Actions
	setBusy,
	setFormWebhook,
	setFormName,
	setFormHeader,
	setFormDescription,
	setControls,
	setSubmitted,
	setErrorDic,

	// Saga Actions
	init,
	save,
};