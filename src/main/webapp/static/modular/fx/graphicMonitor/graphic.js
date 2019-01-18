/**
 * 图像化指挥初始化
 */
var Graphic = {
    layerIndex: -1
};

/**
 * 打开图片对比
 */
Graphic.compareImgs = function () {
    var index = layer.open({
        type: 2,
        title: '图像对比',
        area: ['800px', '520px'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/graphic/uploadimg'
    });
    this.layerIndex = index;
};

/**
 * 查询网格员列表
 */
Graphic.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Graphic.table.refresh({query: queryData});
};

$(function () {

});
