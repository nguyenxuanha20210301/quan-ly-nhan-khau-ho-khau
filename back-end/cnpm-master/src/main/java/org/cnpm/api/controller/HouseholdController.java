package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.service.HouseholdService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/household")
public class HouseholdController {

    @Resource
    private HouseholdService service;

    @Operation(summary = "separate household")
    @PostMapping(value = "/separate", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> separateHousehold(

    ){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
