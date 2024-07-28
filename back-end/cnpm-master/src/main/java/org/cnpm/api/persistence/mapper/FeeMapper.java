package org.cnpm.api.persistence.mapper;

import org.cnpm.api.controller.dto.res.FeeRes;
import org.cnpm.api.persistence.dto.FeeReq;

import java.util.List;

public interface FeeMapper {
    List<FeeRes> list (FeeReq req);

    int total(FeeReq req);

    int insert(FeeReq req);

    int update(FeeReq req);

    int delete(List<Integer> idList);
}
