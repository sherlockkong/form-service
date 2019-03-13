import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { ControlSelector } from './ControlSelector';
import { Preview } from './Preview';
import { ControlSetting } from './ControlSetting';

import { ApplicationState, wsActionCreators } from '../../store';

interface WorkspaceConnectedProps {
	dispatch: any;
	t: any;
}

@translate('app', { wait: true })
class WorkspaceBase extends React.Component<WorkspaceConnectedProps> {
	render() {
		return (
			<div className="ap-workspace">
				<ControlSelector />
				<Preview />
				<ControlSetting />
			</div>
		);
	}
}

export const Workspace = connect((state: ApplicationState) => ({
	//
}))(WorkspaceBase) as React.ComponentClass<{}>;