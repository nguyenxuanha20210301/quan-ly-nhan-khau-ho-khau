package org.cnpm.api.config.logging;


public final class LoggingConstant {
    private LoggingConstant() {
    }

    public static final String LOGGING_STRING = "===================================";
    public static final String ENTER_METHOD_MSG = "{}.{}() with argument[s] {} Start!!!";
    public static final String EXIT_METHOD_MSG = "{}.{}() End!!!";
    public static final String EXCEPTION_WHEN_LOGGING_MSG = "Exception when logging {}() with cause = {}";
    public static final String NO_FIELD_MAPPED_WITH_NAME = "No object field mapped with name {}";
}
