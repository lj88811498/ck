/**
 * Created by Administrator on 2018/9/4 0004.
 */
/**
 * 涉网信息管理初始化
 */
var InternetInfoUpload = {
    id: "InternetInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};


/**
 * 关闭此对话框
 */
InternetInfoUpload.close = function() {
    parent.layer.close(window.parent.InternetInfo.layerIndex);
};


/**
 * 导入数据
 */
InternetInfoUpload.editSubmit = function() {
    var form = document.getElementById('upload'),
        formData = new FormData(form);
    var  indexLoad;
    $.ajax({
        url:Feng.ctxPath + "/internetInfo/upload",
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
                Feng.success("上传成功!");
                InternetInfoUpload.close();

            }

        },
        error:function(err){
            Feng.error("上传失败!" + err.responseJSON.message + "!");
        }

    })
};


$(function () {

});
