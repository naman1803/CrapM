package com.shuigraph.crapmap.industrialsewage.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import java.util.HashMap;

@Entity
public class PollutionSeverity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String facilityOwner;

  @Transient private HashMap<String, Contaminants> contaminants;

  public PollutionSeverity() {}

  public PollutionSeverity(
      Integer newId, String newFacilityOwner, HashMap<String, Contaminants> newContaminants) {
    this.id = newId;
    this.facilityOwner = newFacilityOwner;
    this.contaminants = newContaminants;
  }

  public void setId(Integer newId) {
    this.id = newId;
  }

  public Integer getId() {
    return id;
  }

  public void setFacilityOwner(String newFacilityOwner) {
    this.facilityOwner = newFacilityOwner;
  }

  public String getFacilityOwner() {
    return facilityOwner;
  }

  public void setContaminants(HashMap<String, Contaminants> newContaminants) {
    this.contaminants = newContaminants;
  }

  public HashMap<String, Contaminants> getContaminants() {
    return contaminants;
  }
}
