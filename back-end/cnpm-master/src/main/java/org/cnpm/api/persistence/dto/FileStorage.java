package org.cnpm.api.persistence.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileStorage {
    @JsonProperty("file_id")
    private String fileId;

    @JsonProperty("file_nm")
    private String fileNm;

    @JsonIgnore
    private String fileRelLoc;
}
