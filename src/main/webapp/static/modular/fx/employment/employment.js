/**
 * 管理初始化
 */
var Employment = {
    id: "EmploymentTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Employment.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'employmentId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'employmentUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '从业信息', field: 'employmentInfo', visible: true, align: 'center', valign: 'middle'},
            {title: '是否参加社保', field: 'employmentIsJoin', visible: true, align: 'center', valign: 'middle'},
            {title: '是否领取社保', field: 'employmentIsReceive', visible: true, align: 'center', valign: 'middle'},
            {title: '备注', field: 'employmentDesc', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'employmentCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'employmentUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'employmentUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'employmentCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Employment.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Employment.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
Employment.openAddEmployment = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/employment/employment_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
Employment.openEmploymentDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/employment/employment_update/' + Employment.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
Employment.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/employment/delete", function (data) {
            Feng.success("删除成功!");
            Employment.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("employmentId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
Employment.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Employment.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Employment.initColumn();
    var table = new BSTable(Employment.id, "/employment/list", defaultColunms);
    table.setPaginationType("client");
    Employment.table = table.init();
});
