package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.persistence.dto.PasswordForm;
import org.cnpm.api.persistence.dto.User;
import org.cnpm.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.ws.rs.core.MediaType;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/info")
public class UserController {
    @Resource
    private UserService service;

    @Operation(summary = "change password")
    @PostMapping(value = "change-password", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<Object> changePassword(
            @RequestBody PasswordForm form
            ){
        BaseResponse res = service.changePassword(form);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Operation(summary = "update profile")
    @PutMapping(value = "", produces = MediaType.APPLICATION_JSON)
    public ResponseEntity<Object> updateProfile(
            @RequestBody User user
            ){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
