/**
 * 生活常驻管理初始化
 */
var UserLife = {
    id: "personLiable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    userInfoId:"",
    keyIsattentionObj:{},
    myCharts: {},
    chartsType: {
        graph: function (data) {
            if(data.length != 0){
                var option;
                var links = [];
                var membersData = [];
                for (var i = 0, len = data.length; i < len; i++) {
                    if (i !== 0) {
                        links.push(
                            {
                                source: data[0].peopleInfoMemberName,
                                target: data[i].peopleInfoMemberName
                            }
                        );
                        membersData.push(
                            {
                                name: data[i].peopleInfoMemberName,
                                relation: data[i].peopleInfoMemberRelation,
                                symbolSize: 70,
                                itemStyle: {
                                    color: '#DEB46A'
                                }
                            }
                        )
                    }else {
                        membersData.push(
                            {
                                name: data[i].peopleInfoMemberName,
                                relation: data[i].peopleInfoMemberRelation,
                                itemStyle: {
                                    color: '#66AEC2'
                                }
                            }
                        );
                    }
                }
                option = {
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
                        {
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 85,
                            roam: false,
                            label: {
                                normal: {
                                    show:true,
                                    formatter:  function (data) {
                                        return '{relation|' + data.data.relation + '} {name|\n' + data.data.name + '}';
                                    },
                                    rich: {
                                        relation: {
                                            color: '#ffffff',
                                            fontSize: 15,
                                            fontFamily: 'Microsoft YaHei',
                                            fontWeight: 'normal',
                                            shadowColor: '#000',
                                            align: 'center',
                                            padding: [5, 0, 5, 0]
                                        },
                                        name: {
                                            color: '#ffffff',
                                            fontSize: 16,
                                            fontFamily: 'Microsoft YaHei',
                                            fontWeight: 'bold',
                                            shadowColor: '#000',
                                            align: 'center',
                                        }
                                    }
                                }
                            },
                            edgeSymbolSize: [20, 50],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            data: membersData,
                            links: links,
                            animation: true,
                            lineStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {offset: 0, color: '#EBDBBA'},
                                        {offset: 1, color: '#E8E8E6'}
                                    ], false),
                                    opacity: 1,
                                    width: 2,
                                    curveness: 0
                                }
                            },
                            force: {
                                repulsion: 1000,
                                initLayout: 'circular',
                                edgeLength: 80
                            }
                        }
                    ]
                };
                return option;
            }

        },
        radar: function (data) {
            if(data.length != 0){
                var option;
                var name = [ "受打击处理指数","帮教情况指数","不良行为指数","转化情况指数","潜在危险指数"];
                var value = [data[0].risk_sdj_RSR,data[0].risk_bj_index,data[0].risk_rcxw,data[0].risk_zhqk_RSR,data[0].risk_qzwx];
                $("#detailIndex").html(data[0].risk_index);
                option = {
                    tooltip: {},
                    radar: {
                        // shape: 'circle',
                        lineStyle:{
                            borderColor:"red"
                        },
                        splitLine: {
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#cdeae8'],
                            }
                        },
                        splitArea:{
                            areaStyle:{
                                color:'#fff'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#cdeae8'
                            }
                        },
                        name: {
                            color:"#333",
                        },
                        indicator: [
                            { name: '受打击处理指数',max:65},
                            { name: '帮教情况指数',max:160},
                            { name: '日常行为指数',max:300},
                            { name: '转化情况指数',max:380},
                            { name: '潜在危险指数',max:380},

                        ]
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        symbol:'circle',
                        symbolSize:'0',
                        tooltip: {
                            trigger: 'item'
                        },
                        lineStyle:{
                            color:"#82a2dd",
                            type:'solid',
                            width:'2'
                        },
                        areaStyle:{
                            color:'#d2dff2'
                        },
                        /*itemStyle: {
                         normal: {areaStyle: {type: 'default',color:'82a2dd'},
                         },
                         // borderColor:'green'
                         },*/
                        data : [
                            {
                                value : value,
                                name : ''
                            }

                        ]
                    }]
                };
                return option;
            }

        },
        barWithLine: function (data) {
            var option;
            var timeData = [];
            var gasData = [];
            var waterData = [];
            var elcData = [];
            for (var i = 0, len = data.length; i < len; i++) {
                timeData.push((i + 1+'月').toString());
                gasData.push(parseInt(data[i].userLifeGas));
                waterData.push(parseInt(data[i].userLifeWater));
                elcData.push(parseInt(data[i].userLifeElectric));
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'cross'}
                },
                legend: {
                    data: ['用气量','用水量','用电量'],
                    bottom: 10
                },
                grid: {
                    right: '15%'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: timeData,
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
                        name: '用气-方',
                        max: 250,
                        min: 0,
                        interval: 50,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#87C6D7'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#CFCFD1',
                                type: 'dashed'
                            }
                        }
                    },
                    {
                        type: 'value',
                        name: '用水-吨',
                        max: 250,
                        min: 0,
                        interval: 50,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#D5A5CB'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    {
                        type: 'value',
                        name: '用电-度',
                        max: 250,
                        min: 0,
                        interval: 50,
                        offset: 50,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#8EAAD9'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name:'用气量',
                        type:'bar',
                        barWidth: 10,
                        itemStyle: {
                            color: '#64AFC2'
                        },
                        data:gasData
                    },
                    {
                        name:'用水量',
                        type:'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            opacity: 0
                        },
                        lineStyle: {
                            color: '#D5A5CB'
                        },
                        data:waterData
                    },
                    {
                        name:'用电量',
                        type:'line',
                        yAxisIndex: 2,
                        itemStyle: {
                            opacity: 0
                        },
                        lineStyle: {
                            color: '#8EAAD9'
                        },
                        data:elcData
                    }
                ]
            };
            return option;
        },
        links: function (data, name) {
            var option;
            var links = [];
            var depart = [];
            var departData = [
                {
                    "user": name
                }
            ];
            data = departData.concat(data);
            for (var i = 0, len = data.length; i < len; i++) {
                if (i !== 0) {
                    if (data[i].userDataTypeAll) {
                        depart.push(
                            {
                                name: data[i].userDataTypeAll,
                                symbolSize: [34, 24],
                                symbol: 'image://' + Feng.ctxPath + '/static/img/depart_unselcted.png',
                                itemStyle: {
                                    color: '#DEB46A'
                                },
                                label: {
                                    show: true,
                                    position: 'bottom',
                                    color: '#B3B3B3'
                                }
                            }
                        )
                    }else {
                        depart.push(
                            {
                                name: data[i].userDataType,
                                symbolSize: [34, 24],
                                symbol: 'image://' + Feng.ctxPath + '/static/img/depart_selcted.png',
                                itemStyle: {
                                    color: '#DEB46A'
                                },
                                label: {
                                    show: true,
                                    position: 'bottom',
                                    color: '#64AFC4'
                                }
                            }
                        );
                        links.push(
                            {
                                source: depart[0].name,
                                target: data[i].userDataType
                            }
                        );
                    }
                }else {
                    depart.push(
                        {
                            name: name,
                            symbol: 'image://' + Feng.ctxPath + '/static/img/people.png',
                            itemStyle: {
                                color: '#66AEC2'
                            },
                            label: {
                                show: true,
                                position: 'bottom',
                                color: '#333333'
                            }
                        }
                    );
                }
            }
            option = {
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'force',
                        symbolSize: [50, 46],
                        roam: false,
                        edgeSymbolSize: [2, 10],
                        edgeLabel: {
                            normal: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        data: depart,
                        links: links,
                        animation: true,
                        lineStyle: {
                            normal: {
                                color: '#66AEC2',
                                opacity: 1,
                                width: 1,
                                type: 'dotted',
                                curveness: 0
                            }
                        },
                        force: {
                            repulsion: 100,
                            initLayout: 'circular',
                            edgeLength: 100
                        }
                    }
                ]
            };
            return option;
        },
        map: function (data) {
            if(data.length != 0){
                var option;
                var lines = [];
                var res = [];
                var geoCoordMap = {};
                function convertCity(arr) {
                    for (var i = 0, len = arr.length; i < len; i++) {
                        if (arr[i].carTravel && arr[i].carTravel.length > 0) {
                            lines.push([
                                {
                                    coord: [
                                        arr[i].carTravel[0].latitude, arr[i].carTravel[0].longitude
                                    ]
                                },
                                {
                                    coord: [
                                        arr[i].carTravel[1].latitude, arr[i].carTravel[1].longitude
                                    ]
                                }
                            ]);
                            convertCity(arr[i].carTravel);
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
                convertCity(data.carTravelTotal);
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
            }

        }
    }
};

/**
 * 初始化重点人员列表
 */
UserLife.initUsers = function (name) {
    var that = this;
    var ul = $('#users');
    var ajax = new $ax(Feng.ctxPath + "/userLife/findUserWithLabel", function (data) {
        var list = '';
        var users = data.page.records;
        if (users.length !== 0) {
            UserLife.initUsersCard(users);
            UserLife.usersPage(data.page.total);
            for (var i = 0, len = users.length; i < len; i++) {

                if (i === 0) {
                    UserLife.userInfoId = users[i].userInfoId;
                    if(users[i].userInfoIsattention == "undefined"){
                        users[i].userInfoIsattention = "";
                    }
                    that.initChart({
                        url: '/peopleInfoMember/findPeopleRRelation',
                        type: 'graph',
                        id: users[i].userInfoId,
                        chartId: 'relations',
                        members: [
                            {
                                peopleInfoMemberRelation: '户主',
                                peopleInfoMemberName: users[i].userInfoName
                            }
                        ]
                    });
                    that.initChart({
                        url: '/userLife/findRiskByUser',
                        type: 'radar',
                        id: users[i].userInfoId,
                        chartId: 'risk',
                    });
                    that.initChart({
                        url: '/userLife/findUserLife',
                        type: 'barWithLine',
                        id: users[i].userInfoId,
                        chartId: 'address',
                       // time: $('#addressTime').html()
                        time:year
                    });
                  /*  that.initChart({
                        url: '/userLife/findDepartOfUser',
                        type: 'links',
                        //id: users[i].userInfoId
                        name: users[i].userInfoName,
                        chartId: 'data'
                    });*/
                    that.initChart({
                        url: '/userLife/findTravelRoute',
                        type: 'map',
                        id: users[i].userInfoId,
                        chartId: 'active'
                    });
                    that.initTrail({
                        url: '/userLife/findTimeAxis',
                        id: users[i].userInfoId,
                        chartId: 'timeLine'
                    });
                    that.keyIsattention({
                        url: '/userLife/updateIsattentionByUser',
                        id: users[i].userInfoId,
                        userInfoIsattention:users[i].userInfoIsattention
                    });
                    that.initTable({
                        url: '/userHereticsDuty/list',
                        id: users[i].userInfoId,
                        chartId: 'personLiableTable',
                        type:'init'
                      //  userInfoIsattention:users[i].userInfoIsattention
                    });
                }
               // list += that.initUsersCard(users[i]);
            }
          //  ul.append(list);
            $(".pagination").show();

        }else {
            ul.html('<h4>没有查询到该人</h4>');
            $(".pagination").hide();
        }
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    if (name) {
        ajax.set('userName', name);
    }
    ajax.start();
};

/**
 * 创建重点人员卡片
 */
UserLife.initUsersCard = function (users) {
     $("#users").html("");
    var li = "";
    for(var i = 0; i < users.length; i++){
        var user = users[i];

        li += '<li class="usersCard" data-id="' + user.userInfoId + '" data-name="' + user.userInfoName + '" data-isattention="'+user.userInfoIsattention+'" onclick="UserLife.selectUsers($(this))">'
            + '<div class="row">'
            + '<div class="col-sm-4">姓名：' + user.userInfoName + '</div>'
            + '<div class="col-sm-4">性别：' + user.userInfoSex + '</div>';
        if(user.userInfoAge){
            li += '<div class="col-sm-4">年龄：' + user.userInfoAge + '</div>';
        }
        else{
            li += '<div class="col-sm-4">年龄：无</div>';
        }
        li +='<div class="col-sm-12" style="margin-top: 10px">身份证：' + user.userInfoCard + '</div>'
            + '<div class="col-sm-12" style="margin-top: 10px">地址：' + user.userInfoPresentResident + '</div>'
            + '</div>'
            + '<div class="row"><ul class="tag-list clearfix" style="height:115px;">';

        if(user.userInfoIsattention == "是"){
            li +='<li>重点关注对象</li>';
        }
        if (user.warningTitleName) {
            var labels = user.warningTitleName.split(',');
            for (var j = 0, len = labels.length; j < len; j++) {
                li += '<li>' + labels[j].split('@')[0] + '</li>';
            }
            li += '</ul>';
        }
        if(user.userInfoIsattention == "否" && !user.warningTitleName){
            li += '<span>暂无标签</span>';
        }
        li += '</div>'
            + '</li>';
    }
    $("#users").append(li);
    $("#users").find('.usersCard').eq(0).addClass('active');
    // return li;
};
UserLife.usersPage = function(totalCount){
    $('.pagination').pagination({
        totalData: totalCount,
        showData: 7,
        count: 1,
        keepShowPN:true,
        coping:true,
        callback: function (api){
            var curPage = api.getCurrent();
            $.ajax({
                url: Feng.ctxPath + "/userLife/findUserWithLabel",
                type: 'post',
                dataType: 'json',
                data: {curPage: curPage},
                success: function(result){
                    var rows = result.page.records;
                    UserLife.initUsersCard(result.page.records);
                }
            });
        }
    });
}
/**
 * 选择重点人员
 */
UserLife.selectUsers = function (dom) {
    var that = this;
    var id = dom.data('id');
    var name = dom.data('name').toString();
    var isattention = dom.data('isattention').toString();
    if(isattention == "undefined"){
        isattention = "";
    }
    UserLife.userInfoId = id;
    dom.addClass('active').siblings('li').removeClass('active');
    that.initChart({
        url: '/peopleInfoMember/findPeopleRRelation',
        type: 'graph',
        id: id,
        chartId: 'relations',
        members: [
            {
                peopleInfoMemberRelation: '户主',
                peopleInfoMemberName: name
            }
        ]
    });
    that.initChart({
        url: '/userLife/findRiskByUser',
        type: 'radar',
        id: id,
        chartId: 'risk',
        // time: $('#addressTime').html()
    });
    that.initChart({
        url: '/userLife/findUserLife',
        type: 'barWithLine',
        id: id,
        chartId: 'address',
         time: $('#addressTime').html()
       // time:dom.html()
    });
   /* that.initChart({
        url: '/userLife/findDepartOfUser',
        type: 'links',
        //id: id,
        name: name,
        chartId: 'data'
    });*/
    that.initChart({
        url: '/userLife/findTravelRoute',
        type: 'map',
        id: id,
        chartId: 'active'
    });
    that.initTrail({
        url: '/userLife/findTimeAxis',
        id: id,
        chartId: 'timeLine'
    })
    that.keyIsattention({
        url: '/userLife/updateIsattentionByUser',
        id:id,
        userInfoIsattention:isattention
    });
    that.initTable({
        url: '/userHereticsDuty/list',
        id:id,
        chartId:'personLiableTable',
        type:'select'
    });


};

/**
 * 查询重点人员列表
 */
UserLife.search = function () {
    $('#users').html('');
    var name = $("#userInfoName").val();
    this.initUsers(name);
};

/**
 * 初始化图表
 */
UserLife.initChart = function (obj) {
    var that = this;
    this.myCharts[obj.chartId] = echarts.init(document.getElementById(obj.chartId));
    var ajax = new $ax(Feng.ctxPath + obj.url, function (data) {
        // if(data.length != 0){
            var chartData;
            switch (obj.type) {
                case 'graph':
                    chartData = obj.members.concat(data);
                    break;
                default:
                    if(data.length<12){
                        var num =12-data.length;
                        for(var i=0;i<num;i++){
                            var mapi ={
                                userLifeElectric:"0",
                                userLifeGas:"0",
                                userLifeWater:"0"
                            }
                            data.push(mapi);
                        }
                    }
                    chartData = data;
                    break;
            }
            that.myCharts[obj.chartId].setOption(that.chartsType[obj.type](chartData, obj.name));
            window.onresize = function () {
                for (var k in that.myCharts) {
                    that.myCharts[k].resize();
                }
            };
        // }
    //
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    if (obj.time) {
        ajax.set({
            userId: obj.id,
            time: obj.time
        });
    }else if (obj.name) {
        ajax.set('name', obj.name);
    }else {
        ajax.set('userId', obj.id);
    }
    ajax.start();
};

/**
 * 检测图表是否存在
 */
UserLife.checkChart = function (id) {
    if (this.myCharts[id] != null && this.myCharts[id] != "" && this.myCharts[id] != undefined) {
        this.myCharts[id].dispose();
    }
};

/**
 * 时间选择
 */
UserLife.selectTime = function (dom) {
    this.checkChart(dom.data('id'));
    this.initChart({
        url: dom.data('url'),
        type: dom.data('type'),
        //id: 4,
        id:UserLife.userInfoId,
        chartId: dom.data('id'),
        time: dom.html()
    })
};

/**
 * 初始化涉邪轨迹分析
 */
UserLife.initTrail = function (obj) {
    $('#' + obj.chartId).html('');
    var ajax = new $ax(Feng.ctxPath + obj.url, function (data) {
        var ul = '';
        ul += '<ul class="clearfix" style="width: ' + 190 * data.length + 'px">';
        for (var i = 0, len = data.length; i < len; i++) {
            ul += '<li>'
                +'<p>'+data[i].date+'</p>'
                + '<div class="dot"></div>'
                + '<div class="line"></div>'
                + '<div class="dashed"></div>'
                +'<h4>'+data[i].value+'</h4>'
                + '</li>';
        }
        ul += '</ul>';
        $('#' + obj.chartId).append(ul);
    }, function (data) {
        Feng.error("查询数据失败!");
    });
    ajax.set("userId", obj.id);
    ajax.start();
};


/**
 * 初始化重点关注
 */
UserLife.keyIsattention = function(obj){
    var userInfo = {};
    // if(isattention == null || isattention == undefined || isattention ==""){
    //     isattention = "否"
    // }
    if(obj.userInfoIsattention == '是'){
        $("#keyFollow").html('已重点关注');
        $("#keyFollow").addClass('active');
    }
    else{
        $("#keyFollow").html('重点关注');
        $("#keyFollow").removeClass('active');
    }
    userInfo = {userInfoId:obj.id,userInfoIsattention:obj.userInfoIsattention};
    $.ajax({
        type: 'post',
        url: Feng.ctxPath + obj.url,
        data: JSON.stringify(userInfo),
        async:false,//同步加载
        contentType:'application/json',
        success: function(data){
        },
        error: function(){
            //请求失败处理函数
            Feng.error("查询数据失败!");
        }
    });
}


/**
 * 初始化五保一责任人表格的列
 */
UserLife.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id',field: 'userHereticsDutyId', visible: false, radio: false, checkbox: false},
        {title: '职务', field: 'userHereticsDutyJob', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'userHereticsDutyName', visible: true, align: 'center', valign: 'middle'},
        {title: '联系电话', field: 'userHereticsDutyTel', visible: true, align: 'center', valign: 'middle'},
        {title: '责任单位', field: 'userHereticsDutyUnit', visible: true, align: 'center', valign: 'middle'},
    ];
};

UserLife.initTable = function(obj){
    if(obj.type == 'init'){
        var defaultColunms = UserLife.initColumn();
        var table = new BSTable(UserLife.id, obj.url, defaultColunms);
        table.setPaginationType("client");
        table.setQueryParams({userHereticsDutyType: 2,userId: obj.id});
        table.setPageSize('5');
        UserLife.table = table.init('get');
    }
   else{
        var queryData = {};
        queryData['userId'] =  obj.id;
        queryData['userHereticsDutyType'] =2;
        UserLife.table.refresh({query: queryData});
    }

};
$(function () {
    UserLife.initUsers();

    //判断是否重点关注
    $("#keyFollow").click(function(){
        $(this).toggleClass('active');
        var userInfoIsattention = "";
        if($(this).hasClass('active')) {
            $(this).html('已重点关注');
            userInfoIsattention = '是';
        }
        if(!$(this).hasClass('active')){
            userInfoIsattention = '否';
            $(this).html('重点关注');
        }
        var obj = {
                url: '/userLife/updateIsattentionByUser',
                id:$("#users .active").data('id'),
                userInfoIsattention:userInfoIsattention
            };
        UserLife.keyIsattention(obj);


    });
});
