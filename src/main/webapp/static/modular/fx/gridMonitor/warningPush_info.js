/**
 * 初始化预警建议详情对话框
 */
var WarningAdviseInfoDlg = {
    warningAdviseInfoData : {}
};

/**
 * 清除数据
 */
WarningAdviseInfoDlg.clearData = function() {
    this.warningAdviseInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningAdviseInfoDlg.set = function(key, val) {
    this.warningAdviseInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
WarningAdviseInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
WarningAdviseInfoDlg.close = function() {
    parent.layer.close(window.parent.WarningAdvise.layerIndex);
}

/**
 * 收集数据
 */
WarningAdviseInfoDlg.collectData = function() {
    this
}

/**
 * 提交添加
 */
WarningAdviseInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningAdvise/add", function(data){
        Feng.success("添加成功!");
        window.parent.WarningAdvise.table.refresh();
        WarningAdviseInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningAdviseInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
WarningAdviseInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/warningAdvise/update", function(data){
        Feng.success("修改成功!");
        window.parent.WarningAdvise.table.refresh();
        WarningAdviseInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.warningAdviseInfoData);
    ajax.start();
}

/**
 * 初始化基本信息
 */
WarningAdviseInfoDlg.initBaseInfo = function(){
    //提交信息
    var userInfoId = $("#userInfoId").val();
    var ajax = new $ax(Feng.ctxPath + "/warning/warningUserDetail", function(data){
     if(data.code == '0'){
         var user = data.user;
         var subjects = data.subjects;
         var streetLongitude = user.streetLongitude; //经度
         var streetLatitude = user.streetLatitude; //纬度
         var userInfoName = user.userInfoName;
         var warningAdviseClass = user.warningAdviseClass;
         var warningAdviseOperation = user.warningAdviseOperation;
         WarningAdviseInfoDlg.baseInfo(user);
         WarningAdviseInfoDlg.warningReason(subjects);
         WarningAdviseInfoDlg.panTo(streetLongitude,streetLatitude,userInfoName);
         WarningAdviseInfoDlg.recommendedMeasure(warningAdviseClass,warningAdviseOperation);
     }
    },function(data){
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    ajax.set("userInfoId",userInfoId);
    ajax.start('get');
};
//初始化防控原因
WarningAdviseInfoDlg.initPreventControlInfo =function () {
    var str = "";
    var userInfoId = $("#userInfoId").val();
    var ajax = new $ax(Feng.ctxPath + "/preventControl/selectPreventControlById",function (data) {

            for(var i = 0; i < data.length; i++){
                var newSubjects =data[i].prevent_control_desc;
                console.log(data[i].subject);
                str += "<li ><span class='info_name'>"+data[i].subject+":</span><span class='info_info'>"+newSubjects+"</span></li>"
            }
            $("#PreventwarningReason ul").html(str);


    },function(data){
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    })
    ajax.set("userId",userInfoId);
    ajax.start('get');
};

/**
 * 基本信息赋值
 */
WarningAdviseInfoDlg.baseInfo = function(user)
{
    console.info(user)
    var warningAdviseClass = user.warningAdviseClass;
    $("#userInfoImgUrl").attr("avatarImg",user.userInfoImgUrl);
    $("#infoTypeLeft li").eq(0).html(warningAdviseClass);//暂时的，没字段
    $("#infoTypeLeft li").eq(1).html("监控级别:"+user.userInfoMonitorLevel);
    $("#infoTypeLeft li").eq(2).html("风险度:"+user.subjectGrade);
    $("#infoTypeLeft li").eq(3).html(user.involvingEvilType);
    $("#infoTypeLeft li").eq(4).html("防控等级:"+user.userInfoPreventControl);
    //$("#infoTypeRight span").html(user.subjectGrade);
    $("#userInfoName").html(user.userInfoName);
    $("#userInfoSex").html(user.userInfoSex);
    $("#userInfoAge").html(user.userInfoAge);
    $("#userInfoCard").html(user.userInfoCard);
    $("#userInfoBirthday").html(user.userInfoBirthday);
    $("#userInfoNamePolicalStatus").html(user.userInfoNamePolicalStatus);
    $("#userInfoNationality").html(user.userInfoNationality);
    $("#userInfoFlag").html(user.userInfoFlag);
    $("#userInfoEducation").html(user.userInfoEducation);
    $("#userInfoNameMaritalStatus").html(user.userInfoNameMaritalStatus);
    $("#userInfoTel").html(user.userInfoTel);
    $("#userInfoMonitorLevel").html(user.userInfoMonitorLevel);
    $("#userInfoRegisterResident").html(user.userInfoRegisterResident);
    $("#userInfoPresentResident").html(user.userInfoPresentResident);
    $("#userInfoOccupation").html(user.userInfoOccupation);
    $("#userInfoWorkplace").html(user.userInfoWorkplace);
    $("#userInfoContrStatus").html(user.userInfoContrStatus);
    $("#userInfoRemarks").html(user.userInfoRemarks);
}

/**
 * 预警原因赋值
 */
WarningAdviseInfoDlg.warningReason = function(subjects){
    var str = "";
    if(subjects.length == 0){
        $("#warningReason").html("暂无原因");
    }
    else{

        var num = 0;
        for(var i = 0; i < subjects.length; i++){
            num = parseInt(i)+ parseInt(1);
            var newSubjects = subjects[i].subjectName.substr(1);
            str += "<p data-subjectId='"+subjects[i].subjectId+"'>"+num+""+newSubjects+"</p>"
        }
        $("#warningReason").html(str);
    }

};


/**
 * 地图显示
 */
var map;
// 百度地图API功能
WarningAdviseInfoDlg.mapInit = function(){
    map = new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(103.86, 30.80), 15);  // 初始化地图,设置中心点坐标和地图级别
    map.setCurrentCity("郫都区");          // 设置地图中心显示的城市 new！
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());   //缩放按钮
    map.addControl(new BMap.MapTypeControl( {mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持
    map.setMapType(BMAP_HYBRID_MAP); //设置地图默认显示卫星地图

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
WarningAdviseInfoDlg.panTo = function(streetLongitude,streetLatitude,userInfoName){
    var marker = "";
    var myIcon = "";
    marker = new BMap.Point(streetLongitude,streetLatitude);
   marker2 = new BMap.Marker(marker,{icon:myIcon});  // 创建标注
    var labelContent = userInfoName;
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
        // var new_point = new BMap.Point(data[0].location.split(',')[0],data[0].location.split(',')[1]);
        map.panTo(marker);



};

//建议措施
WarningAdviseInfoDlg.recommendedMeasure = function(warningAdviseClass,warningAdviseOperation){
    if(warningAdviseClass == undefined || warningAdviseClass == "" || warningAdviseClass ==null){
        $("#recommendedMeasure").html("<p>暂无建议措施</p>");
    }
    else{
        var operation = [];
        operation = warningAdviseOperation.split("；");
        var str = "";
        for(var i = 0 ;i < operation.length; i++){
            str += "<p>"+operation[i]+"</p>";
        }
        $("#recommendedMeasure").html("<p class='recommendedMeasureClass'>"+warningAdviseClass+"</p>"+str);
    }

}

$(function() {
    WarningAdviseInfoDlg.mapInit();
    WarningAdviseInfoDlg.initBaseInfo();
    WarningAdviseInfoDlg.initPreventControlInfo();

});
