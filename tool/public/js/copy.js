// 定义一个新的复制对象
var clipboard = new ClipboardJS('#copyallcode');
clipboard.on('success', function (e) {
    if (e.text != "") {
        // JsonsMessageBox($("#copyallcode"), "复制成功");
    }
    else {
        // JsonsMessageBox($("#copyallcode"), "找不到数据，无法复制");
    }
});

clipboard.on('error', function (e) {
    // JsonsMessageBox($("#copyallcode"), "复制失败，请手动复制");
});