import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, EmailOptional } from '../interfaces';
import { InputEditor } from '../components/editors';

export interface EmailProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

export class Email extends React.Component<EmailProps> {
	onEmailChange = (v) => {
		const { control: { id, answer }, onChange } = this.props;
		if (onChange) onChange(v, id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'email') return null;
		const op = optional as EmailOptional;

		return (
			<div className="email ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}

				<InputEditor
					disabled={designTime}
					value={designTime ? '' : (answer as string)}
					placeholder={op.placeholder}
					onEveryChange={this.onEmailChange}
					type='email'
				/>
			</div>
		);
	}
}