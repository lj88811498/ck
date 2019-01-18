@/*
表单中video框标签中各个参数的说明:

name : video框名称
@*/
<div class="form-group">
    <label class="col-sm-3 control-label">${name}</label>
    <div class="col-sm-8">
        <video width="220" height="100" controls="controls">
            您的浏览器版本过低，无法预览视频，推荐使用chrome或火狐浏览器打开此页面！
            <source src="${value}" type="video/mp4"/>
        </video>
    </div>
</div>
@if(isNotEmpty(underline) && underline == 'true'){
<div class="hr-line-dashed"></div>
@}


