package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.ResidentForm;
import org.cnpm.api.service.ResidentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/resident")
public class ResidentController {
    @Resource
    private ResidentService service;

    @Operation(summary = "new resident")
    @PostMapping(value = "/new-resident", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> newResident(
            @RequestBody ResidentForm form
            ){
        // TODO: 13/11/2023
        BaseResponse res = service.insertResident(form);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "update resident")
    @PutMapping(value = "/update-resident", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> updateResident(
            @RequestBody ResidentForm form
    ){
        // TODO: 13/11/2023
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Operation(summary = "update household")
    @PutMapping(value = "/update-household", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> updateHousehold(
//            @RequestBody ResidentForm form
    ){
        // TODO: 13/11/2023  
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
