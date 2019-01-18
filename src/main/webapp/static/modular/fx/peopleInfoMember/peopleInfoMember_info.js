/**
 * 初始化人口信息-同户成员详情对话框
 */
var PeopleInfoMemberInfoDlg = {
    peopleInfoMemberInfoData : {}
};

/**
 * 清除数据
 */
PeopleInfoMemberInfoDlg.clearData = function() {
    this.peopleInfoMemberInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PeopleInfoMemberInfoDlg.set = function(key, val) {
    this.peopleInfoMemberInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PeopleInfoMemberInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PeopleInfoMemberInfoDlg.close = function() {
    parent.layer.close(window.parent.PeopleInfo.layerIndex);
}

/**
 * 收集数据
 */
PeopleInfoMemberInfoDlg.collectData = function() {
    this.set("peopleInfoMemberName")
        .set("peopleInfoMemberSex")
        .set("peopleInfoMemberRelation")
        .set("peopleInfoMemberCard")
        .set("peopleInfoMemberWorkplace")
        .set("peopleInfoMemberPhone")
        .set("peopleInfoMemberAddress")
        .set("peopleInfoMemberAttitude")
        .set("peopleInfoMemberId")
};

/**
 * 提交添加
 */
PeopleInfoMemberInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/peopleInfoMember/add", function(data){
        Feng.success("添加成功!");
        window.parent.PeopleInfoMember.table.refresh();
        PeopleInfoMemberInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.peopleInfoMemberInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PeopleInfoMemberInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/peopleInfoMember/update", function(data){
        Feng.success("修改成功!");
        window.parent.PeopleInfo.table.refresh();
        PeopleInfoMemberInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.peopleInfoMemberInfoData);
    ajax.start();
}

$(function() {

});
