/**
 * 初始化详情对话框
 */
var EmploymentInfoDlg = {
    employmentInfoData : {}
};

/**
 * 清除数据
 */
EmploymentInfoDlg.clearData = function() {
    this.employmentInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
EmploymentInfoDlg.set = function(key, val) {
    this.employmentInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
EmploymentInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
EmploymentInfoDlg.close = function() {
    parent.layer.close(window.parent.Employment.layerIndex);
}

/**
 * 收集数据
 */
EmploymentInfoDlg.collectData = function() {
    this
    .set('employmentId')
    .set('employmentUserId')
    .set('employmentInfo')
    .set('employmentIsJoin')
    .set('employmentIsReceive')
    .set('employmentDesc')
    .set('employmentCreateBy')
    .set('employmentUpdateBy')
    .set('employmentUpdateTime')
    ;
}

/**
 * 提交添加
 */
EmploymentInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/employment/add", function(data){
        Feng.success("添加成功!");
        window.parent.Employment.table.refresh();
        EmploymentInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.employmentInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
EmploymentInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/employment/update", function(data){
        Feng.success("修改成功!");
        window.parent.Employment.table.refresh();
        EmploymentInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.employmentInfoData);
    ajax.start();
}

$(function() {

});
