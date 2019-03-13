declare type LanguageKeyValueMap = { [key: string]: string }

declare type LocaleData = {
	namespace: string;
	data: {
		[language: string]: LanguageKeyValueMap
	}
}

declare interface Window {
	App: {
		formId: string;
		formDataId: string;
		i18n: any;
		dispatch: any;
	}
}