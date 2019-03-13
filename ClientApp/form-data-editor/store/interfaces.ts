import { Control, ErrorDic } from "../../common/interfaces";

export interface AppState {
	controls: Control[];
	busy: boolean;
	submitted: boolean;
	formName: string;
	formDescription: string;
	formHeader: FormHeader;
	formWebhook: string;
	errorDic: ErrorDic;
};

export interface WebHookData {
	type: 'AddData' | 'UpdateData',
	payload: string;
}

export interface FormHeader {
	display: boolean;
	content: string;
	align: Align;
};

export type Align = 'left' | 'center' | 'right';