import * as React from 'react';
import * as classnames from 'classnames';

import { Button, ButtonProps } from '../Button';

import { EditorProps } from './editorProps';
export type NumberEditorProps = {
	value: number;
	minValue?: number;
	maxValue?: number;
	step?: number;
	placeholder?: string;
	onChange?: (value: any, invalid: boolean) => void;
	onEveryChange?: (value: any, invalid: boolean) => void;
} & EditorProps;

export type NumberEditorState = {
	value: string;
	initialValue: string;
	invalid: boolean;
}

const numberRegex = /^(\d+)$/i;

export class NumberEditor extends React.Component<NumberEditorProps, NumberEditorState> {

	constructor(props: NumberEditorProps) {
		super(props);
		this.state = { value: `${props.value}`, initialValue: `${props.value}`, invalid: props.invalid || false };
	}

	componentWillReceiveProps(newProps: NumberEditorProps) {
		this.setState({ value: `${newProps.value}`, initialValue: `${newProps.value}`, invalid: newProps.invalid || false });
	}

	checkRange = (value: number) => {
		const { minValue, maxValue } = this.props;
		const min =  isNaN(minValue) ? -Infinity : +minValue;
		const max = isNaN(maxValue) ? Infinity : +maxValue;
		return value >= min && value <= max;
	}

	validateNumber = (value: string) => value && (value.search(numberRegex) !== -1) && this.checkRange(parseInt(value)) || false;

	onNumberChange = delta => () => {
		const { minValue, maxValue, step, onChange } = this.props;
		const { value, invalid } = this.state;
		if (invalid) return;

		const actualStep = !step || step === 0 ? 1 : step;
		const result = parseInt(value) + (delta * actualStep);

		if (this.checkRange(result)) {
			if (onChange) onChange(result, false);
		}
	};

	onChange = (e: any) => {
		const { onEveryChange } = this.props;
		const value: string = e.target.value;
		const invalid = !this.validateNumber(value);

		if (onEveryChange) {
			if (invalid) onEveryChange(NaN, true);
			else onEveryChange(parseInt(value), false);
		}

		this.setState({ value, invalid });
	}

	onBlur = () => {
		const { value, invalid } = this.state;
		this.updateValue(value, invalid);
	}

	onKeyUp = (e: any) => {
		if (e.which === 13) {
			const { value, invalid } = this.state;
			this.updateValue(value, invalid);
		}

		if (e.which === 27) {
			this.setState({ value: this.state.initialValue });
		}
	};

	updateValue = (value: string, invalid: boolean) => {
		const { onChange } = this.props;
		if (!onChange) return;

		if (invalid) onChange(NaN, true);
		else onChange(parseInt(value), false);
	}

	public render() {
		const { placeholder, className, inverted, disabled } = this.props;
		const { value, invalid } = this.state;

		const inputClass = classnames(className, 'efc-textbox', { 'efc-inverted': inverted }, { 'efc-invalid': invalid }, { 'efc-disabled': disabled });
		return (
			<div className="efc-number">
				<input className={inputClass} placeholder={placeholder} disabled={disabled} type="text" value={value} onChange={this.onChange} onBlur={this.onBlur} onKeyUp={this.onKeyUp} />
				<Button rounded size="small" style="link" inverted={inverted} disabled={invalid} onClick={this.onNumberChange(+1)} icon="mdi mdi-plus" />
				<Button rounded size="small" style="link" inverted={inverted} disabled={invalid} onClick={this.onNumberChange(-1)} icon="mdi mdi-minus" />
			</div>
		);
	}
}
