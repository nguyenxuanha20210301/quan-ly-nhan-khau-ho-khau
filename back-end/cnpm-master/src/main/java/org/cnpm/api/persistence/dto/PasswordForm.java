package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordForm {
    @JsonProperty("old_pw")
    private String oldPw;
    @JsonProperty("new_pw")
    private String newPw;
    @JsonProperty("confirm_pw")
    private String confirmPw;
}
