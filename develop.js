/*jshint esversion: 6*/
let acid = ''
if (!getQuery('acid')) {
    alert('参数错误（请在列表中选择一个进入）');
    location.href = "homepage.html"
} else {
    acid = getQuery('acid')
}
$(function() {
    init()

    $('#view_aclist').click(function() {
        if ($(this).hasClass('active')) {
            return
        }
        location.href = "homepage.html"
    })
    $('#view_develop').click(function() {
        if ($(this).hasClass('active')) {
            return
        }
        location.href = "develop.html"
    })
    $('#view_preview').click(() => {
        let win = window.open('', '_blank', '')
        win.opener = null
        win.document.write($('#view_textarea').val())
        win.document.close()
    })
    $('#view_selectall').click(() => {
        $('#view_textarea').select()
    })
    $('#view_clear').click(() => {
        $('#view_textarea').val('')
    })
    $('#view_save').click(() => {
        let htmls = $('#view_textarea').val()
        if (htmls == '') {
            alert('保存内容不能为空！')
            return
        }
        saveHtmls(acid, htmls)
    })
})
function init () {
    getParams(acid)
}

function getParams (acid) {
    $.ajax({
        url: '/management/activity/acmakev2/develop',
        type: 'get',
        data: {
            acid: acid
        },
        success: function(res) {
            if (res.includes('权限未开通')) {
                alert(res)
                return
            }
            res = JSON.parse(res)
            if (res.errorcode == 0) {
                $('#view_textarea').val(HTMLDecode(res.result.htmls))
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}
function saveHtmls (acid, htmls) {
    $.ajax({
        url: '/management/activity/acmake/update',
        type: 'post',
        data: {
            acid: acid,
            htmls: htmls
        },
        success: function(res) {
            res = JSON.parse(res)
            if (res.errorcode == 0) {
                alert('保存成功！')
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}
function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
function getQuery(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        c = window.location.search.substr(1).match(t)
    return null != c ? encodeURI(c[2]) : null
}