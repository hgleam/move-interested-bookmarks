var DELAY = 0.1
var savingFolderId = '';    // 退避先のフォルダID
var monthAgo = 2            // 退避対象ブックマークのデフォルト設定値

createAlarm();

// アラーム生成
function createAlarm()
{
  browser.alarms.clearAll()

  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth() + 1
  var day = today.getDate()

  let option = JSON.parse(localStorage.getItem('setting')) || {};
  if (option.saveDestinationFolder) savingFolderId = option.saveDestinationFolder.id;
  monthAgo = option.elapsedMonth
  executionTime = option.executionTime
  const executionDate = year + "-" + month + "-" + day + " " + option.executionTime
  const epochMilliseconds = Date.parse(executionDate)

  if (!isNaN(epochMilliseconds) && savingFolderId != undefined) {
    console.log("createAlarm");
    console.log(epochMilliseconds);
    browser.alarms.create("", {
      when: epochMilliseconds,
      periodInMinutes: 60 * 24
    })
  }
}

// アラーム動作
browser.alarms.onAlarm.addListener((alarm) => {
  console.log('onAlarms')
  let bookmarkTracer = new BookmarkTracer()
  browser.bookmarks.getTree(bookmarkTracer.traceTree.bind(bookmarkTracer))
});
