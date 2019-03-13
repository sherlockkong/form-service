export interface Control {
	id: string;
	type: ControlType;
	question: string;
	description: string;
	required: boolean;
	answer: Answer;
	optional: Optional;
}

export interface ErrorDic { [key: string]: string };
export interface ItemModel {
	label: string;
	value: string;
};


export type ControlType =
	'single-line-text' | 'paragraph' | 'multi-choice' | 'number' |
	'rating' | 'radio' | 'file' | 'date-time' |
	'phone' | 'email' | 'website';

// ---------------------------------------------------- //
export type SingleLineTextAnswer = string;
export interface SingleLineTextOptional {
	placeholder: string;
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type ParagraphTextAnswer = string;
export interface ParagraphTextOptional {
	placeholder: string;
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type MultiChoiceAnswer = string;
export interface MultiChoiceOptional {
	items: ItemModel[];
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type NumberAnswer = number;
export interface NumberOptional {
	maxValidation: boolean;
	minValidation: boolean;
	max: number;
	min: number;
	step: number;
	placeholder: string;
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type RatingAnswer = number;
export interface RatingOptional {
	score: '3' | '5' | '10',
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //

export type RadioAnswer = boolean;
export interface RadioOptional {
	items: ItemModel[];
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type FileAnswerModel = {
	name: string,
	content: string,
};
export type FileAnswer = string;
export interface FileOptional {
	max: number;
	type: FileType;
	custom: string;
	placeholder: string;
};
export type FileType = 'no-limit' | 'doc' | 'img' | 'video' | 'audio' | 'zip' | 'custom';
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type DateTimeAnswer = string;
export interface DateTimeOptional {
	type: 'dateTime' | 'date' | 'time';
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type PhoneAnswer = string;
export interface PhoneOptional {
	placeholder: string;
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type EmailAnswer = string;
export interface EmailOptional {
	placeholder: string;
};
// ---------------------------------------------------- //

// ---------------------------------------------------- //
export type WebsiteAnswer = string;
export interface WebsiteOptional {
	placeholder: string;
};
// ---------------------------------------------------- //

export type Answer = SingleLineTextAnswer | ParagraphTextAnswer | MultiChoiceAnswer | NumberAnswer
	| RatingAnswer | RadioAnswer | FileAnswer | DateTimeAnswer
	| PhoneAnswer | EmailAnswer | WebsiteAnswer;

export type Optional = SingleLineTextOptional | ParagraphTextOptional | MultiChoiceOptional | NumberOptional
	| RatingOptional | RadioOptional | FileOptional | DateTimeOptional
	| PhoneOptional | EmailOptional | WebsiteOptional;