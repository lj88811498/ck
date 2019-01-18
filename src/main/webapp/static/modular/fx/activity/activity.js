/**
 * 管理初始化
 */
var ActivityCase = {
    id: "ActivityTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
ActivityCase.initColumn = function () {
    return [
            {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
            {title: '填报时间', field: 'activityManagerCreateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '填报单位', field: 'activityManagerUnit', visible: true, align: 'center', valign: 'middle',formatter:function(value,row,index){
                var id = row.id;
                var time = row.activityManagerCreateTime;
                var unit = row.activityManagerUnit;
                var name = row.activityManagerName;
                var leader = row.activityManagerLeader;
                time = JSON.stringify(time);
                unit = JSON.stringify(unit);
                name = JSON.stringify(name);
                leader = JSON.stringify(leader);
                newValue = "<a onclick = 'ActivityCase.activityDetail("+id+","+time+","+unit+","+name+","+leader+")' style='text-decoration:underline '>"+value+"</a>";
                return newValue;
            }},
            {title: '填报人', field: 'activityManagerName', visible: true, align: 'center', valign: 'middle'},
            {title: '分管领导', field: 'activityManagerLeader', visible: true, align: 'center', valign: 'middle'},
            {title: '案件数量', field: 'caseCount', visible: true, align: 'center', valign: 'middle'},
            {title: '新增邪教人员', field: 'newPeople', visible: true, align: 'center', valign: 'middle'},
            {title: '被挡获情况', field: 'suspendCount', visible: true, align: 'center', valign: 'middle'},
            {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ActivityCase.operateFormatter, width: '20%'}
    ];
};


ActivityCase.operateFormatter = function(value,row,index){
    var result = "";
    var id = row.id;
    var time = row.activityManagerCreateTime;
    var unit = row.activityManagerUnit;
    var name = row.activityManagerName;
    var leader = row.activityManagerLeader;
    time = JSON.stringify(time);
    unit = JSON.stringify(unit);
    name = JSON.stringify(name);
    leader = JSON.stringify(leader);
    result += "<button type='button' class='btn btn-info nocolor-btn' onclick='ActivityCase.activityDetail("+id+","+time+","+unit+","+name+","+leader+")'>编辑</button>";
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ActivityCase.delete(' + row.id + ')">删除</button>';
    return [result].join('');
};
/**
 * 检查是否选中
 */
ActivityCase.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        ActivityCase.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加
 */
ActivityCase.openAddActivityCase = function () {
    var index = layer.open({
        type: 2,
        title: '添加',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/manager_add'
    });
    this.layerIndex = index;
};


/**
 * 邪教活动详情
 */
ActivityCase.activityDetail = function(id,time,unit,name,leader){
    var index = layer.open({
        type: 2,
        title: '邪教活动详情',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/activityCase/activityDetail?id=' + id + '&activityManagerCreateTime=' +time + '&activityManagerUnit='+unit+ '&activityManagerName='+name+ '&activityManagerLeader='+leader
    });
    this.layerIndex = index;
};



/**
 * 区域案件情况
 */
ActivityCase.activityAreaCase = function(){
    var index = layer.open({
        type: 2,
        title: '区域案件情况',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/activityCase//activitySituation'
    });
    this.layerIndex = index;
};


/**
 * 打开查看详情
 */
ActivityCase.openActivityCaseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/activityCase/activityCase_update/' + ActivityCase.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除
 */

ActivityCase.delete = function (id) {

    Feng.confirm('是否删除邪教活动情况？', function () {
        var ajax = new $ax(Feng.ctxPath + "/activityCase/deleteManager?id="+id, function (data) {
            Feng.success("删除成功!");
            ActivityCase.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });

        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });

};

/**
 * 查询列表
 */
ActivityCase.search = function () {
    var queryData = {};
    queryData['activityManagerUnit'] = $("#street").val();
    queryData['startTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    ActivityCase.table.refresh({query: queryData});
};


/**
 * 查询街道
 */
ActivityCase.streetInfo = function(){
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/street/list", function(data){
        var street = data.page;
        var strStreet = "";
        for(var j = 0; j < street.length; j++){
            strStreet += "<option value="+street[j]+">"+street[j]+"</option>"
        }
        $("#street").append(strStreet);
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    // ajax.set(this.peopleInfoInfoData);
    ajax.start('GET');
};


/**
 * 邪教活动情况管理新增页面
 */
ActivityCase.add = function(){
    var index = layer.open({
        type: 2,
        title: '新增',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityCase_update/' + ActivityCase.seItem.id
    });
    this.layerIndex = index;
};



$(function () {
    ActivityCase.streetInfo();
    var defaultColunms = ActivityCase.initColumn();
    var table = new BSTable(ActivityCase.id, "/activityCase/activityDetail", defaultColunms);
    ActivityCase.table = table.init();
});
