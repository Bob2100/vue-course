const style = {
  red: '\x1B[31m',
  green: '\x1B[32m'
}
function assert(desc, condition) {
  if (!condition) {
    console.log(style.red);
    throw new Error(desc);
  }
  console.log(style.green,`${desc}: passed`);
}
module.exports = { assert };