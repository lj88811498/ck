/**
 * 初始化privateCar详情对话框
 */
var PrivateCarInfoDlg = {
    privateCarInfoData : {}
};

/**
 * 清除数据
 */
PrivateCarInfoDlg.clearData = function() {
    this.privateCarInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PrivateCarInfoDlg.set = function(key, val) {
    this.privateCarInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PrivateCarInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PrivateCarInfoDlg.close = function() {
    parent.layer.close(window.parent.CarTravel.layerIndex);
}

/**
 * 收集数据
 */
PrivateCarInfoDlg.collectData = function() {
    this.set('privateCarId')
    .set('privateCarUserId')
    .set('privateCarCard')
    .set('privateCarBrand')
    .set('privateCarVehicles')
    .set('privateCarType')
    .set('privateCarColor')
    ;
}

/**
 * 提交添加
 */
PrivateCarInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/privateCar/add", function(data){
        Feng.success("添加成功!");
        window.parent.CarTravel.PrivateTable.refresh();
        PrivateCarInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.privateCarInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PrivateCarInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/privateCar/update", function(data){
        Feng.success("修改成功!");
        window.parent.CarTravel.PrivateTable.refresh();
        PrivateCarInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.privateCarInfoData);
    ajax.start();
}

$(function() {
    $("#privateCarUserId").val(window.parent.$("#carTravelUserId").val());
});
