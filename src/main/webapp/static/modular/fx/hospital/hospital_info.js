/**
 * 初始化住院信息详情对话框
 */
var HospitalInfoDlg = {
    hospitalInfoData : {}
};

/**
 * 清除数据
 */
HospitalInfoDlg.clearData = function() {
    this.hospitalInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
HospitalInfoDlg.set = function(key, val) {
    this.hospitalInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
HospitalInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
HospitalInfoDlg.close = function() {
    parent.layer.close(window.parent.Hospital.layerIndex);
}

/**
 * 收集数据
 */
HospitalInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
HospitalInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/hospital/add", function(data){
        Feng.success("添加成功!");
        window.parent.Hospital.table.refresh();
        HospitalInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.hospitalInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
HospitalInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/hospital/update", function(data){
        Feng.success("修改成功!");
        window.parent.Hospital.table.refresh();
        HospitalInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.hospitalInfoData);
    ajax.start();
}

$(function() {

});
