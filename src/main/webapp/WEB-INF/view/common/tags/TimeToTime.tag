@/*
时间查询条件标签的参数说明:

name : 查询条件的名称
id : 查询内容的input框id
isTime : 日期是否带有小时和分钟(true/false)
pattern : 日期的正则表达式(例如:"YYYY-MM-DD")
@*/
<div class="clearfix m-b-sm">
    @if(isNotEmpty(name)){
    <label class="input-group-name">
        ${name}
    </label>
    @}
    <input type="text" class="form-control layer-date form-control-time" id="${bId}"/>
    <span style="float: left;padding:5px">-</span>
    <input type="text" class="form-control layer-date form-control-time" id="${eId}"/>
</div>
<script>
    laydate.render({elem: '#${bId}'});
    laydate.render({elem: '#${eId}'});
</script>