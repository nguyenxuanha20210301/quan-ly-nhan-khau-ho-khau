package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.exceptions.SEValidateException;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.FeeForm;
import org.cnpm.api.controller.dto.IdList;
import org.cnpm.api.service.FeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/fee")
public class FeeController {
    @Resource
    private FeeService service;

    @Operation(summary = "list fee")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> listFee(
            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
            @RequestParam(name = "pageNum", defaultValue = "1") int pageNum,
            @RequestParam(name = "orderBy", required = false) String orderBy,
            @RequestParam(name = "orderTp", required = false) String orderTp,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "year", required = false) Integer year,
            @RequestParam(name = "dateFrom", required = false) String dateFrom,
            @RequestParam(name = "dateTo", required = false) String dateTo
    ){
        BaseResponse res =  service.listFee(pageSize, pageNum, orderBy, orderTp, keyword, year, dateFrom, dateTo);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @Operation(summary = "new fee")
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> newFee(
            @RequestBody FeeForm form
            ) throws SEValidateException {
        BaseResponse res = service.addFee(form);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "edit fee")
    @PutMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> editFee(
            @RequestBody FeeForm form
    ) throws SEValidateException {
        BaseResponse res = service.editFee(form);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @Operation(summary = "delete fee")
    @DeleteMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> deleteFee(
            @RequestBody IdList idList
            ) throws SEValidateException {
        BaseResponse res = service.deleteFee(idList);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
