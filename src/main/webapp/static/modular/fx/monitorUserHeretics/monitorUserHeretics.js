/**
 * 帮教信息管理初始化
 */
var MonitorUserHeretics = {
    id: "MonitorUserHereticsTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 表格行操作
 */
MonitorUserHeretics.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserHeretics.editUserHereticsDetail(' + row.userHereticsRecordId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserHeretics.delete(' + row.userHereticsRecordId + ')">删除</button>';
    return [result].join('');
};

/**
 * 初始化表格的列
 */
MonitorUserHeretics.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '帮扶时间', field: 'userHereticsRecordTime', visible: true, align: 'center', valign: 'middle'},
        {title: '帮教人员', field: 'userHereticsRecordHelperName', visible: true, align: 'center', valign: 'middle'},
        {title: '帮教地点', field: 'userHereticsRrecordCallLocation', visible: true, align: 'center', valign: 'middle'},
        {title: '回访帮教内容', field: 'userHereticsRecordContent', visible: true, align: 'center', valign: 'middle'},
        // {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: UserHeretics.operateFormatter, width: '20%'}
    ];
};

/**
 * 查询帮教信息列表
 */
MonitorUserHeretics.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    MonitorUserHeretics.table.refresh({query: queryData});
};

/**
 * 查询学习列表
 */
MonitorUserHeretics.search1 = function () {
    var queryData = {};
    queryData['beginTime1'] = $("#beginTime1").val();
    queryData['endTime1'] = $("#endTime1").val();
    MonitorUserHeretics.table1.refresh({query: queryData});
};

$(function () {
    var userId = window.parent.$("#returnRecord").data('id');
    var defaultColunms = MonitorUserHeretics.initColumn();
    var table = new BSTable(MonitorUserHeretics.id, "/userHereticsRecord/list/" + userId, defaultColunms);
    table.setPaginationType("client");
    table.setPageSize('5');
    MonitorUserHeretics.table = table.init('get');

});
