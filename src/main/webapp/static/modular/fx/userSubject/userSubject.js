/**
 * 用户题目管理初始化
 */
var UserSubject = {
    id: "UserSubjectTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
UserSubject.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
UserSubject.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        UserSubject.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加用户题目
 */
UserSubject.openAddUserSubject = function () {
    var index = layer.open({
        type: 2,
        title: '添加用户题目',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/userSubject/userSubject_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看用户题目详情
 */
UserSubject.openUserSubjectDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '用户题目详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/userSubject/userSubject_update/' + UserSubject.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除用户题目
 */
UserSubject.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/userSubject/delete", function (data) {
            Feng.success("删除成功!");
            UserSubject.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userSubjectId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询用户题目列表
 */
UserSubject.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    UserSubject.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = UserSubject.initColumn();
    var table = new BSTable(UserSubject.id, "/userSubject/list", defaultColunms);
    table.setPaginationType("client");
    UserSubject.table = table.init();
});
