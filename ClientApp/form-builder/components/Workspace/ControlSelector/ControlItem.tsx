import * as React from 'react';
import * as classnames from 'classnames';
import { ControlType } from '../../../../common/interfaces';

export interface ControlItemProps {
	icon: string;
	text: string;
	type: ControlType;
	onClick: (type: ControlType) => void;
}

export class ControlItem extends React.Component<ControlItemProps> {
	render() {
		const { icon, text, type, onClick } = this.props;

		return (
			<div className="control-item" onClick={() => onClick(type)} >
				<span className={classnames('ci-icon', icon)} />
				<span className="ci-text">{text}</span>
			</div>
		);
	}
}