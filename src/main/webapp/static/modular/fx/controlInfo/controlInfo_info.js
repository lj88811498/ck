/**
 * 初始化详情对话框
 */
var ControlInfoInfoDlg = {
    controlInfoInfoData : {}
};

/**
 * 清除数据
 */
ControlInfoInfoDlg.clearData = function() {
    this.controlInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ControlInfoInfoDlg.set = function(key, val) {
    this.controlInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ControlInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ControlInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.ControlInfo.layerIndex);
}

/**
 * 收集数据
 */
ControlInfoInfoDlg.collectData = function() {
    this
    .set('controlInfoId')
    .set('controlInfoUserId')
    .set('controlInfoTime')
    .set('controlInfoUnit')
    .set('controlInfoName')
    .set('controlInfoLeader')
    .set('controlInfoIsActivity')
    .set('controlInfoIsVisit')
    .set('controlInfoMonitor')
    .set('controlInfoDesc')
    ;
}

/**
 * 提交添加
 */
ControlInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/controlInfo/add", function(data){
        Feng.success("添加成功!");
        window.parent.ControlInfo.PersonControlTable.refresh();
        ControlInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.controlInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ControlInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/controlInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.ControlInfo.PersonControlTable.refresh();
        ControlInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.controlInfoInfoData);
    ajax.start();
};

$(function() {
    var time = $("#controlInfoTime").val();
    if(time.length > 19){
        time = time.substr(0,19);
    }
    $("#controlInfoTime").val(time);
   $("#controlInfoUserId").val(window.parent.$("#controInfoUserId").val());
});
