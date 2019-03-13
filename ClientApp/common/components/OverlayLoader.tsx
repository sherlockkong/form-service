import * as React from 'react';

export type OverlayLoaderProps = {
	text?: string;
}

export class OverlayLoader extends React.Component<OverlayLoaderProps, any> {
	render() {
		return (
			<div className="ef-overlay-loader">
				<span>{this.props.text || 'Getting Ready'}</span>
				<div className="spinner">
					<div className="bounce1"></div>
					<div className="bounce2"></div>
					<div className="bounce3"></div>
				</div>
			</div>
		);
	}
}
