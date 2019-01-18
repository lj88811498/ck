var largeScreen = {
    id:'largeScreen',
    platformData:"",
    myCharts: {},
    chartsType:{
        line: function (data,name1,chartId) {
            var option;
            var entity = data.entity;
            var timeDataX = [],dataObj = [],countNumMax;
            var tipName = "";
            if(chartId == 'userHeretics'){
                tipName = "帮教信息";
            }
            else{
                tipName = "案件信息";
            }
            for(var i = 0; i < entity.length; i++) {
                timeDataX.push( entity[i].day);

                dataObj.push( entity[i].countNum);
            }
           // dataObj[1] = 4;
           countNumMax  = Math.max.apply(null, dataObj);
           option = {
                tooltip: {
                    trigger: 'axis',
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
                                color: '#45a0bd'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#397992',
                                type: 'dashed'
                            }
                        },
                        axisLabel:{
                            color:'#70a0c5'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: countNumMax + 3,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#45a0bd'
                            }
                        },
                        axisLabel:{
                            color:'#70a0c5'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#397992',
                                type: 'dashed'
                            }
                        }

                    }
                ],
                series: [
                    {
                        name:tipName,
                        type:'line',
                        itemStyle: {
                            opacity: 0,
                            color: '#ffae21',
                        },
                        markPoint: {
                            symbol:'pin',
                            data: [
                                {type: 'max', name: '最大值'},
                            ]
                        },
                        lineStyle: {
                            color: '#ffae21',
                            width:5,
                            shadowBlur:10,
                            shadowColor: "rgba(0, 0, 0, 0)",
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        },
                        areaStyle:{
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255,174,33,0.5)' // 100% 处的颜色
                                },{
                                    offset: 0.6, color: 'rgba(255,174,33,0.2)' // 100% 处的颜色
                                },{
                                    offset: 1, color: 'rgba(255,174,33,0)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        },
                        data:dataObj
                    },
                ]
            };
            return option;
        }
    }
};


/**
 * 初始化图表
 */
largeScreen.initChart = function (obj) {
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
        that.myCharts[obj.chartId].setOption(that.chartsType[obj.type](chartData, obj.name,obj.chartId));
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
    ajax.start();
};

/**
 * 初始化数据趋势
 */
largeScreen.initCharts = function () {
    var that = this;
    that.initChart({
        url: '/largeScreen/userHeretics',
        type: 'line',
        id: "",
        chartId: 'userHeretics',
    });

};
/**
 * tab切换
 */
largeScreen.tabClick = function (index) {
    that  = this;
    if (index == 1) {
        $('#userHeretics').show();
        $('#caseInfo').hide();
        $('.man-label-btn1').addClass('active');
        $('.man-label-btn2').removeClass('active');
        that.initChart({
            url: '/largeScreen/userHeretics',
            type: 'line',
            id: "",
            chartId: 'userHeretics',
        });

    }else {
        $('#userHeretics').hide();
        $('#caseInfo').show();
        $('.man-label-btn2').addClass('active');
        $('.man-label-btn1').removeClass('active');
        that.initChart({
            url: '/largeScreen/caseInfo',
            type: 'line',
            id: "",
            chartId: 'caseInfo',
        });
    }
}
/**
 * 初始化地图
 */
largeScreen.initMap = function () {

    var ajax = new $ax(Feng.ctxPath + '/largeScreen/map', function (data) {
        largeScreen.initMapOption(data);
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    ajax.start();
}
largeScreen.totalCount = function (opt) {

    var totalCount = 0;
    if(opt.evilCount) {
        totalCount += parseInt(opt.evilCount) * 0.3;
    }if(opt.gridmanCount){
        totalCount += parseInt(opt.gridmanCount) * 0.2;
    }if(opt.caseCount){
        totalCount += parseInt(opt.caseCount) * 0.5;
    }
    return parseInt(totalCount);
}
largeScreen.initMapOption = function (data) {
    var uploadedDataURL = "/static/modular/fx/largeScreen/2018052105.json";
    var myChart = echarts.init(document.getElementById('main'));
    var resData = data.entity, areaData = [], geoCoordMap = {},areaDataArray = [], maxNum;

        for(var i = 0; i < resData.length; i++) {
            var totalCount = largeScreen.totalCount(resData[i]);
            areaData.push({name:resData[i].region, value:totalCount});
            areaDataArray.push(totalCount);
            geoCoordMap[resData[i].region] = [resData[i].longitude,resData[i].latitude];
        }
    maxNum = Math.max.apply(null,areaDataArray) + 4;

    $.get(uploadedDataURL, function(geoJson) {


        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 300,
            minSize4Pin = 40;
        var convertData = function(areaData) {
            var res = [];
            for (var i = 0; i < areaData.length; i++) {
                var geoCoord = geoCoordMap[areaData[i].name];
                if (geoCoord) {
                    res.push({
                        name: areaData[i].name,
                        value: geoCoord.concat(areaData[i].value)
                    });
                }
            }
            return res;
        };

        echarts.registerMap('PX', geoJson);
        myChart.setOption(option = {

            tooltip: {
                trigger: 'item',
                formatter: function (item) {
                    var html = "";

                    for(var i = 0; i < resData.length; i++) {
                        if(item.name == resData[i].region) {
                            var ttCount = largeScreen.totalCount(resData[i]);
                            html += "<span style='font-size: 16px;color:#05C3F9;font-weight: 600'>"+item.name+": ("+ttCount+")</span><br/>";
                            if(resData[i].evilCount){
                                html += "<span> 邪教人数 : "+resData[i].evilCount+"</span><br/>"
                            }
                            if(resData[i].gridmanCount){
                                html += "<span> 网格人员数 : "+resData[i].gridmanCount+"</span><br/>"
                            }
                            if(resData[i].caseCount){
                                html += "<span> 案件数 : "+resData[i].caseCount+"</span><br/>"
                            }
                            if(resData[i].cult){
                                var objKeys=Object.keys(resData[i].cult);
                                for(var key in resData[i].cult) {
                                    if(objKeys[0] == key){
                                        html += "<span>其中 "+key+" </span>"+"<span>"+resData[i].cult[key]+"</span>";
                                    }else {
                                        html += "<span> "+key+" </span>"+"<span>"+resData[i].cult[key]+"</span>,";
                                    }

                                }
                            }
                            return html;
                        }
                    }
                }
            },
            visualMap: {
                show:true,
                min: 0,
                max: maxNum,
                text:['高','低'],
                realtime: false,
                calculable: true,
                seriesIndex: [0],
                color: ['#cc1818','#ce4e50','#de9496','#d8b0b2', '#fff'],
                // color: ['#e0ffff', '#006edd'],
                textStyle:{
                	color:"#fff"
                },
                left:30,
                bottom:30
            },
            geo: {
                show: true,
                map: 'PX',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#f39800',
                    }
                }
            },
            series: [
                {
                    name: '邪教人员区域热力图',
                    type: 'map',
                    map: 'PX', // 自定义扩展图表类型
                    itemStyle:{
                        borderColor:'#f4f0f0'
                        // borderColor: 'rgba(147, 235, 248, 1)',
                        // borderWidth: 1,
                    },

                    emphasis:{
                        label:{
                            show:false,
                            color:"#f39800"
                        },
                        itemStyle:{
                            borderWidth: 2,
                            areaColor:"#f39800"
                        }
                    },
                    data:areaData
                },
                {
                       name: '总量气泡',
                       type: 'scatter',
                       coordinateSystem: 'geo',
                       data: convertData(areaData),
                       symbolSize: function(val) {
                           return val[2] * 1.5;
                       },
                       label: {
                           normal: {
                               formatter: '{b}',
                               position: 'right',
                               show: true
                           },
                           emphasis: {
                               show: true
                           }
                       },
                       itemStyle: {
                           normal: {
                               color: '#05C3F9'
                           }
                       }
                   },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: function(val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                            b = maxSize4Pin - a * max;
                        return (a * val[2] + b ) * 1.2;
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 10,
                            },
                            formatter:function (item) {
                                return item.value[2]
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F62157', //标志颜色
                            borderWitdh:2,
                            borderColor:"#fff"
                        }
                    },
                    zlevel: 6,
                    data: convertData(areaData),
                },
                 {
                    name: 'Top 5',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(areaData.sort(function(a, b) {
                        return b.value - a.value;
                    })),
                    symbolSize: function(val) {
                        return val[2] * 1.5;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                }
            ]
        });

        //toolTip自动轮播
        var count = 0;
        var timeTicket = null;
        var dataLength = option.series[0].data.length;
        timeTicket && clearInterval(timeTicket);
        timeTicket = setInterval(function() {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: (count) % dataLength
            });
            count++;
        }, 3000);

        myChart.on('mouseover', function(params) {
            clearInterval(timeTicket);
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0
            });
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: params.dataIndex
            });
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: params.dataIndex,
            });
        });
        myChart.on('mouseout', function(params) {
            timeTicket && clearInterval(timeTicket);
            timeTicket = setInterval(function() {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                });
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: (count) % dataLength
                });
                count++;
            }, 3000);
        });
    });
}
/**
 * 初始化邪教数据
 */
largeScreen.initUsers = function () {
  var userCount = $('#userCount');
  var newUserThisYear = $('#newUserThisYear');
  var gridmanCount = $('#gridmanCount');
  var newGridmanThisYear = $('#newGridmanThisYear');
  var caseCount= $('#caseCount');
  var newCaseThisMonth = $('#newCaseThisMonth');
  var userHereticsRecordCount = $('#userHereticsRecordCount');
  var newCaseThisWeek =$('#newCaseThisWeek');
  new $ax(Feng.ctxPath + "/largeScreen/overView",function (data) {
      userCount.html(data.entity.userCount);
      newUserThisYear.html(data.entity.newUserThisYear);
      gridmanCount.html(data.entity.gridmanCount);
      newGridmanThisYear.html(data.entity.newGridmanThisYear);
      caseCount.html(data.entity.caseCount);
      newCaseThisMonth.html(data.entity.newCaseThisMonth);
      userHereticsRecordCount.html(data.entity.userHereticsRecordCount);
      newCaseThisWeek.html(data.entity.newCaseThisWeek);
  },function () {
      Feng.error("查询数据失败!")
  }).start();
};
//提取中文字符
largeScreen.GetChinese = function(strValue) {
    if(strValue!= null && strValue!= ""){
        var reg = /[\u4e00-\u9fa5]/g;
        return strValue.match(reg).join("");
    }
    else
        return "";
}
/*滚动列表*/
largeScreen.initActionCard = function () {
    var ajax = new $ax(Feng.ctxPath + "/gridMonitor/warningList?size=10000", function (data) {
        var html = "";
        var resData = data.page.records;
        for(var i = 0; i < resData.length; i++) {
            if(resData[i].subjectGrade ){
                resData[i].subjectGrade  = resData[i].subjectGrade ;
            }
            else{
                resData[i].subjectGrade  = '无';
            }
            if(resData[i].userInfoAge){
                resData[i].userInfoAge = resData[i].userInfoAge;
            }
            else{
                resData[i].userInfoAge = '无'
            }
            html += "<li class=\"manCard\">\n" +
                "                                <div class=\"manCard-box\">\n" +
                "                                    <div class=\"manCard-left\">\n" +
                "                                        <div class=\"text-center manCard-left-word\"><p>风险度</p></div>\n" +
                "                                        <div class=\"text-center manCard-left-num\"><p>" + resData[i].subjectGrade + "</p></div>\n" +
                "                                    </div>\n" +
                "                                    <div class=\"manCard-right\">\n" +
                "                                        <div class=\"base-content\">\n" +
                "                                            <span>" + resData[i].userInfoName + "</span>\n" +
                "                                            <span>" + resData[i].userInfoSex + "</span>\n" +
                "                                            <span >" + resData[i].userInfoAge + "岁</span>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"base-content\">\n" +
                "                                            <span >所属邪教组织：" + resData[i].involvingEvilType + "</span>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"base-content\">\n" +
                "                                            <span >身份证：" + resData[i].userInfoCard + "</span>\n" +
                "                                        </div>\n" +
                "                                        <div class=\"base-content\">\n" +
                "                                            <span >负责网格员：" + resData[i].gridmanName + "</span>\n" +
                "                                            <span >网格员电话：" + resData[i].gridmanTel + "</span>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                </div>\n"

                if(resData[i].warningTitleName){
                    html += "<div class=\"manCard-tag-list\"><ul>\n";

                    var tagList = resData[i].warningTitleName.split(',');
                    for(var j = 0; j < tagList.length; j++) {
                        tagList[j] =largeScreen.GetChinese(tagList[j]);
                        html += "<li>"+tagList[j]+"</li>"
                    }
                    html += "</ul></div>";
                }
               html += "</li>";


        }
        $('.manCard-wrap').html(html);

        //无缝滚动
        var bdWrapHeight = $('.manCard-wrap').height();
        $('.txtMarquee-top .bd ').css({'height':2.5*bdWrapHeight +"px"})

        var cloneHtml = $('.manCard-wrap').html();
        $('.manCard-wrap').append(cloneHtml);

        var index = 0, timePlay;
        function autoPlay() {
            index++;
            $('.txtMarquee-top .bd ').css({'top': -index + "px"})
            if(index == bdWrapHeight) {
                index = 0;
            }
        }
        timePlay = setInterval(autoPlay,50);

        $('.txtMarquee-top')[0].onmouseover=function() { clearInterval(timePlay) }
        $('.txtMarquee-top')[0].onmouseout=function() { timePlay = setInterval(autoPlay, 50); }


    }, function (data) {
        Feng.error("暂无数据!");
    });
    // ajax.set("curPage",curPage);
    ajax.start('get');
}

largeScreen.initLabel = function(){
    var ajax = new $ax(Feng.ctxPath + "/largeScreenLabel/getContent", function (data) {
        var entity = data.entity;
        var str = "";
        var LabelCon =  entity[0]["组织管理系统"];
        largeScreen.platformData = entity;
        $("#label-content").html();
        for(var i = 0; i < LabelCon.length ; i++){
            var num = parseInt(1)+parseInt(i);
            str += "<li><p>"+num+"</p><p>"+LabelCon[i]+"</p></li>";
        }
        $("#label-content").html(str);

    }, function (data) {
        Feng.error("暂无数据!");
    });
  //  ajax.set("type","组织管理系统");
    ajax.start();
};

/*平台管理轮播*/

var index1 = 0;
setInterval(function(){
    largeScreen.play();
},2000);
largeScreen.play = function(){
        $("#platformPlay li").eq(index1).addClass('active').siblings().removeClass('active');
        var type = $("#platformPlay li").eq(index1).html();
        // console.log(largeScreen.platformData);
            var entity = largeScreen.platformData ;
            var str = "";
            var LabelCon = [];
            $("#label-content").html();
            switch(type){
                case "组织管理系统":
                   LabelCon =  entity[0]["组织管理系统"];
                   break;
                case "邪教人员系统":
                    LabelCon =  entity[1]["邪教人员系统"];
                    break;
                case "防控管理系统":
                    LabelCon =  entity[2]["防控管理系统"];
                    break;
                case "数据分析系统":
                    LabelCon =  entity[3]["数据分析系统"];
                    break;
                case "应急处置系统":
                    LabelCon =  entity[4]["应急处置系统"];
                    break;
                case "涉网信息系统":
                    LabelCon =  entity[5]["涉网信息系统"];
                    break;
                case "宣传教育系统":
                    LabelCon =  entity[6]["宣传教育系统"];
                    break;
                case "帮教转化系统":
                    LabelCon =  entity[7]["帮教转化系统"];
                    break;
                default:
                    LabelCon =  entity[0]["组织管理系统"];
            }
            for(var i = 0; i < LabelCon.length ; i++){
                var num = parseInt(1)+parseInt(i);
                str += "<li><p>"+num+"</p><p>"+LabelCon[i]+"</p></li>";
            }
            $("#label-content").html(str);
      //  ajax.set("type",type);

        index1++;
        if(index1 == $("#platformPlay li").length){
            index1 = 0;
        }

}



$(function () {
    largeScreen.initLabel();
    largeScreen.initUsers();
    largeScreen.initCharts();
    largeScreen.initActionCard();
    largeScreen.initMap();
});
