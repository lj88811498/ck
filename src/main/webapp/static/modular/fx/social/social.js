/**
 * 管理初始化
 */
var Social = {
    id: "SocialTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Social.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'socialId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'socialUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '领取时间', field: 'socialTime', visible: true, align: 'center', valign: 'middle'},
            {title: '领取地点', field: 'socialLocal', visible: true, align: 'center', valign: 'middle'},
            {title: '领取金额', field: 'socialMoney', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'socialCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'socialUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'socialUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'socialCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
Social.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Social.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
Social.openAddSocial = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/social/social_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
Social.openSocialDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/social/social_update/' + Social.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */
Social.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/social/delete", function (data) {
            Feng.success("删除成功!");
            Social.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("socialId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询列表
 */
Social.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Social.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Social.initColumn();
    var table = new BSTable(Social.id, "/social/list", defaultColunms);
    table.setPaginationType("client");
    Social.table = table.init();
});
