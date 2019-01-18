/**
 * 科室管理初始化
 */
var Office = {
    id: "OfficeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Office.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Office.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Office.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加科室
 */
Office.openAddOffice = function () {
    var index = layer.open({
        type: 2,
        title: '添加科室',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/office/office_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看科室详情
 */
Office.openOfficeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '科室详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/office/office_update/' + Office.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除科室
 */
Office.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/office/delete", function (data) {
            Feng.success("删除成功!");
            Office.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("officeId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询科室列表
 */
Office.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Office.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Office.initColumn();
    var table = new BSTable(Office.id, "/office/list", defaultColunms);
    table.setPaginationType("client");
    Office.table = table.init();
});
