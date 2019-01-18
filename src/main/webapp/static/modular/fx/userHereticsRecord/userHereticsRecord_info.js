/**
 * 初始化帮教记录详情对话框
 */
var UserHereticsRecordInfoDlg = {
    userHereticsRecordInfoData : {}
};

/**
 * 清除数据
 */
UserHereticsRecordInfoDlg.clearData = function() {
    this.userHereticsRecordInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsRecordInfoDlg.set = function(key, val) {
    this.userHereticsRecordInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsRecordInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserHereticsRecordInfoDlg.close = function() {
    parent.layer.close(window.parent.UserHeretics.layerIndex);
}

/**
 * 收集数据
 */
UserHereticsRecordInfoDlg.collectData = function() {
    this.set('userHereticsRecordUserId')
        .set('userHereticsRecordTime')
        .set('userHereticsRecordObj')
        .set('userHereticsRecordHelperName')
        .set('userHereticsRecordCallLocation')
        .set('userHereticsRecordContent')
        .set('userHereticsRecordId');
}

/**
 * 提交添加
 */
UserHereticsRecordInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsRecord/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserHeretics.table.refresh();
        UserHereticsRecordInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsRecordInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserHereticsRecordInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHereticsRecord/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserHeretics.table.refresh();
        UserHereticsRecordInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsRecordInfoData);
    ajax.start();
}


$(function() {
    $('#userHereticsRecordUserId').val(window.parent.$('#userInfoId').val());
});
