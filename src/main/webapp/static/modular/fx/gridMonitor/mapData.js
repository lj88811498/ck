/**
 * Created by Administrator on 2018/5/16 0016.
 */
var mapData = {

};

/**
 * 初始化地图数据
 */
mapData.initMapData = function(queryData){
    var ajax = new $ax(Feng.ctxPath + "/gridMonitor/userList", function (data) {
        if(data.page.records == null || data.page.records == undefined || data.page.records ==""){
           Feng.info("暂无数据");
        }
        else{
            var info = data.page.records;
            mapData.panTo(info);
        }

    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    if(queryData !=null || queryData != "" || queryData != undefined){
        ajax.set(queryData);
    }
    ajax.start('get');
};
var map;
// 百度地图API功能
mapData.mapInit = function(){
    map = new BMap.Map("map_demo");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(103.86, 30.80), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("郫都区");          // 设置地图中心显示的城市 new！
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());   //缩放按钮
    map.addControl(new BMap.MapTypeControl( {mapTypes: [BMAP_HYBRID_MAP,BMAP_NORMAL_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持

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


//定图定位
mapData.panTo = function(data){
    var opts={
        width:550,//信息窗口宽度height:100,//信息窗口高度
        height:0,
        isOpen:1,
        title:"详细信息",//信息窗口标题
        // enableMessage:true
    }
    var data_info = [];
    for(var i = 0;i < data.length; i++){
        data_info.push([data[i].streetLongitude,data[i].streetLatitude,data[i].userInfoName,data[i].involvingEvilMonitorLevel]);
        var myIcon = "";
        var marker = "";
        var content = "";
        var infoWindow1 = "";
        content = "";
        marker = "";
        infoWindow1 = "";
        marker = new BMap.Point(data[i].streetLongitude,data[i].streetLatitude);
        var labelContent = data[i].userInfoName;
        if(data[i].gridmanName == undefined || data[i].gridmanName == "" || data[i].gridmanName == null){
            data[i].gridmanName = '无'
        }
        if(data[i].gridmanTel == undefined || data[i].gridmanTel == "" || data[i].gridmanTel == null){
            data[i].gridmanTel = '无'
        }

        content = "<div class='f_totalContent'><div class='f_peopleInfo'>" +
            "<p><span>姓名：</span><span>"+data[i].userInfoName+"</span></p>" +
            "<p><span>性别：</span><span>"+data[i].userInfoSex+"</span></p>" +
            "<p><span>身份证：</span><span>"+data[i].userInfoCard+"</span></p></div>" +
            "<div class='f_peopleInfo'>" +
            "<p><span>职业：</span><span>"+data[i].userInfoOccupation+"</span></p>" +
            "<p><span>联系方式：</span><span>"+data[i].userInfoTel+"</span></p>" +
            "</div>" +
            "<div class='f_peopleInfo'>" +
            "<p><span>户籍所在地：</span><span>"+data[i].userInfoRegisterResident+"</span></p>" +
            "</div>" +
            "<div class='f_peopleInfo'>" +
            "<p><span>现居住地：</span><span>"+data[i].userInfoPresentResident+"</span></p>" +
            "</div>" +
            "<div class='f_peopleInfo'>" +
            "<p><span>邪教类别：</span><span>"+data[i].involvingEvilType+"</span></p>" +
            "<p><span>监控级别：</span><span>"+data[i].userInfoMonitorLevel+"</span></p>" +
            "</div>" +
            "<div class='f_peopleInfo'>" +
            "<p><span>负责网格员：</span><span>"+data[i].gridmanName+"</span></p>" +
            "<p><span>联系方式：</span><span>"+data[i].gridmanTel+"</span></p>" +
            "</div>" +
            "<div class='f_peopleInfo'>" +
            "<button onclick='mapData.returnRecord("+data[i].userInfoId+")' id='returnRecord' data-id="+data[i].userInfoId+">回访帮教谈话记录</button>" +
            "<button onclick='mapData.returnInvolving("+data[i].userInfoId+")' id='returnInvolving' data-id="+data[i].userInfoId+">处理涉邪教案件</button></div></div>";
        if(data[i].userInfoMonitorLevel == "已解脱"){
            myIcon = new BMap.Icon("../../../static/img/1.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
        if(data[i].userInfoMonitorLevel == "不放心人员"){
            myIcon = new BMap.Icon("../../../static/img/3.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
        if(data[i].userInfoMonitorLevel == "一般人员"){
            myIcon = new BMap.Icon("../../../static/img/2.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
        if(data[i].userInfoMonitorLevel == "重点人员3级"){
            myIcon = new BMap.Icon("../../../static/img/5.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
        if(data[i].userInfoMonitorLevel == "重点人员2级"){
            myIcon = new BMap.Icon("../../../static/img/4.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
        if(data[i].userInfoMonitorLevel == "重点人员1级"){
            myIcon = new BMap.Icon("../../../static/img/6.png", new BMap.Size(50,100),{anchor: new BMap.Size(10, 30)});  //定义自己的标注
        }
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
        var new_point = new BMap.Point(data[0].streetLongitude,data[0].streetLatitude);
        map.panTo(new_point);
        addClickHandler(content,marker2);
    }
    function addClickHandler(content,marker){
        marker.addEventListener("click",function(e){
            openInfo(content,e)}
        );
        label.addEventListener("click",function(e){
            openInfo(content,e)}
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
 * 回访帮教谈话记录
 */
mapData.returnRecord = function(id){
    layer.open({
        type: 2,
        title:'回访帮教谈话记录',
        area: ['620px', '350px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/gridMonitor/heretics_record/ ' +id
    });

};


/**
 * 处理涉邪案件
 */
mapData.returnInvolving = function(id){
    layer.open({
        type: 2,
        title:'处理涉邪教案件',
        area: ['620px', '350px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content:Feng.ctxPath + '/gridMonitor/involving_evil/ ' +id
    });

};



$(function(){

    // loadJsAsync();
    mapData.mapInit();
    mapData.initMapData();

})