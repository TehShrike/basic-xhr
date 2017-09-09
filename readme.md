The bare-bones XMLHttpRequest wrapper that I use when I want to use XHR.

Set up some options, make a request, get back a promise.

Requires ES2015 shims (`Promise`, `Object.assign`, `Object.keys`).

# API

```js
const createRequestFunction = require('basic-xhr')
```

The module exports a function that takes options and returns a re-usable XHR function.

## `makeXhr` = `createRequestFunction(options)`

```js
const get = createRequestFunction()

get('/some/nifty/api?cool=yes').then(responseBody => {
	console.log(responseBody.valueFromServer)
})
```

### Options

- `method`: string, defaults to `'GET'`
- `success`: function, defaults to `request => request.status >= 200 && request.status < 400`
- `parse`: function, defaults to `request => JSON.parse(request.responseText)`
- `serialize`: function, defaults to `body => JSON.stringify(body)`
- `headers`: object, defaults to `{}`

## `promise = makeXhr(url, body)`

Returns a promise that is rejected if `success` returns false, if the XHR emits `error` or `abort`, or if the `parse` function throws.

The promise is resolved with whatever `parse` returns.

# Snippets you can copy/paste

```js
const createRequestFunction = require('basic-xhr')

const post = createRequestFunction({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
})

const response = post('/person', { name: 'Cool guy' })
```

If you have any common use cases, add a new snippet here.

# License

[WTFPL](http://wtfpl2.com)
