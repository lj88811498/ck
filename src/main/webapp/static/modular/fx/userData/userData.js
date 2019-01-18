/**
 * 用户数据管理初始化
 */
var UserData = {
    id: "UserDataTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    myCharts: {},
    chartsType:{
        bar: function (data) {
            var option;
           var totalAll = data.totalAll;
           var analysis = data.analysis;
           var totalAllData = [];
           var analysisData = [];
           var totalAllSum = 0;
           var analysisSum = 0;
           var dataX = ['水务局', '能源办', '交通局', '民政局','卫计局','人社局','综治办','公安局','不动产','市场监督局','国保局'];
            for(var d = 0; d < dataX.length; d++) {
                totalAllData.push({totalNum:0,type:dataX[d]});
                analysisData.push({countNum:0,type:dataX[d]});
            }
            for (var n = 0; n < totalAllData.length; n++) {
                for(var i = 0; i < totalAll.length; i++){
                    if(totalAllData[n].type == totalAll[i].type){
                        totalAllData[n].totalNum = totalAll[i].totalNum;
                    }
                }
            }
            for (var j = 0; j < analysisData.length; j++) {
                for(var h = 0; h < analysis.length; h++){
                    if(analysisData[j].type == analysis[h].type){
                        analysisData[j].countNum = analysis[h].countNum;
                    }
                }
            }
            var totalAllY = [];
            var analysisY = [];
            for(var t = 0; t < totalAllData.length; t++){
                totalAllSum += totalAllData[t].totalNum;
                totalAllY.push(totalAllData[t].totalNum);
            }
            for(var a = 0; a < analysisData.length; a++){
                analysisSum += analysisData[a].countNum;
                analysisY.push(analysisData[a].countNum);
            }
            dataX.unshift('全量');
            totalAllY.unshift(totalAllSum);
            analysisY.unshift(analysisSum);
            option = {
                color: ['#89a9d0', '#8dbfca'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    bottom:10,
                    data: ['总量数据', '本月新增']
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
                        name: '总量数据',
                        type: 'bar',
                        barGap: 0.1,
                        // label: labelOption,
                        data: totalAllY
                    },
                    {
                        name: '本月新增',
                        type: 'bar',
                        barGap: 0.1,
                        // label: labelOption,
                        data: analysisY
                    },

                ]
            };
            return option;
        },
    }
};

/**
 * 用户数据管理初始化
 */
UserData.initCommond = function(){
    var ajax = new $ax(Feng.ctxPath + "/userData/dataList", function (data) {
        var analysisData = data.analysisData;
        var totalAll = data.totalAll;
        var totalAllData = 0;
        var totalMonthData = 0;
        var arr1 = ['水务局','能源办','交通局','民政局','卫计局','人社局','综治办','公安局','不动产','市场监督局','国保局'];
        var arr2 = ['waterMonth','energyMonth','trafficMonth','serviceMonth','bureauMonth','peopleMonth','officeMonth','' +
        'policeMonth','estateMonth','mallMonth','countryMonth'];
        for(var i = 0; i < analysisData.length; i++){
           for (var j = 0; j < arr1.length; j ++ ) {
               if ( analysisData[i].type == arr1[j] ) {
                    $("#" + arr2[j]).html(analysisData[i].countNum);
                   totalMonthData += analysisData[i].countNum;
               }
           }
        }
        for(var h = 0; h < totalAll.length; h++){
            for (var n = 0; n < arr1.length; n ++ ) {
                if ( totalAll[h].type == arr1[n] ) {
                    totalAllData += totalAll[h].totalNum;
                    var total = $("#" + arr2[n]).parent().parent().children('p').eq(0).children();
                    total.html(totalAll[h].totalNum);
                }
            }
        }
        $("#allData").html(totalAllData);
        $("#allMonth").html(totalMonthData);
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    ajax.start('get');
}


/**
 * 初始化图表
 */
UserData.initChart = function (obj) {
    var that = this;
    this.myCharts[obj.chartId] = echarts.init(document.getElementById(obj.chartId));
    var ajax = new $ax(Feng.ctxPath + obj.url, function (data) {
        var chartData;
        switch (obj.type) {
            case 'graph':
                chartData = obj.members.concat(data);
                break;
            default:
                chartData = data;
                break;
        }
        that.myCharts[obj.chartId].setOption(that.chartsType[obj.type](chartData, obj.name));
        window.onresize = function () {
            for (var k in that.myCharts) {
                that.myCharts[k].resize();
            }
        };
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    if (obj.year) {
        ajax.set({
            month: obj.month,
            year:obj.year
        });
    }
    ajax.start('get');
};


/**
 * 检测图表是否存在
 */
UserData.checkChart = function (id) {
    if (this.myCharts[id] != null && this.myCharts[id] != "" && this.myCharts[id] != undefined) {
        this.myCharts[id].dispose();
    }
};


/**
 * 时间选择
 */
UserData.selectTime = function (dom) {
    this.checkChart(dom.data('id'));
    this.initChart({
        url: dom.data('url'),
        type: dom.data('type'),
        id: "",
        chartId: dom.data('id'),
        year: dom.html(),
        month:$("#month").val()
    })
};


/**
 * 初始化数据趋势
 */
UserData.initUsers = function () {
    var that = this;
    that.initChart({
        url: '/userData/list',
        type: 'bar',
        id: "",
        chartId: 'dataTrend',
        year: year,
        month:$("#month").val()
    });

};



$(function () {
    var d=new Date();
    var m = d.getMonth() + 1;
    if(m < 10){
        m = "0"+m;
    }
    $("#month").val(m);
    UserData.initUsers();
    UserData.initCommond();
});
