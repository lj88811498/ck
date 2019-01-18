@/*
头像参数的说明:
name : 名称
id : 头像的id
@*/
<div class="form-group">
    <div class="">
        <div class="head-scu-btn upload-btn" id="${id}BtnId">
            <i class="fa fa-upload"></i>&nbsp;上传
        </div>
    </div>
    <div class="">
        <div id="${id}PreId">
            <div><img id="${id}Img" width="100px" height="140px"
                      @if(isEmpty(avatarImg)){
                      src="${ctxPath}/static/img/person.png"></div>
            @}else{
            src=""></div>
        @}
    </div>
</div>
<input type="hidden" id="${id}" value=""/>

