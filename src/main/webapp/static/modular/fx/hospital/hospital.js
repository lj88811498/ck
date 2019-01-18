/**
 * 住院信息管理初始化
 */
var Hospital = {
    id: "HospitalTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Hospital.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Hospital.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Hospital.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加住院信息
 */
Hospital.openAddHospital = function () {
    var index = layer.open({
        type: 2,
        title: '添加住院信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/hospital/hospital_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看住院信息详情
 */
Hospital.openHospitalDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '住院信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/hospital/hospital_update/' + Hospital.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除住院信息
 */
Hospital.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/hospital/delete", function (data) {
            Feng.success("删除成功!");
            Hospital.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("hospitalId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询住院信息列表
 */
Hospital.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Hospital.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Hospital.initColumn();
    var table = new BSTable(Hospital.id, "/hospital/list", defaultColunms);
    table.setPaginationType("client");
    Hospital.table = table.init();
});
