/**
 * Created by Administrator on 2018/5/23 0023.
 */
/**
 * 初始化网格员详情对话框
 */
var GridmanPersonInfoDlg = {
    gridmanInfoData : {}
};

/**
 * 清除数据
 */
GridmanPersonInfoDlg.clearData = function() {
    this.gridmanInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanPersonInfoDlg.set = function(key, val) {
    this.gridmanInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
GridmanPersonInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
GridmanPersonInfoDlg.close = function() {
    parent.layer.close(window.parent.Gridman.layerIndex);
}

/**
 * 收集数据
 */
GridmanPersonInfoDlg.collectData = function() {
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
GridmanPersonInfoDlg.addSubmit = function() {

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
 * 人员姓名搜索
 */
GridmanPersonInfoDlg.search = function(){
    var gridmanName = $("#gridmanName").val();
    GridmanPersonInfoDlg.initPerson(gridmanName);
};


/**
 * 提交修改
 */
GridmanPersonInfoDlg.editSubmit = function() {
    var ids = "";
    $("input[name='invillingPerson']:checked").each(function (index,element){
        ids += $(this).data('id')+',';
    });
    ids = ids.substring(0,ids.length-1);
    var gridmanId = window.parent.$("#personId").val();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/gridman/batchInsertUserGrid?gridmanId="+ gridmanId + "&userInfoId=" + ids, function(data){
        Feng.success("修改成功!");
      //  window.parent.Gridman.table.refresh();
        GridmanPersonInfoDlg.close();
    },function(data){
        Feng.error("修改失败!");
    });
    ajax.start();
}

/**
 * 初始化列表人员
 */
GridmanPersonInfoDlg.initPerson = function(userInfoName){
    var personId = window.parent.$("#personId").val();
    var str;
    str = "";
    var usersId =  [];
    $("#user-content").empty();
    var ajax = new $ax(Feng.ctxPath + "/userInfo/findUserByName", function(data){
        var info =data.page.records;
        for(var i = 0; i < info.length; i++) {
            usersId.push({user_info_id:info[i].user_info_id,isTrue:0,user_info_card:info[i].user_info_card,user_info_name:info[i].user_info_name});
        }
        for(var j = 0; j < usersId.length; j++){
            for(var i = 0; i < data.users.length; i++){
                if(data.users[i] == usersId[j].user_info_id){
                    usersId[j].isTrue = 1;
                }
            }

        }
        for(var i = 0; i < usersId.length; i++){
             if(usersId[i].isTrue == '1'){
                 str += "<li class='active'><input type='checkbox' checked data-id="+usersId[i].user_info_id+" name='invillingPerson'><span>"+usersId[i].user_info_name+"</span>--<span>"+usersId[i].user_info_card+"</span></li>"
             }
             else if( data.usersHadRelation.indexOf(usersId[i].user_info_id )>-1){
                 str += "<li id='readOnly1' class='li-disable'><input type='checkbox' data-id="+usersId[i].user_info_id+" name='invillingPerson' disabled><span>"+usersId[i].user_info_name+"</span>--<span>"+usersId[i].user_info_card+"</span></li>"
             }else {
                 str += "<li><input type='checkbox' data-id="+usersId[i].user_info_id+" name='invillingPerson' ><span>"+usersId[i].user_info_name+"</span>--<span>"+usersId[i].user_info_card+"</span></li>"
             }
        }
        $("#user-content").append(str);
    },function(data){
        Feng.error("调用失败!");
    });
    if(userInfoName != null || userInfoName != "" || userInfoName != undefined){
        ajax.set("userInfoName",userInfoName);
    }
    ajax.set("gridmanId",personId);
    ajax.start('get');
}


$(function() {
   var personId = window.parent.$("#personId").val();
    GridmanPersonInfoDlg.initPerson();

    // 多选框加active
    $(".gridman-userList ul li").click(function() {
        $(this).toggleClass("active");
        if($(this).hasClass("active")){
            $(this).children().prop("checked", "checked");
        }else{
            $(this).children().removeAttr("checked");
            // $(this).children().css("color","#35a6d6");
        }
    });
    //$("#readOnly1").unbind('click');
});
