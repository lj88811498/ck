/**
 * 初始化附件详情对话框
 */
var AttachmentInfoDlg = {
    attachmentInfoData : {}
};

/**
 * 清除数据
 */
AttachmentInfoDlg.clearData = function() {
    this.attachmentInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
AttachmentInfoDlg.set = function(key, val) {
    this.attachmentInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
AttachmentInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
AttachmentInfoDlg.close = function() {
    parent.layer.close(window.parent.Attachment.layerIndex);
}

/**
 * 收集数据
 */
AttachmentInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
AttachmentInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/attachment/add", function(data){
        Feng.success("添加成功!");
        window.parent.Attachment.table.refresh();
        AttachmentInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.attachmentInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
AttachmentInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/attachment/update", function(data){
        Feng.success("修改成功!");
        window.parent.Attachment.table.refresh();
        AttachmentInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.attachmentInfoData);
    ajax.start();
}

$(function() {

});
