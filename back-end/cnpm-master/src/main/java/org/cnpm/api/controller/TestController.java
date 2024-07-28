package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "${api.prefix}/test")
public class TestController {

    @Resource
    private UserService service;

    @GetMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    ResponseEntity<Object> test(){
        BaseResponse res = service.listUser();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
