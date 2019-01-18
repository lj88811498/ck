/**
 * Created by Administrator on 2018/5/24 0024.
 */
var ExcelImportant = {
    type:""
};
//文件上传
ExcelImportant.importXLS = function(fileName){
    $("button").attr("disabled",true);
    // $("input").attr("disabled",true);
    var form = document.getElementById('upload'),
        formData = new FormData(form);
    var dataType = ExcelImportant.type;
    var dataName = $("#dataName").val();
    var datamanageId = $("#dataType").val();
    var datamanageType = $("#dataType").val();
    var dataManagement = {
        dataManagementName:dataName,
        //dataManagementId:datamanageId,
        dataManagementType:datamanageType
    };
    var ajax = new $ax(Feng.ctxPath + "/dataManagement/add", function (data) {
        window.parent.DataManagement.table.refresh();
    }, function (data) {
        Feng.error("提交失败!" + data.responseJSON.message + "!");
    });
    ajax.set(dataManagement);
    ajax.start();

    $.ajax({
        url:Feng.ctxPath + "/dataManagement/save?dataType=" + dataManagement.dataManagementType +"&dataName="+dataName +"&datamanageId="+datamanageId,
        type:"post",
        data:formData,
        processData:false,
        // dataType: "formData",
        contentType:false,
        beforeSend: function(data){
                layer.msg('正在上传', {
                    icon: 16
                    ,  time:false
                });

        },
        success:function(res){
            layer.closeAll('loading');
            if (res.code == 400) {
                Feng.error("上传失败! " + res.msg + "!");
                var dataManagementId = window.parent.DataManagement.table.tableData.rows[window.parent.DataManagement.table.tableData.rows.length - 1].dataManagementId
                 window.parent.DataManagement.deleteWhenImportBad(dataManagementId);
            } else {
                Feng.success("上传成功!");
            }
            ExcelImportant.close();
        },
        error:function(err){
            Feng.error("上传失败!" + err.responseJSON.message + "!");
           //alert("上传失败",res);
        }

    })
};
ExcelImportant.importExcleDemo=function () {
    var dataType = $("#dataType").val();
    window.location.href = Feng.imgServerPath+"/"+"excledemo/"+dataType+".xls";
}
ExcelImportant.close = function() {
    parent.layer.close(window.parent.DataManagement.layerIndex);
}
$(function(){
    //ExcelImportant.findDataList();
    //ExcelImportant.findDataNameList(ExcelImportant.type);
});