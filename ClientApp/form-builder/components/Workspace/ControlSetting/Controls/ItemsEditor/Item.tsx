import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { WorkspaceState, MainMenuState, ApplicationState } from '../../../../../store';
import { InputEditor } from '../../../../../../common/components/editors';
import { Button } from '../../../../../../common/components/Button';
import { ItemModel } from '../../../../../../common/interfaces';

export interface ItemProps {
	index: number;
	item: ItemModel;
	selected: boolean;
	canMoveUp: boolean;
	canMoveDown: boolean;
	canDelete: boolean;
	onLabelChange: (label: string, index: number) => void;
	onDelete: (index: number) => void;
	onMoveUp: (index: number) => void;
	onMoveDown: (index: number) => void;
	onSelected: (value: string) => void;
};

export class Item extends React.Component<ItemProps> {
	render() {
		const { index, item, selected, canDelete, canMoveDown, canMoveUp, onDelete, onMoveDown, onMoveUp, onLabelChange, onSelected } = this.props;

		return (
			<div className={`op-item item-${item.value} ${selected ? 'selected' : ''}`}>
				<InputEditor value={item.label} onFocus={() => onSelected(item.value)} onEveryChange={(v) => onLabelChange(v, index)} />
				<div className="btn-ct">
					<Button className='up-btn' disabled={!canMoveUp} rounded style='transparent' size='small' icon="mdi mdi-arrow-up-bold-circle-outline" onClick={(e) => onMoveUp(index)} />
					<Button className='down-btn' disabled={!canMoveDown} rounded style='transparent' size='small' icon="mdi mdi-arrow-down-bold-circle-outline" onClick={(e) => onMoveDown(index)} />
					<Button className='delete-btn' disabled={!canDelete} rounded style='transparent' size='small' icon="mdi mdi-delete-forever" onClick={(e) => onDelete(index)} />
				</div>
			</div>
		);
	}
}