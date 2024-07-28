package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.exceptions.SERuntimeException;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.LoginInfo;
import org.cnpm.api.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@Tag(name = "Auth Controller", description = "")
@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/auth")
public class AuthController {
    @Resource
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Login.", description = "Login")
    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> login(@RequestBody LoginInfo loginInfo)  throws SERuntimeException {
        BaseResponse response = authService.login(loginInfo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
