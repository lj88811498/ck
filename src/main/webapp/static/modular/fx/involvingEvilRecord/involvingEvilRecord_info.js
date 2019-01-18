/**
 * 初始化受打击处理情况详情对话框
 */
var InvolvingEvilRecordInfoDlg = {
    involvingEvilRecordInfoData : {}
};

/**
 * 清除数据
 */
InvolvingEvilRecordInfoDlg.clearData = function() {
    this.involvingEvilRecordInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilRecordInfoDlg.set = function(key, val) {
    this.involvingEvilRecordInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InvolvingEvilRecordInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
InvolvingEvilRecordInfoDlg.close = function() {
    parent.layer.close(window.parent.InvolvingEvilRecord.layerIndex);
}

/**
 * 收集数据
 */
InvolvingEvilRecordInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
InvolvingEvilRecordInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/involvingEvilRecord/add", function(data){
        Feng.success("添加成功!");
        window.parent.InvolvingEvilRecord.table.refresh();
        InvolvingEvilRecordInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.involvingEvilRecordInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
InvolvingEvilRecordInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/involvingEvilRecord/update", function(data){
        Feng.success("修改成功!");
        window.parent.InvolvingEvilRecord.table.refresh();
        InvolvingEvilRecordInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.involvingEvilRecordInfoData);
    ajax.start();
}

$(function() {

});
