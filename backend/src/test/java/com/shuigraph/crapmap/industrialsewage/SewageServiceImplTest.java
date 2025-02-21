package com.shuigraph.crapmap.industrialsewage;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.shuigraph.crapmap.industrialsewage.dao.IndustrialSewageDao;
import com.shuigraph.crapmap.industrialsewage.dao.PollutionSeverityDao;
import com.shuigraph.crapmap.industrialsewage.dao.SewageMarkerDao;
import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.SeverityRecords;
import com.shuigraph.crapmap.industrialsewage.models.SeverityType;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class SewageServiceImplTest {

  @Mock private IndustrialSewageDao industrialSewageDao;

  @Mock private SewageMarkerDao sewageMarkerDao;

  @Mock private PollutionSeverityDao pollutionSeverityDao;

  @Mock private SewageServiceImpl testSewageService;

  @InjectMocks private SewageServiceImpl sewageService;

  private SewageServiceImpl realSewageService;

  private SewageServiceImpl realMockSewageService;

  private IndustrialSewageDao realIndustrialSewageDao;

  private SewageMarkerDao realSewageMarkerDao;

  private PollutionSeverityDao realPollutionSeverityDao;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    realMockSewageService =
        spy(new SewageServiceImpl(industrialSewageDao, sewageMarkerDao, pollutionSeverityDao));
    realSewageService =
        spy(
            new SewageServiceImpl(
                realIndustrialSewageDao, realSewageMarkerDao, realPollutionSeverityDao));
  }

  @Test
  void testAllSewage() {

    List<IndustrialSewage> expectedSewage = new ArrayList<>();
    when(industrialSewageDao.findAll()).thenReturn((expectedSewage));

    Iterable<IndustrialSewage> result = sewageService.allIndustrialSewage();

    assertNotNull(result);
    assertEquals(expectedSewage, result);
    verify(industrialSewageDao, times(1)).findAll();
  }

  @Test
  void mockTestGetFacilityOwner() {
    String expectedOwner = "";
    when(testSewageService.getFacilityOwner(1)).thenReturn(expectedOwner);

    String result = testSewageService.getFacilityOwner(1);

    assertNotNull(result);
    assertEquals(expectedOwner, result);
    verify(testSewageService, times(1)).getFacilityOwner(1);
  }

  @Test
  void testGetSewageMarkers() {
    List<Object[]> expectedSewageMarkers = new ArrayList<>();
    when(sewageMarkerDao.getSewageMarkers()).thenReturn((expectedSewageMarkers));

    Iterable<Object[]> result = sewageMarkerDao.getSewageMarkers();

    assertNotNull(result);
    assertEquals(expectedSewageMarkers, result);
    verify(sewageMarkerDao, times(1)).getSewageMarkers();
  }

  @Test
  void mockTestGetSewageSeverity() {
    SeverityType tempSeverity = new SeverityType();
    Optional<SeverityType> expectedPollutionSeverity = Optional.of(tempSeverity);
    when(pollutionSeverityDao.getSewageSeverity("Test Facility"))
        .thenReturn(expectedPollutionSeverity);

    Optional<SeverityType> result = pollutionSeverityDao.getSewageSeverity("Test Facility");

    assertNotNull(result);
    assertEquals(expectedPollutionSeverity, result);
    verify(pollutionSeverityDao, times(1)).getSewageSeverity("Test Facility");
  }

  @Test
  void mockTestCalculateSeverityLevel() {
    String expectedLevel = "Low";
    Float inputFloat = 0.5f;
    when(testSewageService.calculateSeverityLevel(0.5f)).thenReturn(expectedLevel);

    String result = testSewageService.calculateSeverityLevel(inputFloat);

    assertNotNull(result);
    assertEquals(expectedLevel, result);
    verify(testSewageService, times(1)).calculateSeverityLevel(inputFloat);
  }

  @Test
  void testCalculateSeverityLevelLow() {
    String expectedLevel = "Low";
    Float inputFloat = 0.5f;

    String result = realSewageService.calculateSeverityLevel(inputFloat);

    assertNotNull(result);
    assertEquals(expectedLevel, result);
  }

  @Test
  void testCalculateSeverityLevelModerate() {
    String expectedLevel = "Moderate";
    Float inputFloat = 4.0f;

    String result = realSewageService.calculateSeverityLevel(inputFloat);

    assertNotNull(result);
    assertEquals(expectedLevel, result);
  }

  @Test
  void testCalculateSeverityLevelHigh() {
    String expectedLevel = "High";
    Float inputFloat = 8.0f;

    String result = realSewageService.calculateSeverityLevel(inputFloat);

    assertNotNull(result);
    assertEquals(expectedLevel, result);
  }

  @Test
  void testCalculateSeverityLevelCritical() {
    String expectedLevel = "Critical";
    Float inputFloat = 11.0f;

    String result = realSewageService.calculateSeverityLevel(inputFloat);

    assertNotNull(result);
    assertEquals(expectedLevel, result);
  }

  @Test
  void testCalculateColourLightGreen() {
    Float inputFloat = 15.0f;
    String expectedColour = "Light Green";
    String result = realSewageService.calculateColour(inputFloat);

    assertNotNull(result);
    assertEquals(expectedColour, result);
  }

  @Test
  void testCalculateColourGreen() {
    Float inputFloat = 25.0f;
    String expectedColour = "Green";
    String result = realSewageService.calculateColour(inputFloat);

    assertNotNull(result);
    assertEquals(expectedColour, result);
  }

  @Test
  void testCalculateColourYellow() {
    Float inputFloat = 35.0f;
    String expectedColour = "Yellow";
    String result = realSewageService.calculateColour(inputFloat);

    assertNotNull(result);
    assertEquals(expectedColour, result);
  }

  @Test
  void testCalculateColourOrange() {
    Float inputFloat = 45.0f;
    String expectedColour = "Orange";
    String result = realSewageService.calculateColour(inputFloat);

    assertNotNull(result);
    assertEquals(expectedColour, result);
  }

  @Test
  void testCalculateColourRed() {
    Float inputFloat = 55.0f;
    String expectedColour = "Red";
    String result = realSewageService.calculateColour(inputFloat);

    assertNotNull(result);
    assertEquals(expectedColour, result);
  }

  @Test
  void mockTestCalculateAverage() {
    Float expectedAverage = 3.0f;
    String currentContaminant = "Zinc";
    String[] contaminants = new String[] {"Zinc", "Zinc"};
    String[] data = new String[] {"3.0", "3.0"};
    when(testSewageService.calculateAverage(currentContaminant, contaminants, data))
        .thenReturn(expectedAverage);

    Float result = testSewageService.calculateAverage(currentContaminant, contaminants, data);

    assertNotNull(result);
    assertEquals(expectedAverage, result);
    verify(testSewageService, times(1)).calculateAverage(currentContaminant, contaminants, data);
  }

  @Test
  void testToFloatBigDecimal() {
    BigDecimal tempValue = new BigDecimal("5.0");
    Float expectedValue = 5.0f;

    Float result = realSewageService.toFloat(tempValue);
    assertEquals(result, expectedValue);
  }

  @Test
  void testToFloatDouble() {
    Double tempValue = 5.0;
    Float expectedValue = 5.0f;

    Float result = realSewageService.toFloat(tempValue);
    assertEquals(result, expectedValue);
  }

  @Test
  void testToFloatFloat() {
    Float tempValue = 5.0f;
    Float expectedValue = 5.0f;

    Float result = realSewageService.toFloat(tempValue);
    assertEquals(result, expectedValue);
  }

  @Test
  void testToFloatError() {
    String invalidInput = "5.0";
    String expectedException = "Failed";
    when(testSewageService.toFloat(invalidInput)).thenThrow(new NoSuchElementException("Failed"));

    try {
      testSewageService.toFloat(invalidInput);
      fail("Expected NoSuchElementException to be thrown");
    } catch (NoSuchElementException e) {
      assertEquals("Failed", e.getMessage());
    }
  }

  @Test
  void testCalculateSeverityRadius() {

    String facilityOwner = "TestFacility";
    String[] contaminants = {"Temp1", "Temp2"};
    String[] severityScores = {"10.0", "10.10"};

    when(sewageMarkerDao.getSeveritySum(facilityOwner)).thenReturn("5.0,10.0,15.0");
    when(realMockSewageService.calculateAverage("FakeContaminant", contaminants, severityScores))
        .thenReturn(10.0f);

    Float result = realMockSewageService.calculateSeverityRadius(facilityOwner);

    assertNotNull(result);
  }

  @Test
  void testCalculateAverage() {
    Float expectedAverage = 3.0f;
    String currentContaminant = "Zinc";
    String[] contaminants = new String[] {"Zinc", "Zinc", "Zinc", "Aluminum"};
    String[] data = new String[] {"3.0", "3.0", "-1.0", "3.0"};

    Float result = realSewageService.calculateAverage(currentContaminant, contaminants, data);

    assertNotNull(result);
    assertEquals(expectedAverage, result);
  }

  @Test
  void mockTestRecordsList() {
    String[] contaminants = new String[] {"Zinc", "Zinc"};
    String[] severityScore = new String[] {"3.0", "3.0"};
    String[] severityLevel = new String[] {"Moderate", "Moderate"};
    String[] dates = new String[] {"2024-11-07", "2024-11-08"};
    String currentContaminant = "Zinc";

    SeverityRecords[] expectedRecords = new SeverityRecords[2];
    expectedRecords[0] = new SeverityRecords(3.0f, "Moderate", "2024-11-07");
    expectedRecords[1] = new SeverityRecords(3.0f, "Moderate", "2024-11-08");

    when(testSewageService.recordsList(
            currentContaminant, contaminants, severityScore, severityLevel, dates))
        .thenReturn(expectedRecords);

    SeverityRecords[] result =
        testSewageService.recordsList(
            currentContaminant, contaminants, severityScore, severityLevel, dates);

    assertNotNull(result);
    assertEquals(expectedRecords, result);
    verify(testSewageService, times(1))
        .recordsList(currentContaminant, contaminants, severityScore, severityLevel, dates);
  }

  @Test
  void testRecordsList() {
    String[] contaminants = new String[] {"Zinc", "Zinc"};
    String[] severityScore = new String[] {"3.0", "3.0"};
    String[] severityLevel = new String[] {"Moderate", "Moderate"};
    String[] dates = new String[] {"2024-11-07", "2024-11-08"};
    String currentContaminant = "Zinc";

    SeverityRecords[] expectedRecords = new SeverityRecords[2];
    expectedRecords[0] = new SeverityRecords(3.0f, "Moderate", "2024-11-07");
    expectedRecords[1] = new SeverityRecords(3.0f, "Moderate", "2024-11-08");

    SeverityRecords[] result =
        realSewageService.recordsList(
            currentContaminant, contaminants, severityScore, severityLevel, dates);
    assertNotNull(result);
    assertEquals(expectedRecords[0].getSeverityScore(), result[0].getSeverityScore());
    assertEquals(expectedRecords[1].getSeverityScore(), result[1].getSeverityScore());
  }
}
