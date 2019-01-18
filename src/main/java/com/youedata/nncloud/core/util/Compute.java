package com.youedata.nncloud.core.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by sky on 2018/4/18.
 */
public class Compute {
    public static boolean computeData() {
        boolean result=true;
        File dir = new File(Class.class.getClass().getResource("/").getPath() + "py");
        try {
            //Process proc = Runtime.getRuntime().exec("cmd /c [dir+\"\\fanxie.py\"]");
            Process proc = Runtime.getRuntime().exec("python fanxie.py", null, dir);
            //Process proc = Runtime.getRuntime().exec("python fanxie.py", null, dir);
            BufferedReader bufferedReader =
                    new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
                result=true;
            }
            proc.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return result;

    }

//    public static boolean computeGdpYear() {
//        boolean result=false;
//        File dir = new File(Class.class.getClass().getResource("/").getPath() + "py");
//        try {
//            Process proc = Runtime.getRuntime().exec("python GDP_years_predict.py", null, dir);
//            BufferedReader bufferedReader =
//                    new BufferedReader(new InputStreamReader(proc.getInputStream()));
//            String line;
//            while ((line = bufferedReader.readLine()) != null) {
//                System.out.println(line);
//                result=true;
//            }
//            proc.waitFor();
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        return result;
//    }
public static void main(String[] args) {
    Compute.computeData();

}
}
