import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';

import RT from 'react-rating';

import { Control, RatingOptional } from '../interfaces';

export interface RatingProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value, id: string) => void;
}

export class Rating extends React.Component<RatingProps> {
	onRatingChange = (v) => {
		const { control: { id, answer }, onChange } = this.props;
		if (onChange) onChange(v, id);
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		if (type !== 'rating') return null;

		return (
			<div className="rating ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				<RT className="rc" readonly={designTime}
					emptySymbol='mdi mdi-star-outline'
					fullSymbol='mdi mdi-star'
					fractions={2}
					initialRating={parseFloat(answer as string)}
					onChange={this.onRatingChange}
					stop={parseInt((optional as RatingOptional).score)}
				/>
				{!designTime && <div className="sp" />}
			</div>
		);
	}
}