package com.youedata.nncloud.modular.nanning.listener;

import org.jasig.cas.client.session.SessionMappingStorage;


import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by cdyoue on 2016/10/26.
 */
@WebListener
public final class SingleSignOutHttpSessionListener implements HttpSessionListener {
    private SessionMappingStorage sessionMappingStorage;

    public SingleSignOutHttpSessionListener() {
    }

    @Override
    public void sessionCreated(HttpSessionEvent event) {
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        if(this.sessionMappingStorage == null) {
            this.sessionMappingStorage = getSessionMappingStorage();
        }

        HttpSession session = event.getSession();
        this.sessionMappingStorage.removeBySessionById(session.getId());
    }

    protected static SessionMappingStorage getSessionMappingStorage() {
        return SingleSignOutFilter.getSingleSignOutHandler().getSessionMappingStorage();
    }
}
