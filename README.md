# fast-getter

[![browser support](https://ci.testling.com/grncdr/js-is-function.png)](https://ci.testling.com/grncdr/js-is-function)

Shorthand for efficient, lazy, self-replacing getter.

## Synopsis & Test

```javascript
var getter = require('./');

var events = [];

function Owner () {
  events.push('Created owner');
}

function ThingThatIsntAlwaysUsed (owner) {
  events.push('Created child');
  this.owner = owner;
}

getter(Owner.prototype, 'ownee', function () {
  events.push('getter was triggered');
  return new ThingThatIsntAlwaysUsed(this);
});

var owner = new Owner();
var ownee = owner.ownee;
```

This synopsis is also run as a test using [markdown-code-blocks][]:

```javascript
var assert = require('assert');
assert.equal(ownee, owner.ownee);

events.push('getter was only run once');

assert.deepEqual(events.splice(0, events.length), [
  'Created owner',
  'getter was triggered',
  'Created child',
  'getter was only run once',
]);
```

You can also assign to the property, in which case the getter never runs:

```javascript
var owner = new Owner();
owner.ownee = 'some string';

assert.equal(owner.ownee, 'some string');
assert.deepEqual(events, [ 'Created owner' ]);

console.log('Everything works');
```

[markdown-code-blocks]: http://npm.im/markdown-code-blocks

## API

### `module.exports = (object, name, [enumerable=false], get) -> void`

Defines a configurable property on `object`. The `get` function will be called
in the same context as any other ES5 getter, but only once per unique object
that the property is accessed on.

If `enumerable` is `true` then the property name will be made enumerable, this
defaults to false.

## License

MIT
