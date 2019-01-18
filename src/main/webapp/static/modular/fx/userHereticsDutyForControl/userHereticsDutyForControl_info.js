/**
 * 初始化详情对话框
 */
var UserHereticsDutyForControlInfoDlg = {
    userHereticsDutyInfoData : {}
};

/**
 * 清除数据
 */
UserHereticsDutyForControlInfoDlg.clearData = function() {
    this.userHereticsDutyInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsDutyForControlInfoDlg.set = function(key, val) {
    this.userHereticsDutyInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsDutyForControlInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserHereticsDutyForControlInfoDlg.close = function() {
    parent.layer.close(window.parent.ControlInfo.layerIndex);
}

/**
 * 收集数据
 */
UserHereticsDutyForControlInfoDlg.collectData = function() {
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
UserHereticsDutyForControlInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsDutyForControl/add", function(data){
        Feng.success("添加成功!");
        window.parent.ControlInfo.table.refresh();
        UserHereticsDutyForControlInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsDutyInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserHereticsDutyForControlInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsDutyForControl/update", function(data){
        Feng.success("修改成功!");
        window.parent.ControlInfo.table.refresh();
        UserHereticsDutyForControlInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsDutyInfoData);
    ajax.start();
}

$(function() {
   $("#userHereticsDutyUserId").val(window.parent.$("#controInfoUserId").val())
});
