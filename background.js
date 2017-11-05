var DELAY = 0.1;

// ブックマーク走査
class BookmarkTracer {
  constructor() {
    this.name = 'ExtendBookmarks';
  }

  // ブックマークツリーを走査
  traceTree(bookmarkItems) {
    this.traceItems(bookmarkItems[0], 0);
  };

  // ブックマークアイテムを走査
  traceItems(bookmarkItem, indent)
  {
    if (bookmarkItem.children) {
      this.displayLog(bookmarkItem, indent);
      indent++;
      for (let childlen of bookmarkItem.children) {
        this.traceItems(childlen, indent);
      }
    } else {
      this.displayLog(bookmarkItem, indent);
    }
    indent--;
  }

  // ログを表示
  displayLog(bookmarkItem, indent) {
    console.log(this.appendIndent(indent) + bookmarkItem.title);
  }

  // インデントを追加
  appendIndent(indentLength) {
    return " ".repeat(indentLength) + ">";
  }
}

createAlarm();

// アラーム生成
function createAlarm()
{
  console.log("createAlarm");
  browser.alarms.clearAll();
  browser.alarms.create("", {delayInMinutes: DELAY});
}

// アラーム動作
browser.alarms.onAlarm.addListener((alarm) => {
  console.log('onAlarms');

  let bookmarkTracer = new BookmarkTracer();
  browser.bookmarks.getTree(bookmarkTracer.traceTree.bind(bookmarkTracer));
});
