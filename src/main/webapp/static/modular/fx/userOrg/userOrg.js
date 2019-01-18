/**
 * 用户组织管理初始化
 */
var UserOrg = {
    id: "UserOrgListTable",	//表格id
    otherId:"UserOrgOtherTable",
    seItem: null,		//选中的条目
    table: null,
    table1:null,
    layerIndex: -1,
    zTreeInstance:null,
    parentOrganizationName:"",
    parentOrganizationPid:"",

};

/**
 * 初始化表格的列
 */
UserOrg.initColumn = function () {
    return [
        {field: 'selectItem', radio: false,visible:false},
        {title: 'id', field: 'organizationId', align: 'center',visible: false, valign: 'middle',width:'50px'},
        {title: '机构名称', field: 'organizationName', align: 'center', visible: true,valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', visible: true,valign: 'middle',formatter: UserOrg.operateFormatter},

    ];
};


/**
 * 初始化组织架构表格的列
 */
UserOrg.initOtherColumn = function () {
    return [
        {field: 'selectItem', radio: false,visible:false},
        {title: 'id', field: 'userOrgId', align: 'center',visible: false, valign: 'middle',width:'50px'},
        {title: '姓名', field: 'userOrgName', align: 'center', valign: 'middle'},
        {title: '职务', field: 'userOrgWork', align: 'center', valign: 'middle'},
        {title: '所属组织机构', field: 'userOrgOrganizationName', align: 'center', valign: 'middle'},
        {title: '联系方式', field: 'userOrgTel', align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valign: 'middle',formatter: UserOrg.operateFormatter1},

    ];
};

UserOrg.operateFormatter = function(value,row,index){
    var result = "";
    var organizationName = JSON.stringify(row.organizationName);
    var organizationPid = JSON.stringify(row.organizationPid);
    result += "<button type='button' class='btn btn-info nocolor-btn' style='border-left:1px solid #23c6c8!important;' onclick='UserOrg.edit(" + row.organizationId + ","+organizationName+")'>修改</button>";
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserOrg.delete(' + row.organizationId + ')">删除</button>';
    result += "<button type='button' class='btn btn-info nocolor-btn' onclick='UserOrg.add("+ row.organizationId+","+organizationName+","+organizationPid+")'>添加下级机构</button>";
    return [result].join('');
};


UserOrg.operateFormatter1 = function(value,row,index){
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="UserOrg.editOrg(' + row.userOrgId + ')">修改</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="UserOrg.deleteOrg(' + row.userOrgId + ')">删除</button>';
    return [result].join('');
};

/**
 * 检查是否选中
 */
UserOrg.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserOrg.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加用户组织
 */
UserOrg.openAddUserOrg = function () {
    var index = layer.open({
        type: 2,
        title: '添加用户组织',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userOrg/userOrg_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看用户组织详情
 */
UserOrg.editOrg = function (id) {
        var index = layer.open({
            type: 2,
            title: '编辑组织机构',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userOrg/userOrg_update/' + id
        });
        this.layerIndex = index;

};

/**
 * 删除用户组织
 */
UserOrg.deleteOrg = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/userOrg/delete", function (data) {
            Feng.success("删除成功!");
            UserOrg.table1.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userOrgId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });


};

UserOrg.delete = function(id){
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/organization/delete", function (data) {
            if(data.code==400){
                Feng.error("删除失败!" + data.msg + "!");
            }else {
                Feng.success("删除成功!");
                UserOrg.table.refresh();
            }
        });
        ajax.set("organizationId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });

}

/**
 * 打开查看组织机构详情
 */
UserOrg.edit = function(id,parentOrganizationName){
    UserOrg.parentOrganizationName = parentOrganizationName;
    var index = layer.open({
        type: 2,
        title: '编辑组织机构',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/organization/organization_update/' + id
    });
    this.layerIndex = index;
}


/**
 * 添加组织机构
 */
UserOrg.add = function(id,parentOrganizationName,pid){
    UserOrg.parentOrganizationName = parentOrganizationName;
    UserOrg.parentOrganizationPid = id;
    var index = layer.open({
        type: 2,
        title: '添加组织机构',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/organization/organization_add/'
    });
    this.layerIndex = index;
}

/**
 * 查询用户组织列表
 */
UserOrg.search = function () {
    var queryData = {};
    queryData['userOrgOrganizationName'] = $("#userOrgOrganizationName").val();
    queryData['userOrgName'] = $("#userOrgName").val();
    UserOrg.table1.refresh({query: queryData});
};


/**
 * tab切换
 */
UserOrg.change = function(that){
    var name = $(that).parent().data('name');
    if(name == 'orgList'){
        $('.orgList').show();
        $('.otherList').hide();
    }
    if(name == 'otherList'){
        $('.orgList').hide();
        $('.otherList').show();
    }
};


/**
 * 点击部门ztree列表的选项时
 *
 * @param e
 * @param treeId
 * @param treeNode
 * @returns
 */
UserOrg.onClickDept = function(e, treeId, treeNode) {
    $("#userOrgOrganizationName").attr("value", UserOrg.zTreeInstance.getSelectedVal());
    $("#userOrgOrganizationPid").attr("value", treeNode.id);
}




/**
 * 显示部门选择的树
 *
 * @returns
 */
UserOrg.showDeptSelectTree = function() {
    var pName = $("#userOrgOrganizationName");
    var pNameOffset = $("#userOrgOrganizationPid").offset();
    $("#parentUserOrgSelectMenu").css({
        left : pNameOffset.left + parseInt(173)+"px",
        top : pNameOffset.top + pName.outerHeight()+ "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}


/**
 * 隐藏部门选择的树
 */
UserOrg.hideDeptSelectTree = function() {
    $("#parentUserOrgSelectMenu").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
}


function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "parentUserOrgSelectMenu" || $(
            event.target).parents("#parentUserOrgSelectMenu").length > 0)) {
        UserOrg.hideDeptSelectTree();
    }
}


$(function () {
    $('.tab-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    var defaultColunms = UserOrg.initColumn();
    var defalutOtherColunms = UserOrg.initOtherColumn();
    var table = new BSTreeTableCC(UserOrg.id, "/organization/OrgList", defaultColunms);
    var table1 =  new BSTable(UserOrg.otherId, "/userOrg/list", defalutOtherColunms);
    // table.setPaginationType("client");
    table.setExpandColumn(2);
    table.setIdField("organizationId");
    table.setCodeField("organizationId");
    table.setParentCodeField("organizationPid");
    table.setExpandAll(true);
    table.init('get');
    UserOrg.table = table;
    table1.setPaginationType("server");
    UserOrg.table1 = table1.init('get');
   // UserOrg.table = table.init('get');


    var ztree = new $ZTreeCC("parentUserOrgSelectMenuTree", "/organization/OrgList");
    ztree.bindOnClick(UserOrg.onClickDept);
    ztree.init();
    UserOrg.zTreeInstance = ztree;
});
