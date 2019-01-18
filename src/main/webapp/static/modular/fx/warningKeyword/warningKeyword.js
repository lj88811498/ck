/**
 * 预警关键字管理初始化
 */
var WarningKeyword = {
    id: "WarningKeywordTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningKeyword.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningKeyword.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningKeyword.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警关键字
 */
WarningKeyword.openAddWarningKeyword = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警关键字',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningKeyword/warningKeyword_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警关键字详情
 */
WarningKeyword.openWarningKeywordDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警关键字详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningKeyword/warningKeyword_update/' + WarningKeyword.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警关键字
 */
WarningKeyword.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningKeyword/delete", function (data) {
            Feng.success("删除成功!");
            WarningKeyword.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningKeywordId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警关键字列表
 */
WarningKeyword.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningKeyword.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = WarningKeyword.initColumn();
    var table = new BSTable(WarningKeyword.id, "/warningKeyword/list", defaultColunms);
    table.setPaginationType("client");
    WarningKeyword.table = table.init();
});
