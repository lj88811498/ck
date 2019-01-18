/**
 * 初始化出行信息详情对话框
 */
var CarTravelInfoDlg = {
    carTravelInfoData : {}
};

/**
 * 清除数据
 */
CarTravelInfoDlg.clearData = function() {
    this.carTravelInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CarTravelInfoDlg.set = function(key, val) {
    this.carTravelInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
CarTravelInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
CarTravelInfoDlg.close = function() {
    parent.layer.close(window.parent.CarTravel.layerIndex);
}

/**
 * 收集数据
 */
CarTravelInfoDlg.collectData = function() {
    this.set('userInfoName')
        .set('userInfoCard')
        .set('carTravelStartStation')
        .set('carTravelEndStation')
        .set('carTravelTime')
        .set('carTravelCarNo')
        .set('carTravelSeat')
        .set('carTravelType')
};

/**
 * 提交添加
 */
CarTravelInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/carTravel/addCarTravel", function(data){
        if(data.code == "400"){
            Feng.info(data.msg);
        }
        else if(data.code == '0'){
            Feng.success("添加成功!");
            window.parent.CarTravel.TrainTravelTable.refresh();
            CarTravelInfoDlg.close();
        }
        //Feng.success("添加成功!");

    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.carTravelInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
CarTravelInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/carTravel/update", function(data){
        Feng.success("修改成功!");
        window.parent.CarTravel.table.refresh();
        CarTravelInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.carTravelInfoData);
    ajax.start();
}

$(function() {

});
