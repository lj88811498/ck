/**
 * 初始化工商信息详情对话框
 */
var IcInfoInfoDlg = {
    icInfoInfoData : {}
};

/**
 * 清除数据
 */
IcInfoInfoDlg.clearData = function() {
    this.icInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
IcInfoInfoDlg.set = function(key, val) {
    this.icInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
IcInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
IcInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.IcInfo.layerIndex);
}

/**
 * 收集数据
 */
IcInfoInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
IcInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/icInfo/add", function(data){
        Feng.success("添加成功!");
        window.parent.IcInfo.table.refresh();
        IcInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.icInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
IcInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/icInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.IcInfo.table.refresh();
        IcInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.icInfoInfoData);
    ajax.start();
}

$(function() {

});
