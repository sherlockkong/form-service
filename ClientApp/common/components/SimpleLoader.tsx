import * as classnames from 'classnames';
import * as React from 'react';

export type SimpleLoaderProps = {
	style?: 'accent' | 'white' | 'text';
	inverted?: boolean;
	cssProps?: React.CSSProperties;
	
}

export const SimpleLoader: React.StatelessComponent<SimpleLoaderProps> = (props) => {
	const { style, inverted, cssProps } = props;

	const loaderClass = classnames(
		'ef-simple-loader',
		{ 'ef-simple-loader--style-white': style === 'white' },
		{ 'ef-simple-loader--style-accent': style === 'accent' },
		{ 'ef-inverted': inverted === true },
	);

	return (
		<div className={loaderClass} style={cssProps}>
			<div />
		</div>
	);
}

