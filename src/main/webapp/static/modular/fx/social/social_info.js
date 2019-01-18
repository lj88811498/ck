/**
 * 初始化详情对话框
 */
var SocialInfoDlg = {
    socialInfoData : {}
};

/**
 * 清除数据
 */
SocialInfoDlg.clearData = function() {
    this.socialInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SocialInfoDlg.set = function(key, val) {
    this.socialInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SocialInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SocialInfoDlg.close = function() {
    parent.layer.close(window.parent.Social.layerIndex);
}

/**
 * 收集数据
 */
SocialInfoDlg.collectData = function() {
    this
    .set('socialId')
    .set('socialUserId')
    .set('socialTime')
    .set('socialLocal')
    .set('socialMoney')
    .set('socialCreateBy')
    .set('socialUpdateBy')
    .set('socialUpdateTime')
    ;
}

/**
 * 提交添加
 */
SocialInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/social/add", function(data){
        Feng.success("添加成功!");
        window.parent.Social.table.refresh();
        SocialInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.socialInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SocialInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/social/update", function(data){
        Feng.success("修改成功!");
        window.parent.Social.table.refresh();
        SocialInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.socialInfoData);
    ajax.start();
}

$(function() {

});
