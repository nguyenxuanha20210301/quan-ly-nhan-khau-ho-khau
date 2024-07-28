package org.cnpm.api.config.auth.utils;

import io.jsonwebtoken.*;
import org.cnpm.api.persistence.dto.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Component
public class JwtUtil {

    public static final String USER_ID_CLAIMS_NAME  = "user_id";
    public static final String ROLE_CLAIMS_NAME  = "user_role";

    public static final String SERVICE_ID_CLAIMS_NAME = "service_id";

    public static final String BEARER = "Bearer";
    @Autowired
    private final JwtProperties jwtProperties;

    public JwtUtil(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    public Claims getClaimsFromJwtToken(String jwtToken) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey().getBytes())
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    public Map<String, Object> getValueFromJwt ( String token ) {
        Map<String, Object> resMap = new HashMap <> ();
        Claims claims = Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
        resMap.put ("token", token);
        resMap.put ("userId", claims.getSubject());
        resMap.put ("issuedAt", claims.getIssuedAt());
        resMap.put("expiresAt", claims.getIssuedAt());
        return resMap;
    }

    public String generateJwtToken(Claims claims) {
        return Jwts.builder()
                .addClaims(claims)
                .signWith (SignatureAlgorithm.HS512 , jwtProperties.getSecretKey())
                .compact();
    }

    public String getToken(User user){
        Map<String, Object> additionalKeyValue = new HashMap<>();
        additionalKeyValue.put(USER_ID_CLAIMS_NAME, user.getUserId());
        additionalKeyValue.put(ROLE_CLAIMS_NAME, "admin");

        long currentMillisecond = System.currentTimeMillis();
        UUID accessTokenId = UUID.randomUUID();
        Date accessTokenExpiration = null;
        try {
            accessTokenExpiration = new Date(currentMillisecond + jwtProperties.getAccessTokenValidity() * 1000);
        }catch (Exception e){
            log.info(e.getMessage());
        }
        Claims claims = Jwts.claims();
        claims
                .setId(accessTokenId.toString())
                .setSubject(String.valueOf(user.getUserId()))
                .setIssuedAt(new Date(currentMillisecond))
                .setExpiration(accessTokenExpiration)
                .setIssuer(jwtProperties.getIssuer())
                .putAll(additionalKeyValue);
        return  generateJwtToken(claims);
    }

    public JwtResponse createJwtResponse(User user) {
        Map<String, Object> additionalKeyValue = new HashMap<>();
        additionalKeyValue.put(USER_ID_CLAIMS_NAME, user.getUserId());
//        additionalKeyValue.put(ROLE_CLAIMS_NAME, user.getUserRole());

        long currentMillisecond = System.currentTimeMillis();
        UUID accessTokenId = UUID.randomUUID();

        Date accessTokenExpiration = new Date(currentMillisecond + jwtProperties.getAccessTokenValidity() * 1000);
        Claims claims = Jwts.claims();
        claims
                .setId(accessTokenId.toString())
                .setSubject(String.valueOf(user.getUserId()))
                .setIssuedAt(new Date(currentMillisecond))
                .setExpiration(accessTokenExpiration)
                .setIssuer(jwtProperties.getIssuer())
                .putAll(additionalKeyValue);
        String accessToken = generateJwtToken(claims);

        return new JwtResponse(String.valueOf(user.getUserId()), new HashSet<>(), BEARER,
                accessToken, null, accessTokenExpiration);
    }

    public Claims checkValidAccessToken(String accessToken) {
        Claims claims;
        try {
            claims = getClaimsFromJwtToken(accessToken);
        } catch (JwtException ex) {
            log.error("Exception: ", ex);
            throw ex;
        }
        return claims;
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtProperties.getSecretKey()).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
            throw ex;
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
            throw ex;
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
            throw ex;
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
            throw ex;
        }catch (SignatureException ex){
            log.error("Signature exception");
            throw ex;
        }catch (Exception ex){
            log.error(ex.getMessage());
            throw ex;
        }
    }
}
