/**
 * 预警周期管理初始化
 */
var WarningCycle = {
    id: "WarningCycleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningCycle.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningCycle.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningCycle.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警周期
 */
WarningCycle.openAddWarningCycle = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警周期',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningCycle/warningCycle_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警周期详情
 */
WarningCycle.openWarningCycleDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警周期详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningCycle/warningCycle_update/' + WarningCycle.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警周期
 */
WarningCycle.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningCycle/delete", function (data) {
            Feng.success("删除成功!");
            WarningCycle.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningCycleId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询预警周期列表
 */
WarningCycle.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    WarningCycle.table.refresh({query: queryData});
};
WarningCycle.init = function(){
    var ajax = new $ax(Feng.ctxPath + "/warning/list", function (data) {
        WarningCycle.IndexInit(data.index);
        WarningCycle.LabelInit(data.title);
        WarningCycle.KeywordsInit(data.keyword);
        WarningCycle.CycleInit(data.cycle);
    }, function (data) {

    });
    // ajax.set("userHereticsRecordId",this.seItem.id);
    ajax.start('get');
};

/**
 * 指数模型初始化
 */
WarningCycle.IndexInit = function(data){
    if(data.warningIndexSwith == "1"){
        $(".indexCheckbox").prop('checked', true);
        $("#warningIndexSwithLabel").html('ON');
        $("#warningIndexSwith").val('1');
    }
    else{
        $(".indexCheckbox").prop('checked', false);
        $("#warningIndexSwithLabel").html('OFF');
        $("#warningIndexSwith").val('0');
    }
    $("#warningIndexId").val(data.warningIndexId);
    $("#warningIndexTotal").val(data.warningIndexTotal);
    $("#warningIndexSwith").val(data.warningIndexSwith);
    $("#warningIndexBadBehavior").val(data.warningIndexBadBehavior);
    $("#warningIndexHit").val(data.warningIndexHit);
    $("#warningIndexChange").val(data.warningIndexChange);
    $("#warningIndexHeretics").val(data.warningIndexHeretics);
    $("#warningIndexDangerous").val(data.warningIndexDangerous);
}

/**
 * 标签模型初始化
 */
WarningCycle.LabelInit = function(data){
    var str = "";
    if(data[0].warningTitleSwith == "1"){
        $(".titleCheckbox").prop('checked', true);
        $("#warningTitleSwithLabel").html('ON');
        $("#warningTitleSwith").val('1');
    }
    else{
        $(".titleCheckbox").prop('checked', false);
        $("#warningTitleSwithLabel").html('OFF');
        $("#warningTitleSwith").val('0');
    }
    for(var i = 0 ; i < data.length ; i++){
      if(data[i].warningTitleIsHignLight == '1'){
          str += "<li class='active' data-id="+data[i].warningTitleId+">"+data[i].warningTitleName+"</li>"
      }
      else{
          str += "<li class='' data-id="+data[i].warningTitleId+">"+data[i].warningTitleName+"</li>"
      }
  }
  $("#label-info").append(str);
};

/**
 * 关键字预警初始化
 */
WarningCycle.KeywordsInit = function(data){
    if(data[0].warningKeywordSwith == "1"){
        $(".KeywordCheckbox").prop('checked', true);
        $("#warningKeywordSwithLabel").html('ON');
        $("#warningKeywordSwith").val('1');
    }
    else{
        $(".KeywordCheckbox").prop('checked', false);
        $("#warningKeywordSwithLabel").html('OFF');
        $("#warningKeywordSwith").val('0');
    }
    var str = "";
    for(var i = 0;i < data.length;i++){
        $("#warningKeywordId").val(data[i].warningKeywordId);
        str += data[i].warningKeywordName;
    }
    $("#warningKeywordName").val(str);
};

/**
 * 周期预警初始化
 */
WarningCycle.CycleInit = function(data){
    if(data[0].warningCycleSwith == "1"){
        $(".CycleCheckbox").prop('checked', true);
        $("#warningCycleSwithLabel").html('ON');
        $("#warningCycleSwith").val('1');
    }
    else{
        $(".CycleCheckbox").prop('checked', false);
        $("#warningCycleSwithLabel").html('OFF');
        $("#warningCycleSwith").val('0');
    }
    for(var i = 0; i < data.length; i++){
        $("#warningCycleId").val(data[i].warningCycleId);
        $("#warningCycleEndTime").html(data[i].warningCycleEndTime);
        if(data[i].warningCycleType == "1"){
           $("#year").prop("checked","checked");
        }
        if(data[i].warningCycleType == "2"){
            $("#month").prop("checked","checked");
        }
        if(data[i].warningCycleType == "3"){
            $("#week").prop("checked","checked");
        }
        if(data[i].warningCycleType == "4"){
            $("#day").prop("checked","checked");
        }
    }

};

/**
 * 提交预警管理周期信息
 */
WarningCycle.submitInfo = function(){
    var warningTitleIds = "";
    var label = $("#label-info li.active");
    for(var i = 0; i < label.length; i++){
        warningTitleIds += label[i].getAttribute('data-id')+',';
    }
    warningTitleIds = warningTitleIds.substring(0,warningTitleIds.length-1);
  var map = {
      "warningIndexId":$("#warningIndexId").val(),
      "warningIndexTotal":$("#warningIndexTotal").val(),
      "warningIndexSwith":$("#warningIndexSwith").val(),
      "warningIndexBadBehavior":$("#warningIndexBadBehavior").val(),
      "warningIndexHit":$("#warningIndexHit").val(),
      "warningIndexChange":$("#warningIndexChange").val(),
      "warningIndexHeretics":$("#warningIndexHeretics").val(),
      "warningIndexDangerous":$("#warningIndexDangerous").val(),
      "warningTitleSwith":$("#warningTitleSwith").val(),
      "warningTitleIds":warningTitleIds,
      "warningKeywordId":$("#warningKeywordId").val(),
      "warningKeywordSwith":$("#warningKeywordSwith").val(),
      "warningKeywordName":$("#warningKeywordName").val(),
      "warningCycleId":$("#warningCycleId").val(),
      "warningCycleSwith":$("#warningCycleSwith").val(),
      "warningCycleType":$(".cycle-content input[type=radio]:checked").val()
  };
    var ajax = new $ax(Feng.ctxPath + "/warning/update", function (data) {
        Feng.success("提交成功");
        window.location.reload();
    }, function (data) {
        Feng.error("提交失败" + data.responseJSON.message + "!");
    });
    ajax.set(map);
    ajax.start();
};

$(function () {
    WarningCycle.init();
    var defaultColunms = WarningCycle.initColumn();
    var table = new BSTable(WarningCycle.id, "/warningCycle/list", defaultColunms);
    table.setPaginationType("client");
    WarningCycle.table = table.init();
    $("#label-info li").click(function(){
        $(this).toggleClass('active');
    });
});
