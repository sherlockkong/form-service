import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { Control, MultiChoiceOptional } from '../interfaces';
import { InputEditor, CheckList } from '../components/editors';

export interface MultiChoiceProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value: string, id: string) => void;
}

export class MultiChoice extends React.Component<MultiChoiceProps> {

	onSelect = (v) => {
		const { control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (onChange) {
			let op = optional as MultiChoiceOptional;
			let ans = answer as string;
			let items = ans.split(', ').filter(x => x && op.items.find(it => it.value === x));
			if (items.indexOf(v) === -1) ans = [...items, v].join(', ');
			else ans = items.filter(i => i !== v).join(', ');
			onChange(ans, id);
		}
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		const op = (optional as MultiChoiceOptional);
		const ts = (answer as string).split(', ');
		const items = op.items.filter(x => x.label).map(i => ({ text: i.label, value: i.value, selected: ts.indexOf(i.value) !== -1 }));
		const ar = (answer as string).split(', ');
		const ans = items.filter(x => ar.indexOf(x.value) !== -1).map(x => x.text).join(', ');

		return (
			<div className="multi-choice ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				{designTime && <CheckList text={op.items.map(i => i.label).filter(x => x).join(', ')} items={items} onSelect={this.onSelect} disabled />}
				{!designTime && <CheckList text={ans} items={items} onSelect={this.onSelect} />}
			</div>
		);
	}
}