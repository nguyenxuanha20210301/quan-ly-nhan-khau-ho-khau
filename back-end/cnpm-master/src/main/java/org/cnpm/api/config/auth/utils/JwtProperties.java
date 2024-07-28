package org.cnpm.api.config.auth.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    private String secretKey;
    private Long accessTokenValidity;
    private Long refreshTokenValidity;
    private Long serviceResultTokenValidity;
    private String issuer;
}