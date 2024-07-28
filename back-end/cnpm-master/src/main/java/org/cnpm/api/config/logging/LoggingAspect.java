package org.cnpm.api.config.logging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

@Aspect
public class LoggingAspect {

    //Pointcuts
    @Pointcut("within(@org.cnpm.api.config.logging.LoggingAnnotation.ControllerLogging *)")
    public void controllerLoggingPointcut() {
        // let this empty because the detail implemented in below ADVICE method
    }

    @Pointcut("within(@org.cnpm.api.config.logging.LoggingAnnotation.ServiceLogging *)")
    public void serviceLoggingPointcut() {
        // let this empty because the detail implemented in below ADVICE method
    }

    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void applicationControllerPointcut() {
        // let this empty because the detail implemented in below ADVICE method
    }

    @Pointcut("within(org.cnpm.api.service..*)")
    public void applicationServicePointcut() {
        // let this empty because the detail implemented in below ADVICE method
    }

    @Pointcut("@annotation(org.cnpm.api.config.logging.LoggingAnnotation.NoLogging)")
    public void noLoggingPointcut() {
        // let this empty because the detail implemented in below ADVICE method
    }

    //Advices
    @Around(value = "(controllerLoggingPointcut()" +
            "|| applicationControllerPointcut()" +
            "|| serviceLoggingPointcut()" +
            "|| applicationServicePointcut()" +
            ") && !noLoggingPointcut()")
    public Object loggingControllerAndServiceMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        String className = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String methodName = joinPoint.getSignature().getName();

        Logger logger = getLogger(joinPoint);
        String arguments = Arrays.toString(joinPoint.getArgs());
        logger.debug(LoggingConstant.ENTER_METHOD_MSG, className, methodName, arguments);
        logger.debug(LoggingConstant.LOGGING_STRING);
        Object result = joinPoint.proceed();
        logger.debug(LoggingConstant.EXIT_METHOD_MSG, className, methodName);
        logger.debug(LoggingConstant.LOGGING_STRING);

        return result;
    }

    private Logger getLogger(ProceedingJoinPoint joinPoint) {
        return LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringType());
    }
}
