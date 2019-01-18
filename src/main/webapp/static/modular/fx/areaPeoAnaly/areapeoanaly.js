/**
 * 数据管理管理初始化
 */
var ReportInfo = {
    id: "ReportInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
ReportInfo.initColumn = function () {
    return [
        // {field: 'selectItem', radio: false,checkbox:true},
        {title: 'id', field: 'gridTrailId', visible: false, align: 'center', valign: 'middle'},
        {title: '上报类型', field: 'gridTrailType', visible: true, align: 'center', valign: 'middle'},
        {title: '事件内容', field: 'content', visible: true, align: 'center', valign: 'middle'},
        {title: '网格员姓名', field: 'gridTrailName', visible: true, align: 'center', valign: 'middle'},
        {title: '上报时间', field: 'gridTailCreateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: ReportInfo.operateFormatter, width: '20%'}
    ];
};


/**
 * 检查是否选中
 */
ReportInfo.check = function (rowid) {
    var selected = $('#' + this.gridTrailId).bootstrapTable('getSelections');
    var ids = {};
    if (selected.length == 0 && rowid == "") {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        ReportInfo.seItem = selected[0];
        return true;
    }
};
/**
 * 表格行操作
 */
ReportInfo.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button id ="gridTrailId" data-id ="' + row.gridTrailId + '"type="button" class="btn btn-info nocolor-btn" onclick="ReportInfo.openReportInfoDetail(' + row.gridTrailId + ')" >详情</button>';
    return [result].join('');
};


/**
 * 打开查看数据管理详情
 */
ReportInfo.openReportInfoDetail = function (rowid) {

        var index = layer.open({
            type: 2,
            title: '数据管理详情',
            area: ['100%', '100%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/areaPeoAnaly/findReportInfoDetailHtml/' + rowid
        });
        this.layerIndex = index;

};




/**
 * 查询数据管理列表
 */
ReportInfo.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['reportType'] = $("#reportType").val();
    queryData['content'] = $("#content").val();
    ReportInfo.table.refresh({query: queryData});
};


$(function () {
    var defaultColunms = ReportInfo.initColumn();
    var table = new BSTable(ReportInfo.id, "/areaPeoAnaly/findReportInfoEvilList", defaultColunms);
    ReportInfo.table = table.init();
});
