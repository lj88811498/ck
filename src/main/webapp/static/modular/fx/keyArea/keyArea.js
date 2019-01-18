/**
 * 管理初始化
 */
var KeyArea = {
    id: "SocialTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
KeyArea.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'socialId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'socialUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '领取时间', field: 'socialTime', visible: true, align: 'center', valign: 'middle'},
            {title: '领取地点', field: 'socialLocal', visible: true, align: 'center', valign: 'middle'},
            {title: '领取金额', field: 'socialMoney', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'socialCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'socialUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'socialUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'socialCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
KeyArea.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Social.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
KeyArea.Add= function () {
    var index = layer.open({
        type: 2,
        title: '添加重点区域',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/keyArea/keyArea_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看详情
 */
KeyArea.openDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '重点区域详情',
            area: ['100%', '100%'], //宽高
            fix: false, //不固定
            maxmin: false,
            content: Feng.ctxPath + '/keyArea/keyArea_detail/' + id
        });
        this.layerIndex = index;

};


/**
 * 打开编辑页面
 */
KeyArea.edit = function(id){
    var index = layer.open({
        type: 2,
        title: '重点区域编辑',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/keyArea/keyArea_update/' + id
    });
    this.layerIndex = index;
};


/**
 * 删除
 */
KeyArea.delete = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/keyArea/delete", function (data) {
            Feng.success("删除成功!");
            location.reload();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("keyAreaId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });


};

/**
 * 查询列表
 */
KeyArea.search = function () {
    var queryData = {};
    queryData['keyAreaName'] = $("#keyAreaName").val();
    queryData['keyAreaTownship'] = $("#keyAreaTownship").val();
   // Social.table.refresh({query: queryData});
    KeyArea.initWarning(queryData);
};


KeyArea.initWarning = function(params){

    var ajax = new $ax(Feng.ctxPath + "/keyArea/findKeyAreaList", function (data) {
       if(data.page.records.length > 0){
            $("#f_noContent").hide();
            $(".pgShow").show();
      }
       else{
           $("#f_noContent").show();
           $(".pgShow").hide();
     }
        getList(data);
        getOrderClaimListPager(data.page.total);
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    if(params){
        ajax.set(params);
    }
    // ajax.set("curPage",curPage);
    ajax.start();

}


function getList(data){
    $(".keyAreaContent").html("");
    var list = '';
    var li = "";
    var areas = data.page.records;
    var area = "";
    var show = "none";
    for(var i = 0; i < areas.length; i++){
        area = areas[i];
        console.info(area.keyAreaImg)
        if(area.keyAreaImg===''){
            area.keyAreaImg='/monitor.png';
        }
        li += '<div class="usersCard keyAreaInfo">'
            + '<div class="row">' +
            '<div class="col-sm-12">'+
            '<div class="col-sm-4"><p class="keyAreaImg"><img src='+Feng.imgServerPath+area.keyAreaImg+'></p>'+
            '</div>'
            +'<div class="col-sm-6">'
            + '<p class="keyAreaName">' + area.keyAreaName + '</p>'
            + '<p class="keyAreaTownship">' + area.keyAreaTownship + '</p>'
            + '<a class="keyAreaDesc" title='+area.keyAreaDesc +'>' + area.keyAreaDesc + '</a>'
            +'</div>'
            +'<div class="col-sm-2 operate"><div><p><button class="" onclick="KeyArea.openDetail('+area.keyAreaId+')">详情</button></p><p><button class="" onclick="KeyArea.edit('+area.keyAreaId+')">编辑</button></p>' +
            '<p><button class="" onclick="KeyArea.delete('+area.keyAreaId+')">删除</button></p></div></div>'
            + '</div></div>'
            + '</div>';

    }
    $(".keyAreaContent").append(li);
}
function getOrderClaimListPager(totalCount){
    $('.pagination').pagination({
        totalData: totalCount,
        showData: 3,
        count: 1,
        keepShowPN:true,
        coping:true,
        callback: function (api){
            var curPage = api.getCurrent();
            $.ajax({
                url: Feng.ctxPath + "/keyArea/findKeyAreaList",
                type: 'post',
                dataType: 'json',
                data: {curPage: curPage},
                success: function(result){
                    var rows = result.page.records;
                    getList(result);
                }
            });
        }
    });
}

$(function () {
    KeyArea.initWarning();

  /*  var defaultColunms = KeyArea.initColumn();
    var table = new BSTable(KeyArea.id, "/social/list", defaultColunms);
    table.setPaginationType("client");
    KeyArea.table = table.init();*/
});
