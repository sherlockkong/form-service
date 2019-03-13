import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../../store';
import { DateTimeOptional } from '../../../../../common/interfaces';
import { DropdownEditor } from '../../../../../common/components/editors/Dropdown';
import { getDefaultValue } from '../../../../../common/utils';

interface DateTimeConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class DateTimeBase extends React.Component<DateTimeConnectedProps> {

	onChange = (v) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const op = c.optional as DateTimeOptional;
		op.type = v;
		c.answer = getDefaultValue(c);

		dispatch(wsActionCreators.preview.updateControl(c));
	}

	render() {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		let control = controls.find(c => c.id === selected);
		let op = control.optional as DateTimeOptional;
		let items = ['dateTime', 'date', 'time'].map(x => ({ text: t(`ws!${x}`), value: x, selected: x === op.type }));

		return (
			<div className="sub-setting">
				<div className="st-title">{t('wsDateTimeType')}</div>
				<DropdownEditor text={t(`ws!${op.type}`)} items={items} onChange={this.onChange} />
			</div>
		);
	}
}

export const DateTime = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(DateTimeBase) as React.ComponentClass<{}>;