/**
 * 初始化帮教信息详情对话框
 */
var UserHereticsInfoDlg = {
    userHereticsInfoData : {}
};

/**
 * 清除数据
 */
UserHereticsInfoDlg.clearData = function() {
    this.userHereticsInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsInfoDlg.set = function(key, val) {
    this.userHereticsInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserHereticsInfoDlg.close = function() {
    parent.layer.close(window.parent.UserHeretics.layerIndex);
}

/**
 * 收集数据
 */
UserHereticsInfoDlg.collectData = function() {
    this.set('userHereticsId')
        .set('userHereticsProtector')
        .set('userHereticsProtectorTel')
        .set('userHereticsCompany')
        .set('userHereticsPoliceStation')
        .set('userHereticsPoliceTel')
        .set('userHereticsInformationProvider')
        .set('userHereticsInformationProviderTel');
}

/**
 * 提交添加
 */
UserHereticsInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHeretics/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserHeretics.table.refresh();
        UserHereticsInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userHereticsInfoData);
    ajax.start();
}

/**
 * 提交修改详情
 */
UserHereticsInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userHeretics/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserHeretics.reloadUserInfoDetail(UserHereticsInfoDlg.userHereticsInfoData);
        UserHereticsInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.msg + "!");
    });
    ajax.set(this.userHereticsInfoData);
    ajax.start();
}

$(function() {

});
