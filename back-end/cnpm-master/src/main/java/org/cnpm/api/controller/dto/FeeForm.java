package org.cnpm.api.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.cnpm.api.config.utils.exceptions.SEValidateException;

@Getter
@Setter
public class FeeForm {
    @JsonProperty("id")
    private int id;
    @JsonProperty("fee_nm")
    private String feeNm;
//    @JsonProperty("fee_desc")
//    private String feeDesc;
    @JsonProperty("fee_amount")
    private int feeAmount;
    @JsonProperty("frequency_of_year")
    private int frequencyOfYear;
    @JsonProperty("year")
    private int year;

    public void validate() throws SEValidateException {
        if(null == this.getFeeNm() || this.getFeeNm().isBlank()){
            throw new SEValidateException("tên phí không hợp lệ");
        }
        if(this.getFeeNm().length() > 45){
            throw new SEValidateException("độ dài tên phí ít hơn 45 kí tự");
        }
        if(this.getFrequencyOfYear() < 0){
            throw new SEValidateException("tần suất phí phải lớn hơn 0");
        }
        if(this.getYear() < 0){
            throw new SEValidateException("năm phải lớn hơn 0");
        }
    }
}
