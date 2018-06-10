class ExtensionHistory {

  constructor(item) {
    this.item = item
    this.query = this.make()
  }

  searchResult() {
    return new Promise((resolve, reject) => {
      let searching = browser.history.search({text: this.query.text,
                                              startTime: this.query.startTime})
      searching.then(this.haveGot)
      .then((lastVisitTime) => {
        this.item.lastVisitTime = lastVisitTime
        resolve(this)
      })
    }).then((value => {
      return value
    }))
  }

  // 履歴の取得
  haveGot(historyItems) {
    for (let item of historyItems) {
      return new Date(item.lastVisitTime)
    }
  }

  // 履歴検索条件の生成
  // URLを持っている場合はURLを条件、持っていない場合はタイトルを条件とする
  make() {
    let domainName = this.item.url == undefined
                   ? this.item.title
                   : this.item.url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/i)[4];
    if (this.isDomainJudgementNonTarget(domainName)) {
      domainName = this.item.url
    }

    return {
      text: domainName,
      startTime: 0
    };
  }

  // ドメイン判断対象外であるか
  isDomainJudgementNonTarget(url) {
    let setting = JSON.parse(localStorage.getItem('setting')) || {}
    return _.find(setting.exclusionDomains, function(object) { return object.text == url })
  }
}
