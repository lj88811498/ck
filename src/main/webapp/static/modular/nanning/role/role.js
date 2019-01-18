/**
 * 角色信息管理初始化
 */
var Role = {
    id: "RoleTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Role.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
Role.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        Role.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加角色信息
 */
Role.openAddRole = function () {
    var index = layer.open({
        type: 2,
        title: '添加角色信息',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/role/role_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看角色信息详情
 */
Role.openRoleDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '角色信息详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/role/role_update/' + Role.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除角色信息
 */
Role.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/role/delete", function (data) {
            Feng.success("删除成功!");
            Role.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("roleId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询角色信息列表
 */
Role.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    Role.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = Role.initColumn();
    var table = new BSTable(Role.id, "/role/list", defaultColunms);
    table.setPaginationType("client");
    Role.table = table.init();
});
