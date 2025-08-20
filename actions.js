import { mockFetch } from './mockFetch.js';

export function setActions() {
	const settingsForm = document.getElementById('settingsForm');
	settingsForm.addEventListener('submit', handleFormSubmit);

	const restartServiceButton = document.getElementById('restartBtn');
	restartServiceButton.addEventListener('click', restartService);
}

function serializeForm(settingsForm) {
	const formData = new FormData(settingsForm);
	const obj = Object.fromEntries(formData.entries());
	return JSON.stringify(obj);
}

async function handleFormSubmit(event) {
	event.preventDefault();
	const response = await mockFetch('/api/settings/save', {
		method: 'PUT',
		body: serializeForm(event.target),
	});
	console.log(response);
}

async function restartService(event) {
	event.preventDefault();
	console.log('Сервис перезапущен');
	return await mockFetch('/api/tech/restart', {
		method: 'GET',
	});
}
