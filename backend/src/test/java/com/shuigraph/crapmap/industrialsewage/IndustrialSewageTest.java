package com.shuigraph.crapmap.industrialsewage;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.shuigraph.crapmap.industrialsewage.dao.IndustrialSewageDao;
import com.shuigraph.crapmap.industrialsewage.models.Contaminants;
import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.PollutionSeverity;
import com.shuigraph.crapmap.industrialsewage.models.SeverityRecords;
import com.shuigraph.crapmap.industrialsewage.models.SeverityType;
import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;
import java.time.LocalDateTime;
import java.util.HashMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class IndustrialSewageTest {

  @Mock private IndustrialSewageDao industrialSewageDao;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testIndustrialSewage() {
    IndustrialSewage industrialSewage = new IndustrialSewage();

    industrialSewage.setId(1);
    industrialSewage.setFacilityOwner("Test Facility");
    industrialSewage.setSiteAddress("123 Test Avenue");
    industrialSewage.setContaminant("Test contaminant");
    industrialSewage.setTypeOfExceedance("Test Exceedance");
    industrialSewage.setExceedanceStartDate(LocalDateTime.of(2024, 10, 5, 0, 0));
    industrialSewage.setExceedanceEndDate(LocalDateTime.of(2024, 10, 5, 1, 0));
    industrialSewage.setContaminantLimit(10.5f);
    industrialSewage.setContaminantUnit("Test Unit");
    industrialSewage.setLimitFrequency("Test Frequency");
    industrialSewage.setNoOfExceedances(2);
    industrialSewage.setQuantityMaximum(10.6f);
    industrialSewage.setQuantityMinimum(10.7f);

    assertEquals(1, industrialSewage.getId());
    assertEquals("Test Facility", industrialSewage.getFacilityOwner());
    assertEquals("123 Test Avenue", industrialSewage.getSiteAddress());
    assertEquals("Test contaminant", industrialSewage.getContaminant());
    assertEquals("Test Exceedance", industrialSewage.getTypeOfExceedance());
    assertEquals(LocalDateTime.of(2024, 10, 5, 0, 0), industrialSewage.getExceedanceStartDate());
    assertEquals(LocalDateTime.of(2024, 10, 5, 1, 0), industrialSewage.getExceedanceEndDate());
    assertEquals(10.5f, industrialSewage.getContaminantLimit());
    assertEquals("Test Unit", industrialSewage.getContaminantUnit());
    assertEquals("Test Frequency", industrialSewage.getLimitFrequency());
    assertEquals(2, industrialSewage.getNoOfExceedances());
    assertEquals(10.6f, industrialSewage.getQuantityMaximum());
    assertEquals(10.7f, industrialSewage.getQuantityMinimum());
  }

  @Test
  void testIndustrialSewageConstructor() {
    IndustrialSewage industrialSewage =
        new IndustrialSewage(
            1,
            "Test Facility",
            "123 Test Avenue",
            "Test contaminant",
            "Test Exceedance",
            LocalDateTime.of(2024, 10, 5, 0, 0),
            LocalDateTime.of(2024, 10, 5, 1, 0),
            10.5f,
            "Test Unit",
            "Test Frequency",
            2,
            10.6f,
            10.7f);

    assertEquals(1, industrialSewage.getId());
    assertEquals("Test Facility", industrialSewage.getFacilityOwner());
    assertEquals("123 Test Avenue", industrialSewage.getSiteAddress());
    assertEquals("Test contaminant", industrialSewage.getContaminant());
    assertEquals("Test Exceedance", industrialSewage.getTypeOfExceedance());
    assertEquals(LocalDateTime.of(2024, 10, 5, 0, 0), industrialSewage.getExceedanceStartDate());
    assertEquals(LocalDateTime.of(2024, 10, 5, 1, 0), industrialSewage.getExceedanceEndDate());
    assertEquals(10.5f, industrialSewage.getContaminantLimit());
    assertEquals("Test Unit", industrialSewage.getContaminantUnit());
    assertEquals("Test Frequency", industrialSewage.getLimitFrequency());
    assertEquals(2, industrialSewage.getNoOfExceedances());
    assertEquals(10.6f, industrialSewage.getQuantityMaximum());
    assertEquals(10.7f, industrialSewage.getQuantityMinimum());
  }

  @Test
  void testSewageMarker() {
    SewageMarker sewageMarker = new SewageMarker();

    sewageMarker.setId(1);
    sewageMarker.setFacilityOwner("Test Facility");
    sewageMarker.setLatitude(15.9f);
    sewageMarker.setLongitude(164.6f);
    sewageMarker.setContaminant("Test Contaminant");
    sewageMarker.setRadius(40.4f);
    sewageMarker.setColour("Red");

    assertEquals(1, sewageMarker.getId());
    assertEquals("Test Facility", sewageMarker.getFacilityOwner());
    assertEquals(15.9f, sewageMarker.getLatitude());
    assertEquals(164.6f, sewageMarker.getLongitude());
    assertEquals("Test Contaminant", sewageMarker.getContaminant());
    assertEquals(40.4f, sewageMarker.getRadius());
    assertEquals("Red", sewageMarker.getColour());
  }

  @Test
  void testSewageMarkerConstructor() {
    SewageMarker sewageMarker =
        new SewageMarker(1, "Test Facility", 15.9f, 164.6f, "Test Contaminant", 40.4f, "Red");

    assertEquals(1, sewageMarker.getId());
    assertEquals("Test Facility", sewageMarker.getFacilityOwner());
    assertEquals(15.9f, sewageMarker.getLatitude());
    assertEquals(164.6f, sewageMarker.getLongitude());
    assertEquals("Test Contaminant", sewageMarker.getContaminant());
    assertEquals(40.4f, sewageMarker.getRadius());
    assertEquals("Red", sewageMarker.getColour());
  }

  @Test
  void testPollutionSeverityConstructor() {
    HashMap<String, Contaminants> newContaminants = new HashMap<>();
    SeverityRecords[] records = new SeverityRecords[2];
    records[0] = new SeverityRecords(0.27f, "Low", "2024-11-06");
    records[1] = new SeverityRecords(0.63f, "Moderate", "2024-11-06");

    newContaminants.put("Mew", new Contaminants(0.56f, "Moderate", 123.4f, records));

    PollutionSeverity pollutionSeverity =
        new PollutionSeverity(1, "Newer Island Facility", newContaminants);

    assertEquals(1, pollutionSeverity.getId());
    assertEquals("Newer Island Facility", pollutionSeverity.getFacilityOwner());
    assertEquals(newContaminants, pollutionSeverity.getContaminants());
  }

  @Test
  void testPollutionSeverity() {
    HashMap<String, Contaminants> newContaminants = new HashMap<>();
    SeverityRecords[] records = new SeverityRecords[2];
    records[0] = new SeverityRecords(0.27f, "Low", "2024-11-06");
    records[1] = new SeverityRecords(0.63f, "Moderate", "2024-11-06");

    newContaminants.put("Mew", new Contaminants(0.56f, "Moderate", 123.4f, records));

    PollutionSeverity pollutionSeverity = new PollutionSeverity();

    pollutionSeverity.setId(1);
    pollutionSeverity.setFacilityOwner("Moo Deng Facility");
    pollutionSeverity.setContaminants(newContaminants);

    assertEquals(1, pollutionSeverity.getId());
    assertEquals("Moo Deng Facility", pollutionSeverity.getFacilityOwner());
    assertEquals(newContaminants, pollutionSeverity.getContaminants());
  }

  @Test
  void testSeverityTypeConstructor() {
    SeverityType severityType =
        new SeverityType(
            1, "Ferg the Frog", "2024-11-06", "Bad Frog 1, Bad Frog 2", "10.5", "High", "43.4");

    assertEquals(1, severityType.getId());
    assertEquals("Ferg the Frog", severityType.getFacilityOwner());
    assertEquals("2024-11-06", severityType.getDate());
    assertEquals("Bad Frog 1, Bad Frog 2", severityType.getContaminant());
    assertEquals("10.5", severityType.getSeverityScore());
    assertEquals("High", severityType.getSeverityLevel());
    assertEquals("43.4", severityType.getPercentExceedance());
  }

  @Test
  void testSeverityType() {
    SeverityType severityType = new SeverityType();

    severityType.setId(1);
    severityType.setFacilityOwner("Ferg the Frog");
    severityType.setDate("2024-11-08");
    severityType.setContaminant("Bad Frog 1, Bad Frog 2");
    severityType.setSeverityScore("10.5");
    severityType.setSeverityLevel("High");
    severityType.setPercentExceedance("43.4");

    assertEquals(1, severityType.getId());
    assertEquals("Ferg the Frog", severityType.getFacilityOwner());
    assertEquals("2024-11-08", severityType.getDate());
    assertEquals("Bad Frog 1, Bad Frog 2", severityType.getContaminant());
    assertEquals("10.5", severityType.getSeverityScore());
    assertEquals("High", severityType.getSeverityLevel());
    assertEquals("43.4", severityType.getPercentExceedance());
  }

  @Test
  void testSeverityRecordsConstructor() {
    SeverityRecords severityRecords = new SeverityRecords(0.27f, "Low", "2024-11-06");

    assertEquals(0.27f, severityRecords.getSeverityScore());
    assertEquals("Low", severityRecords.getSeverityLevel());
    assertEquals("2024-11-06", severityRecords.getDate());
  }

  @Test
  void testSeverityRecords() {
    SeverityRecords severityRecords = new SeverityRecords();

    severityRecords.setSeverityScore(0.27f);
    severityRecords.setSeverityLevel("Low");
    severityRecords.setDate("2024-11-06");

    assertEquals(0.27f, severityRecords.getSeverityScore());
    assertEquals("Low", severityRecords.getSeverityLevel());
    assertEquals("2024-11-06", severityRecords.getDate());
  }

  @Test
  void testContaminantsConstructor() {

    SeverityRecords[] records = new SeverityRecords[2];
    records[0] = new SeverityRecords(0.27f, "Low", "2024-11-06");
    records[1] = new SeverityRecords(0.63f, "Moderate", "2024-11-06");
    Contaminants contaminants = new Contaminants(0.56f, "Moderate", 123.4f, records);

    assertEquals(0.56f, contaminants.getAverageSeverityScore());
    assertEquals("Moderate", contaminants.getOverallSeverityLevel());
    assertEquals(123.4f, contaminants.getAveragePercentExceedance());
    assertEquals(records, contaminants.getRecords());
  }

  @Test
  void testContaminants() {

    SeverityRecords[] records = new SeverityRecords[2];
    records[0] = new SeverityRecords(0.27f, "Low", "2024-11-06");
    records[1] = new SeverityRecords(0.63f, "Moderate", "2024-11-06");

    Contaminants contaminants = new Contaminants();

    contaminants.setAverageSeverityScore(0.56f);
    contaminants.setOverallSeverityLevel("Moderate");
    contaminants.setAveragePercentExceedance(123.4f);
    contaminants.setRecords(records);

    assertEquals(0.56f, contaminants.getAverageSeverityScore());
    assertEquals("Moderate", contaminants.getOverallSeverityLevel());
    assertEquals(123.4f, contaminants.getAveragePercentExceedance());
    assertEquals(records, contaminants.getRecords());
  }
}
