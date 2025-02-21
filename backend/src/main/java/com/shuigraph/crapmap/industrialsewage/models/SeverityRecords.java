package com.shuigraph.crapmap.industrialsewage.models;

// @Entity
public class SeverityRecords {

  private Float severityScore;

  private String severityLevel;

  private String date;

  public SeverityRecords() {}

  public SeverityRecords(Float newSeverityScore, String newSeverityLevel, String newDate) {
    this.severityScore = newSeverityScore;
    this.severityLevel = newSeverityLevel;
    this.date = newDate;
  }

  public void setSeverityScore(Float newSeverityScore) {
    this.severityScore = newSeverityScore;
  }

  public Float getSeverityScore() {
    return severityScore;
  }

  public void setSeverityLevel(String newSeverityLevel) {
    this.severityLevel = newSeverityLevel;
  }

  public String getSeverityLevel() {
    return severityLevel;
  }

  public void setDate(String newDate) {
    this.date = newDate;
  }

  public String getDate() {
    return date;
  }
}
