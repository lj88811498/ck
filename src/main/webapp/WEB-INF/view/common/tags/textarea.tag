@/*
表单中textarea框标签中各个参数的说明:

hidden : textarea hidden框的id
id : textarea框id
name : textarea框名称
readonly : readonly属性
clickFun : 点击事件的方法名
style : 附加的css属性
isValidate : 是否是必填项
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">
        @if(isNotEmpty(isValidate) && isValidate == 'true'){
            <span style="color: red;vertical-align: middle;padding-right: 3px;">*</span>
        @}
        ${name}
    </label>
    <div class="col-sm-8">
        @if(isNotEmpty(value)){
        <textarea class="form-control" id="${id}" name="${id}" wrap="hard" onblur="cleanSpelCharTextarea(this)" style="width: 100%; height: 200px; resize: none;"
                  @if(isNotEmpty(readonly)){
                  readonly="${readonly}"
                  @}
                  @if(isNotEmpty(disabled)){
                  disabled="${disabled}"
                  @}
                  @if(isNotEmpty(placeholder)){
                  placeholder="${placeholder}"
                  @}
        >${value}</textarea>
        @}else{
        <textarea class="form-control" id="${id}" name="${id}" wrap="hard" onblur="cleanSpelCharTextarea(this)" style="width: 100%; height: 200px; resize: none;"
                  @if(isNotEmpty(readonly)){
                  readonly="${readonly}"
                  @}
                  @if(isNotEmpty(disabled)){
                  disabled="${disabled}"
                  @}
                  @if(isNotEmpty(placeholder)){
                  placeholder="${placeholder}"
                  @}
        ></textarea>
        @}

    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}

<script>
    function cleanSpelCharTextarea(th){
        if(/["'<>;)(]/.test(th.value)){
            $(th).val(th.value.replace(/["'<>;)(]/g,""));
            Feng.info('不能输入英文特殊字符！')
        }
    }
</script>
