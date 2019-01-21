package com.youedata.nncloud.core.util;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 表情过滤工具
 * @Author: Monkey
 * @Date: Created in 18:02  2018/10/29.
 * @Description:
 */
public class CharacterFilterUtil {

    private static String SPLIT = "\\";

    private static int LENGTH = 4;

    public static boolean autoFilterCharacter (String str) {
        try {
            if (StringUtils.isBlank(str)) {
                return false;
            }
            String regEx="[(\\\\+)(\\d,\\w){3,}]";
            Pattern p = Pattern.compile(regEx);
            Matcher m = p.matcher(str);
            String temp = m.replaceAll("");
            return StringUtils.isBlank(SLEmojiFilterUtil.filterEmoji(temp));
        } catch (Exception e) {
            return false;
        }
    }

    public static String filterCharacter (String str) {
        try {
            if (StringUtils.isBlank(str)) {
                return str;
            }
            String temp = str;
            String temp1 = "";
            while (str.contains(SPLIT) && str.length() >= LENGTH){
                if (str.startsWith(SPLIT) && str.length() > LENGTH) {
                    temp1 = str.substring(0, LENGTH);
                    if (autoFilterCharacter(temp1)) {
                        temp = temp.replace(temp1, "");
                    }
                    str = str.substring(LENGTH);
                } else {
                    str = str.substring(str.indexOf(SPLIT), str.length());
                    if (str.length() >= LENGTH) {
                        temp1 = str.substring(0, LENGTH);
                        if (autoFilterCharacter(temp1)) {
                            temp = temp.replace(temp1, "");
                        }
                        str = str.substring(LENGTH);
                    }
                }

            }
            return SLEmojiFilterUtil.filterEmoji(temp);
        } catch (Exception e) {
            return null;
        }
    }

    public static void main(String[] args) {
        String s1 = "\\xF0\\x9F\\x91\\x8C\\xE8\\xA7";
        s1 = "探探是逗比，蛋蛋也是！";
        s1 = "s探探\\xE8\\xA7是逗比，\\x9F\\x91蛋蛋也是！sss\\1";
        System.out.println(filterCharacter(s1));
    }

}
