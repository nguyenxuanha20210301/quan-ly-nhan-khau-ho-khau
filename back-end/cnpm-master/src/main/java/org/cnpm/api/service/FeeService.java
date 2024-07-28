package org.cnpm.api.service;

import org.cnpm.api.config.utils.exceptions.SEValidateException;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.controller.dto.FeeForm;
import org.cnpm.api.controller.dto.IdList;

public interface FeeService {

    BaseResponse listFee(int pageSize, int pageNum, String orderBy, String orderTp, String keyword, Integer year, String dateFrom, String dateTo);

    BaseResponse addFee(FeeForm form) throws SEValidateException;

    BaseResponse editFee(FeeForm form) throws SEValidateException;

    BaseResponse deleteFee(IdList idList) throws SEValidateException;
}
