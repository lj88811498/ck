/**
 * 帮教记录管理初始化
 */
var UserHereticsRecord = {
    id: "UserHereticsRecordTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
UserHereticsRecord.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
UserHereticsRecord.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserHereticsRecord.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加帮教记录
 */
UserHereticsRecord.openAddUserHereticsRecord = function () {
    var index = layer.open({
        type: 2,
        title: '添加帮教记录',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsRecord/userHereticsRecord_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看帮教记录详情
 */
UserHereticsRecord.openUserHereticsRecordDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '帮教记录详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userHereticsRecord/userHereticsRecord_update/' + UserHereticsRecord.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除帮教记录
 */
UserHereticsRecord.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsRecord/delete", function (data) {
            Feng.success("删除成功!");
            UserHereticsRecord.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsRecordId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询帮教记录列表
 */
UserHereticsRecord.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    UserHereticsRecord.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = UserHereticsRecord.initColumn();
    var table = new BSTable(UserHereticsRecord.id, "/userHereticsRecord/list", defaultColunms);
    table.setPaginationType("client");
    UserHereticsRecord.table = table.init();
});
