import { ControlType, Control, ErrorDic } from "../../../common/interfaces";

// Reducer Actions ------------------------------------------------ //

// Preview
export interface WsPvSetSelectedAction { type: 'App/Ws/PvSetSelected', payload: { selected: string } };
export interface WsPvSetControlsAction { type: 'App/Ws/PvSetControls', payload: { controls: Control[] } };
export interface WsPvAddControlAction { type: 'App/Ws/PvAddControl', payload: { type: ControlType } };
export interface WsPvUpdateControlAction { type: 'App/Ws/PvUpdateControl', payload: { control: Control } };
export interface WsPvRemoveControlAction { type: 'App/Ws/PvRemoveControl', payload: { id: string } };
export interface WsPvSetErrorDicAction { type: 'App/Ws/PvSetErrorDic', payload: { errorDic: ErrorDic } };

const pvSetSelected = (selected: string): WsPvSetSelectedAction => ({ type: 'App/Ws/PvSetSelected', payload: { selected } });
const pvSetControls = (controls: Control[]): WsPvSetControlsAction => ({ type: 'App/Ws/PvSetControls', payload: { controls } });
const pvAddControl = (type: ControlType): WsPvAddControlAction => ({ type: 'App/Ws/PvAddControl', payload: { type } });
const pvUpdateControl = (control: Control): WsPvUpdateControlAction => ({ type: 'App/Ws/PvUpdateControl', payload: { control } });
const pvRemoveControl = (id: string): WsPvRemoveControlAction => ({ type: 'App/Ws/PvRemoveControl', payload: { id } });
const pvSetErrorDic = (errorDic: ErrorDic): WsPvSetErrorDicAction => ({ type: 'App/Ws/PvSetErrorDic', payload: { errorDic } });

type PvReducerAction = WsPvSetSelectedAction | WsPvSetControlsAction | WsPvAddControlAction | WsPvRemoveControlAction | WsPvUpdateControlAction | WsPvSetErrorDicAction;

// 
export type WsReducerAction = PvReducerAction;

// Action Creators ------------------------------------------------ //
export const wsActionCreators = {
	preview: {
		setSelected: pvSetSelected,
		setControls: pvSetControls,
		addControl: pvAddControl,
		updateControl: pvUpdateControl,
		removeControl: pvRemoveControl, 
		setErrorDic: pvSetErrorDic,
	}
};