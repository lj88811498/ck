/*
 * FileName: Encrypt.java
 * Copyright (C) 2016 youedata Tech. Co. Ltd. All Rights Reserved <admin@youedata.com>
 * 
 * Licensed under the youedata License, Version 1.1 (the "License");
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * author  : shenmingzhou <admin@youedata.com>
 * date     : 2016年2月24日 下午2:53:23
 * last modify author :
 * version : 1.1
 */
package com.youedata.nncloud.core.util;

import org.apache.commons.codec.digest.DigestUtils;

//加final是 checkStyle验证  防止实例化工具类
public final class Encrypt {
	// 防止实例化工具类
	private Encrypt() {
	}

	public static String getMd5(String originString) {
		return DigestUtils.md5Hex(originString);
//		// String str = "hello\n";
//		byte[] buf = originString.getBytes();
//		byte[] buf = null;
//		try {
//			buf = originString.getBytes("utf-8");
//		} catch (UnsupportedEncodingException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//		}
//		MessageDigest md5 = null;
//		StringBuilder sb = null;
//		try {
//			md5 = MessageDigest.getInstance("MD5");
//			if (buf != null) {
//				md5.update(buf);
//			}
//			byte[] tmp = md5.digest();
//			sb = new StringBuilder();
//			for (byte b : tmp) {
//				sb.append(Integer.toHexString(
//						b & HttpSessionKey.GOVAFF_WEB_NUMBER_TWO_HUNDRED_FIVETY_FIVE)
//					);
//			}
//			return sb.toString();
//		} catch (NoSuchAlgorithmException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			return null;
//		}
	}

		public static void main(String[] args) {
			String s1 = "c77785580cfdb40b2fb201a196b9e0f6";
			String s2 = "1d7e2594-a3fd-11e7-a356-000c29c0daa1";
			System.out.println(getMd5("monkey1"));
			System.out.println(getMd5(s1 + s2));
			//"e11363cc11a15a13784f65af8f9c81c0"
		}
}
