/**
 * 预警指数管理初始化
 */
var WarningIndex = {
    id: "WarningIndexTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningIndex.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningIndex.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningIndex.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警指数
 */
WarningIndex.openAddWarningIndex = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警指数',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningIndex/warningIndex_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警指数详情
 */
WarningIndex.openWarningIndexDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警指数详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningIndex/warningIndex_update/' + WarningIndex.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警指数
 */
WarningIndex.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningIndex/delete", function (data) {
            Feng.success("删除成功!");
            WarningIndex.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningIndexId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警指数列表
 */
WarningIndex.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningIndex.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WarningIndex.initColumn();
    var table = new BSTable(WarningIndex.id, "/warningIndex/list", defaultColunms);
    table.setPaginationType("client");
    WarningIndex.table = table.init();
});
