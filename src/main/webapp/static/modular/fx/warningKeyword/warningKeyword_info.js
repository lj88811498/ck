/**
 * 初始化预警关键字详情对话框
 */
var WarningKeywordInfoDlg = {
    warningKeywordInfoData : {}
};

/**
 * 清除数据
 */
WarningKeywordInfoDlg.clearData = function() {
    this.warningKeywordInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningKeywordInfoDlg.set = function(key, val) {
    this.warningKeywordInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningKeywordInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningKeywordInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningKeyword.layerIndex);
}

/**
 * 收集数据
 */
WarningKeywordInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningKeywordInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningKeyword/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningKeyword.table.refresh();
        WarningKeywordInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningKeywordInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningKeywordInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningKeyword/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningKeyword.table.refresh();
        WarningKeywordInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningKeywordInfoData);
    ajax.start();
}

$(function() {

});
