import * as React from 'react';
import * as classnames from 'classnames';

import { EditorProps } from './editorProps';
export type InputEditorProps = {
	value: string;
	title?: string;
	placeholder?: string;
	autocomplete?: string;
	type?: 'text' | 'password' | 'email' | 'url' | 'tel';
	multiline?: boolean;
	rows?: number;
	onChange?: (value) => void;
	onEveryChange?: (value) => void;
	onFocus?: () => void;
	onBlur?: () => void;
} & EditorProps;

export type InputEditorState = {
	initialValue: string;
	value: string;
	inComposition: boolean;
}

export class InputEditor extends React.Component<InputEditorProps, InputEditorState> {

	public static defaultProps: Partial<InputEditorProps> = {
		rows: 4,
	};
	constructor(props: InputEditorProps) {
		super(props);
		this.state = {
			initialValue: props.value,
			value: props.value,
			inComposition: false, // handle IME input
		};
	}

	componentWillReceiveProps(newProps: InputEditorProps) {
		this.setState({ initialValue: newProps.value, value: newProps.value });
	}

	onCompositionStart = () => {
		this.setState({ inComposition: true });
	}

	onCompositionEnd = (e: any) => {
		const { onEveryChange } = this.props;

		const value = e.target.value;
		if (onEveryChange) {
			onEveryChange(value);
		}
		this.setState({ value, inComposition: false });
	}

	onChange = (e: any) => {
		const { onEveryChange } = this.props;
		const { inComposition } = this.state;
		const value = e.target.value;

		if (!inComposition && onEveryChange) onEveryChange(value);
		this.setState({ value });
	}

	onBlur = () => {
		const { value } = this.state;
		if (this.props.onBlur) {
			this.props.onBlur();
		}
		this.updateValue(value);
	}
	onFocus = () => {
		if (this.props.onFocus) {
			this.props.onFocus();
		}
	}

	onKeyUp = (e: any) => {
		if (e.which === 13) {
			const value = e.target.value;
			this.updateValue(value);
		}
		if (e.which === 27) {
			this.setState({ value: this.state.initialValue });
		}
	};

	updateValue = (value: string) => {
		const { onChange } = this.props;
		if (onChange) onChange(value);
	}

	public render() {
		const { placeholder, type, multiline, className, title, inverted, invalid, disabled, rows, autocomplete } = this.props;
		const { value } = this.state;

		let inputType = 'text';
		if (type === 'password') inputType = 'password';
		if (type === 'email') inputType = 'email';
		if (type === 'url') inputType = 'url';
		if (type === 'tel') inputType = 'tel';

		let inputAutocomplete = 'off';
		if (autocomplete) inputAutocomplete = autocomplete;

		const inputClass = classnames(className, 'efc-textbox', { 'efc-inverted': inverted }, { 'efc-invalid': invalid }, { 'efc-disabled': disabled });

		const inputProps = {
			value,
			disabled,
			placeholder,
			className: inputClass,
			onChange: this.onChange,
			onBlur: this.onBlur,
			onKeyUp: this.onKeyUp,
			onCompositionStart: this.onCompositionStart,
			onCompositionEnd: this.onCompositionEnd,
			onFocus: this.onFocus,
		}

		return (multiline
			&& <textarea {...inputProps} rows={rows} />
			|| <input {...inputProps} type={inputType} title={title || value} autoComplete={inputAutocomplete} />
		);
	}
}
