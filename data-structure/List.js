function List() {
  this.data = [];
}
List.prototype.append = function (item) {
  this.data.push(item);
};
List.prototype.size = function () {
  return this.data.length;
}
List.prototype.findIndex = function (item) {
  return this.data.findIndex(el => el === item);
}
List.prototype.remove = function (item) {
  const index = this.findIndex(item);
  if (index === -1) {
    return false;
  }
  this.data.splice(index, 1);
  return true;
}
List.prototype.insert = function (item, after) {
  const index = this.findIndex(after);
  if (index === -1) {
    return false;
  }
  this.data.splice(index + 1, 0, item);
}
List.prototype.toString = function () {
  return this.data;
}
module.exports = List;