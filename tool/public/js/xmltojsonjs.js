function demo_xml() {
    var xml = "<books>\
  <book>\
  <author>Jack Herrington</author>\
  <title>PHP Hacks</title>\
  <publisher>O'Reilly</publisher>\
  </book>\
  <book>\
  <author>Jack Herrington</author>\
  <title>Podcasting Hacks</title>\
  <publisher>O'Reilly</publisher>\
  </book>\
  </books>";
    $('#input').val(xml);
}
function demo_json() {
    var json = '{\
	"tools": [\
	{ "name":"css format" , "site":"http://www.jsons.cn/" },\
	{ "name":"json format" , "site":"http://www.jsons.cn/" },\
	{ "name":"hash MD5" , "site":"http://www.jsons.cn/" }\
	]\
	}';
    $('#input').val(json);
}
function showmsg(msg) {
    $('#errdiv').text(msg);
}

function xml_2_json() {
    var space = ($("#pretty_json").is(':checked')) ? "  " : "";

    var xotree = new XML.ObjTree();
    var inputdata = $.trim($('#input').val());
    var tree = xotree.parseXML(inputdata);
    if (!tree.html) {
        $('#output').val(JSON.stringify(tree, null, space));
        showmsg('XML转JSON成功')
    } else {
        showmsg('XML格式错误')
    }
}
function json_2_xml() {
    try {
        var xotree = new XML.ObjTree();
        var inputdata = $.trim($('#input').val());
        $('#output').val(xotree.writeXML(JSON.parse(inputdata)));
        showmsg('JSON转XML成功')
    } catch (e) {
        showmsg('JSON格式错误')
    }
}
function Empty() {
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";
    document.getElementById("input").select();
}