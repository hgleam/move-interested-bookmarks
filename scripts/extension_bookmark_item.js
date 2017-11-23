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
        var searching = browser.history.search(this.createLogSearchCriteria());
        searching.then(this.haveGot)
        .then((lastVisitTime) => {
          this.item.lastVisitTime = lastVisitTime;
          resolve(this);
        });
      }

      if (this.item.children) {
        if (this.item.title) this.indent++;
        for (let childlen of this.item.children) {
          new ExtensionBookmarkItem(childlen, this.indent).trace();
        }
        this.indent--;
      }
    }).then((value) => {
      if (value.isMoveTarget()) {
        var movingBookmark = browser.bookmarks.move(value.item.id, {parentId: savingFolderId})
      }
      new Formatter(value).output();
    });
  }

  // 履歴検索条件の生成
  // URLを持っている場合はURLを条件、持っていない場合はタイトルを条件とする
  createLogSearchCriteria()
  {
    var domainName = this.item.url == undefined
                   ? this.item.title
                   : this.item.url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i)[4];
    return {
      text: domainName,
      startTime: 0
    };
  }

  // 履歴の取得
  haveGot(historyItems)
  {
    for (let item of historyItems) {
      return new Date(item.lastVisitTime);
    }
  }

  // 移動対象か
  isMoveTarget()
  {
    var dt = new Date();
    dt.setMonth(dt.getMonth() - monthAgo);
    return (this.item.type != "folder" && dt > this.item.lastVisitTime) ? true : false;
  }
}
