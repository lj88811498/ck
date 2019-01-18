/**
 * Created by Administrator on 2018/8/6 0006.
 */
/**
 * 基本信息管理初始化
 */
var UserInfo = {
    hospitalId: "hospitalTable",
    outpatientId: "outpatientTable",
    businessId: "businessTable",
    socialId:"social",
    seItem: null,		//选中的条目
    table: null,
    socialTable:null,
    layerIndex: -1
};

/**
 * 打开查看基本信息详情
 */
UserInfo.openUserInfoDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '编辑基本信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userInfo/userInfo_update/' + id
    });
    this.layerIndex = index;
};


/**
 * 加载基本信息详情
 */
UserInfo.reloadUserInfoDetail = function (data) {
    for (var key in data) {
        $('#' + key).html(data[key]);
    }
};


/**
 * 设置userId
 */
UserInfo.setId = function () {
    var url = location.pathname;
    var name = location.search.substr(1);
    name= decodeURIComponent(name, true);
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);

        var ul = '<div class="f-items"><div class="info">静态信息</div><li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
            + '<div class="f-items"><div class="info">涉邪信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
            + '<div class="f-items"><div class="info">动态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';

    $('#userInfoId').val(id);
    $('.tab-menu').append(ul);
};

$(function () {
    UserInfo.setId();

});
