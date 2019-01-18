/**
 * 涉邪信息管理初始化
 */
var InvolvingEvil = {
    crackdownId: "crackdownTableId",	//受打击处理情况id
    caseHandlingId:"caseHandlingId",//涉邪教案件登记表id
    classStudyId:'classStudyId',//强制办班学习情况
    seItem: null,		//选中的条目
    table: null,
    recordUserId:$("#involvingInfoId").val(),
    crackdownTable:null,
    caseHandlingTable:null,
    classStudyTable:null,
    layerIndex: -1
};

// /**
//  * 初始化受打击处理情况表格的列
//  */
InvolvingEvil.initCrackdownColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '被抓获时间', field: 'involvingEvilRecordArrestTime', visible: true, align: 'center', valign: 'middle'},
        {title: '处罚种类', field: 'involvingEvilRecordType', visible: true, align: 'center', valign: 'middle'},
        {title: '处罚期限', field: 'involvingEvilRecordPunishTime', visible: true, align: 'center', valign: 'middle'},
        {title: '解除处罚时间', field: 'involvingEvilRecordUnpunishedTime' , visible: true, align: 'center', valign: 'middle'},
    ];
};
/**
 * 初始化涉邪案件登记表表格的列
 */
InvolvingEvil.initcaseHandlingColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '时间', field: 'involvingEvilRegArrestTime', visible: true, align: 'center', valign: 'middle'},
        {title: '案发地', field: 'involvingEvilRegLocal', visible: true, align: 'center', valign: 'middle'},
        {title: '案件情况', field: 'involvingEvilRegInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '处理情况', field: 'involvingEvilRegObjInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '处罚期限', field: 'involvingEvilRegPunishTime', visible: true, align: 'center', valign: 'middle'},
        {title: '解除处罚时间', field: 'involvingEvilRegUnpunishedTime' , visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: InvolvingEvil.operateFormatter, width: '20%'}
    ];
};
//
// /**
//  * 初始化强制办班学习情况表格的列
//  */
InvolvingEvil.initClassStudyColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '学习时间', field: 'involvingEvilRecordArrestTime', visible: true, align: 'center', valign: 'middle'},
        {title: '地点', field: 'involvingEvilRecordType', visible: true, align: 'center', valign: 'middle'},
        {title: '学习情况', field: 'involvingEvilRecordPunishTime', visible: true, align: 'center', valign: 'middle'},
        {title: '备注', field: 'involvingEvilRecordUnpunishedTime' , visible: true, align: 'center', valign: 'middle'},
    ];
};


InvolvingEvil.operateFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="InvolvingEvil.openDetail(' + row.involvingEvilRegId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="InvolvingEvil.delete(' + row.involvingEvilRegId + ')">删除</button>';
    return [result].join('');
};



/**
 * 检查是否选中
 */
InvolvingEvil.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        InvolvingEvil.seItem = selected[0];
        return true;
    }
};

/**
 * 新增涉邪案件登记表
 */
InvolvingEvil.openAddInvolvingEvilReg = function () {
    var index = layer.open({
        type: 2,
        title: '新增案件处理信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvilReg/involvingEvilReg_add'
    });
    this.layerIndex = index;
};

/**
* 新增涉邪案件登记表
*/
InvolvingEvil.openAddInvolvingEvil = function () {
    var index = layer.open({
        type: 2,
        title: '新增打击处理信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvil/involvingEvil_add'
    });
    this.layerIndex = index;
};

/**
 * 新增强制办班学习情况
 */
InvolvingEvil.openAddInvolvingEvilStudy = function () {
    var index = layer.open({
        type: 2,
        title: '新增强制办班学习情况',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvilRecord/involvingEvilRecord_add'
    });
    this.layerIndex = index;
};

//时间转换
function Todate(time)
{
    var date="";
    var month=new Array();
    month["Jan"]=1;month["Feb"]=2;month["Mar"]=3;month["Apr"]=4;month["May"]=5;month["Jan"]=6;
    month["Jul"]=7;month["Aug"]=8;month["Sep"]=9;month["Oct"]=10;month["Nov"]=11;month["Dec"]=12;
    var week=new Array();
    week["Mon"]="一";week["Tue"]="二";week["Wed"]="三";week["Thu"]="四";week["Fri"]="五";week["Sat"]="六";week["Sun"]="日";
    str=time.split(" ");
    date=str[5]+"-";
    date=date+month[str[1]]+"-"+str[2]+" "+str[3];
    //date=date+" 周"+week[str[0]];
    return date;
}

InvolvingEvil.openDetail = function(id){
    if(id == undefined){
        id = 0;
    }
    var index = layer.open({
        type: 2,
        title: '编辑案件处理信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/involvingEvilReg/involvingEvilReg_update/' + id
    });
    this.layerIndex = index;
};
/**
 * 打开查看涉邪信息详情
 */
InvolvingEvil.openInvolvingEvilDetail = function (id) {
        if(id == undefined){
            id = 0;
        }
        var index = layer.open({
            type: 2,
            title: '涉邪信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/involvingEvil/involvingEvil_update/' + id
        });
        this.layerIndex = index;
};

/**
 * 删除涉邪信息
 */
InvolvingEvil.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/involvingEvil/delete", function (data) {
            Feng.success("删除成功!");
            InvolvingEvil.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("involvingEvilId",this.seItem.id);
        ajax.start();
    }
};
/**
 * 加载基本信息详情
 */
InvolvingEvil.reloadUserInfoDetail = function (data) {
    for (var key in data) {
        $('#' + key).html(data[key]);
    }
};
/**
 * 查询涉邪信息列表
 */
InvolvingEvil.search = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    InvolvingEvil.crackdownTable.refresh({query: queryData});
};

/**
 * 设置userId
 */
InvolvingEvil.setId = function () {
    var url = location.pathname;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
    var ul = '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li>';
    $('#involvingInfoId').val(id);
    $('.tab-menu').append(ul);
};

InvolvingEvil.regSearch = function () {
    var queryData = {};
    queryData['startTime'] = $("#beginTimeReg").val();
    queryData['endTime'] = $("#endTimeReg").val();
    InvolvingEvil.caseHandlingTable.refresh({query: queryData});
};
$(function () {
    InvolvingEvil.setId();
    var crackdownColunms = InvolvingEvil.initCrackdownColumn();
    var caseHandlingColunms = InvolvingEvil.initcaseHandlingColumn();
    var classStudyColunms  = InvolvingEvil.initClassStudyColumn();
    var crackdownUrl = "/involvingEvilRecord/detail/"+$('#involvingInfoId').val();
    var caseHandleUrl = "/involvingEvilReg/detail/"+$('#involvingInfoId').val();
    var classStudyUrl = "/involvingEvilRecord/detail/"+$('#involvingInfoId').val();//暂时的
    var crackdownTable = new BSTable(InvolvingEvil.crackdownId,crackdownUrl, crackdownColunms);
    var caseHandleTable = new BSTable(InvolvingEvil.caseHandlingId,caseHandleUrl, caseHandlingColunms);
    var classStudyTable = new BSTable(InvolvingEvil.classStudyId,classStudyUrl, classStudyColunms);//暂时的
    crackdownTable.setPaginationType("client");
    caseHandleTable.setPaginationType("client");
    classStudyTable.setPaginationType("client");
    InvolvingEvil.crackdownTable = crackdownTable.init();
    InvolvingEvil.caseHandlingTable = caseHandleTable.init();
    InvolvingEvil.classStudyTable = classStudyTable.init();
    if($("#involvingEvilStartTime").html() == ""){
        $("#involvingEvilStartTime").html("");
    }
    else{
        $("#involvingEvilStartTime").html(Todate($("#involvingEvilStartTime").html()));
    }
    if($("#involvingEvilNoticedTime").html() == ""){
        $("#involvingEvilNoticedTime").html("");
    }
    else{
        $("#involvingEvilNoticedTime").html(Todate($("#involvingEvilNoticedTime").html()));
    }
    if($("#involvingEvilTime").html() == ""){
        $("#involvingEvilTime").html("");
    }
    else{
        $("#involvingEvilTime").html(Todate($("#involvingEvilTime").html()));
    }

/*    $("#involvingEvilNoticedTime").html(Todate($("#involvingEvilNoticedTime").html()));
    $("#involvingEvilTime").html(Todate($("#involvingEvilTime").html()));*/
});
