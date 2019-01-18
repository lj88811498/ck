@/*
表单中uEditor标签中各个参数的说明:

hidden : uEditor hidden框的id
id : uEditor框id
name : uEditor框名称
readonly : readonly属性
clickFun : 点击事件的方法名
value : value值
isValidate : 是否是必填项
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">
        @if(isNotEmpty(isValidate) && isValidate == 'true'){
            <span style="color: red;vertical-align: middle;padding-right: 3px;">*</span>
        @}
        ${name}
    </label>
    <div class="col-sm-8" id="${id}" name="${id}">
    </div>

    <div class="col-sm-8" style="margin-left: 25%;height: 30px; margin-top: -18px">
        <input type="text" id="${id}tent" name="${id}tent" value='${value}' style="height:0;border:0;margin:0;padding:0;">
    </div>
    @if(isNotEmpty(readonly) && readonly == 'readonly'){
        <input type="hidden" id="${id}Readonly" value="${readonly}">
    @}

</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}

@if(isNotEmpty(validator)){
    <script>
        //实例化编辑器
        var editorInput = $('#${id}tent');
        var ue = UE.getEditor('${id}');
        var readOnly = $('#${id}Readonly').val();
        ue.addListener('ready', function () {
            if (readOnly && readOnly === 'readonly') {
                ue.setDisabled("fullscreen");
            }
            ue.setHeight(300);
            ue.setContent(editorInput.val());
            $('#${id}tent').siblings('i').css('margin-top', '15px');
            var $textarea = $('#${id}tent').parent().siblings('.edui-default').find('iframe').contents();
            var fn = function(){
                editorInput.val(ue.getContent());
                $('#${validator}').data('bootstrapValidator')
                    .updateStatus('${id}tent', 'NOT_VALIDATED', null)
                    .validateField('${id}tent');
                ue.addListener('blur', function(){
                    editorInput.val(ue.getContent());
                });
            };

            if (document.all) {
                $textarea.get(0).attachEvent('onpropertychange',function(e) {
                    fn();
                });
            }else{
                $textarea.on('DOMSubtreeModified', fn);
            }
        });
    </script>
@}else{
    <script>
        //实例化编辑器
        var editorInput = $('#${id}tent');
        var ue = UE.getEditor('${id}');
        var readOnly = $('#${id}Readonly').val();
        ue.addListener('ready', function () {
            if (readOnly && readOnly === 'readonly') {
                ue.setDisabled("fullscreen");
            }
            ue.setHeight(300);
            ue.setContent(editorInput.val());
        });

        //失去焦点时设置值
        ue.addListener('blur', function(){
            editorInput.val(ue.getContent());
        });

    </script>
@}



