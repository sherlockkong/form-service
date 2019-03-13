import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';
import RichTextEditor from 'react-rte';

import { ApplicationState, AppState, actionCreators } from '../store';
import { Control, FileOptional, FileAnswer } from '../../common/interfaces';
import { Button } from '../../common/components/Button';
import { BlockLoader } from '../../common/components/BlockLoader';

import { SingleLineText } from '../../common/preview/SingleLineText';
import { ParagraphText } from '../../common/preview/ParagraphText';
import { MultiChoice } from '../../common/preview/MultiChoice';
import { Number } from '../../common/preview/Number';
import { Rating } from '../../common/preview/Rating';
import { Radio } from '../../common/preview/Radio';
import { File } from '../../common/preview/File';
import { Phone } from '../../common/preview/Phone';
import { Email } from '../../common/preview/Email';
import { Website } from '../../common/preview/Website';
import { DateTime } from '../../common/preview/DateTime';
import { validateControlAnswer } from '../../common/utils';

interface AppConnectedProps {
	app: AppState;
	dispatch: any;
	t: any;
}

const emptyValue = RichTextEditor.createEmptyValue().toString('html');

@translate('app', { wait: true })
export class AppBase extends React.Component<AppConnectedProps> {

	componentDidUpdate() {
		let error = document.querySelector('.error-msg');
		if (error) error.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

		this.updateDescription();
	}

	componentWillMount() {
		this.props.dispatch(actionCreators.init());
	}

	componentDidMount() {
		this.updateDescription();
	}

	updateDescription = () => {
		const { app: { formDescription } } = this.props;
		if (formDescription == emptyValue) return;

		let description = document.querySelector('.pv-description');
		if (description) {
			description.innerHTML = formDescription;
		}
	}

	renderControl = (id: string, control: React.ReactElement<any>, c: Control) => {
		const { app: { errorDic }, t } = this.props;
		const classNames = classnames('ctl-wp',
			{ 'required': c.required }
		);
		return (
			<div key={id} className={classNames}>
				{control}
				{errorDic[id] && <div className="error-msg">{t(errorDic[id])}</div>}
			</div>
		);
	}

	onValueChange = (id: string, v: any) => {
		const { app: { controls, errorDic }, dispatch } = this.props;
		let index = controls.findIndex(c => c.id === id);
		if (index === -1) return;
		let ncs = [...controls];
		ncs[index] = { ...controls[index] };
		ncs[index].answer = v;
		dispatch(actionCreators.setControls(ncs));

		let newDic = { ...errorDic };
		newDic[id] = validateControlAnswer(ncs[index]);
		dispatch(actionCreators.setErrorDic(newDic));
	}

	renderControls = () => {
		const { app: { controls }, t } = this.props;

		return controls.map(c => {
			const pps = {
				control: c,
				designTime: false,
				onChange: v => this.onValueChange(c.id, v),
			};

			switch (c.type) {
				case 'single-line-text': return this.renderControl(c.id, <SingleLineText  {...pps} />, c);
				case 'paragraph': return this.renderControl(c.id, <ParagraphText  {...pps} />, c);
				case 'multi-choice': return this.renderControl(c.id, <MultiChoice  {...pps} />, c);
				case 'number': return this.renderControl(c.id, <Number  {...pps} />, c);
				case 'rating': return this.renderControl(c.id, <Rating  {...pps} />, c);
				case 'radio': return this.renderControl(c.id, <Radio  {...pps} />, c);
				case 'file': return this.renderControl(c.id, <File  {...pps} />, c);
				case 'date-time': return this.renderControl(c.id, <DateTime  {...pps} />, c);
				case 'phone': return this.renderControl(c.id, <Phone  {...pps} />, c);
				case 'email': return this.renderControl(c.id, <Email  {...pps} />, c);
				case 'website': return this.renderControl(c.id, <Website  {...pps} />, c);
			}
		});
	}

	onSaveClick = () => {
		const { app: { controls }, dispatch } = this.props;
		let dic = {}, hasError = false;
		controls.forEach(c => {
			let errorKey = validateControlAnswer(c);
			if (errorKey) {
				hasError = true;
				dic[c.id] = errorKey;
			}
		});

		dispatch(actionCreators.setErrorDic(dic));
		if (!hasError) this.props.dispatch(actionCreators.save());
	}

	renderHeader = () => {
		const { app: { formHeader } } = this.props;

		if (!formHeader.display) return null;
		return (
			<div className={`pv-header ${formHeader.align}`}> {formHeader.content} </div>
		)
	}

	renderSetting = () => {
		const { app: { formName } } = this.props;

		return (
			<div className="pv-setting">
				<div className="pv-title">{formName}</div>
				<div className="pv-description"></div>
			</div>
		)
	}

	render() {
		const { app: { busy, submitted }, t } = this.props;

		return (
			<div className="ap-preview full">
				{this.renderHeader()}
				{this.renderSetting()}
				{this.renderControls()}
				<div className="btn-group">
					<Button onClick={this.onSaveClick} text={t('apSave')} icon='mdi mdi-content-save' style='accent' disabled={submitted} />
				</div>
				{busy && <BlockLoader inverted />}
				{submitted && <div className="submitted-tip">{t('apSubmittedTip')}</div>}
			</div>
		);
	}
}

export const App = connect((state: ApplicationState) => ({
	app: state.app,
}))(AppBase) as React.ComponentClass<{}>;