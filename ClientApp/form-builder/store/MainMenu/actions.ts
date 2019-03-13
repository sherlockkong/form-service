import { NavSection, Form, FormHeader } from "./interfaces";

// Reducer Actions ------------------------------------------------ //
export interface MMSetFormNameAction { type: 'App/MM/SetFormName', payload: { formName: string } };
export interface MMSetFormHeaderAction { type: 'App/MM/SetFormHeader', payload: { formHeader: FormHeader } };
export interface MMSetFormDescriptionAction { type: 'App/MM/SetFormDescription', payload: { formDescription: string } };
export interface MMSetFormSettingsAction { type: 'App/MM/SetFormSettings', payload: { formSettings: string } };
export interface MMSetBusyAction { type: 'App/MM/SetBusy', payload: { busy: boolean } };
export interface MMSetNavSelectedAction { type: 'App/MM/SetNavSelected', payload: { navSelected: NavSection } };

const setFormName = (formName: string): MMSetFormNameAction => ({ type: 'App/MM/SetFormName', payload: { formName } });
const setFormHeader = (formHeader: FormHeader): MMSetFormHeaderAction => ({ type: 'App/MM/SetFormHeader', payload: { formHeader } });
const setFormDescription = (formDescription: string): MMSetFormDescriptionAction => ({ type: 'App/MM/SetFormDescription', payload: { formDescription } });
const setFormSettings = (formSettings: string): MMSetFormSettingsAction => ({ type: 'App/MM/SetFormSettings', payload: { formSettings } });
const setBusy = (busy: boolean): MMSetBusyAction => ({ type: 'App/MM/SetBusy', payload: { busy } });
const setNavSelected = (navSelected: NavSection): MMSetNavSelectedAction => ({ type: 'App/MM/SetNavSelected', payload: { navSelected } });

export type MMReducerAction = MMSetFormNameAction | MMSetFormHeaderAction | MMSetFormDescriptionAction | MMSetFormSettingsAction | MMSetNavSelectedAction | MMSetBusyAction;

// Saga Actions --------------------------------------------------- //
export interface MMInitAction { type: 'App/MM/Init' };
const init = (): MMInitAction => ({ type: 'App/MM/Init' });
export interface MMSaveFormAction { type: 'App/MM/SaveForm', payload: { form: Form } };
const saveForm = (form: Form): MMSaveFormAction => ({ type: 'App/MM/SaveForm', payload: { form } });
// -------------------------------------

export const mmSagaTypes = {
	SaveForm: 'App/MM/SaveForm',
	Init: 'App/MM/Init',
};

// Action Creators ------------------------------------------------ //
export const mmActionCreators = {
	// Reducer Actions
	setFormName,
	setFormHeader,
	setNavSelected,
	setBusy,
	setFormDescription,
	setFormSettings,

	// Saga Actions
	saveForm,
	init,
};