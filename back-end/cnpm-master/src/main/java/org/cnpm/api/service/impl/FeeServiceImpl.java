package org.cnpm.api.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.exceptions.SEValidateException;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.config.utils.response.DataListResponse;
import org.cnpm.api.controller.dto.FeeForm;
import org.cnpm.api.controller.dto.IdList;
import org.cnpm.api.controller.dto.res.FeeRes;
import org.cnpm.api.persistence.dto.FeeReq;
import org.cnpm.api.persistence.mapper.FeeMapper;
import org.cnpm.api.service.FeeService;
import org.cnpm.api.utils.DateUtil;
import org.cnpm.api.utils.FilterUtil;
import org.cnpm.api.utils.PagingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class FeeServiceImpl implements FeeService {
    @Autowired
    private FeeMapper mapper;

    @Override
    public BaseResponse listFee(int pageSize, int pageNum, String orderBy, String orderTp, String keyword, Integer year, String dateFrom, String dateTo) {
        FeeReq req = new FeeReq();
        req.setKeyword(FilterUtil.toValidKeyword(keyword));
        req.setOrderBy(orderBy);
        req.setOrderTp(FilterUtil.toValidOrder(orderTp));

        // TODO: 30/11/2023
        if (null != year) {
            req.setYear(year);
        }
        if(null != dateFrom && null != dateTo){
            req.setDateFrom(DateUtil.toValidDateTime(dateFrom));
            req.setDateTo(DateUtil.toValidDateTime(dateTo));
        }


        int total = mapper.total(req);
        pageSize = PagingUtil.getLimit(pageSize);
        pageNum = PagingUtil.getAvailablePageNum(pageNum, pageSize, total);
        PagingUtil.preparePaging(req, pageSize, pageNum);

        List<FeeRes> feeRes = mapper.list(req);
        return DataListResponse.builder().dataList(feeRes)
                .pageNum(pageNum).pageSize(pageSize).total(total).build();
    }

    @Override
    public BaseResponse addFee(FeeForm form) throws SEValidateException {
        form.validate();
        FeeReq req = new FeeReq().getReqFromForm(form);
        mapper.insert(req);
        return BaseResponse.simpleSuccess("thêm phí thành công");
    }

    @Override
    public BaseResponse editFee(FeeForm form) throws SEValidateException {
        form.validate();
        FeeReq req = new FeeReq().getReqFromForm(form);
        mapper.update(req);
        return BaseResponse.simpleSuccess("cập nhật phí thành công");
    }

    @Override
    public BaseResponse deleteFee(IdList idList) throws SEValidateException {
        if (null == idList || idList.getIdList().isEmpty()) {
            throw new SEValidateException("id không được để trống");
        }
        mapper.delete(idList.getIdList());
        return BaseResponse.simpleSuccess("xóa phí thành công");
    }
}
