import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators } from '../../../../store';
import { Checkbox } from '../../../../../common/components/Checkbox';
import { InputEditor } from '../../../../../common/components/editors';
import { RatingOptional } from '../../../../../common/interfaces';
import { getDefaultValue } from '../../../../../common/utils';

interface RatingConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

interface RatingState {
	value: string;
}

@translate('app', { wait: true })
class RatingBase extends React.Component<RatingConnectedProps, RatingState> {

	onValueChange = (v) => {
		const { workspace: { preview: { controls, selected } }, dispatch } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const op = c.optional as RatingOptional;
		op.score = v;
		c.answer = getDefaultValue(c);
		dispatch(wsActionCreators.preview.updateControl(c));
	}

	renderScores = () => {
		const { workspace: { preview: { controls, selected } }, t } = this.props;
		const c = { ...controls.find(c => c.id === selected) };
		const op = c.optional as RatingOptional;

		const scores = ['3', '5', '10'];
		const toScoreItem = (score: string) => (
			<span
				key={score}
				className={`score-item ${op.score === score ? 'selected' : ''}`}
				onClick={() => this.onValueChange(score)}
			>
				{score}{t(`wsRatingScore`)}
			</span>
		);

		return (
			<div className="score-items">
				{scores.map((s) => toScoreItem(s))}
			</div>
		);
	}

	render() {
		const { t } = this.props;

		return (
			<React.Fragment>
				<div className="sub-setting">
					<div className="st-title">{t('wsRatingMax')}</div>
					{this.renderScores()}
				</div>
			</React.Fragment>
		);
	}
}

export const Rating = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(RatingBase) as React.ComponentClass<{}>;