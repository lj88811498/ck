/**
 * 初始化基本信息详情对话框
 */
var UserInfoInfoDlg = {
    userInfoInfoData : {},
    validateFields: {
        xaobNewsReleaseTitle: {
            validators: {
                notEmpty: {
                    message: '标题不能为空'
                },
                stringLength: {
                    max: 100,
                    message: '标题长度不能大于100个字符'
                }
            }
        },
        xaobNewsReleaseDescribe: {
            validators: {
                notEmpty: {
                    message: '简介不能为空'
                },
                stringLength: {
                    max: 300,
                    message: '简介长度不能大于300个字符'
                }
            }
        },
        xaobNewsReleaseImg: {
            validators: {
                notEmpty: {
                    message: '图片不能为空'
                }
            }
        },
        xaobNewsReleaseContent: {
            validators: {
                notEmpty: {
                    message: '内容不能为空'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
UserInfoInfoDlg.clearData = function() {
    this.userInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserInfoInfoDlg.set = function(key, val) {
    this.userInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.UserInfo.layerIndex);
}

/**
 * 收集数据
 */
UserInfoInfoDlg.collectData = function() {
    this.set('userInfoId')
        .set('userInfoName')
        .set('userInfoSex')
        .set('userInfoCard')
        .set('userInfoBirthday')
        .set('userInfoNamePolicalStatus')
        .set('userInfoNationality')
        .set('userInfoFlag')
        .set('userInfoEducation')
        .set('userInfoNameMaritalStatus')
        .set('userInfoTel')
        .set('userInfoMonitorLevel')
        .set('userInfoRegisterResident')
        .set('userInfoPresentResident')
        .set('userInfoImgUrl');
}

/**
 * 验证数据是否为空
 */
UserInfoInfoDlg.validate = function () {
    $('#UserInfoInfoDlgForm').data("bootstrapValidator").resetForm();
    $('#UserInfoInfoDlgForm').bootstrapValidator('validate');
    return $("#UserInfoInfoDlgForm").data('bootstrapValidator').isValid();
};

/**
 * 提交修改
 */
UserInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userInfo/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserInfo.reloadUserInfoDetail(UserInfoInfoDlg.userInfoInfoData);
        UserInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.msg + "!");
    });
    ajax.set(this.userInfoInfoData);
    ajax.start();
}

$(function() {
    Feng.initValidator("UserInfoInfoDlgForm", UserInfoInfoDlg.validateFields);
    var avatarUp = new $WebUpload("userInfoImgUrl");
    avatarUp.setUploadBarId("userInfoImgUrl");
    //avatarUp.setUploadValidator("XaobApplicationInfoForm");
    avatarUp.init('imgType');
});
