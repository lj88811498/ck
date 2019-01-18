/**
 * 基本信息管理初始化
 */
var Monitor = {
    layerIndex: -1,
    myCharts: {},
    chartsType:{
        barWithLine: function (data) {
            var option;
            var totalInvolvingEvilRegsData = data.totalInvolvingEvilRegs;
            var totalUserHereticsData = data.totalUserHeretics;
            var totalTravelsData = data.totalTravels;
            var totalInvolvingEvilRegs = [];
            var totalUserHeretics = [];
            var timeDataX = [];
            var timeData = mGetDate($('#year').val(),$('#month').val());
            var totalTravels = [];
            for(var i = 1; i <= parseInt(timeData); i++){
                timeDataX.push(i);
                totalInvolvingEvilRegs.push({countNum:0,day:i});
                totalUserHeretics.push({countNum:0,day:i});
                totalTravels.push({countNum:0,day:i});
            }
            for(var n = 0 ; n < totalInvolvingEvilRegs.length;n++){
                for(var j = 0; j < totalInvolvingEvilRegsData.length; j++){
                    if(totalInvolvingEvilRegs[n].day == totalInvolvingEvilRegsData[j].day){
                        totalInvolvingEvilRegs[n].countNum = totalInvolvingEvilRegsData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < totalUserHeretics.length;n++){
                for(var j = 0; j < totalUserHereticsData.length; j++){
                    if(totalUserHeretics[n].day == totalUserHereticsData[j].day){
                        totalUserHeretics[n].countNum = totalUserHereticsData[j].countNum;
                    }
                }
            }
            for(var n = 0 ; n < totalTravels.length;n++){
                for(var j = 0; j < totalTravelsData.length; j++){
                    if(totalTravels[n].day == totalTravelsData[j].day){
                        totalTravels[n].countNum = totalTravelsData[j].countNum;
                    }
                }
            }
            var involvingEvilRegs = [];
            var userHeretics = [];
            var travels = [];
            for(var t = 0;t < totalInvolvingEvilRegs.length;t++){
                involvingEvilRegs.push(totalInvolvingEvilRegs[t].countNum);
            }
            for(var u = 0;u < totalUserHeretics.length;u++){
                userHeretics.push(totalUserHeretics[u].countNum);
            }
            for(var e = 0;e < totalTravels.length;e++){
                travels.push(totalTravels[e].countNum);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'cross'}
                },
                legend: {
                    data: ['帮教活动','出行信息','案件活动'],
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
                        name:'帮教活动',
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
                                    offset: 0, color: '#fbe4ee' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#fbe4ee' // 100% 处的颜色
                                },
                                    {
                                    offset: 1, color: '#fbe4ee' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:userHeretics
                    },
                    {
                        name:'出行信息',
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
                                    offset: 0, color: '#9AB3D9' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#9AB3D9' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#9AB3D9' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:travels
                    },
                    {
                        name:'案件活动',
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
                                    offset: 0, color: '#acdbe7' // 0% 处的颜色
                                },{
                                    offset: 0.5, color: '#acdbe7' // 100% 处的颜色
                                },
                                    {
                                        offset: 1, color: '#acdbe7' // 100% 处的颜色
                                    }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:involvingEvilRegs
                    }
                ]
            };
            return option;
        },
        pie:function(data){
            var option;
            var peopleData = [];
            var peopleTips = [];
            var people = data.totalPeople;
            var total = 0;
            for(var i = 0 ; i < people.length ; i++){
                total += parseInt(people[i].countNum);
                peopleData.push({
                    value:people[i].countNum,
                    name:people[i].level + ':' + people[i].countNum + "人",
                    viewName: people[i].level
                });
                peopleTips.push({
                    name: people[i].level + ':' + people[i].countNum + "人"
                });
            }
            $("#totalPerson").html(total+"人");
            option = {
                color:['#7493a7','#7ab9ca','#a49abd','#91c7ad','#d47676'],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    y : 'center',
                    right:'10%',
                    bottom: 10,
                    data: peopleTips
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['35%', '50%'],
                        selectedMode: 'single',
                        data:peopleData,
                        label: {
                            formatter: function (data) {
                                return data.data.viewName;
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            /*option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // x : 'right',
                    y : 'center',
                    right:'10%',
                    data:peopleTips,
                    orient:'vertical',
                    align:'left',
                    color:['#75b3c2','#d0b073','#d47676','#85b6a3','#a384d2']
                },
                toolbox: {
                    show : true,
                },
                calculable : true,
                series : [
                    {
                        // name:'面积模式',
                        type:'pie',
                        radius : [30, 110],
                        center : ['35%', '50%'],
                        roseType : 'area',
                        color:['#75b3c2','#d0b073','#d47676','#85b6a3','#a384d2'],
                        label: {
                            formatter: function (data) {
                                return data.data.viewName;
                            }
                        },
                        data:peopleData
                    }
                ]
            };*/

            return option;
        },
        bar:function(data){
            var totalArea = data.totalArea;
            var dataX = [];
            var dataY = [];
            for(var i = 0 , len = totalArea.length ; i < len ; i++){
                dataX.push(totalArea[i].street);
                dataY.push(totalArea[i].countNum);
            }
            var option;
            option = {
                color: ['#75b3c2'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data :dataX,
                        axisLabel:{
                            interval:0,//横轴信息全部显示
                            rotate:-26 //-30度角倾斜显示
                        } ,
                        verticalAlign: 'top',
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'',
                        type:'bar',
                        barWidth: '10%',
                        data:dataY
                    }
                ]
            };
            return option;
        },
        analysis:function(data){
          var option;
          var totalAnalysis = data.totalAnalysis;
          var dataX = [];
          var dataY = [];
          var sum = 0;
          for(var i = 0, len = totalAnalysis.length; i < len; i++){
              sum += parseInt(totalAnalysis[i].countNum);
              dataY.push({
                  value:totalAnalysis[i].countNum,
                  name:totalAnalysis[i].status+ ':' + totalAnalysis[i].countNum + "人",
                  viewName:totalAnalysis[i].status
              });
              dataX.push(totalAnalysis[i].status+ ':' + totalAnalysis[i].countNum + "人");
          }
          $("#totalAnalysis").html(sum + "人");
            option = {
                color:['#7493a7','#7ab9ca','#a49abd','#91c7ad','#d47676'],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    y : 'center',
                    right:'10%',
                    bottom: 10,
                    data: dataX
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['35%', '50%'],
                        selectedMode: 'single',
                        data:dataY,
                        label: {
                            formatter: function (data) {
                                return data.data.viewName;
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
          return option;
        },
        transformation:function(data){
            var option;
            var transformation = data.totalAnalysis;
            var sum = 0;
            var relief = "";
            var optionValue;
            for(var i = 0, len = transformation.length; i < len; i++){
                sum += parseInt(transformation[i].countNum);
                if(transformation[i].status == '已转化并解脱'){
                    relief = transformation[i].countNum;
                }
            }
            optionValue = (((relief/sum))*100).toFixed(0);
            option = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                },
                series: [
                    {
                        name: '',
                        type: 'gauge',
                        center: ['50%', '65%'],
                        detail: {formatter:'{value}%'},
                        data: [{value: optionValue, name: '转化率'}]
                    }
                ]
            };
            return option;
        },
        hit:function(data){
            var peopleData = [];
            var peopleTips = [];
            var people = data.totalHits;
            var total = 0;
            for(var i = 0 ; i < people.length ; i++){
                total += parseInt(people[i].countNum);
                peopleData.push({
                    value:people[i].countNum,
                    name:people[i].info + ':' + people[i].countNum + "人",
                    viewName: people[i].info
                });
                peopleTips.push({
                    name: people[i].info + ':' + people[i].countNum + "人"
                });
            }
            $("#hitTotal").html(total+"人");
            var option;
            option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    // x : 'right',
                    y : 'center',
                    right:'10%',
                    data:peopleTips,
                    orient:'vertical',
                    align:'left',
                    color:['#75b3c2','#d0b073','#d47676','#85b6a3','#a384d2']
                },
                toolbox: {
                    show : true,
                },
                calculable : true,
                series : [
                    {
                        // name:'面积模式',
                        type:'pie',
                        radius : [30, 110],
                        center : ['35%', '50%'],
                        roseType : 'area',
                        color:['#75b3c2','#d0b073','#d47676','#85b6a3','#a384d2'],
                        label: {
                            formatter: function (data) {
                                return data.data.viewName;
                            }
                        },
                        data:peopleData
                    }
                ]
            };
            return option;
        }
    }
};

/**
 * 初始化监管态势列表
 */
Monitor.initUsers = function () {
    var that = this;
    that.initChart({
        url: '/monitor/activity',
        type: 'barWithLine',
        id: 4,
        chartId: 'activity',
        year: year,
        month:$("#month").val()
    });
    that.initChart({
        url: '/monitor/people',
        type: 'pie',
        id: 4,
        chartId: 'distribution'
    });
    that.initOrganize({
        url: '/monitor/organize',
        id: "",
        chartId: 'organize'
    });
    that.initChart({
        url: '/monitor/area',
        type:'bar',
        id: "",
        chartId: 'area'
    });
    that.initChart({
        url: '/monitor/analysis',
        type:'analysis',
        id: "",
        chartId: 'transformationAnalysis'
    });
    that.initChart({
        url: '/monitor/analysis',
        type:'transformation',
        id: "",
        chartId: 'transformation'
    })
    that.initChart({
        url: '/monitor/hit',
        type:'hit',
        id: "",
        chartId: 'hit',
        year: $("#hitYear").html(),
        month:$("#hitMonth").val()
    })
};


/**
 * 检测图表是否存在
 */
Monitor.checkChart = function (id) {
    if (this.myCharts[id] != null && this.myCharts[id] != "" && this.myCharts[id] != undefined) {
        this.myCharts[id].dispose();
    }
};

/**
 * 时间选择
 */
Monitor.selectTime = function (dom,month) {
    this.checkChart(dom.data('id'));
    this.initChart({
        url: dom.data('url'),
        type: dom.data('type'),
        id: 4,
        chartId: dom.data('id'),
        year: dom.html(),
        month:month.val()
    })
};

function mGetDate(year, month){
    var d = new Date(year, month, 0);
    return d.getDate();
}

/**
 * 初始化图表
 */
Monitor.initChart = function (obj) {
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
    }else if (obj.name) {
        ajax.set('name', obj.name);
    }
    ajax.start('get');
};


/**
 * 初始化邪教组织分布
 */
Monitor.initOrganize = function(obj){
    $('#' + obj.chartId).html('');
    var ajax = new $ax(Feng.ctxPath + obj.url, function (data) {
        var totalOrganize = data.totalOrganize;
        var ul = '';
       ul += '<ul class="clearfix">';
       var contentWidth = "";
       var percent = "";
       var totalSum = 0;
        for (var i = 0, len = totalOrganize.length; i < len; i++) {
            totalSum += parseInt(totalOrganize[i].countNum);
        }
        $("#totalOrganize").html(totalSum + "人");
        for (var j = 0, len = totalOrganize.length; j < len; j++) {
            percent = totalOrganize[j].countNum/totalSum;
            contentWidth = 360*percent;
            percent = Number(percent*100).toFixed(1)+"%";
            ul += '<li>'
                + '<div class="border"><span id="percent">'+percent+'</span><div class="content" style="width:'+contentWidth+"px"+'"></div></div>'
                + '<div class="detail">'+totalOrganize[j].type+":"+totalOrganize[j].countNum+"人"+'</div>'
                + '</li>';
        }
        ul += '</ul>';

        $('#' + obj.chartId).append(ul);
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    // ajax.set("userId", obj.id);
    ajax.start('get');
}


$(function () {
    var d=new Date();
    var m = d.getMonth() + 1;
    if(m < 10){
        m = "0"+m;
    }
  $("#hitMonth").val(m);
    $("#month").val(m);
    Monitor.initUsers();
});
