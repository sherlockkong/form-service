import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { CssClass } from './utils';

import { Button } from './Button';

export type DropdownItemProps = {
	value?: any;
	selected?: boolean;
	icon?: string;
	iconFontSize?: string;
	text?: string;
	title?: string;
	classNames?: string;
	disabled?: boolean;
	divider?: boolean;
	header?: string;
	subPosition?: 'left' | 'center' | 'right';
	subItems?: DropdownItemProps[];
	secondaryIcon?: string;
	secondaryText?: string;
}

export type DropdownMenuProps = {
	parent: HTMLElement;
	items: DropdownItemProps[];
	onItemClick: (value: any) => void;
	className?: string;
	menuWidth?: 'default' | '100%' | number;
	position?: 'left' | 'center' | 'right';
	dropup?: boolean;
	offset?: boolean;
	shift?: boolean;
	noMaxHeight?: boolean;
}

export type MenuRect = {
	left: number;
	top: number;
	width: number;
}

export type DropdownMenuState = {
	menuRect: MenuRect;
	submenuIdx: string | null;
}

const MENU_MAX_HEIGHT = 240;

export class DropdownMenu extends React.Component<DropdownMenuProps, DropdownMenuState> {

	state = {
		menuRect: { top: 0, left: 0, width: 200 },
		submenuIdx: null,
	}

	root: HTMLElement = document.getElementById('dropdown-root');
	menuRef: HTMLElement = null;
	submenuRefs: { [name: string]: HTMLElement } = {};

	componentDidMount() {
		const menuRect = this.calcMenuRect();
		this.setState({ menuRect });

		window.addEventListener('resize', this.reCalc);
		this.scrollSpy(this.props.parent);
		this.root.addEventListener('mouseleave', this.onSubmenuClose);
	}

	componentWillUnmount() {
		this.scrollSpy(this.props.parent, true);
		window.removeEventListener('resize', this.reCalc);
		this.root.removeEventListener('mouseleave', this.onSubmenuClose);
	}

	scrollSpy = (target: HTMLElement, disable?: boolean) => {
		let currentObject = target;
		do {
			const { overflow, overflowX, overflowY } = window.getComputedStyle(currentObject);
			if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
				if (disable) currentObject.removeEventListener('scroll', this.reCalc);
				else currentObject.addEventListener('scroll', this.reCalc);
			}
			currentObject = currentObject.parentElement;
		}
		while (currentObject);
	}

	reCalc = (e) => {
		const menuRect = this.calcMenuRect();
		this.setState({ menuRect });
	}

	calcMenuRect = (): MenuRect => {
		const { position, menuWidth: menuWidthProp, dropup, parent, noMaxHeight, offset, shift } = this.props;
		let bounds = parent.getBoundingClientRect();
		let scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset;
		let scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset;

		const menuOffset = 4;
		const menuHeight = this.menuRef && this.menuRef.clientHeight || MENU_MAX_HEIGHT;
		const result: MenuRect = { top: 0, left: 0, width: 0 };

		let menuWidth = 200;
		if (menuWidthProp && menuWidthProp !== 'default') {
			if (menuWidthProp === '100%') menuWidth = bounds.width;
			else if (!isNaN(menuWidthProp)) menuWidth = menuWidthProp;
		}
		result.width = menuWidth;

		// Horizontal Positioning
		if (position === 'left') {
			const left = shift ? bounds.right : bounds.left;
			result.left = left + menuWidth > document.documentElement.clientWidth
				? document.documentElement.clientWidth - menuWidth
				: left;
		}
		else if (position === 'center') {
			const left = bounds.left + ((bounds.width / 2) - (menuWidth / 2));
			result.left = left < 0 ? 0 : left;
		}
		else { // right
			const left = shift ? bounds.left - menuWidth : bounds.right - menuWidth;
			result.left = left < 0 ? 0 : left;
		}

		// Vertical Positioning
		if (dropup) {
			const top = offset ? bounds.top - menuOffset - menuHeight : bounds.top + bounds.height - menuHeight;
			result.top = top < 0 ? 0 : top;
		}
		else {
			const top = offset ? bounds.bottom + menuOffset : bounds.top;
			result.top = top + menuHeight > window.innerHeight
				? window.innerHeight - menuHeight
				: top;
		}

		// Adding Offsets
		result.top += scrollY;
		result.left += scrollX;

		return result;
	}

	onItemClick = (value) => () => {
		const { onItemClick } = this.props;
		if (onItemClick) onItemClick(value);
	}

	onSubmenuOpen = (key: number) => (e) => {
		e.stopPropagation();
		this.setState({ submenuIdx: `${key}` });
	}

	onSubmenuClose = (e) => {
		e.stopPropagation();
		this.setState({ submenuIdx: null });
	}

	onTouchSubMenu = (key: number) => (e) => {
		if (key == this.state.submenuIdx) { // 2 == '2'
			this.onSubmenuClose(e);
		} else {
			this.onSubmenuOpen(key)(e)
		}
	}

	stopPropagation = (e) => {
		e.stopPropagation();
	}

	public render() {
		const { items, position, menuWidth, dropup, parent, noMaxHeight, className } = this.props;
		const { menuRect, submenuIdx } = this.state;

		if (!this.root) {
			if (console) {
				const message = 'Container for the dropdown portal not found! Add a <div id="dropdown-root" /> next to your application root.'
				if (console.error) console.error(message);
				else console.log(message);
			}
			return null;
		}

		// Setting up dropdown menu style for positioning
		const dropdownMenuStyle = {
			width: `${menuRect.width}px`,
			top: `${menuRect.top}px`,
			left: `${menuRect.left}px`,
		} as React.CSSProperties;

		const menuClass = new CssClass(['ef-dd-menu']);
		if (position === 'center') menuClass.add('ef-dd-menu-center');
		if (position === 'left') menuClass.add('ef-dd-menu-left');
		if (dropup) menuClass.add('ef-dd-menu-up');
		if (className) menuClass.add(className);

		const scrollbarsProps = {
			autoHeight: true,
			onScroll: this.onSubmenuClose,
			autoHeightMax: noMaxHeight ? Number.MAX_VALUE : MENU_MAX_HEIGHT,
			renderView: props => <div className="ef-dd-menu-scrollbar" {...props} />,
			renderTrackVertical: ({ style, ...props }) => <div {...props} style={{ ...style, width: 4, borderRadius: 3, top: 2, bottom: 2, right: 2 }} />,
		}

		const menu = (
			<div className={menuClass.css()} ref={(menu) => { this.menuRef = menu; }} onTouchStart={this.stopPropagation} onClick={this.stopPropagation} onMouseUp={this.stopPropagation} style={dropdownMenuStyle}>
				<Scrollbars {...scrollbarsProps} >
					{items && items.length > 0 && items.map((item, i) => {
						if (item.header) return (<div key={`dd-item-${i}`} className={`ef-dd-menu-header ${item.classNames ? item.classNames : ''}`}><span>{item.header}</span></div>);
						if (item.divider) return (<div key={`dd-item-${i}`} className={`ef-dd-menu-divider ${item.classNames ? item.classNames : ''}`} />);

						const itemClass = new CssClass(['btn', 'btn-default']);
						if (item.classNames) itemClass.add(item.classNames);
						if (item.selected) itemClass.add('selected');
						// Mouseenter event not triggered when cursor moves from disabled button: https://github.com/facebook/react/issues/10109
						if (item.disabled) itemClass.add('disabled');
						const iconStyle = item.iconFontSize && { fontSize: item.iconFontSize } || null;

						const renderMenuItem = (props, children = null) =>
							<button {...props} key={`dd-item-${i}`} className={itemClass.css()} title={item.title || item.text}>
								{item.icon && <i className={item.icon} style={iconStyle} />}
								{item.text && <span className="ef-dd-item-text">{item.text}</span>}
								{(item.secondaryIcon || item.secondaryText) &&
									<div className="ef-dd-item-secondary">
										{item.secondaryText && <span className="ef-dd-item-secondary-text">{item.secondaryText}</span>}
										{item.secondaryIcon && <i className={`ef-dd-item-secondary-icon ${item.secondaryIcon}`} style={iconStyle} />}
									</div>
								}
								{children}
							</button>;

						// dropdown submenu item
						if (item.subItems) {
							const submenuProps = {
								ref: node => { this.submenuRefs[i] = node; },
								onTouchStart: this.onTouchSubMenu(i),
								onMouseEnter: item.disabled ? this.onSubmenuClose : this.onSubmenuOpen(i),
							}
							const submenuIcon = <i className="mdi mdi-chevron-right" style={{ ...iconStyle, float: 'right', margin: 0 }} />
							return renderMenuItem(submenuProps, submenuIcon);
						}
						// normal dropdown menu item
						const props = {
							onMouseEnter: this.onSubmenuClose,
							onClick: item.disabled ? () => { } : this.onItemClick(item.value),
						}
						return renderMenuItem(props);
					})}
				</Scrollbars>
				{submenuIdx && <DropdownMenu key={submenuIdx} shift noMaxHeight={noMaxHeight} parent={this.submenuRefs[submenuIdx]} onItemClick={this.props.onItemClick} position={items[submenuIdx].subPosition || position} items={items[submenuIdx].subItems} />}
			</div>
		);

		return ReactDOM.createPortal(menu, this.root);
	}

}

export type DropdownProps = {
	id?: string;
	items: DropdownItemProps[];
	icon?: string;
	iconFontSize?: string;
	text?: string;
	textAlign?: 'left' | 'center' | 'right';
	title?: string;
	style?: 'default' | 'accent' | 'transparent' | 'link';
	size?: 'default' | 'small' | 'large';
	width?: string;
	className?: string;
	menuClassName?: string;
	noMaxHeight?: boolean;
	rounded?: boolean;
	inverted?: boolean;
	inline?: boolean;
	invalid?: boolean;
	stacked?: boolean;
	disabled?: boolean;
	hiddenChevron?: boolean;
	menuWidth?: 'default' | '100%' | number;
	position?: 'left' | 'center' | 'right';
	dropup?: boolean;
	offset?: boolean;
	onSelect?: (value: any) => void;
	onToggle?: (open: boolean, target?: HTMLElement) => void|boolean;
	noCloseOnSelect?: boolean;
}

export type DropdownState = {
	open: boolean;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {

	_dropMenuRoot: HTMLElement;

	componentDidMount() {
		window.addEventListener('click', this.onWindowClick);
		window.addEventListener('mouseup', this.onWindowClick); // click event may be stopped in some case
		window.addEventListener('dragstart', this.onWindowClick); // React-dnd won't fire mouseup event during drag and drop
		window.addEventListener('touchstart', this.onWindowClick);
		document.addEventListener('wheel', this.onDocumentMouseWheel);
		const w = window as any; 
		if (!w.dropdowns) w.dropdowns = [];
		w.dropdowns.push(this);
		this._dropMenuRoot = document.getElementById('dropdown-root');
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.onWindowClick);
		window.removeEventListener('mouseup', this.onWindowClick);
		window.removeEventListener('dragstart', this.onWindowClick);
		window.removeEventListener('touchstart', this.onWindowClick);
		document.removeEventListener('wheel', this.onDocumentMouseWheel);
		const w = window as any; 
		if (w.dropdowns) {
			const index = w.dropdowns.findIndex(v => v === this);
			if (index > -1) w.dropdowns.splice(index, 1);
		}
		this._dropMenuRoot = null;
	}

	state = {
		open: false,
	};

	domNode = null;

	open = () => {
		const { disabled, onToggle } = this.props;
		if (disabled) return;

		this.setState({ open: true });
		if (onToggle) onToggle(true);
	}

	close = (target?: HTMLElement) => {
		if (this.props.onToggle) if (!this.props.onToggle(false, target)) return;
		this.setState({ open: false });
		
	}

	onWindowClick = (e) => {
		if (this.state.open && e.target !== this.domNode && !this.domNode.contains(e.target)) {
			this.close(e.target);
		}
	}

	onToggleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const w = window as any; 
		if (w.dropdowns) {
			for (let i = 0; i < w.dropdowns.length; i++) {
				const dd = w.dropdowns[i];
				if (dd !== this && dd.state.open === true) dd.close();
			}
		}
		if (this.state.open) this.close();
		else this.open();
	}

	onItemClick = (value) => {
		if (this.props.onSelect) this.props.onSelect(value);
		if (!this.props.noCloseOnSelect) this.close();
	}

	onDocumentMouseWheel = (e) => {
		if (this.state.open && this._dropMenuRoot && !this._dropMenuRoot.contains(e.target)) {
			this.close();
		}
	}

	public render() {
		const { id, items, width, menuWidth, dropup, position, icon, iconFontSize, text, textAlign, title, style, size, rounded, inverted, inline, invalid, stacked, disabled, hiddenChevron, offset, noMaxHeight, className, menuClassName } = this.props;
		const { open: menuOpen } = this.state;

		// Bulding dropdown container class & style
		const dropdownClass = new CssClass([inline && 'ef-inline-block' || 'ef-block', 'ef-dd']);
		if (inverted) dropdownClass.add('ef-inverted');
		if (!hiddenChevron) dropdownClass.add('ef-dd-chevron');

		if (size === 'small') dropdownClass.add('ef-size-sm');
		if (size === 'large') dropdownClass.add('ef-size-lg');

		if (menuOpen) dropdownClass.add('ef-dd-open');
		if (offset) dropdownClass.add('ef-dd-offset');
		if (stacked) dropdownClass.add('ef-stacked');
		if (className) dropdownClass.add(className);

		const dropdownStyle = width && { width } || null;

		// Button Props
		const toggleProps = {
			icon, iconFontSize, text, textAlign, style,
			width, size, rounded, inverted, invalid, stacked, disabled,
			title: title || text,
			onClick: this.onToggleClick,
		};
		const chevronClass = new CssClass([menuOpen && 'mdi mdi-chevron-up' || 'mdi mdi-chevron-down', 'ef-abs-icon', 'ef-pos-top', 'ef-pos-rt']);
		if (style == 'accent') chevronClass.add('ef-ch-accent');
		if (style == 'link') chevronClass.add('ef-ch-link');
		const chevronStyle = disabled ? { opacity: .7 } : null;

		return (
			<div id={id} className={dropdownClass.css()} style={dropdownStyle} ref={(node) => { this.domNode = node; }}>
				<Button {...toggleProps} />
				{!hiddenChevron && <i className={chevronClass.css()} style={chevronStyle} />}
				{menuOpen && <DropdownMenu className={menuClassName} parent={this.domNode} items={items} position={position} menuWidth={menuWidth} dropup={dropup} offset={offset} noMaxHeight={noMaxHeight} onItemClick={this.onItemClick} />}
			</div>
		);
	}
}
