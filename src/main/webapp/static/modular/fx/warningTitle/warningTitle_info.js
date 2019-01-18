/**
 * 初始化预警标签详情对话框
 */
var WarningTitleInfoDlg = {
    warningTitleInfoData : {}
};

/**
 * 清除数据
 */
WarningTitleInfoDlg.clearData = function() {
    this.warningTitleInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningTitleInfoDlg.set = function(key, val) {
    this.warningTitleInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningTitleInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningTitleInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningTitle.layerIndex);
}

/**
 * 收集数据
 */
WarningTitleInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningTitleInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningTitle/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningTitle.table.refresh();
        WarningTitleInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningTitleInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningTitleInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningTitle/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningTitle.table.refresh();
        WarningTitleInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningTitleInfoData);
    ajax.start();
}

$(function() {

});
