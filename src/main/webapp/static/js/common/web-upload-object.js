/**
 * web-upload 工具类
 * 
 * 约定：
 * 上传按钮的id = 图片隐藏域id + 'BtnId'
 * 图片预览框的id = 图片隐藏域id + 'PreId'
 * 
 * @author fengshuonan
 */
(function() {
	
	var $WebUpload = function(pictureId) {
		this.pictureId = pictureId;
		this.uploadBtnId = pictureId + "BtnId";
		this.uploadPreId = pictureId + "PreId";
        this.uploadUrl = Feng.ctxPath + '/mgr/upload';
		this.fileSizeLimit = 100 * 1024 * 1024;
		this.picWidth = 800;
		this.picHeight = 800;
        this.uploadBarId = null;
        this.imgType = {
            auto : true,
            pick : {
                id : '#' + this.uploadBtnId,
                multiple : false// 只上传一个
            },
            accept : {
                title : 'Images',
                extensions : 'jpg,gif,bmp,png,jpeg',
                mimeTypes : 'image/gif,image/jpg,image/jpeg,image/bmp,image/png,video/*'
            },
            swf : Feng.ctxPath
            + '/static/js/plugins/webuploader/Uploader.swf',
            disableGlobalDnd : true,
            duplicate : true,
            server : this.uploadUrl,
            fileSingleSizeLimit : 1024 * 1024 * 3,
            withCredentials: true
		};
        this.videoType = {
            auto : true,
            pick : {
                id : '#' + this.uploadBtnId,
                multiple : false// 只上传一个
            },
            accept : {
                title : 'Video',
                extensions : 'mp4',
                mimeTypes : 'video/mp4'
            },
            swf : Feng.ctxPath
            + '/static/js/plugins/webuploader/Uploader.swf',
            disableGlobalDnd : true,
            duplicate : true,
            server : this.uploadUrl,
            fileSingleSizeLimit : 1024 * 1024 * 1024
		};
        this.imgTypeError = function (type) {
            if ("Q_EXCEED_SIZE_LIMIT" == type) {
                Feng.error("图片大小超出了限制，请上传不大于3M的图片");
            } else if ("F_EXCEED_SIZE" == type) {
                Feng.error("图片大小超出了限制，请上传不大于3M的图片");
            } else if ("Q_TYPE_DENIED" == type) {
                Feng.error("支持上传的图片格式为：jpg，gif，bmp，png，jpeg");
            } else if ("Q_EXCEED_NUM_LIMIT" == type) {
                Feng.error("上传数量超过限制");
            } else if ("F_DUPLICATE" == type) {
                Feng.error("图片选择重复");
            } else {
                Feng.error("图片上传过程中出错");
            }
        };
        this.videoTypeError = function (type) {
            if ("Q_EXCEED_SIZE_LIMIT" == type) {
                Feng.error("视频大小超出了限制，请上传不大于1G的视频");
            } else if ("F_EXCEED_SIZE" == type) {
                Feng.error("视频大小超出了限制，请上传不大于1G的视频");
            } else if ("Q_TYPE_DENIED" == type) {
                Feng.error("支持上传的视频格式为：mp4");
            } else if ("Q_EXCEED_NUM_LIMIT" == type) {
                Feng.error("上传数量超过限制");
            } else if ("F_DUPLICATE" == type) {
                Feng.error("视频选择重复");
            } else {
                Feng.error("视频上传过程中出错");
            }
        };
	};

	$WebUpload.prototype = {
		/**
		 * 初始化webUploader
		 */
		init : function(type) {
			var uploader = this.create(type);
			this.bindEvent(uploader, type + 'Error', type);
			return uploader;
		},
		
		/**
		 * 创建webuploader对象
		 */
		create : function(type) {
			var webUploader = WebUploader.create(this[type]);
			return webUploader;
		},

		/**
		 * 绑定事件
		 */
		bindEvent : function(bindedObj, objError, type) {
			var me =  this;

            bindedObj.on('fileQueued', function(file) {
				var $li = $('<div><div class="loadingUpload"><div class="loadingUpload-task"><img src="' + Feng.ctxPath + '/static/img/loading.gif"></div><p>上传中...</p></div><img class="preImg" width="140px" height="140px"></div>');
				var $img = $li.find('img.preImg');

				$("#" + me.uploadPreId).html($li);

				// 生成缩略图
				bindedObj.makeThumb(file, function(error, src) {
					if (error) {
					    if (type === 'videoType') {
                            $img.replaceWith('<span>视频上传后无法预览！</span>');
                            return;
                        }else {
                            $img.replaceWith('<span>图片无法预览！</span>');
                            return;
                        }

					}
					$img.attr('src', src);
				}, me.picWidth, me.picHeight);
			});

			// 文件上传过程中创建进度条实时显示。
			bindedObj.on('uploadProgress', function(file, percentage) {
                $("#" + me.uploadPreId).find('.loadingUpload').show();
                $("#"+me.uploadBarId).css("width", percentage * 100 + "%");
			});

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			bindedObj.on('uploadSuccess', function(file,response) {

				Feng.success("上传成功");
                $("#" + me.uploadPreId).find('.loadingUpload').hide();
				$("#" + me.pictureId).val(response.msg);
                //$("#" + me.uploadPreId).find('img').attr('src', Feng.imgServerPath +"/"+ response);
				if (me.valiForm) {
                    $('#' + me.valiForm).data('bootstrapValidator')
                        .updateStatus(me.pictureId, 'NOT_VALIDATED', null)
                        .validateField(me.pictureId);
				}
			});

			// 文件上传失败，显示上传出错。
			bindedObj.on('uploadError', function(file) {

				Feng.error("上传失败");
                $("#" + me.uploadPreId).find('.loadingUpload').hide();
                $("#" + me.uploadPreId).find('img').attr('src', Feng.ctxPath + '/static/img/defaultImg.jpg');
			});

			// 其他错误
			bindedObj.on('error', function(type) {
				me[objError](type);
			});

			// 完成上传完了，成功或者失败
			bindedObj.on('uploadComplete', function(file) {
			});
		},

        /**
         * 设置图片上传的进度条的id
         */
        setUploadBarId: function (id) {
            this.uploadBarId = id;
        },

        /**
         * 设置图片上传是否验证，验证form名称
         */
        setUploadValidator: function (form) {
            if (form) {
                this.valiForm = form;
            }
        }

	};

	window.$WebUpload = $WebUpload;

}());