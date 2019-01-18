/**
 * 人口信息-同户成员管理初始化
 */
var PeopleInfoMember = {
    id: "PeopleInfoMemberTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
PeopleInfoMember.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
    ];
};

/**
 * 检查是否选中
 */
PeopleInfoMember.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        PeopleInfoMember.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加人口信息-同户成员
 */
PeopleInfoMember.openAddPeopleInfoMember = function () {
    var index = layer.open({
        type: 2,
        title: '添加人口信息-同户成员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/peopleInfoMember/peopleInfoMember_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看人口信息-同户成员详情
 */
PeopleInfoMember.openPeopleInfoMemberDetail = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '人口信息-同户成员详情',
            area: ['800px', '420px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/peopleInfoMember/peopleInfoMember_update/' + PeopleInfoMember.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除人口信息-同户成员
 */
PeopleInfoMember.delete = function () {
    if (this.check()) {
        var ajax = new $ax(Feng.ctxPath + "/peopleInfoMember/delete", function (data) {
            Feng.success("删除成功!");
            PeopleInfoMember.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("peopleInfoMemberId",this.seItem.id);
        ajax.start();
    }
};

/**
 * 查询人口信息-同户成员列表
 */
PeopleInfoMember.search = function () {
    var queryData = {};
    queryData['condition'] = $("#condition").val();
    PeopleInfoMember.table.refresh({query: queryData});
};

$(function () {
    var defaultColunms = PeopleInfoMember.initColumn();
    var table = new BSTable(PeopleInfoMember.id, "/peopleInfoMember/list", defaultColunms);
    table.setPaginationType("client");
    PeopleInfoMember.table = table.init();
});
