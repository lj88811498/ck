/**
 * 初始化详情对话框
 */
var UserHereticsDutyInfoDlg = {
    userHereticsDutyInfoData : {}
};

/**
 * 清除数据
 */
UserHereticsDutyInfoDlg.clearData = function() {
    this.userHereticsDutyInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsDutyInfoDlg.set = function(key, val) {
    this.userHereticsDutyInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsDutyInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserHereticsDutyInfoDlg.close = function() {
    parent.layer.close(window.parent.UserHeretics.layerIndex);
}

/**
 * 收集数据
 */
UserHereticsDutyInfoDlg.collectData = function() {
    this
    .set('userHereticsDutyId')
    .set('userHereticsDutyUserId')
    .set('userHereticsDutyName')
    .set('userHereticsDutyJob')
    .set('userHereticsDutyTel')
    .set('userHereticsDutyUnit')
    .set('userHereticsDutyType')
    ;
}

/**
 * 提交添加
 */
UserHereticsDutyInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsDuty/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserHeretics.table2.refresh();
        UserHereticsDutyInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsDutyInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserHereticsDutyInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsDuty/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserHeretics.table2.refresh();
        UserHereticsDutyInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsDutyInfoData);
    ajax.start();
}

$(function() {
   $("#userHereticsDutyUserId").val(window.parent.$("#userInfoId").val());
});
