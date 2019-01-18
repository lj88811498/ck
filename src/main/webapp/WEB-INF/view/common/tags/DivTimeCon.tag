@/*
时间查询条件标签的参数说明:

name : 查询条件的名称
id : 查询内容的input框id
isTime : 日期是否带有小时和分钟(true/false)
pattern : 日期的正则表达式(例如:"YYYY-MM-DD")
@*/
<div id="${id}" class="chartTime" data-id="${name}" data-type="${chartType}" data-url="${url}" style="height: 22px; width: 30%; line-height: 22px; padding: 0 5px; cursor: pointer; border: 1px solid #D7DADB;float: right; background-color: #ffffff"></div>
@if(isNotEmpty(type)){
<script>
    var year;
    var date=new Date;
    year=date.getFullYear();
    laydate.render({
        elem: '#${id}',
        type: '${type}',
        value: year,
        done: function (value, date) {
            $('#${id}').html(value);
            ${clickFun};
        }
    });
</script>
@}else{
<script>
    var date=new Date;
    var year=date.getFullYear();
    laydate.render({elem: '#${id}', value: year})
</script>
@}
