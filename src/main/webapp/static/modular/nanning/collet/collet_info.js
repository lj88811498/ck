/**
 * 初始化收藏详情对话框
 */
var ColletInfoDlg = {
    colletInfoData : {}
};

/**
 * 清除数据
 */
ColletInfoDlg.clearData = function() {
    this.colletInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ColletInfoDlg.set = function(key, val) {
    this.colletInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ColletInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ColletInfoDlg.close = function() {
    parent.layer.close(window.parent.Collet.layerIndex);
}

/**
 * 收集数据
 */
ColletInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
ColletInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/collet/add", function(data){
        Feng.success("添加成功!");
        window.parent.Collet.table.refresh();
        ColletInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.colletInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ColletInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/collet/update", function(data){
        Feng.success("修改成功!");
        window.parent.Collet.table.refresh();
        ColletInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.colletInfoData);
    ajax.start();
}

$(function() {

});
