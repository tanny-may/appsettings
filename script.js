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
	console.log(connStringSettings);

	const providerInput = document.getElementById('provider' + selectedProvider);
	providerInput.checked = true;

	const connStringInputs = document.getElementById('connString');
	console.log(connStringInputs);
	connStringInputs.appendChild();
}
