/**
 * 预警建议管理初始化
 */
var WarningAdvise = {
    id: "WarningAdviseTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
WarningAdvise.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
WarningAdvise.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        WarningAdvise.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加预警建议
 */
WarningAdvise.openAddWarningAdvise = function () {
    var index = layer.open({
        type: 2,
        title: '添加预警建议',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/warningAdvise/warningAdvise_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看预警建议详情
 */
WarningAdvise.openWarningAdviseDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '预警建议详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/warningAdvise/warningAdvise_update/' + WarningAdvise.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除预警建议
 */
WarningAdvise.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/warningAdvise/delete", function (data) {
            Feng.success("删除成功!");
            WarningAdvise.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("warningAdviseId",this.seItem.id);
        ajax.start();
    }
};



/**
 * 跳转到预警详情页面
 */
WarningAdvise.warningDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '预警详情',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/gridMonitor/gridMonitorPushInfo/' + id
    });
    this.layerIndex = index;

};


/**
 * 查询预警建议列表
 */
WarningAdvise.search = function () {
    var queryData = {};
    queryData['warningAdviseId'] = $("#warningAdviseId").val();
    queryData['userInfoMonitorLevel'] = $("#userInfoMonitorLevel").val();
    queryData['userInfoName'] = $("#userInfoName").val();
    // WarningAdvise.table.refresh({query: queryData});
    WarningAdvise.initWarning(queryData);
};


WarningAdvise.initWarning = function(params){

    var ajax = new $ax(Feng.ctxPath + "/gridMonitor/warningList", function (data) {
        getList(data);
        getOrderClaimListPager(data.page.total)
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    if(params){
        ajax.set(params);
    }
    // ajax.set("curPage",curPage);
    ajax.start('get');

}

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
        if(user.warningAdviseClass){
            user.warningAdviseClass = user.warningAdviseClass;
        }
        else{
            user.warningAdviseClass = ''
        }
        var img;
        if(user.userInfoImgUrl==""){
             img ='<img src="/static/img/person.png">'
        }else {
            img ='<img src='+user.userInfoImgUrl+'>'
        }
        li += '<li class="usersCard warningPushInfo"  data-name="' + user.userInfoName + '" onclick="WarningAdvise.warningDetail('+user.userInfoId+')">'
            + '<div class="row">' +
            '<div class="col-sm-12">'+
            '<div class="col-sm-2"><p class="warnList">'+img+'</p><div class="info_type">'+
            '<div class="info_type_left">'+
            '<ul id="infoTypeLeft">'+
            '<li class="red">'+user.warningAdviseClass+'</li>'+
            '<li>监控级别:'+user.userInfoMonitorLevel+'</li>' +
            '<li class="red">风险度:'+user.subjectGrade+'</li>' +
            '<li>防控等级:'+user.userInfoPreventControl+'</li>'+
            '</ul>'+
            '</div>'+
            '</div>' +
            '<p class="gridMonitorRiskTitle"></p><p class="gridMonitorRiskContent"></p>'+
            '<div></div><div class="monitorLevel"></div></div>'
            +'<div class="col-sm-10">'
            + '<div class="col-sm-4">姓名：' + user.userInfoName + '</div>'
            + '<div class="col-sm-4">性别：' + user.userInfoSex + '</div>'
            + '<div class="col-sm-4">年龄：' + user.userInfoAge + '</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">身份证：' + user.userInfoCard +'</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">地址：' + user.userInfoPresentResident + '</div>'
            + '<div class="col-sm-12" style="margin-top: 5px">人员类别：' + user.involvingEvilType + '</div>'
            + '<div class="col-sm-5" style="margin-top: 5px">负责网格员：' + user.gridmanName +'</div>'
            + '<div class="col-sm-7" style="margin-top: 5px">网格员电话：' + user.gridmanTel + '</div>'
            + '<div class="col-sm-4">管控状态：'+user.userInfoContrStatus+'</div></div>'
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

$(function () {
    WarningAdvise.initWarning();
    var defaultColunms = WarningAdvise.initColumn();
    var table = new BSTable(WarningAdvise.id, "/warningAdvise/list", defaultColunms);
    table.setPaginationType("client");
    WarningAdvise.table = table.init();
});
