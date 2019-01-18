/**
 * 档案管理管理初始化
 */
var BaseInfo = {
    id: "BaseInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 表格行操作
 */
BaseInfo.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="BaseInfo.openBaseInfoDetail(' + row.userInfoId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="BaseInfo.delete(' + row.userInfoId + ')">删除</button>';
    return [result].join('');
};

/**
 * 初始化表格的列
 */
BaseInfo.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '监控级别', field: 'userInfoMonitorLevel', visible: true, align: 'center', valign: 'middle'},
        {title: '人员姓名', field: 'userInfoName', visible: true, align: 'center', valign: 'middle',formatter:function(value,row,index){
            // var id = row.id;
            var userInfoName = row.userInfoName;
            var newValue = "";
            newValue = "<a onclick = 'BaseInfo.openBaseInfoDetail("+row.userInfoId+")' style='text-decoration:underline '>"+value+"</a>";
            return newValue;
        }},
        {title: '性别', field: 'userInfoSex', visible: true, align: 'center', valign: 'middle', width: '10%'},
        {title: '年龄', field: 'userInfoAge', visible: true, align: 'center', valign: 'middle'},
        {title: '人员性质', field: 'userInfoFlag', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证号', field: 'userInfoCard', visible: true, align: 'center', valign: 'middle'},
        {title: '现居住地', field: 'userInfoPresentResident', visible: true, align: 'center', valign: 'middle'},
        {title: '帮扶记录总量', field: 'num', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: BaseInfo.operateFormatter, width: '20%'}
    ];
};

/**
 * 检查是否选中
 */
BaseInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        BaseInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加档案管理
 */
BaseInfo.openAddBaseInfo = function () {
    var index = layer.open({
        type: 2,
        title: '新增邪教人员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/baseInfo/baseInfo_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看档案管理详情
 */
BaseInfo.openBaseInfoDetail = function (rowId) {
    var index = layer.open({
        type: 2,
        title: '邪教人员档案管理',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content: Feng.ctxPath + '/userInfo/userInfo_detail/' + rowId + '?true'
    });
    this.layerIndex = index;
};

/**
 * 删除档案管理
 */
BaseInfo.delete = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/baseInfo/delete", function (data) {
            Feng.success("删除成功!");
            BaseInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userInfoId", id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });
};

/**
 * 查询档案管理列表
 */
BaseInfo.search = function () {
    var queryData = {};
    queryData['userInfoRegion'] = $("#userInfoRegion").val();
    queryData['userInfoName'] = $("#userInfoName").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['userInfoCulttype'] = $("#userInfoCulttype").val();
    queryData['userInfoMonitorLevel'] = $("#userInfoMonitorLevel").val();
    queryData['userInfoConversion'] = $("#userInfoConversion").val();
    queryData['userInfoIsflee'] = $("#userInfoIsflee").val();
    queryData['userInfoIscultactivity'] = $("#userInfoIscultactivity").val();
    queryData['userInfoIstreatment'] = $("#userInfoIstreatment").val();
    queryData['userInfoIsoutcontrol'] = $("#userInfoIsoutcontrol").val();
    queryData['userInfoIsprison'] = $("#userInfoIsprison").val();
    queryData['userInfoIsothercontrol'] = $("#userInfoIsothercontrol").val();
    queryData['userInfoIscontrolprocess'] = $("#userInfoIscontrolprocess").val();
    queryData['userInfoIsabroad'] = $("#userInfoIsabroad").val();
    queryData['userInfoCard'] = $("#userInfoCard").val();
    queryData['offset'] = 0;
    BaseInfo.table.refresh({query: queryData});
};
// BaseInfo.skipBasic = function () {
//     var index = layer.open({
//         type: 2,
//         title: '基本情况分析',
//         area: ['100%', '100%'], //宽高
//         fix: false, //不固定
//         maxmin: false,
//         content: Feng.ctxPath + '/userInfo/findBasicSituation/'
//     });
//     this.layerIndex = index;
// }
$(function () {
    var defaultColunms = BaseInfo.initColumn();
    var table = new BSTable(BaseInfo.id, "/baseInfo/list", defaultColunms);
    // table.setPaginationType("client");
    BaseInfo.table = table.init();
    $("input").keydown(function (e) {
        if (e.which == 13) {
            BaseInfo.search();
        }
    })
    // $("select").keydown(function (e) {
    //     if (e.which == 13) {
    //         BaseInfo.search();
    //     }
    // })
});
