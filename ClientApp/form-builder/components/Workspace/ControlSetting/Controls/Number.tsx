import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../../store';
import { Checkbox } from '../../../../../common/components/Checkbox';
import { InputEditor, NumberEditor } from '../../../../../common/components/editors';
import { NumberOptional } from '../../../../../common/interfaces';
import { getDefaultValue } from '../../../../../common/utils';

interface NumberConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class NumberBase extends React.Component<NumberConnectedProps> {

	onValueChange = (v, invalid: boolean, type: 'min' | 'max' | 'step') => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const value = invalid ? c.answer as number : v;
		const op = c.optional as NumberOptional;
		switch (type) {
			case 'min': op.min = value; break;
			case 'max': op.max = value; break;
			case 'step': op.step = value; break;
		}
		c.answer = getDefaultValue(c);
		dispatch(wsActionCreators.preview.updateControl(c));
	}

	onBoolChange = (type: 'min' | 'max') => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const op = c.optional as NumberOptional;
		switch (type) {
			case 'min': op.minValidation = !op.minValidation; break;
			case 'max': op.maxValidation = !op.maxValidation; break;
		}
		dispatch(wsActionCreators.preview.updateControl(c));
	}

	render() {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);
		let op = control.optional as NumberOptional;

		return (
			<React.Fragment>
				<div className="number-check-setting">
					<div className="checkbox-wp">
						<Checkbox checked={op.minValidation} value="min" text={t('wsNumberMin')} onChange={() => this.onBoolChange('min')} />
					</div>
					<div className="number-wp">
						<NumberEditor value={op.min} onChange={(v, invalid) => this.onValueChange(v, invalid, 'min')} />
					</div>
				</div>
				<div className="number-check-setting">
					<div className="checkbox-wp">
						<Checkbox checked={op.maxValidation} value="max" text={t('wsNumberMax')} onChange={() => this.onBoolChange('max')} />
					</div>
					<div className="number-wp">
						<NumberEditor value={op.max} onChange={(v, invalid) => this.onValueChange(v, invalid, 'max')} />
					</div>
				</div>
				<div className="sub-setting">
					<div className="st-title">{t('wsNumberStep')}</div>
					<NumberEditor value={op.step} onChange={(v, invalid) => this.onValueChange(v, invalid, 'step')} />
				</div>
			</React.Fragment>
		);
	}
}

export const Number = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(NumberBase) as React.ComponentClass<{}>;