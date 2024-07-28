package org.cnpm.api.service;

import org.cnpm.api.config.utils.response.BaseResponse;

public interface HouseholdService {
    BaseResponse listHousehold();

    BaseResponse addHousehold();
    BaseResponse separateHousehold();

    BaseResponse updateHousehold();
}
