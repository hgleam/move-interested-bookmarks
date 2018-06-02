// ブックマーク走査
class BookmarkTracer
{
  constructor()
  {
    this.name = 'ExtendBookmarks';
  }

  // ブックマークツリーを走査
  traceTree(bookmarkItems)
  {
    new ExtensionBookmarkItem(bookmarkItems[0]).trace(0);
  };
}
