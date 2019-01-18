package com.youedata.nncloud.core.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Created by sky on 2018/3/29.
 */
public class UploadUtil  {

    /**
     * 上传文件
     * @Author: Monkey
     * @Param: [attachFile, path, pictureName]
     * @Date: Created in  2018/9/12 14:50.
     * @Returns java.lang.String
     */
    public static String uploadFile(MultipartFile attachFile, String path , String pictureName) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            file.mkdirs();
        }
        attachFile.transferTo(new File(path +  pictureName));
        return path +  pictureName;
    }

}
