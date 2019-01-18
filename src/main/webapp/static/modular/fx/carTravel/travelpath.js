/**
 * Created by Administrator on 2018/4/26 0026.
 */
var Travelpath = {
    myCharts: {},
    chartsType:{
        map: function (data) {
            var option;
            var lines = [];
            var res = [];
            var geoCoordMap = {};
            function convertCity(arr) {
                for (var i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].Travel && arr[i].Travel.length > 0) {
                        lines.push([
                            {
                                coord: [
                                    arr[i].Travel[0].latitude, arr[i].Travel[0].longitude
                                ]
                            },
                            {
                                coord: [
                                    arr[i].Travel[1].latitude, arr[i].Travel[1].longitude
                                ]
                            }
                        ]);
                        convertCity(arr[i].Travel);
                    }else {
                        if (!geoCoordMap.hasOwnProperty(arr[i].station)) {
                            geoCoordMap[arr[i].station] = [];
                            geoCoordMap[arr[i].station].push(arr[i].latitude);
                            geoCoordMap[arr[i].station].push(arr[i].longitude);
                        }
                    }
                }
            }
            function convertScatter(geos) {
                for (var k in geoCoordMap) {
                    res.push({
                        name: k,
                        value: geoCoordMap[k]
                    })
                }
            }
            convertCity(data.entity.allTravel);
            convertScatter(geoCoordMap)
            option = {
                backgroundColor: '#FDFCF8',
                geo: {
                    map: 'china',
                    roam: true,
                    center: [103.86, 30.80],
                    zoom: 5,
                    layoutCenter: ['50%', '53%'],
                    layoutSize: "108%",
                    itemStyle: {
                        normal: {
                            areaColor: '#ECFAFD',
                            borderColor: '#7FBED0',
                            borderWidth: 1
                        },
                        emphasis: {
                            areaColor: '#D0F5FE',
                            borderColor: '#5DACC0',
                            borderWidth: 2
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                            color: '#ffffff',
                            fontSize: 14
                        },
                        emphasis: {
                            show: false,
                            color: '#ffffff',
                            fontSize: 14
                        }
                    },
                    regions:[
                        {
                            name: '四川',
                            selected: true
                        }
                    ]
                },
                series: [
                    {
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: 'arrow',
                            symbolSize: 10
                        },
                        lineStyle: {
                            normal: {
                                color: '#FD5B46',
                                width: 2,
                                type: 'dashed',
                                curveness: 0
                            }
                        },
                        data: lines
                    },
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'bottom',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: 10,
                        itemStyle: {
                            normal: {
                                color: '#FE5946',
                                borderColor: '#ffffff'
                            }
                        },
                        data: res
                    }
                ]
            };
            return option;
        },
        bar: function (data) {
            var option;
            var entity = data.entity;
            var dataX = [];
            var dataY = [];
            for(var d = 0; d < entity.length; d++) {
                dataX.push(entity[d].station);
                dataY.push(entity[d].count);
            }
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
                    data:""
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
                        name: '',
                        type: 'bar',
                        barGap: 0.1,
                        barWidth:25,
                        // label: labelOption,
                        data: dataY
                    },


                ]
            };
            return option;
        },
        barWithLine: function (data) {
            var option;
            var entity = data.entity;
            var carTrendingData = entity.carTrending; //汽车出行
            var busTrendingData = entity.busTrending; //公交出行
            var airTrendingData = entity.airTrending; //飞机出行
            var boatTrendingData = entity.boatTrending; //轮船出行
            var trainTrendingData = entity.trainTrending; //火车出行
            var carTrending = [];
            var busTrending = [];
            var airTrending = [];
            var boatTrending = [];
            var trainTrending = [];
            var timeDataX = [];
            var timeData = mGetDate($('#year1').html(),$('#month1').val());
            var totalTravels = [];
            for(var i = 1; i <= parseInt(timeData); i++){
                timeDataX.push(i);
                carTrending.push({countNum:0,day:i});
                busTrending.push({countNum:0,day:i});
                airTrending.push({countNum:0,day:i});
                boatTrending.push({countNum:0,day:i});
                trainTrending.push({countNum:0,day:i});
            }
            for(var n = 0 ; n < carTrending.length;n++){
                for(var j = 0; j < carTrendingData.length; j++){
                    if(carTrending[n].day == carTrendingData[j].day){
                        carTrending[n].countNum = carTrendingData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < busTrending.length;n++){
                for(var j = 0; j < busTrendingData.length; j++){
                    if(busTrending[n].day == busTrendingData[j].day){
                        busTrending[n].countNum = busTrendingData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < airTrending.length;n++){
                for(var j = 0; j < airTrendingData.length; j++){
                    if(airTrending[n].day == airTrendingData[j].day){
                        airTrending[n].countNum = airTrendingData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < boatTrending.length;n++){
                for(var j = 0; j < boatTrendingData.length; j++){
                    if(boatTrending[n].day == boatTrendingData[j].day){
                        boatTrending[n].countNum = boatTrendingData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < trainTrending.length;n++){
                for(var j = 0; j < trainTrendingData.length; j++){
                    if(trainTrending[n].day == trainTrendingData[j].day){
                        trainTrending[n].countNum = trainTrendingData[j].countNum;
                    }
                }
            }
            var carTrendingValue = [];
            var busTrendingValue = [];
            var airTrendingValue = [];
            var boatTrendingValue = [];
            var trainTrendingValue = [];
            for(var t = 0;t < carTrending.length;t++){
                carTrendingValue.push(carTrending[t].countNum);
            }
            for(var u = 0;u < busTrending.length;u++){
                busTrendingValue.push(busTrending[u].countNum);
            }
            for(var u = 0;u < airTrending.length;u++){
                airTrendingValue.push(airTrending[u].countNum);
            }
            for(var u = 0;u < boatTrending.length;u++){
                boatTrendingValue.push(boatTrending[u].countNum);
            }
            for(var u = 0;u < trainTrending.length;u++){
                trainTrendingValue.push(trainTrending[u].countNum);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'cross'}
                },
                legend: {
                    data: ['汽车出行','公交出行','飞机出行','轮船出行','火车出行'],
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
                        name:'汽车出行',
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
                               /* colorStops: [{
                                    offset: 0, color: 'red' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#eedefb' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#eedefb' // 100% 处的颜色
                                    }],*/
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:carTrendingValue
                    },
                    {
                        name:'公交出行',
                        type:'line',
                        lineWidth:30,
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
                                    offset: 0, color: '#dadcf5' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#dadcf5' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#dadcf5' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:busTrendingValue
                    },
                    {
                        name:'飞机出行',
                        type:'line',
                        lineWidth:30,
                        itemStyle: {
                            opacity: 0,
                            color: '#cccc9f',
                        },
                        lineStyle: {
                            color: '#cccc9f',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#cccc9f' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#cccc9f' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#cccc9f' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:airTrendingValue
                    },
                    {
                        name:'轮船出行',
                        type:'line',
                        itemStyle: {
                            opacity: 0,
                            color: '#75d99a',
                        },
                        lineStyle: {
                            color: '#75d99a',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#75d99a' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#75d99a' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#75d99a' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:boatTrendingValue
                    },
                    {
                        name:'火车出行',
                        type:'line',
                        itemStyle: {
                            opacity: 0,
                            color: '#d98f18',
                        },
                        lineStyle: {
                            color: '#d98f18',
                            width:3
                        },
                        areaStyle:{
                            color: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.5,
                                colorStops: [{
                                    offset: 0, color: '#d98f18' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#d98f18' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#d98f18' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:trainTrendingValue
                    }
                ]
            };
            return option;
        },
    }
};
/**
 * 初始化重点人员列表
 */
Travelpath.initUsers = function (name) {
    var that = this;
    that.initChart({
        url: '/carTravel/allTravelRoute',
        type: 'map',
        id: "",
        chartId: 'travelPath'
    });
    that.initChart({
        url: '/carTravel/mostVisitedTop',
        type: 'bar',
        id: "",
        chartId: 'mostVisitedTop',
        time:year+$("#month").val()
    });
    that.initChart({
        url: '/carTravel/travelTrending',
        type: 'barWithLine',
        id: "",
        chartId: 'travelTrending',
        time:year+$("#month1").val()
    });


};


/**
 * 创建最新出行动态卡片
 */
Travelpath.initUsersCard = function () {
    var ajax = new $ax(Feng.ctxPath + "/carTravel/latestTrends", function (data) {
        var list = '';
        var li = "";
        var users = data.entity;
        var user = "";
        var show = "none";
        for(var i = 0; i < users.length; i++){
            user = users[i];
            if(user.isattention == "否"){
               show = "none";
            }
            else{
                show = "inline-block";
            }
            li += '<li class="usersCard"  data-name="' + user.name + '">'
                + '<div class="row">'
                + '<div class="col-sm-4">姓名：' + user.name + '</div>'
                + '<div class="col-sm-4">性别：' + user.sex + '</div>'
                + '<div class="col-sm-4">年龄：' + user.age + '</div>'
                + '<div class="col-sm-12" style="margin-top: 5px">地址：' + user.resident +'</div>'
                + '<div class="col-sm-12" style="margin-top: 5px">行程时间：' + user.travelTime + '</div>';
            if(user.vehicle == "公交"){
                li += '<div class="col-sm-12" style="margin-top: 5px">乘坐路线：' + user.busRoute +'</div>'
            }
            else{
                li += '<div class="col-sm-12" style="margin-top: 5px">起止地点：' + user.carStartStation + "-"+user.carEndStation+'</div>'
            }
            li += '<div class="col-sm-12" style="margin-top: 5px">交通工具：' + user.vehicle + '</div>'
                + '</div>'
                + '<div class="row">'
                + '<ul class="tag-list clearfix">'
                + '<li>风险指数'+ user.riskIndex +'</li>'
                + '<li style="display: '+show+'">重点关注对象</li>'
                + '</ul>'
                + '</div>'
                + '</li>';
        }
        $("#latestTrends").append(li);
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    ajax.set('num', 3);
    ajax.start();

};



/**
 * 初始化图表
 */
Travelpath.initChart = function (obj) {
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
 * 检测图表是否存在
 */
Travelpath.checkChart = function (id) {
    if (this.myCharts[id] != null && this.myCharts[id] != "" && this.myCharts[id] != undefined) {
        this.myCharts[id].dispose();
    }
};


/**
 * 时间选择
 */
Travelpath.selectTime = function (dom) {
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
 * 时间选择
 */
Travelpath.selectTime1 = function (dom) {
    this.checkChart(dom.data('id'));
    this.initChart({
        url: dom.data('url'),
        type: dom.data('type'),
        id: "",
        chartId: dom.data('id'),
        time:dom.html()+$('#month1').val()

    })
};

function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}

$(function () {
    var d=new Date();
    var m = d.getMonth() + 1;
    if(m < 10){
        m = "0"+m;
    }
    //$("#month1").val(m);
    //$("#month").val(m);
    Travelpath.initUsersCard();
    Travelpath.initUsers();

    var map = new BMap.Map("travelPath");
    map.enableDragging();
    //document.getElementById("month1").value = m;
});