/**
 * 初始化涉邪信息详情对话框
 */
var InvolvingEvilInfoDlg = {
    involvingEvilInfoData : {},
    involvingEvilInfoAddData:{}
};

/**
 * 清除数据
 */
InvolvingEvilInfoDlg.clearData = function() {
    this.involvingEvilInfoData = {};
    this.involvingEvilInfoAddData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilInfoDlg.set = function(key, val) {
    this.involvingEvilInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

InvolvingEvilInfoDlg.addSet = function(key, val) {
    this.involvingEvilInfoAddData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
InvolvingEvilInfoDlg.close = function() {
    parent.layer.close(window.parent.InvolvingEvil.layerIndex);
}

/**
 * 收集数据
 */
InvolvingEvilInfoDlg.collectData = function() {
    this.set('involvingEvilUserId')
        .set('involvingInfoId')
        .set('involvingEvilType')
        .set('involvingEvilStartTime')
        .set('involvingEvilWork')
        .set('involvingEvilNoticedTime')
        .set('involvingEvilMonitorLevel')
        .set('involvingEvilStatus')
        .set('involvingEvilTime')
        .set('involvingEvilFamilyIn')
        .set('involvingEvilStriked')
        .set('involvingEvilStillIn')
        .set('involvingEvilEscape')
        .set('involvingEvilControlled')
        .set('involvingEvilOtherLocal')
        .set('involvingEvilFixProcess')
        .set('involvingEvilPrison')
        .set('involvingEvilPersonalComputer')
        .set('involvingEvilInternet')
        .set('involvingEvilControl')
        .set('involvingEvilRelativesOut')
        .set('involvingEvilHavePassport')
        .set('involvingEvilPassportNum')
        .set('involvingEvilBorderControl')
        .set('involvingEvilAbroad')
        .set('involvingEvilHaveAbroad')
    ;
}
InvolvingEvilInfoDlg.collectAddData = function(){
    this.addSet("involvingEvilRecordArrestTime")
        .addSet("involvingEvilRecordPunishTime")
        .addSet("involvingEvilRecordType")
        .addSet("involvingEvilRecordUnpunishedTime")
        .addSet("involvingEvilRecordUserId")
}
/**
 * 提交添加
 */
InvolvingEvilInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectAddData();
    $.ajax({
        type: 'post',
        url: Feng.ctxPath + "/involvingEvilRecord/add",
        data:JSON.stringify(this.involvingEvilInfoAddData),
        contentType:"application/json",
        aysnc:false,
        success: function(data){
            Feng.success("添加成功!");
            window.parent.InvolvingEvil.crackdownTable.refresh();
            InvolvingEvilInfoDlg.close();
        },
        error: function(){
            //请求失败处理函数
            Feng.error("添加失败!");
        }
    });
    //提交信息
}

/**
 * 提交修改
 */
InvolvingEvilInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/involvingEvil/update", function(data){
        Feng.success("修改成功!");
        window.parent.InvolvingEvil.reloadUserInfoDetail(InvolvingEvilInfoDlg.involvingEvilInfoData);
        // window.parent.InvolvingEvil.table.refresh();
        InvolvingEvilInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.involvingEvilInfoData);
    ajax.start();
}

$(function() {
   $("#involvingEvilRecordUserId").val(window.parent.InvolvingEvil.recordUserId);
   $("#involvingEvilUserId").val(window.parent.$('#involvingInfoId').val());
});
