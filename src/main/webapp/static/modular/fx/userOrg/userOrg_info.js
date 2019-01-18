/**
 * 初始化用户组织详情对话框
 */
var UserOrgInfoDlg = {
    userOrgInfoData : {},
    zTreeInstance:""
};

/**
 * 清除数据
 */
UserOrgInfoDlg.clearData = function() {
    this.userOrgInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserOrgInfoDlg.set = function(key, val) {
    this.userOrgInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
UserOrgInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
UserOrgInfoDlg.close = function() {
    parent.layer.close(window.parent.UserOrg.layerIndex);
}

/**
 * 收集数据
 */
UserOrgInfoDlg.collectData = function() {
    this.set("userOrgName")
        .set("userOrgTel")
        .set("userOrgWork")
        .set("userOrgId")
        .set("userOrgOrganizationId")
        .set("userOrgOrganizationName");
}

/**
 * 提交添加
 */
UserOrgInfoDlg.addSubmit = function() {

    this.clearData();
    this.collectData();
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userOrg/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserOrg.table1.refresh();
        UserOrgInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userOrgInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
UserOrgInfoDlg.editSubmit = function() {

    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/userOrg/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserOrg.table1.refresh();
        UserOrgInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.userOrgInfoData);
    ajax.start();
}


    /**
    * 点击部门ztree列表的选项时
    *
    * @param e
* @param treeId
* @param treeNode
* @returns
*/
    UserOrgInfoDlg.onClickDept = function(e, treeId, treeNode) {
   // $("#userOrgPname").attr("value", UserOrgInfoDlg.zTreeInstance.getSelectedVal());
        $("#userOrgPname").val(UserOrgInfoDlg.zTreeInstance.getSelectedVal());
    $("#userOrgOrganizationId").attr("value", treeNode.id);
    $("#userOrgOrganizationName").attr("value", treeNode.name);
};




/**
 * 显示部门选择的树
 *
 * @returns
 */
UserOrgInfoDlg.showDeptSelectTree = function() {
    var pName = $("#userOrgPname");
    var pNameOffset = $("#userOrgOrganizationId").offset();
    $("#parentUserOrgMenu").css({
        left : pNameOffset.left + parseInt(233)+"px",
        top : pNameOffset.top + pName.outerHeight() +parseInt(95)+ "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}


/**
 * 隐藏部门选择的树
 */
UserOrgInfoDlg.hideDeptSelectTree = function() {
    $("#parentUserOrgMenu").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
}


function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "parentUserOrgMenu" || $(
            event.target).parents("#parentUserOrgMenu").length > 0)) {
        UserOrgInfoDlg.hideDeptSelectTree();
    }
}


/**
 * 通过userOrgOrganizationId查找对应的组织机构的名字
 */
UserOrgInfoDlg.findUserOrgPname = function (id) {
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/organization/OrgList", function(data){
       var result = data.page.records;
       for(var i = 0; i < result.length; i++){
           if(id == result[i].organizationId){
               $("#userOrgPname").val(result[i].organizationName);
           }
       }
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.start('get');
};

$(function() {
    var ztree = new $ZTreeCC("parentUserOrgMenuTree", "/organization/OrgList");
    ztree.bindOnClick(UserOrgInfoDlg.onClickDept);
    ztree.init();
    UserOrgInfoDlg.zTreeInstance = ztree;
    UserOrgInfoDlg.findUserOrgPname($("#userOrgOrganizationId").val());
});
