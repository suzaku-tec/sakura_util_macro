// 行数を取得
var cnt = GetLineCount(0);
// 改行を除いた行文字列を取得
var textAll = "";
for (var i = 1; i <= cnt; i++) {
    var str = GetLineStr(i).replace(/\r\n/,"").replace(/\n/,"");
    textAll += str;
}
var editJson = "";
var innerFlg = false;
var intentLv = 0;
var quoteType = [];
var blockType = [];
var preChr = "";
for (var i = 0; i < textAll.length; i++) {
    var prefix = "";
    var suffix = "";
    var c = textAll.substring(i, i + 1);
    if (!innerFlg) {
        if (c == " ") {
            continue;
        }
        if (c == "\"" || c == "'"){
            innerFlg = true;
            quoteType[quoteType.length] = c;
            // JSON または 配列の1つ目の要素の時はスペース1個を追加
            var chkText = editJson.replace(/( |\t|\r\n|\n)/g, "");
            if (chkText.length > 0) {
                var preChar = chkText.substring(chkText.length - 1, chkText.length);
                if (preChar == "[" || preChar == "{") {
                    c = " " + c;
                }
            }
        } else {
            if (c == "{" || c == "[") {
                suffix = "\r\n";
                intentLv = intentLv + 1;
                blockType[blockType.length] = c;
                for (var j = 0; j < intentLv; j++) {
                    suffix = suffix + "\t";
                }
            }
            if (c == "}" || c == "]") {
                prefix = "\r\n";
                suffix = "\r\n";
                intentLv = intentLv - 1;
                blockType.pop(1);
            }
            if (c == ",") {
                prefix = "\r\n";
            }
        }
    } else {
        if (quoteType.length > 0 && c == quoteType[quoteType.length - 1]){
            innerFlg = false;
        }
    }
    if (prefix != "") {
        for (var j = 0; j < intentLv; j++) {
            prefix = prefix + "\t";
        }
    }
    var line = "" + prefix + c + suffix;
    if (preChr == "\r\n" && line.substring(0, 1) == "\r\n") {
        line = line.substring(1);
    }
    editJson = editJson + "" + line;
    preChr = line.substring(line.length - 1, line.length);
}
SelectAll(0);
InsText(editJson + "\r\n");