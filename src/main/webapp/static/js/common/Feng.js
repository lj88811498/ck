var Feng = {
    imgServerPath: "",
    ctxPath: "",
    mapPath: "",
    addImgServerPath: function () {
        if (Feng.imgServerPath == "" && this.imgServerPath == "") {
            var ajax = new $ax(Feng.ctxPath + "/serverPath", function(data){
                Feng.setImgServerPath(data.serverPath);
            },function(data){
                //Feng.error("获取数据失败!" + data.msg + "!");
            });
            ajax.start("get");
        }
    },
    addMapServerPath: function () {
        if (Feng.mapPath == "" && this.mapPath == "") {
            var ajax = new $ax(Feng.ctxPath + "/mapServerPath", function(data){
                Feng.setServerPath(data.mapServerPath);
            },function(data){
                //Feng.error("获取数据失败!" + data.msg + "!");
            });
            ajax.start("get");
        }
    },
    setImgServerPath: function (obj) {
        if (this.imgServerPath == "") {
            this.imgServerPath = obj;
        }
    },
    setServerPath: function (obj) {
        if (this.mapPath == "") {
            this.mapPath = obj;
        }
    },
    addCtx: function (ctx) {
        if (this.ctxPath == "") {
            this.ctxPath = ctx;
        }
    },
  /*  addCtx: function (ctx) {
        if (this.ctxPath == "") {
            this.ctxPath = ctx;
        }
    },*/
    confirm: function (tip, ensure) {//询问框
        parent.layer.confirm(tip, {
            btn: ['确定', '取消']
        }, function (index) {
            ensure();
            parent.layer.close(index);
        }, function (index) {
            parent.layer.close(index);
        });
    },confirm1: function (tip, ensure) {//询问框
        parent.layer.confirm(tip, {
            btn: ['确定']
        }, function (index) {
            ensure();
            parent.layer.close(index);
            window.location.reload();
        }, function (index) {
            parent.layer.close(index);
        });
    },
    log: function (info) {
        console.log(info);
    },
    alert: function (info, iconIndex) {
        parent.layer.msg(info, {
            icon: iconIndex,
        });
    },
    info: function (info) {
        Feng.alert(info, 0);
    },
    success: function (info) {
        Feng.alert(info, 1);
    },
    error: function (info) {
        Feng.alert(info, 2);
    },
    infoDetail: function (title, info) {
        var display = "";
        if (typeof info == "string") {
            display = info;
        } else {
            if (info instanceof Array) {
                for (var x in info) {
                    display = display + info[x] + "<br/>";
                }
            } else {
                display = info;
            }
        }
        parent.layer.open({
            title: title,
            type: 1,
            skin: 'layui-layer-rim', //加上边框
            area: ['950px', '600px'], //宽高
            content: '<div style="padding: 20px;">' + display + '</div>'
        });
    },
    writeObj: function (obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            description += i + " = " + property + ",";
        }
        layer.alert(description, {
            skin: 'layui-layer-molv',
            closeBtn: 0
        });
    },
    showInputTree: function (inputId, inputTreeContentId, leftOffset, rightOffset) {
        var onBodyDown = function (event) {
            if (!(event.target.id == "menuBtn" || event.target.id == inputTreeContentId || $(event.target).parents("#" + inputTreeContentId).length > 0)) {
                $("#" + inputTreeContentId).fadeOut("fast");
                $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
            }
        };

        if(leftOffset == undefined && rightOffset == undefined){
            var inputDiv = $("#" + inputId);
            var inputDivOffset = $("#" + inputId).offset();
            $("#" + inputTreeContentId).css({
                left: inputDivOffset.left + "px",
                top: inputDivOffset.top + inputDiv.outerHeight() + "px"
            }).slideDown("fast");
        }else{
            $("#" + inputTreeContentId).css({
                left: leftOffset + "px",
                top: rightOffset + "px"
            }).slideDown("fast");
        }

        $("body").bind("mousedown", onBodyDown);
    },
    baseAjax: function (url, tip) {
        var ajax = new $ax(Feng.ctxPath + url, function (data) {
            Feng.success(tip + "成功!");
        }, function (data) {
            Feng.error(tip + "失败!" + data.responseJSON.msg + "!");
        });
        return ajax;
    },
    changeAjax: function (url) {
        return Feng.baseAjax(url, "修改");
    },
    zTreeCheckedNodes: function (zTreeId) {
        var zTree = $.fn.zTree.getZTreeObj(zTreeId);
        var nodes = zTree.getCheckedNodes();
        var ids = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            ids += "," + nodes[i].id;
        }
        return ids.substring(1);
    },
    eventParseObject: function (event) {//获取点击事件的源对象
        event = event ? event : window.event;
        var obj = event.srcElement ? event.srcElement : event.target;
        return $(obj);
    },
    sessionTimeoutRegistry: function () {
        $.ajaxSetup({
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            complete: function (XMLHttpRequest, textStatus) {
                //通过XMLHttpRequest取得响应头，sessionstatus，
                var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
                if (sessionstatus == "timeout") {
                    //如果超时就处理 ，指定要跳转的页面
                    window.location = Feng.ctxPath + "/global/sessionError";
                }
            }
        });
    },
    initValidator: function(formId,fields){
        $('#' + formId).bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: fields,
            live: 'enabled',
            message: '该字段不能为空'
        });
    },
    underLineToCamel: function (str) {
        var strArr = str.split('_');
        for (var i = 1; i < strArr.length; i++) {
            strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
        }
        var result = strArr.join('');
        return result.charAt(0).toUpperCase() + result.substring(1);
    },
    subStringStr: function (str, num) {
        var newStr;
        if (str.length > num) {
            newStr = str.substring(0, 15) + '......';
        }else {
            newStr = str;
        }
        return newStr;
    },
    isArray: function (o) {
        return Object.prototype.toString.call(o)=='[object Array]';
    },
    fieldHide: function (value, frontIndex, backIndex, must) {
        var symbol = "";
        var length = value.length;

        if (length < 4 && !must) {
            for (var i = 0; i < length - 1; i++) {
                symbol += "*";
            }
            return value.substring(0, 1) + symbol;
        }else {
            var symbolNum = length - frontIndex - backIndex;
            for(var i = 0; i < symbolNum; i++){
                if(i > 4){ // 防止太长的数据用*代替没意义
                    break;
                }
                symbol += "*";
            }
            return value.substring(0, frontIndex) + symbol + value.substring(length - backIndex);
        }

    }
};
