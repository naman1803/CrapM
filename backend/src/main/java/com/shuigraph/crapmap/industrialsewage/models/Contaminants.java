package com.shuigraph.crapmap.industrialsewage.models;

// @Entity
public class Contaminants {

  private Float averageSeverityScore;
  private String overallSeverityLevel;
  private Float averagePercentExceedance;

  private SeverityRecords[] records;

  public Contaminants() {}

  public Contaminants(
      Float newAverageSeverityScore,
      String newOverallSeverityLevel,
      Float newAveragePercentExceedance,
      SeverityRecords[] newRecords) {
    this.averageSeverityScore = newAverageSeverityScore;
    this.overallSeverityLevel = newOverallSeverityLevel;
    this.averagePercentExceedance = newAveragePercentExceedance;
    this.records = newRecords;
  }

  public void setAverageSeverityScore(Float newAverageSeverityScore) {
    this.averageSeverityScore = newAverageSeverityScore;
  }

  public Float getAverageSeverityScore() {
    return averageSeverityScore;
  }

  public void setOverallSeverityLevel(String newOverallSeverityLevel) {
    this.overallSeverityLevel = newOverallSeverityLevel;
  }

  public String getOverallSeverityLevel() {
    return overallSeverityLevel;
  }

  public void setAveragePercentExceedance(Float newAveragePercentExceedance) {
    this.averagePercentExceedance = newAveragePercentExceedance;
  }

  public Float getAveragePercentExceedance() {
    return averagePercentExceedance;
  }

  public void setRecords(SeverityRecords[] newRecords) {
    this.records = newRecords;
  }

  public SeverityRecords[] getRecords() {
    return records;
  }
}
