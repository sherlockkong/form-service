import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators, mmActionCreators, Align } from '../../../../store';
import { Checkbox } from '../../../../../common/components/Checkbox';
import { InputEditor, DropdownEditor } from '../../../../../common/components/editors';

interface FormHeaderConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class FormHeaderBase extends React.Component<FormHeaderConnectedProps> {

	onChange = (v: string) => {
		const { mainMenu: { formHeader }, t } = this.props;
		this.props.dispatch(mmActionCreators.setFormHeader({ ...formHeader, ...{ content: v } }));
	}

	onDisplayChange = (v) => {
		const { mainMenu: { formHeader }, t } = this.props;
		this.props.dispatch(mmActionCreators.setFormHeader({ ...formHeader, ...{ display: v } }));
	}

	onAlignChange = (v: Align) => {
		const { mainMenu: { formHeader }, t } = this.props;
		this.props.dispatch(mmActionCreators.setFormHeader({ ...formHeader, ...{ align: v } }));
	}

	renderAlign = () => {
		const { mainMenu: { formHeader }, t } = this.props;
		const aligns: Align[] = ['left', 'center', 'right'];
		const icons = ['mdi-format-align-left', 'mdi-format-align-center', 'mdi-format-align-right'];
		const toAlignItem = (align: Align, i: number) => (
			<span
				key={align}
				className={`align-item mdi ${icons[i]} ${formHeader.align === align ? 'selected' : ''}`}
				onClick={() => this.onAlignChange(align)}
			/>
		);

		return (
			<div className="align-items">
				{aligns.map((a, i) => toAlignItem(a, i))}
			</div>
		);
	}

	render() {
		const { mainMenu: { formHeader }, t } = this.props;
		let items = [
			{ text: t('wsShow'), value: true, selected: formHeader.display },
			{ text: t('wsHide'), value: false, selected: formHeader.display === false },
		];

		return (
			<React.Fragment>
				<div className="cs-title">
					{t(`wsEditFormHeader`)}
				</div>
				<div className="common-setting">
					<div className="st-title">{t('wsDisplayFormHeader')}</div>
					<DropdownEditor text={t(formHeader.display ? 'wsShow' : 'wsHide')} items={items} onChange={this.onDisplayChange} />
				</div>
				<div className="common-setting">
					<div className="st-title">{t('wsFormHeaderContent')}</div>
					<InputEditor value={formHeader.content} onEveryChange={v => this.onChange(v)} />
				</div>
				<div className="common-setting">
					<div className="st-title">{t('wsFormHeaderAlign')}</div>
					{this.renderAlign()}
				</div>
			</React.Fragment>
		);
	}
}

export const FormHeader = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(FormHeaderBase) as React.ComponentClass<{}>;