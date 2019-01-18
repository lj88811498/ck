/**
 * 管理初始化
 */
var ActivityCase = {
    id: "caseTable",	//表格id
    newAddId:'newAddTable',
    suspendId:'suspendTable',
    seItem: null,		//选中的条目
    table: null,
    newAddTable:null,
    suspendTable:null,
    layerIndex: -1,
    myCharts: {},
    chartsType:{
        line: function (data) {
            var option;
            var entity = data.entity;
            var caseData = [];
            var suspendData = [];
            var userData = [];
            for(var f = 0; f < entity.length; f++){
                if(entity[f].type == 'case'){
                    caseData.push({count:entity[f].count,day:entity[f].day})
                }
                if(entity[f].type == 'suspend'){
                    suspendData.push({count:entity[f].count,day:entity[f].day})
                }
                if(entity[f].type == 'user'){
                    userData.push({count:entity[f].count,day:entity[f].day})
                }
            }
            var caseDataNew = [];
            var suspendDataNew = [];
            var userDataNew = [];
            var timeDataX = [];
            var timeData = mGetDate($('#year').html(),$('#month').val());
            var totalTravels = [];
            for(var i = 1; i <= parseInt(timeData); i++){
                timeDataX.push(i);
                caseDataNew.push({count:0,day:i});
                suspendDataNew.push({count:0,day:i});
                userDataNew.push({count:0,day:i});
            }
            for(var n = 0 ; n < caseDataNew.length;n++){
                for(var j = 0; j < caseData.length; j++){
                    if(caseDataNew[n].day == caseData[j].day){
                        caseDataNew[n].count = caseData[j].count;
                    }
                }
            }
            for(var n = 0 ; n < suspendDataNew.length;n++){
                for(var j = 0; j < suspendData.length; j++){
                    if(suspendDataNew[n].day == suspendData[j].day){
                        suspendDataNew[n].count = suspendData[j].count;
                    }
                }
            }
            for(var n = 0 ; n < userDataNew.length;n++){
                for(var j = 0; j < userData.length; j++){
                    if(userDataNew[n].day == userData[j].day){
                        userDataNew[n].count = userData[j].count;
                    }
                }
            }
            var caseValue = [];
            var suspendValue = [];
            var userValue = [];
            for(var t = 0;t < caseDataNew.length;t++){
                caseValue.push(caseDataNew[t].count);
            }
            for(var u = 0;u < suspendDataNew.length;u++){
                suspendValue.push(suspendDataNew[u].count);
            }
            for(var h = 0;h < userDataNew.length;h++){
                userValue.push(userDataNew[h].count);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'cross'}
                },
                legend: {
                    data: ['案件数量','新增人员数','被挡获数量'],
                    bottom: 10
                },
                grid: {
                    right: '15%'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: timeDataX,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#747474'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#CFCFD1',
                                type: 'dashed'
                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        // max: 30,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                // color: '#ced5d7'
                            }
                        },

                    }

                ],
                series: [
                    {
                        name:'案件数量',
                        type:'line',
                        lineWidth:30,
                        itemStyle: {
                            opacity: 0.5,
                            color: '#D19FF7',
                        },
                        lineStyle: {
                            color: '#D19FF7',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#eedefb' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#eedefb' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:caseValue
                    },
                    {
                        name:'新增人员数',
                        type:'line',
                        itemStyle: {
                            opacity: 0,
                            color: '#8EAAD9',
                        },
                        lineStyle: {
                            color: '#8EAAD9',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#dadcf5' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#dadcf5' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:userValue
                    },
                    {
                        name:'被挡获数量',
                        type:'line',
                        itemStyle: {
                            opacity: 0,
                            color: '#71D1E7',
                        },
                        lineStyle: {
                            color: '#71D1E7',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#dadcf5' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#dadcf5' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:suspendValue
                    },
                ]
            };
            return option;
        },
        bar: function (data) {
            var option;
            var entity = data.entity;
            var dataX = [];
            var user = [];
            var newPeople = [];
            var suspend = [];
            for(var i = 0; i < entity.length; i++){
                dataX.push(entity[i].streetName);
                if(entity[i].countUser){
                    user.push(entity[i].countUser);
                }
                else{
                    user.push(0);
                }
                if(entity[i].countNewPeople){
                    newPeople.push(entity[i].countNewPeople);
                }
                else{
                    newPeople.push(0);
                }
                if(entity[i].countSuspend){
                    suspend.push(entity[i].countSuspend);
                }
                else{
                    suspend.push(0);
                }
            }
            option = {
                color: ['#89a9d0', '#8dbfca','#98b4ca'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    bottom:10,
                    data: ['案件数量', '新增人员数','被挡获数量']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: dataX
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '案件数量',
                        type: 'bar',
                        barGap: 0.1,
                        // label: labelOption,
                        data: user
                    },
                    {
                        name: '新增人员数',
                        type: 'bar',
                        barGap: 0.1,
                        // label: labelOption,
                        data: newPeople
                    },
                    {
                        name: '被挡获数量',
                        type: 'bar',
                        barGap: 0.1,
                        // label: labelOption,
                        data: suspend
                    },

                ]
            };
            return option;
        },
    }
};

/**
 * 初始化表格的列
 */
ActivityCase.initColumn = function () {
    return [
             // {field: 'selectItem', radio: false},
            {title: 'activityCaseId', field: 'activityCaseId', visible: false, align: 'center', valign: 'middle'},
            {title: '案件时间', field: 'activityCaseTime', visible: true, align: 'center', valign: 'middle'},
            {title: '案件地点', field: 'activityCaseLocal', visible: true, align: 'center', valign: 'middle'},
            {title: '案件内容', field: 'activityCaseContent', visible: true, align: 'center', valign: 'middle'},
            {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ActivityCase.operateCaseFormatter, width: '20%'}
    ];
};


/**
 * 初始化新增人员表格的列
 */
ActivityCase.initNewAddColumn = function () {
    return [
        // {field: 'selectItem', radio: false},
        {title: 'activityCaseUserId', field: 'activityCaseUserId', visible: false, align: 'center', valign: 'middle'},
        {title: '时间', field: 'activityCaseUserCreateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'name', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证号', field: 'card', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ActivityCase.operatePeopleFormatter, width: '20%'}
    ];
};


/**
 * 初始化被挡获情况表格的列
 */
ActivityCase.initsuspendColumn = function () {
    return [
        // {field: 'selectItem', radio: false},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: 'activityCaseId', field: 'activityCaseId', visible: false, align: 'center', valign: 'middle'},
        {title: '时间', field: 'activityCaseTime', visible: true, align: 'center', valign: 'middle'},
        {title: '地点', field: 'activityCaseLocal', visible: true, align: 'center', valign: 'middle'},
        {title: '内容', field: 'activityCaseContent', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ActivityCase.operateArrestFormatter, width: '20%'}
    ];
};

ActivityCase.operateCaseFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="ActivityCase.openCaseDetail(' + row.activityCaseId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ActivityCase.deleteCase(' + row.activityCaseId + ')">删除</button>';
    return [result].join('');
};


ActivityCase.operatePeopleFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="ActivityCase.openPeopleDetail(' + row.activityCaseUserId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ActivityCase.deletePeople(' + row.activityCaseUserId + ')">删除</button>';
    return [result].join('');
}

ActivityCase.operateArrestFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="ActivityCase.openArrestDetail(' + row.activityCaseId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="ActivityCase.deleteArrest(' + row.activityCaseId + ')">删除</button>';
    return [result].join('');
};

/**
 * 查看案件情况详情
 */
ActivityCase.openCaseDetail = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑案件情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityCase_update/' +id
    });
    this.layerIndex = index;
};

/**
 * 删除案件情况
 */
ActivityCase.deleteCase = function(id){
    var operation = function(){
        var ajax = new $ax(Feng.ctxPath + "/activityCase/deleteCase", function () {
            Feng.success("删除成功!");
            ActivityCase.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id",id);
        ajax.start();
    };

    Feng.confirm("是否刪除该案件?", operation);
};

/**
 * 查看邪教人员详情
 */
ActivityCase.openPeopleDetail = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑邪教人员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityPeo_update/' +id
    });
    this.layerIndex = index;
}


ActivityCase.deletePeople = function(id){
    var operation = function(){
        var ajax = new $ax(Feng.ctxPath + "/activityCase/deleteNewPeople", function () {
            Feng.success("删除成功!");
            ActivityCase.newAddTable.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id",id);
        ajax.start();
    };

    Feng.confirm("是否刪除邪教人员?", operation);
};

/**
 * 查看被挡获情况详情
 */
ActivityCase.openArrestDetail = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑被捕获情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityArrest_update/' +id
    });
    this.layerIndex = index;
}

ActivityCase.deleteArrest = function(id){
    var operation = function(){
        var ajax = new $ax(Feng.ctxPath + "/activityCase/deleteSuspend", function () {
            Feng.success("删除成功!");
            ActivityCase.suspendTable.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("id",id);
        ajax.start();
    };

    Feng.confirm("是否刪除被挡获情况?", operation);
}

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
        title: '添加案件情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityCase_add'
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
ActivityCase.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/activityCase/delete", function (data) {
            Feng.success("删除成功!");
            ActivityCase.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("activityCaseId",this.seItem.id);
        ajax.start();
    }
};



/**
 * 点击添加邪教人员
 */
ActivityCase.openAddActivityPeople = function () {
    var index = layer.open({
        type: 2,
        title: '添加邪教人员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityPeo_add'
    });
    this.layerIndex = index;
};

/**
 * 点击添加被挡获情况
 */
ActivityCase.openAddActivityAresst = function () {
    var index = layer.open({
        type: 2,
        title: '添加被挡获情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/activityCase/activityArrest_add'
    });
    this.layerIndex = index;
};
/**
 * 查询案件情况列表
 */
ActivityCase.caseDetailSearch = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['activityCaseManagerId'] = $("#activityCaseManagerId").val();
    ActivityCase.table.refresh({query: queryData});
};


/**
 * 查询新增邪教人员列表
 */
ActivityCase.newDetailSearch = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTime1").val();
    queryData['endTime'] = $("#endTime1").val();
    queryData['activityCaseManagerId'] = $("#activityCaseManagerId").val();
    ActivityCase.newAddTable.refresh({query: queryData});
};


/**
 * 查询被挡获人员列表
 */
ActivityCase.suspendDetailSearch = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTime2").val();
    queryData['endTime'] = $("#endTime2").val();
    queryData['activityCaseManagerId'] = $("#activityCaseManagerId").val();
    ActivityCase.suspendTable.refresh({query: queryData});
};


/**
 * 区域案件趋势
 */


$(function () {
    // ActivityCase.initData();
    var defaultColunms = ActivityCase.initColumn();
    var defaultNewAddColunms = ActivityCase.initNewAddColumn();
    var defaultSuspendColunms = ActivityCase.initsuspendColumn();
    var table = new BSTable(ActivityCase.id, "/activityCase/caseDetail", defaultColunms);
    var table1 = new BSTable(ActivityCase.newAddId, "/activityCase/newDetail", defaultNewAddColunms);
    var table2 = new BSTable(ActivityCase.suspendId, "/activityCase/suspendDetail", defaultSuspendColunms);
    table.setQueryParams({activityCaseManagerId: $('#activityCaseManagerId').val()});
    table1.setQueryParams({activityCaseManagerId: $('#activityCaseManagerId').val()});
    table2.setQueryParams({activityCaseManagerId: $('#activityCaseManagerId').val()});
    ActivityCase.table = table.init();
    ActivityCase.newAddTable = table1.init();
    ActivityCase.suspendTable = table2.init();
});
