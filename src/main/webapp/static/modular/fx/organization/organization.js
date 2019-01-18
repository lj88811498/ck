/**
 * 组织架构管理初始化
 */
var Organization = {
    id: "OrganizationTable",	//表格id
    datascource:"",
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};




/**
 * 获取组织架构列表
 */

Organization.getList = function(){
    var ajax = new $ax(Feng.ctxPath + "/organization/list", function (data) {
        Organization.datascource = data.page.records[0];
    }, function (data) {
        Feng.error("删除失败!" + data.responseJSON.message + "!");
    });
   // ajax.set("organizationId",this.seItem.id);
    ajax.start('get');
};
$(function () {
    Organization.getList();
  /*  Organization.datascource = {
        'name': 'general manager','title':'hahah' ,'id':'12',
        'children': [
            { 'name': 'department manager','title':'hahah' ,'id':'12'},
            { 'name': 'department manager','title':'hahah' ,'id':'12',
                'children': [
                    { 'name': 'senior engineer','title':'hahah' ,'id':'12' },
                    { 'name': 'senior engineer','title':'hahah' ,'id':'12',
                        'children': [
                            { 'name': 'engineer','title':'hahah' ,'id':'12' },
                            { 'name': 'UE engineer','title':'hahah' ,'id':'12' }
                        ]
                    }
                ]
            },
            { 'name': 'department manager' ,'title':'hahah' ,'id':'12'},
            { 'name': 'department manager','title':'hahah' ,'id':'12' },
            {  'name': 'department manager','title':'hahah' ,'id':'12' },
            { 'name': 'department manager','title':'hahah' ,'id':'12' },
            {  'name': 'department manager' ,'title':'hahah' ,'id':'12'},
            { 'name': 'department manager','title':'hahah' ,'id':'12' }
        ]
    };*/

    $('#chart-container').orgchart({
        'data' :  Organization.datascource,
        'nodeContent': 'title',
        'depth': 3,
    });


});
