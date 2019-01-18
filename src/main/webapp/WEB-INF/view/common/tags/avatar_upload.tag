@/*
图片参数的说明:
    name : 名称
    id : 图片的id
    btnHidden: 隐藏上传按钮
    isValidate : 是否是必填项
<%--src="${ctxPath}/kaptcha/${avatarImg}" ></div>--%>
@*/
<div class="form-group">
    <label class="col-sm-3 control-label head-scu-label">
        @if(isNotEmpty(isValidate) && isValidate == 'true'){
            <span style="color: red;vertical-align: middle;padding-right: 3px;">*</span>
        @}
        ${name}
    </label>
    <div class="col-sm-4">
        <div id="${id}PreId" style="position: relative">
           @if(isEmpty(avatarImg)){
                <img width="140px" height="100px"
                    @if(isEmpty(isImgType)){
                        src="${ctxPath}/static/img/defaultVideoImg.jpg">
                    @}else{
                        src="${ctxPath}/static/img/defaultImg.jpg">
                    @}
            @}else{
                @if(isEmpty(isVideoType)){
                <img width="140px" height="100px" src="${avatarImg}">
                @}else{
                <video width="220" height="100" controls="controls">
                    <source src="${avatarImg}" type="video/mp4"/>
                </video>
                <img width="140px" height="100px" src="${ctxPath}/static/img/defaultVideoImg.jpg" style="display: none">
                @}
            @}
        </div>
    </div>
    @if(isNotEmpty(btnHidden) && btnHidden == 'true'){
        <div class="col-sm-2" style="display: none">
        </div>
    @}else{
        <div class="col-sm-4 clearfix">
            <div class="head-scu-btn upload-btn" id="${id}BtnId" style="float: left;margin-top: 10px;">
                <i class="fa fa-upload"></i>&nbsp;上传
            </div>
            @if(isNotEmpty(deleteBtn) && deleteBtn == 'true'){
            <div class="btn head-scu-btn btn-danger" id="${id}DelBtnId" style="float: left;margin-left: 5px;margin-top: 10px;font-size: 13px">
                <i class="fa fa-upload"></i>&nbsp;删除
            </div>
            @}
        </div>
    @}
    <div class="form-group col-sm-8" style="margin-left: 25%">

        <input type="text" id="${id}" name="${id}" style="visibility: hidden"
               @if(isNotEmpty(avatarImg)){
                 value="${avatarImg}"
                @}
        />
    </div>

@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}
</div>
@if(isNotEmpty(deleteBtn) && deleteBtn == 'true'){
<script>
    $('#${id}DelBtnId').click(function () {
        Feng.confirm("是否删除视频？", function () {
            Feng.success('成功删除视频');
            $('#${id}PreId').find('video').remove();
            $('#${id}PreId').find('img').show();
            $('#${id}').val('');
        }, function () {
            Feng.error('删除视频失败！');
        });
    })
</script>
@}


