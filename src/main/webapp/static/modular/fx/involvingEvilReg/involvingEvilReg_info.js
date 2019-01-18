/**
 * 初始化涉邪教案件登记表详情对话框
 */
var InvolvingEvilRegInfoDlg = {
    involvingEvilRegInfoData : {}
};

/**
 * 清除数据
 */
InvolvingEvilRegInfoDlg.clearData = function() {
    this.involvingEvilRegInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilRegInfoDlg.set = function(key, val) {
    this.involvingEvilRegInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilRegInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
InvolvingEvilRegInfoDlg.close = function() {
    parent.layer.close(window.parent.InvolvingEvil.layerIndex);
}

/**
 * 收集数据
 */
InvolvingEvilRegInfoDlg.collectData = function() {
    this.set("involvingEvilRegArrestTime")
        .set("involvingEvilRegLocal")
        .set("involvingEvilRegInfo")
        .set("involvingEvilRegObjInfo")
        .set("involvingEvilRegPunishTime")
        .set("involvingEvilRegUnpunishedTime")
        .set("involvingEvilRegUserId")
        .set("involvingEvilRegId")
}

/**
 * 提交添加
 */
InvolvingEvilRegInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
    $.ajax({
        type: 'post',
        url: Feng.ctxPath + "/involvingEvilReg/add",
        data:JSON.stringify(this.involvingEvilRegInfoData),
        contentType:"application/json",
        aysnc:false,
        success: function(data){
            Feng.success("添加成功!");
            window.parent.InvolvingEvil.caseHandlingTable.refresh();
            InvolvingEvilRegInfoDlg.close();
        },
        error: function(){
            //请求失败处理函数
            Feng.error("添加失败!");
        }
    });
    //提交信息
  /*  var ajax = new $ax(Feng.ctxPath + "/involvingEvilReg/add", function(data){
        Feng.success("添加成功!");
        window.parent.InvolvingEvilReg.table.refresh();
        InvolvingEvilRegInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.involvingEvilRegInfoData);
    ajax.start();*/
}

/**
 * 提交修改
 */
InvolvingEvilRegInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();
    $.ajax({
        type: 'post',
        url: Feng.ctxPath + "/involvingEvilReg/update",
        data:JSON.stringify(this.involvingEvilRegInfoData),
        contentType:"application/json",
        aysnc:false,
        success: function(data){
            Feng.success("修改成功!");
            window.parent.InvolvingEvil.caseHandlingTable.refresh();
            InvolvingEvilRegInfoDlg.close();
        },
        error: function(){
            //请求失败处理函数
            Feng.error("修改失败!");
        }
    });
//--------------------
    //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/involvingEvilReg/update", function(data){
    //     Feng.success("修改成功!");
    //     window.parent.InvolvingEvilReg.table.refresh();
    //     InvolvingEvilRegInfoDlg.close();
    // },function(data){
    //     Feng.error("修改失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set(this.involvingEvilRegInfoData);
    // ajax.start();
}

$(function() {
    var time = $("#involvingEvilRegArrestTime").val();
    if(time.length > 19){
        time = time.substr(0,19);
    }
    $("#involvingEvilRegArrestTime").val(time);
    var time1 = $("#involvingEvilRegUnpunishedTime").val();
    if(time1.length > 19){
        time1 = time1.substr(0,19);
    }
    $("#involvingEvilRegUnpunishedTime").val(time1);
    $("#involvingEvilRegUserId").val(window.parent.$("#involvingInfoId").val());
});
