package org.cnpm.api.controller.dto.res;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResidentRes {
    @JsonProperty("id")
    private int id;
    @JsonProperty("p_id")
    private int pId;
    @JsonProperty("m_id")
    private int mId;
    @JsonProperty("full_name")
    private String fullName;
    @JsonProperty("date_of_birth")
    private String dateOfBirth;
    @JsonProperty("hometown")
    private String hometown;
    @JsonProperty("ethnicity")
    private String ethnicity;
    @JsonProperty("occupation")
    private String occupation;
    @JsonProperty("place_of_employment")
    private String placeOfEmployment;
    @JsonProperty("cccd,")
    private String cccd;
    @JsonProperty("date_of_issue_and_place_of_issue")
    private String dateOfIssueAndPlaceOfIssue;
    @JsonProperty("date_of_registration_for_permanent_residence")
    private String dateOfRegistrationForPermanentResidence;
    @JsonProperty("previous_place_of_permanent_residence")
    private String previousPlaceOfPermanentResidence;
    @JsonProperty("household_id")
    private String householdId;
    @JsonProperty("relationship")
    private String relationship;

    @JsonProperty("action_type")
    private int activeType;
}
