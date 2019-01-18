<img id="${id}Img" width="120px" height="150px"
     @if(isEmpty(avatarImg)){
     src="${ctxPath}/static/img/monitor.png">
@}else{
src="">
@}
<script>
    var  avatarImg = '${avatarImg}';
    var imgServerPath = Feng.imgServerPath +'${avatarImg}';
    if(avatarImg != ""){
        $('#${id}Img').attr('src', imgServerPath);
    }
</script>