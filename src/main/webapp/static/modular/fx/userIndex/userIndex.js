/**
 * 用户指数管理初始化
 */
var UserIndex = {
    id: "UserIndexTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
UserIndex.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
UserIndex.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserIndex.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加用户指数
 */
UserIndex.openAddUserIndex = function () {
    var index = layer.open({
        type: 2,
        title: '添加用户指数',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userIndex/userIndex_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看用户指数详情
 */
UserIndex.openUserIndexDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '用户指数详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userIndex/userIndex_update/' + UserIndex.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除用户指数
 */
UserIndex.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/userIndex/delete", function (data) {
            Feng.success("删除成功!");
            UserIndex.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userIndexId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询用户指数列表
 */
UserIndex.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    UserIndex.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = UserIndex.initColumn();
    var table = new BSTable(UserIndex.id, "/userIndex/list", defaultColunms);
    table.setPaginationType("client");
    UserIndex.table = table.init();
});
