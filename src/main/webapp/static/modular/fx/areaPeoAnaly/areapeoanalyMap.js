/**
 * Created by Administrator on 2018/5/21 0021.
 */
/**
 * Created by Administrator on 2018/5/16 0016.
 */
var mapData = {
    tableId:"CultPeoTable",
    table:null,
};

/**
 * 初始化地图数据
 */
mapData.initMapData = function(queryData){
    var ajax = new $ax(Feng.ctxPath + "/areaPeoAnaly/findAreaPeo", function (data) {
        if(data== null || data == undefined || data ==""){
            Feng.info("暂无数据");
            return;
        }
        else{
            var info = data;
            mapData.panTo(info);
          //  setTimeout(function(){pages()},1000);
        }

    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    if(queryData !=null || queryData != "" || queryData != undefined){
        ajax.set(queryData);
    }
    ajax.start();
};
var map;
// 百度地图API功能
mapData.mapInit = function(){
    map = new BMap.Map("map_demo");    // 创建Map实例
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

    var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
    map.addControl(cr); //添加版权控件
    var bs = map.getBounds();   //返回地图可视区域
    cr.addCopyright({id: 1, content: "<a href='http://www.xiaoguo123.com/p/baidumap_offline_v21?baidumap' style='font-size:20px;background:yellow;margin-left:60px'></a>", bounds: bs});

//	layer.msg("欢迎使用离线地图API, 仅供学习交流!");
};

var content = "";
//定图定位
mapData.panTo = function(data){
    var opts={
        width:550,//信息窗口宽度height:100,//信息窗口高度
        height:500,
        isOpen:1,
        title:"详细信息",//信息窗口标题
        // enableMessage:true
    }
    var data_info = [];
    for(var i = 0;i < data.length; i++){
        var myIcon = "";
        var marker = "";
        var infoWindow1 = "";
        content = "";
        marker = "";
        infoWindow1 = "";
        if(data[i].location == "" || data[i].location == undefined || data[i].location == null){
            continue;
        }
        else{
            marker = new BMap.Point(data[i].location.split(',')[0],data[i].location.split(',')[1]);
        }
        var labelContent = data[i].gridman_name;
        content = " <div class='sub-title clearfix'><div class='sub-title-line'></div><div class='sub-title-name'>网格员信息</div>"+
            " </div><div class='f_totalContent'><div class='f_peopleInfo'>" +
            "<p><span>网格员姓名：</span><span>"+data[i].gridman_name+"</span></p></div></div><div></div><div class='sub-title clearfix' style='clear:both'><div class='sub-title-line'></div><div class='sub-title-name'>负责邪教人员（"+data[i].gridman_ids+"）</div>" +
              "</div><div style='clear:both;margin-top:-10px;' id='histroyBox'><table id='CultPeoTable' data-mobile-responsive='true' data-click-to-select='true'>"+
            "<thead>"+
       " <tr>"+
       " <th data-field='selectItem' data-checkbox='true'></th>"+
            "</tr>"+
           "</thead>"+
            "</table>";

        marker2 = new BMap.Marker(marker,{icon:myIcon});  // 创建标注
        var label = new BMap.Label(labelContent,{"offset":new BMap.Size(10, 30)});
        marker2.setLabel(label);
        label.setStyle({
            borderColor:"#fff",
            color:"#333",
            textAlign:"center",
            lineHeight:"30px",
            cursor:"pointer",
            width:"60px",
            position:"absolute",
            height:"30px",
            bottom:"30px!important",
        });
        map.addOverlay(marker2);
        var new_point = new BMap.Point(data[0].location.split(',')[0],data[0].location.split(',')[1]);
        map.panTo(new_point);
        mapData.findEvilList(data[i].gridman_id);
        addClickHandler(content,marker2,data[i].gridman_id);

    }

    function addClickHandler(content,marker,id){
        marker.addEventListener("click",function(e){
            openInfo(content,e);
            setTimeout(function(){
                mapData.findGridOfCultPeo(id);
            },50);
        }
        );
        label.addEventListener("click",function(e){
            openInfo(content,e);
                setTimeout(function(){
                    mapData.findGridOfCultPeo(id);
                },50);
        }
        );
    }
    function openInfo(content,e){
        var p = e.target;
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    }

};


/**
 * 负责邪教人员
 */
var total;
mapData.findGridOfCultPeo = function(id){
     var defaultColunms = mapData.initColumn();
     var table = new BSTable(mapData.tableId, "/areaPeoAnaly/findGridOfCultPeo?gridmanId=" + id, defaultColunms);
     table.setPageSize('3');
     mapData.table = table.init();
};


mapData.findEvilList = function(id){
    content += "<div class='sub-title clearfix'><p class='sub-title-line'></p><p class='sub-title-name'>巡防记录</p>"+
        " </div><div style='clear:both' class='openList'><button onclick='mapData.openDetail(id)' id='lookRecord' data-id="+id+">查看巡防记录</button></div>";
};

mapData.openDetail = function(id){
    layer.open({
        type: 2,
        title:'回访帮教记录',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: false,
        content:  Feng.ctxPath + '/areaPeoAnaly/trackDetail '
    });
}

/**
 * 初始化负责邪教人员表格的列
 */
mapData.initColumn = function () {
    return [
        {field: 'selectItem', visible: false, radio: false, checkbox: false},
        {title: '姓名', field: 'name', visible: true, align: 'center', valign: 'middle'},
        {title: '监控级别', field: 'monitorLevel', visible: true, align: 'center', valign: 'middle'},
        {title: '邪教类别', field: 'cultType', visible: true, align: 'center', valign: 'middle'},
        {title: '常住地址', field: 'presentResident', visible: true, align: 'center', valign: 'middle'},
    ];
};


/**
 * 查询网格员列表
 */
mapData.search = function () {
    var queryData = {};
    queryData['street'] = $("#userInfoRegion").val();
    queryData['name'] = $("#userInfoName").val();
    queryData['card'] = $("#userInfoCard").val();
    queryData['beginTime'] = $("#beginTime").val();
    queryData['endTime'] = $("#endTime").val();
    mapData.mapInit();
    mapData.initMapData(queryData);

};

//判断页面是否加载完成
document.onreadystatechange = function () {
    if(document.readyState=="interactive") {
        layer.msg('加载中', {
            icon: 16
            ,shade: 0.01
        });
    }
    if(document.readyState=="complete"){
        layer.closeAll('loading');
        $(function(){
            mapData.mapInit();
            mapData.initMapData();
        })
    }
}

$("#userInfoRegion").val("郫筒街道");