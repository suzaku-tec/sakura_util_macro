// 行数を取得
var cnt = GetLineCount(0);
var result = "";

for (var i = 1; i <= cnt; i++) {
  // i行目を取得
  var str = GetLineStr(i);
  str = decodeURI(str);

  result += str;
}
SelectAll(0);
InsText(result);
