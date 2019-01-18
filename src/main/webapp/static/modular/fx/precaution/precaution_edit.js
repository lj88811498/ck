/**
 * Created by Administrator on 2018/7/9 0009.
 */
/**
 * Created by Administrator on 2018/7/9 0009.
 */
/**
 *新增防控管理制度体系
 */
var PrecautionUpdate = {
    id: "PrecautionTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    precautionAttachmentName:"",
    filePath:"",
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


PrecautionUpdate.validate = function () {
    $('#PrecautionInfoDlgForm').data("bootstrapValidator").resetForm();
    $('#PrecautionInfoDlgForm').bootstrapValidator('validate');
    return $("#PrecautionInfoDlgForm").data('bootstrapValidator').isValid();
};



/**
 * 关闭此对话框
 */
PrecautionUpdate.close = function() {
    parent.layer.close(window.parent.Precaution.layerIndex);
}

PrecautionUpdate.submit = function(){

    if (!this.validate()) {
        return;
    }
    var precautionTitle = $("#precautionTitle").val();
    var precautionType = $("#precautionType").val();
    // var precautionContent = UE.getEditor('myEditor1').getContent().replace(/<[^>]+>/g, "");
    var precautionContent = UE.getEditor('myEditor1').getContent();
    var precaution = {
        precautionId:$("#precautionId").val(),
        precautionTitle:precautionTitle,
        precautionType:precautionType,
        precautionContent:precautionContent,
        precautionAttachment:PrecautionUpdate.filePath==""?$("#precautionAttachment").val():PrecautionUpdate.filePath,
        precautionAttachmentName: PrecautionUpdate.precautionAttachmentName==""?$("#precautionAttachmentName").val():PrecautionUpdate.precautionAttachmentName
    };
    console.info(precaution)
    var ajax = new $ax(Feng.ctxPath + "/precaution/update", function (data) {
        Feng.success('修改成功');
        window.parent.Precaution.table.refresh();
        PrecautionUpdate.close();
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    ajax.set(precaution);
    ajax.start();
};


/**
 *上传附件
 */
PrecautionUpdate.uploadFile = function(){
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
                PrecautionUpdate.filePath = res.msg;
                var p = res.msg.lastIndexOf("_");
                PrecautionUpdate.precautionAttachmentName = res.msg.substr(p+1);
                $("#fileName").html(PrecautionUpdate.precautionAttachmentName);
                Feng.success("上传成功!");
                $("#attachmentName").hide();
                $("#attachmentName1").val(PrecautionUpdate.precautionAttachmentName);
                $("#attachmentName1").show();
            }
            //  ExcelImportant.close();
        },
        error:function(err){
            Feng.error("上传失败!" + err.responseJSON.message + "!");
            //alert("上传失败",res);
        }

    })
};

$(".a-upload").on("change","input[type='file']",function(){
    PrecautionUpdate.uploadFile();
});

function htmlDecode(str){
    var s = "";
   if(str.length == 0) return "";
    s = str.replace(/& amp;/g,"&");
    s = s.replace(/& lt;/g,"<");
    s = s.replace(/& gt;/g,">");
    s = s.replace(/& nbsp;/g," ");
    s = s.replace(/& #39;/g,"\'");
    s = s.replace(/& quot;/g,"\"");
    s = s.replace(/& #40;/g,"(");
    s = s.replace(/& #41;/g,")");
    return s;
}

$(function () {
    $("#attachmentName1").hide();
    $("#attachmentName").show();

     var s1 = htmlDecode($("#precautionContent").val());
     setTimeout(function(){
         UE.getEditor('myEditor1').setContent(s1)
     },500);

    Feng.initValidator("PrecautionInfoDlgForm", PrecautionUpdate.validateField);
    // PrecautionEdit.init();
});
