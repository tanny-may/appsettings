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

export function renderSettingsForm(data) {
	const selectedProvider = data['Database']['Provider'];
	const connStringSettings = parseConnString(data['ConnectionStrings'][selectedProvider]);

	const providerInput = document.getElementById('provider' + selectedProvider);
	providerInput.checked = true;

	const commandTimeoutInput = document.getElementById('commandTimeout');
	commandTimeoutInput.value = data['Database']['CommandTimeout'];

	const maxPoolSize = document.getElementById('maxPoolSize');
	maxPoolSize.value = data['Database']['MaxPoolSize'];

	const minPoolSize = document.getElementById('minPoolSize');
	minPoolSize.value = data['Database']['MinPoolSize'];

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

	const license = document.getElementById('license');
	license.value = data['TrustCert']['Name'];

	const connStringInputs = document.getElementById('connString');

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
