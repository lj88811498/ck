/**
 * 初始化满意度详情对话框
 */
var DegreeInfoDlg = {
    degreeInfoData : {}
};

/**
 * 清除数据
 */
DegreeInfoDlg.clearData = function() {
    this.degreeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DegreeInfoDlg.set = function(key, val) {
    this.degreeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
DegreeInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
DegreeInfoDlg.close = function() {
    parent.layer.close(window.parent.Degree.layerIndex);
}

/**
 * 收集数据
 */
DegreeInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
DegreeInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/degree/add", function(data){
        Feng.success("添加成功!");
        window.parent.Degree.table.refresh();
        DegreeInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.degreeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
DegreeInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/degree/update", function(data){
        Feng.success("修改成功!");
        window.parent.Degree.table.refresh();
        DegreeInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.degreeInfoData);
    ajax.start();
}

$(function() {

});
