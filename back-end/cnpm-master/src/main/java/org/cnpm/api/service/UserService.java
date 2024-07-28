package org.cnpm.api.service;

import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.persistence.dto.ForgotPasswordForm;
import org.cnpm.api.persistence.dto.PasswordForm;
import org.cnpm.api.persistence.dto.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    BaseResponse changePassword(PasswordForm form);

    BaseResponse forgotPassword(ForgotPasswordForm form);

    BaseResponse updateProfile(User user);


    BaseResponse listUser();
}
