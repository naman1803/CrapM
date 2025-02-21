package com.shuigraph.crapmap.industrialsewage.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "industrial_sewage_by_site")
public class IndustrialSewage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "facility_owner")
  private String facilityOwner;

  @Column(name = "site_address")
  private String siteAddress;

  @Column(name = "contaminant")
  private String contaminant;

  @Column(name = "type_of_exceedance")
  private String typeOfExceedance;

  @Column(name = "exceedance_start_date")
  private LocalDateTime exceedanceStartDate;

  @Column(name = "exceedance_end_date")
  private LocalDateTime exceedanceEndDate;

  @Column(name = "contaminant_limit")
  private Float contaminantLimit;

  @Column(name = "contaminant_unit")
  private String contaminantUnit;

  @Column(name = "limit_frequency")
  private String limitFrequency;

  @Column(name = "no_of_exceedances")
  private Integer noOfExceedances;

  @Column(name = "quantity_maximum")
  private Float quantityMaximum;

  @Column(name = "quantity_minimum")
  private Float quantityMinimum;

  public IndustrialSewage() {}

  @SuppressWarnings("squid:S00107")
  public IndustrialSewage(
      Integer newId,
      String newFacilityOwner,
      String newSiteAddress,
      String newContaminant,
      String newTypeOfExceedance,
      LocalDateTime newExceedanceStartDate,
      LocalDateTime newExceedanceEndDate,
      Float newContaminantLimit,
      String newContaminantUnit,
      String newLimitFrequency,
      Integer newNoOfExceedances,
      Float newQuantityMaximum,
      Float newQuantityMinimum) {
    this.id = newId;
    this.facilityOwner = newFacilityOwner;
    this.siteAddress = newSiteAddress;
    this.contaminant = newContaminant;
    this.typeOfExceedance = newTypeOfExceedance;
    this.exceedanceStartDate = newExceedanceStartDate;
    this.exceedanceEndDate = newExceedanceEndDate;
    this.contaminantLimit = newContaminantLimit;
    this.contaminantUnit = newContaminantUnit;
    this.limitFrequency = newLimitFrequency;
    this.noOfExceedances = newNoOfExceedances;
    this.quantityMaximum = newQuantityMaximum;
    this.quantityMinimum = newQuantityMinimum;
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

  public void setSiteAddress(String newSiteAddress) {
    this.siteAddress = newSiteAddress;
  }

  public String getSiteAddress() {
    return siteAddress;
  }

  public void setContaminant(String newContaminant) {
    this.contaminant = newContaminant;
  }

  public String getContaminant() {
    return contaminant;
  }

  public void setTypeOfExceedance(String newTypeOfExceedance) {
    this.typeOfExceedance = newTypeOfExceedance;
  }

  public String getTypeOfExceedance() {
    return typeOfExceedance;
  }

  public void setExceedanceStartDate(LocalDateTime newExceedanceStartDate) {
    this.exceedanceStartDate = newExceedanceStartDate;
  }

  public LocalDateTime getExceedanceStartDate() {
    return exceedanceStartDate;
  }

  public void setExceedanceEndDate(LocalDateTime newExceedanceEndDate) {
    this.exceedanceEndDate = newExceedanceEndDate;
  }

  public LocalDateTime getExceedanceEndDate() {
    return exceedanceEndDate;
  }

  public void setContaminantLimit(Float newContaminantLimit) {
    this.contaminantLimit = newContaminantLimit;
  }

  public Float getContaminantLimit() {
    return contaminantLimit;
  }

  public void setContaminantUnit(String newContaminantUnit) {
    this.contaminantUnit = newContaminantUnit;
  }

  public String getContaminantUnit() {
    return contaminantUnit;
  }

  public void setLimitFrequency(String newLimitFrequency) {
    this.limitFrequency = newLimitFrequency;
  }

  public String getLimitFrequency() {
    return limitFrequency;
  }

  public void setNoOfExceedances(Integer newNoOfExceedances) {
    this.noOfExceedances = newNoOfExceedances;
  }

  public Integer getNoOfExceedances() {
    return noOfExceedances;
  }

  public void setQuantityMaximum(Float newQuantityMaximum) {
    this.quantityMaximum = newQuantityMaximum;
  }

  public Float getQuantityMaximum() {
    return quantityMaximum;
  }

  public void setQuantityMinimum(Float newQuantityMinimum) {
    this.quantityMinimum = newQuantityMinimum;
  }

  public Float getQuantityMinimum() {
    return quantityMinimum;
  }
}
