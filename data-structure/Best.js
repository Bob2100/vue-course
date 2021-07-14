const style = {
  red: '\x1B[31m',
  green: '\x1B[32m',
  white: '\x1B[37m'
}
function assert(desc, condition) {
  if (!condition) {
    console.log(style.red, new Error(desc), style.white);
    return;
  }
  console.log(style.green, `${desc}: passed`, style.white);
}
module.exports = { assert };