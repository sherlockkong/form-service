import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../../store';
import { FileOptional } from '../../../../../common/interfaces';
import { DropdownEditor } from '../../../../../common/components/editors/Dropdown';
import { getDefaultValue } from '../../../../../common/utils';
import { InputEditor } from '../../../../../common/components/editors';

interface FileConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class FileBase extends React.Component<FileConnectedProps> {

	onChange = (v, type: 'max' | 'type' | 'custom') => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const op = c.optional as FileOptional;
		switch (type) {
			case 'max': op.max = v; break;
			case 'type': op.type = v; break;
			case 'custom': op.custom = v; break;
		}

		dispatch(wsActionCreators.preview.updateControl(c));
	}

	render() {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);
		let op = control.optional as FileOptional;
		let countItems = [1, 2, 3, 4, 5].map(x => ({ text: '' + x, value: x, selected: x === op.max }));
		let typeItems = ['no-limit', 'doc', 'img', 'video', 'audio', 'zip', 'custom']
			.map(x => ({ text: t(`wsFileType!${x}`), value: x, selected: x === op.type }));

		return (
			<React.Fragment>
				<div className="sub-setting">
					<div className="st-title">{t('wsFileMaxCount')}</div>
					<DropdownEditor text={'' + op.max} items={countItems} onChange={(v) => this.onChange(v, 'max')} />
				</div>
				<div className="sub-setting">
					<div className="st-title">{t('wsFileType')}</div>
					<DropdownEditor text={t(`wsFileType!${op.type}`)} items={typeItems} onChange={(v) => this.onChange(v, 'type')} />
				</div>
				{op.type !== 'no-limit' && <div className="sub-setting">
					<div className="st-title">{t(`wsFileType!${op.type}!tip`)}</div>
					{op.type === 'custom' && <InputEditor value={op.custom} onEveryChange={(v) => this.onChange(v, 'custom')} />}
				</div>}
			</React.Fragment>
		);
	}
}

export const File = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(FileBase) as React.ComponentClass<{}>;