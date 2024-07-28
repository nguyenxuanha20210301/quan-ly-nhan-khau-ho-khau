package org.cnpm.api.config.utils;

import org.cnpm.api.persistence.dto.User;
import org.springframework.security.core.context.SecurityContextHolder;

public class LoggedInUserUtil {
    private LoggedInUserUtil(){

    }
    public static User getLoggedInUser() {
        try{
            return  (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }catch (ClassCastException ex){
            User admin = new User();
            admin.setUserId("admin");
            return admin;
        }
    }
}
