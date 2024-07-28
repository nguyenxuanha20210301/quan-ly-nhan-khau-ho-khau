package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;


@Getter
@Setter
public class User {
    @JsonProperty("user_id")
    private String userId;

    @JsonProperty("email")
    private String email;
    @JsonIncludeProperties
    @JsonProperty("user_nm")
    private String userNm;

    @JsonIgnore
    private String userPw;

    @JsonProperty("tel_num")
    private String telNum;

    @JsonProperty("user_tp")
    private int userTp;


}
