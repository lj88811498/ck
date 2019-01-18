/**
 * 涉网信息管理初始化
 */
var InternetInfo = {
    id: "InternetInfoTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
InternetInfo.initColumn = function () {
    return [
        //{field: 'selectItem', radio: false},
        {title: 'id', field: 'internetInfoId', visible: false, align: 'center', valign: 'middle'},
        {title: '序号', field: '序号', visible: true, align: 'center', valign: 'middle',width:'50px',formatter:function(value,row,index){
            return index+1;
        }},
        {title: '标题', field: 'internetInfoName', visible: true, align: 'center', valign: 'middle'},
        {title: '正文', field: 'internetInfoContent', visible: true, align: 'center', valign: 'middle',width:'300px'},
        {title: '网站名称', field: 'internetInfoFrom', visible: true, align: 'center', valign: 'middle'},
        {title: '发布时间', field: 'internetInfoPublishTime', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: InternetInfo.operateFormatter, width: '20%'}
    ];
};


/**
 * 表格行操作
 */
InternetInfo.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="InternetInfo.openInternetInfoDetail(' + row.internetInfoId + ')">详情</button>';
    return [result].join('');
};


/**
 * 检查是否选中
 */
InternetInfo.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        InternetInfo.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加涉网信息
 */
InternetInfo.openAddInternetInfo = function () {
    var index = layer.open({
        type: 2,
        title: '添加涉网信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/internetInfo/internetInfo_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看涉网信息详情
 */
InternetInfo.openInternetInfoDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '涉网信息详情',
            area: ['100%', '100%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/internetInfo/internetInfo_update/' + id
        });
        this.layerIndex = index;

};

/**
 * 删除涉网信息
 */
InternetInfo.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/internetInfo/delete", function (data) {
            Feng.success("删除成功!");
            InternetInfo.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("internetInfoId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询涉网信息列表
 */
InternetInfo.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['internetInfoFrom'] = $("#internetInfoName").val();
    queryData['internetInfoContent'] = $("#internetInfoContent").val();
    InternetInfo.table.refresh({query: queryData});
};

/**
 * 数据导入
 */
InternetInfo.import = function () {
    var index = layer.open({
        type: 2,
        title: '导入数据',
        area: ['840px', '300px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/internetInfo/internetInfo_upload'
    });
    this.layerIndex = index;
};


/**
 * 数据导出
 */
InternetInfo.export = function () {
   var beginTime = $("#beginTime").val();
   var endTime = $("#endTime").val();
   if(beginTime!="" && endTime!=""){
           var $form = $('<form method="GET"><input type="hidden" name="beginTime" value='+beginTime+'>' +
               '<input type="hidden" name="endTime" value='+endTime+'></form>');
           var path  = Feng.ctxPath + "/internetInfo/downloadSpider";
           $form.attr('action', path);
           $form.appendTo($('body'));
           $form.submit();
   }
   else{
       Feng.info("起止时间不能为空");
   }
};
InternetInfo.spider =function () {
    Feng.confirm('是否进行爬取数据？', function () {
        var ajax = new $ax(Feng.ctxPath + "/internetInfo/spiderScheduled", function (data) {
            Feng.success("爬取完成!");

        }, function (data) {
            Feng.error("爬取失败!");
        });
        ajax.type = 'get';
        ajax.start();
    });
}

$(function () {
    var defaultColunms = InternetInfo.initColumn();
    var table = new BSTable(InternetInfo.id, "/internetInfo/list", defaultColunms);
    table.setPaginationType("client");
    InternetInfo.table = table.init('get');
});
