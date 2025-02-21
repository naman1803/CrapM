package com.shuigraph.crapmap.industrialsewage.dao;

import com.shuigraph.crapmap.industrialsewage.models.SeverityType;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface PollutionSeverityDao extends CrudRepository<SeverityType, Integer> {

  @Query(
      value = "SELECT facility_owner FROM industrial_sewage_by_site WHERE id = :ownerID ",
      nativeQuery = true)
  String getFacilityOwnerById(@Param("ownerID") Integer ownerID);

  // CHECKSTYLE:OFF: LineLength
  @Query(
      value =
          "SELECT MIN(id) as id, facility_owner, GROUP_CONCAT(contaminant) AS contaminant, "
              + "GROUP_CONCAT(IFNULL(exceedance_start_date, '2024-11-06')) as exceedance_start_date, "
              + "GROUP_CONCAT(IFNULL(severity_score, '-1.0')) as severity_score, "
              + "GROUP_CONCAT(IFNULL(severity_level, 'N/A')) as severity_level, "
              + "GROUP_CONCAT(IFNULL(percent_exceedance, '-1.0')) as percent_exceedance FROM industrial_sewage_by_site "
              + "WHERE TRIM(facility_owner) = :facilityOwner GROUP BY facility_owner ",
      nativeQuery = true)
  Optional<SeverityType> getSewageSeverity(@Param("facilityOwner") String facilityOwner);
}
