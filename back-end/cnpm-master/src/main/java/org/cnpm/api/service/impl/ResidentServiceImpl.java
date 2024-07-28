package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.config.utils.response.DataListResponse;
import org.cnpm.api.controller.dto.ResidentForm;
import org.cnpm.api.controller.dto.res.ResidentRes;
import org.cnpm.api.persistence.dto.ResidentReq;
import org.cnpm.api.persistence.mapper.ResidentMapper;
import org.cnpm.api.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ResidentServiceImpl implements ResidentService {

    @Autowired
    private ResidentMapper mapper;

    @Override
    public BaseResponse insertResident(ResidentForm form) {
        form.validate();
        ResidentReq req = new ResidentReq().getReqFromForm(form);
        req.setOccupation(null);
        req.setCccd(null);
        req.setPreviousPlaceOfPermanentResidence("mới sinh");
        mapper.insertResident(req);
        return BaseResponse.simpleSuccess("insert new resident success");
    }

    @Override
    public BaseResponse listResident() {
        ResidentReq req = new ResidentReq();
        List<ResidentRes> residentResList = mapper.listResident(req);
        int total = mapper.totalResident(req);
        return DataListResponse.builder().total(total).dataList(residentResList).build();
    }

    @Override
    public BaseResponse updateResident(ResidentForm form) {
        // TODO: 14/11/2023
        form.validate();
        ResidentReq req = new ResidentReq().getReqFromForm(form);
        req.setOccupation(null);
        req.setCccd(null);
//        req.setPreviousPlaceOfPermanentResidence("mới sinh");
        mapper.updateResident(req);
        return BaseResponse.simpleSuccess("update new resident success");
    }

}
