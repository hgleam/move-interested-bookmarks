import BookmarkTreeNodeSet from '../../background/js/bookmark_tree_node_set'
import BookmarkTitle from '../../background/js/bookmark_title'

export default class {
  constructor(condition) {
    this.condition = condition
  }

  start() {
    let bookmarkFolders = []
    let bookmarkTreeNodeSet = new BookmarkTreeNodeSet(this.condition)
    if (bookmarkTreeNodeSet.isEmpty() || !bookmarkTreeNodeSet.hasParentIds()) {
      return bookmarkFolders
    }

    window.browser.bookmarks.get(bookmarkTreeNodeSet.parentIds, function(
      matchedParentTreeNodeSet
    ) {
      for (let currentBookmarkTreeNode of bookmarkTreeNodeSet.value) {
        let foundParentTreeNode = matchedParentTreeNodeSet.find(function(val) {
          return val.id == currentBookmarkTreeNode.parentId
        })
        let foundBookmarkTitle = new BookmarkTitle({
          parent: foundParentTreeNode,
          current: currentBookmarkTreeNode
        })
        bookmarkFolders.push({
          id: currentBookmarkTreeNode.id,
          title: foundBookmarkTitle.title
        })
      }
    })
    return bookmarkFolders
  }
}
