package org.cnpm.api.config.utils.exceptions;

import java.util.List;
import java.util.Map;

public class SEPermissionException extends SERuntimeException {

    public SEPermissionException(String message, List<String> errorList){
        super(message, errorList);
    }
    public SEPermissionException(String message){
        super(message);
    }

    public SEPermissionException(String message, Map<String, Object> errorMap , List<String> errorList){
        super(message, errorList);
        this.setErrMap(errorMap);
    }

    public SEPermissionException(String message, Map<String, Object> errorMap){
        super(message, errorMap);
        this.setErrMap(errorMap);
    }
}
