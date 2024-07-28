package org.cnpm.api.config.utils.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder(toBuilder = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DataResponse extends BaseResponse {
    @JsonProperty("data")
    Object data;

    public static DataResponse successWithData(Object data){
        return DataResponse.builder().isError(false).data(data).build();
    }

}
