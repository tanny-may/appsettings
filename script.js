import { setActions } from './actions.js';
import { mockFetch } from './mockFetch.js';
import { renderSettingsForm } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
	mockFetch('/api/settings/get')
		.then((res) => res.json())
		.then((data) => {
			console.log('JSON загружен:', data);
			renderSettingsForm(data);
		})
		.catch((err) => console.error(err));
});

setActions();
