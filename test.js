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
var assert = require('assert');
assert.equal(ownee, owner.ownee);

events.push('getter was only run once');

assert.deepEqual(events.splice(0, events.length), [
  'Created owner',
  'getter was triggered',
  'Created child',
  'getter was only run once',
]);
var owner = new Owner();
owner.ownee = 'some string';

assert.equal(owner.ownee, 'some string');
assert.deepEqual(events, [ 'Created owner' ]);

console.log('Everything works');
