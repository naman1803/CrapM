package com.shuigraph.crapmap.lakes.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inland_lake_drinking_water_quality")
public class Lakes {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;

  @Column(name = "lake_name")
  private String lakeName;

  @Column(name = "latitude")
  private Float latitude;

  @Column(name = "longitude")
  private Float longitude;

  @Column(name = "additional_notes")
  private String additionalNotes;

  public Lakes() {}

  public Lakes(
      Integer newId,
      String newLakeName,
      Float newLatitude,
      Float newLongitude,
      String newAdditionalNotes) {
    this.id = newId;
    this.lakeName = newLakeName;
    this.latitude = newLatitude;
    this.longitude = newLongitude;
    this.additionalNotes = newAdditionalNotes;
  }

  public void setId(Integer newId) {
    this.id = newId;
  }

  public Integer getId() {
    return id;
  }

  public void setLakeName(String newLakeName) {
    this.lakeName = newLakeName;
  }

  public String getLakeName() {
    return lakeName;
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

  public void setAdditionalNotes(String newAdditionalNotes) {
    this.additionalNotes = newAdditionalNotes;
  }

  public String getAdditionalNotes() {
    return additionalNotes;
  }
}
