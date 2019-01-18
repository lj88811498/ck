/**
 * 受打击处理情况管理初始化
 */
var InvolvingEvilRecord = {
    id: "crackdownTableId",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
InvolvingEvilRecord.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
InvolvingEvilRecord.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        InvolvingEvilRecord.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加受打击处理情况
 */
InvolvingEvilRecord.openAddInvolvingEvilRecord = function () {
    var index = layer.open({
        type: 2,
        title: '添加受打击处理情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvilRecord/involvingEvilRecord_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看受打击处理情况详情
 */
InvolvingEvilRecord.openInvolvingEvilRecordDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '受打击处理情况详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/involvingEvilRecord/involvingEvilRecord_update/' + InvolvingEvilRecord.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除受打击处理情况
 */
InvolvingEvilRecord.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/involvingEvilRecord/delete", function (data) {
            Feng.success("删除成功!");
            InvolvingEvilRecord.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("involvingEvilRecordId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询受打击处理情况列表
 */
InvolvingEvilRecord.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    InvolvingEvilRecord.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = InvolvingEvilRecord.initColumn();
    var table = new BSTable(InvolvingEvilRecord.id, "/involvingEvilRecord/list", defaultColunms);
    table.setPaginationType("client");
    InvolvingEvilRecord.table = table.init();
});
