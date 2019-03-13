import { Control, ErrorDic } from "../../../common/interfaces";

export interface WorkspaceState {
	preview: PreviewState;
}

export interface PreviewState {
	selected: string;

	errorDic: ErrorDic;
	controls: Control[];
}