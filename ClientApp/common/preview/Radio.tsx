import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, RadioOptional } from '../interfaces';
import { Radio as RD } from '../components/Radio';

export interface RadioProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

export class Radio extends React.Component<RadioProps> {
	onChange = (v) => {
		const { control: { id, answer }, onChange } = this.props;
		if (onChange) onChange(v, id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'radio') return null;
		const op = optional as RadioOptional;
		const items = op.items.filter(x => x.label);

		return (
			<div className="radio ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				{
					items.map(x => (
						<RD key={x.value} value={x.value} text={x.label} checked={answer == x.value} disabled={designTime} onChange={this.onChange} />
					))
				}
				{!designTime && <div className="sp" />}
			</div>
		);
	}
}