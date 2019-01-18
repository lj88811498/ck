package com.youedata.nncloud.core.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: Monkey
 * @Date: Created in 16:31  2018/4/10.
 * @Description:
 */
public class ParseUtil {

    private static List<String> list = new ArrayList<String>();


    static {
        list.add("involvingEvilFamilyIn");
        list.add("involvingEvilStriked");
        list.add("involvingEvilStillIn");
        list.add("involvingEvilEscape");
        list.add("involvingEvilControlled");
        list.add("involvingEvilOtherLocal");
        list.add("involvingEvilFixProcess");
        list.add("involvingEvilPrison");
        list.add("involvingEvilPersonalComputer");
        list.add("involvingEvilInternet");
        list.add("involvingEvilRelativesOut");
        list.add("involvingEvilHavePassport");
        list.add("involvingEvilBorderControl");
        list.add("involvingEvilAbroad");
        list.add("involvingEvilHaveAbroad");

    }

    /**
     * 拷贝相同字段的值
     *
     * @Author: Monkey
     * @Param: [map, target]
     * @Date: Created in  2018/4/10 17:02.
     * @Returns void
     */
    public static void parseProperties(Map map) {
        try {
            for (String str : list) {
                Object o = map.get(str);
                if (o != null) {
                    invokeMethod(map, str, o);
                }
            }
        } catch (Exception e) {
            RecordLogUtil.error("映射异常！BeanUtil.copyProperties", e);
        }
    }

    /**
     * 设置字段值
     *
     */
    private static void invokeMethod(Map map, String key, Object o1) {

        try {
            String val = "否";

            if (o1 != null) {
                if (o1 instanceof Integer || Integer.parseInt(o1.toString()) > 0) {
                    val = "是";
                }
            }

            map.put(key, val);
        } catch (Exception e) {
            RecordLogUtil.error("BeanUtil.invokeMethod error", e);
        }
    }


    public static void main(String[] args) {

        Map map = new HashMap();
        map.put("involvingEvilStillIn", 0);
        map.put("involvingEvilHavePassport", 10);
        map.put("involvingEvilInternet", 2);

        parseProperties(map);
        System.out.println(map);
    }


}
