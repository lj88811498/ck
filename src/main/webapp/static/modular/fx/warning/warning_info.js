/**
 * 初始化预警周期详情对话框
 */
var WarningCycleInfoDlg = {
    warningCycleInfoData : {}
};

/**
 * 清除数据
 */
WarningCycleInfoDlg.clearData = function() {
    this.warningCycleInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningCycleInfoDlg.set = function(key, val) {
    this.warningCycleInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningCycleInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningCycleInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningCycle.layerIndex);
}

/**
 * 收集数据
 */
WarningCycleInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningCycleInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningCycle/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningCycle.table.refresh();
        WarningCycleInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningCycleInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningCycleInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningCycle/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningCycle.table.refresh();
        WarningCycleInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningCycleInfoData);
    ajax.start();
}

$(function() {

});
