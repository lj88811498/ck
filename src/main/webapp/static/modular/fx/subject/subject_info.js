/**
 * 初始化题库信息详情对话框
 */
var SubjectInfoDlg = {
    subjectInfoData : {}
};

/**
 * 清除数据
 */
SubjectInfoDlg.clearData = function() {
    this.subjectInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SubjectInfoDlg.set = function(key, val) {
    this.subjectInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SubjectInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SubjectInfoDlg.close = function() {
    parent.layer.close(window.parent.Subject.layerIndex);
}

/**
 * 收集数据
 */
SubjectInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
SubjectInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/subject/add", function(data){
        Feng.success("添加成功!");
        window.parent.Subject.table.refresh();
        SubjectInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.subjectInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SubjectInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/subject/update", function(data){
        Feng.success("修改成功!");
        window.parent.Subject.table.refresh();
        SubjectInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.subjectInfoData);
    ajax.start();
}

$(function() {

});
