/**
 * 门诊信息管理初始化
 */
var HospitalDoor = {
    id: "HospitalDoorTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
HospitalDoor.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
HospitalDoor.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        HospitalDoor.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加门诊信息
 */
HospitalDoor.openAddHospitalDoor = function () {
    var index = layer.open({
        type: 2,
        title: '添加门诊信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/hospitalDoor/hospitalDoor_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看门诊信息详情
 */
HospitalDoor.openHospitalDoorDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '门诊信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/hospitalDoor/hospitalDoor_update/' + HospitalDoor.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除门诊信息
 */
HospitalDoor.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/hospitalDoor/delete", function (data) {
            Feng.success("删除成功!");
            HospitalDoor.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("hospitalDoorId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询门诊信息列表
 */
HospitalDoor.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    HospitalDoor.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = HospitalDoor.initColumn();
    var table = new BSTable(HospitalDoor.id, "/hospitalDoor/list", defaultColunms);
    HospitalDoor.table = table.init();
});
