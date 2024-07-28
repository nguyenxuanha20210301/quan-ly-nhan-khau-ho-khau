package org.cnpm.api.config.auth.filters;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.auth.utils.JwtUtil;
import org.cnpm.api.config.utils.ErrorCode;
import org.cnpm.api.config.utils.ErrorResponse;
import org.cnpm.api.config.utils.LoggedInUserUtil;
import org.cnpm.api.persistence.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
public class PermissionFilter extends OncePerRequestFilter {
    public static final String APPLICATION_JSON_UTF8 = "application/json;charset=UTF-8";
    public static final String AUTH_HEADER = "Authorization";

    @Autowired
    private JwtUtil jwtUtil;

    private static final String[] AUTH_WHITELIST = {
            "/swagger-ui.html",
            "/api-docs",
            "/swagger-ui/",
            "/api-docs/",
            "/api/v1/login/login",
            "/api/v1/login/find-id",
            "/api/v1/login/find-pw",
    };

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request)
            throws ServletException{
        boolean res = false;
        String servletPath = request.getServletPath();
        for (String whitePath : AUTH_WHITELIST) {
            if (servletPath.startsWith(whitePath)) {
                return true;
            }
        }
        return  res;
    }

//    private User getUserById(String userId) throws SsosRuntimeException {
//        User user = userService.select(userId);
//        if (null == user) {
//            throw new SsosRuntimeException("Cannot load user");
//        }
//        return user;
//    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws IOException {
        log.info("PermissionFilter");

        try {
            User user = LoggedInUserUtil.getLoggedInUser();

            // PERMISSION FILTER HERE
            log.info("--------------------Get request");
            String requestUri = request.getRequestURI();
            filterChain.doFilter(request, response);
        } catch (IOException ex) {
            ErrorResponse errorResponse =
                    new ErrorResponse(new Date().getTime(),
                            ErrorCode.INVALID_PARAMETER.getIntErrorCode(),
                            ErrorCode.INVALID_PARAMETER.getErrorMessage(),
                            ex.getMessage(),
                            HttpStatus.UNAUTHORIZED);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_UTF8);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        } catch (ExpiredJwtException ex) {
            log.error("Token expired");
            ErrorResponse errorResponse = new
                    ErrorResponse(new Date().getTime(),
                    ErrorCode.INVALID_PARAMETER.getIntErrorCode(),
                    ErrorCode.INVALID_PARAMETER.getErrorMessage(),
                    ex.getMessage(),
                    HttpStatus.UNAUTHORIZED);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_UTF8);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        } catch (Exception ex) {
            ErrorResponse errorResponse =
                    new ErrorResponse(
                            new Date().getTime(),
                            ErrorCode.INVALID_PARAMETER.getIntErrorCode(),
                            ErrorCode.INVALID_PARAMETER.getErrorMessage(),
                            "",
                            HttpStatus.UNAUTHORIZED);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_UTF8);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        }
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTH_HEADER);
        // Check if Authorization header contains jwt information
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        } else {
            return bearerToken;
        }
    }
}
