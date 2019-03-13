import * as React from 'react';
import { CssClass } from './utils';

// Prop types
export type BlockLoaderProps = {
	id?: string;
	loaderStyle?: 'default' | 'pulse';
	background?: 'none' | 'light' | 'dark' | 'normal';
	inverted?: boolean;
}

export class BlockLoader extends React.Component<BlockLoaderProps, any> {
	public render() {
		const { id, loaderStyle, inverted, background } = this.props;

		const loaderClass = new CssClass(['ef-block-loader']);
		if (loaderStyle === 'pulse') loaderClass.add('style-pulse');
		else loaderClass.add('style-default');
		if (background === 'light') loaderClass.add('style-bg-lt');
		if (background === 'normal') loaderClass.add('style-bg');
		if (background === 'dark') loaderClass.add('style-bg-dk');
		if (inverted) loaderClass.add('ef-inverted');

		return (
			<div id={id} className={loaderClass.css()}>
				{loaderStyle === 'pulse' && <div />}
				{loaderStyle !== 'pulse' && <div><div /><div /><div /></div>}
			</div>
		);
	}
}
