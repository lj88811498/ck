//package com.youedata.nncloud.core.util;
//
//import net.sf.json.JSONObject;
//import org.apache.commons.lang3.StringUtils;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.io.Serializable;
//import java.util.*;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//import static org.apache.commons.beanutils.BeanUtils.copyProperties;
//
///**
// * @Author: Monkey
// * @Date: Created in 14:53  2018/8/23.
// * @Description:
// */
//@Component
//public class SpiderUtil implements Serializable{
//
//    /**
//     * @Author: Monkey
//     * @Param:  方法类型
//     * @Date: Created in  2018/8/23 15:11.
//     * @Returns
//     */
//    public static String METHOD_TYPE_GET = "GET";
//    public static String METHOD_TYPE_POST = "POST";
//    /**
//     * 超时
//     * @Author: Monkey
//     * @Param:
//     * @Date: Created in  2018/8/23 16:13.
//     * @Returns
//     */
//    public static int TIME_OUT = 3000;
//    /**
//     * 浏览器类型
//     * @Author: Monkey
//     * @Param:
//     * @Date: Created in  2018/8/23 16:12.
//     * @Returns
//     */
//    public static String[] BROWSE = {"Gecko", "Mozilla", "WebKit", "KHTML", "Presto", "Trident", "Tasman"};
//    /**
//     * @Author: Monkey
//     * @Param:  天涯社区
//     * @Date: Created in  2018/8/23 14:56.
//     * @Returns
//     */
//    public static String HTTP_PREFIX = "http://";
//    public static String TIANYA_HOST = "bbs.tianya.cn";
//    public static String TIANYA_URL = "http://bbs.tianya.cn/list-284-1.shtml";
//    /**
//     * @Author: Monkey
//     * @Param:  百度贴吧
//     * @Date: Created in  2018/8/23 14:56.
//     * @Returns
//     */
//    public static String BAIDU_PREFIX = "http:";
//    public static String BAIDU_HOST = "tieba.baidu.com";
//    public static String BAIDU_URL = "http://tieba.baidu.com/f?kw=%E9%83%AB%E5%8E%BF&ie=utf-8";
//
//    public static String[] FROM = {"天涯社区", "百度贴吧"};
//    public static String[] TYPE = {"论坛", "贴吧"};
//    public static String INFOS = "infos";
//    public static String HREF = "href";
//    /**
//     * 抓取涉网信息
//     * @Author: Monkey
//     * @Param: [url, method]
//     * @Date: Created in  2018/8/23 16:13.
//     * @Returns java.util.List<org.jsoup.select.Elements>
//     */
//    private static Document crawler(String ...param) throws Exception{
//        Document doc = null;
//        int index = getRandom();
//        try {
//            if (param.length > 1) {
//                if (param[1].toUpperCase().equals(METHOD_TYPE_POST)) {
//                    doc = Jsoup.connect(param[0])
//                            .timeout(TIME_OUT)
//                            .userAgent(BROWSE[index])
//                            .post();
//                } else if (param[1].toUpperCase().equals(METHOD_TYPE_GET)) {
//                    doc = Jsoup.connect(param[0])
//                            .timeout(TIME_OUT)
//                            .userAgent(BROWSE[index])
//                            .get();
//                }
//            } else {
//                doc = Jsoup.connect(param[0])
//                        .timeout(TIME_OUT)
//                        .userAgent(BROWSE[index])
//                        .get();
//            }
//
//            return doc;
//        } catch (IOException e) {
//            doc = Jsoup.connect(param[0])
//                    .timeout(TIME_OUT)
//                    .userAgent(BROWSE[index])
//                    .get();
//            RecordLogUtil.info("地址 = " + param[0] + "， 抓取失败！");
//            //throw new Exception("地址 = " + param[0] + "， 抓取失败！");
//            return doc;
//        }
//    }
//    /**
//     * 抓取涉网信息
//     * @Author: Monkey
//     * @Param: [url, method]
//     * @Date: Created in  2018/8/23 16:13.
//     * @Returns java.util.List<org.jsoup.select.Elements>
//     */
//    public static Map crawler(String url, String method) throws Exception{
//        try {
//            Document doc = null;
//            int index = getRandom();
//            if (method.toUpperCase().equals(METHOD_TYPE_POST)) {
//                doc = Jsoup.connect(url)
//                        .timeout(TIME_OUT)
//                        .userAgent(BROWSE[index])
//                        .post();
//            } else if (method.toUpperCase().equals(METHOD_TYPE_GET)) {
//                doc = Jsoup.connect(url)
//                        .timeout(TIME_OUT)
//                        .userAgent(BROWSE[index])
//                        .get();
//            }
//
//            Map map = AnalysisData(doc, url);
//            AnalysisObject(map);
//            return map;
//        } catch (IOException e) {
//            //throw new Exception("地址 = " + url + "， 抓取失败！");
//            return null;
//        }
//    }
//    /**
//     * 解析核心内容和分页的地址
//     * @Author: Monkey
//     * @Param: [doc, url]
//     * @Date: Created in  2018/8/23 16:12.
//     * @Returns java.util.List<org.jsoup.select.Elements>
//     */
//    private static Map AnalysisData(Document doc, String url) throws Exception{
//        Map map = new HashMap<>();
//        if (url.contains(TIANYA_HOST)) {
//            Elements aElements = doc.select("a:containsOwn(下一页)");
//            Elements es = doc.select("tbody");
//            Elements trElements = es.select("tr");
//            packageObject(aElements, url, map);
//            packageObject(trElements, url, map);
//        } else if (url.contains(BAIDU_HOST)) {
//            Elements aElements = doc.select("a:containsOwn(下一页>)");
//            Elements elements = doc.select("#thread_list");
//            Elements lis = elements.select("li.clearfix");
//            packageObject(aElements, url, map);
//            packageObject(lis, url, map);
//        }
//        return map;
//    }
//    /**
//     * 包装数据
//     * @Author: Monkey
//     * @Param: [elements, url, map]
//     * @Date: Created in  2018/8/23 17:26.
//     * @Returns void
//     */
//    private static void packageObject(Elements elements, String url, Map map) throws Exception {
//        List<InternetInfo> list = new ArrayList();
//
//        //下一页<a href="/list.jsp?item=63&amp;nextid=1534930071
//        // 000" rel="nofollow">下一页</a>
//        //<a href="//tieba.baidu.com/f?kw=%E9%83%AB%E5%8E%BF&amp;ie=utf-8&amp;pn=50" class="next pagination-item ">下一页&gt;</a>
//        if (elements.size() == 1) {
//            Element e = elements.get(0);
//            String href = e.attr(HREF);
//            if (StringUtils.isBlank(href)) {
//                throw new Exception("获取下一页路径失败！");
//            } else {
//                map.put(HREF, href);
//            }
//            return;
//        }
//
//        if (elements.size() > 1) {
//            if (url.contains(TIANYA_HOST)) {
//                map.put("host", TIANYA_HOST);
//                for (Element e : elements) {
//                    InternetInfo i = new InternetInfo();
//                    Elements e1 = e.select("td > a");
//                    if (e1.size() > 0) {
//                        String time = e.select("td[title]").text();
//                        String name = e1.get(e1.size() - 2).text();
//                        String link = e1.get(e1.size() - 2).attr(HREF);
//                        Elements e2 = e1.select("a.author");
//                        String author = e2.get(0).text();
//                        i.setInternetInfoPublishTime(time);
//                        i.setInternetInfoName(name);
//                        i.setInternetInfoAuthor(author);
//                        i.setInternetInfoLink(link);
//                        list.add(i);
//                    }
//                }
//            } else if (url.contains(BAIDU_HOST)) {
//                map.put("host", BAIDU_HOST);
//                for (Element e : elements) {
//                    String time = e.select("span[title=创建时间]").get(0).text();
//                    Element e1 = e.select("span.tb_icon_author").get(0);
//                    String author = e1.attr("title");
//                    if (StringUtils.isNotBlank(author)) {
//                        author = author.replaceAll("主题作者: ", "");
//                    }
//                    Element a = e.select("a").get(0);
//                    String name = a.text();
//                    String link = a.attr("href");
//                    InternetInfo i = new InternetInfo();
//                    i.setInternetInfoPublishTime(time);
//                    i.setInternetInfoName(name);
//                    i.setInternetInfoLink(link);
//                    i.setInternetInfoAuthor(author);
//                    list.add(i);
//                }
//            }
//            map.put("list", list);
//
//        }
//    }
//
//    public static void AnalysisObject(Map map) throws Exception {
//        if (map != null) {
//            String host = (String) map.get("host");
//            List<InternetInfo> list = (List<InternetInfo>) map.get("list");
//            String url = null;
//            List<List<InternetInfo>> infos = new ArrayList<>();
//            for (InternetInfo i : list) {
//                String link = i.getInternetInfoLink();
//                if (host.contains(TIANYA_HOST)) {
//                    if (link.contains(TIANYA_HOST)) {
//                        url = link.contains(HTTP_PREFIX) ? link : HTTP_PREFIX + link;
//                    } else {
//                        url =  link.contains(HTTP_PREFIX) ? host + link : HTTP_PREFIX + host + link;
//                    }
//                } else if (host.contains(BAIDU_HOST)) {
//                    if (link.contains(BAIDU_HOST)) {
//                        url = link.contains(HTTP_PREFIX) ? link : HTTP_PREFIX + link;
//                    } else {
//                        url =  link.contains(HTTP_PREFIX) ? host + link : HTTP_PREFIX + host + link;
//                    }
//                }
//
//                infos.add(getInfos(url, host));
////                String u = "D:\\YouE\\反邪教\\爬虫\\天涯社区—郫县-" + replaceSpecStr(i.getInternetInfoName()) + ".html";
////                FileWriter fw = new FileWriter(u);
////                File f = new File(u);
////                if (!f.exists()) {
////                    f.createNewFile();
////                }
////                fw.write(doc.toString());
//            }
//            map.remove("list");
//            map.put(INFOS, infos);
////            return infos;
//        }
//    }
//
//    /**
//     * 抓取详情页，并且存储到db
//     * @Author: Monkey
//     * @Param: [url]
//     * @Date: Created in  2018/8/27 10:37.
//     * @Returns void
//     */
//    private static List<InternetInfo> getInfos(String url, String host) throws Exception{
//
//        List<InternetInfo> internetInfos = new ArrayList<>();
//        //RecordLogUtil.info("抓取地址，url = " + url);
//        Document doc = crawler(url);
//        if (doc == null) {
//            return null;
//        }
//        //主体doc.body().select(".atl-main");
//        Element body = doc.body();
//        Elements titles = body.select("h1");
//        String title = titles.get(0).text();
//        if (host.contains(TIANYA_HOST)) {
//            //标题 只有一个
//            //内容
//            Elements contentDivs = body.select(".atl-content");
//            Elements contents = body.select(".bbs-content");
//            Elements authors = body.select("a[uname]");
//            Elements times = body.select(".atl-info");
//            if (contents.size() != authors.size()) {
//                throw new Exception("抓取页面失败！地址=" + url + ",contents=" + contents.size() + ",authors=" + authors.size());
//            } else {
//                //循环遍历插入到db
//                for (int i = 0; i < authors.size(); i ++) {
//                    InternetInfo info = new InternetInfo();
//                    String time1 = times.get(i).select("span").get(1).text();
//                    String content = contentDivs.get(i).select(".bbs-content").get(0).text();
//                    info.setInternetInfoAuthor(replaceSpecStr(authors.get(i).text()));
//                    info.setInternetInfoContent(replaceSpecStr(content));
//                    info.setInternetInfoName(replaceSpecStr(title));
//                    info.setInternetInfoFrom(FROM[0]);
//                    info.setInternetInfoLink(url);
//                    info.setInternetInfoType(TYPE[0]);
//                    info.setInternetInfoPublishTime(time1);
//                    internetInfos.add(info);
//                    if (contentDivs.get(i).select("ul").size() > 0) {
//                        Elements ul = contentDivs.get(i).select("ul");
//                        Elements li = ul.select("li");
//                        for (Element e : li) {
//                            InternetInfo tempInternetInfo = new InternetInfo();
//                            copyProperties(tempInternetInfo, info);
//                            String author = e.select(".ir-user").text().replaceAll("：", "");
//                            String cont = e.select(".ir-content").text();
//                            String time = e.select("p > span").get(1).text();
//                            tempInternetInfo.setInternetInfoAuthor(replaceSpecStr(author));
//                            tempInternetInfo.setInternetInfoContent(replaceSpecStr(cont));
//                            tempInternetInfo.setInternetInfoPublishTime(time);
//                            internetInfos.add(tempInternetInfo);
//                        }
//                    }
//
//                }
//            }
//        } else if (host.contains(BAIDU_HOST)) {
//            Elements e1 = doc.select("#pb_content");
//            Elements authors = e1.select("a[alog-group=p_author]");
//            Elements contents = e1.select("div[id^=post_content]");
//            Elements times = e1.select(".l_post,.j_l_post,.l_post_bright");
//
//            for (int i = 0; i < authors.size(); i ++) {
//                InternetInfo tempInternetInfo = new InternetInfo();
//                String author = authors.get(i).text();
//                String content = contents.get(i).text();
//                Elements e2 = times.get(i).select("div[data-field]");
//                if (e2.size() > 0) {
//                    String t = e2.get(0).attr("data-field");
//                    if (StringUtils.isBlank(t)) {
//                        continue;
//                    }
//                    t = t.replaceAll("\"", "'");
//                    JSONObject js = JSONObject.fromObject(t);
//                    if (js.get("content") instanceof JSONObject) {
//                        JSONObject cont = (JSONObject)js.get("content");
//                        tempInternetInfo.setInternetInfoPublishTime(cont.get("date").toString());
//                    }
//                } else {
//                    continue;
//                }
//
//                tempInternetInfo.setInternetInfoAuthor(author);
//                tempInternetInfo.setInternetInfoLink(url);
//                tempInternetInfo.setInternetInfoContent(replaceSpecStr(content));
//                tempInternetInfo.setInternetInfoName(replaceSpecStr(title));
//                tempInternetInfo.setInternetInfoFrom(FROM[1]);
//                tempInternetInfo.setInternetInfoType(TYPE[1]);
//
//                internetInfos.add(tempInternetInfo);
//            }
//        }
//        return internetInfos;
//    }
//
//
//    /**
//     * 正则替换所有特殊字符
//     * @param orgStr
//     * @return
//     */
//    public static String replaceSpecStr(String orgStr){
//        if (null!=orgStr&&!"".equals(orgStr.trim())) {
//
//            //保留-_避免音乐名称出现
//            //String regEx="[\\s~·`!！@#￥$%^……&*（()）\\" + "\\" + "=+【\\[\\]】｛{}｝\\|、\\\\；;：:‘'“”\"，,《<。.》>、/？?]";
//            //String regEx4 = "[\\s~·`!！@#￥$%^……&*（()）\\-——\\-_=+【\\[\\]】｛{}｝\\|、\\\\；;：:‘'“”\"，,《<。.》>、/？?]";
//            //String regEx="[^\\u4e00-\\u9fa5]";
//            String regEx1="[\\xF0\\x9F\\x98\\x8A\\uD83D\\uDE02\\uD83D\\uDE02]";
//            String regEx2="[\\xF0\\x9F\\x98\\x82\\xF0\\x9F\\xF0\\x9F\\x98\\x84]";
//            String regEx3 = "[\\\\x]";
//            Pattern p = Pattern.compile(regEx1);
//            Matcher m = p.matcher(orgStr);
//            String temp = m.replaceAll("");
////            p = Pattern.compile(regEx1);
////            m = p.matcher(temp);
////            temp = m.replaceAll("");
//            p = Pattern.compile(regEx2);
//            m = p.matcher(temp);
//            temp = m.replaceAll("");
//            p = Pattern.compile(regEx3);
//            m = p.matcher(temp);
//            return m.replaceAll("");
//        }
//        return null;
//    }
//
//    /**
//     * 随机用浏览器去抓取
//     * @Author: Monkey
//     * @Param: []
//     * @Date: Created in  2018/8/23 15:25.
//     * @Returns int
//     */
//    public static int getRandom() {
//
//        return new Random().nextInt(BROWSE.length);
//    }
//
//
//
//    public static void main(String[] args) throws Exception {
//        System.out.println(crawler(BAIDU_URL, METHOD_TYPE_GET));
////        System.out.println(replaceSpecStr("告诉我现在郫县办身份证的在哪个踏踏，多谢各位。\uD83D\uDE02\\xF0\\x9F\\x98\\x8A"));
////        System.out.println(replaceSpecStr("\\xF0\\x9F\\x98\\x8A郫县附近有教,_唱歌的吗\uD83D\uDE0A\\xF0\\x9F\\x98\\x85"));
//    }
//
//}
