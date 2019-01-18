/**
 * 初始化涉邪信息详情对话框
 */
var MonitorInvolvingEvil= {
    id:"MonitorInvolvingEvilTable",
    table:null,
    involvingEvilInfoData : {},
    involvingEvilInfoAddData:{}
};


/**
 * 表格行操作
 */
MonitorInvolvingEvil.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserHeretics.editUserHereticsDetail(' + row.userHereticsRecordId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserHeretics.delete(' + row.userHereticsRecordId + ')">删除</button>';
    return [result].join('');
};

/**
 * 初始化表格的列
 */
MonitorInvolvingEvil.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '时间', field: 'involvingEvilRegArrestTime', visible: true, align: 'center', valign: 'middle'},
        {title: '案发地', field: 'involvingEvilRegLocal', visible: true, align: 'center', valign: 'middle'},
        {title: '案件情况', field: 'involvingEvilRegInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '处理情况', field: 'involvingEvilRegObjInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '处罚期限', field: 'involvingEvilRegPunishTime', visible: true, align: 'center', valign: 'middle'},
        {title: '解除处罚时间', field: 'involvingEvilRegUnpunishedTime' , visible: true, align: 'center', valign: 'middle'},
        // {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: UserHeretics.operateFormatter, width: '20%'}
    ];
};

/**
 * 查询帮教信息列表
 */
MonitorInvolvingEvil.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    MonitorUserHeretics.table.refresh({query: queryData});
};


$(function () {
    var userId = window.parent.$("#returnInvolving").data('id');
    var defaultColunms = MonitorInvolvingEvil.initColumn();
    var table = new BSTable(MonitorInvolvingEvil.id, "/involvingEvilReg/detail/" + userId, defaultColunms);
    table.setPaginationType("client");
    table.setPageSize('5');
    MonitorInvolvingEvil.table = table.init();

});