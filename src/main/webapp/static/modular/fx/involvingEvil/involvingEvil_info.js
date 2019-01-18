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
    console.log($("#involvingEvilFamilyIn").find("option:selected").text());
    this.set('involvingEvilUserId')
        .set('involvingEvilId')
        .set('involvingEvilType')
        .set('involvingEvilStartTime')
        .set('involvingEvilWork')
        .set('involvingEvilNoticedTime')
        .set('involvingEvilMonitorLevel')
        .set('involvingEvilStatus')
        .set('involvingEvilTime')
        .set('involvingEvilFamilyIn',$("#involvingEvilFamilyIn").find("option:selected").val())
        .set('involvingEvilStriked',$("#involvingEvilStriked").find("option:selected").val())
        .set('involvingEvilStillIn',$("#involvingEvilStillIn").find("option:selected").val())
        .set('involvingEvilEscape',$("#involvingEvilEscape").find("option:selected").val())
        .set('involvingEvilControlled',$("#involvingEvilControlled").find("option:selected").val())
        .set('involvingEvilOtherLocal',$("#involvingEvilOtherLocal").find("option:selected").val())
        .set('involvingEvilFixProcess',$("#involvingEvilFixProcess").find("option:selected").val())
        .set('involvingEvilPrison',$("#involvingEvilPrison").find("option:selected").val())
        .set('involvingEvilPersonalComputer',$("#involvingEvilPersonalComputer").find("option:selected").val())
        .set('involvingEvilInternet',$("#involvingEvilInternet").find("option:selected").val())
        .set('involvingEvilControl')
        .set('involvingEvilRelativesOut',$("#involvingEvilRelativesOut").find("option:selected").val())
        .set('involvingEvilHavePassport',$("#involvingEvilHavePassport").find("option:selected").val())
        .set('involvingEvilPassportNum')
        .set('involvingEvilBorderControl',$("#involvingEvilBorderControl").find("option:selected").val())
        .set('involvingEvilAbroad',$("#involvingEvilAbroad").find("option:selected").val())
        .set('involvingEvilHaveAbroad',$("#involvingEvilHaveAbroad").find("option:selected").val())
        .set('involvingEvilAccusation',$("#involvingEvilAccusation").find("option:selected").val())
        .set('involvingEvilObsessed',$("#involvingEvilObsessed").find("option:selected").val())
        .set('involvingEvilAttitude',$("#involvingEvilAttitude").find("option:selected").val())
        .set('involvingEvilActivityMode',$("#involvingEvilActivityMode").find("option:selected").val())
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
    // if($("#involvingEvilNoticedTime").val() == ""){
    //     $("#noticedTime").show();
    //     return;
    // }
    // if($("#involvingEvilTime").val() == ""){
    //     $("#EvilTime").show();
    //     return;
    // }
    this.clearData();
    this.collectData();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/involvingEvil/update", function(data){
        Feng.success("修改成功!");
        window.parent.InvolvingEvil.reloadUserInfoDetail(InvolvingEvilInfoDlg.involvingEvilInfoData);
        // window.parent.InvolvingEvil.table.refresh();
        window.parent.location.reload();
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

    // if($('select').val()== 0){
    //     $('select').find("option:selected").text('是');
    // }else {
    //     $('select').find("option:selected").text('否');
    // }
});
