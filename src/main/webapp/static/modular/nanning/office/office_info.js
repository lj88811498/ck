/**
 * 初始化科室详情对话框
 */
var OfficeInfoDlg = {
    officeInfoData : {}
};

/**
 * 清除数据
 */
OfficeInfoDlg.clearData = function() {
    this.officeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OfficeInfoDlg.set = function(key, val) {
    this.officeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OfficeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
OfficeInfoDlg.close = function() {
    parent.layer.close(window.parent.Office.layerIndex);
}

/**
 * 收集数据
 */
OfficeInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
OfficeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/office/add", function(data){
        Feng.success("添加成功!");
        window.parent.Office.table.refresh();
        OfficeInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.officeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
OfficeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/office/update", function(data){
        Feng.success("修改成功!");
        window.parent.Office.table.refresh();
        OfficeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.officeInfoData);
    ajax.start();
}

$(function() {

});
