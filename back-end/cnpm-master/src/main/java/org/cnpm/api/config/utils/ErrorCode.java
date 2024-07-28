package org.cnpm.api.config.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INVALID_PARAMETER(20001, HttpStatus.BAD_REQUEST, "Invalid Parameter");
    private final int intErrorCode;
    private final HttpStatus httpStatus;
    private final String errorMessage;
}
