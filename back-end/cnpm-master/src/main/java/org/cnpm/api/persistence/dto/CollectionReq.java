package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CollectionReq {
    private int id;
    private String collectionNm;
    private String startDate;
    private String endDate;
    private String status;
}
