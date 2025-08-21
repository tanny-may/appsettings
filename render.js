import { mockFetch } from './mockFetch.js';

export function setRenderHandlers() {
	document.addEventListener('DOMContentLoaded', () => {
		mockFetch('/api/settings/get')
			.then((res) => res.json())
			.then((data) => {
				renderSettingsForm(data);
			})
			.catch((err) => console.error(err));
	});

	// для отображения новых настроек при выборе другого провайдера
	const providerSelects = document.querySelectorAll('[name="provider"]');
	providerSelects.forEach((select) =>
		select.addEventListener('change', (event) => {
			mockFetch('/api/settings/get')
				.then((res) => res.json())
				.then((data) => {
					renderConnStringSettings(data, event.target.value);
				})
				.catch((err) => console.error(err));
		})
	);
}

function renderSettingsForm(data) {
	renderDbSettings(data);
	renderCommonSettings(data);
	renderLicense(data);
}

function renderDbSettings(data) {
	const selectedProvider = data['Database']['Provider'];
	const providerInput = document.getElementById('provider' + selectedProvider);
	providerInput.checked = true;

	renderConnStringSettings(data, selectedProvider);

	const commandTimeoutInput = document.getElementById('commandTimeout');
	commandTimeoutInput.value = data['Database']['CommandTimeout'];

	const maxPoolSize = document.getElementById('maxPoolSize');
	maxPoolSize.value = data['Database']['MaxPoolSize'];

	const minPoolSize = document.getElementById('minPoolSize');
	minPoolSize.value = data['Database']['MinPoolSize'];
}

function parseConnString(string) {
	const arr = string.split(';');
	const obj = {};

	for (const str of arr) {
		if (!str) continue;
		const [key, value] = str.split('=');
		obj[key] = value;
	}

	return obj;
}

function renderConnStringSettings(data, selectedProvider) {
	const connStringSettings = parseConnString(data['ConnectionStrings'][selectedProvider]);
	const connStringInputs = document.getElementById('connString');

	// очищаем старые настройки перед тем как заново их отрисовать
	while (connStringInputs.firstChild) {
		connStringInputs.removeChild(connStringInputs.lastChild);
	}

	Object.entries(connStringSettings).map(([key, value]) => {
		const div = document.createElement('div');
		div.className = 'field';

		const label = document.createElement('label');
		label.textContent = key;

		const input = document.createElement('input');
		input.type = 'text';
		input.name = key;
		input.value = value;

		div.appendChild(label);
		div.appendChild(input);
		connStringInputs.appendChild(div);
	});
}

function renderCommonSettings(data) {
	const selectedTheme = data['Settings']['Theme'];
	const theme = document.getElementById('theme' + selectedTheme);
	theme.checked = true;

	const areKiosksShown = data['Settings']['Kiosks'];
	const showKiosks = document.getElementById('kiosks' + areKiosksShown);
	showKiosks.checked = true;

	const isCancelActivate = data['Settings']['Cancel'];
	const showCancel = document.getElementById('cancel' + isCancelActivate);
	showCancel.checked = true;

	const selectedLang = data['Settings']['DefaultLang'];
	const lang = document.getElementById('lang' + selectedLang);
	lang.checked = true;

	const isAdminCancel = data['Settings']['NeedAdminToCancel'];
	const adminCancel = document.getElementById('adminCancel' + isAdminCancel);
	adminCancel.checked = true;

	const update = document.getElementById('update');
	update.value = data['Settings']['Update'];

	const statusesToCentral = document.getElementById('statusesToCentral');
	statusesToCentral.value = data['Settings']['StatusesToCentral'];
}

function renderLicense(data) {
	const license = document.getElementById('license');
	license.value = data['TrustCert']['Name'];
}