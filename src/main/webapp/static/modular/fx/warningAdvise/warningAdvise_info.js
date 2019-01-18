/**
 * 初始化预警建议详情对话框
 */
var WarningAdviseInfoDlg = {
    warningAdviseInfoData : {}
};

/**
 * 清除数据
 */
WarningAdviseInfoDlg.clearData = function() {
    this.warningAdviseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningAdviseInfoDlg.set = function(key, val) {
    this.warningAdviseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningAdviseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningAdviseInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningAdvise.layerIndex);
}

/**
 * 收集数据
 */
WarningAdviseInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningAdviseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningAdvise/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningAdvise.table.refresh();
        WarningAdviseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningAdviseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningAdviseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningAdvise/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningAdvise.table.refresh();
        WarningAdviseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningAdviseInfoData);
    ajax.start();
}

$(function() {

});
