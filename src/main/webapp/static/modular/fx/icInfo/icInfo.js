/**
 * 工商信息管理初始化
 */
var IcInfo = {
    id: "IcInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
IcInfo.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
IcInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        IcInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加工商信息
 */
IcInfo.openAddIcInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加工商信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/icInfo/icInfo_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看工商信息详情
 */
IcInfo.openIcInfoDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '工商信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/icInfo/icInfo_update/' + IcInfo.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除工商信息
 */
IcInfo.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/icInfo/delete", function (data) {
            Feng.success("删除成功!");
            IcInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("icInfoId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询工商信息列表
 */
IcInfo.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    IcInfo.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = IcInfo.initColumn();
    var table = new BSTable(IcInfo.id, "/icInfo/list", defaultColunms);
    table.setPaginationType("client");
    IcInfo.table = table.init();
});
