/**
 * 初始化用户题目详情对话框
 */
var UserSubjectInfoDlg = {
    userSubjectInfoData : {}
};

/**
 * 清除数据
 */
UserSubjectInfoDlg.clearData = function() {
    this.userSubjectInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserSubjectInfoDlg.set = function(key, val) {
    this.userSubjectInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserSubjectInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserSubjectInfoDlg.close = function() {
    parent.layer.close(window.parent.UserSubject.layerIndex);
}

/**
 * 收集数据
 */
UserSubjectInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
UserSubjectInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userSubject/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserSubject.table.refresh();
        UserSubjectInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userSubjectInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserSubjectInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userSubject/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserSubject.table.refresh();
        UserSubjectInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userSubjectInfoData);
    ajax.start();
}

$(function() {

});
