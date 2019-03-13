import { ControlType } from "../../../../common/interfaces";

export const getControlIcon = (type: ControlType): string => {
	switch (type) {

		case 'single-line-text': return 'mdi mdi-text-short';
		case 'paragraph': return ' mdi mdi-text';
		case 'multi-choice': return 'mdi mdi-check-circle';
		case 'number': return 'mdi mdi-numeric';
		case 'rating': return 'mdi mdi-star-outline';
		case 'radio': return 'mdi mdi-radiobox-marked';
		case 'file': return 'mdi mdi-file-plus';
		case 'date-time': return 'mdi mdi-calendar-clock';
		case 'phone': return 'mdi mdi-cellphone';
		case 'email': return 'mdi mdi-email-outline';
		case 'website': return 'mdi mdi-link-variant';

		default: return '';
	}
}