package com.youedata.nncloud.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;




public class UrlsUtil {
	/**
	 * 通过url路径获取信息
	 * @param url
	 * @return
	 */
	public static List loadJson(String url) {
		List jsonArray = new ArrayList<>();
        StringBuilder json = new StringBuilder();
        try {
            URL urlObject = new URL(url);
            URLConnection uc = urlObject.openConnection();
            BufferedReader in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
            String inputLine = null;
            while ( (inputLine = in.readLine()) != null) {
                json.append(inputLine);
            }
            JSONObject jsonObject = JSONObject.parseObject(json.toString());
	        if(Integer.parseInt(jsonObject.get("staute").toString())==200){
	        	jsonArray = (List) jsonObject.get("list");
	        }
            in.close();
        } catch (MalformedURLException e) {
        	e.printStackTrace();
        } catch (IOException e) {
        	e.printStackTrace();
        }
        return jsonArray;
    }
	
	
}
