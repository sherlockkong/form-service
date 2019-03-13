import * as React from 'react';
import * as classnames from 'classnames';

import { generateId } from '../../../common/utils';

export interface NavProps {
	items: { text: string, value: string }[];
	selected: string;
	onSelectedChanged: (selected: string) => void;
	disabled?: boolean;
	className?: string;
}

export class Nav extends React.Component<NavProps> {
	_id = `link-bar-${generateId()}`;
	_root = null;
	_linkBar = null;

	componentDidMount = () => {
		window.addEventListener('resize', this.updateLinkBar);
		this.updateLinkBar();
	}
	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateLinkBar);
	}
	componentDidUpdate = () => this.updateLinkBar();
	updateLinkBar = () => {
		let item = this._root.querySelector('.nav-item.selected');

		this._linkBar.style.left = `${item.offsetLeft}px`;
		this._linkBar.style.top = `${item.offsetTop + item.offsetHeight - 2}px`;
		this._linkBar.style.width = `${item.offsetWidth}px`;
	}

	onClick = (e: any) => {
		const { onSelectedChanged, selected } = this.props;

		if (e.target.classList.contains('nav-item')
			&& typeof onSelectedChanged === 'function'
			&& selected !== e.target.dataset.value) {

			onSelectedChanged(e.target.dataset.value);
		}
	}

	render() {
		const { items, className, selected, disabled } = this.props;

		return (
			<div ref={ref => this._root = ref} className={classnames('nav', { 'disabled': disabled }, { [className]: className })} onClick={this.onClick} >
				{items && items.map(item => <span data-value={item.value} key={item.value} className={classnames('nav-item', { 'selected': selected === item.value })}>{item.text}</span>)}
				<div ref={ref => this._linkBar = ref} id={this._id} className='link-bar' />
			</div>
		);
	}
}