/**
 * 人口信息管理初始化
 */
var PeopleInfo = {
    id: "PeopleInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PeopleInfo.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id', field: 'peopleInfoMemberId', visible: false, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'peopleInfoMemberName', visible: true, align: 'center', valign: 'middle'},
        {title: '性别', field: 'peopleInfoMemberSex', visible: true, align: 'center', valign: 'middle'},
        {title: '与家庭关系', field: 'peopleInfoMemberRelation', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证', field: 'peopleInfoMemberCard', visible: true, align: 'center', valign: 'middle'},
        {title: '工作单位', field: 'peopleInfoMemberWorkplace', visible: true, align: 'center', valign: 'middle'},
        {title: '联系方式', field: 'peopleInfoMemberPhone', visible: true, align: 'center', valign: 'middle'},
        {title: '具体住址', field: 'peopleInfoMemberAddress', visible: true, align: 'center', valign: 'middle'},
        {title: '态度（对邪教）', field: 'peopleInfoMemberAttitude', visible: true, align: 'center', valign: 'middle'},
      {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: PeopleInfo.operateFormatter, width: '20%'}
    ];
};




PeopleInfo.operateFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="PeopleInfo.edit(' + row.peopleInfoMemberId + ')">编辑</button>';
    return [result].join('');
};


/**
 * 打开查看人口信息详情
 */
PeopleInfo.openPeopleInfoDetail = function (id) {
    if(id == undefined){
        id = 0;
    }
    var index = layer.open({
        type: 2,
        title: '编辑房间信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/peopleInfo/peopleInfo_update/'+id
    });
    this.layerIndex = index;
};



/**
 * 编辑家庭成员
 */
PeopleInfo.edit = function (id) {

    var index = layer.open({
        type: 2,
        title: '编辑家庭成员及主要社会关系',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/peopleInfoMember/peopleInfoMember_update/'+id
    });
    this.layerIndex = index;
};


/**
 * 加载基本信息详情
 */
PeopleInfo.reloadUserInfoDetail = function (data) {
    for (var key in data) {
        $('#' + key).html(data[key]);
    }
};

/**
 * 查询人口信息列表
 */
PeopleInfo.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PeopleInfo.table.refresh({query: queryData});
};

/**
 * 设置userId
 */
PeopleInfo.setId = function () {
    var url = location.pathname;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
/*    var ul = '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li>';*/
    var ul = '<div class="f-items"><div class="info">静态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
        + '<div class="f-items"><div class="info">涉邪信息</div><li ><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
        + '<div class="f-items"><div class="info">动态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';
    $('#userInfoId').val(id);
    $('.tab-menu').append(ul);
};

$(function () {
    PeopleInfo.setId();
    var defaultColunms = PeopleInfo.initColumn();
    var table = new BSTable(PeopleInfo.id, "/peopleInfoMember/list/" + $('#userInfoId').val(), defaultColunms);
    table.setPaginationType("client");
    PeopleInfo.table = table.init();
});
