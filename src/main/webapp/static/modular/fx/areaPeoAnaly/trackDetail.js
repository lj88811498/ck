/**
 * Created by Administrator on 2018/5/22 0022.
 */
/**
 * 初始化涉邪信息详情对话框
 */
var trackDetail= {
    id:"trackDetailTable",
    table:null,
    involvingEvilInfoData : {},
    involvingEvilInfoAddData:{}
};


/**
 * 表格行操作
 */
trackDetail.operateFormatter = function (value, row, index) {
    var result = "";
    var position1 = row.position;
    result += "<button type='button' class='btn btn-info nocolor-btn' onclick='trackDetail.showTrail("+JSON.stringify(position1)+")'>显示地图</button>";
    return [result].join('');
};

/**
 * 初始化表格的列
 */
trackDetail.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '开始时间', field: 'beginTime', visible: true, align: 'center', valign: 'middle'},
        {title: '结束时间', field: 'endTime', visible: true, align: 'center', valign: 'middle'},
        {title: '巡防内容', field: 'content', visible: true, align: 'center', valign: 'middle'},
        {title: '轨迹地图显示', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: trackDetail.operateFormatter, width: '20%'}
    ];
};

/**
 * 查询帮教信息列表
 */
trackDetail.search = function () {
    var queryData = {};
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    MonitorUserHeretics.table.refresh({query: queryData});
};

var map;
// 百度地图API功能
trackDetail.mapInit = function(){
    map = new BMap.Map("track_map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(103.86, 30.80), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("郫都区");          // 设置地图中心显示的城市 new！
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());   //缩放按钮
    map.addControl(new BMap.MapTypeControl( {mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持

    map.setMapType(BMAP_HYBRID_MAP);
    //监听地图缩放
    map.addEventListener("zoomend", function(){
        <!-- if( this.getZoom() > 15 ) { -->
        <!-- layer.msg("默认只有15级地图, 超过无法显示");  -->
        <!-- }  -->
    });

   // var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
   // map.addControl(cr); //添加版权控件
    //var bs = map.getBounds();   //返回地图可视区域
    //cr.addCopyright({id: 1, content: "<a href='http://www.xiaoguo123.com/p/baidumap_offline_v21?baidumap' style='font-size:20px;background:yellow;margin-left:60px'></a>", bounds: bs});

//	layer.msg("欢迎使用离线地图API, 仅供学习交流!");
};


/**
 * 显示地图轨迹
 */
trackDetail.showTrail = function(position){
    var dots = [];
    var polyline;
    map.clearOverlays();//删除折线
    for(var i = 0; i < position.length; i++){
        dots.push( new BMap.Point(position[i].jd,position[i].wd));
    }
    polyline = new BMap.Polyline(dots, {strokeColor:"#21b9bb", strokeWeight:4, strokeOpacity:1});   //创建折线
    map.addOverlay(polyline);          //增加折线
    map.panTo(dots[0]);

    //polyline.addEventListener("click",overlay_style);
};

$(function () {
    trackDetail.mapInit();
    var userId = window.parent.$("#lookRecord").data('id');
    var defaultColunms = trackDetail.initColumn();
    var table = new BSTable(trackDetail.id, "/areaPeoAnaly/findEvilList?gridmanId=" + userId, defaultColunms);
    table.setPaginationType("client");
    table.setPageSize('5');
    trackDetail.table = table.init();

});