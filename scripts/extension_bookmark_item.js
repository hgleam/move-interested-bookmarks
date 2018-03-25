class ExtensionBookmarkItem
{
  constructor(item, indent)
  {
      this.item = item;
      this.indent = indent;
  }

  // 走査
  trace()
  {
    return new Promise((resolve, reject) => {
      if (this.item.title != '') {
        let extensionHistory = new ExtensionHistory(this.item)
        extensionHistory.searchResult()
        .then((result) => {
          resolve(result)
        })
      }

      if (this.item.children) {
        if (this.item.title) this.indent++;
        for (let childlen of this.item.children) {
          new ExtensionBookmarkItem(childlen, this.indent).trace();
        }
        this.indent--;
      }
    }).then((value) => {
      if (this.isMoveTarget()) {
        var movingBookmark = browser.bookmarks.move(value.item.id, {parentId: savingFolderId})
      }
      new Formatter(value).output();
    });
  }

  // 移動対象か
  isMoveTarget()
  {
    var dt = new Date();
    dt.setMonth(dt.getMonth() - monthAgo);
    return (this.item.type != "folder" && dt > this.item.lastVisitTime) ? true : false;
  }
}
