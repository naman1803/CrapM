package com.shuigraph.crapmap.industrialsewage.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "industrial_sewage_markers")
public class SewageMarker {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "facility_owner")
  private String facilityOwner;

  @Column(name = "latitude")
  private Float latitude;

  @Column(name = "longitude")
  private Float longitude;

  @Column(name = "contaminant")
  private String contaminant;

  private Float radius;

  private String colour;

  public SewageMarker() {}

  public SewageMarker(
      Integer newId,
      String newFacilityOwner,
      Float newLatitude,
      Float newLongitude,
      String newContaminant,
      Float newRadius,
      String newColour) {
    this.id = newId;
    this.facilityOwner = newFacilityOwner;
    this.latitude = newLatitude;
    this.longitude = newLongitude;
    this.contaminant = newContaminant;
    this.radius = newRadius;
    this.colour = newColour;
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

  public void setLatitude(Float newLatitude) {
    this.latitude = newLatitude;
  }

  public Float getLatitude() {
    return latitude;
  }

  public void setLongitude(Float newLongitude) {
    this.longitude = newLongitude;
  }

  public Float getLongitude() {
    return longitude;
  }

  public void setContaminant(String newContaminant) {
    this.contaminant = newContaminant;
  }

  public String getContaminant() {
    return contaminant;
  }

  public void setRadius(Float newRadius) {
    this.radius = newRadius;
  }

  public Float getRadius() {
    return radius;
  }

  public void setColour(String newColour) {
    this.colour = newColour;
  }

  public String getColour() {
    return colour;
  }
}
