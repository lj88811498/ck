/**
 * 网格员管理初始化
 */
var Gridman = {
    id: "GridmanTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Gridman.initColumn = function () {
    return [
        // {field: 'selectItem', radio: true},
        {title: 'id', field: 'gridmanId', visible: false, align: 'center', valign: 'middle'},
        {title: '所属街道', field: 'gridmanStreet', visible: true, align: 'center', valign: 'middle'},
        {title: '所属社区', field: 'gridmanArea', visible: true, align: 'center', valign: 'middle'},
        {title: '所属网格', field: 'gridmanGrid', visible: true, align: 'center', valign: 'middle'},
        {title: '姓名', field: 'gridmanName', visible: true, align: 'center', valign: 'middle'},
        {title: '联系地址', field: 'gridmanAddr', visible: true, align: 'center', valign: 'middle'},
        {title: '身份证号', field: 'gridmanCard', visible: true, align: 'center', valign: 'middle'},
        {title: '联系电话', field: 'gridmanTel', visible: true, align: 'center', valign: 'middle'},
        {title: '负责邪教人数', field: 'gridmanIds', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: Gridman.operateFormatter, width: '20%'}
    ];
};

/**
 * 表格行操作
 */
Gridman.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Gridman.openGridmanDetail(' + row.gridmanId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="Gridman.delete(' + row.gridmanId + ')">删除</button>';
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Gridman.personNum(' + row.gridmanId + ')">负责邪教人员</button>';
    return [result].join('');
};

/**
 * 检查是否选中
 */
Gridman.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Gridman.seItem = selected[0];
        return true;
    }
};


/**
 * 负责邪教人员
 */
Gridman.personNum = function(id){
    $("#personId").val(id);
    var index = layer.open({
        type: 2,
        title: '负责邪教人员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/gridman/gridman_add'
    });
    this.layerIndex = index;
};



/**
 * 点击添加网格员
 */
Gridman.openAddGridman = function () {
    var index = layer.open({
        type: 2,
        title: '添加网格员',
        area: ['800px', '320px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/gridman/gridman_insert'
    });
    this.layerIndex = index;
};

/**
 * 打开查看网格员详情
 */
Gridman.openGridmanDetail = function (id) {
        var index = layer.open({
            type: 2,
            title: '编辑网格员信息',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/gridman/gridman_update/' + id
        });
        this.layerIndex = index;

};

/**
 * 删除网格员
 */
Gridman.delete = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/gridman/delete/" + id, function (data) {
            Feng.success("删除成功!");
            Gridman.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        // ajax.set("gridmanId",this.seItem.id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });


};

/**
 * 查询网格员列表
 */
Gridman.search = function () {
    var queryData = {};
    queryData['gridmanStreet'] = $("#street").val();
    queryData['gridmanGrid'] = $("#gridmanGrid").val();
    queryData['gridmanName'] = $("#gridmanName").val();
    queryData['offset'] = 0;
    Gridman.table.refresh({query: queryData});
};

/**
 * 初始化查询条件
 */
Gridman.init = function () {
    var ajax = new $ax(Feng.ctxPath + "/gridman/list/", function (data) {
        var strGrid = "";
        var strStreet = "";
        var grid = data.grid;
        var street = data.street;
        for(var i = 0; i < grid.length; i++){
            strGrid += "<option value="+grid[i]+">"+grid[i]+"</option>"
        }
        for(var j = 0; j < street.length; j++){
            strStreet += "<option value="+street[j]+">"+street[j]+"</option>"
        }
        $("#gridmanGrid").append(strGrid);
        $("#street").append(strStreet);
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    // ajax.set("gridmanId",this.seItem.id);
    ajax.start('get');
}

$(function () {
    Gridman.init();
    var defaultColunms = Gridman.initColumn();
    var table = new BSTable(Gridman.id, "/gridman/list", defaultColunms);
    table.setPaginationType("server");
    Gridman.table = table.init('get');
});
