/**
 * 邻里信息管理初始化
 */
var Neighbor = {
    id: "NeighborTable",	//表格id
    userId: $('#userInfoId').val(),
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 表格行操作
 */
Neighbor.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Neighbor.openNeighborDetail(' + row.neighborId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="Neighbor.delete(' + row.neighborId + ')">删除</button>';
    return [result].join('');
};

/**
 * 初始化表格的列
 */
Neighbor.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '楼层', field: 'neighborBuild', visible: true, align: 'center', valign: 'middle'},
        {title: '门牌号', field: 'neighborDoor', visible: true, align: 'center', valign: 'middle'},
        {title: '户主', field: 'neighborName', visible: true, align: 'center', valign: 'middle'},
        {title: '房间人数', field: 'neighborPeopleAmount', visible: true, align: 'center', valign: 'middle'},
        {title: '使用情况', field: 'neighborUseInfo', visible: true, align: 'center', valign: 'middle'},
        // {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: Neighbor.operateFormatter, width: '20%'}
    ];
};

/**
 * 检查是否选中
 */
Neighbor.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Neighbor.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加邻里信息
 */
Neighbor.openAddNeighbor = function () {
    var index = layer.open({
        type: 2,
        title: '添加邻里信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/neighbor/neighbor_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看邻里信息详情
 */
Neighbor.openNeighborDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '邻里信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/neighbor/neighbor_update/' + Neighbor.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除邻里信息
 */
Neighbor.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/neighbor/delete", function (data) {
            Feng.success("删除成功!");
            Neighbor.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("neighborId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询邻里信息列表
 */
Neighbor.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Neighbor.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Neighbor.initColumn();
    var table = new BSTable(Neighbor.id, "/neighbor/detail/" + Neighbor.userId, defaultColunms);
    table.setPaginationType("client");
    Neighbor.table = table.init();
});
