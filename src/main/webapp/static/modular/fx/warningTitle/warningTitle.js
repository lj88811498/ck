/**
 * 预警标签管理初始化
 */
var WarningTitle = {
    id: "WarningTitleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningTitle.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningTitle.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningTitle.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警标签
 */
WarningTitle.openAddWarningTitle = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警标签',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningTitle/warningTitle_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警标签详情
 */
WarningTitle.openWarningTitleDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警标签详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningTitle/warningTitle_update/' + WarningTitle.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警标签
 */
WarningTitle.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningTitle/delete", function (data) {
            Feng.success("删除成功!");
            WarningTitle.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningTitleId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警标签列表
 */
WarningTitle.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningTitle.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WarningTitle.initColumn();
    var table = new BSTable(WarningTitle.id, "/warningTitle/list", defaultColunms);
    table.setPaginationType("client");
    WarningTitle.table = table.init();
});
