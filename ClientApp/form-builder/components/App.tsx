import * as React from 'react';
import { translate } from 'react-i18next';

import { MainMenu } from './MainMenu';
import { Workspace } from './Workspace';

@translate('app', { wait: true })
export class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<MainMenu />
				<Workspace />
			</React.Fragment>
		);
	}
}