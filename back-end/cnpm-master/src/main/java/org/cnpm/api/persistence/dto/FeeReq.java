package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.cnpm.api.controller.dto.FeeForm;

@Getter
@Setter
public class FeeReq extends BaseDTO{
    private int id;
    private String feeNm;
//    private String feeDesc;
    private int feeAmount;
    private int frequencyOfYear;
    private int year;



    public FeeReq getReqFromForm(FeeForm form){
        FeeReq req = new FeeReq();
        req.setId(form.getId());
        req.setFeeNm(form.getFeeNm());
        req.setFeeAmount(form.getFeeAmount());
        req.setFrequencyOfYear(form.getFrequencyOfYear());
        req.setYear(form.getYear());
        return req;
    }
}
