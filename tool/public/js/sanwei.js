function result(v)
{
	if (!/^\d{2,3}$/.test(v))
	{
		alert("璇疯緭鍏ユ纭殑韬珮\r\n(娉細韬珮鍗曚綅涓哄帢绫�)");
		return false;
	}
	var res1 = Math.round(v * 0.535);
	var res2 = Math.round(v * 0.365);
	var res3 = Math.round(v * 0.565);
	document.getElementById('res1').innerHTML = res1;
	document.getElementById('res2').innerHTML = res2;
	document.getElementById('res3').innerHTML = res3;
	document.getElementById('res').style.display = '';
}