import * as React from 'react';
import * as classnames from 'classnames';
import { translate } from 'react-i18next';

import { Control, FileOptional, FileAnswer, FileAnswerModel } from '../interfaces';
import { Button } from '../components/Button';

export interface FileProps {
	control: Control;
	designTime?: boolean;
	onChange?: (value: string, id: string) => void;
}

interface ConnectedProps {
	t?: any;
}

@translate('app', { wait: true })
export class File extends React.Component<FileProps & ConnectedProps> {

	_input: HTMLInputElement;
	_replaceInput: HTMLInputElement;
	_replaceIndex: number = -1;

	componentDidMount() {
		this.updateInput();
		this.updateReplaceInput();
	}

	componentWillUnmount() {
		this._input.removeEventListener('change', this.onFileChange);
		this._input = null;

		this._replaceInput.removeEventListener('change', this.onReplaceFileChange);
		this._replaceInput = null;
	}

	updateInput = () => {
		if (this._input) {
			this._input.removeEventListener('change', this.onFileChange);
			this._input = null;
		}

		this._input = document.createElement('input');
		this._input.type = 'file';
		this._input.multiple = true;
		this._input.addEventListener('change', this.onFileChange);
	}

	updateReplaceInput = () => {
		if (this._replaceInput) {
			this._replaceInput.removeEventListener('change', this.onReplaceFileChange);
			this._replaceInput = null;
		}

		this._replaceInput = document.createElement('input');
		this._replaceInput.type = 'file';
		this._replaceInput.addEventListener('change', this.onReplaceFileChange);
	}

	getFileAccept = () => {
		const { control: { optional } } = this.props;
		const op = optional as FileOptional;

		switch (op.type) {
			case 'doc': return '.txt,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.wps,.rtf,.hlp';
			case 'img': return '.jpg,.jpeg,.png,.gif,.bmp,.psd,.tif';
			case 'video': return '.mkv,.mp4,.avi,.swf,.wmv,.rmvb,.mov,.mpg';
			case 'audio': return '.mp3,.flac,.ape,.wma,.wav,.aac,.m4a,.au,.ram,.mmf,.aif';
			case 'zip': return '.rar,.zip,.7z,.gz,.arj,.z';
			case 'custom': {
				let a = (op.custom || '').replace(/[，\.]/g, ',').split(',');
				return a.map(x=>`.${a}`).join(',');
			}
		}
	}

	onFileClick = () => {
		this.updateInput();
		this._input.accept = this.getFileAccept();
		console.log(this._input.accept);
		this._input.click();
	}

	onFileChange = () => {
		const { control: { id, answer, optional }, onChange } = this.props;
		const op = optional as FileOptional;
		let ans: FileAnswerModel[] = [];
		if (answer) ans = JSON.parse(answer as string) as FileAnswerModel[];

		if (onChange && this._input.files.length > 0) {
			let count = Math.min(this._input.files.length, op.max - ans.length);
			for (let i = 0; i < count; i++) {
				let file = this._input.files[i];
				let reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					let model: FileAnswerModel = {
						name: file.name,
						content: reader.result as string,
					};
					ans.push(model)
					onChange(JSON.stringify(ans), id);
				}
				reader.onerror = (error) => console.error(error);
			}
		}
	}

	onReplaceFileChange = () => {
		const { control: { id, answer }, onChange } = this.props;
		let ans: FileAnswerModel[] = [];
		if (answer) ans = JSON.parse(answer as string) as FileAnswerModel[];

		if (onChange && this._replaceInput.files.length > 0) {
			let file = this._replaceInput.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let model: FileAnswerModel = {
					name: file.name,
					content: reader.result as string,
				};
				ans[this._replaceIndex] = model;
				onChange(JSON.stringify(ans), id);
			}
			reader.onerror = (error) => console.error(error);
		}
	}

	renderFiles = () => {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange, t } = this.props;
		let ans: FileAnswerModel[] = [];
		if (answer) ans = JSON.parse(answer as string) as FileAnswerModel[];

		const toFileItem = (file: FileAnswerModel, i: number) => {
			const onReplaceClick = () => {
				this.updateReplaceInput();
				this._replaceIndex = i;
				this._replaceInput.accept = this.getFileAccept();
				this._replaceInput.click();
			};
			const onDeleteClick = () => {
				ans.splice(i, 1);
				onChange(JSON.stringify([...ans]), id);
			};

			return (
				<div className="file-item" key={i}>
					<span className="fi-name">{file.name}</span>
					<span className="fi-replace icon-btn" onClick={onReplaceClick}>{t('wsFileReplace')}</span>
					<span className="fi-delete icon-btn" onClick={onDeleteClick}>{t('wsFileDelete')}</span>
				</div>
			);
		};

		return ans.map((file, i) => toFileItem(file, i));
	}

	render() {
		const { designTime, control: { id, type, question, required, answer, description, optional }, onChange } = this.props;
		const op = optional as FileOptional;
		let ans: FileAnswerModel[] = [];
		if (answer) ans = JSON.parse(answer as string) as FileAnswerModel[];

		return (
			<div className="file ctl-pv">
				<div className='question'>{question}</div>
				{description && <div className='description'>{description}</div>}
				{this.renderFiles()}
				{ans.length < op.max && <Button
					disabled={designTime}
					className='file-input'
					icon='mdi mdi-file-plus'
					style='transparent'
					text={(optional as FileOptional).placeholder}
					onClick={this.onFileClick}
				/>}
				{!designTime && <div className="sp" />}
			</div>
		);
	}
}