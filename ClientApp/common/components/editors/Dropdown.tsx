import * as React from 'react';
import * as classnames from 'classnames';
import { Dropdown, DropdownProps, DropdownItemProps } from '../Dropdown';

import { EditorProps } from './editorProps';
export type DropdownEditorProps = {
	text?: string;
	menuClassName?: string;
	items: DropdownItemProps[];
	onChange: (value) => void;
	onToggle?: (open: boolean, target?: HTMLElement) => void|boolean;
} & EditorProps;

export class DropdownEditor extends React.Component<DropdownEditorProps> {

	onSelect = (value) => {
		const { onChange } = this.props;
		if (onChange) onChange(value);
	};

	render() {
		const { text, items, className, menuClassName, inverted, invalid, disabled, onToggle } = this.props;

		const dropdownProps: DropdownProps = {
			items,
			disabled,
			onSelect: this.onSelect,
			offset: true,
			width: '100%',
			menuWidth: '100%',
			inverted,
			style: 'default',
			size: 'small',
			text,
			textAlign: 'left',
			invalid,
			className,
			menuClassName,
			onToggle,
		};
		return (<Dropdown {...dropdownProps} />);
	}
}
