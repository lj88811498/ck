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
 * 初始化住院表格的列
 */
UserInfo.initHosColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '患者姓名', field: 'hospitalName', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证', field: 'hospitalCard', visible: true, align: 'center', valign: 'middle'},
        {title: '入院时间', field: 'hospitalInTime', visible: true, align: 'center', valign: 'middle', width: '10%'},
        {title: '入院科别', field: 'hospitalInType', visible: true, align: 'center', valign: 'middle'},
        {title: '入院诊别', field: 'hospitalInCheck', visible: true, align: 'center', valign: 'middle'},
        {title: '出院时间', field: 'hospitalOutTime', visible: true, align: 'center', valign: 'middle'},
        {title: '出院科别', field: 'hospitalOutType', visible: true, align: 'center', valign: 'middle'},
        {title: '出院诊断', field: 'hospitalOutCheck', visible: true, align: 'center', valign: 'middle'},
        {title: '出院医嘱', field: 'hospitalOutDesc', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 初始化门诊表格的列
 */
UserInfo.initOutColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '患者姓名', field: 'hospitalDoorName', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证', field: 'hospitalDoorCard', visible: true, align: 'center', valign: 'middle'},
        {title: '就诊时间', field: 'hospitalDoorInTime', visible: true, align: 'center', valign: 'middle', width: '10%'},
        {title: '就诊科室', field: 'hospitalDoorInType', visible: true, align: 'center', valign: 'middle'},
        {title: '主诉', field: 'hospitalDoorInCheck', visible: true, align: 'center', valign: 'middle'},
        {title: '诊断', field: 'hospitalDoorOutTime', visible: true, align: 'center', valign: 'middle'},
        {title: '医嘱', field: 'hospitalDoorOutDesc', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 初始化工商表格的列
 */
UserInfo.initBusColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '注册号', field: 'icInfoCode', visible: true, align: 'center', valign: 'middle'},
        {title: '主体名称', field: 'icInfoObjName', visible: true, align: 'center', valign: 'middle'},
        {title: '企业机构', field: 'icInfoOrg', visible: true, align: 'center', valign: 'middle', width: '10%'},
        {title: '登记机关', field: 'icInfoDept', visible: true, align: 'center', valign: 'middle'},
        {title: '主体状态', field: 'icInfoObjStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '档案号', field: 'icInfoDocCode', visible: true, align: 'center', valign: 'middle'},
        {title: '业务办理状态', field: 'icInfoWorkflowStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '属地工商', field: 'icInfoArea', visible: true, align: 'center', valign: 'middle'},
        {title: '行业门类', field: 'icInfoCategory', visible: true, align: 'center', valign: 'middle'},
        {title: '行业代码', field: 'icInfoCategoryCode', visible: true, align: 'center', valign: 'middle'}
    ];
};


/**
 * 初始化社保列表的列
 */
UserInfo.initSocialColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id', field: 'socialId', visible: false, align: 'center', valign: 'middle'},
        {title: '领取社保时间', field: 'socialTime', visible: true, align: 'center', valign: 'middle'},
        {title: '领取社保地点', field: 'socialLocal', visible: true, align: 'center', valign: 'middle', width: '10%'},
        {title: '领取社保金额', field: 'socialMoney', visible: true, align: 'center', valign: 'middle'},
    ];
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
 * 新增从业信息
 */
UserInfo.addEmployment = function(){
    var index = layer.open({
        type: 2,
        title: '新增从业信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userInfo/userInfo_add/'
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
 * 加载从业信息
 */
UserInfo.employment = function(){
    var ajax = new $ax(Feng.ctxPath + "/employment/list", function(res){
       var data = res.page.records;
       var str = "";
       for(var i = 0 ; i < data.length; i++){
           str += '<li id='+data[i].employmentId+'><span>'+data[i].employmentInfo+'</span>'+
               '<button type="button" class="btn btn-info nocolor-btn" onclick="UserInfo.employmentEdit(' + data[i].employmentId + ')" style="margin-left: 30px;">编辑</button></li>'
           $("#employmentIsJoin").html(data[i].employmentIsJoin);
           $("#employmentIsReceive").html(data[i].employmentIsReceive);
       }
       $(".detail-info ul").append(str);
    },function(data){
        Feng.error("数据获取失败!" + data.responseJSON.message + "!");
    });
    ajax.set("employmentUserId",$('#userInfoId').val());
    ajax.start('get');
};



/**
 * 从业信息编辑
 */
UserInfo.employmentEdit = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑从业信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/employment/employment_update/'+ id
    });
    this.layerIndex = index;
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

    var ul ='<div class="f-items"><div class="info">静态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
            + '<div class="f-items"><div class="info">涉邪信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
            + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
            + '<div class="f-items"><div class="info">动态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
            + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';

    $('#userInfoId').val(id);
    $('.tab-menu').append(ul);
};

$(function () {
    UserInfo.setId();
    UserInfo.employment();
    var hosColunms = UserInfo.initHosColumn();
    var outColunms = UserInfo.initOutColumn();
    var busColunms = UserInfo.initBusColumn();
    var socialColunms = UserInfo.initSocialColumn();
    var hosTable = new BSTable(UserInfo.hospitalId, "/hospital/list", hosColunms);
    var outTable = new BSTable(UserInfo.outpatientId, "/hospitalDoor/list", outColunms);
    var busTable = new BSTable(UserInfo.businessId, "/icInfo/list", busColunms);
    var socialtable = new BSTable(UserInfo.socialId, "/social/list", socialColunms);
    hosTable.setPaginationType("client");
    outTable.setPaginationType("client");
    busTable.setPaginationType("client");
    socialtable.setPaginationType("client");
    hosTable.setQueryParams({userId: $('#userInfoId').val()});
    outTable.setQueryParams({userId: $('#userInfoId').val()});
    busTable.setQueryParams({userId: $('#userInfoId').val()});
    socialtable.setQueryParams({socialUserId: $('#userInfoId').val()});
    hosTable.setPageSize('5');
    outTable.setPageSize('5');
    busTable.setPageSize('5');
    socialtable.setPageSize('5');

    UserInfo.table = hosTable.init();
    UserInfo.table = outTable.init();
    UserInfo.table = busTable.init();
    UserInfo.socialTable = socialtable.init('get');
});
