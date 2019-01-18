/**
 * 管理初始化
 */
var ActivityManager = {
    id: "ActivityManagerTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
ActivityManager.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'activityManagerId', visible: true, align: 'center', valign: 'middle'},
            {title: '填报时间', field: 'activityManagerTime', visible: true, align: 'center', valign: 'middle'},
            {title: '填报单位', field: 'activityManagerUnit', visible: true, align: 'center', valign: 'middle'},
            {title: '填报人', field: 'activityManagerName', visible: true, align: 'center', valign: 'middle'},
            {title: '分管领导', field: 'activityManagerLeader', visible: true, align: 'center', valign: 'middle'},
            {title: '新增邪教人员', field: 'activityManagerNewly', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'activityManagerCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'activityManagerUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'activityManagerUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'activityManagerCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
ActivityManager.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        ActivityManager.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
ActivityManager.openAddActivityManager = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityManager/activityManager_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
ActivityManager.openActivityManagerDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/activityManager/activityManager_update/' + ActivityManager.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
ActivityManager.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/activityManager/delete", function (data) {
            Feng.success("删除成功!");
            ActivityManager.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("activityManagerId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
ActivityManager.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    ActivityManager.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = ActivityManager.initColumn();
    var table = new BSTable(ActivityManager.id, "/activityManager/list", defaultColunms);
    table.setPaginationType("client");
    ActivityManager.table = table.init();
});
