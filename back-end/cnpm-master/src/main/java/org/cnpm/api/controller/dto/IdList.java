package org.cnpm.api.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IdList {
    @JsonProperty("id_list")
    private List<Integer> idList;
}
