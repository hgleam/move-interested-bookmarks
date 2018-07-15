import ExtensionBookmarkItem from './extension_bookmark_item'

// ブックマーク走査
export default class {
  constructor() {
    this.name = 'ExtendBookmarks'
  }

  // ブックマークツリーを走査
  traceTree(bookmarkItems) {
    new ExtensionBookmarkItem(bookmarkItems[0]).trace(0)
  }
}
