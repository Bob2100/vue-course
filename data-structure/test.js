const List = require('./List');
const { assert } = require('./Jest');

const list = new List();
list.append('Bob');
assert('test size',list.size() === 1);
assert('test findIndex', list.findIndex('Bob') === 0);