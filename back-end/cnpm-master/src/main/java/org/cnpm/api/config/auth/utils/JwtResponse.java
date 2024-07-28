package org.cnpm.api.config.auth.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse implements Serializable {
    private String userId;
    private Set<String> role;
    private String tokenType;
    private String accessToken;
    private String refreshToken;
    private Date exp;
}
