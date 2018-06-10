export default class BookmarkTreeNodeSet {
  constructor(condition) {
    this.value = condition['value'];
    if (!this.isEmpty()) {
        this.value = this.filter(condition['filterType']);
        this.parentIds = this.extractParentIds();
    }
  }

  filter(type) {
    return Array.prototype.filter.call(this.value, (target) => {
      return (target.hasOwnProperty("type")) ? target.type === type : true;
    });
  }

  extractParentIds() {
    return this.arrayUnique(Array.prototype.map.call(
        this.value, function(target) {
          return target.parentId;
        }
      )
    );
  }

  arrayUnique(value) {
    return value.reduce(function(prev, current) {
      if (prev.indexOf(current) < 0) prev.push(current);
      return prev;
    }, []);
  }

  isEmpty() {
    return (!this.value || this.value.length == 0) ? true : false;
  }

  hasParentIds() {
    return this.parentIds.lenght == 0 ? false : true;
  }
}
