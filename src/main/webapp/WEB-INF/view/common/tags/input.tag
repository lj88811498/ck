@/*
    表单中input框标签中各个参数的说明:

    hidden : input hidden框的id
    id : input框id
    name : input框名称
    readonly : readonly属性
    clickFun : 点击事件的方法名
    style : 附加的css属性
    class : 附加的class
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
        <input id="${id}" onblur="cleanSpelChar(this)" name="${id}"
               @if(isNotEmpty(value)){
                    value="${tool.dateType(value)}"
               @}
               @if(isNotEmpty(type)){
                    type="${type}"
               @}else{
                    type="text"
               @}
               @if(isNotEmpty(readonly)){
                    readonly="${readonly}"
               @}
               @if(isNotEmpty(clickFun)){
                    onclick="${clickFun}"
               @}
               @if(isNotEmpty(style)){
                    style="${style}"
               @}
               @if(isNotEmpty(class)){
                    class="form-control ${class}"
               @}else{
                    class="form-control"
               @}
               @if(isNotEmpty(disabled)){
                    disabled="${disabled}"
               @}
        >
        @if(isNotEmpty(closeName)){
            ${closeName}
        @}
        @if(isNotEmpty(type) && type == 'checkbox'){
            <label class="switchCheckboxLabel" id="${id}Label" for="${id}" style="vertical-align: middle; margin-left: 5px; margin-right: 5px;"></label>
        @}
        @if(isNotEmpty(openName)){
            ${openName}
        @}

        @if(isNotEmpty(hidden)){
            <input class="form-control" type="hidden" id="${hidden}" value="${hiddenValue!}">
        @}

        @if(isNotEmpty(selectFlag)){
            <div id="${selectId}" style="display: none; position: absolute; z-index: 200;">
                <ul id="${selectTreeId}" class="ztree tree-box" style="${selectStyle!}"></ul>
            </div>
        @}
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}
@if(isNotEmpty(type) && type == 'checkbox'){
<script>
    var switchCheckbox = $('.switchCheckbox');
    var lableCheck = $('#${id}Label');
    for (var i = 0; i < switchCheckbox.length; i++) {
        if (switchCheckbox.eq(i).val() === '1' || switchCheckbox.eq(i).val() === '2') {
            switchCheckbox.eq(i).prop('checked', true);
            lableCheck.html('ON');
        }else {
            lableCheck.html('OFF');
        }
    }
    switchCheckbox.click(function () {
        if ($(this)[0].checked === true) {
            $(this).val('1');
            $(this).siblings().html('ON');
//            lableCheck.html('ON');
        }else {
            $(this).val('0');
            $(this).siblings().html('OFF');
//            lableCheck.html('OFF');
        }
    });
</script>
@}
<script>
    function cleanSpelChar(th){
        var newStr;
        var newVal = $(th).val();
        if(/["'<>;)(]/.test($(th).val())){
            newStr = newVal.replace(/["'<>;)(]/g, "");
            $(th).val(newStr);
            Feng.info('不能输入英文特殊字符！');
        }
    }
</script>

