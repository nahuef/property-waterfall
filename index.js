'use strict'

/**
 * @description Looks for a valid value in an object, iterating over a priority ordered array of keys.
 * @param {Object} obj - key:value object.
 * @param {Array} order - key order to look for values in `obj` object.
 * @param {Object} options
 * @param {boolean} [options.falsyValues] - `true` for falsy values to be valid. Defaults to `false`.
 * @returns {*} value - First allowed value according to `order` array priority.
 */
module.exports = function propertyWaterfall (obj, order, { falsyValues = false } = {}) {
  let value

  // Iterate over order array to respect priorities.
  for (let i = 0; i < order.length; i++) {
    // If object HAS the property.
    if (obj.hasOwnProperty(order[i])) {
      // Falsy values allowed.
      if (falsyValues) {
        value = obj[order[i]]
        break
      }

      // Falsy values NOT allowed & value is thruthy.
      if (!falsyValues && obj[order[i]]) {
        value = obj[order[i]]
        break
      }
    }
  }

  return value
}
