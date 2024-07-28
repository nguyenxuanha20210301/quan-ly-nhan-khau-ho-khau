package org.cnpm.api.config.utils.exceptions;

import java.util.List;
import java.util.Map;

public class SEValidateException extends SERuntimeException {

    public SEValidateException(String message, List<String> errorList){
        super(message, errorList);
    }
    public SEValidateException(String message){
        super(message);
    }

    public SEValidateException(String message, Map<String, Object> errorMap , List<String> errorList){
        super(message, errorList);
        this.setErrMap(errorMap);
    }

    public SEValidateException(String message, Map<String, Object> errorMap){
        super(message, errorMap);
        this.setErrMap(errorMap);
    }
}
