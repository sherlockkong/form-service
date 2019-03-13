
import { appReducer } from './reducer';
import { watchApp } from './saga';
import { AppState } from './interfaces';

export const reducers = {
	app: appReducer,
};

export interface ApplicationState {
	app: AppState;
};

export const sagas = [watchApp];

export * from './interfaces';
export * from './actions';