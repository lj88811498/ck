/**
 * 初始化网格员详情对话框
 */
var GridmanInfoDlg = {
    gridmanInfoData : {}
};

/**
 * 清除数据
 */
GridmanInfoDlg.clearData = function() {
    this.gridmanInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanInfoDlg.set = function(key, val) {
    this.gridmanInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
GridmanInfoDlg.close = function() {
    parent.layer.close(window.parent.Gridman.layerIndex);
}

/**
 * 获取所属社区和所属网格
 */
GridmanInfoDlg.gridCoordinateName = function(name,value){
    var ajax = new $ax(Feng.ctxPath + "/gridman/findChildByGridCoordinateName", function(data){
       var record = data.page.records;
       var str = "";
       for(var i = 0; i < record.length; i++){
           str += '<option value='+record[i].gridCoordinateName+'>'+record[i].gridCoordinateName+'</option>'
       }
       if(name == '街道'){
           $("#gridmanArea").html("");
           $("#gridmanArea").append(str);
           var ajax = new $ax(Feng.ctxPath + "/gridman/findChildByGridCoordinateName", function(data1){
               var recordGrid = data1.page.records;
               var strGrid = "";
               for(var j = 0; j < recordGrid.length; j++){
                   strGrid += '<option value='+recordGrid[j].gridCoordinateName+'>'+recordGrid[j].gridCoordinateName+'</option>'
               }
              $("#gridmanGrid").html("");
               $("#gridmanGrid").append(strGrid);
           },function(data){
               Feng.error("添加失败!" + data.responseJSON.message + "!");
           });
           ajax.set("gridCoordinateName",$("#gridmanArea").val());
           ajax.start('get');
       };
       if(name == '社区'){
           $("#gridmanGrid").html("");
           $("#gridmanGrid").append(str);
       }
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set("gridCoordinateName",value);
    ajax.start('get');
};


/**
 * 收集数据
 */
GridmanInfoDlg.collectData = function() {
    this.set("gridmanId")
        .set("gridmanStreet")
        .set("gridmanArea")
        .set("gridmanGrid")
        .set("gridmanName")
        .set("gridmanAddr")
        .set("gridmanCard")
        .set("gridmanTel")
        // .set("gridmanIds")
}

/**
 * 提交添加
 */
GridmanInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/gridman/add", function(data){
        Feng.success("添加成功!");
        window.parent.Gridman.table.refresh();
        GridmanInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.gridmanInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
GridmanInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();
    var id = $("#gridmanId").val();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/gridman/update", function(data){
        Feng.success("修改成功!");
        window.parent.Gridman.table.refresh();
        GridmanInfoDlg.close();
    },function(data){
        Feng.error("修改失败!");
    });
    ajax.set(this.gridmanInfoData);
    ajax.start();
}


/**
 * 初始化查询条件
 */
GridmanInfoDlg.init = function () {
    var ajax = new $ax(Feng.ctxPath + "/gridman/list/", function (data) {
        var strStreet = "";
        var street = data.street;
        for(var j = 0; j < street.length; j++){
            strStreet += "<option value="+street[j]+">"+street[j]+"</option>"
        }
      //  $("#gridmanStreet").html(strStreet);
    }, function (data) {
        Feng.error("查询失败!" + data.responseJSON.message + "!");
    });
    // ajax.set("gridmanId",this.seItem.id);
    ajax.start('get');
}

$(function() {
   // GridmanInfoDlg.init();
});
