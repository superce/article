$(function () {
    $(".btn-success,.btn-primary").click(function () {
        eval("hash('" + $(this).html() + "')");
    });

    $(".menu").click(function () {
        $("#appList").slideToggle(300);
    });
});
function hide_pwd() { $("#p_div").hide(); }
function show_pwd() { $("#p_div").show(); }

function hash(type) {
    try {
        switch (type) {
            case "SHA1":
                hide_pwd();
                $("#output").val(CryptoJS.SHA1($("#input").val()));
                break;
            case "SHA224":
                hide_pwd();
                $("#output").val(CryptoJS.SHA224($("#input").val()));
                break;
            case "SHA256":
                hide_pwd();
                $("#output").val(CryptoJS.SHA256($("#input").val()));
                break;
            case "SHA384":
                hide_pwd();
                $("#output").val(CryptoJS.SHA384($("#input").val()));
                break;
            case "SHA512":
                hide_pwd();
                $("#output").val(CryptoJS.SHA512($("#input").val()));
                break;
            case "MD5":
                hide_pwd();
                $("#output").val(CryptoJS.MD5($("#input").val()));
                break;
            case "HmacSHA1":
                show_pwd();
                $("#output").val(CryptoJS.HmacSHA1($("#input").val(), $("#pwd").val()));
                break;
            case "HmacSHA224":
                show_pwd();
                $("#output").val(CryptoJS.HmacSHA224($("#input").val(), $("#pwd").val()));
                break;
            case "HmacSHA256":
                show_pwd();
                $("#output").val(CryptoJS.HmacSHA256($("#input").val(), $("#pwd").val()));
                break;
            case "HmacSHA384":
                show_pwd();
                $("#output").val(CryptoJS.HmacSHA384($("#input").val(), $("#pwd").val()));
                break;
            case "HmacSHA512":
                show_pwd();
                $("#output").val(CryptoJS.HmacSHA512($("#input").val(), $("#pwd").val()));
                break;
            case "HmacMD5":
                show_pwd();
                $("#output").val(CryptoJS.HmacMD5($("#input").val(), $("#pwd").val()));
                break;
            case "base64加密":
                hide_pwd();
                var str = CryptoJS.enc.Utf8.parse($("#input").val());
                $("#output").val(CryptoJS.enc.Base64.stringify(str));
                break;
            case "base64解密":
                hide_pwd();
                $("#output").val(CryptoJS.enc.Base64.parse($("#input").val()).toString(CryptoJS.enc.Utf8));
                break;
            case "AES加密":
                show_pwd();
                $("#output").val(CryptoJS.AES.encrypt($("#input").val(), $("#pwd").val()));
                break;
            case "AES解密":
                show_pwd();
                $("#output").val(CryptoJS.AES.decrypt($("#input").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                break;
            case "DES加密":
                show_pwd();
                $("#output").val(CryptoJS.DES.encrypt($("#input").val(), $("#pwd").val()));
                break;
            case "DES解密":
                show_pwd();
                $("#output").val(CryptoJS.DES.decrypt($("#input").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                break;
            case "Rabbit加密":
                show_pwd();
                $("#output").val(CryptoJS.Rabbit.encrypt($("#input").val(), $("#pwd").val()));
                break;
            case "Rabbit解密":
                show_pwd();
                $("#output").val(CryptoJS.Rabbit.decrypt($("#input").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                break;
            case "RC4加密":
                show_pwd();
                $("#output").val(CryptoJS.RC4.encrypt($("#input").val(), $("#pwd").val()));
                break;
            case "RC4解密":
                show_pwd();
                $("#output").val(CryptoJS.RC4.decrypt($("#input").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                break;
            case "TripleDES加密":
                show_pwd();
                $("#output").val(CryptoJS.TripleDES.encrypt($("#input").val(), $("#pwd").val()));
                break;
            case "TripleDES解密":
                show_pwd();
                $("#output").val(CryptoJS.TripleDES.decrypt($("#input").val(), $("#pwd").val()).toString(CryptoJS.enc.Utf8));
                break;
        }
    }
    catch (err) {
        alert(err);
        $("#output").val("");
    }
}
function save_file() {
    var saveval = $('#input').val();
    if (saveval == "") {
        alert("待保存的内容不能为空");
        return
    } else {
        var blob = new Blob([saveval], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "fitfrom_code.txt")
    }
}