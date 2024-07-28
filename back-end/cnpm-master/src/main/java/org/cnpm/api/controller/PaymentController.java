package org.cnpm.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.awt.*;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/payment")
public class PaymentController {

    @Resource
    private PaymentService service;

    @Operation(summary = "payment history")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> list(
            @RequestParam(name = "status", required = false) Integer status,
            @RequestParam(name = "dateFrom", required = false) String dateFrom,
            @RequestParam(name = "dateTo", required = false) String dateTo,
            @RequestParam(name = "keyword", required = false) String keyword

    ){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Operation(summary = "approve, reject payment")
    @PutMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @SecurityRequirement(name = "Authorization")
    public ResponseEntity<Object> approve(
            @RequestParam(name = "id") int id,
            @RequestParam(name = "status") int status
    ){
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
