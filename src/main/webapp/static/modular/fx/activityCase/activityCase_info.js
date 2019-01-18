/**
 * 初始化详情对话框
 */
var ActivityCaseInfoDlg = {
    activityCaseInfoData : {},
    activityPeopleInfoData :{}
};

/**
 * 清除数据
 */
ActivityCaseInfoDlg.clearData = function() {
    this.activityCaseInfoData = {};
    this.activityPeopleInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ActivityCaseInfoDlg.set = function(key, val) {
    this.activityCaseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

ActivityCaseInfoDlg.setPeople = function(key, val) {
    this.activityPeopleInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ActivityCaseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ActivityCaseInfoDlg.close = function() {
    parent.layer.close(window.parent.ActivityCase.layerIndex);
}

/**
 * 收集数据
 */
ActivityCaseInfoDlg.collectData = function() {
    this
        .set('activityCaseManagerId')
    .set('activityCaseId')
    .set('activityCaseTime')
    .set('activityCaseLocal')
    .set('activityCaseContent')
    ;

    this.setPeople('activityCaseUserManagerId')
        .setPeople('activityCaseUserId')
        .setPeople('activityCaseUserCreateTime')
        .setPeople('activityCaseUserName')
        .setPeople('activityCaseUserCard')
}

/**
 * 提交添加案件
 */
ActivityCaseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/addCase", function(data){
        Feng.success("添加成功!");
        window.parent.ActivityCase.table.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityCaseInfoData);
    ajax.start();
}


/**
 * 提交添加邪教人员
 */
ActivityCaseInfoDlg.addPeopleSubmit = function(){
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/addPeo", function(data){
        Feng.success("添加成功!");
        window.parent.ActivityCase.newAddTable.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityPeopleInfoData);
    ajax.start();
}

/**
 * 提交邪教人员修改
 */
ActivityCaseInfoDlg.editPeopleSubmit = function(){

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/updatePeo", function(data){
        Feng.success("修改成功!");
        window.parent.ActivityCase.newAddTable.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityPeopleInfoData);
    ajax.start();
};

/**
 * 提交添加被挡获情况
 */
ActivityCaseInfoDlg.addArresttSubmit = function(){
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/addArrest", function(data){
        Feng.success("添加成功!");
        window.parent.ActivityCase.suspendTable.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityCaseInfoData);
    ajax.start();
}

/**
 * 提交被挡获情况修改
 */
ActivityCaseInfoDlg.editArrestSubmit = function(){

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/updateArrest", function(data){
        Feng.success("修改成功!");
        window.parent.ActivityCase.suspendTable.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityCaseInfoData);
    ajax.start();
};



/**
 * 提交修改
 */
ActivityCaseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/updateCase", function(data){
        Feng.success("修改成功!");
        window.parent.ActivityCase.table.refresh();
        ActivityCaseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityCaseInfoData);
    ajax.start();
}

$(function() {

    $("#activityCaseManagerId").val(window.parent.$("#activityCaseManagerId").val());
    $("#activityCaseUserManagerId").val(window.parent.$("#activityCaseManagerId").val());

});
