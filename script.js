// "MsSql": "Server=tcp:213.251.111.111\\MSSQL,1433;Database=CardRouteTest;User Id=sa;Password=Ostcard;TrustServerCertificate=True;",
// "Postgres": "Host=213.251.111.111;Port=5432;Database=CardRoute;Username=postgres;Password=Ostcard;"
// если в блоке ниже Provider выбран MsSql, то отображать эти данные, причем распарсенные по полям через ;

// name=value;name=value;name=value; - каждое поле надо отображать отдельно.
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

// console.log(parseConnString('Host=213.251.111.111;Port=5432;Database=CardRoute;Username=postgres;Password=Ostcard;'));

document.addEventListener('DOMContentLoaded', () => {
	fetch('./appsettings.json')
		.then((res) => res.json())
		.then((data) => {
			console.log('JSON загружен:', data);
			renderDbSettings(data);
		})
		.catch((err) => console.error(err));
});

function renderDbSettings(data) {
	const selectedProvider = data['Database']['Provider'];
	const connStringSettings = parseConnString(data['ConnectionStrings'][selectedProvider]);
	// console.log('settings', connStringSettings);
	// console.log(Object.entries(connStringSettings));

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
	console.log(selectedLang);
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
	console.log(connStringInputs);

	Object.entries(connStringSettings).map((entry) => {
		const div = document.createElement('div');
		div.className = 'field';

		const label = document.createElement('label');
		label.textContent = entry[0];

		const input = document.createElement('input');
		input.type = 'text';
		input.value = entry[1];

		div.appendChild(label);
		div.appendChild(input);
		connStringInputs.appendChild(div);
	});
}

