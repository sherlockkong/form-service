import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, NumberOptional } from '../interfaces';
import { NumberEditor } from '../components/editors';

export interface NumberProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

export class Number extends React.Component<NumberProps> {
	onNumberChange = (v, invalid: boolean) => {
		const { control: { id, answer }, onChange } = this.props;
		if (onChange) onChange(invalid ? answer : v, id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'number') return null;
		const op = optional as NumberOptional;

		return (
			<div className="number ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				<NumberEditor
					value={designTime ? op.min : (answer as number)}
					minValue={op.minValidation ? op.min : undefined}
					maxValue={op.maxValidation ? op.max : undefined}
					step={op.step}
					onChange={this.onNumberChange}
					disabled={designTime}
					placeholder={op.placeholder}
				/>
			</div>
		);
	}
}