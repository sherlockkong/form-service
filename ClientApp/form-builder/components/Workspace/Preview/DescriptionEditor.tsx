import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import RichTextEditor from 'react-rte';
import { ApplicationState, WorkspaceState, MainMenuState, mmActionCreators } from '../../../store';

export interface DescriptionEditorConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
};

export interface DescriptionEditorState {
	value: any;
};

@translate('app', { wait: true })
class DescriptionEditorBase extends React.Component<DescriptionEditorConnectedProps, DescriptionEditorState> {
	state = {
		value: null,
	}

	componentDidMount() {
		this.initValue(this.props);
	}
	componentWillReceiveProps(nextProps: DescriptionEditorConnectedProps) {
		this.initValue(nextProps);
	}
	initValue = (props: DescriptionEditorConnectedProps) => {
		if (this.state.value === null && props.mainMenu.formDescription ) {
			this.setState({ value: RichTextEditor.createValueFromString(props.mainMenu.formDescription, 'html') });
		}
	}

	onChange = (value: any) => {
		this.setState({ value });

		this.props.dispatch(mmActionCreators.setFormDescription(value.toString('html')));
	}

	render() {
		if (this.state.value === null) return null;

		return (
			<RichTextEditor
				value={this.state.value}
				onChange={this.onChange}
			/>
		);
	}
}

export const DescriptionEditor = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
}))(DescriptionEditorBase) as React.ComponentClass<{}>;