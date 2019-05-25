'use strict'

const assert = require('assert')
const propertyWaterfall = require('./')

// Simple order tests.
const obj1 = {
  ballon: 'round',
  box: 'square',
  pyramid: 'triangle'
}

const order1 = ['pyramid', 'ballon', 'box']
assert.deepStrictEqual(propertyWaterfall(obj1, order1), 'triangle')

const order2 = ['box', 'pyramid', 'bar']
assert.deepStrictEqual(propertyWaterfall(obj1, order2), 'square')

const order3 = ['bar', 'foo', 'ballon']
assert.deepStrictEqual(propertyWaterfall(obj1, order3), 'round')

const order4 = ['pyramid']
assert.deepStrictEqual(propertyWaterfall(obj1, order4), 'triangle')

// Falsy values tests.
const obj2 = {
  bar: null,
  foo: undefined,
  foobar: 0,
  baz: 'value',
  bazfoo: ''
}

const notFalsy1 = ['bazfoo', 'baz']
assert.deepStrictEqual(propertyWaterfall(obj2, notFalsy1), 'value')

// Not found will return undefined.
const notFalsy2 = ['bar', 'bazfoo', 'bar', 'foobar']
assert.deepStrictEqual(propertyWaterfall(obj2, notFalsy2), undefined)

const notFalsy3 = ['fish', 'bazfoo', 'baz']
assert.deepStrictEqual(propertyWaterfall(obj2, notFalsy3), 'value')

const falsyOrder1 = ['bar', 'baz']
assert.deepStrictEqual(propertyWaterfall(obj2, falsyOrder1, { falsyValues: true }), null)

const falsyOrder2 = ['foo', 'bar']
assert.deepStrictEqual(propertyWaterfall(obj2, falsyOrder2, { falsyValues: true }), undefined)

const falsyOrder3 = ['baz', 'bar', 'foo', 'foobar']
assert.deepStrictEqual(propertyWaterfall(obj2, falsyOrder3, { falsyValues: true }), 'value')

const falsyOrder4 = ['bazfoo', 'baz']
assert.deepStrictEqual(propertyWaterfall(obj2, falsyOrder4, { falsyValues: true }), '')

// Data types tests.
const obj3 = {
  foo: function foo () {},
  bar: {},
  baz: []
}

const dataOrder1 = ['baz', 'bar', 'foo']
assert.deepStrictEqual(propertyWaterfall(obj3, dataOrder1), [])

const dataOrder2 = ['symbol', 'foo']
assert.deepStrictEqual(propertyWaterfall(obj3, dataOrder2), obj3['foo'])

const dataOrder3 = ['bar', 'bar', 'foo']
assert.deepStrictEqual(propertyWaterfall(obj3, dataOrder3), {})
