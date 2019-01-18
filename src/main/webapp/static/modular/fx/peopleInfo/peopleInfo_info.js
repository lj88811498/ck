/**
 * 初始化人口信息详情对话框
 */
var PeopleInfoInfoDlg = {
    peopleInfoInfoData : {}
};

/**
 * 清除数据
 */
PeopleInfoInfoDlg.clearData = function() {
    this.peopleInfoInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PeopleInfoInfoDlg.set = function(key, val) {
    this.peopleInfoInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
PeopleInfoInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
PeopleInfoInfoDlg.close = function() {
    parent.layer.close(window.parent.PeopleInfo.layerIndex);
}

/**
 * 收集数据
 */
PeopleInfoInfoDlg.collectData = function() {
    this.set("peopleInfoUserId")
        .set("peopleInfoName")
        .set("peopleInfoId")
        .set("peopleInfoStreetName")
        .set("peopleInfoCardType")
        .set("peopleInfoCardCode")
        .set("peopleInfoMonitor")
        .set("peopleInfoFamilyCode")
        .set("peopleInfoHouseCode")
        .set("peopleInfoArea")
        .set("peopleInfoHomeType")
        .set("peopleInfoAdress")
};

/**
 * 提交添加
 */
PeopleInfoInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/peopleInfo/add", function(data){
        Feng.success("添加成功!");
        // window.parent.PeopleInfo.table.refresh();

        PeopleInfoInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.peopleInfoInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
PeopleInfoInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/peopleInfo/update", function(data){
        Feng.success("修改成功!");
        // window.parent.PeopleInfo.table.refresh();
        window.parent.PeopleInfo.reloadUserInfoDetail(PeopleInfoInfoDlg.peopleInfoInfoData);
        PeopleInfoInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.peopleInfoInfoData);
    ajax.start();
}


/**
 * 查询街道
 */
PeopleInfoInfoDlg.streetInfo = function(){
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/street/list", function(data){
        var street = data.page;
        var strStreet = "";
        for(var j = 0; j < street.length; j++){
            strStreet += "<option value="+street[j]+">"+street[j]+"</option>"
        }
        $("#peopleInfoStreetName").append(strStreet);
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    // ajax.set(this.peopleInfoInfoData);
    ajax.start('GET');
};

/**
 * 街道信息change
 */
PeopleInfoInfoDlg.change = function(val){
    $("#peopleInfoAdress").val(val);
};


$(function() {
    PeopleInfoInfoDlg.streetInfo();
    $("#peopleInfoUserId").val(window.parent.$('#userInfoId').val());
});
