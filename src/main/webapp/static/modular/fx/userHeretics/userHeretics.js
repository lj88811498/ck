/**
 * 帮教信息管理初始化
 */
var UserHeretics = {
    id: "UserHereticsTable",	//表格id
    id1: "UserHereticsTable1",	//表格id
    personId:"UserHereticsPersonTable",//帮教责任人id
    userId: $('#userInfoId').val(),
    seItem: null,		//选中的条目
    table: null,
    table1: null,
    table2:null,
    layerIndex: -1
};

/**
 * 表格行操作
 */
UserHeretics.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserHeretics.editUserHereticsDetail(' + row.userHereticsRecordId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserHeretics.delete(' + row.userHereticsRecordId + ')">删除</button>';
    return [result].join('');
};

/**
 * 初始化表格的列
 */
UserHeretics.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '帮扶时间', field: 'userHereticsRecordTime', visible: true, align: 'center', valign: 'middle'},
        {title: '帮教人员', field: 'userHereticsRecordHelperName', visible: true, align: 'center', valign: 'middle'},
        {title: '帮教地点', field: 'userHereticsRecordCallLocation', visible: true, align: 'center', valign: 'middle'},
        {title: '回访帮教内容', field: 'userHereticsRecordContent', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: UserHeretics.operateFormatter, width: '20%'}
    ];
};

UserHeretics.initColumn1 = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id' , field: 'userHereticsLearnId', visible: false, align: 'center', valign: 'middle'},
        {title: '学习时间', field: 'userHereticsLearnTime', visible: true, align: 'center', valign: 'middle'},
        {title: '地点', field: 'userHereticsLearnLocal', visible: true, align: 'center', valign: 'middle'},
        {title: '学习情况', field: 'userHereticsLearnInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '备注', field: 'userHereticsLearnDesc', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: UserHeretics.operateLearnFormatter, width: '20%'}
    ];
};

UserHeretics.initPersonColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id',field: 'userHereticsDutyId', visible: false, radio: false, checkbox: false},
        {title: '职务', field: 'userHereticsDutyJob', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'userHereticsDutyName', visible: true, align: 'center', valign: 'middle'},
        {title: '联系电话', field: 'userHereticsDutyTel', visible: true, align: 'center', valign: 'middle'},
        {title: '责任单位', field: 'userHereticsDutyUnit', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: UserHeretics.operatePersonFormatter, width: '20%'}
    ];
};

UserHeretics.operateLearnFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserHeretics.openUserHereticsLearnDetail(' + row.userHereticsLearnId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserHeretics.deleteLearn(' + row.userHereticsLearnId + ')">删除</button>';
    return [result].join('');
};

UserHeretics.operatePersonFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserHeretics.openUserHereticsDetail(' + row.userHereticsDutyId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserHeretics.deletePerson(' + row.userHereticsDutyId + ')">删除</button>';
    return [result].join('');
};


UserHeretics.openUserHereticsLearnDetail = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑进班学习情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsLearn/userHereticsLearn_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 删除进班学习情况
 */
UserHeretics.deleteLearn = function(id){
    Feng.confirm('是否删除进班学习情况？', function () {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsLearn/delete", function (data) {
            Feng.success("删除成功!");
            UserHeretics.table1.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsLearnId", id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};

/**
 * 删除帮教责任人
 */
UserHeretics.deletePerson = function(id){
    Feng.confirm('是否删除帮教责任人？', function () {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsDuty/delete", function (data) {
            Feng.success("删除成功!");
            UserHeretics.table2.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsDutyId", id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};

/**
 * 点击添加帮教记录
 */
UserHeretics.openAddUserHeretics = function () {
    var index = layer.open({
        type: 2,
        title: '新增帮教记录',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsRecord/userHereticsRecord_add'
    });
    this.layerIndex = index;
};


/**
 * 点击添加进班学习情况
 */
UserHeretics.openAddUserHeretics1 = function(){
    var index = layer.open({
        type: 2,
        title: '新增曾经学习班情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsLearn/userHereticsLearn_add'
    });
    this.layerIndex = index;
};

/**
 * 点击添加帮教责任人
 */
UserHeretics.openAddUserHereticsDuty = function () {
    var index = layer.open({
        type: 2,
        title: '新增帮教责任人',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsDuty/userHereticsDuty_add'
    });
    this.layerIndex = index;
};



/**
 * 打开查看帮教信息详情
 */
UserHeretics.openUserHereticsDetail = function (id) {
    // var id = $('#userInfoId').val();

    if(id == undefined){
       id = 0;
    }
    var index = layer.open({
        type: 2,
        title: '编辑帮教责任人',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsDuty/userHereticsDuty_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 打开编辑帮教记录
 */
UserHeretics.editUserHereticsDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '编辑帮教记录',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsRecord/userHereticsRecord_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 删除帮教信息
 */
UserHeretics.delete = function (id) {
    Feng.confirm('是否删除帮教记录？', function () {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsRecord/delete", function (data) {
            Feng.success("删除成功!");
            UserHeretics.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsRecordId", id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};

/**
 * 查询帮教信息列表
 */
UserHeretics.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    UserHeretics.table.refresh({query: queryData});
};


/**
 * 查询学习列表
 */
UserHeretics.search1 = function () {
    var queryData = {};
    queryData['beginTime1'] = $("#beginTime1").val();
    queryData['endTime1'] = $("#endTime1").val();
    UserHeretics.table1.refresh({query: queryData});
};

/**
 * 加载基本信息详情
 */
UserHeretics.reloadUserInfoDetail = function (data) {
    for (var key in data) {
        $('#' + key).html(data[key]);
    }
};

/**
 * 设置userId
 */
UserHeretics.setId = function () {
    var url = location.pathname;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
    /*var ul = '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li>';*/
    var ul = '<div class="f-items"><div class="info">静态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
        + '<div class="f-items"><div class="info">涉邪信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
        + '<div class="f-items"><div class="info">动态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';
    $('#userInfoId').val(id);
    $('.tab-menu').append(ul);
};

$(function () {
    UserHeretics.setId();
    var defaultColunms = UserHeretics.initColumn();
    var defaultColunms1 = UserHeretics.initColumn1();
    var defaultPersonColunms = UserHeretics.initPersonColumn();
    var table = new BSTable(UserHeretics.id, "/userHereticsRecord/list/" + $('#userInfoId').val(), defaultColunms);
    var table1 = new BSTable(UserHeretics.id1, "/userHereticsLearn/list/"+ $('#userInfoId').val(), defaultColunms1);
    var table2 = new BSTable(UserHeretics.personId, "/userHereticsDuty/list", defaultPersonColunms);
    table.setPaginationType("client");
    table1.setPaginationType("client");
    table2.setPaginationType("server");
    table2.setQueryParams({userHereticsDutyType: 1,userId:$('#userInfoId').val()});
    table.setPageSize('5');
    table1.setPageSize('5');
    table2.setPageSize('5');
    UserHeretics.table = table.init('get');
    UserHeretics.table1 = table1.init('get');
    UserHeretics.table2 = table2.init('get');
});
