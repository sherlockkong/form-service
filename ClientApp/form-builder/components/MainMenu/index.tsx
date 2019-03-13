import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Nav } from './Nav';
import { Button } from '../../../common/components/Button';
import { InputEditor } from '../../../common/components/editors';
import { mmActionCreators, NavSection, MainMenuState, Form, Field } from '../../store/MainMenu';
import { BlockLoader } from '../../../common/components/BlockLoader';
import { Control, MultiChoiceOptional, RadioOptional, NumberOptional, RatingOptional } from '../../../common/interfaces';
import { ApplicationState, WorkspaceState, wsActionCreators } from '../../store';
import { getDefaultValue } from '../../../common/utils';

interface MainMenuConnectedProps {
	mainMenu: MainMenuState;
	workspace: WorkspaceState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class MainMenuBase extends React.Component<MainMenuConnectedProps> {

	_items = [{ value: 'design', text: this.props.t('mmDesign') }, { value: 'preview', text: this.props.t('mmPreview') }];

	componentWillMount = () => {
		const { t } = this.props;
		if (window.App.formId) this.props.dispatch(mmActionCreators.init());
		else this.props.dispatch(mmActionCreators.setFormName(t('mmUntitled')));
	}

	onSelectedChanged = (value: NavSection) => {
		this.props.dispatch(mmActionCreators.setNavSelected(value));

		if (value === 'design') {
			// Reset answer for design time.
			const { workspace: { preview: { controls } }, dispatch } = this.props;
			let newControls = [...controls];
			newControls.forEach(c => c.answer = getDefaultValue(c));
			dispatch(wsActionCreators.preview.setControls(newControls));

			// Reset error dic.
			dispatch(wsActionCreators.preview.setErrorDic({}));
		}
	}

	onSaveButtonClick = () => {
		const { mainMenu: { formName, formHeader, formDescription, formSettings }, workspace: { preview: { controls } }, dispatch } = this.props;
		const toField = (c: Control, i: number) => {
			let nc = { ...c };
			delete nc.answer;
			return { Index: i, Type: nc.type, FieldId: c.id, Detail: JSON.stringify(nc) };
		};
		let form: Form = {
			Name: formName,
			Header: JSON.stringify(formHeader),
			Description: formDescription,
			Fields: controls.map((c, i): Field => toField(c, i)),
			FieldsCount: controls.length,
			Settings: formSettings,
		};

		dispatch(mmActionCreators.saveForm(form));
	}

	onFormNameChange = (name: string) => {
		this.props.dispatch(mmActionCreators.setFormName(name));
	}

	render() {
		const { mainMenu: { formName, navSelected, busy }, workspace: { preview: { controls } }, t } = this.props;

		return (
			<div className="ap-main-menu">
				<div className="mm-header">
					<InputEditor className="h-name-editor" value={formName} onEveryChange={this.onFormNameChange} />
					<Button rounded size='small' disabled={controls.length === 0} text={t('mmSaveChange')} onClick={this.onSaveButtonClick} />
				</div>
				<div className="mm-nav">
					<Nav items={this._items} selected={navSelected} onSelectedChanged={this.onSelectedChanged} />
				</div>
				{busy && <BlockLoader inverted />}
			</div>
		);
	}
};

export const MainMenu = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(MainMenuBase) as React.ComponentClass<{}>;