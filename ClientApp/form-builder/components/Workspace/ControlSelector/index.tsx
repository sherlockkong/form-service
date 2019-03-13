import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState } from '../../../store';
import { wsActionCreators } from '../../../store/Workspace';
import { ControlItem } from './ControlItem';
import { getControlIcon } from './utils';
import { ControlType } from '../../../../common/interfaces';

interface ControlSelectorConnectedProps {
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

const items: ControlType[] = ['single-line-text', 'paragraph', 'multi-choice', 'number', 'rating', 'radio', 'file', 'date-time', 'phone', 'email', 'website'];

@translate('app', { wait: true })
class ControlSelectorBase extends React.Component<ControlSelectorConnectedProps> {

	onItemClick = (type: ControlType) => {
		this.props.dispatch(wsActionCreators.preview.addControl(type));
	}

	renderItems = () => {
		const { t } = this.props;
		const doms = [];
		items.forEach((item, i) => {
			doms.push(<ControlItem key={item} icon={getControlIcon(item)} text={t(`${item}!name`)} type={item} onClick={this.onItemClick} />);
			if ([3, 7].indexOf(i) !== -1) doms.push(<div key={i} className='cs-sep' />)
		});
		return doms;
	}

	render() {
		const { mainMenu: { formName, navSelected }, t } = this.props;

		return (
			<div className={classnames('ap-control-selector', { 'hidden': navSelected === 'preview' })}>
				{this.renderItems()}
			</div>
		);
	}
}

export const ControlSelector = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
}))(ControlSelectorBase) as React.ComponentClass<{}>;