/**
 * 网格员管理初始化
 */
var GridMonitor = {
    id: "GridmanTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    totalData:"",
    mapInfo:"",
    layerIndex: -1
};

GridMonitor.initWarning = function(){
    var ajax = new $ax(Feng.ctxPath + "/gridMonitor/warningList", function (data) {
        getList(data);
       getOrderClaimListPager(data.page.total)
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    // ajax.set("curPage",curPage);
    ajax.start('get');

}




GridMonitor.setData = function(data){
    var data_info = [];
    for(var i = 0; i < data.length; i++){
        data_info.push([data[i].streetLongitude,data[i].streetLatitude,data[i].userInfoName]);
    }
    // GridMonitor.panTo(data_info);
};




function getList(data){
    $(".warning-content").html("");
    var list = '';
    var li = "";
    var users = data.page.records;
    var user = "";
    var show = "none";
    for(var i = 0; i < users.length; i++){
        user = users[i];
        if(user.userInfoIsattention == "否"){
            show = "none";
        }
        else{
            show = "inline-block";
        }
        if(user.subjectGrade){
            user.subjectGrade = user.subjectGrade;
        }
        else{
            user.subjectGrade = '无';
        }
        if(user.userInfoAge){
            user.userInfoAge = user.userInfoAge;
        }
        else{
            user.userInfoAge = '无'
        }
        if(user.involvingEvilType){
            user.involvingEvilType = user.involvingEvilType;
        }
        else{
            user.involvingEvilType = '无'
        }
        if(user.gridmanName){
            user.gridmanName = user.gridmanName;
        }
        else{
            user.gridmanName = '无'
        }
        if(user.gridmanTel){
            user.gridmanTel = user.gridmanTel;
        }
        else{
            user.gridmanTel = '无'
        }
        li += '<li class="usersCard"  data-name="' + user.userInfoName + '" onclick="window.location.href = Feng.ctxPath + \'/gridMonitor/gridMonitorPushInfo/' + user.userInfoId + '\'">'
            + '<div class="row">' +
            '<div class="col-sm-12">'+
            '<div class="col-sm-2">' +
            '<p class="gridMonitorRiskTitle">风险度</p><p class="gridMonitorRiskContent">'+user.subjectGrade+'</p>'+
            '</div>'
            +'<div class="col-sm-10">'
            + '<div class="col-sm-4">姓名：' + user.userInfoName + '</div>'
            + '<div class="col-sm-4">性别：' + user.userInfoSex + '</div>'
            + '<div class="col-sm-4">年龄：' + user.userInfoAge + '</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">身份证：' + user.userInfoCard +'</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">地址：' + user.userInfoPresentResident + '</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">人员类别：' + user.involvingEvilType + '</div>'
            + '<div class="col-sm-5" style="margin-top: 5px">负责网格员：' + user.gridmanName +'</div>'
            + '<div class="col-sm-7" style="margin-top: 5px">网格员电话：' + user.gridmanTel + '</div>'
            + '<div class="col-sm-7">管控状态：'+user.userInfoContrStatus+'</div></div>'
            +'</div>'
            + '</div>'
            + '<div class="row">';
        li += '<ul class="tag-list clearfix">';
        li += '<li style="display: '+show+';color:red">重点关注对象</li>'
        if (user.warningTitleName) {
            var labels = user.warningTitleName.split(',');
            for (var j = 0, len = labels.length; j < len; j++) {
                if( labels[j].split('@')[1] == 0){
                    li += '<li>' + labels[j].split('@')[0] + '</li>';
                }
                if(labels[j].split('@')[1] == 1){
                    li += '<li style="color:red">' + labels[j].split('@')[0] + '</li>';
                }

            }
            li += '</ul>';
        }
        li += '</div>'
            + '</li>';
    }
    $(".warning-content").append(li);
}
function getOrderClaimListPager(totalCount){
    $('.pagination').pagination({
        totalData: totalCount,
        showData: 5,
        count: 1,
        keepShowPN:true,
        coping:true,
        callback: function (api){
            var curPage = api.getCurrent();
            $.ajax({
                url: Feng.ctxPath + "/gridMonitor/warningList",
                type: 'GET',
                dataType: 'json',
                data: {curPage: curPage},
                success: function(result){
                    var rows = result.page.records;
                    getList(result);
                }
            });
        }
    });
}



/**
 * 查询网格员列表
 */
GridMonitor.search = function () {
    var queryData = {};
    queryData['userInfoPresentResident'] = $("#userInfoPresentResident").val();
    queryData['userInfoName'] = $("#userInfoName").val();
    queryData['userInfoCard'] = $("#userInfoCard").val();
    queryData['involvingEvilStartTime1'] = $("#involvingEvilStartTime1").val();
    queryData['involvingEvilStartTime2'] = $("#involvingEvilStartTime2").val();
    queryData['involvingEvilType'] = $("#involvingEvilType").val();
    queryData['involvingEvilMonitorLevel'] = $("#involvingEvilMonitorLevel").val();
    queryData['involvingEvilStatus'] = $("#involvingEvilStatus").val();
    queryData['involvingEvilControlled'] = $("#involvingEvilControlled").val();
    queryData['involvingEvilAbroad'] = $("#involvingEvilAbroad").val();
    queryData['involvingEvilEscape'] = $("#involvingEvilEscape").val();
    queryData['involvingEvilPrison'] = $("#involvingEvilPrison").val();
    queryData['involvingEvilOtherLocal'] = $("#involvingEvilOtherLocal").val();
    queryData['involvingEvilFixPprocess'] = $("#involvingEvilFixPprocess").val();
    queryData['involvingEvilStriked'] = $("#involvingEvilStriked").val();
    queryData['involvingEvilStillIn'] = $("#involvingEvilStillIn").val();
    // Gridman.table.refresh({query: queryData});
    mapData.mapInit();
    mapData.initMapData(queryData);

};


$(function () {
       GridMonitor.initWarning();
});
