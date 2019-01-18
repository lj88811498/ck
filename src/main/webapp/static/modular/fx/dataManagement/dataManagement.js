/**
 * 数据管理管理初始化
 */
var DataManagement = {
    id: "DataManagementTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
DataManagement.initColumn = function () {
    return [
        // {field: 'selectItem', radio: false,checkbox:true},
        {title: 'id', field: 'dataManagementId', visible: false, align: 'center', valign: 'middle'},
        {title: '数据类型', field: 'dataManagementType', visible: true, align: 'center', valign: 'middle'},
        {title: '数据名称', field: 'dataManagementName', visible: true, align: 'center', valign: 'middle'},
        {title: '更新时间', field: 'dataManagementCreateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '更新人', field: 'dataManagementCreateBy', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: DataManagement.operateFormatter, width: '20%'}
    ];
};
// /**
//  * 检查是否选中
//  */
// DataManagement.check = function (rowid) {
//     var selected = $('#' + this.dataManagementId).bootstrapTable('getSelections');
//     var ids = {};
//     if (selected.length == 0 && rowid == "") {
//         Feng.info("请先选中表格中的某一记录！");
//         return false;
//     } else {
//         DataManagement.seItem = selected[0];
//         return true;
//     }
// };


/**
 * 表格行操作
 */
DataManagement.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="DataManagement.delete(' + row.dataManagementId + ')">删除</button>';
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="DataManagement.export(' + row.dataManagementId + ')">导出</button>';
    return [result].join('');
};


/**
 * 删除数据记录
 */
DataManagement.delete = function (id) {
    Feng.confirm("确定删除本数据？",function () {
        var ajax = new $ax(Feng.ctxPath + "/dataManagement/delete", function (data) {
            Feng.success("删除成功!");
            DataManagement.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("dataManagementId",id);
        ajax.start();
    })
};


/**
 * 删除当导入失败时
 */
DataManagement.deleteWhenImportBad = function (id) {

        var ajax = new $ax(Feng.ctxPath + "/dataManagement/delete", function (data) {

            DataManagement.table.refresh();
        }, function (data) {
           // Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("dataManagementId",id);
        ajax.start();

};
/**
 * 点击添加数据管理
 */
DataManagement.openAddDataManagement = function () {
    var index = layer.open({
        type: 2,
        title: '添加数据管理',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dataManagement/dataManagement_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看数据管理详情
 */
DataManagement.openDataManagementDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '数据管理详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dataManagement/dataManagement_update/' + DataManagement.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 打开数据导入页面
 */
DataManagement.openImport = function () {
        var index = layer.open({
            type: 2,
            title: '导入委办局数据',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/dataManagement/importDetail'
        });
        this.layerIndex = index;

};

/**
 * 打开下载模板页面
 */
DataManagement.openExcleDemo = function () {
    var index = layer.open({
        type: 2,
        title: '下载模板数据',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/dataManagement/importExcleDemo'
    });
    this.layerIndex = index;

};

/**
 * 查询数据管理列表
 */
DataManagement.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['dataType'] = $("#dataType").val();
    queryData['dataName'] = $("#dataName").val();
    DataManagement.table.refresh({query: queryData});
};
DataManagement.export = function (id) {
    var ids = [];
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        ids =id;
    }else {
        for (var i in selected) {
            ids.push(selected[i].dataManagementId);
        }
    }

    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    queryData['dataType'] = $("#dataType").val();
    queryData['ids'] = ids;
    var queryDatas="";
    for(var item in queryData){
        queryDatas+=item+"="+queryData[item]+"&";
    }
    var url= window.top.location.href = Feng.ctxPath+"/dataManagement/downExcel?"+queryDatas.substring(0,queryDatas.length-1);
    url = decodeURIComponent(url,true);
}

DataManagement.import = function () {

}
$(function () {
    var defaultColunms = DataManagement.initColumn();
    var table = new BSTable(DataManagement.id, "/dataManagement/list", defaultColunms);
    DataManagement.table = table.init();
});
