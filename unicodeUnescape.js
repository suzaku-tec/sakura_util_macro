// 行数を取得
var cnt = GetLineCount(0);
var result = "";

for (var i = 1; i <= cnt; i++) {
  // i行目を取得
  var str = GetLineStr(i);
  // \u.... の文字列の配列で取得、大文字小文字は問わない
  uniArray = str.match(/\\u.{4}/gi);
  if (uniArray) {
    for (var j = 0, len = uniArray.length; j < len; j++) {
      str = str.replace(
        uniArray[j],
        String.fromCharCode(uniArray[j].replace("\\u", "0x"))
      );
    }
  }
  result += str;
}
SelectAll(0);
InsText(result);
