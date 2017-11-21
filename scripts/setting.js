// オプションの保存
function saveOptions(event)
{
  event.preventDefault();
  browser.storage.local.set(
    {
      execution_time: document.querySelector('#execution_time').value,
      elapsed_month: document.querySelector('#elapsed_month').value
    }

  )
}

// オプションの復元
function restoreOptions()
{
  function setCurrentChoice(result)
  {
    document.querySelector("#execution_time").value = result.execution_time;
    document.querySelector("#elapsed_month").value = result.elapsed_month;
  }

  function onError(error)
  {
    console.log(`Error: ${error}`);
  }

  // 未読経過月設定用のセレクトボックスを生成
  function createErapsedMonth()
  {
    var $elapsedMonth = document.querySelector('#elapsed_month');
    for (var i = 1; i <= 12; i++) {
      var $option = document.createElement('option');
      $option.setAttribute('value', i);
      $option.innerHTML = i;
      $elapsedMonth.appendChild($option);
    }
  }

  // 未読経過月設定用のセレクトボックスを生成
  createErapsedMonth();

  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
