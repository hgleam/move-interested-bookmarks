import BookmarkTracer from './bookmark_tracer'

export function getOption() {
  return JSON.parse(localStorage.getItem('setting')) || {}
}

// アラーム生成
export default function createAlarm() {
  window.browser.alarms.clearAll()

  let today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  let day = today.getDate()

  let option = getOption()
  let savingFolderId = null
  if (option.saveDestinationFolder)
    savingFolderId = option.saveDestinationFolder.id
  const executionDate =
    year + '-' + month + '-' + day + ' ' + option.executionTime
  const epochMilliseconds = Date.parse(executionDate)
  //
  if (!isNaN(epochMilliseconds) && savingFolderId != undefined) {
    /* eslint-disable no-console */
    console.log('createAlarm')
    console.log(epochMilliseconds)
    /* eslint-enable no-console */
    window.browser.alarms.create('', {
      when: epochMilliseconds,
      periodInMinutes: 60 * 24
    })
  }
}

// アラーム動作
window.browser.alarms.onAlarm.addListener(() => {
  /* eslint-disable no-console */
  console.log('onAlarms')
  /* eslint-enable no-console */
  let bookmarkTracer = new BookmarkTracer()
  window.browser.bookmarks.getTree(
    bookmarkTracer.traceTree.bind(bookmarkTracer)
  )
})
