/**
 * 初始化基本信息详情对话框
 */
var UserInfoInfoDlg = {
    userInfoInfoData : {},
    validateFields: {
        userInfoName: {
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
    },
    validateField:{
        employmentInfo: {
            validators: {
                notEmpty: {
                    message: '从业信息不能为空'
                },
            }
        },
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
        // .set('userInfoAge')
        .set('userInfoCard')
        // .set('userInfoBirthday')
        .set('userInfoNamePolicalStatus')
        .set('userInfoNationality')
        .set('userInfoFlag')
        .set('userInfoEducation')
        .set('userInfoNameMaritalStatus')
        .set('userInfoTel')
        .set('userInfoMonitorLevel')
        .set('userInfoRegisterResident')
        .set('userInfoPresentResident')
        .set('userInfoOccupation')
        .set('userInfoWorkplace')
        .set('userInfoContrStatus')
        .set('userInfoRemarks')
        .set('userInfoRegion')
        .set('userInfoHealthy')
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
 * 验证从业信息是否为空
 */
UserInfoInfoDlg.validate1 = function () {
    $('#employmentInfoForm').data("bootstrapValidator").resetForm();
    $('#employmentInfoForm').bootstrapValidator('validate');
    return $("#employmentInfoForm").data('bootstrapValidator').isValid();
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
        if(data.code==400){
            Feng.error("修改失败!" + data.msg + "!");
        }else {
            Feng.success("修改成功!");
            window.parent.UserInfo.reloadUserInfoDetail(UserInfoInfoDlg.userInfoInfoData);
            UserInfoInfoDlg.close();
            window.parent.location.reload();
        }});
    ajax.set(this.userInfoInfoData);
    ajax.start();
};

/**
 * 初始化56个民族
 */
UserInfoInfoDlg.initNational = function () {
    var national = [
        "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
        "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
        "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
        "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
    ];
    var str = "";
    for(var i = 0 ;i < national.length; i++){
        str += "<option value="+national[i]+">"+national[i]+"</option>"
    }
    $("#userInfoNationality").append(str);
};

/**
 * 提交新增从业信息
 */
UserInfoInfoDlg.addEmploymentSubmit = function(){
    if (!this.validate1()) {
        return;
    }
    var employment = {
        employmentInfo:$("#employmentInfo").val(),
        employmentUserId:window.parent.$("#userInfoId").val(),

    };
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/employment/add", function(data){
        Feng.success("添加成功!");
      //  window.parent.UserInfo.reloadUserInfoDetail(UserInfoInfoDlg.userInfoInfoData);
        UserInfoInfoDlg.close();
        window.parent.location.reload();
    },function(data){
        Feng.error("添加失败!" + data.message + "!");
    });
    ajax.set(employment);
    ajax.start();
};

/**
 * 提交编辑从业信息
 */
UserInfoInfoDlg.editEmploymentInfoSubmit = function(){
    if (!this.validate1()) {
        return;
    }
    var employment = {
        employmentInfo:$("#employmentInfo").val(),
        employmentUserId:window.parent.$("#userInfoId").val(),
        employmentId:$("#employmentId").val()
    };
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/employment/update", function(data){
        Feng.success("修改成功!");
        //  window.parent.UserInfo.reloadUserInfoDetail(UserInfoInfoDlg.userInfoInfoData);
        UserInfoInfoDlg.close();
        window.parent.location.reload();
    },function(data){
        Feng.error("修改失败!" + data.message + "!");
    });
    ajax.set(employment);
    ajax.start();
};



$(function() {
    UserInfoInfoDlg.initNational();
    Feng.initValidator("UserInfoInfoDlgForm", UserInfoInfoDlg.validateFields);
    Feng.initValidator("employmentInfoForm", UserInfoInfoDlg.validateField);

    var avatarUp = new $WebUpload("userInfoImgUrl");
    avatarUp.setUploadBarId("userInfoImgUrl");
    //avatarUp.setUploadValidator("XaobApplicationInfoForm");
    avatarUp.init('imgType');
});
