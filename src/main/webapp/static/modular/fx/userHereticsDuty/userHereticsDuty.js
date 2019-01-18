/**
 * 管理初始化
 */
var UserHereticsDuty = {
    id: "UserHereticsDutyTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
UserHereticsDuty.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'userHereticsDutyId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'userHereticsDutyUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '责任人名称', field: 'userHereticsDutyName', visible: true, align: 'center', valign: 'middle'},
            {title: '职务类型：社区民警、社区民警、村社区干部、网格员', field: 'userHereticsDutyJob', visible: true, align: 'center', valign: 'middle'},
            {title: '电话', field: 'userHereticsDutyTel', visible: true, align: 'center', valign: 'middle'},
            {title: '责任单位', field: 'userHereticsDutyUnit', visible: true, align: 'center', valign: 'middle'},
            {title: '录入类型：1帮教信息，2管控信息', field: 'userHereticsDutyType', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'userHereticsDutyCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'userHereticsDutyUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'userHereticsDutyUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'userHereticsDutyCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
UserHereticsDuty.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserHereticsDuty.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
UserHereticsDuty.openAddUserHereticsDuty = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsDuty/userHereticsDuty_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
UserHereticsDuty.openUserHereticsDutyDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userHereticsDuty/userHereticsDuty_update/' + UserHereticsDuty.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
UserHereticsDuty.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsDuty/delete", function (data) {
            Feng.success("删除成功!");
            UserHereticsDuty.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsDutyId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
UserHereticsDuty.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    UserHereticsDuty.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = UserHereticsDuty.initColumn();
    var table = new BSTable(UserHereticsDuty.id, "/userHereticsDuty/list", defaultColunms);
    table.setPaginationType("client");
    UserHereticsDuty.table = table.init();
});
