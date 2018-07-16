export default class {
  constructor(value) {
    this.item = value.item
    this.whatTier = value.whatTier
  }

  // 出力
  output() {
    /*eslint-disable no-console */
    // if (this.item.title != '') {
    //   if (this.item.lastVisitTime == undefined) {
    //     console.log(this.appendIndent() + '>' + this.item.title)
    //   } else {
    //     console.log(
    //       this.appendIndent() +
    //         '>' +
    //         this.item.title +
    //         ' ' +
    //         this.item.lastVisitTime +
    //         ' ' +
    //         this.item.id
    //     )
    //   }
    // }
    /*eslint-enable no-console */
  }

  // インデントを追加
  appendIndent() {
    return ' '.repeat(this.whatTier)
  }
}
