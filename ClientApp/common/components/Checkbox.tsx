import * as React from 'react';
import * as classnames from 'classnames';

export type CheckboxProps = {
	id?: string;
	value: any;
	checked?: boolean;
	className?: string;
	text?: string;
	title?: string;
	inline?: boolean;
	inverted?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	onChange?: (value) => void;
};

export class Checkbox extends React.Component<CheckboxProps> {

	onClick = (value: any) => (e) => {
		const { onChange } = this.props;

		if (onChange) onChange(value);
	}

	public render() {
		const { id, value, checked, className: classNameProp, text, title, inline, inverted, invalid, disabled } = this.props;

		const checkboxClass = classnames(
			'efc-checkbox',
			{ 'checked': checked },
			{ 'efc-inline': inline },
			{ 'efc-invalid': invalid },
			{ 'efc-inverted': inverted },
			classNameProp,
		);
		return (
			<button id={id} onClick={this.onClick(value)} className={checkboxClass} disabled={disabled}>
				<div>
					<div></div>
					<i className="mdi mdi-check" />
				</div>
				<span>{text}</span>
			</button>
		);
	}
}
