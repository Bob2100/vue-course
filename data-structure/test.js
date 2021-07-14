const List = require('./List');
const { assert } = require('./Best');

const list = new List();
list.append('Bob');
assert('test append and size', list.size() === 1);
assert('test findIndex', list.findIndex('Bob') === 0);

list.remove('Bob');
assert('test remove', list.size() === 0);
assert('test toString', Array.isArray(list.toString()));

list.append('Bob');
list.append('Jack');
list.insert('Rose', 'Bob');
assert('test insert', list.findIndex('Rose') === 1);