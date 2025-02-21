package com.shuigraph.crapmap.industrialsewage.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SeverityType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "facility_owner")
  private String facilityOwner;

  @Column(name = "exceedance_start_date")
  private String date;

  @Column(name = "contaminant")
  private String contaminant;

  @Column(name = "severity_score")
  private String severityScore;

  @Column(name = "severity_level")
  private String severityLevel;

  @Column(name = "percent_exceedance")
  private String percentExceedance;

  public SeverityType() {}

  public SeverityType(
      Integer newId,
      String newFacilityOwner,
      String newDate,
      String newContaminant,
      String newSeverityScore,
      String newSeverityLevel,
      String newPercentExceedance) {
    this.id = newId;
    this.facilityOwner = newFacilityOwner;
    this.date = newDate;
    this.contaminant = newContaminant;
    this.severityScore = newSeverityScore;
    this.severityLevel = newSeverityLevel;
    this.percentExceedance = newPercentExceedance;
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

  public void setDate(String newDate) {
    this.date = newDate;
  }

  public String getDate() {
    return date;
  }

  public void setContaminant(String newContaminant) {
    this.contaminant = newContaminant;
  }

  public String getContaminant() {
    return contaminant;
  }

  public void setSeverityScore(String newSeverityScore) {
    this.severityScore = newSeverityScore;
  }

  public String getSeverityScore() {
    return severityScore;
  }

  public void setSeverityLevel(String newSeverityLevel) {
    this.severityLevel = newSeverityLevel;
  }

  public String getSeverityLevel() {
    return severityLevel;
  }

  public void setPercentExceedance(String newPercentExceedance) {
    this.percentExceedance = newPercentExceedance;
  }

  public String getPercentExceedance() {
    return percentExceedance;
  }
}
