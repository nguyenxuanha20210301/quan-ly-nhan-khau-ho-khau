package org.cnpm.api.config.utils.exceptions;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.utils.ConstantMessages;
import org.cnpm.api.config.utils.ErrorCode;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String ERROR_OCCUR = "A temporary error has occurred.";



    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleException(HttpServletRequest request, Exception ex) {
        log.error("Exception: ", ex);
        ex.getStackTrace();
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<BaseResponse> handleBadRequestException(HttpServletRequest request, BadRequestException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<BaseResponse> handleNotFoundException(HttpServletRequest request, NotFoundException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ex.getMessage());
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<BaseResponse> handleHttpServerErrorException(HttpServletRequest request, HttpServerErrorException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ERROR_OCCUR);
    }


    @ExceptionHandler(SEValidateException.class)
    public ResponseEntity<BaseResponse> handleHttpServerErrorException(HttpServletRequest request, SEValidateException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ex.getMessage(), ex.getErrorList(), ex.getErrMap());
    }

    @ExceptionHandler(SEPermissionFilterException.class)
    public ResponseEntity<BaseResponse> handleHttpServerErrorException(HttpServletRequest request, SEPermissionFilterException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, ex.getMessage(), ex.getErrorList(), ex.getErrMap());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<BaseResponse> handleHttpServerErrorException(HttpServletRequest request, MaxUploadSizeExceededException ex) {
        return this.toResponseEntity(ErrorCode.INVALID_PARAMETER, "");
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<BaseResponse> handleAccessDeniedException(HttpServletRequest request, AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(BaseResponse.builder()
                        .isError(true)
                        .message(ex.getMessage())
                        .build()
                );
    }

    private ResponseEntity<BaseResponse> toResponseEntity(ErrorCode errorCode, String errorMessage, List<String> errorList, Map<String, Object> errMap) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(BaseResponse.builder()
                        .isError(true)
                        .message(errorMessage)
                        .errorList(errorList)
                        .errMap(errMap)
                        .build()
                );
    }

    private ResponseEntity<BaseResponse> toResponseEntity(ErrorCode errorCode, String errorMessage) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(BaseResponse.builder()
                        .isError(true)
                        .message(errorMessage)
                        .build()
                );
    }


    private ResponseEntity<BaseResponse> toResponseEntity(ErrorCode errorCode, String errorMessage, List<String> errors) {
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(BaseResponse.builder()
                        .isError(true)
                        .message(errorMessage)
                        .errorList(errors)
                        .build()
                );
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatus status,
            WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }
        BaseResponse response = BaseResponse.builder().isError(true).errorList(errors).build();

        return handleExceptionInternal(
                ex, response, headers, HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex, HttpHeaders headers,
            HttpStatus status, WebRequest request) {
        String error = ex.getParameterName() + " parameter is missing";

        BaseResponse response = BaseResponse.builder().isError(true).message(error).build();
        return new ResponseEntity<>(
                response, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getRootBeanClass().getName() + " " +
                    violation.getPropertyPath() + ": " + violation.getMessage());
        }

        BaseResponse response = BaseResponse.builder().isError(true).errorList(errors).build();
        return new ResponseEntity<>(
                response, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex, WebRequest request) {
        String type = "unknown";
        Class<TypeMismatchException> typeMismatchException = (Class<TypeMismatchException>) ex.getRequiredType();

        if (typeMismatchException != null) {
            type = typeMismatchException.getName();
        }
        String error =
                ex.getName() + " should be of type " + type;
        BaseResponse response = BaseResponse.builder().isError(true).message(error).build();
        return new ResponseEntity<>(
                response, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        String error = "error";
        log.error("Format: ", ex);
        BaseResponse response = BaseResponse.builder().isError(true).message(error).build();
        return handleExceptionInternal(ex, response, headers, status, request);
    }
}
