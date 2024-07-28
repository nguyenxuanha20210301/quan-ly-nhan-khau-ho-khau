package org.cnpm.api.persistence.dto;

import lombok.Getter;
import lombok.Setter;
import org.cnpm.api.controller.dto.ResidentForm;

@Getter
@Setter
public class ResidentReq {
    private int id;
    private String fullName;
    private String dateOfBirth;
    private String hometown;
    private String ethnicity;
    private String occupation;
    private String placeOfEmployment;
    private String cccd;
    private String dateOfIssueAndPlaceOfIssue;
    private String dateOfRegistrationForPermanentResidence;
    private String previousPlaceOfPermanentResidence;
    private String householdId;
    private String relationship;

    public ResidentReq getReqFromForm(ResidentForm form){
        ResidentReq req = new ResidentReq();
        req.setId(form.getId());
        req.setFullName(form.getFullName());
        req.setDateOfBirth(form.getDateOfBirth());
        req.setHometown(form.getHometown());
        req.setEthnicity(form.getEthnicity());
        req.setOccupation(form.getOccupation());
        req.setPlaceOfEmployment(form.getPlaceOfEmployment());
        req.setCccd(form.getCccd());
        req.setDateOfIssueAndPlaceOfIssue(form.getDateOfIssueAndPlaceOfIssue());
        req.setDateOfRegistrationForPermanentResidence(form.getDateOfRegistrationForPermanentResidence());
        req.setPreviousPlaceOfPermanentResidence(form.getDateOfRegistrationForPermanentResidence());
        req.setHouseholdId(form.getHouseholdId());
        req.setRelationship(form.getRelationship());
        return req;
    }
}
