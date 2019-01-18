@/*
时间查询条件标签的参数说明:

name : 查询条件的名称
id : 查询内容的input框id
isTime : 日期是否带有小时和分钟(true/false)
pattern : 日期的正则表达式(例如:"YYYY-MM-DD")
@*/
<div class="form-group">
    @if(isNotEmpty(name)){
    <label class="col-sm-3 control-label">
        @if(isNotEmpty(isValidate) && isValidate == 'true'){
        <span style="color: red;vertical-align: middle;padding-right: 3px;">*</span>
        @}
        ${name}
    </label>
    @}
    <div class="col-sm-8">
        <input type="text" class="form-control layer-date"
               onclick="laydate({istime: ${isTime}, format: '${pattern}'})" id="${id}"
         >
    </div>

</div>
<script>
    laydate.render({elem: '#${id}'});
</script>