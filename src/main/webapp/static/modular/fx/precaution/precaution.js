/**
 * 网格员管理初始化
 */
var Precaution = {
    id: "PrecautionTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Precaution.initColumn = function () {
    return [
        // {field: 'selectItem', radio: true},
        {title: 'id', field: 'precautionId', visible: false, align: 'center', valign: 'middle'},
        {title: '文章名称', field: 'precautionTitle', visible: true, align: 'center', valign: 'middle'},
        {title: '类型', field: 'precautionType', visible: true, align: 'center', valign: 'middle',formatter:function(value,row,index){
            if(value == '0'){
                return '防控制度';
            }
            if(value == '1'){
                return '防控措施';
            }
            if(value == '2'){
                return '防控预案';
            }
        }},
        {title: '创建时间', field: 'precautionCreateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '修改时间', field: 'precautionUpdateTime', visible: true, align: 'center', valign: 'middle'},
        {title: '编辑人', field: 'precautionUpdateBy', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: Precaution.operateFormatter, width: '20%'}
    ];
};

/**
 * 表格行操作
 */
Precaution.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Precaution.openDetail(' + row.precautionId + ')">查看</button>';
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Precaution.edit(' + row.precautionId + ')">编辑</button>';
    result += '<button type="button" class="btn btn-danger nocolor-btn" onclick="Precaution.delete(' + row.precautionId + ')">删除</button>';
    return [result].join('');
};

/**
 * 编辑
 */
Precaution.edit = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑防控制度体系详情',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/precaution/precaution_update/' + id
    });
    this.layerIndex = index;
};

/**
 * 负责邪教人员
 */
Precaution.personNum = function(id){
    $("#personId").val(id);
    var index = layer.open({
        type: 2,
        title: '负责邪教人员',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/gridman/gridman_add'
    });
    this.layerIndex = index;
};



/**
 * 点击添加网格员
 */
Precaution.openAdd= function (id) {
    var index = layer.open({
        type: 2,
        title: '新增防控管理制度体系',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/precaution/precaution_add'
    });
    this.layerIndex = index;
};

/**
 * 打开查看网格员详情
 */
Precaution.openDetail = function (id) {
    var index = layer.open({
        type: 2,
        title: '查看防控制度体系详情',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/precaution/precaution_view/' + id
    });
    this.layerIndex = index;

};

/**
 * 删除网格员
 */
Precaution.delete = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/precaution/delete/", function (data) {
            Feng.success("删除成功!");
            Precaution.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("precautionId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });



};

/**
 * 查询网格员列表
 */
Precaution.search = function () {
    var queryData = {};
    queryData['keyWord'] = $("#keyWord").val();
    queryData['type'] = $("#type").val();
    queryData['offset'] = 0;
    Precaution.table.refresh({query: queryData});
};



$(function () {

    var defaultColunms = Precaution.initColumn();
    var table = new BSTable(Precaution.id, "/precaution/list", defaultColunms);
    table.setPaginationType("server");
    Precaution.table = table.init();
});
