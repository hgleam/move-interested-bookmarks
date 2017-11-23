class Formatter
{
  constructor(value)
  {
    this.item = value.item;
    this.indent = value.indent;
  }

  // 出力
  output()
  {
    if (this.item.title != '') {
      if (this.item.lastVisitTime == undefined) {
        console.log(this.appendIndent() + ">" + this.item.title);
      } else {
        console.log(this.appendIndent() + ">" + this.item.title + " " + this.item.lastVisitTime + " " + this.item.id);
      }
    }
  }

  // インデントを追加
  appendIndent()
  {
    return " ".repeat(this.indent);
  }
}
