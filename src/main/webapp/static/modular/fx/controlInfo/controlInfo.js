/**
 * 管理初始化
 */
var ControlInfo = {
    id: "PersonLiable",	//表格id
    id1:"PersonControl",
    seItem: null,		//选中的条目
    table: null,
    PersonControlTable:null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
ControlInfo.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id',field: 'userHereticsDutyId', visible: false, radio: false, checkbox: false},
        {title: '职务', field: 'userHereticsDutyJob', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'userHereticsDutyName', visible: true, align: 'center', valign: 'middle'},
        {title: '联系电话', field: 'userHereticsDutyTel', visible: true, align: 'center', valign: 'middle'},
        {title: '责任单位', field: 'userHereticsDutyUnit', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ControlInfo.operatePersonFormatter, width: '20%'}
    ];
};


/**
 * 初始化管控情况表格的列
 */
ControlInfo.initControlColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id',field: 'controlInfoId', visible: false, radio: false, checkbox: false},
        {title: '填报时间', field: 'controlInfoTime', visible: true, align: 'center', valign: 'middle'},
        {title: '填报单位', field: 'controlInfoUnit', visible: true, align: 'center', valign: 'middle'},
        {title: '填报人', field: 'controlInfoName', visible: true, align: 'center', valign: 'middle'},
        {title: '分管领导', field: 'controlInfoLeader', visible: true, align: 'center', valign: 'middle'},
        {title: '有无现实活动', field: 'controlInfoIsActivity', visible: true, align: 'center', valign: 'middle'},
        {title: '是否开展上门走访', field: 'controlInfoIsVisit', visible: true, align: 'center', valign: 'middle'},
        {title: '是否稳控当地', field: 'controlInfoMonitor', visible: true, align: 'center', valign: 'middle'},
        {title: '备注', field: 'controlInfoDesc', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ControlInfo.operateControlFormatter, width: '20%'}
    ];
};

/**
 * 添加管控信息操作
 */
ControlInfo.operateControlFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="ControlInfo.openControlDetail(' + row.controlInfoId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ControlInfo.controlDelete(' + row.controlInfoId + ')">删除</button>';
    return [result].join('');
};


ControlInfo.operatePersonFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="ControlInfo.openPersonDetail(' + row.userHereticsDutyId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ControlInfo.delete(' + row.userHereticsDutyId + ')">删除</button>';
    return [result].join('');
};

/**
 * 检查是否选中
 */
ControlInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        ControlInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
ControlInfo.openAddControlInfo = function () {
    var index = layer.open({
        type: 2,
        title: '新增邪教人员管控情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/controlInfo/controlInfo_add'
    });
    this.layerIndex = index;
};


/**
 * 点击添加四保一责任人
 */
ControlInfo.openAddControlDutyInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加五保一责任人',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsDutyForControl/userHereticsDutyForControl_add'
    });
    this.layerIndex = index;
};


/**
 * 打开管控信息详情
 */
ControlInfo.openControlDetail = function(id){
    if(id == undefined){
        id = 0;
    }
    var index = layer.open({
        type: 2,
        title: '编辑邪教人员管控情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath  + '/controlInfo/controlInfo_update/' + id
    });
    this.layerIndex = index;
};


/**
 * 打开查看详情
 */
ControlInfo.openPersonDetail = function (id) {
    if(id == undefined){
        id = 0;
    }
    var index = layer.open({
            type: 2,
            title: '编辑五保一责任人',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath  + '/userHereticsDutyForControl/userHereticsDutyForControl_update/' + id
        });
        this.layerIndex = index;
};


ControlInfo.controlDelete = function (id) {
    Feng.confirm('是否删除管控情况？', function () {
        var ajax = new $ax(Feng.ctxPath + "/controlInfo/delete", function (data) {
            Feng.success("删除成功!");
            ControlInfo.PersonControlTable.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("controlInfoId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};


/**
 * 删除
 */
ControlInfo.delete = function (id) {
    Feng.confirm('是否删除责任人？', function () {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsDutyForControl/delete", function (data) {
            Feng.success("删除成功!");
            ControlInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsDutyId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};

/**
 * 查询列表
 */
ControlInfo.search = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    ControlInfo.PersonControlTable.refresh({query: queryData});
};


/**
 * 设置userId
 */
ControlInfo.setId = function () {
    var url = location.pathname;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
  /*  var ul = '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li>';*/
    var ul = '<div class="f-items"><div class="info">静态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
        + '<div class="f-items"><div class="info">涉邪信息</div><li ><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
        + '<div class="f-items"><div class="info">动态信息</div><li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';
    $('#controInfoUserId').val(id);
    $('.tab-menu').append(ul);
};

$(function () {
    ControlInfo.setId();
    var defaultColunms = ControlInfo.initColumn();
    var defaultControlColunms = ControlInfo.initControlColumn();
    var table = new BSTable(ControlInfo.id, "/userHereticsDuty/list", defaultColunms);
    var controlTable = new BSTable(ControlInfo.id1, "/controlInfo/list", defaultControlColunms);
    table.setPaginationType("client");
    controlTable.setPaginationType("client");
    table.setQueryParams({userHereticsDutyType: 2,userId : $('#controInfoUserId').val()});
    table.setPageSize('5');
    controlTable.setPageSize('5');
    controlTable.setQueryParams({userId : $('#controInfoUserId').val()});
    ControlInfo.table = table.init('get');
    ControlInfo.PersonControlTable = controlTable.init('get');
});
