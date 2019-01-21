//package com.youedata.nncloud.modular.nanning.timer;
//
//import com.youedata.nncloud.core.log.LogManager;
//import com.youedata.nncloud.core.log.factory.LogTaskFactory;
//import com.youedata.nncloud.modular.nanning.model.Message;
//import com.youedata.nncloud.modular.nanning.model.ReportConfiguration;
//import com.youedata.nncloud.modular.nanning.model.UserInfo;
//import com.youedata.nncloud.modular.nanning.model.WebMessage;
//import com.youedata.nncloud.modular.nanning.service.IMessageService;
//import com.youedata.nncloud.modular.nanning.service.IReportConfigurationService;
//import com.youedata.nncloud.modular.nanning.service.IUserInfoService;
//import com.youedata.nncloud.modular.nanning.service.IWebMessageService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.util.ObjectUtils;
//import org.springframework.util.StringUtils;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * * @program: nncloud
// * * @description:
// * * @author: FXH
// * * @create: 2018-11-27
// **/
//@Component
//public class MessageTimer {
//
//    private Logger log = LoggerFactory.getLogger(this.getClass());
//
//
//
//    @Autowired
//    private IMessageService iMessageService;
//
//    @Autowired
//    private IWebMessageService iWebMessageService;
//
//
//    @Autowired
//    private IReportConfigurationService iReportConfigurationService;
//
//    @Autowired
//    private IUserInfoService iUserInfoService;
//
//    /**
//     * @Description:每个小时0分执行，将系统通知插入到消息表
//     * @return: void
//     * @Author: fxh
//     * @Date: 2018/11/29
//     **/
//    @Scheduled(cron="0 0 * * * *")
//    public void getSystemInfoToMessage(){
//
//
//        log.info("---->系统通知定时任务启动！" );
//
//        /**
//         * 1、查询系统通知表，是否有当前小时内需要发送的消息
//         */
//        List<WebMessage> webMessageList = iWebMessageService.getCurrentInOneHour();
//        if(ObjectUtils.isEmpty(webMessageList)){
//            log.info("系统通知定时任务：当前时间未获取到需要发送的系统通知！" );
//            return;
//        }
//
//
//        /**
//         * 2、当前有需要发送的消息，查询接收用户类型下的具体userid list
//         */
//        List<Message> messageList = new ArrayList<>();
//        Message message;
//        WebMessage webMessage;
//        for(int i = 0; i < webMessageList.size(); i++){
//            webMessage = webMessageList.get(i);
//            String webMessageUserKind = webMessage.getWebMessageUserKind();
//            if(StringUtils.isEmpty(webMessageUserKind)){
//                log.info("系统通知定时任务：系统消息ID[" + webMessage.getWebMessageId() + "]未选择接收用户！" );
//                continue;
//            }
//            webMessageUserKind.replaceAll("，",",");
//            String[] kinds = webMessageUserKind.split(",");
//
//            List<UserInfo> userLists = new ArrayList<>();
//            List<UserInfo> userList;
//            UserInfo userInfo;
//            String userInfoType = "";
//            String userInfoCertificationStatus = "";
//
//            for(int j = 0; j < kinds.length; j++){
//                Boolean flag = true;
//                int kind = Integer.parseInt(kinds[j]);
//                switch(kind){
//                    //未认证
//                    case 0:
//                        userInfoType = "0,1"; //个人、企业
//                        userInfoCertificationStatus = "3"; // 未认证
//                        break;
//                    //认证企业
//                    case 1:
//                        userInfoType = "1"; //企业
//                        userInfoCertificationStatus = "1"; // 已认证
//                        break;
//                    //认证个人
//                    case 2:
//                        userInfoType = "0"; //个人
//                        userInfoCertificationStatus = "1"; // 已认证
//                        break;
//                    //政府用户
//                    case 3:
//                        userInfoType = "2"; //政府
//                        userInfoCertificationStatus = ""; //
//                        break;
//                    default:
//                        flag = false;
//                        log.info("系统通知定时任务：系统消息接收用户类型错误！" );
//                        break;
//                }
//
//
//                if (flag){
//                    userList = iUserInfoService.listByTypeAndStatus(userInfoType,userInfoCertificationStatus);
//                    if(!ObjectUtils.isEmpty(userList)){
//                        userLists.addAll(userList);
//                    }
//                }
//
//            }
//
//
//            /**
//             * 3、将单条系统通知消息与 useridList 组合成消息list
//             */
//            for(int j = 0; j < userLists.size(); j++){
//                userInfo = userLists.get(j);
//                message = new Message();
//                message.setMessageContent(webMessage.getWebMessageContext());
//                message.setMessageQuestionId(webMessage.getWebMessageId());
//                message.setMessageUserId(userInfo.getUserInfoId());
//                message.setMessageType("3");  //消息类型:1.问题反馈，2.催报通知，3.系统通知，4.认证通知
//                messageList.add(message);
//            }
//
//        }
//
//        //启动线程进行批量插入
//        LogManager.me().executeBatchInsert(LogTaskFactory.batchInsertMessage(messageList));
//
////        iMessageService.insertBatch(messageList);
//
//        log.info("---->系统通知定时任务结束！" );
//    }
//
//
//    /**
//     * @Description:每天0时执行，将工业、财务填报通知插入到消息表
//     * @return: void
//     * @Author: fxh
//     * @Date: 2018/11/29
//     **/
//    @Scheduled(cron="0 0 0 * * *")
//    public void getReportToMessage(){
//
//        log.info("---->催报通知定时任务启动！" );
//        /**
//         * 1、查询工业、财务填报表，是否有当天需要催报的信息
//         */
//        List<ReportConfiguration> reportList = iReportConfigurationService.getCurrentInOneDay();
//        if(ObjectUtils.isEmpty(reportList)){
//            log.info("催报通知定时任务：当前时间未获取到需要催报的信息！" );
//            return;
//        }
//
//        /**
//         * 2、有，则查询企业用户userid list
//         */
//        String userInfoType = "1"; //企业
//        String userInfoCertificationStatus = "1"; // 已认证
//        List<UserInfo> userList = iUserInfoService.listByTypeAndStatus(userInfoType,userInfoCertificationStatus);
//        if(ObjectUtils.isEmpty(userList)){
//            log.info("催报通知定时任务：当前时间已获取到需要催报的信息，但未获取到需接收信息的企业用户对象！" );
//            return;
//        }
//
//        /**
//         * 3、将userid 与 消息内容组合插入到消息表
//         */
//        List<Message> messagesList = new ArrayList<>();
//        ReportConfiguration reportConfiguration;
//        UserInfo userInfo;
//        Message message;
//        String reportConfigurationType;
//        for(int i = 0; i < reportList.size(); i++){
//            reportConfiguration = reportList.get(i);
//            for(int j = 0; j < userList.size(); j++){
//                userInfo = userList.get(j);
//                message = new Message();
//                reportConfigurationType = reportConfiguration.getReportConfigurationType().equals("1")?"【工业填报】":"【财务填报】";
//                message.setMessageContent(reportConfigurationType + reportConfiguration.getReportConfigurationName());
//                message.setMessageQuestionId(reportConfiguration.getReportConfigurationId());
//                message.setMessageUserId(userInfo.getUserInfoId());
//                message.setMessageType("2");  //消息类型:1.问题反馈，2.催报通知，3.系统通知，4.认证通知
//                messagesList.add(message);
//            }
//        }
//
//
//        //启动线程进行批量插入
//        LogManager.me().executeBatchInsert(LogTaskFactory.batchInsertMessage(messagesList));
////        iMessageService.insertBatch(messagesList);
//
//        log.info("---->催报通知定时任务结束！" );
//    }
//
//
//
//}
