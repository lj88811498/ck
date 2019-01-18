var data1,data2,data3,data4,data5,data6;

var myChart1 = echarts.init(document.getElementById('distribution'));
var myChart2 = echarts.init(document.getElementById('distribution1'));
var myChart3 = echarts.init(document.getElementById('work'));
var myChart4 = echarts.init(document.getElementById('education'));
var myChart5 = echarts.init(document.getElementById('org'));
var myChart6 = echarts.init(document.getElementById('policalStatus'));
var cultType;
function changeCultFa() {
    cultType = '法轮功';
    findAge (cultType);
    findSex(cultType);
    findOrg(cultType);
    findWork(cultType);
    findEdu(cultType);
    findPolicaStatus(cultType);
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //window.location.reload();
}
function changeCultMt() {
    cultType = '门徒会';
    findAge (cultType);
    findSex(cultType);
    findOrg(cultType);
    findWork(cultType);
    findEdu(cultType);
    findPolicaStatus(cultType);
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //window.location.reload();
}
function changeCultQn() {
    cultType = '全能神';
    findAge (cultType);
    findSex(cultType);
    findOrg(cultType);
    findWork(cultType);
    findEdu(cultType);
    findPolicaStatus(cultType);
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //window.location.reload();
}
function changeCultZg() {
    cultType = '中功';
    findAge (cultType);
    findSex(cultType);
    findOrg(cultType);
    findWork(cultType);
    findEdu(cultType);
    findPolicaStatus(cultType);
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //window.location.reload();
}
function changeCultXl() {
    cultType = '心灵法门';
    findAge (cultType);
    findSex(cultType);
    findOrg(cultType);
    findWork(cultType);
    findEdu(cultType);
    findPolicaStatus(cultType);
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //window.location.reload();
}


//年龄
function findAge (cultType) {
    $.post(Feng.ctxPath+"/userInfo/findAgeByCultType",{"cultType":cultType},function (data) {
        $("#totalPerson").html(data[4].sum)
        var ageData =[];
        var ageTips = [];
        for(var i= 0;i<data.length-1;i++){
            ageData.push({
                value:data[i].num,
                name:data[i].age+":"+data[i].num +"人",
                viewName:data[i].age
            })
            ageTips.push({
                name:data[i].age+":"+data[i].num +"人"
            })
        }
        var option = {
            title : {
                text: '年龄分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} ({d}%)"
            },
            legend: {
                // x : 'center',
                y : 'center',
                right:'10%',
                orient:'vertical',
                align:'left',
                data:ageTips
            },
            calculable : true,
            series : [
                {
                    name:'邪教人员年龄分布',
                    type:'pie',
                    radius : [30, 110],
                    center : ['30%', '50%'],
                    roseType : 'radius',
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:ageData
                },

            ]
        };
        myChart1.setOption(option);
    })
}

//性别
function findSex(cultType) {
    $.post(Feng.ctxPath+"/userInfo/findSexBycultType",{"cultType":cultType},function (data) {
        $("#totalPerson1").html(data[2].sum)
        var sexTips =[];
        var sexData =[];

        for(var i= 0;i<data.length-1;i++){
            sexTips.push({
                name:data[i].tips+":"+data[i].num+"人"
            })
            sexData.push({
                value:data[i].num,
                name:data[i].tips+":"+data[i].num+"人",
                viewName:data[i].tips
            })
        }
        var option1 = {
            title : {
                text: '人员性别分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b}({d}%)"
            },
            legend: {
                y : 'center',
                right:'10%',
                orient:'vertical',
                align:'left',
                data:sexTips
            },
            series : [
                {
                    name: '性别分布',
                    type: 'pie',
                    radius : '55%',
                    center: ['30%', '50%'],
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:sexData,
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
        myChart2.setOption(option1);
    })
}

//职业
function findWork(cultType) {
    $.post(Feng.ctxPath+"/userInfo/findWorkByCultType",{"cultType":cultType},function (data) {
        $("#totalPerson2").html(data[13].sum)
        var workData =[];
        var workTips = [];
        for(var i= 0;i<data.length-1;i++){
            workData.push({
                value:data[i].num,
                name:data[i].type +":"+data[i].num+"人",
                viewName:data[i].type
            })
            workTips.push({
                name: data[i].type + ':' + data[i].num + "人"
            });
        }

        var option3 = {
            title : {
                text: '人员职业分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                y : 'center',
                right:'10%',
                orient:'vertical',
                align:'left',
                data:workTips
            },
            series : [
                {
                    name: '职业分布',
                    type: 'pie',
                    radius : '55%',
                    center: ['30%', '50%'],
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:workData,
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
        myChart3.setOption(option3);
    })
}

//学历
function findEdu(cultType) {
    $.post(Feng.ctxPath+"/userInfo/findEduByCultType",{"cultType":cultType},function (data) {
        $("#totalPerson3").html(data[8].sum)

        var eduData =[];
        var eduTips =[];
        for(var i= 0;i<data.length-1;i++){
            eduData.push({
                value:data[i].num,
                name:data[i].tips+":"+data[i].num+"人",
                viewName:data[i].tips
            })
            eduTips.push({
                name:data[i].tips+":"+data[i].num+"人"
            })
        }
        var option4 = {
            title : {
                text: '学历分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                y : 'center',
                right:'10%',
                orient:'vertical',
                align:'left',
                data:eduTips
            },
            calculable : true,
            series : [
                {
                    name:'邪教人员学历分布',
                    type:'pie',
                    radius : [30, 110],
                    center : ['30%', '50%'],
                    roseType : 'radius',
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:eduData
                },
            ]
        };
        myChart4.setOption(option4);
    })
}


//曾担任职务
function findOrg(cultType) {
    $.post(Feng.ctxPath+"/userInfo/findOrgWorkByCultType",{"cultType":cultType},function (data) {
        $("#totalPerson4").html(data[12].sum)
        console.info(data)
        var orgData =[];
        var orgTips =[];
        for(var i= 0;i<data.length-1;i++){
            orgData.push({
                value:data[i].num,
                name:data[i].tips+":"+data[i].num+"人",
                viewName:data[i].tips
            })
            orgTips.push({
                name:data[i].tips+":"+data[i].num+"人"
            })
        }
        var option5 = {
            title : {
                text: '曾担任邪教组织职务 ',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                y : 'center',
                right:'7%',
                orient:'vertical',
                align:'left',
                data:orgTips
            },
            calculable : true,
            series : [
                {
                    name:'曾担任邪教组织职务',
                    type:'pie',
                    radius : [30, 110],
                    center : ['30%', '50%'],
                    roseType : 'radius',
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:orgData
                },
            ]
        };
        myChart5.setOption(option5);
    })
}

//政治面貌
function  findPolicaStatus(cultType) {
    $.post(Feng.ctxPath+"/userInfo/findPolicalStatusByCultType",{"cultType":cultType},function (data) {
        $("#totalPerson5").html(data[4].sum)
        var policalStatusData =[];
        var policalStatusTips = [];
        for(var i= 0;i<data.length-1;i++){
            policalStatusData.push({
                value:data[i].num,
                name:data[i].tips +":"+data[i].num+"人",
                viewName:data[i].tips
            })
            policalStatusTips.push({
                name: data[i].tips + ':' + data[i].num + "人"
            });
        }

        var option6 = {
            title : {
                text: '人员政治面貌分布',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                y : 'center',
                right:'10%',
                orient:'vertical',
                align:'left',
                data:policalStatusTips
            },
            series : [
                {
                    name: '政治面貌',
                    type: 'pie',
                    radius : '55%',
                    center: ['30%', '50%'],
                    label: {
                        formatter: function (data) {
                            return data.data.viewName;
                        }
                    },
                    data:policalStatusData,
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
        myChart6.setOption(option6);
    })
}



$(function () {
    findAge ("法轮功");
    findSex("法轮功");
    findOrg("法轮功");
    findWork("法轮功");
    findEdu("法轮功");
    findPolicaStatus("法轮功");
});
