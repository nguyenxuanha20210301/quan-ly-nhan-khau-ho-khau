package org.cnpm.api.config.utils.exceptions;

import java.util.List;
import java.util.Map;

public class SEPermissionFilterException extends SERuntimeException {

    public SEPermissionFilterException(String message, List<String> errorList){
        super(message, errorList);
    }
    public SEPermissionFilterException(String message){
        super(message);
    }

    public SEPermissionFilterException(String message, Map<String, Object> errorMap , List<String> errorList){
        super(message, errorList);
        this.setErrMap(errorMap);
    }

    public SEPermissionFilterException(String message, Map<String, Object> errorMap){
        super(message, errorMap);
        this.setErrMap(errorMap);
    }
}
