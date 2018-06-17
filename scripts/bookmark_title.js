const ID_TYPES = new Array("root________", "toolbar_____","unfiled_____");

export default class {
  constructor(value) {
    this.title = (value.parent.title == undefined || ID_TYPES.indexOf(value.parent.id) != -1)
                ? "" + value.current.title : value.parent.title + "/" + value.current.title;
  }

  set title(x) {
    this._title = x;
  }

  get title() {
    return this._title;
  }
}
