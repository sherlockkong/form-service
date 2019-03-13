import * as classnames from 'classnames';
import * as moment from 'moment';

import * as React from 'react';
import * as DateTime from 'react-datetime';

import { EditorProps } from './editorProps';
export type DateTimePickerProps = {
	value: string | moment.Moment;
	mode?: 'time' | 'date' | 'dateTime';
	placeholder?: string;
	dateFormat?: string;
	timeFormat?: string;
	locale?: string;
	onChange: (value) => void;
	validateDate?: (currentDate, selectedDate) => boolean;
} & EditorProps;

export type DateTimePickerState = {
	value: string | moment.Moment;
}

// moment.js first check if the string matches known ISO 8601 formats
const MIN_DATE = '0001-01-01';
const MAX_DATE = '9999-12-31';

export class DateTimePicker extends React.Component<DateTimePickerProps, DateTimePickerState> {

	constructor(props: DateTimePickerProps) {
		super(props);
		this.state = { value: props.value };
	}

	componentWillReceiveProps(newProps: DateTimePickerProps) {
		this.setState({
			value: newProps.value
		});
	}

	onChange = (value: any) => {
		const { onChange } = this.props;

		if (onChange) onChange(value);
	}

	validateDate = (currentDate: moment.Moment) => currentDate.isBetween(MIN_DATE, MAX_DATE, 'year', '[]');

	public render() {
		const { mode, inverted, placeholder, disabled, dateFormat, timeFormat, validateDate, className, locale } = this.props;
		const { value: v } = this.state;
		const invalid = typeof v === 'string' || (v && (v as any)._isAMomentObject && !v.isValid());

		let value = v as any;
		if (value && value._isAMomentObject && !value.isValid()) {
			value = value._i;
		}

		const dateTimeProps: any = {
			className: classnames(className, 'efc-datetime', { 'efc-inverted': inverted }),
			dateFormat,
			timeFormat,
			closeOnSelect: true,
			onChange: this.onChange,
			value,
			locale,
			isValidDate: validateDate || this.validateDate,
			inputProps: {
				className: classnames('efc-textbox', { 'efc-inverted': inverted }, { 'efc-invalid': invalid }, { 'efc-disabled': disabled }),
				placeholder,
				disabled,
			},
		};

		if (mode === 'time') dateTimeProps.dateFormat = false;
		if (mode === 'date') dateTimeProps.timeFormat = false;

		return <DateTime {...dateTimeProps} />;
	}
}
