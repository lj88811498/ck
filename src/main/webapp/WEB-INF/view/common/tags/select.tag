@/*
    select标签中各个参数的说明:
    name : select的名称
    id : select的id
    underline : 是否带分割线
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
        <select class="form-control" id="${id}" name="${id}"
                @if(isNotEmpty(readonly)){
                readonly="${readonly}"
                @}
                @if(isNotEmpty(disabled)){
                disabled="${disabled}"
                @}
                @if(isNotEmpty(onchange)){
                onchange="${onchange}"
                @}
        >
            ${tagBody!}
        </select>
        @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
        @}
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}
@if(isNotEmpty(value)){
<script>
    $('#${id}').val('${value}');
</script>
@}


