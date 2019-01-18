@/*
头像参数的说明:
name : 名称
id : 头像的id
@*/
<div class="form-group">
   <label class="col-sm-3 control-label head-scu-label">
    @if(isNotEmpty(isValidate) && isValidate == 'true'){
    <span style="color: red;vertical-align: middle;padding-right: 3px;">*</span>
    @}
    ${name}
   </label>
    <div class="col-sm-3">
        <div id="${id}PreId">
            <img id="${id}Img" width="120px" height="150px"
                 @if(isEmpty(avatarImg)){
                 src="${ctxPath}/static/img/monitor.png">
            @}else{
            src="">
            @}
        </div>
    </div>

<div class="col-sm-2">
    <div class="head-scu-btn upload-btn" id="${id}BtnId">
        <i class="fa fa-upload"></i>&nbsp;上传
    </div>
</div>
</div>
<input type="hidden" id="${id}" value="${avatarImg!}"/>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}
<script>
    var  avatarImg = '${avatarImg}';
    var imgServerPath = Feng.imgServerPath +'${avatarImg}';
    if(avatarImg != ""){
        $('#${id}Img').attr('src', imgServerPath);
    }
</script>