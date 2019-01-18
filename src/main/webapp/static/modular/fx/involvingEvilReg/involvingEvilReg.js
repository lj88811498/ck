/**
 * 涉邪教案件登记表管理初始化
 */
var InvolvingEvilReg = {
    id: "InvolvingEvilRegTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
InvolvingEvilReg.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
InvolvingEvilReg.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        InvolvingEvilReg.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加涉邪教案件登记表
 */
InvolvingEvilReg.openAddInvolvingEvilReg = function () {
    var index = layer.open({
        type: 2,
        title: '添加涉邪教案件登记表',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvilReg/involvingEvilReg_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看涉邪教案件登记表详情
 */
InvolvingEvilReg.openInvolvingEvilRegDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '涉邪教案件登记表详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/involvingEvilReg/involvingEvilReg_update/' + InvolvingEvilReg.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除涉邪教案件登记表
 */
InvolvingEvilReg.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/involvingEvilReg/delete", function (data) {
            Feng.success("删除成功!");
            InvolvingEvilReg.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("involvingEvilRegId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询涉邪教案件登记表列表
 */
InvolvingEvilReg.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    InvolvingEvilReg.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = InvolvingEvilReg.initColumn();
    var table = new BSTable(InvolvingEvilReg.id, "/involvingEvilReg/list", defaultColunms);
    table.setPaginationType("client");
    InvolvingEvilReg.table = table.init();
});
