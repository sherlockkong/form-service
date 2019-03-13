import { ControlType } from "../../../common/interfaces";

export interface MainMenuState {
	formName: string;
	formHeader: FormHeader;
	formDescription: string;
	formSettings: string;
	busy: boolean;
	navSelected: NavSection;
}

export interface FormHeader {
	display: boolean;
	content: string;
	align: Align;
};

export type Align = 'left' | 'center' | 'right';

export interface Form {
	FormId?: string;
	Name: string;
	Header: string;
	Webhook?: string;
	Description: string;
	Settings: string;
	FieldsCount: number;
	Fields: Field[];
}

export interface Field {
	Index: number;
	Type: ControlType;
	Detail: string;
}

export type NavSection = 'design' | 'preview';