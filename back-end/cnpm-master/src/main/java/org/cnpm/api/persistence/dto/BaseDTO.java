package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseDTO {
    private String keyword;
    private String searchBy;
    private String orderBy;
    private String dateFrom;
    private String dateTo;
    private String orderTp = "ASC";
    private int pageSize = 10;
    private int pageNum = 1;
    private boolean isPaging = true;
    private int limit = 10;
    private int offset = 0;

}
