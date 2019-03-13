import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, ParagraphTextOptional } from '../interfaces';
import { InputEditor } from '../components/editors';

export interface ParagraphTextProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value: string, id: string) => void;
}

export class ParagraphText extends React.Component<ParagraphTextProps> {
	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		const placeholder = (optional as ParagraphTextOptional).placeholder;

		return (
			<div className="paragraph-text ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				<InputEditor value={(!designTime ? answer : '') as any} multiline disabled={designTime} placeholder={placeholder} onEveryChange={v => (onChange && onChange(v, id))} />
			</div>
		);
	}
}