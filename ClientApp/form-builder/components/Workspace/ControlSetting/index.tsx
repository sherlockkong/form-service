import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../store';
import { Checkbox } from '../../../../common/components/Checkbox';
import { InputEditor } from '../../../../common/components/editors';
import { Control } from '../../../../common/interfaces';

import { FormHeader } from './Controls/FormHeader';
import { MultiChoice } from './Controls/MultiChoice';
import { Number } from './Controls/Number';
import { Radio } from './Controls/Radio';
import { DateTime } from './Controls/DateTime';
import { Rating } from './Controls/Rating';
import { File } from './Controls/File';

interface ControlSettingConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class ControlSettingBase extends React.Component<ControlSettingConnectedProps> {
	onQuestionChange = (control: Control, value: string) => {
		let newControl = { ...control, question: value };
		this.props.dispatch(wsActionCreators.preview.updateControl(newControl));
	}

	onDescriptionChange = (control: Control, value: string) => {
		let newControl = { ...control, description: value };
		this.props.dispatch(wsActionCreators.preview.updateControl(newControl));
	}

	onRequiredChange = (control: Control) => {
		let newControl = { ...control, required: !control.required };
		this.props.dispatch(wsActionCreators.preview.updateControl(newControl));
	}

	renderSubSettings = (c: Control) => {
		switch (c.type) {
			case 'multi-choice': return <MultiChoice />;
			case 'number': return <Number />;
			case 'rating': return <Rating />;
			case 'radio': return <Radio />;
			case 'file': return <File />;
			case 'date-time': return <DateTime />;
		}
	}

	render() {
		const { mainMenu: { formName, navSelected }, workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);

		return (
			<div className={classnames('ap-control-setting', { 'hidden': navSelected === 'preview' })}>
				{
					control && (
						<React.Fragment>
							<div className="cs-title">
								{t(`${control.type}!name`)}
							</div>
							<div className="common-setting">
								<div className="st-title">{t('wsQuestion')}</div>
								<InputEditor multiline value={control.question} onEveryChange={v => this.onQuestionChange(control, v)} />
								<div className="st-title">{t('wsDescription')}</div>
								<InputEditor multiline value={control.description} onEveryChange={v => this.onDescriptionChange(control, v)} />
							</div>
							{this.renderSubSettings(control)}
							<div className="check-wp">
								<Checkbox checked={control.required} value={control.required} text={t('wsRequired')} onChange={v => this.onRequiredChange(control)} />
							</div>
						</React.Fragment>
					)
					|| (
						<FormHeader />
					)
				}
			</div>
		);
	}
}

export const ControlSetting = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(ControlSettingBase) as React.ComponentClass<{}>;