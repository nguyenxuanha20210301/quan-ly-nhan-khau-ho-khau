package org.cnpm.api.config.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ErrorResponse implements Serializable {
    private long timestamp;
    private int errorCode;
    private String error;
    private String errorDescription;
    private HttpStatus httpStatus;
}