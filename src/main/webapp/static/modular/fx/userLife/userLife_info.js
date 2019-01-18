/**
 * 初始化生活常驻详情对话框
 */
var UserLifeInfoDlg = {
    userLifeInfoData : {}
};

/**
 * 清除数据
 */
UserLifeInfoDlg.clearData = function() {
    this.userLifeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserLifeInfoDlg.set = function(key, val) {
    this.userLifeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserLifeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserLifeInfoDlg.close = function() {
    parent.layer.close(window.parent.UserLife.layerIndex);
}

/**
 * 收集数据
 */
UserLifeInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
UserLifeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userLife/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserLife.table.refresh();
        UserLifeInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userLifeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserLifeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userLife/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserLife.table.refresh();
        UserLifeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userLifeInfoData);
    ajax.start();
}

$(function() {

});
