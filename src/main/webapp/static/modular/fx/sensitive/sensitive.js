/**
 * Created by Administrator on 2018/7/16 0016.
 */
/**
 * 基本信息管理初始化
 */
var Sensitive = {
    id:'sensitiveTimeTable',
    seItem: null,		//选中的条目
    table: null,
    socialTable:null,
    layerIndex: -1
};



/**
 * 初始化表格的列
 */
Sensitive.initColumn = function () {
    return [
        // {field: 'selectItem', radio: true},
        {title: 'id', field: 'sensitiveTimeId', visible: false, align: 'center', valign: 'middle'},
        {title: '开始时间', field: 'sensitiveTimeBeginTime', visible: true, align: 'center', valign: 'middle'},
        {title: '结束时间', field: 'sensitiveTimeEndTime', visible: true, align: 'center', valign: 'middle'},
        {title: '事件内容', field: 'sensitiveTimeContent', visible: true, align: 'center', valign: 'middle'},
        {title: '操作', field: 'operate', align: 'center', valgin: 'middle', clickToSelect: false, formatter: Sensitive.operateFormatter, width: '20%'}
    ];
};

/**
 * 表格行操作
 */
Sensitive.operateFormatter = function (value, row, index) {
    var result = "";
    result += '<button type="button" class="btn btn-info nocolor-btn" onclick="Sensitive.edit(' + row.sensitiveTimeId + ')">编辑</button>';
    result += '<button type="button" class="btn  btn-danger nocolor-btn" onclick="Sensitive.delete(' + row.sensitiveTimeId + ')">删除</button>';
    return [result].join('');
};

/**
 * 编辑
 */
Sensitive.edit = function(id){
    var index = layer.open({
        type: 2,
        title: '编辑敏感时间段',
        area: ['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/sensitiveTime/sensitiveTime_update/' + id
    });
    this.layerIndex = index;
};


/**
 * 数组去重
 */
let obj = {};
let json = [];
let count = 0;
function isRepeat (newJson, year, i) {
    let countM = 0;
    newJson.forEach( (element, index) => {
        if (element.year) {
            if (!obj[element.year]) {
                obj[element.year] = {
                    index: count,
                    children: []
                };
                json.push({
                    year: element.year,
                    children: []
                });
                count++;
            }
            isRepeat(element.children, element.year, count - 1);
        } else {
            if (element.month && obj[year].children.indexOf(element.month) === -1) {
                obj[year].children.push(element.month);
                json[i].children.push({
                    month: element.month,
                    children: []
                })
            }
            let mIndex = obj[year].children.indexOf(element.month);
            json[i].children[mIndex].children.push(element.children)
        }
    });
    return json;
}


Sensitive.initList = function(){
    var ajax = new $ax(Feng.ctxPath + "/sensitiveTime/findsensitiveTimeList", function(data){
       var json1 = data.page.records;
       var str = "";
        var json = isRepeat(json1);
        var str = "";
        var month1 = [];
        var samemonth = "";
        for(var i = 0; i < json.length; i++){
            str += '<div class="year">'+
                '<h2><a href="#">'+json[i].year+'<i></i></a></h2>'+
                '<div class="list"><ul>';
            for(var d = 0; d < json[i].children.length; d++){
                str += '<li class="cls highlight">'+
                    '<p class="date">'+json[i].children[d].month+'</p>';
                for(var h = 0; h < json[i].children[d].children.length; h++){
                    str += '<p class="intro">'+json[i].children[d].children[h][0].date+'  '+json[i].children[d].children[h][0].content+'</p>'+
                        '<p class="version">&nbsp;</p>'+
                        '<div class="more">'+
                      /*  '<p>'+json[i].children[d].children[h][0].content+'</p>'+*/
                        '</div><p class="date">&nbsp;</p>'

                }
            }
            str += '</li></ul></div></div>';
        }
        $("#timeLines").append(str);

    },function(data){
        Feng.error("数据获取失败!" + data.responseJSON.message + "!");
    });
    //ajax.set("employmentUserId",$('#userInfoId').val());
    ajax.start();
}




/**
 * 删除网格员
 */
Sensitive.delete = function (id) {
    Feng.confirm('是否删除信息？', function () {
        var ajax = new $ax(Feng.ctxPath + "/sensitiveTime/delete", function (data) {
            Feng.success("删除成功!");
            Sensitive.table.refresh();
        }, function (data) {
            Feng.error("删除失败!" + data.responseJSON.message + "!");
        });
        ajax.set("sensitiveTimeId",id);
        ajax.start();
    }, function () {
        Feng.error("删除失败!");
    });


};




/**
 * 查询网格员列表
 */
Sensitive.search = function () {
    var queryData = {};
    queryData['beginBtime'] = $("#beginBtime").val();
    queryData['beginEtime'] = $("#beginEtime").val();
    queryData['endBtime'] = $("#endBtime").val();
    queryData['endEtime'] = $("#endEtime").val();
    // queryData['offset'] = 0;
    Sensitive.table.refresh({query: queryData});
};

Sensitive.timeManage = function(){
    var index = layer.open({
        type: 2,
        title: '管理敏感时间段',
        area: ['100%', '100%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/sensitiveTime/sensitiveTimeTable/'
    });
    this.layerIndex = index;
};


Sensitive.openAdd = function(){
    var index = layer.open({
        type: 2,
        title: '新增敏感时间段',
        area:['800px', '420px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/sensitiveTime/sensitiveTime_add'
    });
    this.layerIndex = index;
};

$(function () {
    Sensitive.initList();
    var defaultColunms = Sensitive.initColumn();
    var table = new BSTable(Sensitive.id, "/sensitiveTime/findsensitiveTimeList", defaultColunms);
    table.setPaginationType("server");
    Sensitive.table = table.init();
    $(".main .year .list").each(function (e, target) {
        var $target=  $(target),
            $ul = $target.find("ul");
        $target.height($ul.outerHeight()), $ul.css("position", "absolute");
    });
    $(".main .year>h2>a").click(function (e) {
        e.preventDefault();
        $(this).parents(".year").toggleClass("closes");
    });
});
