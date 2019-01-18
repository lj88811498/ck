package com.youedata.nncloud.core.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by sky on 2018/5/18.
 */
public class TrackSplitUtil {

    public static  Object TrackSplit(String s){
        String regEx = "[0-9.]{10,}";
        Pattern pattern = Pattern.compile(regEx);
        Matcher matcher = pattern.matcher(s);
        List list =  new ArrayList();
        Map map = new HashMap();
        while (matcher.find()){
            if (map == null) {
                map = new HashMap();
            }
            String group = matcher.group();
            if (Double.parseDouble(group) > 100) {
                map.put("jd", group);
            } else {
                map.put("wd", group);
            }

            if (map.entrySet().size() > 1) {
                list.add(map);
                map = new HashMap();
            }
        }
        return  list;
    }
}
