import * as React from 'react';
import { CssClass } from './utils';

export type ButtonProps = {
	className?: string;
	icon?: string;
	iconFontSize?: string;
	text?: string;
	textAlign?: 'left' | 'center' | 'right';
	title?: string;
	style?: 'default' | 'accent' | 'transparent' | 'link';
	width?: string;
	size?: 'default' | 'small' | 'large';
	rounded?: boolean;
	busy?: boolean;
	stacked?: boolean;
	inverted?: boolean;
	inline?: boolean;
	invalid?: boolean;
	disabled?: boolean;
	onClick?: (e: any) => void;
	id?: string;
}

export class Button extends React.Component<ButtonProps, any> {

	onClick = (e) => {
		if (this.props.onClick) this.props.onClick(e);
	}

	public render() {
		const { id, className, icon, iconFontSize, text, textAlign, title, style, width, size, rounded, stacked, inverted, inline, invalid, busy, disabled } = this.props;

		const buttonClass = new CssClass(['btn']);
		if (inline) buttonClass.add('ef-inline-block');
		else buttonClass.add('ef-block');
		buttonClass.add('ef-btn');

		switch (style) {
			case 'accent':
				buttonClass.add('ef-btn-accent');
				break;
			case 'transparent':
				buttonClass.add('ef-btn-transparent');
				break;
			case 'link':
				buttonClass.add('ef-btn-link');
				break;
		}

		if (icon || busy) buttonClass.add('ef-btn-icon');
		if (inverted) buttonClass.add('ef-inverted');
		if (rounded && !stacked) buttonClass.add('ef-rounded');

		if (size === 'small')buttonClass.add('ef-size-sm');
		if (size === 'large')buttonClass.add('ef-size-lg');
		if (stacked) buttonClass.add('ef-stacked');
		if (invalid) buttonClass.add('ef-invalid');
		if (className) buttonClass.add(className);

		const buttonStyle = { textAlign: 'center' } as any;
		if (textAlign === 'left') buttonStyle.textAlign = 'left';
		if (textAlign === 'right') buttonStyle.textAlign = 'right';
		if (width) buttonStyle.width = width;

		const iconClass = new CssClass([icon, 'ef-abs-icon', 'ef-pos-top', 'ef-pos-lt']);
		const iconStyle = iconFontSize && { fontSize: iconFontSize } || null;

		return (
			<button id={id} className={buttonClass.css()} style={buttonStyle} title={title} disabled={disabled} onClick={this.onClick}>
				{text && <span>{text}</span>}
				{busy && <i className="mdi mdi-loading ef-abs-icon ef-pos-top ef-pos-lt ef-anim-icon" style={iconStyle} />}
				{!busy && icon && <i className={iconClass.css()} style={iconStyle} />}
			</button>
		);
	}
}
