/**
 * 管理初始化
 */
var UserHereticsLearn = {
    id: "UserHereticsLearnTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
UserHereticsLearn.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'userHereticsLearnId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'userHereticsLearnUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '学习时间', field: 'userHereticsLearnTime', visible: true, align: 'center', valign: 'middle'},
            {title: '地点', field: 'userHereticsLearnLocal', visible: true, align: 'center', valign: 'middle'},
            {title: '学习情况', field: 'userHereticsLearnInfo', visible: true, align: 'center', valign: 'middle'},
            {title: '备注', field: 'userHereticsLearnDesc', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'userHereticsLearnCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'userHereticsLearnUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'userHereticsLearnUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'userHereticsLearnCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
UserHereticsLearn.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserHereticsLearn.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
UserHereticsLearn.openAddUserHereticsLearn = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userHereticsLearn/userHereticsLearn_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
UserHereticsLearn.openUserHereticsLearnDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userHereticsLearn/userHereticsLearn_update/' + UserHereticsLearn.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
UserHereticsLearn.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/userHereticsLearn/delete", function (data) {
            Feng.success("删除成功!");
            UserHereticsLearn.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userHereticsLearnId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
UserHereticsLearn.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    UserHereticsLearn.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = UserHereticsLearn.initColumn();
    var table = new BSTable(UserHereticsLearn.id, "/userHereticsLearn/list", defaultColunms);
    table.setPaginationType("client");
    UserHereticsLearn.table = table.init();
});
