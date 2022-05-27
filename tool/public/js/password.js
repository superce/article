$(document).ready(function () {
    $("input[name='zifu']").click(function () {
        if ($('#zifu').is(':checked')) {
            $("#izifu").removeAttr("disabled");
        } else {
            $("#izifu").val("");
            $("#zifu").val("abcdefghijklmnopqrstuvwxyz");
            $("#izifu").attr({ "disabled": "disabled" });
        }

        zifu = ""
        $('input[name="zifu"]:checked').each(function () {
            zifu = zifu + $(this).val();
        });

    });

    $("input[name='weishu']").click(function () {
        if ($('#weishu').is(':checked')) {
            $("#iweishu").removeAttr("disabled");
        } else {
            $("#iweishu").val("");
            $("#weishu").val("8");
            $("#iweishu").attr({ "disabled": "disabled" });
        }
    });

    $("#shengcheng").click(function () {
        zifu = ""
        $('input[name="zifu"]:checked').each(function () {
            zifu = zifu + $(this).val();
        });
        zifu = filterRepeatStr(zifu);
        weishu = $("input[type='radio']:checked").val();
        $("#result").val(randomString(weishu, zifu));

    });

});

function randomString(weishu, zifu) {
    var maxPos = zifu.length;
    var pwd = '';
    for (i = 0; i < weishu; i++) {
        pwd += zifu.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function filterRepeatStr(str) {
    var arr = str.split("");
    for (var i = 0; arr.length - 1 > i; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] == arr[i]) {
                //alert(arr.length); 
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return str;
}