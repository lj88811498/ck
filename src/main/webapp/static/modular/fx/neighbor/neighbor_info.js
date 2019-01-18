/**
 * 初始化邻里信息详情对话框
 */
var NeighborInfoDlg = {
    neighborInfoData : {}
};

/**
 * 清除数据
 */
NeighborInfoDlg.clearData = function() {
    this.neighborInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
NeighborInfoDlg.set = function(key, val) {
    this.neighborInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
NeighborInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
NeighborInfoDlg.close = function() {
    parent.layer.close(window.parent.Neighbor.layerIndex);
}

/**
 * 收集数据
 */
NeighborInfoDlg.collectData = function() {
    this.set('neighborUserId')
        .set('neighborBuild')
        .set('neighborDoor')
        .set('neighborName')
        .set('neighborPeopleAmount')
        .set('neighborUseInfo');
}

/**
 * 提交添加
 */
NeighborInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/neighbor/add", function(data){
        Feng.success("添加成功!");
        window.parent.Neighbor.table.refresh();
        NeighborInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.neighborInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
NeighborInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/neighbor/update", function(data){
        Feng.success("修改成功!");
        window.parent.Neighbor.table.refresh();
        NeighborInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.neighborInfoData);
    ajax.start();
}

$(function() {
    $('#neighborUserId').val(window.parent.Neighbor.userId)
});
