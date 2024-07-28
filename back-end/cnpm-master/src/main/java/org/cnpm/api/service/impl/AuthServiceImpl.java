package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.auth.utils.JwtUtil;
import org.cnpm.api.config.utils.exceptions.SERuntimeException;
import org.cnpm.api.config.utils.exceptions.SEValidateException;
import org.cnpm.api.config.utils.response.AuthUser;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.config.utils.response.DataResponse;
import org.cnpm.api.controller.dto.LoginInfo;
import org.cnpm.api.persistence.dto.User;
import org.cnpm.api.persistence.mapper.UserMapper;
import org.cnpm.api.service.AuthService;
import org.cnpm.api.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    @Autowired
    private final UserMapper userMapper;

    @Resource
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserMapper userMapper, JwtUtil jwtUtil) {
        this.userMapper = userMapper;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public BaseResponse login(LoginInfo loginInfo) throws SERuntimeException {
        User req = new User();
        if (null == loginInfo){
            throw new SEValidateException("form k hoop le");
        }
//        if (!PasswordUtil.validatePassword(loginInfo.getUserPw())){
//            throw new SEValidateException("pw k hop le");
//        }
        req.setEmail(loginInfo.getEmail());
        User resUser = userMapper.selectByEmail(req);
        if (null != resUser) {
//            if (!PasswordUtil.isPasswordMatch(loginInfo.getUserPw(), resUser.getUserPw())){
//                throw new SEValidateException("pw k khop");
//            }
            String token = jwtUtil.getToken(resUser);
            AuthUser authUser = new AuthUser();
            authUser.setUserEmail(resUser.getEmail());
            authUser.setUserId(resUser.getUserId());
            authUser.setToken(token);
            return DataResponse.successWithData(authUser);
        }else {
            throw new SEValidateException("user not found");
        }
    }
}
