package org.cnpm.api.service;


import org.cnpm.api.config.utils.exceptions.SERuntimeException;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.LoginInfo;

public interface AuthService {

    BaseResponse login(LoginInfo loginInfo) throws SERuntimeException;

}
