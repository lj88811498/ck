/**
 * 图像化指挥初始化
 */
var GraphicUpload = {
    layerIndex: -1
};
/**
 * 关闭此对话框
 */
GraphicUpload.close = function() {
    parent.layer.close(window.parent.Graphic.layerIndex);
}
/**
 * 打开查看网格员详情
 */
GraphicUpload.compareImgs = function () {
    var index = layer.open({
        type: 2,
        title: '图像对比',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/graphic/uploadimg'
    });
    this.layerIndex = index;
};
/**
 * 图像对比
 */
GraphicUpload.comparePicture = function(){

    var picPath = $("#graphicMonitor").val();
    picPath = encodeURIComponent(picPath);
    var  indexLoad;
    // picPath = JSON.stringify(picPath);
    $.ajax({
        url:Feng.ctxPath + "/graphic/facerecognition?picPath="+picPath,
        type:"post",




        beforeSend: function(data){
            indexLoad =  layer.msg('正在识别,请稍等......', {
                icon: 16,
                time:false
            });

        },
        success:function(data){
            if(data.code == "0"){
                setTimeout(function(){
                    layer.close(indexLoad);
                },500);

                console.info(data)
                var str = "";
                var imgPath = "";
                var entity = data.entity.data;
                var similitude = "";
                for(var i = 0; i < entity.length; i++){
                    imgPath = Feng.imgServerPath + "/know_people/" +entity[i].id + ".jpg";
                    similitude = (100*(1-entity[i].similitude))+'%';
                    str += "<ul><li><div class='picture'><img src="+imgPath+"></div><div class='info'>" +
                        "<p>姓名"+entity[i].name+"</p>" +
                        "<p>身份证"+entity[i].id+"</p>" +
                        "<p>相似度"+similitude+"</p>" +
                        "</div>" +
                        "</li></ul>"
                }
            }
            $(".comparePicture").append(str);

        },
        error:function(data){
            Feng.error("对比过程出现异常!");
        }
    })

}

/**
 * 查询网格员列表
 */
GraphicUpload.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Graphic.table.refresh({query: queryData});
};

$(function() {
    var avatarUp = new $WebUpload("graphicMonitor", "compare");
    avatarUp.setUploadBarId("graphicMonitor");
    avatarUp.init('imgType');
});