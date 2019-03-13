import * as React from 'react';
import * as classnames from 'classnames';

export type RadioProps = {
	id?: string;
	value: string;
	checked?: boolean;
	text?: string;
	title?: string;
	inline?: boolean;
	inverted?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	onChange?: (value) => void;
};

export class Radio extends React.Component<RadioProps> {

	onClick = (value: any) => (e) => {
		const { onChange } = this.props;

		if (onChange) onChange(value);
	}

	public render() {
		const { id, value, checked, text, title, inline, inverted, invalid, disabled } = this.props;

		const radioButtonClass = classnames('efc-radio',
			{ 'checked': checked },
			{ 'efc-inline': inline },
			{ 'efc-invalid': invalid },
			{ 'efc-inverted': inverted },
		);
		return (
			<button id={id} onClick={this.onClick(value)} className={radioButtonClass} disabled={disabled}>
				<div>
					<div></div>
				</div>
				<span>{text}</span>
			</button>
		);
	}
}
