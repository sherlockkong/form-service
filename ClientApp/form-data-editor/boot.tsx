import './styles/themes/index.scss';
import 'whatwg-fetch';
import '@babel/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { i18Instance } from './i18n';

import { App } from './components/App';

window.App.i18n = i18Instance;

const store = configureStore();
window.App.dispatch = store.dispatch;

const rootElement = document.getElementById('app');
ReactDOM.render(
	<Provider store={store}>
		<I18nextProvider i18n={i18Instance}>
			<App />
		</I18nextProvider>
	</Provider>,
	rootElement
);