var DELAY = 0.1;
var savingFolderId = 'SY7AkDMjYZ7V';    // 退避先のフォルダID
var monthAgo = 2;                       // 退避対象ブックマークのデフォルト設定値

createAlarm();

// アラーム生成
function createAlarm()
{
  console.log("createAlarm");
  browser.alarms.clearAll();

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();

  browser.storage.local.get(["elapsed_month", "execution_time"], options =>
  {
      monthAgo = options.elapsed_month;
      execution_time = options.execution_time;

      var executionDate = year + "-" + month + "-" + day + " " + execution_time;
      var epochMilliseconds = Date.parse(executionDate);

      browser.alarms.create("", {
        when: epochMilliseconds,
        periodInMinutes: 60 * 24});
  });
}

// アラーム動作
browser.alarms.onAlarm.addListener((alarm) => {
  console.log('onAlarms');

  let bookmarkTracer = new BookmarkTracer();
  browser.bookmarks.getTree(bookmarkTracer.traceTree.bind(bookmarkTracer));
});
