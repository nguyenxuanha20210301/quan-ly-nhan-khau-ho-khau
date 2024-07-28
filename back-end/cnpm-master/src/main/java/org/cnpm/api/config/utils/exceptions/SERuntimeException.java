package org.cnpm.api.config.utils.exceptions;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class SERuntimeException extends Exception{
    @JsonProperty("error_list")
    private List<String> errorList;

    @JsonProperty("error_map")
    private Map<String, Object> errMap;

    public SERuntimeException(){
    }

    public SERuntimeException(String message, List<String> errorList){
        super(message);
        this.errorList = List.copyOf(errorList);
    }

    public SERuntimeException(String message){
        super(message);
    }

    public SERuntimeException(String message, Map<String, Object> errMap){
        super(message);
        this.errMap = Map.copyOf(errMap);
    }
}
