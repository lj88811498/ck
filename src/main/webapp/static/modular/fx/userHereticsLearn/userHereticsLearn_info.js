/**
 * 初始化详情对话框
 */
var UserHereticsLearnInfoDlg = {
    userHereticsLearnInfoData : {}
};

/**
 * 清除数据
 */
UserHereticsLearnInfoDlg.clearData = function() {
    this.userHereticsLearnInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsLearnInfoDlg.set = function(key, val) {
    this.userHereticsLearnInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserHereticsLearnInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserHereticsLearnInfoDlg.close = function() {
    parent.layer.close(window.parent.UserHeretics.layerIndex);
}

/**
 * 收集数据
 */
UserHereticsLearnInfoDlg.collectData = function() {
    this
    .set('userHereticsLearnId')
    .set('userHereticsLearnUserId')
    .set('userHereticsLearnTime')
    .set('userHereticsLearnLocal')
    .set('userHereticsLearnInfo')
    .set('userHereticsLearnDesc')
    ;
}

/**
 * 提交添加
 */
UserHereticsLearnInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
    $.ajax({
        type: 'post',
        url: Feng.ctxPath + "/userHereticsLearn/add",
        data:JSON.stringify(this.userHereticsLearnInfoData),
        contentType:"application/json",
        aysnc:false,
        success: function(data){
            Feng.success("添加成功!");
            window.parent.UserHeretics.table1.refresh();
            UserHereticsLearnInfoDlg.close();
        },
        error: function(){
            //请求失败处理函数
            Feng.error("添加失败!");
        }
    });
    //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/userHereticsLearn/add", function(data){
    //     Feng.success("添加成功!");
    //     window.parent.UserHeretics.table1.refresh();
    //     UserHereticsLearnInfoDlg.close();
    // },function(data){
    //     Feng.error("添加失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set(JSON.stringify(this.userHereticsLearnInfoData));
    // ajax.start();
}

/**
 * 提交修改
 */
UserHereticsLearnInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    $.ajax({
        type: 'post',
        url: Feng.ctxPath + "/userHereticsLearn/update",
        data:JSON.stringify(this.userHereticsLearnInfoData),
        contentType:"application/json",
        aysnc:false,
        success: function(data){
            Feng.success("修改成功!");
            window.parent.UserHeretics.table1.refresh();
            UserHereticsLearnInfoDlg.close();
        },
        error: function(){
            //请求失败处理函数
            Feng.error("修改失败!");
        }
    });
    //=------------------------------
    //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/userHereticsLearn/update", function(data){
    //     Feng.success("修改成功!");
    //     window.parent.UserHeretics.table1.refresh();
    //     UserHereticsLearnInfoDlg.close();
    // },function(data){
    //     Feng.error("修改失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set(this.userHereticsLearnInfoData);
    // ajax.start();
}
$(function() {
    var time = $("#userHereticsLearnTime").val();
    if(time.length > 19){
        time = time.substr(0,19);
    }
    $("#userHereticsLearnTime").val(time);
   $("#userHereticsLearnUserId").val(window.parent.$("#userInfoId").val());
});
