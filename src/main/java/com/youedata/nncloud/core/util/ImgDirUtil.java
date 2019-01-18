package com.youedata.nncloud.core.util;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by wangqiang on 2017/8/8.
 */
public class ImgDirUtil {

	/**
	 * 获取图片存取目录
	 * @return
	 */
	public static String getImgDir() {
		String imgDir = "";
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String[] dateArg = format.format(date).split("-");
		int month = Integer.valueOf(dateArg[1]);
		imgDir = dateArg[0] + "_" + dateArg[1] + "_" + dateArg[2] + "/";
//		if(month >= 1 && month <= 3) {
//			imgDir =  dateArg[0] + "_1/" + dateArg[1] + "_" + dateArg[2] + "/";
//		} else if (month >= 4 && month <= 6) {
//			imgDir =  dateArg[0] + "_2/" + dateArg[1] + "_" + dateArg[2] + "/";
//		} else if (month >= 7 && month <= 9) {
//			imgDir =  dateArg[0] + "_3/" + dateArg[1] + "_" + dateArg[2] + "/";
//		} else {
//			imgDir =  dateArg[0] + "_4/" + dateArg[1] + "_" + dateArg[2] + "/";
//		}
		return imgDir;
	}

}
