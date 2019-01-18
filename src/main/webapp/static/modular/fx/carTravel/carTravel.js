/**
 * 出行信息管理初始化
 */
var CarTravel = {
    id: "",	//表格id
    userId:"",
    privateCarId:'PrivateCar',
    carTravelId:"CarTravelTable",
    busTraveId:"BusTravelTable",
    TrainTravelId:"TrainTravelId",
    PlaneTravelId:"PlaneTravelId",
    ShipTravelId:"ShipTravelId",
    seItem: null,		//选中的条目
    carTravelTable:null,
    busTravelTable:null,
    TrainTravelTable:null,
    PlaneTravelTable:null,
    ShipTravelTable:null,
    PrivateTable:null,
    layerIndex: -1
};
var BusTravel = {

};
var TrainTravel = {

};
var PlainTravel = {

};
var ShipTravel = {

};

/**
 * 初始化私家车信息表格的列
 */
CarTravel.initPrivateCarColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: 'id', field: 'privateCarId', visible: false, align: 'center', valign: 'middle'},
        {title: '车牌号', field: 'privateCarCard', visible: true, align: 'center', valign: 'middle'},
        {title: '汽车品牌', field: 'privateCarBrand', visible: true, align: 'center', valign: 'middle'},
        {title: '车系', field: 'privateCarVehicles', visible: true, align: 'center', valign: 'middle'},
        {title: '车型', field: 'privateCarType' , visible: true, align: 'center', valign: 'middle'},
        {title: '颜色', field: 'privateCarColor', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: CarTravel.operateFormatter, width: '20%'}
    ];
};

CarTravel.operateFormatter = function(value, row, index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="CarTravel.openEditCarTravel(' + row.privateCarId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="PrivateCar.delete(' + row.privateCarId + ')">删除</button>';
    return [result].join('');
}
/**
 * 初始化表格的列
 */
CarTravel.initCarColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '发车日期', field: 'carTravelTime', visible: true, align: 'center', valign: 'middle'},
        {title: '出发车站', field: 'carTravelStartStation', visible: true, align: 'center', valign: 'middle'},
        {title: '到达车站', field: 'carTravelEndStation', visible: true, align: 'center', valign: 'middle'},
        {title: '电话', field: 'carTravelTel' , visible: true, align: 'center', valign: 'middle'},
        {title: '订单状态', field: 'carTravelOrderStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '车票状态', field: 'carTravelTicketInfo', visible: true, align: 'center', valign: 'middle'},
    ];
};

CarTravel.initBusColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '刷卡时间', field: 'busTravelTime', visible: true, align: 'center', valign: 'middle'},
        {title: '公交线路', field: 'busTravelBusRoute', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 初始化火车出行表格的列
 */
CarTravel.initTrainColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '发车日期', field: 'carTravelTime', visible: true, align: 'center', valign: 'middle'},
        {title: '出发车站', field: 'carTravelStartStation', visible: true, align: 'center', valign: 'middle'},
        {title: '到达车站', field: 'carTravelEndStation', visible: true, align: 'center', valign: 'middle'},
        {title: '电话', field: 'carTravelTel' , visible: true, align: 'center', valign: 'middle'},
        {title: '订单状态', field: 'carTravelOrderStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '车票状态', field: 'carTravelTicketInfo', visible: true, align: 'center', valign: 'middle'},
        {title: '车次', field: 'carTravelCarNo', visible: true, align: 'center', valign: 'middle'},
        {title: '座位', field: 'carTravelSeat', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 初始化飞机出行表格的列
 */
CarTravel.initPlaneColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '发车日期', field: 'carTravelTime', visible: true, align: 'center', valign: 'middle'},
        {title: '出发地点', field: 'carTravelStartStation', visible: true, align: 'center', valign: 'middle'},
        {title: '到达地点', field: 'carTravelEndStation', visible: true, align: 'center', valign: 'middle'},
        {title: '电话', field: 'carTravelTel' , visible: true, align: 'center', valign: 'middle'},
        {title: '订单状态', field: 'carTravelOrderStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '车票状态', field: 'carTravelTicketInfo', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 初始化轮船出行表格的列
 */
CarTravel.initShipColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '发车日期', field: 'carTravelTime', visible: true, align: 'center', valign: 'middle'},
        {title: '出发地点', field: 'carTravelStartStation', visible: true, align: 'center', valign: 'middle'},
        {title: '到达地点', field: 'carTravelEndStation', visible: true, align: 'center', valign: 'middle'},
        {title: '电话', field: 'carTravelTel' , visible: true, align: 'center', valign: 'middle'},
        {title: '订单状态', field: 'carTravelOrderStatus', visible: true, align: 'center', valign: 'middle'},
        {title: '车票状态', field: 'carTravelTicketInfo', visible: true, align: 'center', valign: 'middle'},
    ];
};

/**
 * 检查是否选中
 */
CarTravel.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        CarTravel.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加出行信息
 */
CarTravel.openEditCarTravel = function (id) {
    if(id == undefined || id == ""){
        id = 0;
    }
    var index = layer.open({
        type: 2,
        title: '编辑私家车信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/privateCar/privateCar_update/' + id
    });
    this.layerIndex = index;
};


/**
 * 点击添加privateCar
 */
CarTravel.openAddPrivateCar = function () {
    var index = layer.open({
        type: 2,
        title: '添加私家车信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/privateCar/privateCar_add'
    });
    this.layerIndex = index;
};


/**
 * 打开查看出行信息详情
 */
CarTravel.openCarTravelDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '出行信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/carTravel/carTravel_update/' + CarTravel.seItem.id
        });
        this.layerIndex = index;
    }
};


/**
 * 新增火车出行信息
 */
CarTravel.trainAdd = function(){
    var index = layer.open({
        type: 2,
        title: '新增火车出行信息',
        area: ['800px', '520px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/carTravel/carTravel_add/'
    });
    this.layerIndex = index;
};


/**
 * 删除出行信息
 */
CarTravel.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/carTravel/delete", function (data) {
            Feng.success("删除成功!");
            CarTravel.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("carTravelId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询汽车出行信息列表
 */
CarTravel.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    CarTravel.carTravelTable.refresh({query: queryData});
};

/**
 * 设置userId
 */
CarTravel.setId = function () {
    var url = location.pathname;
    var index = url.lastIndexOf("\/");
    var id = url.substring(index + 1, url.length);
/*    var ul = '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li>';*/
    var ul = '<div class="f-items"><div class="info">静态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/userInfo_detail/' + id + '\'">基本信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userHeretics/detail/' + id + '\'">帮教信息</a></li></div>'
        + '<div class="f-items"><div class="info">涉邪信息</div><li ><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/involvingEvil/detail/' + id + '\'">涉邪信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/peopleInfo/detail/' + id + '\'">人口信息</a></li>'
        + '<li class="active"><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/carTravel/detail/' + id + '\'">出行信息</a></li></div>'
        + '<div class="f-items"><div class="info">动态信息</div><li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/controlInfo/detail/' + id + '\'">管控信息</a></li>'
        + '<li><a href="javascript:;" onclick="window.location.href = Feng.ctxPath + \'/userInfo/other_detail/' + id + '\'">其他信息</a></li></div>';
    $('#carTravelUserId').val(id);
    $('.tab-menu').append(ul);
};

BusTravel.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTimeBus").val();
    queryData['endTime'] = $("#endTimeBus").val();
    CarTravel.busTravelTable.refresh({query: queryData});
};

TrainTravel.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime1").val();
    queryData['endTime'] = $("#endTime1").val();
    CarTravel.TrainTravelTable.refresh({query: queryData});
};
PlainTravel.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime2").val();
    queryData['endTime'] = $("#endTime2").val();
    CarTravel.PlaneTravelTable.refresh({query: queryData});
};
ShipTravel.search = function () {
    var queryData = {};
    queryData['beginTimeBus'] = $("#beginTime3").val();
    queryData['endTimeBus'] = $("#endTime3").val();
    CarTravel.ShipTravelTable.refresh({query: queryData});
};

$(function () {
    CarTravel.setId();
    var PrivateColunms = CarTravel.initPrivateCarColumn();
    var CarTravelColunms = CarTravel.initCarColumn();
    var BusTravelColunms = CarTravel.initBusColumn();
    var TrainTravelColunms = CarTravel.initTrainColumn();
    var PlaneTravelColunms = CarTravel.initPlaneColumn();
    var ShipTravelColunms = CarTravel.initShipColumn();
    var privateTable = new BSTable(CarTravel.privateCarId, "/privateCar/list", PrivateColunms);
    var carTable = new BSTable(CarTravel.carTravelId, "/carTravel/findCarTravel", CarTravelColunms);
    var busTable = new BSTable(CarTravel.busTraveId, "/busTravel/findBusTravel", BusTravelColunms);
    var trainTable = new BSTable(CarTravel.TrainTravelId, "/carTravel/findCarTravel", TrainTravelColunms);//暂时
    var planeTable = new BSTable(CarTravel.PlaneTravelId, "/carTravel/findCarTravel", PlaneTravelColunms);//暂时
    var shipTable = new BSTable(CarTravel.ShipTravelId, "/carTravel/findCarTravel", ShipTravelColunms);//暂时
    privateTable.setPaginationType("client");
    carTable.setPaginationType("client");
    busTable.setPaginationType("client");
    trainTable.setPaginationType("client");
    planeTable.setPaginationType("client");
    shipTable.setPaginationType("client");
    privateTable.setQueryParams({privateCarUserId: $('#carTravelUserId').val()});
    carTable.setQueryParams({userId: $('#carTravelUserId').val(),carTravelType:1});
    busTable.setQueryParams({userId: $('#carTravelUserId').val()});
    trainTable.setQueryParams({userId: $('#carTravelUserId').val(),carTravelType:2});
    planeTable.setQueryParams({userId: $('#carTravelUserId').val(),carTravelType:3});
    shipTable.setQueryParams({userId: $('#carTravelUserId').val(),carTravelType:4});
    privateTable.setPageSize('5');
    carTable.setPageSize('5');
    busTable.setPageSize('5');
    trainTable.setPageSize('5');
    planeTable.setPageSize('5');
    shipTable.setPageSize('5');
    CarTravel.carTravelTable = carTable.init();
    CarTravel.busTravelTable = busTable.init();
    CarTravel.TrainTravelTable = trainTable.init();
    CarTravel.PlaneTravelTable = planeTable.init();
    CarTravel.ShipTravelTable = shipTable.init();
    CarTravel.PrivateTable = privateTable.init('GET');
});
