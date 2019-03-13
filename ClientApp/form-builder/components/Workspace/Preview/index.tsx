import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import * as classnames from 'classnames';
import RichTextEditor from 'react-rte';

import { ApplicationState, MainMenuState, WorkspaceState, wsActionCreators, mmActionCreators } from '../../../store';
import { Button } from '../../../../common/components/Button';
import { SingleLineText } from '../../../../common/preview/SingleLineText';
import { ParagraphText } from '../../../../common/preview/ParagraphText';
import { MultiChoice } from '../../../../common/preview/MultiChoice';
import { Number } from '../../../../common/preview/Number';
import { Rating } from '../../../../common/preview/Rating';
import { Radio } from '../../../../common/preview/Radio';
import { File } from '../../../../common/preview/File';
import { Phone } from '../../../../common/preview/Phone';
import { Email } from '../../../../common/preview/Email';
import { Website } from '../../../../common/preview/Website';
import { DateTime } from '../../../../common/preview/DateTime';
import { validateControlAnswer } from '../../../../common/utils';
import { InputEditor } from '../../../../common/components/editors';
import { DescriptionEditor } from './DescriptionEditor';

interface PreviewConnectedProps {
	workspace: WorkspaceState;
	mainMenu: MainMenuState;
	dispatch: any;
	t: any;
}

const emptyValue = RichTextEditor.createEmptyValue().toString('html');

@translate('app', { wait: true })
class PreviewBase extends React.Component<PreviewConnectedProps> {

	componentDidMount() {
		this.updateDescription();
	}
	componentDidUpdate() {
		const { mainMenu: { navSelected }, workspace: { preview: { controls, selected } } } = this.props;
		if (navSelected === 'design') {
			let index = controls.findIndex(c => c.id === selected);
			let ctl = document.querySelector(`.ctl-wp-${index}`);
			if (ctl) ctl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		}
		else {
			let error = document.querySelector('.error-msg');
			if (error) error.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
		}

		this.updateDescription();
	}
	updateDescription = () => {
		const { mainMenu: { formDescription } } = this.props;
		if (formDescription == emptyValue) return;

		let description = document.querySelector('.pv-description');
		if (description) {
			description.innerHTML = formDescription;
		}
	}

	onControlClick = (id: string) => {
		this.props.dispatch(wsActionCreators.preview.setSelected(id));
	}

	onDeleteClick = (e: any, id: string) => {
		e.stopPropagation();
		this.props.dispatch(wsActionCreators.preview.removeControl(id));
	}

	updateControlOrder = (e: any, id: string, offset: number) => {
		const { workspace: { preview: { controls } } } = this.props;
		let newControls = [...controls], index = controls.findIndex(c => c.id === id);
		let temp = newControls[index];
		newControls[index] = newControls[index + offset];
		newControls[index + offset] = temp;

		e.stopPropagation();
		this.props.dispatch(wsActionCreators.preview.setControls(newControls));
	}

	renderControl = (id: string, control: React.ReactElement<any>) => {
		const { mainMenu: { navSelected }, workspace: { preview: { selected, controls, errorDic } }, t } = this.props;
		const index = controls.findIndex(c => c.id == id);
		const c = controls[index];
		const classNames = classnames('ctl-wp', `ctl-wp-${index}`,
			{ 'selected': selected === id && navSelected !== 'preview' },
			{ 'required': c.required }
		);
		const canMoveUp = index > 0, canMoveDown = index < controls.length - 1;

		return (
			<div key={id} className={classNames} onClick={() => this.onControlClick(id)}>
				{control}
				<div className="indicator" />
				<Button className='up-btn' disabled={!canMoveUp} rounded style='transparent' size='small' icon="mdi mdi-arrow-up-bold-circle-outline" onClick={(e) => this.updateControlOrder(e, selected, -1)} />
				<Button className='down-btn' disabled={!canMoveDown} rounded style='transparent' size='small' icon="mdi mdi-arrow-down-bold-circle-outline" onClick={(e) => this.updateControlOrder(e, selected, 1)} />
				<Button className='delete-btn' rounded style='transparent' size='small' icon="mdi mdi-delete-forever" onClick={(e) => this.onDeleteClick(e, selected)} />
				{navSelected === 'preview' && errorDic[id] && <div className="error-msg">{t(errorDic[id])}</div>}
			</div>
		);
	}

	onChange = (v, id: string) => {
		const { workspace: { preview: { controls, errorDic } }, dispatch } = this.props;
		let newControls = [...controls];
		let c = newControls.find(x => x.id === id);
		if (c) {
			c.answer = v;
			dispatch(wsActionCreators.preview.setControls(newControls));

			let newDic = { ...errorDic };
			newDic[id] = validateControlAnswer(c);
			dispatch(wsActionCreators.preview.setErrorDic(newDic));
		}
	}

	renderControls = () => {
		const { mainMenu: { navSelected }, workspace: { preview: { controls } }, t } = this.props;

		return controls.map(c => {
			const pps = {
				control: c,
				designTime: navSelected === 'design',
				onChange: this.onChange,
			};
			switch (c.type) {
				case 'single-line-text': return this.renderControl(c.id, <SingleLineText {...pps} />);
				case 'paragraph': return this.renderControl(c.id, <ParagraphText {...pps} />);
				case 'multi-choice': return this.renderControl(c.id, <MultiChoice {...pps} />);
				case 'number': return this.renderControl(c.id, <Number {...pps} />);
				case 'rating': return this.renderControl(c.id, <Rating {...pps} />);
				case 'radio': return this.renderControl(c.id, <Radio {...pps} />);
				case 'file': return this.renderControl(c.id, <File {...pps} />);
				case 'date-time': return this.renderControl(c.id, <DateTime {...pps} />);
				case 'phone': return this.renderControl(c.id, <Phone {...pps} />);
				case 'email': return this.renderControl(c.id, <Email {...pps} />);
				case 'website': return this.renderControl(c.id, <Website {...pps} />);
			}
		});
	}

	onSaveClick = () => {
		const { workspace: { preview: { controls } }, dispatch } = this.props;
		let dic = {};
		controls.forEach(c => {
			dic[c.id] = validateControlAnswer(c);
		});

		dispatch(wsActionCreators.preview.setErrorDic(dic));
	}

	renderSetting = () => {
		const { mainMenu: { formName, navSelected }, workspace: { preview: { controls, selected } }, dispatch, t } = this.props;

		return (
			<div className="pv-setting" onClick={() => dispatch(wsActionCreators.preview.setSelected('setting'))}>
				<div className="pv-title">{formName}</div>
				<div className="pv-description"></div>
			</div>
		)
	}

	renderEditingSetting = () => {
		const { mainMenu: { formName }, dispatch } = this.props;

		return (
			<div className="pv-setting editing">
				<InputEditor
					value={formName}
					onEveryChange={(v) => dispatch(mmActionCreators.setFormName(v))}
				/>
				<DescriptionEditor />
			</div>
		)
	}

	renderHeader = () => {
		const { mainMenu: { formHeader } } = this.props;
		
		if (!formHeader.display) return null;
		return (
			<div className={`pv-header ${formHeader.align}`}> {formHeader.content} </div>
		)
	}

	render() {
		const { mainMenu: { navSelected }, workspace: { preview: { selected } }, t } = this.props;
		const previewSelected = navSelected === 'preview';
		const showEditingSetting = !previewSelected && selected === 'setting';

		return (
			<div className={classnames('ap-preview', { 'full': previewSelected })}>
				{this.renderHeader()}
				{showEditingSetting ? this.renderEditingSetting() : this.renderSetting()}
				{this.renderControls()}

				<div className="btn-group">
					<Button text={t('wsSave')} icon='mdi mdi-content-save' style='accent' onClick={this.onSaveClick} />
				</div>
			</div>
		);
	}
}

export const Preview = connect((state: ApplicationState) => ({
	mainMenu: state.mainMenu,
	workspace: state.workspace,
}))(PreviewBase) as React.ComponentClass<{}>;