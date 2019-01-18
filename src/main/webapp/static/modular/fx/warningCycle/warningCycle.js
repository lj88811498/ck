/**
 * 预警周期管理初始化
 */
var WarningCycle = {
    id: "WarningCycleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningCycle.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningCycle.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningCycle.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警周期
 */
WarningCycle.openAddWarningCycle = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警周期',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningCycle/warningCycle_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警周期详情
 */
WarningCycle.openWarningCycleDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警周期详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningCycle/warningCycle_update/' + WarningCycle.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警周期
 */
WarningCycle.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningCycle/delete", function (data) {
            Feng.success("删除成功!");
            WarningCycle.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningCycleId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警周期列表
 */
WarningCycle.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningCycle.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WarningCycle.initColumn();
    var table = new BSTable(WarningCycle.id, "/warningCycle/list", defaultColunms);
    table.setPaginationType("client");
    WarningCycle.table = table.init();
});
