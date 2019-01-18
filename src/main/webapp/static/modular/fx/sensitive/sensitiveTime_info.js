/**
 * 初始化详情对话框
 */
var SensitiveTimeInfo = {
    sensitiveTimeInfoData : {},
    validateFields: {
        sensitiveTimeBeginTime: {
            validators: {
                notEmpty: {
                    message: '开始时间不能为空'
                },
            }
        },
        sensitiveTimeEndTime: {
            validators: {
                notEmpty: {
                    message: '结束时间不能为空'
                },

            }
        },

        sensitiveTimeContent: {
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
SensitiveTimeInfo.clearData = function() {
    this.sensitiveTimeInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SensitiveTimeInfo.set = function(key, val) {
    this.sensitiveTimeInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
SensitiveTimeInfo.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
SensitiveTimeInfo.close = function() {
    parent.layer.close(window.parent.Sensitive.layerIndex);
}

/**
 * 收集数据
 */
SensitiveTimeInfo.collectData = function() {
    this
    .set('sensitiveTimeId')
    .set('sensitiveTimeBeginTime')
    .set('sensitiveTimeEndTime')
    .set('sensitiveTimeContent')
    ;
}


SensitiveTimeInfo.change = function(type){
    if(type == "sensitiveTimeBeginTime"){
        if($("#"+type).val == ""){
            $("#startTime").show();
        }
        else{
            $("#startTime").hide();
        }
    }
};


/**
 * 提交添加
 */
SensitiveTimeInfo.addSubmit = function() {

    this.clearData();
    this.collectData();
    if($("#sensitiveTimeBeginTime").val() == ""){
        $("#startTime").show();
        return;
    }
    if($("#sensitiveTimeEndTime").val() == ""){
        $("#endTime").show();
        return;
    }
    if (!this.validate()) {
        return;
    }


    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/sensitiveTime/add", function(data){
        Feng.success("添加成功!");
        window.parent.Sensitive.table.refresh();
        SensitiveTimeInfo.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.sensitiveTimeInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
SensitiveTimeInfo.editSubmit = function() {

    this.clearData();
    this.collectData();
   var id = $("#sensitiveTimeId").val();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/sensitiveTime/update", function(data){
        Feng.success("修改成功!");
        window.parent.Sensitive.table.refresh();
        SensitiveTimeInfo.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.sensitiveTimeInfoData);
    ajax.start();
}



/**
 * 验证数据是否为空
 */
SensitiveTimeInfo.validate = function () {
    $('#SensitiveTimeInfoDlgForm').data("bootstrapValidator").resetForm();
    $('#SensitiveTimeInfoDlgForm').bootstrapValidator('validate');
    return $("#SensitiveTimeInfoDlgForm").data('bootstrapValidator').isValid();
};


$(function() {
    Feng.initValidator("SensitiveTimeInfoDlgForm", SensitiveTimeInfo.validateFields);

});
