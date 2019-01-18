package com.youedata.nncloud.core.util;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by sky on 2018/5/9.
 */
public class ExportUtil {

    /**
     * excel文件导出
     *
     * @param resource
     * @param mobanName
     * @return
     */
    public static  HSSFWorkbook downExcel(ArrayList<Map<String, Object>> resource, String mobanName) {
        HSSFWorkbook wb = null;
        //读取模板
        try {

//            String fileDir = Class.class.getClass().getResource("/").getPath() + "doc";

            InputStream jarFile =getJarFIle("doc",mobanName );

//            File demoFile = new File(fileDir + "/" + mobanName);
//            FileInputStream in = new FileInputStream(demoFile);
            wb = new HSSFWorkbook(jarFile);
            HSSFSheet sheet = wb.getSheetAt(0);

            //拿到模板占位符位置
            int lastRowNum = sheet.getLastRowNum();
            ArrayList<Map> maps = new ArrayList<>();
            HashMap<String, String> map = new HashMap<>();
            for (int i = 0; i <= lastRowNum; i++) {
                //行
                HSSFRow row = sheet.getRow(i);
                int lastCellNum = row.getLastCellNum();
                for (int j = 0; j < lastCellNum; j++) {
                    String value = row.getCell(j).getStringCellValue();
                    String regEx = "\\$.*?\\$";
                    boolean result = Pattern.compile(regEx).matcher(value).find();
                    if (result) {
                        //横
                        int x = j;
                        //纵
                        int y = i;
                        String key = value.substring(1, value.length() - 1);
                        HashMap<String, Object> tempMap = new HashMap<>();
                        tempMap.put("x", x);
                        tempMap.put("y", y);
                        tempMap.put("key", key);
                        maps.add(tempMap);
                    }
                }
            }
            //填充数据
            for (int i = 0; i < resource.size(); i++) {
                for (Map.Entry<String, Object> entry : resource.get(i).entrySet()) {
                    maps.forEach(temp -> {
                        if (entry.getKey().equals(temp.get("key"))) {
                            Integer y = (Integer) temp.get("y");
                            Integer x = (Integer) temp.get("x");
                            HSSFCell cell = null;
                            HSSFRow row = null;
                            row = sheet.getRow(y);
                            try {
                                cell = row.getCell(x);//替换
                                cell.setCellValue((String) entry.getValue());
                            } catch (Exception e) {
                                try {
                                    cell = row.createCell(x);//新增
                                    cell.setCellValue((String) entry.getValue());
                                } catch (Exception e1) {
                                    row = sheet.createRow(y);
                                    cell = row.createCell(x);//新增
                                    cell.setCellValue((String) entry.getValue());
                                }
                                //cell.setCellStyle(sheet.getRow(y-1).getCell(x).getCellStyle());
                            }

                            temp.put("y", y + 1);
                        }
                    });
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return wb;
    }


    /**
     * 获取jar 中的文件
     * @param folder
     * @param fileName
     * @return
     */
    private static InputStream getJarFIle(String folder, String fileName){
        ClassLoader classLoader = new ExportUtil().getClass().getClassLoader();
        InputStream stream = classLoader.getResourceAsStream(folder + "/"+fileName);
        return stream;
    }
}
