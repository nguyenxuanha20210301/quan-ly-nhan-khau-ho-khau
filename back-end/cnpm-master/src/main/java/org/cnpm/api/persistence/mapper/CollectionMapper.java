package org.cnpm.api.persistence.mapper;

import org.cnpm.api.persistence.dto.CollectionReq;
import org.mapstruct.Mapper;

@Mapper
public interface CollectionMapper {
    int insert(CollectionReq req);

    int update(CollectionReq req);
}
