import * as React from 'react';
import * as classnames from 'classnames';
import { DropdownItemProps } from '../Dropdown';

import { EditorProps } from './editorProps';
export type CheckListProps = {
	text?: string;
	items: DropdownItemProps[];
	onSelect: (value) => void;
} & EditorProps;

export interface CheckListState {
	expanded: boolean;
}

export class CheckList extends React.Component<CheckListProps, CheckListState> {

	state = {
		expanded: false,
	}

	onToggleClick = () => {
		this.setState({ expanded: !this.state.expanded });
	}

	onSelect = (value) => () => {
		this.props.onSelect && this.props.onSelect(value);
	}

	render() {
		const { text, items, className, inverted, invalid, disabled } = this.props;
		const listClass = classnames(className, 'efc-checklist', { 'efc-checklist-exp': this.state.expanded }, { 'efc-inverted': inverted }, { 'efc-invalid': invalid }, { 'efc-disabled': disabled });
		const iconClass = this.state.expanded && 'mdi mdi-chevron-up' || 'mdi mdi-chevron-down';
		
		return (
			<div className={listClass}>
				<button disabled={disabled} className="btn" onClick={this.onToggleClick}>{text}<i className={iconClass} /></button>
				<div className="items">
					{items && items.map((val, index) =>
						<button key={val.value} id={`efc-checklist-item${index.toString()}`} className={`btn${val.selected && ' checked' || ''}`} onClick={this.onSelect(val.value)} title={val.title || val.text}>
							{val.text}<i className="mdi mdi-check" />
						</button>
					)}
				</div>
			</div>
		);
	}
}
