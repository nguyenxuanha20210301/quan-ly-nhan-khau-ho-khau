package org.cnpm.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.service.CollectionService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@Slf4j
@RequestMapping(value = "${api.prefix}/collection")
public class CollectionController {
    @Resource
    private CollectionService service;


}
