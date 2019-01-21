package com.youedata.nncloud.modular.nanning.shiro;

import org.springframework.beans.factory.annotation.Value;

/**
 * Created by cdyoue on 2016/10/12.
 */
public class ShiroSettings {
    @Value("${shiro.loginSuffix}")
    public String loginSuffix;
    @Value("${shiro.logoutSuffix}")
    public String logoutSuffix;
    @Value("${shiro.casServerUrlPrefix}")
    public String casServerUrlPrefix;
    @Value("${shiro.casFilterUrlPattern}")
    public String casFilterUrlPattern;
    @Value("${shiro.serverUrlprefix}")
    public String serverUrlPrefix;
    @Value("${shiro.successUrl}")
    public String successUrl;
    @Value("${shiro.frontUrl}")
    public String frontUrl;
    
    
    public String getFrontUrl() {
		return frontUrl;
	}

	public void setFrontUrl(String frontUrl) {
		this.frontUrl = frontUrl;
	}

	public String getLoginSuffix() {
        return loginSuffix;
    }

    public void setLoginSuffix(String loginSuffix) {
        this.loginSuffix = loginSuffix;
    }

    public String getLogoutSuffix() {
        return logoutSuffix;
    }

    public void setLogoutSuffix(String logoutSuffix) {
        this.logoutSuffix = logoutSuffix;
    }



    public String getSuccessUrl() {
        return successUrl;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public String getCasFilterUrlPattern() {
        return casFilterUrlPattern;
    }

    public void setCasFilterUrlPattern(String casFilterUrlPattern) {
        this.casFilterUrlPattern = casFilterUrlPattern;
    }

    public String getCasServerUrlPrefix() {
        return casServerUrlPrefix;
    }

    public void setCasServerUrlPrefix(String casServerUrlPrefix) {
        this.casServerUrlPrefix = casServerUrlPrefix;
    }

    public String getServerUrlPrefix() {
        return serverUrlPrefix;
    }

    public void setServerUrlPrefix(String serverUrlPrefix) {
        this.serverUrlPrefix = serverUrlPrefix;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ShiroSettings that = (ShiroSettings) o;

        if (loginSuffix != null ? !loginSuffix.equals(that.loginSuffix) : that.loginSuffix != null) return false;
        if (logoutSuffix != null ? !logoutSuffix.equals(that.logoutSuffix) : that.logoutSuffix != null) return false;
        if (casServerUrlPrefix != null ? !casServerUrlPrefix.equals(that.casServerUrlPrefix) : that.casServerUrlPrefix != null)
            return false;
        if (casFilterUrlPattern != null ? !casFilterUrlPattern.equals(that.casFilterUrlPattern) : that.casFilterUrlPattern != null)
            return false;
        if (serverUrlPrefix != null ? !serverUrlPrefix.equals(that.serverUrlPrefix) : that.serverUrlPrefix != null)
            return false;
        return successUrl != null ? successUrl.equals(that.successUrl) : that.successUrl == null;
    }

    @Override
    public int hashCode() {
        int result = loginSuffix != null ? loginSuffix.hashCode() : 0;
        result = 31 * result + (logoutSuffix != null ? logoutSuffix.hashCode() : 0);
        result = 31 * result + (casServerUrlPrefix != null ? casServerUrlPrefix.hashCode() : 0);
        result = 31 * result + (casFilterUrlPattern != null ? casFilterUrlPattern.hashCode() : 0);
        result = 31 * result + (serverUrlPrefix != null ? serverUrlPrefix.hashCode() : 0);
        result = 31 * result + (successUrl != null ? successUrl.hashCode() : 0);
        return result;
    }
}
