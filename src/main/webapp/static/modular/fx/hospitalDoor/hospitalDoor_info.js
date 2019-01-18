/**
 * 初始化门诊信息详情对话框
 */
var HospitalDoorInfoDlg = {
    hospitalDoorInfoData : {}
};

/**
 * 清除数据
 */
HospitalDoorInfoDlg.clearData = function() {
    this.hospitalDoorInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
HospitalDoorInfoDlg.set = function(key, val) {
    this.hospitalDoorInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
HospitalDoorInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
HospitalDoorInfoDlg.close = function() {
    parent.layer.close(window.parent.HospitalDoor.layerIndex);
}

/**
 * 收集数据
 */
HospitalDoorInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
HospitalDoorInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/hospitalDoor/add", function(data){
        Feng.success("添加成功!");
        window.parent.HospitalDoor.table.refresh();
        HospitalDoorInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.hospitalDoorInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
HospitalDoorInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/hospitalDoor/update", function(data){
        Feng.success("修改成功!");
        window.parent.HospitalDoor.table.refresh();
        HospitalDoorInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.hospitalDoorInfoData);
    ajax.start();
}

$(function() {

});
