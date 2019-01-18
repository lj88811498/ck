/**
 * 初始化详情对话框
 */
var KeyAreaInfoDlg = {
    keyAreaInfoData : {},
    validateField:{
        keyAreaName: {
            validators: {
                notEmpty: {
                    message: '区域名称不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '标题长度不能大于50个字符'
                }
            }
        },
    }
};

/**
 * 清除数据
 */
KeyAreaInfoDlg.clearData = function() {
    this.keyAreaInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
KeyAreaInfoDlg.set = function(key, val) {
    this.keyAreaInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
KeyAreaInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
KeyAreaInfoDlg.close = function() {
    parent.layer.close(window.parent.KeyArea.layerIndex);
}

/**
 * 收集数据
 */
KeyAreaInfoDlg.collectData = function() {
    this
    .set('keyAreaId')
    .set('keyAreaName')
    .set('keyAreaTownship')
    .set('keyAreaImg')
        .set("keyAreaDesc")
    ;
};

/**
 * 提交添加
 */
KeyAreaInfoDlg.addSubmit = function() {
    if (!this.validate()) {
        return;
    }
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/keyArea/add", function(data){
        Feng.success("添加成功!");
     //   window.parent.KeyArea.table.refresh();
        KeyAreaInfoDlg.close();
        window.parent.location.reload();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.keyAreaInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
KeyAreaInfoDlg.editSubmit = function() {
    if (!this.validate()) {
        return;
    }
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/keyArea/update", function(data){
        Feng.success("修改成功!");
       // window.parent.Social.table.refresh();
        KeyAreaInfoDlg.close();
        window.parent.location.reload();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.keyAreaInfoData);
    ajax.start();
}


KeyAreaInfoDlg.validate = function () {
    $('#KeyAreaInfoDlgForm').data("bootstrapValidator").resetForm();
    $('#KeyAreaInfoDlgForm').bootstrapValidator('validate');
    return $("#KeyAreaInfoDlgForm").data('bootstrapValidator').isValid();
};


$(function() {
    Feng.initValidator("KeyAreaInfoDlgForm", KeyAreaInfoDlg.validateField);
    var avatarUp = new $WebUpload("keyAreaImg");
    avatarUp.setUploadBarId("keyAreaImg");
    //avatarUp.setUploadValidator("XaobApplicationInfoForm");
    avatarUp.init('imgType');
});
