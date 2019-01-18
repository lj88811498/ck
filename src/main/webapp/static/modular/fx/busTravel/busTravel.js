/**
 * 公交出行信息管理初始化
 */
var BusTravel = {
    id: "BusTravelTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
BusTravel.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
BusTravel.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        BusTravel.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加公交出行信息
 */
BusTravel.openAddBusTravel = function () {
    var index = layer.open({
        type: 2,
        title: '添加公交出行信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/busTravel/busTravel_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看公交出行信息详情
 */
BusTravel.openBusTravelDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '公交出行信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/busTravel/busTravel_update/' + BusTravel.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除公交出行信息
 */
BusTravel.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/busTravel/delete", function (data) {
            Feng.success("删除成功!");
            BusTravel.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("busTravelId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询公交出行信息列表
 */
BusTravel.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    BusTravel.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = BusTravel.initColumn();
    var table = new BSTable(BusTravel.id, "/busTravel/list", defaultColunms);
    BusTravel.table = table.init();
});
