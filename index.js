'use strict';

module.exports = function fastGetter (object, name, enumerable, get) {
  if (typeof enumerable === 'function') {
    get = enumerable;
    enumerable = false;
  }

  Object.defineProperty(object, name, {
    get: function () {
      var value = get.call(this);
      Object.defineProperty(this, name, {
        value: value,
        writable: true
      });
      return value;
    },

    set: function (value) {
      Object.defineProperty(this, name, {
        value: value,
        writable: true
      });
      return value;
    },

    configurable: true,
    enumerable: enumerable,
  });
};
