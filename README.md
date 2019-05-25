![GitHub package.json version](https://img.shields.io/github/package-json/v/nahue-f/property-waterfall.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/nahue-f/property-waterfall.svg)
![dependencies](https://img.shields.io/badge/dependencies-0-blue.svg)

# property-waterfall

Looks for a valid value in an object, iterating over a priority ordered array of keys.

# Installation
```sh
npm i --save property-waterfall
```

# Usage
```js
const propertyWaterfall = require('property-waterfall')

// Look for IP in the following keys, in order.
const order = ['ip', 'x-forwarded-for', 'x-real-ip']

// IP could be in any of this objects, containing `order` keys.
const object = {
  ...req.headers,
  ...req.query
}

const ip = propertyWaterfall(object, order)

// If object['ip'] has a valid value, it will be returned,
// else look for object['x-forwarded-for'],
// else object['x-real-ip'].
// According to order array priorities.
```
