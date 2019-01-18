/**
 * 初始化 BootStrap Table 的封装
 *
 * 约定：toolbar的id为 (bstableId + "Toolbar")
 *
 * @author fengshuonan
 */
(function () {
    var BSTable = function (bstableId, url, columns) {
        this.btInstance = null;					//jquery和BootStrapTable绑定的对象
        this.bstableId = bstableId;
        this.url = Feng.ctxPath + url;
        this.method = "post";
        this.paginationType = "server";			//默认分页方式是服务器分页,可选项"client"
        this.toolbarId = bstableId + "Toolbar";
        this.columns = columns;
        this.height = '';						//默认表格高度665
        this.data = {};
        this.queryParams = {}; // 向后台传递的自定义参数
        this.selectedIds = [];
        this.tableData = [];
        this.pageSize = 10;
    };

    BSTable.prototype = {
        /**
         * 初始化bootstrap table
         */
        init: function (method) {
            var tableId = this.bstableId;
            var me = this;
            var config = {
                contentType: "application/x-www-form-urlencoded",
                url: this.url,				//请求地址
                method: method || this.method,		//ajax方式,post还是get
                ajaxOptions: {				//ajax请求的附带参数
                    data: this.data
                },
                toolbar: "#" + this.toolbarId,//顶部工具条
                striped: false,     			//是否显示行间隔色
                cache: false,      			//是否使用缓存,默认为true
                pagination: this.pagination,     		//是否显示分页（*）
                sortable: true,      		//是否启用排序
                sortOrder: "desc",     		//排序方式
                pageNumber: 1,      			//初始化加载第一页，默认第一页
                pageSize: me.pageSize,      			//每页的记录行数（*）
                pageList: [5, 10, 25, 50, 100, 500],  	//可供选择的每页的行数（*）
                queryParamsType: 'limit', 	//默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
                queryParams: function (param) {
                    return $.extend(me.queryParams, param);
                }, // 向后台传递的自定义参数
                //sidePagination: this.paginationType,   //分页方式：client客户端分页，server服务端分页（*）
                sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
                search: false,      		//是否显示表格搜索，此搜索是客户端搜索，不会进服务端
                strictSearch: true,			//设置为 true启用 全匹配搜索，否则为模糊搜索
                showColumns: true,     		//是否显示所有的列
                showRefresh: true,     		//是否显示刷新按钮
                minimumCountColumns: 2,    	//最少允许的列数
                clickToSelect: true,    	//是否启用点击选中行
                searchOnEnterKey: true,		//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
                columns: this.columns,		//列数组
                pagination: true,			//是否显示分页条
                height: this.height,
                icons: {
                    refresh: 'glyphicon-repeat',
                    toggle: 'glyphicon-list-alt',
                    columns: 'glyphicon-list'
                },
                iconSize: 'outline',
                onLoadSuccess: function (data) {
                    me.tableData = data;
                    me.setRowData(me);
                },
                onResetView: function (data) {
                    me.setRowData(me);
                },
                onCheck: function (row, ele) {
                    me.setSelectedIds().check(row)
                },
                onUncheck: function (row, ele) {
                    me.setSelectedIds().unCheck(row);
                },
                onCheckAll: function (rows) {
                    me.setSelectedIds().checkAll(rows);
                },
                onUncheckAll: function (rows) {
                    me.setSelectedIds().unCheckAll(rows);
                }
            };
            config['responseHandler'] = function(res) {
                return {
                    rows: res.page.records,
                    total: res.page.total
                }
            };
            this.btInstance = $('#' + tableId).bootstrapTable(config);
            return this;
        },
        /**
         * 向后台传递的自定义参数
         * @param param
         */
        setQueryParams: function (param) {
            this.queryParams = param;
        },
        /**
         * 设置分页方式：server 或者 client
         */
        setPaginationType: function (type) {
            this.paginationType = type;
        },
        /**
         * 设置是否分页
         */
        setPagination: function (flag) {
            this.pagination = flag;
        },
        /**
         * 设置分页条数
         */
        setPageSize: function (size) {
            this.pageSize = size;
        },
        /**
         * 设置表格高度
         */
        setTableHeight: function (height) {
            this.height = height;
        },
        /**
         * 设置ajax post请求时候附带的参数
         */
        set: function (key, value) {
            if (typeof key == "object") {
                for (var i in key) {
                    if (typeof i == "function")
                        continue;
                    this.data[i] = key[i];
                }
            } else {
                this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
            }
            return this;
        },

        /**
         * 设置ajax post请求时候附带的参数
         */
        setData: function (data) {
            this.data = data;
            return this;
        },

        /**
         * 设置被选中的行id
         */
        setSelectedIds: function () {
            var selectFunction;
            var that = this;
            var hasId;
            var currentIdIndex;
            selectFunction = {
                check: function (data) {
                    hasId = that.selectedIds.indexOf(data.id);
                    if (hasId === -1) {
                        that.selectedIds.push(data.id);
                    }else {
                        return;
                    }
                },
                unCheck: function (data) {
                    currentIdIndex = that.selectedIds.indexOf(data.id);
                    if (currentIdIndex !== -1) {
                        that.selectedIds.splice(currentIdIndex, 1);
                    }
                },
                checkAll: function (data) {
                    that.selectedIds = [];
                    for (var i = 0; i < data.length; i++) {
                        that.selectedIds.push(data[i].id);
                    }
                },
                unCheckAll: function (data) {
                    that.selectedIds = [];
                }
            };
            return selectFunction;
        },

        /**
         * 设置每页显示数量
         */
        setPageSize: function (num) {
            this.pageSize = num;
            return this;
        },

        /**
         * 设置被选中的行
         */
        setRowData: function (obj) {
            this.setInputStyle(obj);
        },

        /**
         * 设置checkbox, radio的样式
         */
        setInputStyle: function (obj) {

            //table单行checkbox
            $('input[name=\'iCheckTable\']').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue',
                increaseArea: '20%' // optional
            }).on('ifChanged', function(event){
                var parent = $(this).parent('div');
                var currentCheck = parent.siblings('input[name=\'btSelectItem\']');
                var checkAll = $('input[name=\'btSelectAll\']');
                var iCheckAll = checkAll.siblings('.icheckbox_flat-blue').find('input[name=\'iCheckAll\']');
                currentCheck.trigger('click');
                if (checkAll.is(':checked') === true) {
                    iCheckAll.prop('checked', true);
                    iCheckAll.parent('div').addClass('checked');
                }else {
                    iCheckAll.removeAttr("checked");
                    iCheckAll.parent('div').removeClass('checked');
                }
            });

            //table全选checkbox
            $('input[name=\'iCheckAll\']').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue',
                increaseArea: '20%', // optional
                check: 'check'
            }).on('ifChanged', function(event){
                var parent = $(this).parent('div');
                var currentCheck = parent.siblings('input[name=\'btSelectAll\']');
                var allIcheckTable = $('input[name=\'iCheckTable\']');
                currentCheck.trigger('click');
                allIcheckTable.trigger('click');
                if (currentCheck.is(':checked')) {
                    allIcheckTable.prop('checked', true);
                    allIcheckTable.parent('.icheckbox_flat-blue').addClass('checked');
                }else {
                    // obj.logIds = [];
                    allIcheckTable.removeAttr('checked');
                    allIcheckTable.parent('.icheckbox_flat-blue').removeClass('checked');
                }
            });

            //table初始化选择checkbox
            var allCheck = $('input[name=\'btSelectItem\'], input[name=\'btSelectAll\']');
            for (var i = 0; i < allCheck.length; i++) {
                if (allCheck[i].checked === true) {
                    var iCheckDom = $(allCheck[i]).siblings('.icheckbox_flat-blue');
                    var iCheckDomCheck = iCheckDom.find('input');
                    iCheckDom.addClass('checked');
                    iCheckDomCheck.prop("checked", true);
                }
            }

        },

        /**
         * 清空ajax post请求参数
         */
        clear: function () {
            this.data = {};
            return this;
        },

        /**
         * 刷新 bootstrap 表格
         * Refresh the remote server data,
         * you can set {silent: true} to refresh the data silently,
         * and set {url: newUrl} to change the url.
         * To supply query params specific to this request, set {query: {foo: 'bar'}}
         */
        refresh: function (parms) {
            if (typeof parms != "undefined") {
                this.btInstance.bootstrapTable('refresh', parms);
            } else {
                this.btInstance.bootstrapTable('refresh');
            }
            $('input[name=\'iCheckAll\']').removeAttr('checked');
        },

        /**
         * 前台下载excel
         * fileName excel文件名
         * ignoreColumn　不需要导出的列
         */
        downExcel: function (fileName,id) {
            $("#" + id).tableExport({
                type: 'excel',
                escape: false,
                fileName: fileName
            });
        }

    };

    window.BSTable = BSTable;

}());