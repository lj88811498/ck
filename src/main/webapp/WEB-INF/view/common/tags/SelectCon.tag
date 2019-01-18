@/*
    选择查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
@*/
<div class="clearfix m-b-sm">
    <label class="input-group-name">
        ${name}
    </label>
    <select class="form-control form-control-name" id="${id}"  onchange="${changeFun!}"
    @if(isNotEmpty(width)){
    style="width: ${width}"
    @}
    >
        ${tagBody!}
    </select>
</div>