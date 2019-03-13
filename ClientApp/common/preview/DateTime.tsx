import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';
import * as moment from 'moment';

import { Control, DateTimeOptional } from '../interfaces';
import { DateTimePicker } from '../components/editors';
import { DateTimeFormat } from '../utils';

export interface DateTimeProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

interface DateTimeState {
	dateTime: moment.Moment;
	date: moment.Moment;
	time: moment.Moment;
}

export class DateTime extends React.Component<DateTimeProps, DateTimeState> {

	state = {
		dateTime: null,
		date: null,
		time: null,
	}

	componentWillMount() {
		this.updateState(this.props);
	}

	componentWillReceiveProps(nextProps: DateTimeProps) {
		this.updateState(nextProps);
	}

	updateState = (props: DateTimeProps) => {
		const { control: { answer, optional }, onChange } = this.props;
		const op = optional as DateTimeOptional;
		switch (op.type) {
			case 'dateTime': {
				if (this.state.dateTime === null)
					this.setState({ dateTime: moment(answer as string, DateTimeFormat[(optional as DateTimeOptional).type]) });
				return;
			}
			case 'date': {
				if (this.state.date === null)
					this.setState({ date: moment(answer as string, DateTimeFormat[(optional as DateTimeOptional).type]) });
				return;
			}
			case 'time': {
				if (this.state.time === null)
					this.setState({ time: moment(answer as string, DateTimeFormat[(optional as DateTimeOptional).type]) });
				return;
			}
		}
	}

	onChange = (v) => {
		if (!moment.isMoment(v)) return;
		const { control: { id, optional }, onChange } = this.props;
		const op = optional as DateTimeOptional;
		switch (op.type) {
			case 'dateTime': this.setState({ dateTime: v }); break;
			case 'date': this.setState({ date: v }); break;
			case 'time': this.setState({ time: v }); break;
		}
		if (onChange) onChange(v.format(DateTimeFormat[(optional as DateTimeOptional).type]), id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'date-time') return null;
		const op = optional as DateTimeOptional;

		return (
			<div className="date-time ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}

				{op.type === 'dateTime' && <DateTimePicker
					disabled={designTime}
					value={this.state.dateTime}
					dateFormat={DateTimeFormat.date}
					timeFormat={DateTimeFormat.time}
					mode='dateTime' onChange={this.onChange}
				/>}
				{op.type === 'date' && <DateTimePicker
					disabled={designTime}
					value={this.state.date}
					dateFormat={DateTimeFormat.date}
					mode='date' onChange={this.onChange}
				/>}
				{op.type === 'time' && <DateTimePicker
					disabled={designTime}
					timeFormat={DateTimeFormat.time}
					value={this.state.time}
					mode='time' onChange={this.onChange}
				/>}
			</div>
		);
	}
}