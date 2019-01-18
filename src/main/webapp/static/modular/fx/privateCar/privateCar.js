/**
 * privateCar管理初始化
 */
var PrivateCar = {
    id: "PrivateCarTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PrivateCar.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
            {title: '主键id', field: 'privateCarId', visible: true, align: 'center', valign: 'middle'},
            {title: '邪教人员id', field: 'privateCarUserId', visible: true, align: 'center', valign: 'middle'},
            {title: '车牌号', field: 'privateCarCard', visible: true, align: 'center', valign: 'middle'},
            {title: '汽车品牌', field: 'privateCarBrand', visible: true, align: 'center', valign: 'middle'},
            {title: '汽车车系', field: 'privateCarVehicles', visible: true, align: 'center', valign: 'middle'},
            {title: '汽车车型', field: 'privateCarType', visible: true, align: 'center', valign: 'middle'},
            {title: '汽车颜色', field: 'privateCarColor', visible: true, align: 'center', valign: 'middle'},
            {title: '创建人', field: 'privateCarCreateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改人', field: 'privateCarUpdateBy', visible: true, align: 'center', valign: 'middle'},
            {title: '修改时间', field: 'privateCarUpdateTime', visible: true, align: 'center', valign: 'middle'},
            {title: '创建时间', field: 'privateCarCreateTime', visible: true, align: 'center', valign: 'middle'}
    ];
};

/**
 * 检查是否选中
 */
PrivateCar.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        PrivateCar.seItem = selected[0];
        return true;
    }
};



/**
 * 打开查看privateCar详情
 */
PrivateCar.openPrivateCarDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: 'privateCar详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/privateCar/privateCar_update/' + PrivateCar.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除privateCar
 */
PrivateCar.delete = function (id) {
    Feng.confirm('是否删除私家车信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/privateCar/delete", function (data) {
            Feng.success("删除成功!");
            CarTravel.PrivateTable.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("privateCarId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });

};

/**
 * 查询privateCar列表
 */
PrivateCar.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PrivateCar.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = PrivateCar.initColumn();
    var table = new BSTable(PrivateCar.id, "/privateCar/list", defaultColunms);
    table.setPaginationType("client");
    PrivateCar.table = table.init();
});
