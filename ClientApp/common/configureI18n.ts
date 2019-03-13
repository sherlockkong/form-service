import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import * as moment from "moment";

export const configureI18n = (locales: LocaleData[]) => {
	const i18Instance = i18n
		.use(LanguageDetector)
		.init({
			fallbackLng: 'zh',
			debug: (window as any).isDevMode,

			detection: {
				order: ['querystring', 'navigator'],
				lookupQuerystring: 'lng',
			},

			resources: {},

			interpolation: {
				escapeValue: false,
				format: function (value, format, lng) {
					if (format === 'uppercase') return value.toUpperCase();
					if (format === 'lowercase') return value.toLowerCase();
					return value;
				},
			},

			react: {
				wait: false,
				bindI18n: 'languageChanged loaded',
				bindStore: 'added removed',
				nsMode: 'default'
			}
		});

	locales.forEach(locale => {
		const langs = Object.keys(locale.data);
		if (langs.length === 0) return;

		langs.forEach(lang => i18Instance.addResourceBundle(lang, locale.namespace, locale.data[lang]));
	});

	moment.locale(i18Instance.language || 'en');
	
	return i18Instance;
};
