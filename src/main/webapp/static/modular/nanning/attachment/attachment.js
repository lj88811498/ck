/**
 * 附件管理初始化
 */
var Attachment = {
    id: "AttachmentTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Attachment.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Attachment.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Attachment.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加附件
 */
Attachment.openAddAttachment = function () {
    var index = layer.open({
        type: 2,
        title: '添加附件',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/attachment/attachment_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看附件详情
 */
Attachment.openAttachmentDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '附件详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/attachment/attachment_update/' + Attachment.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除附件
 */
Attachment.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/attachment/delete", function (data) {
            Feng.success("删除成功!");
            Attachment.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("attachmentId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询附件列表
 */
Attachment.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Attachment.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Attachment.initColumn();
    var table = new BSTable(Attachment.id, "/attachment/list", defaultColunms);
    table.setPaginationType("client");
    Attachment.table = table.init();
});
