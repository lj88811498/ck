/**
 * 初始化组织架构详情对话框
 */
var OrganizationInfoDlg = {
    organizationInfoData : {},
    zTreeInstance : null,
    validateField:{
        organizationName: {
            validators: {
                notEmpty: {
                    message: '机构名称不能为空'
                },
            }
        },
    }
};

/**
 * 清除数据
 */
OrganizationInfoDlg.clearData = function() {
    this.organizationInfoData = {};
}
0
/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OrganizationInfoDlg.set = function(key, val) {
    this.organizationInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
OrganizationInfoDlg.get = function(key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
OrganizationInfoDlg.close = function() {
    parent.layer.close(window.parent.UserOrg.layerIndex);
}

/**
 * 收集数据
 */
OrganizationInfoDlg.collectData = function() {
    this.set("organizationId")
        .set("organizationPid")
        .set("organizationName")
        .set("organizationStatus")
}


/**验证机构名称是否为空
 */
OrganizationInfoDlg.validate1 = function () {
    $('#organizeInfoForm').data("bootstrapValidator").resetForm();
    $('#organizeInfoForm').bootstrapValidator('validate');
    return $("#organizeInfoForm").data('bootstrapValidator').isValid();
};


/**
 * 提交添加
 */
OrganizationInfoDlg.addSubmit = function() {
    if (!this.validate1()) {
        return;
    }
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/organization/add", function(data){
        Feng.success("添加成功!");
        window.parent.UserOrg.table.refresh();
        OrganizationInfoDlg.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.organizationInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
OrganizationInfoDlg.editSubmit = function() {
    if (!this.validate1()) {
        return;
    }
    this.clearData();
    this.collectData();

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/organization/update", function(data){
        Feng.success("修改成功!");
        window.parent.UserOrg.table.refresh();
        OrganizationInfoDlg.close();
    },function(data){
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.organizationInfoData);
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
OrganizationInfoDlg.onClickDept = function(e, treeId, treeNode) {
    $("#organizationPname").val(OrganizationInfoDlg.zTreeInstance.getSelectedVal());
    $("#organizationPid").attr("value", treeNode.id);
}




/**
 * 显示部门选择的树
 *
 * @returns
 */
OrganizationInfoDlg.showDeptSelectTree = function() {
    var pName = $("#organizationPname");
    var pNameOffset = $("#organizationPid").offset();
    $("#parentOrgMenu").css({
        left : pNameOffset.left + parseInt(233)+"px",
        top : pNameOffset.top + pName.outerHeight() +parseInt(52)+ "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}


/**
 * 隐藏部门选择的树
 */
OrganizationInfoDlg.hideDeptSelectTree = function() {
    $("#parentOrgMenu").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
}


function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "parentOrgMenu" || $(
            event.target).parents("#parentOrgMenu").length > 0)) {
        OrganizationInfoDlg.hideDeptSelectTree();
    }
}

///organization/OrgList /dept/tree
$(function() {
    var ztree = new $ZTreeCC("parentOrgMenuTree", "/organization/OrgList");
    ztree.bindOnClick(OrganizationInfoDlg.onClickDept);
    ztree.init();
    OrganizationInfoDlg.zTreeInstance = ztree;
    Feng.initValidator("organizeInfoForm", OrganizationInfoDlg.validateField);
});
