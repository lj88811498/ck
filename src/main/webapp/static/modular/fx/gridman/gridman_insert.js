/**
 * Created by Administrator on 2018/5/23 0023.
 */
/**
 * 初始化网格员详情对话框
 */
var GridmanInsertInfoDlg = {
    gridmanInfoData : {}
};

/**
 * 清除数据
 */
GridmanInsertInfoDlg.clearData = function() {
    this.gridmanInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanInsertInfoDlg.set = function(key, val) {
    this.gridmanInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanInsertInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
GridmanInsertInfoDlg.close = function() {
    parent.layer.close(window.parent.Gridman.layerIndex);
}

/**
 * 收集数据
 */
GridmanInsertInfoDlg.collectData = function() {
    this.set("gridmanName")
        .set("gridmanCard")

}

/**
 * 提交添加
 */
GridmanInsertInfoDlg.addSubmit = function() {
    this.clearData();
    this.collectData();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/gridman/add", function(data){
        Feng.success("添加成功!");
        window.parent.Gridman.table.refresh();
        GridmanInsertInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.gridmanInfoData);
    ajax.start();
}

/**
 * 人员姓名搜索
 */
GridmanInsertInfoDlg.search = function(){
    var gridmanName = $("#gridmanName").val();
    GridmanPersonInfoDlg.initPerson(gridmanName);
};





$(function() {


});
