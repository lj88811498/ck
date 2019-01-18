@/*
    名称查询条件标签的参数说明:

    name : 查询条件的名称
    id : 查询内容的input框id
@*/
<div class="clearfix m-b-sm">
    <label class="input-group-name">${name}</label>
    <input type="text" class="form-control form-control-name" id="${id}" placeholder="${placeholder!}"
    @if(isNotEmpty(width)){
        style="width: ${width}"
    @}
    />
</div>
<script>
    $(function () {
        if('${enterFun!}'!=""){
            $("#${id}").keydown(function (event) {
                if (event.keyCode == 13) {
                    ${enterFun!}
                }
            });
        }
    });
</script>