/**
 * Created by Administrator on 2018/5/4 0004.
 */
var ActivitySituation = {
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
}
/**
 * 初始化重点人员列表
 */
ActivitySituation.initData = function () {
    var that = this;
    that.initChart({
        url: '/activityCase/areaCaseTrending',
        type: 'line',
        id: "",
        chartId: 'areaCaseTrending',
        time:year+$("#month").val()
    });
    that.initChart({
        url: '/activityCase/areaCaseDetail',
        type: 'bar',
        id: "",
        chartId: 'areaCaseDetail',
    });


};

function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}

/**
 * 初始化图表
 */
ActivitySituation.initChart = function (obj) {
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
    if (obj.time) {
        ajax.set({
            time: obj.time
        });
    }else if (obj.name) {
        ajax.set('name', obj.name);
    }
    ajax.start();
};


/**
 * 时间选择
 */
ActivitySituation.selectTime = function (dom) {
    this.checkChart(dom.data('id'));
    this.initChart({
        url: dom.data('url'),
        type: dom.data('type'),
        id: "",
        chartId: dom.data('id'),
        time:dom.html()+$('#month').val()

    })
};

/**
 * 检测图表是否存在
 */
ActivitySituation.checkChart = function (id) {
    if (this.myCharts[id] != null && this.myCharts[id] != "" && this.myCharts[id] != undefined) {
        this.myCharts[id].dispose();
    }
};


$(function(){
    var d=new Date();
    var m = d.getMonth() + 1;
    if(m < 10){
        m = "0"+m;
    }
    $("#month").val(m);
    ActivitySituation.initData();
});