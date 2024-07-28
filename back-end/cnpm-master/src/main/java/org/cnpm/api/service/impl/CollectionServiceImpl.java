package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.persistence.mapper.CollectionMapper;
import org.cnpm.api.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CollectionServiceImpl implements CollectionService {
    @Autowired
    private CollectionMapper mapper;
}
