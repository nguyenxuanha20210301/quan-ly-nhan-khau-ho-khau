package org.cnpm.api.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeparateForm {
    @JsonProperty("head_of_household_id")
    private int headOfHouseholdId;
    @JsonProperty("id_list")
    private IdList idList;
}
