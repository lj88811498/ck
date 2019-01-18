/**
 * 预警建议管理初始化
 */
var WarningAdvise = {
    id: "WarningAdviseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningAdvise.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningAdvise.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningAdvise.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警建议
 */
WarningAdvise.openAddWarningAdvise = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警建议',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningAdvise/warningAdvise_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警建议详情
 */
WarningAdvise.openWarningAdviseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警建议详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningAdvise/warningAdvise_update/' + WarningAdvise.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警建议
 */
WarningAdvise.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningAdvise/delete", function (data) {
            Feng.success("删除成功!");
            WarningAdvise.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningAdviseId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警建议列表
 */
WarningAdvise.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningAdvise.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WarningAdvise.initColumn();
    var table = new BSTable(WarningAdvise.id, "/warningAdvise/list", defaultColunms);
    table.setPaginationType("client");
    WarningAdvise.table = table.init();
});
