/**
 * 初始化用户数据详情对话框
 */
var UserDataInfoDlg = {
    userDataInfoData : {}
};

/**
 * 清除数据
 */
UserDataInfoDlg.clearData = function() {
    this.userDataInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserDataInfoDlg.set = function(key, val) {
    this.userDataInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserDataInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserDataInfoDlg.close = function() {
    parent.layer.close(window.parent.UserData.layerIndex);
}

/**
 * 收集数据
 */
UserDataInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
UserDataInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userData/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserData.table.refresh();
        UserDataInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userDataInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserDataInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userData/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserData.table.refresh();
        UserDataInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userDataInfoData);
    ajax.start();
}

$(function() {

});
