package org.cnpm.api.config.utils.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.cnpm.api.config.utils.exceptions.SERuntimeException;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@SuperBuilder(toBuilder = true)
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class BaseResponse {
    @JsonProperty(value="is_error")
    private boolean isError;
    @JsonProperty("message")
    String message;
    @JsonProperty("error_list")
    private List<String> errorList;
    @JsonProperty("error")
    private Map<String, Object> errMap;


    public static BaseResponse fromRuntimeException(SERuntimeException ex){
        return BaseResponse.builder().isError(true).errorList(ex.getErrorList()).errMap(ex.getErrMap()).message(ex.getMessage()).build();
    }

    public static BaseResponse simpleSuccess(String message){
        return BaseResponse.builder().isError(false).message(message).build();
    }
}
