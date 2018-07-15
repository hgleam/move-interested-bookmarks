import ExtensionHistory from './extension_history'
import Formatter from './formatter'
import { getOption } from './main'

export default class ExtensionBookmarkItem {
  constructor(item) {
    this.item = item
  }

  // 走査
  trace(whatTier) {
    return new Promise(resolve => {
      if (this.item.title != '') {
        let extensionHistory = new ExtensionHistory(this.item)
        extensionHistory.searchResult().then(result => {
          result.whatTier = whatTier
          resolve(result)
        })
      }

      if (this.item.children) {
        if (this.item.title) whatTier++
        for (let childlen of this.item.children) {
          new ExtensionBookmarkItem(childlen).trace(whatTier)
        }
        whatTier--
      }
    }).then(value => {
      if (this.isMoveTarget()) {
        window.browser.bookmarks.move(value.item.id, {
          parentId: getOption().saveDestinationFolder.id
        })
      }
      new Formatter(value).output()
    })
  }

  // 移動対象か
  isMoveTarget() {
    let dt = new Date()
    let elapsedMonth = getOption().elapsedMonth || 2
    dt.setMonth(dt.getMonth() - elapsedMonth)
    return this.item.type != 'folder' && dt > this.item.lastVisitTime
      ? true
      : false
  }
}
