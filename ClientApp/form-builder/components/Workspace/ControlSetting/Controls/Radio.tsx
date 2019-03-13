import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../../store';
import { InputEditor } from '../../../../../common/components/editors';
import { RadioOptional, ItemModel } from '../../../../../common/interfaces';
import { Button } from '../../../../../common/components/Button';
import { generateId } from '../../../../../common/utils';
import { Item } from './ItemsEditor/Item';

interface RadioConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

interface RadioState {
	selected: string;
}

@translate('app', { wait: true })
class RadioBase extends React.Component<RadioConnectedProps, RadioState> {

	state = { selected: '' };
	_dom = null;

	componentDidMount() {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);
		let op = control.optional as RadioOptional;

		if (op.items.length > 0) {
			this.setState({ selected: op.items[0].value });
		}
	}

	componentDidUpdate() {
		if (this._dom) {
			let st = this._dom.querySelector(`.item-${this.state.selected}`);
			if (st) st.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
		}
	};

	onLabelChange = (label: string, index: number) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		let c = JSON.parse(JSON.stringify(controls.find(c => c.id === selected)));
		let op = c.optional as RadioOptional;
		op.items[index].label = label;

		dispatch(wsActionCreators.preview.updateControl(c));
	}
	onDelete = (index: number) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		let c = JSON.parse(JSON.stringify(controls.find(c => c.id === selected)));
		let op = c.optional as RadioOptional;
		op.items = op.items.filter((x, i) => i !== index);

		dispatch(wsActionCreators.preview.updateControl(c));
	}
	onMoveUp = (index: number) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		let c = JSON.parse(JSON.stringify(controls.find(c => c.id === selected)));
		let op = c.optional as RadioOptional;
		let temp = op.items[index];
		op.items[index] = op.items[index - 1];
		op.items[index - 1] = temp;

		dispatch(wsActionCreators.preview.updateControl(c));
	}
	onMoveDown = (index: number) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		let c = JSON.parse(JSON.stringify(controls.find(c => c.id === selected)));
		let op = c.optional as RadioOptional;
		let temp = op.items[index];
		op.items[index] = op.items[index + 1];
		op.items[index + 1] = temp;

		dispatch(wsActionCreators.preview.updateControl(c));
	}
	onAddClick = (index: number) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		let c = JSON.parse(JSON.stringify(controls.find(c => c.id === selected)));
		let op = c.optional as RadioOptional;
		let value = generateId(op.items.map(x => x.value));
		op.items = [...op.items, { label: '', value }];

		dispatch(wsActionCreators.preview.updateControl(c));
		this.setState({ selected: value });
	}

	renderItems = (items: ItemModel[]) => {
		return (
			<div className="items-editor" ref={x => this._dom = x} >
				{items.map((it, i) => (<Item
					selected={this.state.selected === it.value}
					key={i}
					index={i} item={it}
					canMoveUp={i !== 0}
					canMoveDown={i !== items.length - 1}
					canDelete={items.length > 1}
					onLabelChange={this.onLabelChange}
					onDelete={this.onDelete}
					onMoveUp={this.onMoveUp}
					onMoveDown={this.onMoveDown}
					onSelected={(i) => this.setState({ selected: i })}
				/>))}
			</div>
		);
	}

	render() {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);
		let op = control.optional as RadioOptional;

		return (
			<div className="sub-setting">
				<div className="st-title">{t('wsRadioItems')}</div>
				{this.renderItems(op.items)}
				<Button className='add-btn' rounded size='small' style='transparent' icon="mdi mdi-plus" onClick={this.onAddClick} />
			</div>
		);
	}
}

export const Radio = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(RadioBase) as React.ComponentClass<{}>;