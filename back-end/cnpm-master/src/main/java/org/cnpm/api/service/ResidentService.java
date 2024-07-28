package org.cnpm.api.service;

import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.ResidentForm;

public interface ResidentService {

    BaseResponse insertResident(ResidentForm form);

    BaseResponse listResident();

    BaseResponse updateResident(ResidentForm form);
}
