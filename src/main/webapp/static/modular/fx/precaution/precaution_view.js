/**
 * Created by Administrator on 2018/7/10 0010.
 */
/**
 * Created by Administrator on 2018/7/9 0009.
 */
/**
 * 网格员管理初始化
 */
var PrecautionEdit = {
    id: "PrecautionTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PrecautionEdit.initColumn = function () {
    return [
        // {field: 'selectItem', radio: true},
        {title: 'id', field: 'precautionId', visible: false, align: 'center', valign: 'middle'},
        {title: '文章名称', field: 'precautionAttachmentName', visible: true, align: 'center', valign: 'middle'},
        {title: '类型', field: 'precautionType', visible: true, align: 'center', valign: 'middle',formatter:function(value,row,index){
            if(value == '0'){
                return '防控制度';
            }
            if(value == '1'){
                return '防控措施';
            }
            if(value == '2'){
                return '防控预案';
            }
        }},
        {title: '创建时间', field: 'precautionCreateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '修改时间', field: 'precautionUpdateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '编辑人', field: 'precautionUpdateBy', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: Precaution.operateFormatter, width: '20%'}
    ];
};



/**
 * 编辑
 */
PrecautionEdit.init = function(){
    var url = location.pathname;
    var name = location.search.substr(1);
    name= decodeURIComponent(name, true);
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
    var precautionAttachment;
    var ajax = new $ax(Feng.ctxPath + "/precaution/detail/" +id, function (data) {
        if(data.code == '0'){
            var entity = data.entity;
            if(entity.precautionType == '0'){
                entity.precautionType = '防控制度';
            }else if(entity.precautionType == '1'){
                entity.precautionType = '防控措施';
            }else if(entity.precautionType== '2'){
                entity.precautionType = '防控预案';
            }else{
                entity.precautionType = "";
            }
            if(entity.precautionAttachment){
                precautionAttachment = (entity.precautionAttachment).split('：')[1];
            }
            else{
                precautionAttachment = "";
            }
            $("#precautionTitle").html(entity.precautionTitle);
            $("#precautionAttachmentName").html(entity.precautionAttachmentName);
            $("#precautionType").html(entity.precautionType);
            $("#precautionCreateTime").html(entity.precautionCreateTime);
            $("#precautionUpdateTime").html(entity.precautionUpdateTime);
            $("#precautionUpdateBy").html(entity.precautionUpdateBy);
            var str1 = htmlDecode(entity.precautionContent);
            $("#precautionAttachment").html(precautionAttachment);
            $("#precautionContent").html(str1);
            $("#download").attr("href",Feng.imgServerPath+"/"+entity.precautionAttachment);
        }
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
//    ajax.set(id);
    ajax.start();
};






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
    PrecautionEdit.init();
   /* console.log($("#precautionContent").html());
    console.log(htmlDecode($("#precautionContent").html()));
    $("#precautionContent").html(htmlDecode($("#precautionContent").html()));*/
});
