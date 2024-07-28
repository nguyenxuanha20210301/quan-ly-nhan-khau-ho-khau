package org.cnpm.api.controller.dto.res;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollectionRes {
    @JsonProperty("id")
    private int id;
    @JsonProperty("collection_nm")
    private String collectionNm;
    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("end_date")
    private String endDate;
    @JsonProperty("status")
    private String status;

}
