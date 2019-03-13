import * as React from 'react';
import * as classnames from 'classnames';

import { EditorProps } from './editorProps';

export type BooleanEditorProps = {
	value?: 'true' | 'false';
	trueLabel?: string;
	falseLabel?: string;
	trueTitle?: string;
	falseTitle?: string;
	onChange: (value) => void;
} & EditorProps;

export class BooleanEditor extends React.Component<BooleanEditorProps> {

	onToggle = (value: any) => (): void => {
		const { onChange } = this.props;
		if (onChange) onChange(value);
	}

	public render() {
		const { trueLabel, falseLabel, trueTitle, falseTitle, value, className, inverted, invalid, disabled } = this.props;

		const boolClass = classnames(className, 'efc-boolean', { 'efc-inverted': inverted }, { 'efc-invalid': invalid }, { 'efc-disabled': disabled });
		const trueButtonClass = classnames('efc-radio', { 'checked': value === 'true' }, 'true');
		const falseButtonClass = classnames('efc-radio', { 'checked': value === 'false' }, 'false');

		return (
			<div className={boolClass}>
				<button onClick={this.onToggle(true)} className={trueButtonClass} title={trueTitle || ''} disabled={disabled}>
					<div>
						<div></div>
					</div>
					<span>{trueLabel || 'True'}</span>
				</button>
				<button onClick={this.onToggle(false)} className={falseButtonClass} title={falseTitle || ''} disabled={disabled}>
					<div>
						<div></div>
					</div>
					<span>{falseLabel || 'False'}</span>
				</button>
			</div>
		);
	}
}
