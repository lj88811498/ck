/**
 * 初始化预警指数详情对话框
 */
var WarningIndexInfoDlg = {
    warningIndexInfoData : {}
};

/**
 * 清除数据
 */
WarningIndexInfoDlg.clearData = function() {
    this.warningIndexInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningIndexInfoDlg.set = function(key, val) {
    this.warningIndexInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningIndexInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningIndexInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningIndex.layerIndex);
}

/**
 * 收集数据
 */
WarningIndexInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningIndexInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningIndex/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningIndex.table.refresh();
        WarningIndexInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningIndexInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningIndexInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningIndex/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningIndex.table.refresh();
        WarningIndexInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningIndexInfoData);
    ajax.start();
}

$(function() {

});
