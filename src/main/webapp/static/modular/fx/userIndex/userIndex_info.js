/**
 * 初始化用户指数详情对话框
 */
var UserIndexInfoDlg = {
    userIndexInfoData : {}
};

/**
 * 清除数据
 */
UserIndexInfoDlg.clearData = function() {
    this.userIndexInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserIndexInfoDlg.set = function(key, val) {
    this.userIndexInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserIndexInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserIndexInfoDlg.close = function() {
    parent.layer.close(window.parent.UserIndex.layerIndex);
}

/**
 * 收集数据
 */
UserIndexInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
UserIndexInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userIndex/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserIndex.table.refresh();
        UserIndexInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userIndexInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserIndexInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userIndex/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserIndex.table.refresh();
        UserIndexInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userIndexInfoData);
    ajax.start();
}

$(function() {

});
