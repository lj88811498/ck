/**
 * 初始化详情对话框
 */
var ActivityManagerInfoDlg = {
    activityManagerInfoData: {},
    validateFields: {
        activityManagerUnit: {
            validators: {
                notEmpty: {
                    message: '填报单位不能为空'
                }
            }
        }

    }

};

/**
 * 清除数据
 */
ActivityManagerInfoDlg.clearData = function () {
    this.activityManagerInfoData = {};
}
/**
 * 验证数据是否为空
 */
ActivityManagerInfoDlg.validate = function () {
    $('#activityManagerInfo').data("bootstrapValidator").resetForm();
    $('#activityManagerInfo').bootstrapValidator('validate');
    return $("#activityManagerInfo").data('bootstrapValidator').isValid();
};

/**
 * 查询街道
 */
ActivityManagerInfoDlg.streetInfo = function () {
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/street/list", function (data) {
        var street = data.page;
        var strStreet = "";
        for (var j = 0; j < street.length; j++) {
            strStreet += "<option value=" + street[j] + ">" + street[j] + "</option>"
        }
        $("#activityManagerUnit").append(strStreet);
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    // ajax.set(this.peopleInfoInfoData);
    ajax.start('GET');
};


/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ActivityManagerInfoDlg.set = function (key, val) {
    this.activityManagerInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
ActivityManagerInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
ActivityManagerInfoDlg.close = function () {
    parent.layer.close(window.parent.ActivityCase.layerIndex);
}

/**
 * 收集数据
 */
ActivityManagerInfoDlg.collectData = function () {
    this
    // .set('activityManagerId')
        .set('activityManagerTime')
        .set('activityManagerUnit')
        .set('activityManagerName')
        .set('activityManagerLeader')
    ;
}

/**
 * 提交添加
 */
ActivityManagerInfoDlg.addSubmit = function () {

    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityCase/addManager", function (data) {
        Feng.success("添加成功!");
        window.parent.ActivityCase.table.refresh();
        ActivityManagerInfoDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityManagerInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
ActivityManagerInfoDlg.editSubmit = function () {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/activityManager/update", function (data) {
        Feng.success("修改成功!");
        window.parent.ActivityManager.table.refresh();
        ActivityManagerInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.activityManagerInfoData);
    ajax.start();
}

$(function () {
    Feng.initValidator("activityManagerInfo", ActivityManagerInfoDlg.validateFields);
    ActivityManagerInfoDlg.streetInfo();
});
