/**
 * 初始化公交出行信息详情对话框
 */
var BusTravelInfoDlg = {
    busTravelInfoData : {}
};

/**
 * 清除数据
 */
BusTravelInfoDlg.clearData = function() {
    this.busTravelInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
BusTravelInfoDlg.set = function(key, val) {
    this.busTravelInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
BusTravelInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
BusTravelInfoDlg.close = function() {
    parent.layer.close(window.parent.BusTravel.layerIndex);
}

/**
 * 收集数据
 */
BusTravelInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
BusTravelInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/busTravel/add", function(data){
        Feng.success("添加成功!");
        window.parent.BusTravel.table.refresh();
        BusTravelInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.busTravelInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
BusTravelInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/busTravel/update", function(data){
        Feng.success("修改成功!");
        window.parent.BusTravel.table.refresh();
        BusTravelInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.busTravelInfoData);
    ajax.start();
}

$(function() {

});
