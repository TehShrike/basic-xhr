module.exports = function makeXhrFunction(inputOptions) {
	var options = Object.assign({
		method: 'GET',
		success: defaultSuccess,
		parse: defaultParse,
		serialize: defaultSerialize,
		headers: {},
	}, inputOptions)

	return function xhr(url, body) {
		return new Promise(function promise(resolve, reject) {
			var request = new XMLHttpRequest()
			request.addEventListener('load', handleResult)
			request.addEventListener('error', reject)
			request.addEventListener('abort', reject)
			request.open(options.method, url)

			Object.keys(options.headers).forEach(function(key) {
				request.setRequestHeader(key, options.headers[key])
			})

			if (typeof body === 'undefined') {
				request.send()
			} else {
				request.send(options.serialize(body))
			}

			function handleResult() {
				try {
					var response = options.parse(request)

					options.success(request) ? resolve(response) : reject(response)
				} catch (e) {
					reject(e)
				}
			}
		})
	}
}

function defaultSuccess(request) {
	return request.status >= 200 && request.status < 400
}

function defaultSerialize(body) {
	return JSON.stringify(body)
}

function defaultParse(request) {
	return JSON.parse(request.responseText)
}
