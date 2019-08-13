/*jshint esversion: 6*/
// 页面基础配置
const activeData = {
    design: {
        1: { name: 'PC活动', value: 'design', id: 1, url: '/management/activity/acmake/design/' },
        2: { name: '手机活动', value: 'mobile', id: 2, url: '/management/activity/acmake/mobile/' },
        4: { name: '开发者模式', value: 'develop', id: 4, url: '/management/acmakeHomepage/develop.html' },
        5: { name: '引导页模板', value: 'guide', id: 5, url: '/management/activity/acmake/guide/' },
        6: { name: 'PC优惠券模板', value: 'coupon', id: 6, url: '/management/activity/acmake/coupon/' }
    },
    pushType: {
        1: { name: '全量推送', value: 'full', id: 1 },
        2: { name: '分时段推送', value: 'batch', id: 2 },
        3: { name: '不推送', value: 'none', id: 3 }
    },
    device: {
        1: { name: 'PC', value: 'pc', id: 1 },
        2: { name: '手机', value: 'mobile', id: 2 },
        3: { name: 'PC和手机', value: 'pcandmobile', id: 3 }
    }
}

// 分页信息
let pageData = {
    pagesize: 20,
    current: 1,
    total: 10,
    search: {}
}

let timeout = {
    popwin_submit: 0
}

let ip = -1
getYourIP((res) => {
    ip = res
})
$(function() {
    init()

    // head
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
    $('#view_developbox').click(function() {
        window.open('http://activity.10jqka.com.cn/acmake/cache/343.html')
    })
    $('#view_video').click(function() {
        window.open('http://vis.10jqka.com.cn/management/activity/acmake/video/')
    })
    $('#view_clonepage').click(function() {
        clonewinClear()
        $('#view_clonewin, #view_mask').show()
    })
    $('#view_newpage').click(function() {
        popwinClear()
        $('#view_popwin_title').text('新增页面')
        $('#view_popwin, #view_mask').show()
    })
    $(window).keyup(function (e) {
        if (e.ctrlKey && e.keyCode == 81) {
            $('#view_imgupload').show()
            e.preventDefault()
        }
    	if (e.ctrlKey && e.keyCode == 77) {
            if ($('#view_testpage').length > 0) {
                return
            }
            $('#handleBar').prepend('<li class="btn" id="view_testpage">测试页面</li>')
    		e.preventDefault()
    	}
    })
    $('#view_imgupload').click(function () {
        $('#view_imguploadwin, #view_mask').show()
    })
    $('#view_testpage').click(function () {
    	$('#view_imguploadwin, #view_mask').show()
    })

    // table
    $('.view_editpage').live('click', function() {
        popwinInit(eval('(' + $(this).parent().parent().attr('data') + ')'))
        $('#view_popwin_title').text('编辑页面')
        $('#view_popwin, #view_mask').show()
    })
    $('.view_design').live('click', function() {
        window.location.href = location.origin + $(this).attr('url') + '?acid=' + $(this).attr('acid')
        // window.open(location.origin + $(this).attr('url') + '?acid=' + $(this).attr('acid'))
    })
    $('.view_release').live('click', function() {
        let acid = $(this).parent().parent().attr('acid')
        publish(acid)
    })
    $('.jumpPage').click(function() {
        if ($('.pageNum').val() == '') {
            alert('请输入页码')
            return
        }
        if (isNaN(Number($('.pageNum').val()))) {
            alert('请输入正确的页码')
            return
        }
        if ($('.pageNum').val() == pageData.current) {
            return
        }
        jumpPage(Number($('.pageNum').val()))
    })
    $('.paging-enable').live('click', function() {
        if ($(this).hasClass('paging-current')) {
            return
        }
        let p = 1
        switch ($(this).text()) {
            case '首页':
                if (pageData.current == 1) {
                    return
                }
                p = 1
                break
            case '上一页':
                if (pageData.current - 1 > 0) {
                    p = pageData.current - 1
                } else {
                    return
                }
                break
            case '下一页':
                if (pageData.current + 1 <= pageData.total) {
                    p = pageData.current + 1
                } else {
                    return
                }
                break
            case '末页':
                if (pageData.current == pageData.total) {
                    return
                }
                p = pageData.total
                break
            default:
                p = isNaN(Number($(this).text())) ? 1 : Number($(this).text())
        }
        jumpPage(p)
    })

    // leftBox
    $('#view_left_zoom').click(function() {
        let $this = $(this)
        if ($this.text() == '收起') {
            $this.text('展开')
            $('#view_left_search_container').animate({ width: 'toggle' }, 300)
        } else {
            $this.text('收起')
            $('#view_left_search_container').animate({ width: 'toggle' }, 300)
        }
    })
    $('#view_left_search_acid, #view_left_search_acname, #view_left_search_creater').keyup(function(e) {
        if (e.keyCode == 13) {
        	pageData.current = 1
            searchList()
        }
    })
    $('#view_left_search_btn').click(function() {
    	pageData.current = 1
        searchList()
    })
    $('#view_left_search_clear').click(function() {
    	pageData.current = 1
        pageData.search = {}
        getAcmakeList(pageData.current)
        leftSearchClear()
    })

    // popwin
    $('#view_popwin_submit').click(function() {
        if (timeout.popwin_submit == 1) {
            return
        }
        timeout.popwin_submit = 1
        updateAcmake(popwinGetData())
    })
    $('#view_popwin_close').click(function() {
        $('#view_popwin, #view_mask').hide()
        popwinClear()
    })
    $('#view_popwin_acpush').change(function() {
        $('.view_popwin_push_edit').hide()
        $('#view_popwin_push_' + $(this).val()).show()
    })
    $('.view_popwin_push_add').click(function() {
        $(this).before($(this).prev('p').prop('outerHTML'))
        $(this).prev('p').find('.view_popwin_pushtime').val(getPushDate())
    })
    $('.view_popwin_interface').change(function() {
        if ($(this).val() == "true") {
            $(this).siblings('.view_popwin_interface_person').show()
        }
    })

    // clone
    $('#view_clonewin_submit').click(function () {
        let val = $('#view_clonewin_acid').val()
        if (val == '') {
            return
        } else if (isNaN(Number(val))) {
            alert('请输入正确的活动页id')
            return
        }
        addAcmakeByAcid(val)
    })
    $('#view_clonewin_close').click(function() {
        $('#view_clonewin, #view_mask').hide()
        $('#view_clonewin_acid').val('')
    })

    // imgupload
	$("#view_imguploadwin_openImg").live('change', function () {
		upfile()
	});
    $('#view_imguploadwin_copy').click(function () {
		let url2 = document.getElementById("view_imguploadwin_url").innerText
		let oInput = document.createElement('input')
		oInput.value = url2
		document.body.appendChild(oInput)
		oInput.select() // 选择对象
		document.execCommand("Copy") // 执行浏览器复制命令
		oInput.className = 'oInput'
		oInput.style.display='none'
    })
    $('#view_imguploadwin_close').click(function () {
    	$('#view_imguploadwin, #view_mask').hide()
    })
})

function init() {
    // 初始化表格
    jumpPage(1)

    // 初始化活动类型
    let activeType = ''
    for (let i in activeData.design) {
        let type = activeData.design[i]
        activeType += `<option value="${type.id}">${type.name}</option>`
    }
    $('.view_active_type').append(activeType)

    // 初始化推送方式
    let pushType = ''
    for (let i in activeData.pushType) {
        let type = activeData.pushType[i]
        pushType += `<option value="${type.id}">${type.name}</option>`
    }
    $('.view_push_type').append(pushType)

    // 初始化投放平台
    let acdevice = ''
    for (let i in activeData.device) {
        let type = activeData.device[i]
        acdevice += `<option value="${type.id}">${type.name}</option>`
    }
    $('.view_device').append(acdevice)
}

function jumpPage(page) {
    getAcmakeList(page)
}

// 修改表格分页显示
function changePaging() {
    let pagings = [1, 2, 3]
    if (pageData.total < 4) {
        pagings.length = pageData.total
    } else {
        if (pageData.current <= 3) {
            pagings = [1, 2, 3, 4, '...']
        } else if (pageData.current >= pageData.total - 2) {
            pagings = ['...', pageData.total - 3, pageData.total - 2, pageData.total - 1, pageData.total]
        } else {
            pagings = ['...', pageData.current - 1, pageData.current, pageData.current + 1, '...']
        }
    }
    let pagesHtml = ''
    for (let i in pagings) {
        let pageEnable = pagings[i] == '...' ? '' : 'paging-enable '
        let pageCurrent = pagings[i] == pageData.current ? 'paging-current ' : ''
        pagesHtml += '<li class="' + pageEnable + pageCurrent + 'view_paging_num">' + pagings[i] + '</li>'
    }
    $('#view_pages').html(pagesHtml)
        // $('.paging-current').removeClass('paging-current')
        // $('.view_paging_num').each(function(i, val) {
        //     $(val).text(pagings[i]).attr('page', pagings[i])
        //     if (pagings[i] == '...') {
        //         $(val).removeClass('paging-enable')
        //     } else {
        //         $(val).addClass('paging-enable')
        //     }
        // })
        // $('[page=' + pageData.current + ']').addClass('paging-current')
}


// 获取筛选框中的内容
function setSearchData() {
    pageData.search = {}
    if ($('#view_left_search_acid').val() != '') {
        pageData.search.acid = $('#view_left_search_acid').val()
    }
    if ($('#view_left_search_acname').val() != '') {
        pageData.search.acname = $('#view_left_search_acname').val()
    }
    if ($('#view_left_search_creater').val() != '') {
        pageData.search.search_author = $('#view_left_search_creater').val()
    }
    if ($('#view_left_search_acdevice').val() != 'null') {
        pageData.search.search_device = $('#view_left_search_acdevice').val()
    }
    if ($('#view_left_search_acpush').val() != 'null') {
        pageData.search.search_pushtype = $('#view_left_search_acpush').val()
    }
}
// 清空筛选框中内容
function leftSearchClear() {
    $('#view_left_search_acid').val('')
    $('#view_left_search_acname').val('')
    $('#view_left_search_creater').val('')
    $('#view_left_search_actype').val('none')
    $('#view_left_search_acpush').val('none')
}

// 执行筛选操作
function searchList() {
    setSearchData()
    getAcmakeList(pageData.current)
}

// 获取活动页详情窗口所有数据
function popwinGetData() {
    if (!$('#view_popwin_acname').val()) {
        alert('请输入活动名称！')
        timeout.popwin_submit = 0
    }
    if (!$('#view_popwin_creater').val()) {
        alert('请输入创建人姓名！')
        timeout.popwin_submit = 0
    }
    if ($('#view_popwin_acpush').val() == '1' || $('#view_popwin_acpush').val() == '2') {
        $('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.popwin-push-container').find('p').each((i, val) => {
            if (!$(val).find('.view_popwin_pushtime').val()) {
                alert('请输入推送时间！')
                timeout.popwin_submit = 0
            }
            if (!$(val).find('.view_popwin_pushnum').val()) {
                alert('请输入用户数量！')
                timeout.popwin_submit = 0
            }
        })
        if (!$('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.view_popwin_interface_person').val()) {
            alert('请输入接口负责人！')
            timeout.popwin_submit = 0
        }
        if (!$('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.view_popwin_qps').val()) {
            alert('请输入每秒并发数！')
            timeout.popwin_submit = 0
        }
    }
    if (timeout.popwin_submit == 0) {
        return -1
    }
    let data = {
        acid: ($('#view_popwin').attr('acid') || ''),
        name: $('#view_popwin_acname').val(),
        creater: $('#view_popwin_creater').val(),
        design: $('#view_popwin_actype').val(),
        device: $('#view_popwin_acdevice').val(),
        push_type: $('#view_popwin_acpush').val()
    }
    if ($('#view_popwin_acpush').val() == '1' || $('#view_popwin_acpush').val() == '2') {
        let pushData = []
        $('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.popwin-push-container').find('p').each((i, val) => {
            pushData.push({
                'push_time': $(val).find('.view_popwin_pushtime').val(),
                'user_amount': $(val).find('.view_popwin_pushnum').val()
            })
        })
        data['push_time_list'] = pushData
        data['api_list'] = [{
            'api_url': 'test.com',
            'api_provider': $('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.view_popwin_interface_person').val()
        }]
        data['qps'] = $('#view_popwin_push_' + $('#view_popwin_acpush').val()).find('.view_popwin_qps').val()
    }
    return data
}
// 活动页详情窗口数据填充
function popwinInit(data) {
    if (!data) {
        return
    }
    popwinClear()
    $('#view_popwin').attr('acid', data.id)
    $('#view_popwin_acname').val(data.name)
    $('#view_popwin_creater').val(data.creater)
    $('#view_popwin_actype').val(data.design)
    $('#view_popwin_acdevice').val(data.device)
    $('#view_popwin_acpush').val(data.push_type)
    $('.view_popwin_push_edit').hide()
    if (data.push_type == '1' || data.push_type == '2') {
        let $dom = $('#view_popwin_push_' + data.push_type).find('.popwin-push-container')
        for (let i in data.push_time_list) {
            if (i == 0) {
                $dom.children('p').find('.view_popwin_pushtime').val(data.push_time_list[i].push_time || getPushDate())
                $dom.children('p').find('.view_popwin_pushnum').val(data.push_time_list[i].user_amount)
            } else if (data.push_type == '2') {
                $dom.children('p:last').after($dom.children('p:first').prop('outerHTML'))
                $dom.children('p:last').find('.view_popwin_pushtime').val(data.push_time_list[i].push_time || getPushDate())
                $dom.children('p:last').find('.view_popwin_pushnum').val(data.push_time_list[i].user_amount)
            }
        }
        $('#view_popwin_push_' + data.push_type).show()
        let provider = ''
        if (data.api_list && data.api_list.length > 0 && data.api_list[0].api_provider) {
            provider = data.api_list[0].api_provider
        }
        $('.view_popwin_interface_person').val(provider)
        $('.view_popwin_qps').val(data.qps)
    }
}

// 清空活动页详情窗口
function popwinClear() {
    $('#view_popwin').attr('acid', '')
    $('#view_popwin_acname').val('')
    $('#view_popwin_creater').val('')
    $('#view_popwin_actype').val('design')
    $('#view_popwin_acdevice').val('pc')
    $('#view_popwin_acpush').val('1')
    $('.view_popwin_push_edit').hide()
    $('#view_popwin_push_1').show()
    $('#view_popwin_push_1').find('.view_popwin_pushtime').val(getPushDate())
    $('#view_popwin_push_1').find('.view_popwin_pushnum').val('')
    $('#view_popwin_push_2 .popwin-push-container').find('p').each((i, val) => {
        if (i === 0) {
            $(val).find('.view_popwin_pushtime').val(getPushDate())
            $(val).find('.view_popwin_pushnum').val('')
        } else {
            $(val).remove()
        }
    })
    $('.view_popwin_interface').val('false')
    $('.view_popwin_interface_person').val('')
    $('.view_popwin_qps').val('6800/s')
}

// 清空克隆窗口的内容
function clonewinClear() {
	$('#view_clonewin_acid').val('')
}


function getQuery(e) {
    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
        c = window.location.search.substr(1).match(t)
    return null != c ? encodeURI(c[2]) : null
}

function getPushDate() {
    let now = new Date()
    let yy =  now.getFullYear() //日 
    let MM =  now.getMonth() + 1 //月份 
    let dd =  now.getDate() //日 
    let hh =  now.getHours() //小时 
    let mm =  now.getMinutes() //分 
    let ss =  now.getSeconds() //秒 
    function checkZero (data) {
        return ('00' + data).substr(('' + data).length)
    }
    return yy + '-' + checkZero(MM) + '-' + checkZero(dd) + ' ' 
        + checkZero(hh) + ':' + checkZero(mm) + ':' + checkZero(ss)
}

// 活动页列表
function getAcmakeList(page) {
    $.ajax({
        url: '/management/activity/acmakev2/acmakelist?isjson=1',
        type: 'get',
        data: $.extend(pageData.search, {
            page: page,
            pagesize: pageData.pagesize
        }),
        success: function(res) {
            if (res.includes('权限未开通')) {
                location.href = 'http://upass.10jqka.com.cn/login?redir=' + location.href
                return
            }
            res = JSON.parse(res)
            if (res.errorcode == 0) {
                let data = res.result
                let listHtml = ''
                let index = 1
                for (let val of data.list) {
                    val.htmls = ''
                    listHtml += `
                    <tr acid="${val.id}" data="${JSON.stringify(val).replace(/\"/g, '\'')}">
                    <td>${(page-1)*pageData.pagesize + index}</td>
                    <td>${val.mtime}</td>
                    <td>${val.name}</td>
                    <td>${activeData.design[val.design]?activeData.design[val.design].name:''}</td>
                    <td>${val.creater}</td>
                    <td>${activeData.device[val.device]?activeData.device[val.device].name:''}</td>
                    <td>${activeData.pushType[val.push_type]?activeData.pushType[val.push_type].name:''}</td>
                    <td>${val.url?('<a target="_blank" href="'+val.url+'">'+val.url+'</a>') : '发布正式才能生成活动链接！'}</td>
                    <td>${val.isvalid?'激活':'冻结'}</td>
                    <td><span class="btn view_editpage">修改</span><span class="btn view_design" acid="${val.id}" url="${activeData.design[val.design].url}">设计预览</span><span class="btn view_release">发布</span></td>
                    </tr>`
                    index++
                }
                $('#view_acmake_list').html(listHtml)
                pageData.current = page
                pageData.total = data.tolpage
                changePaging()
                $('#view_paging_total').text(pageData.current + '/' + pageData.total)
            } else if (res.errorcode == -1001) {
                location.href = 'http://upass.10jqka.com.cn/login?redir=' + location.href
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

// 获取某个acid活动页的信息
function getAcmakeByAcid(acid, cb) {
    $.ajax({
        url: '/management/activity/acmakev2/acmakelist',
        type: 'get',
        data: {
            page: 1,
            pagesize: 20,
            acid: acid
        },
        success: function(res) {
            if (res.includes('权限未开通')) {
                alert(res)
                return
            }
            res = JSON.parse(res)
            if (res.errorcode == 0) {
                cb && cb(res.result)
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

// 通过acid来复制一个新活动页
function addAcmakeByAcid(acid) {
    getAcmakeByAcid(acid, (res) => {
        $.ajax({
            url: '/management/activity/acmakev2/add',
            type: 'post',
            data: res.list[0],
            success: function(res) {
                timeout.popwin_submit = 0
                alert('添加成功！')
                getAcmakeList(pageData.current)
                $('#view_clonewin, #view_mask').hide()
            }
        })
    })
}

// 更新、新增活动页信息
function updateAcmake(data) {
    if (data == -1) {
        return
    }
    data.ip = ip
    if (data.acid) {
        $.ajax({
            url: '/management/activity/acmakev2/update',
            type: 'post',
            data: data,
            success: function(res) {
                timeout.popwin_submit = 0
                alert('修改成功！')
                getAcmakeList(pageData.current)
                $('#view_popwin, #view_mask').hide()
            }
        })
    } else {
        $.ajax({
            url: '/management/activity/acmakev2/add',
            type: 'post',
            data: data,
            success: function(res) {
                timeout.popwin_submit = 0
                alert('添加成功！')
                getAcmakeList(pageData.current)
                $('#view_popwin, #view_mask').hide()
            }
        })
    }
}

// 上传活动页
function publish (acid) {
    $.ajax({
        url: '/management/activity/acmakev2/publish',
        type: 'post',
        data: {
            acid: acid,
            ip: ip
        },
        success: function(res) {
            res = JSON.parse(res)
            if (res.errorcode == 0) {
                alert('发布成功！')
                getAcmakeList(pageData.current)
            } else {
                alert(res.errormsg)
                getAcmakeList(pageData.current)
            }
        },
        error: function (res) {
            console.log(res)
        }
    })
}

// 上传图片
function upfile () {
	$.ajaxFileUpload({
		url: '/fileupload/index/upload/?apiName=neican&apiCode=0&uploadType=2&waterMark=1',
		type: 'POST',
		async: false,
		dataType: 'json',
		secureuri: false,
		fileElementId: 'view_imguploadwin_openImg',
		success: function(callbackResult, status) {
			if (callbackResult.errorcode == 0) {
				var imgUrl = callbackResult.result.url
                if (imgUrl !== '') {
                	$('#view_imguploadwin_url').html(imgUrl)
                	$('#view_imguploadwin_result').show()
                } else {
                    alert('请您检查上传地址是否正常！')
                	$('#view_imguploadwin_result').hide()
                }
				$('#view_imguploadwin_openImg').val('')
			} else {
				alert(callbackResult.result.tip)
            	$('#view_imguploadwin_result').hide()
				$('#view_imguploadwin_openImg').val('')
			}
		},
		error: function(data, status, e) {
			alert('图片上传失败，请换用火狐浏览器试一下！')
        	$('#view_imguploadwin_result').hide()
			$('#view_imguploadwin_openImg').val('')
		}
	})
}
function loadScript (src, callback) {
    var body= document.getElementsByTagName("body")[0]
    var script= document.createElement("script")
    script.type= "text/javascript"
    script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            callback ? callback() : ""
            script.onload = script.onreadystatechange = null
        }
    }
    script.src= src
    body.appendChild(script)
}