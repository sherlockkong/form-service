import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, PhoneOptional } from '../interfaces';
import { InputEditor } from '../components/editors';

export interface PhoneProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

export class Phone extends React.Component<PhoneProps> {
	onPhoneChange = (v) => {
		const { control: { id, answer }, onChange } = this.props;
		if (onChange) onChange(v, id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'phone') return null;
		const op = optional as PhoneOptional;

		return (
			<div className="phone ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}

				<div className="ph-input-wp">
					<div className="cn-icon" />
					<div className="ph-input">
						<InputEditor
							disabled={designTime}
							value={designTime ? '' : (answer as string)}
							placeholder={op.placeholder}
							onEveryChange={this.onPhoneChange}
							type='tel'
						/>
					</div>
				</div>
			</div>
		);
	}
}