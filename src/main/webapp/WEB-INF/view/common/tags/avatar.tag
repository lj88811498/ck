@/*
    头像参数的说明:
    name : 名称
    id : 头像的id
@*/
<div class="form-group">

    <div class="col-sm-4">
        <div id="${id}PreId">
            <div><img id="${id}Img" width="140px" height="100px"
                @if(isEmpty(avatarImg)){
                      src="${ctxPath}/static/img/person.png"></div>
                @}else{
                      src=""></div>
                @}
        </div>
    </div>
    <div class="col-sm-2">
        <div class="head-scu-btn upload-btn" id="${id}BtnId">
            <i class="fa fa-upload"></i>&nbsp;上传
        </div>
    </div>
    <input type="hidden" id="${id}" value="${avatarImg!}"/>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
    <div class="hr-line-dashed"></div>
@}
<script>
    var  avatarImg = '${avatarImg}';
    var imgServerPath = Feng.imgServerPath + '/${avatarImg}';
    if(avatarImg != ""){
        $('#${id}Img').attr('src', imgServerPath);
    }

</script>

