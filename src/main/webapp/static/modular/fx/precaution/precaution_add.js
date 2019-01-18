/**
 * Created by Administrator on 2018/7/9 0009.
 */
/**
 * Created by Administrator on 2018/7/9 0009.
 */
/**
 *新增防控管理制度体系
 */
var PrecautionAdd = {
    id: "PrecautionTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    filePath:'',
    precautionAttachmentName:'',
    layerIndex: -1,
    validateField:{
        precautionTitle: {
            validators: {
                notEmpty: {
                    message: '文章标题不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '标题长度不能大于50个字符'
                }
            },

        },
    }
};

/**
 * 关闭此对话框
 */
PrecautionAdd.close = function() {
    parent.layer.close(window.parent.Precaution.layerIndex);
}


PrecautionAdd.validate = function () {
    $('#PrecautionInfoDlgForm').data("bootstrapValidator").resetForm();
    $('#PrecautionInfoDlgForm').bootstrapValidator('validate');
    return $("#PrecautionInfoDlgForm").data('bootstrapValidator').isValid();
};


PrecautionAdd.submit = function(){

    if (!this.validate()) {
        return;
    }
    var precautionTitle = $("#precautionTitle").val();
    var precautionType = $("#precautionType").val();
   // var precautionContent = UE.getEditor('myEditor1').getContent().replace(/<[^>]+>/g, "");
    var precautionContent = UE.getEditor('myEditor1').getContent();
    var precaution = {
        precautionTitle:precautionTitle,
        precautionType:precautionType,
        precautionContent:precautionContent,
        precautionAttachment:PrecautionAdd.filePath,
        precautionAttachmentName: PrecautionAdd.precautionAttachmentName
    };
    var ajax = new $ax(Feng.ctxPath + "/precaution/add", function (data) {
        Feng.success('添加成功');
        window.parent.Precaution.table.refresh();
        PrecautionAdd.close();
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    ajax.set(precaution);
    ajax.start();
};


/**
 *上传附件
 */
PrecautionAdd.uploadFile = function(){
    var form = document.getElementById('upload'),
        formData = new FormData(form);
    var  indexLoad;
    $.ajax({
        url:Feng.ctxPath + "/precaution/uploadFile",
        type:"post",
        data:formData,
        processData:false,
        // dataType: "formData",
        contentType:false,
        beforeSend: function(data){
            indexLoad =  layer.msg('正在上传', {
                icon: 16,
                time:false
            });

        },
        success:function(res){
            layer.closeAll('loading');
            if (res.code == 400) {
                setTimeout(function(){
                    layer.close(indexLoad);
                },500);
                Feng.error("上传失败! " + res.msg + "!");
            } else {
                setTimeout(function(){
                    layer.close(indexLoad);
                },500);
                PrecautionAdd.filePath = res.msg;

                var p = res.msg.lastIndexOf("_");
                PrecautionAdd.precautionAttachmentName = res.msg.substr(p+1);
                $("#fileName").html(PrecautionAdd.precautionAttachmentName);
                Feng.success("上传成功!");
            }
          //  ExcelImportant.close();
        },
        error:function(err){
            Feng.error("上传失败!" + err.responseJSON.message + "!");
            //alert("上传失败",res);
        }

    })
};


/**
 *文章标题长度限制
 */
PrecautionAdd.lengthValidate = function (id){
    var str = "";
    if($("#"+id).val().length >= 50){
       $("#ferrorTips").show();
    }
    else{
        $("#ferrorTips").hide();
    }

};


$(".a-upload").on("change","input[type='file']",function(){
    PrecautionAdd.uploadFile();
});
$(function () {
   // PrecautionEdit.init();

    Feng.initValidator("PrecautionInfoDlgForm", PrecautionAdd.validateField);
    var avatarUp = new $WebUpload("userInfoImgUrl");
    avatarUp.setUploadBarId("userInfoImgUrl");
    //avatarUp.setUploadValidator("XaobApplicationInfoForm");
    avatarUp.init();
});
