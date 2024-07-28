package org.cnpm.api.config.auth.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.cnpm.api.config.auth.utils.JwtUtil;
import org.cnpm.api.config.utils.ErrorCode;
import org.cnpm.api.config.utils.ErrorResponse;
import org.cnpm.api.config.utils.response.BaseResponse;
import org.cnpm.api.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.cnpm.api.persistence.dto.User;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String[] AUTH_WHITELIST = {
            "/swagger-ui.html",
            "/api-docs",
            "/swagger-ui/",
            "/api-docs/",
            "/api/v1/auth/find-id",
            "/api/v1/auth/find-pw",
            "/api/v1/auth/login",
    };

    private static final String[] AUTH_WHITELIST_POST = {
    };

    public static final String APPLICATION_JSON_UTF8 = "application/json;charset=UTF-8";
    public static final String AUTH_HEADER = "Authorization";
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    private User getUserById(String userId)  {
        User user = new User();//userService.select(userId);
        return user;
    }

    @Override
    protected void doFilterInternal(@NotNull HttpServletRequest request,
                                    @NotNull HttpServletResponse response, @NotNull FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            if (null == jwt) {
                log.info("22222222222222222222");
                throw new ServletException("Invalid token");
            }
            if (jwtUtil.validateToken(jwt)) {
                log.info("--------------------get id user from jwt");
                String userId = jwtUtil.getValueFromJwt(jwt).get("userId").toString();

                log.info("----------------get information user from id");

                User user = getUserById(userId);

                UserDetails userDetails = new UserLogin(user);
                //If authenticated user, set user as security context
                UsernamePasswordAuthenticationToken
                        authentication = new UsernamePasswordAuthenticationToken(user, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                //Pass the request
                filterChain.doFilter(request, response);

            } else {
                log.info("1111111111111111111");
                throw new ServletException("Invalid token");
            }
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
            log.error("Token expired 1");

            BaseResponse res = BaseResponse.builder().isError(true).message("Token expired").build();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_UTF8);

            response.getWriter().write(new ObjectMapper().writeValueAsString(res));
        } catch (Exception ex) {
            log.info("token expired 2");
            log.info(ex.getMessage());
            BaseResponse res = BaseResponse.builder().isError(true).message("Token expired").build();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_UTF8);
            response.getWriter().write(new ObjectMapper().writeValueAsString(res));
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


    /**
     * Chekc if servletPath in the whitelist, ignore it
     *
     * @param request current HTTP request
     * @return true if the request should not be filtered
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        boolean res = false;
        String servletPath = request.getServletPath();
        for (String whitePath : AUTH_WHITELIST) {
            if (servletPath.startsWith(whitePath)) {
                return true;
            }
        }

        for (String whitePath : AUTH_WHITELIST_POST) {
            if (request.getMethod().equals(HttpMethod.POST.toString()) && servletPath.equals(whitePath)) {
                return true;
            }
        }
        return res;
    }
}
