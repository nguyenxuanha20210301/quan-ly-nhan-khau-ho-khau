package org.cnpm.api.config.utils.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class DataListResponse extends BaseResponse {
    @JsonProperty("data_list")
    List dataList;
    @JsonProperty("total")
    Integer total;
    @JsonProperty("page_size")
    Integer pageSize;
    @JsonProperty("page_num")
    Integer pageNum;
    @JsonProperty("header_list")
    List headerList;
}
