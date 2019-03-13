import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, SingleLineTextOptional } from '../interfaces';
import { InputEditor } from '../components/editors';

export interface SingleLineTextProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value: string, id: string) => void;
}

export class SingleLineText extends React.Component<SingleLineTextProps> {
	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		const placeholder = (optional as SingleLineTextOptional).placeholder;

		return (
			<div className="single-line-text ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				<InputEditor value={(!designTime ? answer : '') as any} disabled={designTime} placeholder={placeholder} onEveryChange={v => (onChange && onChange(v, id))} />
			</div>
		);
	}
}