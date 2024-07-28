package org.cnpm.api.persistence.mapper;


import org.cnpm.api.controller.dto.res.ResidentRes;
import org.cnpm.api.persistence.dto.ResidentReq;

import java.util.List;

public interface ResidentMapper {
    int insertResident(ResidentReq req);

    int updateResident(ResidentReq req);

    List<ResidentRes> listResident(ResidentReq req);

    int totalResident(ResidentReq req);
}
