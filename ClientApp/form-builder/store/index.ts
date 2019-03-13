import { MainMenuState, mmReducer, mmActionCreators, watchMainMenu } from './MainMenu';
import { WorkspaceState, wsReducer, wsActionCreators, watchWorkspace } from './Workspace';

export const reducers = {
	mainMenu: mmReducer,
	workspace: wsReducer,
};

export const sagas = [watchMainMenu, watchWorkspace];

export interface ApplicationState {
	mainMenu: MainMenuState,
	workspace: WorkspaceState,
};

export const actionCreators = {
	mainMenu: mmActionCreators,
	workspace: wsActionCreators,
};

export * from './MainMenu';
export * from './Workspace';