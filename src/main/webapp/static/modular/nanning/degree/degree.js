/**
 * 满意度管理初始化
 */
var Degree = {
    id: "DegreeTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Degree.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Degree.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Degree.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加满意度
 */
Degree.openAddDegree = function () {
    var index = layer.open({
        type: 2,
        title: '添加满意度',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/degree/degree_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看满意度详情
 */
Degree.openDegreeDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '满意度详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/degree/degree_update/' + Degree.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除满意度
 */
Degree.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/degree/delete", function (data) {
            Feng.success("删除成功!");
            Degree.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("degreeId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询满意度列表
 */
Degree.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Degree.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Degree.initColumn();
    var table = new BSTable(Degree.id, "/degree/list", defaultColunms);
    table.setPaginationType("client");
    Degree.table = table.init();
});
