import { mockFetch } from './mockFetch.js';

export function setActions() {
	const settingsForm = document.getElementById('settingsForm');
	settingsForm.addEventListener('submit', handleFormSubmit);

	const restartServiceButton = document.getElementById('restartBtn');
	restartServiceButton.addEventListener('click', handleRestartService);
}

async function handleFormSubmit(event) {
	event.preventDefault();
	await mockFetch('/api/settings/save', {
		method: 'PUT',
		body: serializeForm(event.target),
	});
	console.log('Форма сохранена');
}

function serializeForm(settingsForm) {
	const formData = new FormData(settingsForm);
	const obj = Object.fromEntries(formData.entries());
	return JSON.stringify(obj);
}

async function handleRestartService(event) {
	event.preventDefault();
	await mockFetch('/api/tech/restart', {
		method: 'GET',
	});
	console.log('Сервис перезапущен');
}
