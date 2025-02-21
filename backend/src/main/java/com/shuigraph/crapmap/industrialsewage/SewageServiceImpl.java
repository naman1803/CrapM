package com.shuigraph.crapmap.industrialsewage;

import com.shuigraph.crapmap.industrialsewage.dao.IndustrialSewageDao;
import com.shuigraph.crapmap.industrialsewage.dao.PollutionSeverityDao;
import com.shuigraph.crapmap.industrialsewage.dao.SewageMarkerDao;
import com.shuigraph.crapmap.industrialsewage.models.Contaminants;
import com.shuigraph.crapmap.industrialsewage.models.IndustrialSewage;
import com.shuigraph.crapmap.industrialsewage.models.PollutionSeverity;
import com.shuigraph.crapmap.industrialsewage.models.SeverityRecords;
import com.shuigraph.crapmap.industrialsewage.models.SeverityType;
import com.shuigraph.crapmap.industrialsewage.models.SewageMarker;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SewageServiceImpl implements SewageService {

  private final IndustrialSewageDao industrialSewageDao;

  private final SewageMarkerDao sewageMarkerDao;

  private final PollutionSeverityDao pollutionSeverityDao;

  @Autowired
  public SewageServiceImpl(
      IndustrialSewageDao newIndustrialSewageDao,
      SewageMarkerDao newSewageMarkerDao,
      PollutionSeverityDao newPollutionSeverity) {
    this.industrialSewageDao = newIndustrialSewageDao;
    this.sewageMarkerDao = newSewageMarkerDao;
    this.pollutionSeverityDao = newPollutionSeverity;
  }

  @Override
  public Iterable<IndustrialSewage> allIndustrialSewage() {
    return industrialSewageDao.findAll();
  }

  public Float calculateSeverityRadius(String facilityOwner) {

    String[] severityScore = sewageMarkerDao.getSeveritySum(facilityOwner).split(",");
    String currentContaminant = "tempContaminant";
    String[] contaminants = new String[severityScore.length];
    Arrays.fill(contaminants, "tempContaminant");

    Float averageScore = calculateAverage(currentContaminant, contaminants, severityScore);

    return Math.abs(Float.valueOf((float) ((Math.log(averageScore + 4) / Math.log(2))) * 10));
  }

  public Float toFloat(Object tempNum) {
    if (tempNum instanceof BigDecimal) {
      return ((BigDecimal) tempNum).floatValue();
    } else if (tempNum instanceof Double) {
      return ((Double) tempNum).floatValue();
    } else if (tempNum instanceof Float) {
      return (Float) tempNum;
    } else {
      throw new IllegalArgumentException("Expected BigDecimal, Double, or Float");
    }
  }

  public String calculateColour(Float radius) {
    if (radius < 20.0f) {
      return "Light Green";
    } else if (radius < 30.0f) {
      return "Green";
    } else if (radius < 40.0f) {
      return "Yellow";
    } else if (radius < 50.0f) {
      return "Orange";
    } else {
      return "Red";
    }
  }

  @Override
  public Iterable<SewageMarker> allSewageMarkers() {
    Iterable<Object[]> tempMarker = sewageMarkerDao.getSewageMarkers();
    List<SewageMarker> returnList = new ArrayList<>();

    for (Object[] obj : tempMarker) {
      Integer newId = sewageMarkerDao.getMinId((String) obj[1]);

      Float radius = calculateSeverityRadius((String) obj[1]);
      returnList.add(
          new SewageMarker(
              newId,
              (String) obj[1],
              toFloat(obj[2]),
              toFloat(obj[3]),
              (String) obj[4],
              radius,
              calculateColour(radius)));
    }
    return returnList;
  }

  @Override
  public String getFacilityOwner(Integer id) {
    return pollutionSeverityDao.getFacilityOwnerById(id);
  }

  @Override
  public Integer getMinId(String facilityOwner) {
    return sewageMarkerDao.getMinId(facilityOwner);
  }

  @Override
  public SewageMarker getSewageMarker(Integer id) {
    Optional<SewageMarker> tempMarker = sewageMarkerDao.findById(id);

    if (tempMarker.isPresent()) {
      return tempMarker.get();
    } else {
      throw new NoSuchElementException("SewageMarker with ID: " + id + "was not found");
    }
  }

  public String calculateSeverityLevel(Float severityScore) {

    if (severityScore < 1.0) {
      return "Low";

    } else if (severityScore < 5.0) {
      return "Moderate";

    } else if (severityScore < 10.0) {
      return "High";

    } else {
      return "Critical";
    }
  }

  public Float calculateAverage(String currentContaminant, String[] contaminants, String[] data) {
    Float totalSum = 0.0f;
    Integer totalEntries = data.length;

    for (int i = 0; i < data.length; i++) {
      if (Float.parseFloat(data[i]) != -1.0) {
        if (contaminants[i].equals(currentContaminant)) {
          totalSum += Float.parseFloat(data[i]);
        } else {
          totalEntries -= 1;
        }
      } else {
        totalEntries -= 1;
      }
    }
    return (totalSum / totalEntries);
  }

  public SeverityRecords[] recordsList(
      String currentContaminant,
      String[] contaminants,
      String[] severityScore,
      String[] severityLevel,
      String[] dates) {
    List<SeverityRecords> currentRecords = new ArrayList<>();

    for (int i = 0; i < severityScore.length; i++) {
      if (contaminants[i].equals(currentContaminant)) {
        currentRecords.add(
            new SeverityRecords(Float.parseFloat(severityScore[i]), severityLevel[i], dates[i]));
      }
    }
    SeverityRecords[] returnRecords = currentRecords.toArray(new SeverityRecords[0]);

    return returnRecords;
  }

  @Override
  public PollutionSeverity getSewageSeverity(String facilityOwner) {

    Optional<SeverityType> tempSeverity = pollutionSeverityDao.getSewageSeverity(facilityOwner);

    if (tempSeverity.isPresent()) {

      SeverityType data = tempSeverity.get();

      int id = data.getId();
      String tempFacilityOwner = data.getFacilityOwner();
      String[] dates = data.getDate().split(",");
      String[] contaminants =
          data.getContaminant() != null
              ? data.getContaminant().split(",")
              : new String[] {"No Contaminant"};
      String[] severityScore = data.getSeverityScore().split(",");
      String[] severityLevel = data.getSeverityLevel().split(",");
      String[] percentExceedance = data.getPercentExceedance().split(",");

      HashMap<String, Contaminants> contaminantsMap = new HashMap<>();

      for (int i = 0; i < contaminants.length; i++) {

        SeverityRecords[] tempRecords =
            recordsList(contaminants[i], contaminants, severityScore, severityLevel, dates);

        Float averageSeverityScore = calculateAverage(contaminants[i], contaminants, severityScore);
        Float averagePercentExceedance =
            calculateAverage(contaminants[i], contaminants, percentExceedance);
        String overallSeverityLevel = calculateSeverityLevel(averageSeverityScore);

        contaminantsMap.put(
            contaminants[i],
            new Contaminants(
                averageSeverityScore, overallSeverityLevel, averagePercentExceedance, tempRecords));
      }
      return new PollutionSeverity(id, tempFacilityOwner, contaminantsMap);

    } else {
      throw new NoSuchElementException(
          "Data with Facility Owner : " + facilityOwner + " was not found");
    }
  }
}
