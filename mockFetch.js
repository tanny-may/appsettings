export async function mockFetch(url, params) {
	if (baseUrl != 'localhost') {
		return fetch(baseUrl + url, params);
	}

	let data = {};
	if (url === '/api/settings/get') {
		const response = await fetch('./appsettings.json', params);
		data = await response.json();
	}

	console.log(`mockFetch: url=${url}, params=${JSON.stringify(params)}, responseData=${JSON.stringify(data)}`);

	return {
		ok: true,
		status: 200,
		json: async () => data,
	};
}