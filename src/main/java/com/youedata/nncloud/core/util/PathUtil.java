package com.youedata.nncloud.core.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Tangguang on 2017/7/31.
 */
public class PathUtil {
    /**
     * 获取时间格式目录
     *
     * @return
     */
    public static String getDatePath() {

        String dick = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
            dick = sdf.format(new Date());
        } catch (Exception e) {
            dick = "nomuchDich";
        }
        return dick;
    }

    /**
     * 根据文件类型 生成 目录
     *
     * @param type
     * @return
     */
    public static String getTypeDiskPath(String type) {
        String pathDisk = null;
        if (type.indexOf("png") > 0 || type.indexOf("jpg") > 0 || type.indexOf("BMP") > 0 || type.indexOf("GIF") > 0 || type.indexOf("JPEG") > 0) {
            pathDisk = "image";
        } else if (type.indexOf("pdf") > 0 || type.indexOf("PDF") > 0) {
            pathDisk = "pdf";
        } else if (type.indexOf("zip") > 0 || type.indexOf("ZIP") > 0) {
            pathDisk = "zip";
        } else if (type.indexOf("mp4") > 0 || type.indexOf("rmvb") > 0 || type.indexOf("MPEG4") > 0 || type.indexOf("MP4") > 0) {
            pathDisk = "video";
        } else {
            pathDisk = "file";
        }
        return pathDisk;
    }
}
