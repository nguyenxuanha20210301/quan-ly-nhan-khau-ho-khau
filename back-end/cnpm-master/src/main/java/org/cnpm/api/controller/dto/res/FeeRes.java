package org.cnpm.api.controller.dto.res;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeeRes {
    @JsonProperty("no")
    private int no;
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
}
