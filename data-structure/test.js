const List = require('./List');
const { assert } = require('./Best');

const list = new List();
list.append('Bob');
assert('test append and size', list.size() === 1);
assert('test findIndex', list.findIndex('Bob') === 0);

list.remove('Bob');
assert('test remove', list.size() === 1);
assert('test toString', Array.isArray(list.toString()));