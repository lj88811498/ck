/**
 * 初始化涉网信息详情对话框
 */
var InternetInfoInfoDlg = {
    internetInfoInfoData : {}
};

/**
 * 清除数据
 */
InternetInfoInfoDlg.clearData = function() {
    this.internetInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InternetInfoInfoDlg.set = function(key, val) {
    this.internetInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
InternetInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
InternetInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.InternetInfo.layerIndex);
}

/**
 * 收集数据
 */
InternetInfoInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
InternetInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/internetInfo/add", function(data){
        Feng.success("添加成功!");
        window.parent.InternetInfo.table.refresh();
        InternetInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.internetInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
InternetInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/internetInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.InternetInfo.table.refresh();
        InternetInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.internetInfoInfoData);
    ajax.start();
}

$(function() {

});
