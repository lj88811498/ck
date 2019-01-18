/**
 * 收藏管理初始化
 */
var Collet = {
    id: "ColletTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Collet.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Collet.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Collet.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加收藏
 */
Collet.openAddCollet = function () {
    var index = layer.open({
        type: 2,
        title: '添加收藏',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/collet/collet_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看收藏详情
 */
Collet.openColletDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '收藏详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/collet/collet_update/' + Collet.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除收藏
 */
Collet.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/collet/delete", function (data) {
            Feng.success("删除成功!");
            Collet.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("colletId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询收藏列表
 */
Collet.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Collet.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Collet.initColumn();
    var table = new BSTable(Collet.id, "/collet/list", defaultColunms);
    table.setPaginationType("client");
    Collet.table = table.init();
});
