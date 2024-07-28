package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.config.utils.response.DataListResponse;
import org.cnpm.api.persistence.dto.ForgotPasswordForm;
import org.cnpm.api.persistence.dto.PasswordForm;
import org.cnpm.api.persistence.dto.User;
import org.cnpm.api.persistence.mapper.UserMapper;
import org.cnpm.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    @Override
    public BaseResponse changePassword(PasswordForm form) {
        // TODO: 08/11/2023  
        return null;
    }

    @Override
    public BaseResponse forgotPassword(ForgotPasswordForm form) {
        // TODO: 08/11/2023  
        return null;
    }

    @Override
    public BaseResponse updateProfile(User user) {
        // TODO: 08/11/2023  
        return null;
    }

    @Override
    public BaseResponse listUser(){
        List<User> userList = userMapper.listUser();
        return DataListResponse.builder().dataList(userList).build();
    }
}
